export const API_URL = "http://localhost:8080/api/owners";

// Owner 목록 조회
export async function fetchOwners() {
    const res = await fetch(API_URL);
    return res.json();
}

// Owner 추가 (응답 확인 추가)
export async function addOwner(ownerData) {
    console.log("전송할 데이터:", JSON.stringify(ownerData)); // 확인용 로그

    const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ownerData),
    });

    const data = await res.json(); // 응답 데이터를 받아서 확인
    console.log("서버 응답:", data);

    if (!res.ok) {
        throw new Error(`서버 오류: ${res.status}, 메시지: ${data.message || "알 수 없는 오류"}`);
    }

    return data;
}
// Owner 수정
export async function updateOwner(ownerId, ownerData) {
    await fetch(`${API_URL}/${ownerId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ownerData),
    });
}


