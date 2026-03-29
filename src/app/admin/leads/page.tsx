// src/app/admin/leads/page.tsx
import { ObjectId } from 'mongodb';
import { getDb } from '@/app/lib/mongodb';
interface Lead {
  _id: ObjectId;
  name: string;
  email: string;
  phone: string;
  business_type: string;
  location: string;
  generator_size?: string;
  fuel_spend?: string;
  grid_spend?: string;
  message?: string;
  status: string;
  createdAt: Date;
  source: string;
}

async function getLeads(): Promise<Lead[]> {
  const db = await getDb();
  const leads = await db
    .collection('advisor_leads')
    .find({})
    .sort({ createdAt: -1 })
    .toArray();

  return leads as Lead[];
}

export const dynamic = 'force-dynamic';   // ← This is the key fix

export default async function LeadsPage() {
  let leads: Lead[] = [];
  let error = null;

  try {
    leads = await getLeads();
  } catch (err: any) {
    console.error('Failed to fetch leads:', err);
    error = 'Failed to load leads. Please try again later.';
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Advisor Registrations</h1>
            <p className="text-gray-600 mt-1">
              Total Leads: <span className="font-semibold">{leads.length}</span>
            </p>
          </div>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
          >
            Refresh
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm overflow-hidden border">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-6 py-4 text-left font-medium text-gray-700">Date</th>
                  <th className="px-6 py-4 text-left font-medium text-gray-700">Name</th>
                  <th className="px-6 py-4 text-left font-medium text-gray-700">Business Type</th>
                  <th className="px-6 py-4 text-left font-medium text-gray-700">Location</th>
                  <th className="px-6 py-4 text-left font-medium text-gray-700">Contact</th>
                  <th className="px-6 py-4 text-left font-medium text-gray-700">Spend Info</th>
                  <th className="px-6 py-4 text-left font-medium text-gray-700">Status</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {leads.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                      No leads found yet.
                    </td>
                  </tr>
                ) : (
                  leads.map((lead) => (
                    <tr key={lead._id.toString()} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                        {new Date(lead.createdAt).toLocaleString('en-GB')}
                      </td>
                      <td className="px-6 py-4 font-medium">{lead.name}</td>
                      <td className="px-6 py-4">{lead.business_type}</td>
                      <td className="px-6 py-4 text-gray-600 max-w-xs truncate">{lead.location}</td>
                      <td className="px-6 py-4">
                        <div>{lead.email}</div>
                        <div className="text-xs text-gray-500">{lead.phone}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {lead.generator_size && <div>Gen: {lead.generator_size}</div>}
                        {lead.fuel_spend && <div>Fuel: {lead.fuel_spend}</div>}
                        {lead.grid_spend && <div>Grid: {lead.grid_spend}</div>}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700">
                          {lead.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button 
                          onClick={() => alert(`Name: ${lead.name}\nPhone: ${lead.phone}\nEmail: ${lead.email}\n\nMessage: ${lead.message || 'No message'}`)}
                          className="text-blue-600 hover:underline"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}