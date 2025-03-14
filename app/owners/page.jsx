"use client";
import { useEffect, useState } from "react";
import { fetchOwners } from "./api";

export default function OwnerList() {
    const [owners, setOwners] = useState([]); // 빈 배열로 초기화
    const [lastName, setLastName] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        fetchOwners(lastName, page)
            .then(data => {
                setOwners(data.owners || []); // 데이터가 없으면 빈 배열
                setTotalPages(data.totalPages || 1);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, [lastName, page]);

    return (
        <div>
            <h1>Owner 목록</h1>

            <input
                type="text"
                placeholder="Last Name 검색"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
            />

            {loading && <p>로딩 중...</p>}
            {error && <p>에러: {error}</p>}

            <ul>
                {owners?.length > 0 ? (
                    owners.map(owner => (
                        <li key={owner.id}>
                            {owner.firstName} {owner.lastName} - {owner.city} - {owner.telephone}
                        </li>
                    ))
                ) : (
                    <p>조회된 데이터가 없습니다.</p>
                )}
            </ul>

            <div>
                <button disabled={page === 1} onClick={() => setPage(page - 1)}>이전</button>
                <span>{page} / {totalPages}</span>
                <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>다음</button>
            </div>
        </div>
    );
}
