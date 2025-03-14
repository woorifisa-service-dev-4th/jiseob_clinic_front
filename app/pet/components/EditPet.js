"use client";
import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/pets";

export default function EditPet({ ownerId, pet, onClose, onPetUpdated }) {
  const [petTypes, setPetTypes] = useState([]); 
  const [petData, setPetData] = useState({
    id: pet.id,
    name: pet.name,
    birthDate: pet.birthDate,
    type: pet.type ? { id: pet.type.id, name: pet.type.name } : null, 
  });

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/pettypes`)
      .then((res) => {
        setPetTypes(res.data);
      })
      .catch((err) => console.error("Error fetching pet types:", err));
  }, []);

  useEffect(() => {
    if (pet.type) {
      setPetData((prevData) => ({
        ...prevData,
        type: typeof pet.type === "string" ? { name: pet.type } : pet.type, 
      }));
    }
  }, [pet]);
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`${API_BASE_URL}/${ownerId}/${pet.id}`, petData, {
        headers: { "Content-Type": "application/json" },
      });

      alert("✅ 펫 업데이트 성공 !");
      onPetUpdated(); 
      onClose(); 
    } catch (error) {
      console.error("Error updating pet:", error);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-200 bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Edit Pet</h2>

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
          value={petData.type ? petTypes.find(type => type.name === petData.type.name)?.id || "" : ""}
          onChange={(e) => {
            const selectedType = petTypes.find((type) => type.id === parseInt(e.target.value));
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
            Update Pet
          </button>
        </form>

        <button onClick={onClose} className="mt-4 text-red-500">
          Cancel
        </button>
      </div>
    </div>
  );
}
