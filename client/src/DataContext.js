// DataContext.js
import React, { createContext, useState, useEffect } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filterValue, setFilterValue] = useState([]);

  const getData = async () => {
    try {
      const response = await fetch("http://localhost:4000/getData");
      const jsonData = await response.json();
      console.log(jsonData);
      return jsonData;
    } catch (error) {
      console.error("Error fetching data: ", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();
      setRows(data?.userData);
      setFilteredRows(data?.userData);
    };
    fetchData();
  }, []);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchValue(value);
    filterRows(value, filterValue);
  };

  const handleFilter = (event) => {
    const {
      target: { value },
    } = event;
    setFilterValue(
      typeof value === "string" ? value.split(",") : value
    );
    filterRows(searchValue, value);
  };

  const filterRows = (search, filters) => {
    const filteredData = rows.filter((row) => {
      const searchMatch =
        (row.firstName && row.firstName.toLowerCase().includes(search)) ||
        (row.lastName && row.lastName.toLowerCase().includes(search)) ||
        (row.address && row.address.toLowerCase().includes(search)) ||
        (row.phoneNumber && row.phoneNumber.toLowerCase().includes(search)) ||
        (row.age && row.age.toString().toLowerCase().includes(search));

      const filterMatch =
        filters.length === 0 ||
        filters.includes(row.firstName) ||
        filters.includes(row.lastName) ||
        filters.includes(row.phoneNumber);

      return searchMatch && filterMatch;
    });

    setFilteredRows(filteredData);
  };

  return (
    <DataContext.Provider
      value={{ rows, filteredRows, searchValue, filterValue, handleSearch, handleFilter }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
