"use client";
import { useEffect, useState } from "react";
import { fetchOwners } from "./api";
import { useRouter } from "next/navigation";

export default function OwnerList() {
    const [owners, setOwners] = useState([]);
    
    useEffect(() => {
        fetchOwners().then(setOwners);
    }, []);

    return (
        <div>
            <h1>Owner 목록</h1>
            <ul>
                {owners.map(owner => (
                    <li key={owner.id}>
                        {owner.firstName} {owner.lastName} - {owner.city}
                    </li>
                ))}
            </ul>
        </div>
    );
}

