import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function MainContent() {
  const [szallasData, setSzallasData] = useState([]);

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

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Felhasználói felület</h1>
      <div className="row justify-content-center">
        {szallasData.map((szallas) => (
          <div key={szallas.id} className="col-md-6">
            <div className="card mb-4 bg-dark text-light">
              <div className="card-body">
                <h5 className="card-title">{szallas.name}</h5>
                <p className="card-text"><strong>Helyszín:</strong> {szallas.location}</p>
                <p className="card-text"><strong>Leírás:</strong> {szallas.description}</p>
                <p className="card-text"><strong>Minimum éjszakák:</strong> {szallas.minNights}</p>
                <p className="card-text"><strong>Ár:</strong> {szallas.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center">
        <Link to="/login" className="btn btn-primary">Bejelentkezés</Link>
      </div>
    </div>
  );
}

export default MainContent;
