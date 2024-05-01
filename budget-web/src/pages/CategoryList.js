import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import classes from "../static/CategoryList.module.css";
import ColorHash from "color-hash";

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

  const colorHash = new ColorHash({ hue: { min: 180, max: 359 } });

  return (
    <div className="max-w-6xl mx-auto">
      <div className="p-6 bg-white border border-gray-500 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mt-8">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
        Categories
      </h1>
      <div className="flex mb-4">
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Enter a new category"
        />
        <button
          className="ml-2 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          onClick={createCategory}
        >
          Add
        </button>
      </div>
      {categories.length > 0 && (
        <ul className="bg-white shadow-md rounded-lg mb-4 divide-y divide-gray-200">
          {categories.map((category) => (
            <li key={category} className="px-6 py-4">
              <div className="flex justify-between items-center">
                <span>
                  <span
                    className={classes.dot}
                    style={{ backgroundColor: colorHash.hex(category) }}
                  ></span>
                  <span>{category}</span>
                </span>
                <button
                  className="text-white bg-gradient-to-r from-red-500 to-red-700 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
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
          className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Add Transaction
        </Link>
        <Link
          to="/transactions"
          className="text-white bg-gradient-to-r from-green-500 to-green-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Transaction List
        </Link>
      </div>
    </div>
    </div>
  );
};
