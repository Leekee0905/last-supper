# 🪖 최후의 만찬

### 입영하는 사용자들에게 훈련소 주변의 식당을 추천해주는 서비스입니다.

# 🔗 배포 링크

### https://last-supper.vercel.app/

# 📚 프로젝트 구조

<details>
<summary>📦src</summary>

```
 ┣ 📂api
 ┃ ┣ 📜apiInstance.js
 ┃ ┣ 📜auth.js
 ┃ ┗ 📜myActivitesApi.js
 ┣ 📂components
 ┃ ┣ 📜AutoComplete.jsx
 ┃ ┣ 📜LoadingModal.jsx
 ┃ ┗ 📜Pagination.jsx
 ┣ 📂hooks
 ┃ ┗ 📂queries
 ┃ ┃ ┣ 📂auth
 ┃ ┃ ┃ ┣ 📜useHasTokenAuthenticatedQuery.js
 ┃ ┃ ┃ ┣ 📜useLoginQuery.js
 ┃ ┃ ┃ ┣ 📜useSignupQuery.js
 ┃ ┃ ┃ ┗ 📜useUpdateProfileQuery.js
 ┃ ┃ ┣ 📂myActivities
 ┃ ┃ ┃ ┗ 📜myActivityQuery.js
 ┃ ┃ ┗ 📜queryKeys.js
 ┣ 📂layout
 ┃ ┣ 📂components
 ┃ ┃ ┣ 📜HamburgerContents.jsx
 ┃ ┃ ┣ 📜HamburgerItem.jsx
 ┃ ┃ ┣ 📜HamburgerMenu.jsx
 ┃ ┃ ┣ 📜Sidebar.jsx
 ┃ ┃ ┗ 📜SidebarHeader.jsx
 ┃ ┗ 📜Layout.jsx
 ┣ 📂pages
 ┃ ┣ 📂Home
 ┃ ┃ ┗ 📜Home.jsx
 ┃ ┗ 📂MainPage
 ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┣ 📂Calculator
 ┃ ┃ ┃ ┃ ┣ 📜Calculator.jsx
 ┃ ┃ ┃ ┃ ┣ 📜DateForm.jsx
 ┃ ┃ ┃ ┃ ┣ 📜EventTimeline.jsx
 ┃ ┃ ┃ ┃ ┣ 📜ProcessBar.jsx
 ┃ ┃ ┃ ┃ ┗ 📜RankTags.jsx
 ┃ ┃ ┃ ┣ 📂Detail
 ┃ ┃ ┃ ┃ ┣ 📜DetailModal.jsx
 ┃ ┃ ┃ ┃ ┣ 📜Favorite.jsx
 ┃ ┃ ┃ ┃ ┣ 📜Review.jsx
 ┃ ┃ ┃ ┃ ┗ 📜ReviewItem.jsx
 ┃ ┃ ┃ ┣ 📂Login
 ┃ ┃ ┃ ┃ ┗ 📜LoginModal.jsx
 ┃ ┃ ┃ ┣ 📂MapMarker
 ┃ ┃ ┃ ┃ ┗ 📜EventMarkerContainer.jsx
 ┃ ┃ ┃ ┣ 📂Modal
 ┃ ┃ ┃ ┃ ┗ 📜Modal.jsx
 ┃ ┃ ┃ ┣ 📂MyPage
 ┃ ┃ ┃ ┃ ┣ 📜MyActivities.jsx
 ┃ ┃ ┃ ┃ ┣ 📜MyActivityList.jsx
 ┃ ┃ ┃ ┃ ┣ 📜MyPage.jsx
 ┃ ┃ ┃ ┃ ┗ 📜Profile.jsx
 ┃ ┃ ┃ ┣ 📂Signup
 ┃ ┃ ┃ ┃ ┗ 📜SignupModal.jsx
 ┃ ┃ ┃ ┗ 📜AuthForm.jsx
 ┃ ┃ ┗ 📜MainPage.jsx
 ┣ 📂shared
 ┃ ┗ 📜Router.jsx
 ┣ 📂store
 ┃ ┣ 📜useCalculatorStore.js
 ┃ ┣ 📜useHamburgerStore.js
 ┃ ┣ 📜useModalStore.js
 ┃ ┣ 📜useRestaurantsInfo.js
 ┃ ┣ 📜useReview.js
 ┃ ┗ 📜useUserStore.js
 ┣ 📂styles
 ┃ ┗ 📜.gitkeep
 ┣ 📂utils
 ┃ ┗ 📜campSearchWordConverter.js
 ┣ 📜main.jsx
 ┗ 📜reset.css
```

</details>

# ⚒️ 개발 환경

<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/>
<img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white"/>
<img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white"/>
<br/>
<img src="https://img.shields.io/badge/HTML-239120?style=for-the-badge&logo=html5&logoColor=white"/>
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white"/><img src="https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E"/><br/>
<img src="https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=slack&logoColor=white"/>
<img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white"/>

# 🗓️ 프로젝트 기간

2024.9.12 ~ 2024.9.23

# 🎨 주요 기능

## 1️⃣ 로그인 / 회원가입
### 로그인
![로그인](https://github.com/user-attachments/assets/aa3139ce-d913-4ff0-a069-04730d0f2beb)

### 회원가입
![회원가입](https://github.com/user-attachments/assets/2ec163d5-9c8d-4d43-9a92-9d0507c3b3ad)

REST API를 통한 로그인과 회원가입을 구현하였습니다.

## 2️⃣ 훈련소 기반 위치 검색
![검색](https://github.com/user-attachments/assets/5e33d30c-3135-4435-83cf-89ebce7d609b)
검색어 입력시 훈련소 리스트에 입력값을 비교하여 존재하는 훈련소의 리스트를 출력해줍니다.

## 3️⃣ 즐겨찾기
![즐겨찾기](https://github.com/user-attachments/assets/f5e0ab1c-6c64-4433-bd2b-e6a18941047a)
별 버튼을 눌러 즐겨찾기를 할 수 있습니다.

## 4️⃣ 댓글
![리뷰](https://github.com/user-attachments/assets/3b5b8f50-5c7c-40c5-ba14-1e56376c8bb3)
리뷰 CRUD를 통해 작성, 수정, 삭제를 할 수 있습니다.

## 5️⃣ 마이페이지
### 내 리뷰
![image](https://github.com/user-attachments/assets/b7214981-7ff4-41f6-9639-db7338540ab7)
본인이 작성한 리뷰를 확인하고 수정, 삭제할 수 있습니다.
### 즐겨찾기
![image](https://github.com/user-attachments/assets/5c71914f-0796-4f36-91bf-abac4bf586dd)
본인이 즐겨찾기한 음식점을 볼 수 있습니다.

## 6️⃣ 전역일 계산기
![전역일계산기](https://github.com/user-attachments/assets/3206bcea-87f6-444b-b84a-376ad8ab2443)
전역일을 계산하는 모달입니다.

# 💥 트러블 슈팅

| 기존  | 문제  | 해결  |
| :---: | :---: | :---: |
| input값을 url의 query로 추가 후 해당 위치에 대해 음식점을 검색 후 나열 | 특정 단어가 아니면 검색이 되지 않거나 정확한 위치가 안나옴 | 훈련소 리스트를 생성하고 입력값과 비교하여 ```includes()```함수를 통해 입력값이 포함된 훈련소 목록을 보여주고 리스트에 존재하지 않는다면 toast알림을 출력 |
| zustand를 사용하여 상태를 관리하는 도중 alert 메세지가 중복되어 표시 | 지속 내용 전달이 되지 않는 예상치 못한 동작 발생 | 상태 업데이트 로직을 점검하여, 알럿 추가 시 기존 타이머를 클리어하도록 수정. timeoutIds 맵을 사용하여 각 알럿에 대한 타이머 ID를 관리하고, 알럿이 추가될 때마다 이전 알럿의 타이머를 정리하여 중복 표시를 방지 |
| CRUD시 서버로부터 즉시 데이터 받아와서 보여주기 | 추가, 수정, 삭제 시 데이터를 받아오는 응답이 느려서 흰 화면이 잠시 보였다가 사라짐 | Optimistic Update를 사용하여 서버로부터 오는 응답을 기다리지 않고, UI를 즉시 업데이트하여 해결 (오류 발생 시 원상복구) |

# 💭 자체 의견

- 이기성(팀장)
  - 주제 선정이나 컨셉이 마음에 들었지만 디자인이 조금 아쉽다고 생각합니다!
    같이 리팩토링하는 시간을 가져 코드를 돌아볼 수 있는 기회가 있어서 좋았습니다. :D
- 김도현(팀원)
  - 의견 소통 및 여러 면에서 너무 만족스럽게 작업한 팀 프로젝트였습니다.
    다만 반응형이나 여러 UI/UX 적이 면이 아쉽습니다...
- 신희범(팀원)
  - 팀원간 의견도 잘 맞고, 트러블 없이 정해진 기간 안에 마무리 할 수 있어서 좋았다!
    다만, 기능 방면에서 더 잘할 수 있었을텐데 하는 아쉬움?이 있는 것 같다.
- 이원빈(팀원)
  - 프로젝트를 시작할 때부터 체계를 잘 잡아서 순탄하게 진행했던 것 같다.
    팀원들과 소통이 잘 된 점과 배운 것들을 많이 활용할 수 있어서 좋았다.
    외부 api를 사용하는 것과는 상관 없는 역할을 맡아서 api를 만져보지 못한 점이 아쉽다.
