const data = [
  {
    id: 1,
    mall: "V R Mall",
    address: "Surat",
    rating: "A",
  },
  {
    id: 2,
    mall: "Rahul Raj Mall",
    address: "dallas",
    rating: "B",
  },
  {
    id: 3,
    mall: "Raj Imperial",
    address: "Los Angeles",
    rating: "B",
    category: "one"
  },
  {
    id: 4,
    mall: "jane",
    address: "denver",
    rating: "C",
    category: "two"
  }
];

// Extract all unique keys from the data objects excluding 'id' and 'mall'
const keys = data.reduce((acc, obj) => {
  Object.keys(obj).forEach(key => {
    if (key !== 'id' && key !== 'mall' && !acc.includes(key)) {
      acc.push(key);
    }
  });
  return acc;
}, []);

export { data, keys };
