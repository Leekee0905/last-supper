import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi'; // 돋보기 아이콘

const Search = () => {
    const [searchInput, setSearchInput] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchParams({ query: searchInput });
    };

    return (
        <div className="w-full max-w-lg">
            <form onSubmit={handleSearch} className="flex items-center">
                <div className="relative w-full">
                    <input
                        type="text"
                        className="p-3 h-12 w-full border border-gray-300 rounded-md pr-10 focus:outline-none"
                        placeholder="입대하시는 훈련소를 입력해주세요."
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSearch(e);
                            }
                        }}
                    />
                    <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <FiSearch className="text-gray-500" size={20} />
                    </span>
                </div>
                <button
                    type="submit"
                    className="ml-3 bg-blue-500 text-white px-6 h-12 rounded-md flex items-center justify-center whitespace-nowrap focus:outline-none"
                >
                    검색
                </button>

            </form>
        </div>
    );
};

export default Search;