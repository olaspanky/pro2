// app/admin/leads/page.tsx
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
    .sort({ createdAt: -1 })   // newest first
    .toArray();

  return leads as Lead[];
}

export default async function LeadsPage() {
  const leads = await getLeads();

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
          <div className="text-sm text-gray-500">
            Last updated: {new Date().toLocaleString()}
          </div>
        </div>

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
                  <th className="px-6 py-4 text-left font-medium text-gray-700">Generator / Spend</th>
                  <th className="px-6 py-4 text-left font-medium text-gray-700">Status</th>
                  <th className="px-6 py-4 text-center font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {leads.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                      No leads yet. New submissions will appear here.
                    </td>
                  </tr>
                ) : (
                  leads.map((lead) => (
                    <tr key={lead._id.toString()} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                        {new Date(lead.createdAt).toLocaleDateString('en-GB', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>
                      <td className="px-6 py-4 font-medium">{lead.name}</td>
                      <td className="px-6 py-4 text-gray-700">{lead.business_type}</td>
                      <td className="px-6 py-4 text-gray-600 max-w-xs truncate">{lead.location}</td>
                      <td className="px-6 py-4">
                        <div className="text-gray-900">{lead.email}</div>
                        <div className="text-gray-600 text-xs">{lead.phone}</div>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {lead.generator_size && <div>Gen: {lead.generator_size}</div>}
                        {lead.fuel_spend && <div>Fuel: {lead.fuel_spend}</div>}
                        {lead.grid_spend && <div>Grid: {lead.grid_spend}</div>}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
                          lead.status === 'new' 
                            ? 'bg-blue-100 text-blue-700' 
                            : 'bg-green-100 text-green-700'
                        }`}>
                          {lead.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button 
                          onClick={() => alert(`Contact ${lead.name} at ${lead.phone}\n\nMessage: ${lead.message || 'No message'}`)}
                          className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 text-xs text-gray-500 text-center">
          ProSolar Advisor Leads • Stored in MongoDB • Refresh page to see new submissions
        </div>
      </div>
    </div>
  );
}