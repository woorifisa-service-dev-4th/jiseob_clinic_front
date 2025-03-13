"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { addOwner } from "../api";

export default function AddOwner() {
    const router = useRouter();
    const [form, setForm] = useState({ 
        firstName: "", 
        lastName: "", 
        address: "", 
        city: "", 
        telephone: "" 
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("전송할 데이터:", form); // 프론트에서 보낼 데이터 확인

        try {
            const response = await addOwner(form);
            console.log("서버 응답:", response);
            router.push("/owners"); // 추가 후 목록으로 이동
        } catch (error) {
            console.error("오류 발생:", error);
        }
    };

    return (
        <div style={{ maxWidth: "400px", marginLeft: "20px", display: "flex", flexDirection: "column" }}>
            <h1>Owner 추가</h1>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", width: "100%" }}>
                <input name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} />
                <input name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} />
                <input name="address" placeholder="Address" value={form.address} onChange={handleChange} />
                <input name="city" placeholder="City" value={form.city} onChange={handleChange} />
                <input name="telephone" placeholder="Telephone" value={form.telephone} onChange={handleChange} />
                <button type="submit">추가</button>
            </form>
        </div>
    );
}
