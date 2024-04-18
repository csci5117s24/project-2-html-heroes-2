import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const AddTransaction = () => {
  const [newTransaction, setNewTransaction] = useState({
    description: "",
    value: "",
    category: "",
    date: "",
  });
  const navigate = useNavigate();

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

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Add Transaction</h1>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Description
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="description"
            value={newTransaction.description}
            onChange={handleInputChange}
            placeholder="Enter description"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Value
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            name="value"
            value={newTransaction.value}
            onChange={handleInputChange}
            placeholder="Enter value"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Category
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="category"
            value={newTransaction.category}
            onChange={handleInputChange}
            placeholder="Enter category"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Date
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="date"
            name="date"
            value={newTransaction.date}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
