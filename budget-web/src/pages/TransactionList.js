import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

/* calculate total costs from a list of transactions i.e  [{...,"value" : "56.70", ... }, ...] 
   returns a double with the summation of all transaction values within the list with two decimal places*/
function transactionTotal(transactionList) {
  let sum = 0;
  for (let i = 0; i < transactionList.length; i++) {
    sum += parseInt(transactionList[i].value);
  }
  return sum.toFixed(2);
}

export const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const { category: categoryName } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchTransactions();
    fetchCategories();
  }, [categoryName]);

  const handleTransactionClick = (transactionId) => {
    navigate(`/transaction-detail/${transactionId}`);
  };

  const fetchTransactions = async () => {
    try {
      const url = categoryName
        ? `/api/transactions/${categoryName}`
        : "/api/transactions";
      console.log(categoryName);
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
    <div className="max-w-6xl p-6 bg-white border border-gray-500 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mx-auto mt-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
          Transaction List
        </h1>
        <Link
          to="/add-transaction"
          className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Add Transaction
        </Link>
        <Link
          to="/categories"
          className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Manage Categories
        </Link>
      </div>
      <div className="mb-4">
        <Link
          to="/transactions"
          className="inline-block bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-l"
        >
          All
        </Link>
        {categories.map((category, index) => (
          <Link
            key={category}
            to={`/transactions/${category}`}
            className={`inline-block bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 ${
              index === categories.length - 1 ? "rounded-r" : ""
            }`}
          >
            {category}
          </Link>
        ))}
      </div>
      {transactions.length > 0 ? (
        <div>
          <ul className="bg-white shadow-md rounded-lg mb-4 divide-y divide-gray-200">
            {transactions.map((transaction) => (
              <li
                key={transaction._id}
                className="px-6 py-4 cursor-pointer hover:bg-gray-100"
                onClick={() => handleTransactionClick(transaction._id)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-900 font-bold">
                      {transaction.description}
                    </p>
                    <p className="text-gray-600">{transaction.category}</p>
                    <p className="text-gray-500">{transaction.date}</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">
                      ${transaction.value}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="bg-white shadow-md rounded-lg px-6 py-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  Total Expenses:
                </p>
                {categoryName === undefined ? (
                  <p className="text-gray-600">All</p>
                ) : (
                  <p className="text-gray-600">{categoryName}</p>
                )}
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  ${transactionTotal(transactions)}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-gray-700">No transactions found.</p>
      )}
    </div>
  );
};
