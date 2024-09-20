import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useRestaurantsStore from '../store/useRestaurantsInfo';

const OPTION_LIST = [
  '3사단',
  '5사단',
  '6사단',
  '7사단',
  '12사단',
  '15사단',
  '21사단',
  '28사단',
  '31사단',
  '32사단',
  '35사단',
  '36사단',
  '37사단',
  '39사단',
  '50사단',
  '51사단',
  '55사단',
  '육군훈련소',
  '해병대',
  '해군교육사령부',
  '공군교육사령부'
];

const AutoComplete = ({ mode }) => {
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setIsOpen } = useRestaurantsStore((state) => state);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim() === '') return;
    //입력값이 비슷한 신교대나 훈련소를 찾아서 검색 ex)육군=>육군훈련소, 공군=>공군교육사령부
    const keyword = OPTION_LIST.find((e) => e.includes(searchInput));
    if (!OPTION_LIST.includes(keyword)) {
      alert('존재하지 않는 교육대입니다.');
      return;
    }

    if (mode === 'home') {
      // 쿼리스트링을 포함한 리다이렉트
      navigate(`/mainpage?query=${encodeURIComponent(keyword)}`);
      return;
    }
    if (searchInput.trim() === '') return;
    setSearchParams({ query: keyword });
    setIsOpen(false);
    setFilteredOptions([]);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);

    if (value) {
      setFilteredOptions(OPTION_LIST.filter((option) => option.includes(value)));
    } else {
      setFilteredOptions([]);
    }
  };

  const handleOptionClick = (option) => {
    setSearchInput(option);
    setFilteredOptions([]);
  };

  return (
    <div className={`relative w-full ${mode === 'home' ? '' : 'flex items-center max-w-sm'}`}>
      <form className="flex w-full" onSubmit={handleSearch}>
        <div className="w-full">
          <input
            type="text"
            value={searchInput}
            onChange={handleInputChange}
            placeholder="검색"
            className="pl-4 pr-10 py-2 w-full h-full border border-gray-300 rounded-md focus:outline-none"
          />
          {filteredOptions.length > 0 && (
            <ul className="max-h-[150px] w-full overflow-y-auto mt-[5px] absolute rounded-md">
              {filteredOptions.map((option, index) => (
                <li
                  className="p-[10px] cursor-pointer bg-white border-2 border-[--dark-khaki-color] mb-1 rounded-md"
                  key={index}
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          type="submit"
          className={
            mode === 'home'
              ? 'ml-3 bg-[--dark-khaki-color] text-white px-6 h-12 rounded-md flex items-center justify-center whitespace-nowrap focus:outline-none'
              : 'absolute right-0 pr-3 bottom-2.5'
          }
        >
          {mode === 'home' ? '검색' : <FiSearch className="text-gray-500" size={20} />}
        </button>
      </form>
    </div>
  );
};

export default AutoComplete;
