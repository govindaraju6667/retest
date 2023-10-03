import axios from "axios";
import React, { useEffect, useState } from "react";

export const ServerData = () => {
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectSorting, setSelectSorting] = useState("Low to high");

  useEffect(() => {
    fetchServerData();
  }, []);

  const fetchServerData = () => {
    axios
      .get("http://localhost:3030/productDetails")
      .then((response) => {
        console.log(response.data);
        setData(response.data);
        // console.log(data);
      })
      .catch((error) => console.log("Error:", error));
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleChange = (event) => {
    setSelectSorting(event.target.value);
  };

  const getFilteredData = () => {
    let filteredData = data;

    if (selectedCategory !== "All") {
      filteredData = data.filter((productDetails) => {
        return productDetails.category === selectedCategory;
      });
    }

    if (selectSorting === "Low to high") {
      filteredData.sort((a, b) => a.price - b.price);
    } else if (selectSorting === "High to low") {
      filteredData.sort((a, b) => b.price - a.price);
    }
    return filteredData;
  };

  return (
    <div>
      <h1>Product Data</h1>
      <select id="price" onChange={handleChange}>
        <option label="Low to high">Low to high </option>
        <option label="High to low">High to low</option>
        <option label="Asending">Asending</option>
        <option label="Desending">Desending </option>
      </select>

      <select id="items" onChange={handleCategoryChange}>
        <option label="All">All</option>
        <option label="Electronics">Electronics</option>
        <option label="Furniture">Furniture</option>
        <option label="Fashion">Fashion</option>
        <option label="Appliances">Appliances </option>
      </select>

      {getFilteredData().map((item) => {
        return (
          <div key={item.id}>
            <h2>Category: {item.category}</h2>
            <h3>Name: {item.name}</h3>
            <p>Price: {item.price}</p>
          </div>
        );
      })}
    </div>
  );
};
