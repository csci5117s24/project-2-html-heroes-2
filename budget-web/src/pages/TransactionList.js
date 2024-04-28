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
    <div className="container mx-auto mt-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold mb-4">Transaction List</h1>
        <Link
          to="/add-transaction"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Transaction
        </Link>
        <Link
          to="/categories"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Manage Categories
        </Link>
      </div>
      
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
        <div>
          <ul className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            {transactions.map((transaction) => (
              <li
                key={transaction._id}
                className="mb-4 cursor-pointer"
                onClick={() => handleTransactionClick(transaction._id)}
              >
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

          <ul className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-2xl font-bold">Total Expenses:</p>
                {categoryName === undefined ? (
                  <p className="text-gray-600">All</p>
                ) : (
                  <p className="text-gray-600">{categoryName}</p>
                )}
              </div>
              <div>
                <p className="text-2xl font-bold">
                  ${transactionTotal(transactions)}
                </p>
              </div>
            </div>
          </ul>
        </div>
      ) : (
        <p className="text-gray-700">No transactions found.</p>
      )}
    </div>
  );
};
