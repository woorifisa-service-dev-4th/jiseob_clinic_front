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
    type: typeof pet.type === "string" ? { name: pet.type } : pet.type, // ✅ type이 문자열이면 객체 변환
  });

  // ✅ 모든 PetType 불러오기
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/pettypes`)
      .then((res) => setPetTypes(res.data))
      .catch((err) => console.error("Error fetching pet types:", err));
  }, []);

  // ✅ pet 변경 시 데이터 업데이트
  useEffect(() => {
    setPetData({
      id: pet.id,
      name: pet.name,
      birthDate: pet.birthDate,
      type: typeof pet.type === "string" ? { name: pet.type } : pet.type, // ✅ 기존 type 유지
    });
  }, [pet]);

  // ✅ 입력 필드 변경 핸들러 (이름, 날짜 포함)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPetData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // ✅ Pet 수정 요청 (PUT)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🛑 기존 `type`을 유지하는 로직 추가
    let updatedType = petData.type;
    if (typeof petData.type === "string") {
      updatedType = petTypes.find((t) => t.name === petData.type) || { name: petData.type };
    }

    // 🛑 기존 `type`이 변경되지 않았다면 유지 (새로운 타입을 찾지 않음)
    if (!petTypes.find((t) => t.id === updatedType.id)) {
      updatedType = petTypes.find((t) => t.name === pet.type) || pet.type;
    }

    // 🛑 최종 업데이트 데이터 설정
    const updatedPetData = {
      ...petData,
      type: updatedType,
    };

    try {
      await axios.put(`${API_BASE_URL}/${ownerId}/${pet.id}`, updatedPetData, {
        headers: { "Content-Type": "application/json" },
      });

      alert("✅ 펫 업데이트 성공!");
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
          {/* ✅ 이름 입력 필드 */}
          <input
            type="text"
            name="name"
            placeholder="Pet Name"
            value={petData.name}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          {/* ✅ 생년월일 입력 필드 */}
          <input
            type="date"
            name="birthDate"
            value={petData.birthDate}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          {/* ✅ Pet Type 선택 필드 */}
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
