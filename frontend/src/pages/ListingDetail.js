import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function ListingDetail() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5000/api/listings/${id}`)
      .then(res => setListing(res.data));
  }, [id]);

  const handleBooking = async e => {
    e.preventDefault();
    setMessage('');
    if (!localStorage.getItem('token')) {
      setMessage('Please login to book this property.');
      return;
    }
    if (!startDate || !endDate) {
      setMessage('Please select both start and end dates.');
      return;
    }
    if (startDate > endDate) {
      setMessage('Start date must be before end date.');
      return;
    }
    try {
      await axios.post('http://localhost:5000/api/bookings', {
        listingId: listing._id,
        startDate,
        endDate
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setMessage('Booking successful!');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Booking failed');
    }
  };

  if (!listing) return <div>Loading...</div>;
  return (
    <div className="container">
      <h2 style={{ color: '#232323', fontWeight: 800, fontFamily: 'Inter, Nunito, Arial, sans-serif', fontSize: '2.2rem', marginBottom: 12 }}>{listing.title}</h2>
      <img src={listing.images[0]} alt="property" style={{ width: '100%', maxWidth: 600, borderRadius: 18, boxShadow: '0 4px 32px #FF5A5F22', marginBottom: 18 }} />
      <p style={{ fontSize: '1.08rem', color: '#232323', marginBottom: 8 }}>{listing.description}</p>
      <p style={{ color: '#7B2FF2', fontWeight: 600, fontSize: 16, marginBottom: 4 }}><b>Location:</b> {listing.location}</p>
      <span style={{ display: 'inline-block', background: '#FF5A5F', color: '#fff', fontWeight: 700, borderRadius: 8, padding: '5px 16px', fontSize: 16, marginBottom: 14, boxShadow: '0 2px 8px #FF5A5F22', letterSpacing: '0.01em' }}>${listing.price} <span style={{ fontWeight: 400, fontSize: 13 }}>/night</span></span>
      <div style={{ margin: '2rem 0' }}>
        <h4>Book this property</h4>
        <form onSubmit={handleBooking} style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center', marginBottom: 10 }}>
          <label>Start Date:
            <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} min={listing.availableDates[0]} max={listing.availableDates[listing.availableDates.length-1]} />
          </label>
          <label>End Date:
            <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} min={listing.availableDates[0]} max={listing.availableDates[listing.availableDates.length-1]} />
          </label>
          <button type="submit" style={{background: 'linear-gradient(90deg, #FF5A5F, #7B2FF2)', color: '#fff', fontWeight: 700, border: 'none', borderRadius: 20, padding: '10px 34px', fontSize: 16, boxShadow: '0 1px 8px #ff5a5f22', cursor: 'pointer', transition: 'background 0.18s, box-shadow 0.18s, transform 0.13s'}}>Book</button>
        </form>
        <div style={{ color: message === 'Booking successful!' ? '#43E97B' : '#FF5A5F', minHeight: 24, fontWeight: 600 }}>{message}</div>
        <div style={{ fontSize: 14, color: '#7A7A7A', marginTop: 8 }}>
          <b>Available Dates:</b> {listing.availableDates.join(', ')}
        </div>
      </div>
    </div>
  );
}
