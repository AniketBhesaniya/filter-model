import React, { useState } from 'react';
import './App.css';
import CheckboxCategories from './CheckboxCategories';
import DataTable from './DataTable';
import {data} from './data'; 

function App() {
  const [selectedCategories, setSelectedCategories] = useState({
    city: [],
    category: [],
    type: [],
    active: []
  });

  const handleCategoryChange = (categoryType, category) => {
    setSelectedCategories(prev => ({
      ...prev,
      [categoryType]: prev[categoryType].includes(category)
        ? prev[categoryType].filter(cat => cat !== category)
        : [...prev[categoryType], category]
    }));
  };

  return (
    <div className="bg-gray-200 min-h-screen">
      <header className="bg-white shadow-md">
        <div className="container mx-auto py-4 px-6">
          <h1 className="text-3xl font-bold text-gray-800">Filter Table Data</h1>
          <p className="text-gray-600">Select categories to filter data in the table below.</p>
        </div>
      </header>
      <main className="container mx-auto py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="mb-6">
              <div className="bg-blue-100 border-t-4 border-blue-500 rounded-lg p-4">
                <h2 className="text-lg font-semibold text-blue-800">Creator Information</h2>
                <p className="text-gray-600">Creator: Aniket Bhesaniya</p>
                <p className="text-gray-600">Contact: 9974689790</p>
              </div>
            </div>
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Filter Categories</h2>
            <CheckboxCategories
              selectedCategories={selectedCategories}
              onCategoryChange={handleCategoryChange}
            />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Filtered Data</h2>
            <DataTable
              data={data}
              selectedCategories={selectedCategories}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
