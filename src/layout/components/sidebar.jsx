import { FiMenu, FiSearch } from 'react-icons/fi';

const Sidebar = ({ toggleModal, handleSearch, searchInput, setSearchInput }) => {
  return (
    <aside className="fixed top-0 left-0 h-full w-[400px] bg-gray-100 shadow-md">
      <SidebarHeader
        toggleModal={toggleModal}
        handleSearch={handleSearch}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
      />
      <SidebarContent />
    </aside>
  );
};

const SidebarHeader = ({ toggleModal, handleSearch, searchInput, setSearchInput }) => (
  <div className="sticky top-0 bg-gray-100 z-10 p-4">
    <div className="flex items-center justify-between">
      <div className="flex flex-col items-center mr-5">
        <FiMenu className="text-2xl cursor-pointer" onClick={toggleModal} />
        <span className="text-xs text-gray-500 mt-1">메뉴</span>
      </div>
      <div className="relative flex items-center w-full max-w-sm">
        <form onSubmit={handleSearch} className="flex w-full">
          <input
            type="text"
            placeholder="검색"
            className="pl-4 pr-10 py-2 w-full border border-gray-300 rounded-md focus:outline-none"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button
            type="submit"
            className="absolute right-0 pr-3 bottom-3"
          >
            <FiSearch className="text-gray-500" size={20} />
          </button>
        </form>
      </div>
    </div>
  </div>
);

const SidebarContent = () => (
  <div className="p-4 space-y-4 overflow-y-auto h-[calc(100vh-72px)]">
    {Array.from({ length: 30 }, (_, index) => (
      <div key={index} className="p-4 bg-white shadow-md rounded-md">
        <h2 className="text-lg font-semibold">콘텐츠 {index + 1}</h2>
        <p>이곳에 내용이 들어갑니다. 여기에 실제 콘텐츠를 추가할 수 있습니다.</p>
      </div>
    ))}
  </div>
);

export default Sidebar;
