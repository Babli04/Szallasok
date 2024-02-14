import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Admin() {
  const [szallasData, setSzallasData] = useState([]);
  const [newSzallas, setNewSzallas] = useState({
    id: '',
    name: '',
    location: '',
    description: '',
    minNights: '',
    price: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    handleGetAll();
  }, []);

  const handleGetAll = async () => {
    try {
      const response = await fetch('https://nodejs.sulla.hu/data/');
      if (!response.ok) {
        throw new Error('Hiba történt a kérés során: ' + response.status);
      }
      const data = await response.json();
      setSzallasData(data);
    } catch (error) {
      console.error('Hiba történt a szállások lekérdezésekor:', error);
    }
  };

  const handleAddSzallas = async () => {
    try {
      const response = await fetch('https://nodejs.sulla.hu/data/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newSzallas)
      });
      if (!response.ok) {
        throw new Error('Hiba történt a kérés során: ' + response.status);
      }
      alert('Szállás hozzáadva!');
      handleGetAll();
      setNewSzallas({
        id: '',
        name: '',
        location: '',
        description: '',
        minNights: '',
        price: ''
      });
    } catch (error) {
      console.error('Hiba történt a szállás hozzáadása során:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSzallas(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleDeleteSzallas = async (id) => {
    try {
      const response = await fetch(`https://nodejs.sulla.hu/data/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Hiba történt a kérés során: ' + response.status);
      }
      alert('Szállás törölve!');
      handleGetAll();
    } catch (error) {
      console.error('Hiba történt a szállás törlése során:', error);
    }
  };

  const handleEditClick = (szallas) => {
    setIsEditing(true);
    setEditId(szallas.id);
    setNewSzallas(szallas);
  };

  const handleEditSzallas = async () => {
    try {
      const response = await fetch(`https://nodejs.sulla.hu/data/${editId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newSzallas)
      });
      if (!response.ok) {
        throw new Error('Hiba történt a kérés során: ' + response.status);
      }
      alert('Szállás módosítva!');
      handleGetAll();
      setIsEditing(false);
      setEditId(null);
      setNewSzallas({
        id: '',
        name: '',
        location: '',
        description: '',
        minNights: '',
        price: ''
      });
    } catch (error) {
      console.error('Hiba történt a szállás módosítása során:', error);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditId(null);
    setNewSzallas({
      id: '',
      name: '',
      location: '',
      description: '',
      minNights: '',
      price: ''
    });
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Admin felület</h1>
      <div className="row justify-content-center mb-4">
        <div className="col-md-6">
          <div className="card bg-dark text-light p-4">
            <h2>Új szállás hozzáadása</h2>
            <div className="mb-3">
              <input type="text" name="id" value={newSzallas.id} onChange={handleInputChange} className="form-control" placeholder="ID" />
            </div>
            <div className="mb-3">
              <input type="text" name="name" value={newSzallas.name} onChange={handleInputChange} className="form-control" placeholder="Név" />
            </div>
            <div className="mb-3">
              <input type="text" name="location" value={newSzallas.location} onChange={handleInputChange} className="form-control" placeholder="Helyszín" />
            </div>
            <div className="mb-3">
              <input type="text" name="description" value={newSzallas.description} onChange={handleInputChange} className="form-control" placeholder="Leírás" />
            </div>
            <div className="mb-3">
              <input type="text" name="minNights" value={newSzallas.minNights} onChange={handleInputChange} className="form-control" placeholder="Minimum éjszakák" />
            </div>
            <div className="mb-3">
              <input type="text" name="price" value={newSzallas.price} onChange={handleInputChange} className="form-control" placeholder="Ár" />
            </div>
            <div className="text-center">
              {isEditing ? (
                <>
                  <button className="btn btn-success me-2" onClick={handleEditSzallas}>Mentés</button>
                  <button className="btn btn-secondary" onClick={handleCancelEdit}>Mégse</button>
                </>
              ) : (
                <button className="btn btn-primary" onClick={handleAddSzallas}>Hozzáadás</button>
              )}
            </div>
          </div>
        </div>
      </div>
      <h2 className="text-center mb-4">Szállások</h2>
      <div className="row justify-content-center">
        {szallasData.map((szallas) => (
          <div key={szallas.id} className="col-md-6 mb-4">
            <div className="card bg-dark text-light">
              <div className="card-body">
                <h5 className="card-title">{szallas.name}</h5>
                <p className="card-text">ID: {szallas.id}</p>
                <p className="card-text">Helyszín: {szallas.location}</p>
                <p className="card-text">Leírás: {szallas.description}</p>
                <p className="card-text">Minimum éjszakák: {szallas.minNights}</p>
                <p className="card-text">Ár: {szallas.price}</p>
                <button className="btn btn-danger me-2" onClick={() => handleDeleteSzallas(szallas.id)}>Törlés</button>
                <button className="btn btn-warning me-2" onClick={() => handleEditClick(szallas)}>Szerkesztés</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Link to="/" className="btn btn-primary mt-3">Vissza a főoldalra</Link>
    </div>
  );
}

export default Admin;
