import React, { useEffect, useState } from 'react';
import { data, keys } from './data'; 

function DataTable({ selectedCategories }) {
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    filterData();
  }, [selectedCategories]);

  const filterData = () => {
    let filtered = data.filter(item => {
      return keys.every(key => {
        if (selectedCategories && selectedCategories[key] && selectedCategories[key].length > 0) {
          return selectedCategories[key].includes(item[key]);
        }
        return true; 
      });
    });

    setFilteredData(filtered);
  };

  const getTableHeaders = () => {
    if (filteredData.length === 0) return [];

    return keys.filter(key => key !== 'id' && key !== 'Name'); 
  };

  const renderTableHeaders = () => {
    const headers = getTableHeaders();

    return (
      <tr>
        {headers.map((header, index) => (
          <th key={index} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            {header}
          </th>
        ))}
      </tr>
    );
  };

  const renderTableRows = () => {
    return filteredData.map((item, index) => (
      <tr key={index}>
        {getTableHeaders().map((key, idx) => (
          <td key={idx} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            {item[key]}
          </td>
        ))}
      </tr>
    ));
  };

  return (
    <div className="mx-auto max-w-4xl p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Filtered Data</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            {renderTableHeaders()}
          </thead>
          <tbody className="divide-y divide-gray-200">
            {renderTableRows()}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataTable;
