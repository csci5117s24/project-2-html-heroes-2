import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";

export const AddTransaction = () => {
  const location = useLocation();
  const [newTransaction, setNewTransaction] = useState({
    description: location.state?.description || "",
    value: location.state?.value || "",
    category: "Other",
    date: (new Date()).toISOString().substring(0, 10),
  });
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const response = await fetch("/api/categories");
    const data = await response.json();
    setCategories(data.categories);
  };

  const createTransaction = async () => {
    await fetch("/api/transaction", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTransaction),
    });
    setNewTransaction({
      description: "",
      value: "",
      category: "",
      date: "",
    });
    navigate("/transactions");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTransaction((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleValueChange = (e) => {
    const { name, value } = e.target;
    let tempValue = value;
    tempValue = Math.round(value * 100) / 100;
    setNewTransaction((prevState) => ({
      ...prevState,
      [name]: tempValue,
    }));
  };

  return (
    <div className="mx-auto max-w-4xl mb-10">
      <div className="p-6 bg-white border border-gray-500 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mt-8">
        <div className="flex flex-wrap justify-between items-center mb-4">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            Add Transaction
          </h1>

          <div className="flex flex-wrap mt-3 md:mt-0">
            <Link
              to="/transactions"
              className="text-white mr-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Transaction List
            </Link>
            <Link
              to="/add-receipt"
              className="text-white mr-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Capture Receipt
            </Link>

            <Link
              to="/categories"
              className="text-white mr-2 mt-2 md:mt-0 bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Manage Categories
            </Link>
          </div>
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">
            Description
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
            type="text"
            name="description"
            value={newTransaction.description}
            onChange={handleInputChange}
            placeholder="Enter description"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">
            Value
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
            type="number"
            name="value"
            value={newTransaction.value}
            onChange={handleValueChange}
            placeholder="Enter value"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">
            Category
          </label>
          <div className="relative">
            <select
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              name="category"
              value={newTransaction.category}
              onChange={handleInputChange}
            >
              <option value="">Select category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">
            Date
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
            type="date"
            name="date"
            value={newTransaction.date}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            type="button"
            onClick={createTransaction}
          >
            Add Transaction
          </button>
        </div>
      </div>
    </div>
  );
};
