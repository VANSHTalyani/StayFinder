import React from 'react';
import { Link } from 'react-router-dom';

export default function PropertyCard({ listing }) {
  return (
    <div className="property-card" style={{ position: 'relative', border: 'none', boxShadow: '0 6px 24px rgba(0,0,0,0.10)', transition: 'box-shadow 0.2s, background 0.2s', borderRadius: 20, overflow: 'hidden', background: '#fff', cursor: 'pointer', willChange: 'transform' }} onMouseOver={e => e.currentTarget.style.background = '#FFE0E6'} onMouseOut={e => e.currentTarget.style.background = '#fff'}>
      <Link to={`/listing/${listing._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div style={{ position: 'relative' }}>
          <img src={listing.images[0]} alt="property" style={{ width: '100%', height: 200, objectFit: 'cover', borderTopLeftRadius: 16, borderTopRightRadius: 16 }} />
          <span style={{ position: 'absolute', top: 14, right: 14, background: '#FF5A5F', color: '#fff', borderRadius: 8, padding: '6px 14px', fontWeight: 700, fontSize: 16, boxShadow: '0 2px 8px #FF5A5F22', letterSpacing: '0.01em' }}>${listing.price} <span style={{ fontWeight: 400, fontSize: 13 }}>/night</span></span>
        </div>
        <div className="property-info" style={{ padding: '1.2rem', minHeight: 120 }}>
          <h3 style={{ marginBottom: 6, color: '#232323', fontFamily: 'Inter, Nunito, Arial, sans-serif', fontWeight: 700 }}>{listing.title}</h3>
          <div style={{ color: '#7B2FF2', fontWeight: 600, marginBottom: 2 }}>{listing.location}</div>
          <div style={{ color: '#7A7A7A', fontSize: 14, marginTop: 8 }}>
            Host: {listing.host?.name || 'Unknown'}
          </div>
        </div>
      </Link>
    </div>
  );
}
