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

## 2️⃣ 훈련소 기반 위치 검색

## 3️⃣ 즐겨찾기

## 4️⃣ 댓글

## 5️⃣ 마이페이지

## 6️⃣ 전역일 계산기

# 💥 트러블 슈팅

| 문제  | 원인  | 해결  |
| :---: | :---: | :---: |
| 문제1 | 원인1 | 해결1 |

# 💭 자체 의견

- 이기성(팀장)
  - 주제 선정이나 컨셉이 마음에 들었지만 디자인이 조금 아쉽다고 생각합니다!
    같이 리팩토링하는 시간을 가져 코드를 돌아볼 수 있는 기회가 있어서 좋았습니다. :D
- 김도현(팀원)
  - 작성 예정
- 신희범(팀원)
  - 팀원간 의견도 잘 맞고, 트러블 없이 정해진 기간 안에 마무리 할 수 있어서 좋았다!
    다만, 기능 방면에서 더 잘할 수 있었을텐데 하는 아쉬움?이 있는 것 같다.
- 이원빈(팀원)
  - 프로젝트를 시작할 때부터 체계를 잘 잡아서 순탄하게 진행했던 것 같다.
    팀원들과 소통이 잘 된 점과 배운 것들을 많이 활용할 수 있어서 좋았다.
    외부 api를 사용하는 것과는 상관 없는 역할을 맡아서 api를 만져보지 못한 점이 아쉽다.