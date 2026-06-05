import { useState, useMemo, useEffect } from "react";

// ── palette ──────────────────────────────────────────────────────────────────
const C = {
  bg:        "#0d1117",
  surface:   "#161b22",
  card:      "#1c2230",
  border:    "#30363d",
  accent:    "#00d4aa",
  accent2:   "#ff6b6b",
  accent3:   "#ffd166",
  accent4:   "#a78bfa",
  text:      "#e6edf3",
  muted:     "#7d8590",
  tableHead: "#0d1117",
  row1:      "#161b22",
  row2:      "#1a202c",
  rowNew:    "#0d2b24",
};

const itemColors = {
  "Silk Kurta":          { bg:"#1a1a2e", text:"#a78bfa" },
  "Anarkali Suit":       { bg:"#1a2a1a", text:"#4ade80" },
  "Men's Blazer":        { bg:"#1a2030", text:"#60a5fa" },
  "Chiffon Saree":       { bg:"#2a1a2a", text:"#f472b6" },
  "Denim Jeans":         { bg:"#1a2030", text:"#38bdf8" },
  "Floral Kurti":        { bg:"#2a1a1a", text:"#fb923c" },
  "Linen Shirt":         { bg:"#1a2a1a", text:"#86efac" },
  "Palazzo Set":         { bg:"#2a2a1a", text:"#fde047" },
  "Jodhpuri Suit":       { bg:"#1a1a2e", text:"#c084fc" },
  "Cotton Salwar":       { bg:"#1a2a2a", text:"#2dd4bf" },
  "Woolen Jacket":       { bg:"#2a1a1a", text:"#f87171" },
  "Embroidered Dupatta": { bg:"#2a2a1a", text:"#fbbf24" },
  "Formal Trousers":     { bg:"#1a2030", text:"#93c5fd" },
  "Banarasi Lehenga":    { bg:"#2a1a2a", text:"#f9a8d4" },
  "Casual T-Shirt":      { bg:"#1a2a2a", text:"#5eead4" },
  "Georgette Blouse":    { bg:"#2a1a2a", text:"#e879f9" },
  "Track Suit":          { bg:"#1a2030", text:"#67e8f9" },
  "Chanderi Suit":       { bg:"#2a2a1a", text:"#fcd34d" },
  "Sherwani":            { bg:"#1a1a2e", text:"#a5b4fc" },
  "Punjabi Phulkari":    { bg:"#2a1a2a", text:"#fb7185" },
};
const defaultItemColor = { bg:"#1e2a1e", text:"#00d4aa" };

const SEED = [
  { id:"CLT-001", name:"Aarav Sharma",    phone:"9876543210", item:"Silk Kurta",          date:"2024-01-05", rate:2400,  qty:2, isNew:false },
  { id:"CLT-002", name:"Priya Patel",     phone:"9812345678", item:"Anarkali Suit",        date:"2024-01-12", rate:3800,  qty:1, isNew:false },
  { id:"CLT-003", name:"Rohan Mehta",     phone:"9845671234", item:"Men's Blazer",         date:"2024-01-18", rate:5500,  qty:1, isNew:false },
  { id:"CLT-004", name:"Sneha Kapoor",    phone:"9867891234", item:"Chiffon Saree",        date:"2024-01-25", rate:4200,  qty:1, isNew:false },
  { id:"CLT-005", name:"Vikram Singh",    phone:"9823456789", item:"Denim Jeans",          date:"2024-02-03", rate:1800,  qty:3, isNew:false },
  { id:"CLT-006", name:"Neha Gupta",      phone:"9856789012", item:"Floral Kurti",         date:"2024-02-10", rate:1200,  qty:2, isNew:false },
  { id:"CLT-007", name:"Arjun Verma",     phone:"9834567890", item:"Linen Shirt",          date:"2024-02-17", rate:950,   qty:4, isNew:false },
  { id:"CLT-008", name:"Divya Nair",      phone:"9878901234", item:"Palazzo Set",          date:"2024-02-22", rate:2100,  qty:1, isNew:false },
  { id:"CLT-009", name:"Karan Joshi",     phone:"9890123456", item:"Jodhpuri Suit",        date:"2024-03-01", rate:7800,  qty:1, isNew:false },
  { id:"CLT-010", name:"Anjali Rao",      phone:"9801234567", item:"Cotton Salwar",        date:"2024-03-08", rate:1500,  qty:2, isNew:false },
  { id:"CLT-011", name:"Manish Tiwari",   phone:"9865432109", item:"Woolen Jacket",        date:"2024-03-14", rate:4600,  qty:1, isNew:false },
  { id:"CLT-012", name:"Pooja Desai",     phone:"9843210987", item:"Embroidered Dupatta",  date:"2024-03-20", rate:900,   qty:3, isNew:false },
  { id:"CLT-013", name:"Suresh Kumar",    phone:"9821098765", item:"Formal Trousers",      date:"2024-04-02", rate:1600,  qty:2, isNew:false },
  { id:"CLT-014", name:"Ritika Malhotra", phone:"9809876543", item:"Banarasi Lehenga",     date:"2024-04-09", rate:12500, qty:1, isNew:false },
  { id:"CLT-015", name:"Aditya Bose",     phone:"9887654321", item:"Casual T-Shirt",       date:"2024-04-15", rate:650,   qty:5, isNew:false },
  { id:"CLT-016", name:"Meera Iyer",      phone:"9876542198", item:"Georgette Blouse",     date:"2024-04-22", rate:1100,  qty:2, isNew:false },
  { id:"CLT-017", name:"Nikhil Saxena",   phone:"9854321987", item:"Track Suit",           date:"2024-05-05", rate:2200,  qty:1, isNew:false },
  { id:"CLT-018", name:"Kavya Reddy",     phone:"9832109876", item:"Chanderi Suit",        date:"2024-05-12", rate:3300,  qty:1, isNew:false },
  { id:"CLT-019", name:"Gaurav Pandey",   phone:"9819876543", item:"Sherwani",             date:"2024-05-18", rate:9500,  qty:1, isNew:false },
  { id:"CLT-020", name:"Simran Kaur",     phone:"9867321098", item:"Punjabi Phulkari",     date:"2024-05-25", rate:5200,  qty:1, isNew:false },
];

const LS_KEY = "clothhouse_customers";
function load() {
  try { const r = localStorage.getItem(LS_KEY); if (r) return JSON.parse(r); } catch {}
  return SEED;
}
function save(d) { try { localStorage.setItem(LS_KEY, JSON.stringify(d)); } catch {} }
function nextId(list) {
  const max = list.reduce((m,c) => { const n = parseInt(c.id.replace("CLT-",""))||0; return n>m?n:m; }, 0);
  return `CLT-${String(max+1).padStart(3,"0")}`;
}
const EMPTY = { name:"", phone:"", item:"", date:"", rate:"", qty:"" };
function validate(f) {
  const e = {};
  if (!f.name.trim())                         e.name  = "Name is required";
  if (!/^\d{10}$/.test(f.phone))              e.phone = "Valid 10-digit phone required";
  if (!f.item.trim())                         e.item  = "Item name is required";
  if (!f.date)                                e.date  = "Date is required";
  if (!f.rate||isNaN(f.rate)||+f.rate<=0)     e.rate  = "Valid rate required";
  if (!f.qty ||isNaN(f.qty) ||+f.qty <=0)    e.qty   = "Valid quantity required";
  return e;
}

// ── Field component ───────────────────────────────────────────────────────────
const Field = ({ label, field, form, setForm, errors, type="text", placeholder="" }) => (
  <div style={{ marginBottom:14 }}>
    <label style={{ display:"block", fontSize:11, fontWeight:700, letterSpacing:1.2,
      textTransform:"uppercase", color:C.muted, marginBottom:5 }}>{label}</label>
    <input
      type={type} value={form[field]} placeholder={placeholder}
      onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
      style={{
        width:"100%", padding:"11px 14px", borderRadius:8,
        border:`1.5px solid ${errors[field] ? C.accent2 : C.border}`,
        background:"#0d1117", fontSize:15, color:C.text, outline:"none",
        boxSizing:"border-box", fontFamily:"'DM Sans',sans-serif",
        transition:"border-color 0.2s", colorScheme:"dark",
        WebkitAppearance:"none"
      }}
      onFocus={e => e.target.style.borderColor = errors[field] ? C.accent2 : C.accent}
      onBlur={e  => e.target.style.borderColor = errors[field] ? C.accent2 : C.border}
    />
    {errors[field] && <span style={{ fontSize:11, color:C.accent2, marginTop:4, display:"block" }}>⚠ {errors[field]}</span>}
  </div>
);

// ── Pill ──────────────────────────────────────────────────────────────────────
const Pill = ({ children, bg, color }) => (
  <span style={{ background:bg, color, borderRadius:6, padding:"3px 9px", fontSize:11,
    fontWeight:700, fontFamily:"'DM Mono',monospace", whiteSpace:"nowrap" }}>
    {children}
  </span>
);

// ── PagBtn ────────────────────────────────────────────────────────────────────
function PagBtn({ label, onClick, disabled, active }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{
      padding:"7px 13px", borderRadius:8,
      border:`1.5px solid ${active ? C.accent : C.border}`,
      background: active ? C.accent : "transparent",
      color: active ? "#0d1117" : disabled ? C.muted : C.text,
      cursor: disabled ? "default" : "pointer",
      fontFamily:"'DM Mono',monospace", fontWeight:700, fontSize:13,
      opacity: disabled ? .4 : 1, transition:"background .15s, border-color .15s",
      minWidth:36
    }}>{label}</button>
  );
}

// ── MobileCard ────────────────────────────────────────────────────────────────
function MobileCard({ c, onEdit, onDel }) {
  const ic = itemColors[c.item] || defaultItemColor;
  return (
    <div style={{
      background: c.isNew ? C.rowNew : C.card,
      border:`1px solid ${c.isNew ? C.accent+"55" : C.border}`,
      borderRadius:14, padding:"16px", marginBottom:10,
      boxShadow: c.isNew ? `0 0 16px ${C.accent}22` : "none",
      animation: c.isNew ? "fadeSlide .35s ease" : "none"
    }}>
      {/* top row: id + name + NEW badge */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:10 }}>
        <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap" }}>
          <span style={{ background:"#1a2a3a", color:"#60a5fa", borderRadius:6,
            padding:"3px 8px", fontSize:11, fontFamily:"'DM Mono',monospace", fontWeight:700 }}>{c.id}</span>
          {c.isNew && <span style={{ background:"#2a1a3a", color:C.accent4, borderRadius:6,
            padding:"2px 7px", fontSize:10, fontFamily:"'DM Mono',monospace", fontWeight:700 }}>NEW</span>}
        </div>
        <div style={{ display:"flex", gap:6 }}>
          <button onClick={() => onEdit(c)} style={{
            background:"#1a2a1a", color:C.accent3, border:`1px solid ${C.accent3}44`,
            borderRadius:7, padding:"5px 11px", cursor:"pointer", fontWeight:700, fontSize:12,
            fontFamily:"'DM Sans',sans-serif"
          }}>✏</button>
          <button onClick={() => onDel(c.id)} style={{
            background:"#2a1414", color:C.accent2, border:`1px solid ${C.accent2}44`,
            borderRadius:7, padding:"5px 11px", cursor:"pointer", fontWeight:700, fontSize:12,
            fontFamily:"'DM Sans',sans-serif"
          }}>🗑</button>
        </div>
      </div>

      {/* name */}
      <div style={{ fontWeight:800, fontSize:16, color:C.text, marginBottom:6 }}>{c.name}</div>

      {/* item pill + phone */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:6, marginBottom:10 }}>
        <Pill bg={ic.bg} color={ic.text}>{c.item}</Pill>
        <span style={{ color:C.muted, fontFamily:"'DM Mono',monospace", fontSize:12 }}>📞 {c.phone}</span>
      </div>

      {/* stats row */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr", gap:6 }}>
        {[
          { label:"Date",  value: new Date(c.date).toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"2-digit"}), color:C.muted },
          { label:"Rate",  value:`₹${c.rate.toLocaleString("en-IN")}`,  color:C.accent3 },
          { label:"Qty",   value:c.qty,                                  color:C.accent4 },
          { label:"Total", value:`₹${(c.rate*c.qty).toLocaleString("en-IN")}`, color:C.accent },
        ].map(s => (
          <div key={s.label} style={{ background:"#ffffff08", borderRadius:8, padding:"7px 6px", textAlign:"center" }}>
            <div style={{ color:C.muted, fontSize:9, letterSpacing:1, textTransform:"uppercase", marginBottom:3 }}>{s.label}</div>
            <div style={{ color:s.color, fontWeight:800, fontSize:12, fontFamily:"'DM Mono',monospace" }}>{s.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main App ──────────────────────────────────────────────────────────────────
export default function App() {
  const [customers, setCustomers] = useState(load);
  const [search,    setSearch]    = useState("");
  const [modal,     setModal]     = useState(false);
  const [editId,    setEditId]    = useState(null);
  const [form,      setForm]      = useState(EMPTY);
  const [errors,    setErrors]    = useState({});
  const [delId,     setDelId]     = useState(null);
  const [sort,      setSort]      = useState({ key:"id", dir:"asc" });
  const [toast,     setToast]     = useState(null);
  const [page,      setPage]      = useState(1);
  // detect screen width
  const [isMobile,  setIsMobile]  = useState(window.innerWidth < 768);
  const PAGE = isMobile ? 8 : 10;

  useEffect(() => {
    save(customers);
  }, [customers]);

  useEffect(() => {
    const handle = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, []);

  const flash = (msg, type="ok") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2800);
  };

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return customers
      .filter(c => c.name.toLowerCase().includes(q) || c.phone.includes(q) ||
                   c.item.toLowerCase().includes(q)  || c.id.toLowerCase().includes(q))
      .sort((a,b) => {
        if (a.isNew && !b.isNew) return -1;
        if (!a.isNew && b.isNew) return 1;
        const { key, dir } = sort;
        const av = ["rate","qty"].includes(key) ? +a[key] : a[key];
        const bv = ["rate","qty"].includes(key) ? +b[key] : b[key];
        return (av < bv ? -1 : av > bv ? 1 : 0) * (dir==="asc" ? 1 : -1);
      });
  }, [customers, search, sort]);

  const pages     = Math.max(1, Math.ceil(filtered.length / PAGE));
  const safePage  = Math.min(page, pages);
  const paginated = filtered.slice((safePage-1)*PAGE, safePage*PAGE);
  const revenue   = customers.reduce((s,c) => s + c.rate * c.qty, 0);
  const newCount  = customers.filter(c => c.isNew).length;

  const doSort = k => setSort(p => p.key===k ? { key:k, dir:p.dir==="asc"?"desc":"asc" } : { key:k, dir:"asc" });
  const openAdd  = () => { setEditId(null); setForm(EMPTY); setErrors({}); setModal(true); };
  const openEdit = c  => { setEditId(c.id); setForm({ name:c.name, phone:c.phone, item:c.item, date:c.date, rate:String(c.rate), qty:String(c.qty) }); setErrors({}); setModal(true); };

  const submit = () => {
    const e = validate(form);
    setErrors(e);
    if (Object.keys(e).length) return;
    if (editId) {
      setCustomers(p => p.map(c => c.id===editId ? { ...c, ...form, rate:+form.rate, qty:+form.qty, isNew:false } : c));
      flash("✅ Record updated!");
    } else {
      const entry = { id: nextId(customers), ...form, rate:+form.rate, qty:+form.qty, isNew:true };
      setCustomers(p => [entry, ...p]);
      setPage(1);
      flash("🎉 Customer added & saved!");
    }
    setModal(false);
  };

  const confirmDel = () => {
    setCustomers(p => p.filter(c => c.id!==delId));
    setDelId(null);
    flash("🗑 Record deleted.", "err");
  };

  const SortArrow = ({ col }) => {
    if (sort.key!==col) return <span style={{ opacity:.3, fontSize:9, marginLeft:3 }}>⇅</span>;
    return <span style={{ color:C.accent, fontSize:9, marginLeft:3 }}>{sort.dir==="asc"?"▲":"▼"}</span>;
  };

  const cols = [
    { key:"id",    label:"ID" },
    { key:"name",  label:"Customer" },
    { key:"phone", label:"Phone" },
    { key:"item",  label:"Item" },
    { key:"date",  label:"Date" },
    { key:"rate",  label:"Rate (₹)" },
    { key:"qty",   label:"Qty" },
  ];

  const px = isMobile ? "14px" : "36px";

  return (
    <div style={{ minHeight:"100vh", background:C.bg, fontFamily:"'DM Sans',sans-serif", color:C.text }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;600;700;800&family=DM+Mono:wght@400;500;600&display=swap" rel="stylesheet"/>

      {/* ── TOAST ── */}
      {toast && (
        <div style={{
          position:"fixed", top:16, right:16, left:isMobile?16:"auto", zIndex:9999,
          background: toast.type==="err" ? "#3d1515" : "#0d2b24",
          border:`1px solid ${toast.type==="err" ? C.accent2 : C.accent}`,
          color: toast.type==="err" ? C.accent2 : C.accent,
          padding:"12px 18px", borderRadius:10, fontWeight:700, fontSize:14,
          boxShadow:"0 8px 32px rgba(0,0,0,.5)", animation:"slideIn .25s ease",
          textAlign: isMobile ? "center" : "left"
        }}>{toast.msg}</div>
      )}

      {/* ── HEADER ── */}
      <div style={{
        background:"linear-gradient(135deg,#0a0f18 0%,#0d1a2a 50%,#0a1a14 100%)",
        borderBottom:`1px solid ${C.border}`,
        padding: isMobile ? "20px 14px 16px" : "28px 36px 24px"
      }}>
        {/* brand row */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom: isMobile ? 14 : 16 }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ background:"linear-gradient(135deg,#00d4aa22,#00d4aa44)", border:`1px solid ${C.accent}44`,
              borderRadius:12, padding: isMobile?"8px 10px":"10px 14px", fontSize: isMobile?22:28 }}>👔</div>
            <div>
              <h1 style={{ margin:0, fontSize: isMobile?18:24, fontWeight:800, letterSpacing:.5,
                background:`linear-gradient(90deg,${C.accent},#00b4d8)`,
                WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
                CLOTH HOUSE
              </h1>
              <p style={{ margin:0, fontSize: isMobile?9:11, color:C.muted, letterSpacing:2,
                textTransform:"uppercase", fontFamily:"'DM Mono',monospace" }}>Customer Records Manager</p>
            </div>
          </div>
          {/* mobile: fab add button in header */}
          {isMobile && (
            <button onClick={openAdd} style={{
              background:`linear-gradient(135deg,#00d4aa,#00b4a0)`,
              color:"#0d1117", border:"none", borderRadius:10,
              padding:"9px 16px", fontWeight:800, fontSize:13,
              cursor:"pointer", display:"flex", alignItems:"center", gap:6,
              boxShadow:`0 4px 16px ${C.accent}44`
            }}>＋ Add</button>
          )}
        </div>

        {/* stat cards — 2x2 on mobile, 1 row on desktop */}
        <div style={{
          display:"grid",
          gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4,auto)",
          justifyContent: isMobile ? "stretch" : "flex-end",
          gap:8
        }}>
          {[
            { label:"Customers", value:customers.length,           color:C.accent,  icon:"👥" },
            { label:"New Added",  value:newCount,                  color:C.accent4, icon:"🆕" },
            { label:"Revenue",   value:`₹${revenue.toLocaleString("en-IN")}`, color:C.accent3, icon:"💰" },
            { label:"Items Sold",value:customers.reduce((s,c)=>s+c.qty,0),    color:"#60a5fa", icon:"🧾" },
          ].map(s => (
            <div key={s.label} style={{
              background:C.card, border:`1px solid ${C.border}`,
              borderRadius:10, padding: isMobile?"10px 8px":"10px 18px",
              textAlign:"center"
            }}>
              <div style={{ fontSize: isMobile?16:18 }}>{s.icon}</div>
              <div style={{ color:s.color, fontWeight:800, fontSize: isMobile?14:17,
                fontFamily:"'DM Mono',monospace" }}>{s.value}</div>
              <div style={{ color:C.muted, fontSize: isMobile?9:10, letterSpacing:.8,
                textTransform:"uppercase", marginTop:2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── TOOLBAR ── */}
      <div style={{
        padding: isMobile ? "14px 14px 0" : "20px 36px 0",
        display:"flex", alignItems:"center", justifyContent:"space-between",
        gap:10, flexWrap:"wrap"
      }}>
        <div style={{ position:"relative", flex:1, minWidth: isMobile?0:200, maxWidth: isMobile?"100%":380 }}>
          <span style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)",
            color:C.muted, fontSize:14 }}>🔍</span>
          <input
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search name, phone, item or ID…"
            style={{
              width:"100%", paddingLeft:38, paddingRight:12, paddingTop:10, paddingBottom:10,
              borderRadius:9, border:`1.5px solid ${C.border}`, background:C.surface,
              fontSize: isMobile?14:14, color:C.text, outline:"none", boxSizing:"border-box",
              fontFamily:"'DM Sans',sans-serif", transition:"border-color .2s"
            }}
            onFocus={e=>e.target.style.borderColor=C.accent}
            onBlur={e=>e.target.style.borderColor=C.border}
          />
        </div>
        {/* desktop add button */}
        {!isMobile && (
          <button onClick={openAdd} style={{
            background:`linear-gradient(135deg,#00d4aa,#00b4a0)`,
            color:"#0d1117", border:"none", borderRadius:9,
            padding:"10px 24px", fontWeight:800, fontSize:14,
            cursor:"pointer", letterSpacing:.5, display:"flex", alignItems:"center", gap:8,
            boxShadow:`0 4px 20px ${C.accent}44`, transition:"transform .15s, box-shadow .15s",
            whiteSpace:"nowrap"
          }}
            onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow=`0 6px 28px ${C.accent}66`; }}
            onMouseLeave={e=>{ e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow=`0 4px 20px ${C.accent}44`; }}
          ><span style={{ fontSize:18 }}>＋</span> Add Customer</button>
        )}
      </div>

      {/* ── CONTENT: TABLE (desktop) / CARDS (mobile) ── */}
      <div style={{ padding: isMobile ? "14px 14px 80px" : "16px 36px 48px" }}>

        {/* ── DESKTOP TABLE ── */}
        {!isMobile && (
          <div style={{ borderRadius:14, overflow:"hidden", border:`1px solid ${C.border}`,
            boxShadow:"0 4px 40px rgba(0,0,0,.5)", overflowX:"auto" }}>
            <table style={{ width:"100%", borderCollapse:"collapse", minWidth:860 }}>
              <thead>
                <tr style={{ background:C.tableHead, borderBottom:`2px solid ${C.accent}44` }}>
                  {cols.map(c => (
                    <th key={c.key} onClick={() => doSort(c.key)} style={{
                      padding:"13px 16px", textAlign:"left", cursor:"pointer", userSelect:"none",
                      color: sort.key===c.key ? C.accent : C.muted,
                      fontFamily:"'DM Mono',monospace", fontWeight:600, fontSize:11,
                      letterSpacing:1.3, textTransform:"uppercase", whiteSpace:"nowrap"
                    }}>{c.label}<SortArrow col={c.key}/></th>
                  ))}
                  <th style={{ padding:"13px 16px", color:C.muted, fontFamily:"'DM Mono',monospace", fontSize:11, letterSpacing:1.3, textTransform:"uppercase" }}>Total</th>
                  <th style={{ padding:"13px 16px", color:C.muted, fontFamily:"'DM Mono',monospace", fontSize:11, letterSpacing:1.3, textTransform:"uppercase" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginated.length===0 ? (
                  <tr><td colSpan={9} style={{ padding:52, textAlign:"center", color:C.muted, fontSize:15 }}>No matching records found.</td></tr>
                ) : paginated.map((c,i) => {
                  const ic = itemColors[c.item] || defaultItemColor;
                  const bg = c.isNew ? C.rowNew : (i%2===0 ? C.row1 : C.row2);
                  return (
                    <tr key={c.id}
                      style={{ background:bg, borderBottom:`1px solid ${C.border}`, transition:"background .18s" }}
                      onMouseEnter={e=>e.currentTarget.style.background=c.isNew?"#133326":"#21262d"}
                      onMouseLeave={e=>e.currentTarget.style.background=bg}
                    >
                      <td style={{ padding:"12px 16px" }}>
                        <span style={{ background:"#1a2a3a", color:"#60a5fa", borderRadius:6,
                          padding:"3px 9px", fontSize:12, fontFamily:"'DM Mono',monospace", fontWeight:600 }}>{c.id}</span>
                        {c.isNew && <span style={{ marginLeft:6, background:"#2a1a3a", color:C.accent4,
                          borderRadius:6, padding:"2px 7px", fontSize:10, fontFamily:"'DM Mono',monospace", fontWeight:700 }}>NEW</span>}
                      </td>
                      <td style={{ padding:"12px 16px", fontWeight:700, color:C.text, fontSize:14 }}>{c.name}</td>
                      <td style={{ padding:"12px 16px", color:C.muted, fontFamily:"'DM Mono',monospace", fontSize:13 }}>{c.phone}</td>
                      <td style={{ padding:"12px 16px" }}><Pill bg={ic.bg} color={ic.text}>{c.item}</Pill></td>
                      <td style={{ padding:"12px 16px", color:C.muted, fontFamily:"'DM Mono',monospace", fontSize:13 }}>
                        {new Date(c.date).toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"})}
                      </td>
                      <td style={{ padding:"12px 16px", fontWeight:700, color:C.accent3, fontFamily:"'DM Mono',monospace", fontSize:14 }}>
                        ₹{c.rate.toLocaleString("en-IN")}
                      </td>
                      <td style={{ padding:"12px 16px", textAlign:"center" }}>
                        <span style={{ background:"#1a1a3a", color:C.accent4, borderRadius:6,
                          padding:"3px 10px", fontFamily:"'DM Mono',monospace", fontWeight:700, fontSize:13 }}>{c.qty}</span>
                      </td>
                      <td style={{ padding:"12px 16px", fontWeight:800, color:C.accent, fontFamily:"'DM Mono',monospace", fontSize:14 }}>
                        ₹{(c.rate*c.qty).toLocaleString("en-IN")}
                      </td>
                      <td style={{ padding:"12px 16px" }}>
                        <div style={{ display:"flex", gap:7 }}>
                          <button onClick={() => openEdit(c)} style={{
                            background:"#1a2a1a", color:C.accent3, border:`1px solid ${C.accent3}44`,
                            borderRadius:7, padding:"6px 13px", cursor:"pointer", fontWeight:700, fontSize:12,
                            fontFamily:"'DM Sans',sans-serif", transition:"background .15s"
                          }}
                            onMouseEnter={e=>e.target.style.background="#2a3a1a"}
                            onMouseLeave={e=>e.target.style.background="#1a2a1a"}
                          >✏ Edit</button>
                          <button onClick={() => setDelId(c.id)} style={{
                            background:"#2a1414", color:C.accent2, border:`1px solid ${C.accent2}44`,
                            borderRadius:7, padding:"6px 13px", cursor:"pointer", fontWeight:700, fontSize:12,
                            fontFamily:"'DM Sans',sans-serif", transition:"background .15s"
                          }}
                            onMouseEnter={e=>e.target.style.background="#3a1a1a"}
                            onMouseLeave={e=>e.target.style.background="#2a1414"}
                          >🗑 Del</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              {paginated.length>0 && (
                <tfoot>
                  <tr style={{ background:"#0a1a12", borderTop:`2px solid ${C.accent}44` }}>
                    <td colSpan={7} style={{ padding:"11px 16px", fontFamily:"'DM Mono',monospace",
                      fontSize:12, color:C.muted }}>
                      PAGE TOTAL — {paginated.reduce((s,c)=>s+c.qty,0)} items
                    </td>
                    <td style={{ padding:"11px 16px", fontFamily:"'DM Mono',monospace",
                      fontWeight:800, color:C.accent, fontSize:15 }}>
                      ₹{paginated.reduce((s,c)=>s+c.rate*c.qty,0).toLocaleString("en-IN")}
                    </td>
                    <td/>
                  </tr>
                </tfoot>
              )}
            </table>
          </div>
        )}

        {/* ── MOBILE CARDS ── */}
        {isMobile && (
          <div>
            {paginated.length===0
              ? <div style={{ textAlign:"center", color:C.muted, padding:"40px 0", fontSize:15 }}>No matching records found.</div>
              : paginated.map(c => (
                  <MobileCard key={c.id} c={c} onEdit={openEdit} onDel={setDelId} />
                ))
            }
            {/* mobile page total */}
            {paginated.length>0 && (
              <div style={{ background:"#0a1a12", border:`1px solid ${C.accent}33`, borderRadius:10,
                padding:"12px 16px", display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:4 }}>
                <span style={{ color:C.muted, fontFamily:"'DM Mono',monospace", fontSize:12 }}>
                  PAGE — {paginated.reduce((s,c)=>s+c.qty,0)} items
                </span>
                <span style={{ color:C.accent, fontFamily:"'DM Mono',monospace", fontWeight:800, fontSize:15 }}>
                  ₹{paginated.reduce((s,c)=>s+c.rate*c.qty,0).toLocaleString("en-IN")}
                </span>
              </div>
            )}
          </div>
        )}

        {/* ── PAGINATION (shared) ── */}
        {pages>1 && (
          <div style={{ display:"flex", justifyContent:"center", alignItems:"center",
            gap:6, marginTop:18, flexWrap:"wrap" }}>
            <PagBtn label="‹" disabled={safePage===1} onClick={()=>setPage(p=>Math.max(1,p-1))} />
            {Array.from({length:pages},(_,i)=>i+1).map(p=>(
              <PagBtn key={p} label={String(p)} active={p===safePage} onClick={()=>setPage(p)} />
            ))}
            <PagBtn label="›" disabled={safePage===pages} onClick={()=>setPage(p=>Math.min(pages,p+1))} />
          </div>
        )}
        <p style={{ textAlign:"center", marginTop:10, color:C.muted,
          fontSize:12, fontFamily:"'DM Mono',monospace" }}>
          Showing {paginated.length} of {filtered.length} records
        </p>
      </div>

      {/* ── ADD / EDIT MODAL ── */}
      {modal && (
        <div style={{
          position:"fixed", inset:0, background:"rgba(0,0,0,.8)", zIndex:1000,
          display:"flex", alignItems: isMobile?"flex-end":"center",
          justifyContent:"center", padding: isMobile?0:20
        }} onClick={e=>e.target===e.currentTarget && setModal(false)}>
          <div style={{
            background:C.card, borderRadius: isMobile?"18px 18px 0 0":"18px",
            padding: isMobile?"24px 18px 32px":"36px",
            width:"100%", maxWidth: isMobile?"100%":"540px",
            border:`1px solid ${editId ? C.accent3+"66" : C.accent+"66"}`,
            boxShadow:"0 24px 80px rgba(0,0,0,.8)",
            maxHeight: isMobile?"90vh":"90vh", overflowY:"auto"
          }}>
            {/* drag handle (mobile) */}
            {isMobile && (
              <div style={{ width:40, height:4, background:C.border, borderRadius:2,
                margin:"0 auto 18px", opacity:.6 }} />
            )}
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:20 }}>
              <div>
                <h2 style={{ margin:0, fontSize: isMobile?18:20, fontWeight:800,
                  color: editId ? C.accent3 : C.accent }}>
                  {editId ? "✏️ Edit Record" : "➕ New Customer"}
                </h2>
                <p style={{ margin:"4px 0 0", fontSize:12, color:C.muted }}>
                  {editId ? "Update fields and save" : "All fields saved to localStorage"}
                </p>
              </div>
              <button onClick={()=>setModal(false)} style={{
                background:"#ffffff10", border:`1px solid ${C.border}`, borderRadius:8,
                width:34, height:34, cursor:"pointer", fontSize:18, color:C.muted,
                display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0
              }}>×</button>
            </div>

            <div style={{ display:"grid", gridTemplateColumns: isMobile?"1fr":"1fr 1fr", gap:"0 18px" }}>
              <div style={{ gridColumn:"1/-1" }}>
                <Field label="Full Name" field="name" form={form} setForm={setForm} errors={errors} placeholder="e.g. Priya Patel"/>
              </div>
              <Field label="Phone Number"     field="phone" form={form} setForm={setForm} errors={errors} type="tel"    placeholder="10-digit number"/>
              <Field label="Date of Purchase" field="date"  form={form} setForm={setForm} errors={errors} type="date"/>
              <div style={{ gridColumn:"1/-1" }}>
                <Field label="Item / Clothing" field="item" form={form} setForm={setForm} errors={errors} placeholder="e.g. Silk Saree"/>
              </div>
              <Field label="Rate per Item (₹)" field="rate" form={form} setForm={setForm} errors={errors} type="number" placeholder="e.g. 2500"/>
              <Field label="Quantity"          field="qty"  form={form} setForm={setForm} errors={errors} type="number" placeholder="e.g. 2"/>
            </div>

            {form.rate && form.qty && !isNaN(form.rate) && !isNaN(form.qty) && +form.rate>0 && +form.qty>0 && (
              <div style={{
                background:"#0d2b24", border:`1px solid ${C.accent}44`, borderRadius:10,
                padding:"12px 16px", marginBottom:18,
                display:"flex", justifyContent:"space-between", alignItems:"center"
              }}>
                <span style={{ color:C.muted, fontSize:13 }}>💰 Total Preview</span>
                <span style={{ color:C.accent, fontWeight:800, fontSize:18, fontFamily:"'DM Mono',monospace" }}>
                  ₹{(+form.rate * +form.qty).toLocaleString("en-IN")}
                </span>
              </div>
            )}

            <div style={{ display:"flex", gap:10 }}>
              <button onClick={()=>setModal(false)} style={{
                flex:1, padding: isMobile?"13px":"12px", borderRadius:10,
                border:`1px solid ${C.border}`, background:"transparent", color:C.muted,
                cursor:"pointer", fontFamily:"'DM Sans',sans-serif", fontWeight:700, fontSize:14
              }}>Cancel</button>
              <button onClick={submit} style={{
                flex:2, padding: isMobile?"13px":"12px", borderRadius:10, border:"none",
                background: editId
                  ? `linear-gradient(135deg,${C.accent3},#ffb830)`
                  : `linear-gradient(135deg,${C.accent},#00b4a0)`,
                color:"#0d1117", cursor:"pointer", fontFamily:"'DM Sans',sans-serif",
                fontWeight:800, fontSize: isMobile?15:15,
                boxShadow: editId ? `0 4px 18px ${C.accent3}44` : `0 4px 18px ${C.accent}44`
              }}>
                {editId ? "💾 Save Changes" : "✅ Add & Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── DELETE CONFIRM ── */}
      {delId && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,.85)", zIndex:1000,
          display:"flex", alignItems: isMobile?"flex-end":"center",
          justifyContent:"center", padding: isMobile?0:20 }}>
          <div style={{ background:C.card, borderRadius: isMobile?"18px 18px 0 0":"16px",
            padding: isMobile?"28px 20px 36px":"32px",
            maxWidth: isMobile?"100%":"380px", width:"100%",
            textAlign:"center", border:`1px solid ${C.accent2}44`,
            boxShadow:"0 20px 60px rgba(0,0,0,.7)" }}>
            {isMobile && <div style={{ width:40, height:4, background:C.border, borderRadius:2, margin:"0 auto 18px", opacity:.6 }}/>}
            <div style={{ fontSize:44, marginBottom:10 }}>⚠️</div>
            <h3 style={{ margin:"0 0 8px", color:C.accent2, fontWeight:800, fontSize:18 }}>Delete Record?</h3>
            <p style={{ color:C.muted, marginBottom:22, fontSize:13, lineHeight:1.6 }}>
              Permanently remove <span style={{ color:C.text, fontFamily:"'DM Mono',monospace", fontWeight:600 }}>{delId}</span> from localStorage?
            </p>
            <div style={{ display:"flex", gap:10 }}>
              <button onClick={()=>setDelId(null)} style={{ flex:1, padding:13, borderRadius:10,
                border:`1px solid ${C.border}`, background:"transparent", color:C.muted,
                cursor:"pointer", fontWeight:700, fontFamily:"'DM Sans',sans-serif", fontSize:14 }}>Cancel</button>
              <button onClick={confirmDel} style={{ flex:1, padding:13, borderRadius:10,
                border:"none", background:C.accent2, color:"#fff",
                cursor:"pointer", fontWeight:800, fontFamily:"'DM Sans',sans-serif", fontSize:14,
                boxShadow:`0 4px 14px ${C.accent2}55` }}>Yes, Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* ── MOBILE FAB (floating add button) ── */}
      {isMobile && (
        <button onClick={openAdd} style={{
          position:"fixed", bottom:22, right:20, zIndex:900,
          background:`linear-gradient(135deg,#00d4aa,#00b4a0)`,
          color:"#0d1117", border:"none", borderRadius:"50%",
          width:58, height:58, fontSize:28, cursor:"pointer",
          boxShadow:`0 6px 24px ${C.accent}66`,
          display:"flex", alignItems:"center", justifyContent:"center",
          fontWeight:900
        }}>＋</button>
      )}

      <style>{`
        @keyframes slideIn  { from { opacity:0; transform:translateX(20px);  } to { opacity:1; transform:translateX(0);  } }
        @keyframes fadeSlide { from { opacity:0; transform:translateY(-10px); } to { opacity:1; transform:translateY(0); } }
        * { scrollbar-width:thin; scrollbar-color:${C.border} transparent; box-sizing:border-box; }
        ::-webkit-scrollbar { width:5px; height:5px; }
        ::-webkit-scrollbar-thumb { background:${C.border}; border-radius:4px; }
        input[type="date"] { color-scheme:dark; }
        input[type="date"]::-webkit-calendar-picker-indicator { filter:invert(1) brightness(2); cursor:pointer; }
        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button { opacity:.4; }
        @media (max-width:767px) {
          html { font-size:15px; }
        }
      `}</style>
    </div>
  );
}