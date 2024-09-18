import React, { useState } from 'react';

const DateForm = ({ onSubmit }) => {
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(date);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <label className="block mb-2 text-sm font-medium text-gray-700">입대 날짜:</label>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="block w-full p-2 border border-gray-300 rounded-lg focus:border-blue-500 transition-colors duration-300"
      />
      <button
        type="submit"
        className="mt-2 w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-all duration-300"
      >
        제출
      </button>
    </form>
  );
};

export default DateForm;