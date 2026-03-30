'use client';

import { useState, useEffect, useCallback } from 'react';

const PASSWORD = 'prosolar2025!';

type Lead = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  business_type: string;
  location: string;
  status: 'new' | 'contacted' | 'qualified';
  createdAt: string;
  ip?: string;
};

type Stats = { total: number; new: number; contacted: number; qualified: number };
type Pagination = { page: number; limit: number; total: number; pages: number };

const STATUS_CONFIG = {
  new:       { label: 'New',       color: '#f59e0b', bg: 'rgba(245,158,11,0.12)' },
  contacted: { label: 'Contacted', color: '#3b82f6', bg: 'rgba(59,130,246,0.12)' },
  qualified: { label: 'Qualified', color: '#10b981', bg: 'rgba(16,185,129,0.12)' },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

// ─── Login Screen ────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  const [shaking, setShaking] = useState(false);

  const submit = () => {
    if (value === PASSWORD) {
      onLogin();
    } else {
      setError(true);
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
    }
  };

  return (
    <div style={styles.loginWrap}>
      <div style={{ ...styles.loginCard, animation: shaking ? 'shake 0.4s ease' : 'none' }}>
        <div style={styles.loginLogo}>
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <circle cx="18" cy="18" r="18" fill="#f59e0b" opacity="0.15" />
            <path d="M18 6 L30 24 H6 Z" fill="#f59e0b" />
          </svg>
        </div>
        <h1 style={styles.loginTitle}>ProSolar</h1>
        <p style={styles.loginSub}>Leads Dashboard</p>
        <div style={styles.inputWrap}>
          <input
            type="password"
            placeholder="Enter password"
            value={value}
            onChange={e => { setValue(e.target.value); setError(false); }}
            onKeyDown={e => e.key === 'Enter' && submit()}
            style={{ ...styles.input, borderColor: error ? '#ef4444' : 'rgba(255,255,255,0.1)' }}
            autoFocus
          />
          {error && <p style={styles.errorMsg}>Incorrect password</p>}
        </div>
        <button onClick={submit} style={styles.loginBtn}>
          Access Dashboard →
        </button>
      </div>
      <style>{`
        @keyframes shake {
          0%,100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-6px); }
          80% { transform: translateX(6px); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

// ─── Main Dashboard ──────────────────────────────────────────────────────────
export default function LeadsDashboard() {
  const [authed, setAuthed] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Lead | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: '15',
        status: statusFilter,
        ...(search ? { search } : {}),
      });
      const res = await fetch(`/api/advisor?${params}`, {
        headers: { Authorization: `Bearer ${PASSWORD}` },
      });
      const data = await res.json();
      setLeads(data.leads || []);
      setStats(data.stats || null);
      setPagination(data.pagination || null);
    } finally {
      setLoading(false);
    }
  }, [page, statusFilter, search]);

  useEffect(() => {
    if (authed) fetchLeads();
  }, [authed, fetchLeads]);

  const updateStatus = async (id: string, status: string) => {
    setUpdatingId(id);
    await fetch('/api/advisor', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${PASSWORD}` },
      body: JSON.stringify({ id, status }),
    });
    setUpdatingId(null);
    await fetchLeads();
    if (selected?._id === id) setSelected(prev => prev ? { ...prev, status: status as Lead['status'] } : null);
  };

  if (!authed) return <LoginScreen onLogin={() => setAuthed(true)} />;

  return (
    <div style={styles.shell}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <div style={styles.sidebarTop}>
          <div style={styles.brand}>
            <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
              <circle cx="18" cy="18" r="18" fill="#f59e0b" opacity="0.15" />
              <path d="M18 6 L30 24 H6 Z" fill="#f59e0b" />
            </svg>
            <span style={styles.brandName}>ProSolar</span>
          </div>
          <p style={styles.brandSub}>Leads CRM</p>
        </div>

        {stats && (
          <div style={styles.statGrid}>
            {[
              { label: 'Total Leads', value: stats.total, color: '#e2e8f0' },
              { label: 'New',         value: stats.new,   color: '#f59e0b' },
              { label: 'Contacted',   value: stats.contacted, color: '#3b82f6' },
              { label: 'Qualified',   value: stats.qualified, color: '#10b981' },
            ].map(s => (
              <div key={s.label} style={styles.statCard}>
                <span style={{ ...styles.statValue, color: s.color }}>{s.value}</span>
                <span style={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </div>
        )}

        <nav style={styles.nav}>
          {(['all', 'new', 'contacted', 'qualified'] as const).map(f => (
            <button
              key={f}
              onClick={() => { setStatusFilter(f); setPage(1); }}
              style={{
                ...styles.navBtn,
                background: statusFilter === f ? 'rgba(245,158,11,0.15)' : 'transparent',
                color: statusFilter === f ? '#f59e0b' : '#94a3b8',
                borderLeft: statusFilter === f ? '2px solid #f59e0b' : '2px solid transparent',
              }}
            >
              {f === 'all' ? 'All Leads' : STATUS_CONFIG[f].label}
            </button>
          ))}
        </nav>

        <button onClick={() => setAuthed(false)} style={styles.logoutBtn}>
          Sign out
        </button>
      </aside>

      {/* Main */}
      <main style={styles.main}>
        <header style={styles.header}>
          <div>
            <h2 style={styles.pageTitle}>
              {statusFilter === 'all' ? 'All Leads' : STATUS_CONFIG[statusFilter as keyof typeof STATUS_CONFIG].label}
            </h2>
            {pagination && (
              <p style={styles.pageCount}>{pagination.total} result{pagination.total !== 1 ? 's' : ''}</p>
            )}
          </div>
          <div style={styles.searchWrap}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }}>
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              placeholder="Search name, email, location…"
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              style={styles.searchInput}
            />
          </div>
        </header>

        {/* Table */}
        <div style={styles.tableWrap}>
          {loading ? (
            <div style={styles.emptyState}>
              <div style={styles.spinner} />
            </div>
          ) : leads.length === 0 ? (
            <div style={styles.emptyState}>
              <p style={{ color: '#475569' }}>No leads found.</p>
            </div>
          ) : (
            <table style={styles.table}>
              <thead>
                <tr>
                  {['Name', 'Email', 'Phone', 'Business Type', 'Location', 'Status', 'Date', ''].map(h => (
                    <th key={h} style={styles.th}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {leads.map(lead => (
                  <tr
                    key={lead._id}
                    style={styles.tr}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.03)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    <td style={{ ...styles.td, fontWeight: 600, color: '#e2e8f0' }}>{lead.name}</td>
                    <td style={styles.td}>{lead.email}</td>
                    <td style={styles.td}>{lead.phone}</td>
                    <td style={styles.td}>{lead.business_type}</td>
                    <td style={styles.td}>{lead.location}</td>
                    <td style={styles.td}>
                      <span style={{
                        ...styles.badge,
                        color: STATUS_CONFIG[lead.status]?.color ?? '#94a3b8',
                        background: STATUS_CONFIG[lead.status]?.bg ?? 'transparent',
                      }}>
                        {STATUS_CONFIG[lead.status]?.label ?? lead.status}
                      </span>
                    </td>
                    <td style={{ ...styles.td, whiteSpace: 'nowrap', fontSize: 12, color: '#64748b' }}>
                      {formatDate(lead.createdAt)}
                    </td>
                    <td style={styles.td}>
                      <button onClick={() => setSelected(lead)} style={styles.viewBtn}>View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        {pagination && pagination.pages > 1 && (
          <div style={styles.paginationRow}>
            <button disabled={page <= 1} onClick={() => setPage(p => p - 1)} style={styles.pageBtn}>← Prev</button>
            <span style={{ color: '#64748b', fontSize: 14 }}>Page {page} of {pagination.pages}</span>
            <button disabled={page >= pagination.pages} onClick={() => setPage(p => p + 1)} style={styles.pageBtn}>Next →</button>
          </div>
        )}
      </main>

      {/* Detail Modal */}
      {selected && (
        <div style={styles.modalBackdrop} onClick={() => setSelected(null)}>
          <div style={styles.modal} onClick={e => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalName}>{selected.name}</h3>
              <button onClick={() => setSelected(null)} style={styles.closeBtn}>✕</button>
            </div>

            <div style={styles.modalGrid}>
              {[
                ['Email',         selected.email],
                ['Phone',         selected.phone],
                ['Business Type', selected.business_type],
                ['Location',      selected.location],
                ['IP Address',    selected.ip || '—'],
                ['Submitted',     formatDate(selected.createdAt)],
              ].map(([label, value]) => (
                <div key={label} style={styles.modalField}>
                  <span style={styles.modalLabel}>{label}</span>
                  <span style={styles.modalValue}>{value}</span>
                </div>
              ))}
            </div>

            <div style={styles.modalStatusRow}>
              <span style={styles.modalLabel}>Update Status</span>
              <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                {(['new', 'contacted', 'qualified'] as const).map(s => (
                  <button
                    key={s}
                    disabled={updatingId === selected._id}
                    onClick={() => updateStatus(selected._id, s)}
                    style={{
                      ...styles.statusBtn,
                      background: selected.status === s ? STATUS_CONFIG[s].bg : 'rgba(255,255,255,0.05)',
                      color: selected.status === s ? STATUS_CONFIG[s].color : '#94a3b8',
                      border: `1px solid ${selected.status === s ? STATUS_CONFIG[s].color : 'transparent'}`,
                    }}
                  >
                    {STATUS_CONFIG[s].label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0a0f1a; }
        @keyframes spin { to { transform: rotate(360deg); } }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 3px; }
      `}</style>
    </div>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────
const styles: Record<string, React.CSSProperties> = {
  // Login
  loginWrap: {
    minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
    background: '#070c18',
    backgroundImage: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(245,158,11,0.12) 0%, transparent 70%)',
  },
  loginCard: {
    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 20, padding: '48px 40px', width: 360, textAlign: 'center',
    backdropFilter: 'blur(20px)', animation: 'fadeIn 0.5s ease',
  },
  loginLogo: { display: 'flex', justifyContent: 'center', marginBottom: 16 },
  loginTitle: { fontFamily: 'Georgia, serif', fontSize: 28, fontWeight: 700, color: '#f1f5f9', letterSpacing: '-0.5px' },
  loginSub: { fontSize: 13, color: '#64748b', marginTop: 4, marginBottom: 32, letterSpacing: '0.08em', textTransform: 'uppercase' },
  inputWrap: { marginBottom: 16 },
  input: {
    width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, color: '#f1f5f9',
    fontSize: 15, outline: 'none', transition: 'border-color 0.2s',
  },
  errorMsg: { color: '#ef4444', fontSize: 12, marginTop: 8 },
  loginBtn: {
    width: '100%', padding: '13px', background: '#f59e0b', border: 'none',
    borderRadius: 10, color: '#0a0f1a', fontWeight: 700, fontSize: 15, cursor: 'pointer',
    transition: 'opacity 0.2s',
  },

  // Shell
  shell: { display: 'flex', minHeight: '100vh', background: '#070c18', fontFamily: "'DM Sans', system-ui, sans-serif", color: '#cbd5e1' },

  // Sidebar
  sidebar: {
    width: 240, background: 'rgba(255,255,255,0.025)', borderRight: '1px solid rgba(255,255,255,0.06)',
    display: 'flex', flexDirection: 'column', padding: '28px 0', position: 'sticky', top: 0, height: '100vh',
  },
  sidebarTop: { padding: '0 20px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)' },
  brand: { display: 'flex', alignItems: 'center', gap: 10 },
  brandName: { fontFamily: 'Georgia, serif', fontSize: 20, fontWeight: 700, color: '#f1f5f9' },
  brandSub: { fontSize: 11, color: '#475569', marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.1em' },
  statGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, padding: '20px 16px' },
  statCard: {
    background: 'rgba(255,255,255,0.04)', borderRadius: 10, padding: '12px 14px',
    display: 'flex', flexDirection: 'column', gap: 2,
  },
  statValue: { fontSize: 22, fontWeight: 700, fontVariantNumeric: 'tabular-nums' },
  statLabel: { fontSize: 11, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' },
  nav: { display: 'flex', flexDirection: 'column', gap: 2, padding: '8px 12px', flex: 1 },
  navBtn: {
    textAlign: 'left', padding: '10px 12px', borderRadius: 8, fontSize: 14,
    fontWeight: 500, cursor: 'pointer', border: 'none', transition: 'all 0.15s',
  },
  logoutBtn: {
    margin: '0 16px', padding: '10px', background: 'transparent',
    border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, color: '#475569',
    fontSize: 13, cursor: 'pointer',
  },

  // Main
  main: { flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' },
  header: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '28px 32px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)',
  },
  pageTitle: { fontSize: 22, fontWeight: 700, color: '#f1f5f9', fontFamily: 'Georgia, serif' },
  pageCount: { fontSize: 13, color: '#475569', marginTop: 2 },
  searchWrap: { position: 'relative' },
  searchInput: {
    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 10, padding: '10px 14px 10px 36px', color: '#e2e8f0', fontSize: 14,
    outline: 'none', width: 280,
  },

  // Table
  tableWrap: { flex: 1, overflowX: 'auto', overflowY: 'auto', padding: '0 32px' },
  table: { width: '100%', borderCollapse: 'collapse', marginTop: 8 },
  th: {
    textAlign: 'left', padding: '12px 14px', fontSize: 11, fontWeight: 600,
    color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
  },
  tr: { transition: 'background 0.1s', cursor: 'default' },
  td: { padding: '14px 14px', fontSize: 14, color: '#94a3b8', borderBottom: '1px solid rgba(255,255,255,0.04)' },
  badge: { display: 'inline-block', padding: '3px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600 },
  viewBtn: {
    padding: '5px 14px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 6, color: '#94a3b8', fontSize: 13, cursor: 'pointer',
  },
  emptyState: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200 },
  spinner: {
    width: 28, height: 28, border: '2px solid rgba(255,255,255,0.1)',
    borderTop: '2px solid #f59e0b', borderRadius: '50%', animation: 'spin 0.7s linear infinite',
  },

  // Pagination
  paginationRow: {
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20,
    padding: '20px 32px', borderTop: '1px solid rgba(255,255,255,0.06)',
  },
  pageBtn: {
    padding: '8px 18px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 8, color: '#94a3b8', fontSize: 13, cursor: 'pointer',
  },

  // Modal
  modalBackdrop: {
    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50,
  },
  modal: {
    background: '#0f1829', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16,
    padding: 32, width: 480, maxWidth: '90vw',
  },
  modalHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 },
  modalName: { fontFamily: 'Georgia, serif', fontSize: 22, color: '#f1f5f9', fontWeight: 700 },
  closeBtn: { background: 'transparent', border: 'none', color: '#64748b', fontSize: 20, cursor: 'pointer' },
  modalGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 },
  modalField: { display: 'flex', flexDirection: 'column', gap: 4 },
  modalLabel: { fontSize: 11, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 },
  modalValue: { fontSize: 14, color: '#cbd5e1' },
  modalStatusRow: { borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 20 },
  statusBtn: {
    padding: '8px 16px', borderRadius: 8, fontSize: 13, fontWeight: 600,
    cursor: 'pointer', transition: 'all 0.15s',
  },
};