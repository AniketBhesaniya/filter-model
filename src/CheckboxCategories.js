import React, { useMemo, useState } from 'react';
import { data, keys } from './data'; 

function CheckboxCategories({ selectedCategories, onCategoryChange }) {
  const [searchInput, setSearchInput] = useState('');

  const uniqueValues = useMemo(() => {
    const categories = {};

    data.forEach(item => {
      keys.forEach(key => {
        if (key !== 'id' && key !== 'Name') { 
          if (!categories[key]) {
            categories[key] = [];
          }
          if (item[key] && !categories[key].includes(item[key])) {
            categories[key].push(item[key]);
          }
        }
      });
    });

    Object.keys(categories).forEach(key => {
      categories[key].sort();
    });

    return categories;
  }, []);

  const filteredCategories = useMemo(() => {
    const filtered = {};

    Object.keys(uniqueValues).forEach(key => {
      filtered[key] = uniqueValues[key].filter(value =>
        value.toLowerCase().includes(searchInput.toLowerCase())
      );
    });

    return filtered;
  }, [searchInput, uniqueValues]);

  keys.forEach(key => {
    if (!selectedCategories[key]) {
      selectedCategories[key] = [];
    }
  });

  const handleSearchInputChange = e => {
    setSearchInput(e.target.value);
  };

  return (
    <div className="mx-auto max-w-4xl p-6 bg-gray-100 rounded-lg shadow-md">
      <div className="grid grid-cols-2 gap-4">
        {Object.keys(filteredCategories).map(categoryType => (
          <div key={categoryType} className="space-y-2">
            <h3 className="text-lg font-semibold mb-2 text-gray-800 capitalize">
              {categoryType}
            </h3>
            {filteredCategories[categoryType]?.map(category => (
              <CheckboxOption
                key={category}
                label={category}
                value={category}
                checked={selectedCategories[categoryType]?.includes(category)}
                onChange={() => onCategoryChange(categoryType, category)}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="mt-4">
        <input
          type="text"
          placeholder="Search categories"
          value={searchInput}
          onChange={handleSearchInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
        />
      </div>
    </div>
  );
}

function CheckboxOption({ label, value, checked, onChange }) {
  return (
    <label className="flex items-center">
      <input
        type="checkbox"
        className="h-5 w-5 text-indigo-600 rounded-md focus:ring-indigo-500"
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <span className="ml-2 text-gray-700">{label}</span>
    </label>
  );
}

export default CheckboxCategories;
