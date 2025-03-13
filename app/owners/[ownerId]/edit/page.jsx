"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { fetchOwners, updateOwner } from "../../api";

export default function EditOwner() {
    const router = useRouter();
    const { ownerId } = useParams();
    const [form, setForm] = useState({ firstName: "", lastName: "", address: "", city: "", telephone: "" });

    useEffect(() => {
        fetchOwners().then(owners => {
            const owner = owners.find(o => o.id === Number(ownerId));
            if (owner) setForm(owner);
        });
    }, [ownerId]);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateOwner(Number(ownerId), form);
        router.push("/owners");
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
                <button type="submit">수정</button>
            </form>
        </div>
    );
}
