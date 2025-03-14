"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import AddPet from "../components/AddPet";
import EditPet from "../components/EditPet"; 

const API_BASE_URL = "http://localhost:8080/api/pets"; 

export default function PetPage({ params }) {
  const { ownerId } = params;
  const [pets, setPets] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false); 
  const [selectedPet, setSelectedPet] = useState(null); 

  const fetchPets = () => {
    axios
      .get(`${API_BASE_URL}/${ownerId}`)
      .then((res) => setPets(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchPets(); 
  }, [ownerId]);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">🐶 {ownerId}의 Pets</h1>

      
      <ul className="border p-4 bg-white rounded shadow">
        {pets.length > 0 ? (
          pets.map((pet) => (
            <li
              key={pet.id}
              className="p-2 border-b cursor-pointer hover:bg-gray-100"
              onClick={() => {
                setSelectedPet(pet); 
                setIsEditing(true); 
              }}
            >
              {pet.name} ({pet.type}) 
            </li>
          ))
        ) : (
          <p>No pets found.</p>
        )}
      </ul>

      
      <button
        onClick={() => setIsAdding(true)}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        + Add Pet
      </button>

      {isAdding && <AddPet ownerId={ownerId} onClose={() => setIsAdding(false)} onPetAdded={fetchPets} />}

      {isEditing && selectedPet && (
        <EditPet ownerId={ownerId} pet={selectedPet} onClose={() => setIsEditing(false)} onPetUpdated={fetchPets} />
      )}
    </div>
  );
}
