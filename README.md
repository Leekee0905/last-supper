# 군대는 가야조

# 배포 링크
# 프로젝트 구조

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
