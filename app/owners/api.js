export const API_URL = "http://localhost:8080/api/owners";

export async function fetchOwners(lastName = "", page = 1) {
    const url = new URL(API_URL);
    if (lastName) url.searchParams.append("lastName", lastName);
    url.searchParams.append("page", page);

    console.log("API 요청 URL:", url.toString());

    const res = await fetch(url);
    const data = await res.json();

    console.log("API 응답 데이터:", data); 

    if (!res.ok) {
        throw new Error(`서버 오류: ${res.status}`);
    }

    return {
        owners: data.owners || [], 
        totalPages: data.totalPages || 1,
    };
}

//Owner삭제시 조회할때 쓰이는 api
export async function fetchOwnerById(ownerId) {
    const res = await fetch(`${API_URL}/${ownerId}`);
    if (!res.ok) {
        throw new Error(`서버 오류: ${res.status}`);
    }
    return res.json();
}



// Owner 추가 (응답 확인 추가)
export async function addOwner(ownerData) {
    console.log("전송할 데이터:", JSON.stringify(ownerData)); 

    const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ownerData),
    });

    const data = await res.json(); 
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


