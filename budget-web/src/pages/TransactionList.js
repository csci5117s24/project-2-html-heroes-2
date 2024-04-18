import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const { category: categoryId } = useParams();

  useEffect(() => {
    fetchTransactions();
    fetchCategories();
  }, [categoryId]);

  const fetchTransactions = async () => {
    try {
      const url = categoryId
        ? `/api/transactions/${categoryId}`
        : "/api/transactions";
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const sortedTransactions = data.transactions.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      setTransactions(sortedTransactions);
    } catch (error) {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    }
  };

  const fetchCategories = async () => {
    const response = await fetch("/api/categories");
    const data = await response.json();
    setCategories(data.categories);
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Transaction List</h1>
      <div className="mb-4">
        <Link
          to="/transactions"
          className="inline-block bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded mr-2"
        >
          All
        </Link>
        {categories.map((category) => (
          <Link
            key={category}
            to={`/transactions/${category}`}
            className="inline-block bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded mr-2"
          >
            {category}
          </Link>
        ))}
      </div>
      {transactions.length > 0 ? (
        <ul className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          {transactions.map((transaction) => (
            <li key={transaction._id} className="mb-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-700 font-bold">
                    {transaction.description}
                  </p>
                  <p className="text-gray-600">{transaction.category}</p>
                  <p className="text-gray-500">{transaction.date}</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">${transaction.value}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-700">No transactions found.</p>
      )}
    </div>
  );
};
