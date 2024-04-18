import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const response = await fetch("/api/categories");
    const data = await response.json();
    setCategories(data.categories);
  };

  const createCategory = async () => {
    await fetch("/api/category/" + encodeURIComponent(newCategory), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    setNewCategory("");
    fetchCategories();
  };

  const deleteCategory = async (name) => {
    await fetch("/api/categorydelete/" + encodeURIComponent(name), {
      method: "POST",
    });
    fetchCategories();
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Categories</h1>
      <div className="flex mb-4">
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Enter a new category"
        />
        <button
          className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={createCategory}
        >
          Add
        </button>
      </div>
      {categories.length > 0 && (
        <ul className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          {categories.map((category) => (
            <li key={category} className="mb-4">
              <div className="flex justify-between items-center">
                <span>{category}</span>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={() => deleteCategory(category)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="flex justify-between">
        <Link
          to="/add-transaction"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Transaction
        </Link>
        <Link
          to="/transactions"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Transaction List
        </Link>
      </div>
    </div>
  );
};
