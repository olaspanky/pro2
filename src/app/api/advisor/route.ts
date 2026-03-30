// app/api/advisor/route.ts
import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/app/lib/mongodb';

const MAX_RETRIES = 3;
const COLLECTION_NAME = 'advisor_leads';

export async function POST(request: NextRequest) {
  let dbClient;

  try {
    const payload = await request.json();

    // Validation
    const requiredFields = ['name', 'email', 'phone', 'business_type', 'location'];
    for (const field of requiredFields) {
      if (!payload[field] || typeof payload[field] !== 'string' || !payload[field].trim()) {
        return NextResponse.json(
          { error: `Missing or invalid required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(payload.email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const lead = {
      ...payload,
      status: 'new',
      createdAt: new Date(),
      updatedAt: new Date(),
      ip: request.ip || request.headers.get('x-forwarded-for') || 'unknown',
      userAgent: request.headers.get('user-agent') || '',
    };

    let lastError: any = null;

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        const client = await clientPromise;
        const db = client.db();
        const result = await db.collection(COLLECTION_NAME).insertOne(lead);

        console.log(`✅ Advisor lead saved (Attempt ${attempt}) - ID: ${result.insertedId}`);

        return NextResponse.json({
          success: true,
          message: 'Your consultation request has been received successfully.',
          leadId: result.insertedId,
        });
      } catch (error: any) {
        lastError = error;
        console.error(`MongoDB insert attempt ${attempt} failed:`, error.message);
        if (attempt < MAX_RETRIES) {
          await new Promise(resolve => setTimeout(resolve, 800 * attempt));
        }
      }
    }

    console.error('All retry attempts failed for lead:', payload.email, lastError);

    return NextResponse.json({
      success: true,
      message: 'Your request has been received. Our team will contact you shortly.',
      note: 'There was a temporary issue saving your lead. It will be processed manually.',
    }, { status: 202 });

  } catch (error: any) {
    console.error('Critical error in /api/advisor POST:', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
    const limit = Math.min(100, parseInt(searchParams.get('limit') || '20'));
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection(COLLECTION_NAME);

    // Build filter
    const filter: Record<string, any> = {};
    if (status && status !== 'all') filter.status = status;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
        { business_type: { $regex: search, $options: 'i' } },
      ];
    }

    const [leads, total] = await Promise.all([
      collection
        .find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .toArray(),
      collection.countDocuments(filter),
    ]);

    // Stats
    const [totalCount, newCount, contactedCount, qualifiedCount] = await Promise.all([
      collection.countDocuments({}),
      collection.countDocuments({ status: 'new' }),
      collection.countDocuments({ status: 'contacted' }),
      collection.countDocuments({ status: 'qualified' }),
    ]);

    return NextResponse.json({
      leads,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
      stats: {
        total: totalCount,
        new: newCount,
        contacted: contactedCount,
        qualified: qualifiedCount,
      },
    });
  } catch (error: any) {
    console.error('Critical error in /api/advisor GET:', error);
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const auth = request.headers.get('authorization');
    const password = auth?.replace('Bearer ', '');

    if (password !== process.env.LEADS_DASHBOARD_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id, status } = await request.json();
    if (!id || !status) {
      return NextResponse.json({ error: 'Missing id or status' }, { status: 400 });
    }

    const { ObjectId } = await import('mongodb');
    const client = await clientPromise;
    const db = client.db();

    await db.collection(COLLECTION_NAME).updateOne(
      { _id: new ObjectId(id) },
      { $set: { status, updatedAt: new Date() } }
    );

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Critical error in /api/advisor PATCH:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}