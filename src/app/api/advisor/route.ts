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
      status: 'new',                    // new, contacted, qualified, etc.
      createdAt: new Date(),
      updatedAt: new Date(),
      ip: request.ip || request.headers.get('x-forwarded-for') || 'unknown',
      userAgent: request.headers.get('user-agent') || '',
    };

    let lastError: any = null;

    // Retry logic with exponential backoff
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        const client = await clientPromise;
        const db = client.db(); // uses MONGODB_DB from env

        const result = await db.collection(COLLECTION_NAME).insertOne(lead);

        console.log(`✅ Advisor lead saved to MongoDB (Attempt ${attempt}) - ID: ${result.insertedId}`);

        return NextResponse.json({
          success: true,
          message: 'Your consultation request has been received successfully.',
          leadId: result.insertedId,
        });

      } catch (error: any) {
        lastError = error;
        console.error(`MongoDB insert attempt ${attempt} failed:`, error.message);

        if (attempt < MAX_RETRIES) {
          await new Promise(resolve => setTimeout(resolve, 800 * attempt)); // backoff
        }
      }
    }

    // If all retries fail
    console.error('All retry attempts failed for lead:', payload.email, lastError);

    return NextResponse.json({
      success: true, // Still return success to user
      message: 'Your request has been received. Our team will contact you shortly.',
      note: 'There was a temporary issue saving your lead. It will be processed manually.',
    }, { status: 202 });

  } catch (error: any) {
    console.error('Critical error in /api/advisor:', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}