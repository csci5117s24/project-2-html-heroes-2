import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddTransactionForm() {
  const [value, setValue] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/transaction", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value, category, date }),
      });
      if (response.ok) {
        navigate("/dashboard");
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            htmlFor="value"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Value
          </label>
          <input
            type="number"
            id="value"
            name="value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="date"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add
          </button>
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTransactionForm;
