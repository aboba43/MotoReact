import { useEffect, useState } from "react";
import './style.css';

export default function Main({ filters }) {
    const [motorcycles, setMotorcycles] = useState([]);
    const [filteredMotorcycles, setFilteredMotorcycles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch("https://api.api-ninjas.com/v1/motorcycles?make=Kawasaki&model=Ninja 650", {
                    headers: {
                        'X-Api-Key': 'pijtmQDFyaVmZNKbWmsngQ==vw5y9CHA2lNZpPXF'
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setMotorcycles(data);
                setFilteredMotorcycles(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getData();
    }, []);

    useEffect(() => {
        let filtered = motorcycles;

        if (filters.type.length > 0) {
            filtered = filtered.filter(moto => 
                filters.type.includes(moto.type)
            );
        }

        if (filters.year.length > 0) {
            filtered = filtered.filter(moto => 
                filters.year.includes(moto.year.toString())
            );
        }

        if (filters.make.length > 0) {
            filtered = filtered.filter(moto => 
                filters.make.includes(moto.make)
            );
        }

        setFilteredMotorcycles(filtered);
    }, [filters, motorcycles]);

    if (loading) return (
        <div className="container">
            <p>Loading...</p>
        </div>
    );
    
    if (error) return (
        <div className="container">
            <p>Error: {error}</p>
        </div>
    );

    return (
        <div className="container">
            <h3>Motorcycle Info</h3>
            {filteredMotorcycles.length === 0 ? (
                <p>No motorcycles match your selected filters.</p>
            ) : (
                <div className="motorcycles-grid">
                    {filteredMotorcycles.map((moto, index) => (
                        <div key={index} className="motorcycle-card">
                            <h4>{moto.make} {moto.model} ({moto.year})</h4>
                            <p><strong>Type:</strong> {moto.type}</p>
                            <p><strong>Engine:</strong> {moto.engine}</p>
                            <p><strong>Power:</strong> {moto.power}</p>
                            <p><strong>Torque:</strong> {moto.torque}</p>
                            <p><strong>Cooling:</strong> {moto.cooling}</p>
                            <p><strong>Gearbox:</strong> {moto.gearbox}</p>
                            <p><strong>Fuel Capacity:</strong> {moto.fuel_capacity}</p>
                            <p><strong>Weight:</strong> {moto.total_weight}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
