import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export const TransactionDetail = () => {
  const [transaction, setTransaction] = useState(null);
  const [categories, setCategories] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchTransaction();
    fetchCategories();
  }, [id]);

  const fetchTransaction = async () => {
    try {
      const response = await fetch(`/api/transaction/${id}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("API response:", data);
      setTransaction(data.transaction);
    } catch (error) {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    }
  };
  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setCategories(data.categories);
    } catch (error) {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    }
  };

  const updateTransaction = async () => {
    try {
      const response = await fetch(`/api/transaction/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transaction),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      navigate("/transactions");
    } catch (error) {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    }
  };

  const deleteTransaction = async () => {
    try {
      const response = await fetch(`/api/transaction/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      navigate("/transactions");
    } catch (error) {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    }
  };

  if (!transaction) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-6xl p-6 bg-white border border-gray-500 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mx-auto mt-8">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
        Transaction Detail
      </h1>
      <div className="mb-4">
        <label
          htmlFor="description"
          className="block mb-2 text-sm font-bold text-gray-900 dark:text-white"
        >
          Description
        </label>
        <input
          type="text"
          id="description"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
          value={transaction.description}
          onChange={(e) =>
            setTransaction({ ...transaction, description: e.target.value })
          }
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="value"
          className="block mb-2 text-sm font-bold text-gray-900 dark:text-white"
        >
          Value
        </label>
        <input
          type="number"
          id="value"
          step="0.01"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
          value={transaction.value}
          onChange={(e) =>
            setTransaction({ ...transaction, value: Math.round(e.target.value * 100) / 100 })
          }
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="category"
          className="block mb-2 text-sm font-bold text-gray-900 dark:text-white"
        >
          Category
        </label>
        <select
          id="category"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
          value={transaction.category}
          onChange={(e) =>
            setTransaction({ ...transaction, category: e.target.value })
          }
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-6">
        <label
          htmlFor="date"
          className="block mb-2 text-sm font-bold text-gray-900 dark:text-white"
        >
          Date
        </label>
        <input
          type="date"
          id="date"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
          value={transaction.date}
          onChange={(e) =>
            setTransaction({ ...transaction, date: e.target.value })
          }
        />
      </div>
      <div className="flex justify-between">
        <button
          className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          onClick={updateTransaction}
        >
          Save
        </button>
        <button
          className="text-white bg-gradient-to-r from-red-500 to-red-700 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          onClick={deleteTransaction}
        >
          Delete
        </button>
        <button
          className="text-white bg-gradient-to-r from-gray-500 to-gray-700 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-gray-300 dark:focus:ring-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          onClick={() => navigate("/transactions")}
        >
          Back
        </button>
      </div>
    </div>
  );
};
