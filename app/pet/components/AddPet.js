"use client";
import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/pets"; 

export default function AddPet({ ownerId, onClose }) {
  const [petTypes, setPetTypes] = useState([]); 
  const [petData, setPetData] = useState({
    name: "",
    birthDate: "",
    type: null, 
  });

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/pettypes`) 
      .then((res) => {
        console.log("Fetched pet types:", res.data); 
        setPetTypes(res.data);
      })
      .catch((err) => console.error("Error fetching pet types:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!petData.type) {
      alert("Please select a pet type.");
      return;
    }

    try {
      await axios.post(`${API_BASE_URL}/${ownerId}`, petData, {
        headers: { "Content-Type": "application/json" },
      });
      alert("Pet added successfully!");
      onClose(); 
    } catch (error) {
      console.error("Error adding pet:", error);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-300 bg-opacity-60">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">+ Add a New Pet</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Pet Name"
            value={petData.name}
            onChange={(e) => setPetData({ ...petData, name: e.target.value })}
            className="border p-2 rounded"
            required
          />
          <input
            type="date"
            value={petData.birthDate}
            onChange={(e) => setPetData({ ...petData, birthDate: e.target.value })}
            className="border p-2 rounded"
            required
          />

          <select
            value={petData.type ? petData.type.id : ""}
            onChange={(e) => {
              const selectedType = petTypes.find(
                (type) => type.id === parseInt(e.target.value)
              );
              setPetData({ ...petData, type: selectedType }); 
            }}
            className="border p-2 rounded"
            required
          >
            <option value="">Select Pet Type</option>
            {petTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>

          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
            Add Pet
          </button>
        </form>

        <button onClick={onClose} className="mt-4 text-red-500">
          Cancel
        </button>
      </div>
    </div>
  );
}
