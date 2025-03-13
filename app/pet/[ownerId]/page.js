"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import AddPet from "../components/AddPet";

const API_BASE_URL = "http://localhost:8080/api/pets"; 

export default function PetPage({ params }) {
  const { ownerId } = params;
  const [pets, setPets] = useState([]);
  const [isAdding, setIsAdding] = useState(false); 

  // 특정 Owner의 Pet 목록 가져오기
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/${ownerId}`)
      .then((res) => setPets(res.data))
      .catch((err) => console.error(err));
  }, [ownerId]);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">🐶 {ownerId} Pets</h1>

      {/* Pet 목록 */}
      <ul className="border p-4 bg-white rounded shadow">
        {pets.length > 0 ? (
          pets.map((pet) => (
            <li key={pet.id} className="p-2 border-b">
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

      {isAdding && <AddPet ownerId={ownerId} onClose={() => setIsAdding(false)} />}
    </div>
  );
}
