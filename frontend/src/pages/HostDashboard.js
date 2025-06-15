import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function HostDashboard() {
  const [listings, setListings] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', location: '', price: '', images: '', availableDates: '' });
  const [editingId, setEditingId] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      axios.get('http://localhost:5000/api/listings', { headers: { Authorization: `Bearer ${token}` } })
        .then(res => setListings(res.data.filter(l => l.host && l.host._id)));
    }
  }, [token]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const payload = { ...form, price: Number(form.price), images: form.images.split(','), availableDates: form.availableDates.split(',') };
    if (editingId) {
      await axios.put(`http://localhost:5000/api/listings/${editingId}`, payload, { headers: { Authorization: `Bearer ${token}` } });
    } else {
      await axios.post('http://localhost:5000/api/listings', payload, { headers: { Authorization: `Bearer ${token}` } });
    }
    window.location.reload();
  };

  const handleEdit = l => {
    setEditingId(l._id);
    setForm({
      title: l.title,
      description: l.description,
      location: l.location,
      price: l.price,
      images: l.images.join(','),
      availableDates: l.availableDates.join(',')
    });
  };

  const handleDelete = async id => {
    await axios.delete(`http://localhost:5000/api/listings/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    window.location.reload();
  };

  return (
    <div className="container">
      <h2>Host Dashboard</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: 32 }}>
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
        <input name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
        <input name="location" placeholder="Location" value={form.location} onChange={handleChange} required />
        <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} required />
        <input name="images" placeholder="Images (comma separated URLs)" value={form.images} onChange={handleChange} required />
        <input name="availableDates" placeholder="Available Dates (comma separated YYYY-MM-DD)" value={form.availableDates} onChange={handleChange} required />
        <button type="submit">{editingId ? 'Update' : 'Add'} Listing</button>
      </form>
      <h3>Your Listings</h3>
      <ul>
        {listings.map(l => (
          <li key={l._id} style={{ marginBottom: 16 }}>
            <b>{l.title}</b> ({l.location}) - ${l.price}
            <button onClick={() => handleEdit(l)} style={{ marginLeft: 8 }}>Edit</button>
            <button onClick={() => handleDelete(l._id)} style={{ marginLeft: 8 }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
