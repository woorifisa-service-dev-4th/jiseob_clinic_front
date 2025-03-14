# 지섭이의 동물병원

## 1. swagger
<img width="1421" alt="image" src="https://github.com/user-attachments/assets/a8d61800-8b13-4dc9-b409-889dc7763046" />

## 2. 폴더 구조
```
📦 프로젝트 루트 (Next.js Root)
├── 📂 app/
│   ├── 📂 owners/        # Owner 관련 폴더
│   │   ├── 📂 [ownerId]/ # 특정 Owner에 해당하는 작업
│   │   │   ├──  📂 edit/ # 특정 `Owner'의 수정을 담당
│   │   │   │    ├── 📜 page.js   # 수정기능 페이지
│   │   ├── 📂 new/       # Owner 추가
│   │   │   ├── 📜 page.js   # Owner 추가 페이지
│   ├── 📂 pet/           # Pet 관련 폴더
│   │   ├── 📂 [ownerId]/ # 특정 Owner의 Pet 목록, 수정 등
│   │   │   ├── 📜 page.js   # 특정 `ownerId`의 Pet 목록 조회 & 수정 기능 페이지
│   ├── 📜 layout.js      # 전체 앱 레이아웃 (공통 레이아웃 설정)
│   ├── 📜 page.js        # 홈 페이지 (기본 메인 화면)
│
├── 📂 components/        # UI 컴포넌트 모음
│   ├── 📜 AddPet.js      # 🐾 Pet 추가 모달 컴포넌트
│   ├── 📜 EditPet.js     # ✏️ Pet 수정 모달 컴포넌트
├──
```
## 3. owner page
- 1번 Owner 전체 조회
- 
  <img width="400" alt = "image" src= "https://github.com/user-attachments/assets/489537a2-9e82-4021-a607-3fe1fb11f21e" />

- 2번 Owner lastName을 이용한 조회
- 
  <img width="400" alt = "image" src= "https://github.com/user-attachments/assets/7590f7d2-5acb-4f90-8dba-d568844bbf45" />

- 3번 Owner 수정
- 
  <img width="400" alt = "image" src= "https://github.com/user-attachments/assets/08d7fe15-f773-4937-be86-12743531ec83" />
  <br>
  <img width="400" alt = "image" src= "https://github.com/user-attachments/assets/43761fd5-3c86-4a53-8f5a-ddad3fcbb496" />

- 4번 owner 추가
- 
  <img width="400" alt = "image" src= "https://github.com/user-attachments/assets/f7c5c2d0-1fd7-4ba2-806f-a85ad4a0a4f0" />
  <br>
  <img width="400" alt = "image" src= "https://github.com/user-attachments/assets/f2aaa92d-0a2d-4b12-b2ab-3f0e6730957e" />



## 4. pet page
- 1번 owner의 pet 조회
<img width="1435" alt="image" src="https://github.com/user-attachments/assets/bb8299a5-4251-4737-9a23-05922ba3ac8d" />

- pet 정보 수정
<img width="1440" alt="image" src="https://github.com/user-attachments/assets/9d53bfb1-3e05-4e2e-8e6d-840ae8172625" />

- pet 추가
<img width="1435" alt="image" src="https://github.com/user-attachments/assets/69b33c85-77b8-4baf-82c0-cf54e6f2890c" />

- pet Type 조회
<img width="1427" alt="image" src="https://github.com/user-attachments/assets/b45bea55-9f04-40f9-ad7f-aa2db86f7307" />

