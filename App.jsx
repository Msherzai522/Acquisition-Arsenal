import React, { useState } from 'react';
import { jsPDF } from 'jspdf'; 
export default function App(){
  // --- STATE MANAGEMENT ---
  const [shopData, setShopData] = useState({
    shopName: '',
    debtAmount: 0,
    numEmployees: 0,
  });

  const [loading, setLoading] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);
  const [stealthMode, setStealthMode] = useState(false);

  const services = [
    { id: 1, name: 'Lease Renegotiation Guide', price: 0 },
    { id: 2, name: 'Debt Restructure Plan', price: 499 },
    { id: 3, name: 'Full Turnaround Execution', price: 2499 },
  ];

  const getPrice = (basePrice) => {
    return stealthMode ? Math.round(basePrice * 1.35) : basePrice;
  };

  const runAudit = () => {
    setLoading(true);
    setTimeout(() => {
      const doc = new jsPDF();
      doc.setFont("helvetica", "bold");
      doc.text("ACQUISITION ARSENAL: CONFIDENTIAL AUDIT", 20, 20);
      doc.setFont("helvetica", "normal");
      doc.text(`Business: ${shopData.shopName || 'Subject'}`, 20, 30);
      doc.text(`Debt: $${shopData.debtAmount}`, 20, 40);
      doc.save(`Audit_Report.pdf`);
      
      setLoading(false);
      setShowServices(true);
    }, 1200);
  };

  const toggleService = (id) => {
    setSelectedServices(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  return (
    <div style={{ background: '#0e0e0e', color: '#fff', minHeight: '100vh', padding: '20px', fontFamily: 'sans-serif' }}>
      <header style={{ borderBottom: '2px solid #007bff', marginBottom: '30px' }}>
        <h1 style={{ letterSpacing: '2px', fontSize: '22px' }}>ACQUISITION ARSENAL</h1>
        <p style={{ color: '#888', fontSize: '14px' }}>Lead Intake & Classification</p>
      </header>

      <div style={{ background: '#181818', padding: '20px', borderRadius: '8px' }}>
        <input 
          style={inputStyle} 
          placeholder="Business Name" 
          onChange={e => setShopData({...shopData, shopName: e.target.value})} 
        />
        <input 
          style={inputStyle} 
          type="number" 
          placeholder="Total Debt ($)" 
          onChange={e => setShopData({...shopData, debtAmount: e.target.value})} 
        />
        
        <label style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          <input type="checkbox" checked={stealthMode} onChange={() => setStealthMode(!stealthMode)} />
          <span style={{ marginLeft: '10px', fontSize: '12px', color: '#aaa' }}>
            Optimize for Corporate Compliance
          </span>
        </label>

        <button onClick={runAudit} style={buttonStyle}>
          {loading ? 'CALCULATING...' : 'RUN REAL-TIME AUDIT'}
        </button>
      </div>

      {showServices && (
        <div style={{ marginTop: '20px', border: '1px solid #007bff', padding: '15px', borderRadius: '8px' }}>
          <h3 style={{ fontSize: '16px' }}>Service Lanes</h3>
          {services.map(svc => (
            <div key={svc.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #222' }}>
              <label>
                <input type="checkbox" onChange={() => toggleService(svc.id)} />
                <span style={{ marginLeft: '10px' }}>{svc.name}</span>
              </label>
              <span style={{ color: '#007bff' }}>${getPrice(svc.price)}</span>
            </div>
          ))}
          <div style={{ textAlign: 'right', marginTop: '15px', fontWeight: 'bold', color: '#28a745' }}>
            Total: ${selectedServices.reduce((sum, id) => sum + getPrice(services.find(s => s.id === id).price), 0)}
          </div>
        </div>
      )}
    </div>
  );
}

const inputStyle = { width: '100%', padding: '12px', marginBottom: '15px', background: '#252525', border: '1px solid #333', color: '#fff', borderRadius: '4px', boxSizing: 'border-box' };
const buttonStyle = { width: '100%', padding: '15px', background: '#007bff', color: '#fff', border: 'none', fontWeight: 'bold', borderRadius: '4px' };
