import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropertyCard from '../components/PropertyCard';

export default function Home() {
  const [listings, setListings] = useState([]);
  const [filters, setFilters] = useState({ q: '', location: '', minPrice: '', maxPrice: '', date: '' });
  const [loading, setLoading] = useState(false);

  const fetchListings = async () => {
    setLoading(true);
    const params = {};
    if (filters.q) params.q = filters.q;
    if (filters.location) params.location = filters.location;
    if (filters.minPrice) params.minPrice = filters.minPrice;
    if (filters.maxPrice) params.maxPrice = filters.maxPrice;
    if (filters.date) params.date = filters.date;
    const res = await axios.get('http://localhost:5000/api/listings', { params });
    setListings(res.data);
    setLoading(false);
  };

  useEffect(() => { fetchListings(); }, []); // initial load

  const handleChange = e => setFilters({ ...filters, [e.target.name]: e.target.value });
  const handleSearch = e => { e.preventDefault(); fetchListings(); };
  const handleClear = () => setFilters({ q: '', location: '', minPrice: '', maxPrice: '', date: '' });

  const isFiltered = Object.values(filters).some(val => val);

  return (
    <div className="container">
      <div style={{
        minHeight: '30vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(120deg, #e0e7ef 0%, #f8fafc 100%)',
        borderRadius: 24,
        marginBottom: 40,
        boxShadow: '0 4px 32px rgba(0,0,0,0.10)',
        position: 'relative',
        overflow: 'visible',
        animation: 'fadeIn 1.1s cubic-bezier(.4,0,.2,1)'
      }}>
        <h2 style={{ fontSize: '2.6rem', fontWeight: 800, marginBottom: 10, letterSpacing: '-1.5px', color: '#232323', textShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>Find Your Next Stay</h2>
        <div style={{ color: '#7A7A7A', marginBottom: 34, fontSize: '1.22rem', fontWeight: 500, textShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>Browse beautiful places to stay, worldwide.</div>
        <form
          className="search-bar"
          onSubmit={handleSearch}
        >
          {/* Main search input */}
          <span className="filter-group">
            <span className="filter-icon" aria-label="Search"> 
  <svg width="19" height="19" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{display:'block'}}>
    <circle cx="9" cy="9" r="7" stroke="#FF5A5F" strokeWidth="2"/>
    <line x1="15.3" y1="15.3" x2="18.5" y2="18.5" stroke="#FF5A5F" strokeWidth="2" strokeLinecap="round"/>
  </svg>
</span>
            <input
              className="filter-input"
              name="q"
              placeholder="Search by keyword, city, or title..."
              value={filters.q}
              onChange={handleChange}
            />
          </span>
          <span className="search-divider" />
          <span className="filter-group">
            <span className="filter-icon" aria-label="Location"> 
  <svg width="18" height="18" fill="none" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" style={{display:'block'}}>
    <path d="M10 18s6-6.5 6-10A6 6 0 1 0 4 8c0 3.5 6 10 6 10z" stroke="#FF5A5F" strokeWidth="2" fill="none"/>
    <circle cx="10" cy="8" r="2" stroke="#FF5A5F" strokeWidth="2" fill="none"/>
  </svg>
</span>
            <div className="autocomplete-wrapper">
  <input
    className="filter-input"
    name="location"
    placeholder="Location (e.g. New York)"
    value={filters.location}
    onChange={handleChange}
    aria-autocomplete="list"
    aria-label="Location"
    autoComplete="off"
    onFocus={() => setActiveFilter('location')}
    onBlur={() => setActiveFilter(null)}
  />
  {/* Autocomplete dropdown stub */}
  {false && (
    <ul className="autocomplete-dropdown">
      <li>New York</li>
      <li>London</li>
      <li>Paris</li>
    </ul>
  )}
</div>
          </span>
          <span className="search-divider" />
          <span className="filter-group">
            <span className="filter-icon" aria-label="Price">
  <svg width="18" height="18" fill="none" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" style={{display:'block'}}>
    <rect x="3" y="5" width="14" height="10" rx="3" stroke="#1976d2" strokeWidth="2" fill="none"/>
    <text x="10" y="13" textAnchor="middle" fontSize="9" fill="#1976d2" fontFamily="Arial">₹</text>
  </svg>
</span>
            <input
              className="filter-input"
              name="minPrice"
              type="number"
              placeholder="Min"
              value={filters.minPrice}
              onChange={handleChange}
            />
            <span style={{ margin: '0 4px', color: '#aaa' }}>-</span>
            <input
              className="filter-input"
              name="maxPrice"
              type="number"
              placeholder="Max"
              value={filters.maxPrice}
              onChange={handleChange}
            />
          </span>
          <span className="search-divider" />
          <span className="filter-group">
            <span className="filter-icon" aria-label="Date">
  <svg width="18" height="18" fill="none" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" style={{display:'block'}}>
    <rect x="3" y="5" width="14" height="10" rx="2" stroke="#1976d2" strokeWidth="2" fill="none"/>
    <rect x="7" y="9" width="6" height="2" rx="1" fill="#1976d2"/>
  </svg>
</span>
            <input
              className="filter-input"
              name="date"
              type="date"
              value={filters.date}
              onChange={handleChange}
            />
          </span>
          <button
            className="search-btn" style={{background: 'linear-gradient(90deg, #FF5A5F, #7B2FF2)', color: '#fff', fontWeight: 700, border: 'none', borderRadius: 24, padding: '0.75rem 1.9rem', boxShadow: '0 1px 8px #ff5a5f22', transition: 'background 0.18s, box-shadow 0.18s, transform 0.13s'}}
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <span style={{ display: 'flex', alignItems: 'center' }}>
                <span className="spinner" style={{ width: 20, height: 20, border: '2px solid #fff', borderRightColor: 'transparent', borderRadius: '50%', display: 'inline-block', marginRight: 8, animation: 'spin 0.7s linear infinite' }} />
                Searching...
              </span>
            ) : (
              <><span role="img" aria-label="search">🔍</span> Search</>
            )}
          </button>
          {isFiltered && (
            <button
              type="button"
              onClick={handleClear}
              className="clear-btn"
            >
              Clear Filters
            </button>
          )}
        </form>
      </div>
      <div className="property-list">
        {loading ? (
          <div style={{ color: '#1976d2', fontSize: '1.2rem', padding: '2rem', textAlign: 'center', width: '100%' }}>
            <span className="spinner" style={{ width: 26, height: 26, border: '3px solid #1976d2', borderRightColor: 'transparent', borderRadius: '50%', display: 'inline-block', marginRight: 12, animation: 'spin 0.7s linear infinite', verticalAlign: 'middle' }} />
            Loading listings...
          </div>
        ) : listings.length === 0 ? (
          <div style={{ color: '#FF5A5F', fontSize: '1.2rem', padding: '2rem', textAlign: 'center', width: '100%', fontWeight: 600 }}>
            No properties found. Try adjusting your filters.
          </div>
        ) : (
          listings.map(listing => <PropertyCard key={listing._id} listing={listing} />)
        )}
      </div>
    </div>
  );
}
