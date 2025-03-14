"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { fetchOwnerById, fetchOwners, updateOwner } from "../../api";

export default function EditOwner() {
    const router = useRouter();
    const { ownerId } = useParams();
    const [form, setForm] = useState({ firstName: "", lastName: "", address: "", city: "", telephone: "" });

    useEffect(() => {
        if (!ownerId) return;
        console.log("Fetching owner data for ID:", ownerId);
    
        fetchOwnerById(ownerId).then(owner => {
            console.log("Fetched owner:", owner);
            setForm(owner);
        }).catch(err => {
            console.error("Error fetching owner data:", err);
        });
    }, [ownerId]);
    
     // ✅ 입력 필드 변경 핸들러
     const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // ✅ 폼 제출 핸들러 추가
    const handleSubmit = async (e) => {
        e.preventDefault(); // 기본 폼 제출 동작 방지

        try {
            console.log("Updating owner:", form);
            await updateOwner(Number(ownerId), form);
            router.push("/owners"); // 업데이트 후 목록 페이지로 이동
        } catch (err) {
            console.error("Error updating owner:", err);
        }
    };

    return (
        <div style={{ maxWidth: "400px", marginLeft: "20px", display: "flex", flexDirection: "column" }}>
            <h1>Owner 수정</h1>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", width: "100%" }}>
                <input name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} />
                <input name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} />
                <input name="address" placeholder="Address" value={form.address} onChange={handleChange} />
                <input name="city" placeholder="City" value={form.city} onChange={handleChange} />
                <input name="telephone" placeholder="Telephone" value={form.telephone} onChange={handleChange} />
                <button type="submit">수정</button>
            </form>
        </div>
    );
}
