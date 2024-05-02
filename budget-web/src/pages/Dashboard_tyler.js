import { useNavigate} from "react-router-dom";
import { useState, useEffect } from "react"
import BudgetSummary from "../components/BudgetSummary_tyler.js";
import RecentTransactoin from "../components/RecentTransaction_tyler.js";
import TodayTotal from "../components/TodayTotal_tyler.js";

/* Date Manipulation *//////////////////////////////////////////////////////////////////////////////////

// Create a new Date object
const today = new Date();
// Get the month name in English
const currentMonthUSName = today.toLocaleString('en-US', { month: 'long' }); // e.g March

/* calculate the number of days remaining in a month */
function daysRemainingInMonth (currDay, currMonth, currYear) {
  const numberOfDaysInCurrMonth = new Date(currYear, currMonth + 1, 0).getDate() // currMonth + 1 at 0 gets last day of month
  return numberOfDaysInCurrMonth - currDay; // calc remaining days
}

// parse date features, month, year, and day, and calculate the remaining days
const currYear = today.getFullYear(); // year, e.g 1980
const currMonth = today.getMonth(); // 0-11 indexed
const currDay = today.getDate(); // day of month, i.e Aug, 19th, 2002, returns 19
const dateLeftMonth = daysRemainingInMonth(currDay, currMonth, currDay);

/* get all transactions within a given year and month */
function monthTransactions(transactions, month, year) {
  // console.log("Today is " + month + " " + year)
  // console.log(transactions)
  
  return transactions.filter(function(transaction) {
    let date = new Date(transaction.date+"T00:00:00-05:00");
    // console.log("---------------------")
    // console.log(transaction.description)
    // console.log(typeof transaction.date)
    // console.log(date.getMonth() + " " + date.getFullYear())
    // console.log("input month and year: " + month + " " + year)
    return date.getFullYear() === year && date.getMonth() === month});
}

/* get total amount of all transactions in a given month and year
 month indexed from 0-11, with 0 being january */
function amountSpentInMonth(transactions, month, year) {
  let sum = 0;
  for (let i = 0; i < transactions.length; i++) {
    const transactionDate = new Date(transactions[i].date);
    if (transactionDate.getFullYear() === year && transactionDate.getMonth() === month) {
      sum += parseFloat(transactions[i].value);
    }
  }
  return sum;
}

// get remaining budget
function budgetRemaining(amountSpent, budget) {
  return budget - amountSpent;
}

// get the n most recent transactions, month 0-11, year e.g 1990, transactions  [{value: XY, date: YYYY-MM-DD}, ...]
// sorted by transaction occuring latest in the month ie 4/17 > 4/14 > 4/2
function getRecentTransactions(transactions, n, month, year) {
  // filter by month and year
  let monthTransactionsFiltered = monthTransactions(transactions, month, year);
  // console.log(`Today is ${month} ${year}`)
  // sort by date
  let sortedTransactions = monthTransactionsFiltered.sort(function(transactionA, transactionB) {
    return new Date(transactionB.date) - new Date(transactionA.date);
  })
  // get n most recent
  let recentTransactions = sortedTransactions.splice(0, n);
  return recentTransactions;
}

// returns a dictionary of the form {Cat:Total, Cat2:Total, ...}
function totalCategoryExpenses(transactions, month, year) {
  let monthTransactionsFiltered = monthTransactions(transactions, month, year)
  let catexpenses = {};
  for (let i = 0; i < monthTransactionsFiltered.length; i++) {
    if (!catexpenses[monthTransactionsFiltered[i].category]) {
      catexpenses[monthTransactionsFiltered[i].category] = 0;
    }
    catexpenses[monthTransactionsFiltered[i].category] += parseFloat(monthTransactionsFiltered[i].value);
  }
  return catexpenses;
}

// return a list of costs sorted in the same order as categories
function totalCategoryExpensesSortedList(catexpenses, categories) {
  let totals = [];
  for(let i = 0; i < categories.length; i++) {
    if (!catexpenses[categories[i]]) {
      totals.push(0);
    } else {
      totals.push(catexpenses[categories[i]]);
    }
  }
  return totals
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Dashboard1() {
  const [budget, setBudget] = useState(0);
  const [transactions, setTransaction] = useState([]);
  const [categories, setCategories] = useState([]);

  /* get numeric budget belong to user, e.g 1123.20 */
  async function getBudget() {
    const budgetJson = await fetch("/api/budget");
    const budget = await budgetJson.json();
    setBudget(budget.budget);
  }

  /* get all user transactions e.g [{value: XY, date: YYYY-MM-DD}, ...]*/
  async function getAllTransactions() {
    const transactionJson = await fetch("/api/transactions");
    const transactions = await transactionJson.json();
    setTransaction(transactions.transactions);
  }

  /* get categories that belong to user, e.g [entertainment, budget, ...] */
  async function getCategories() {
    const categoryJson = await fetch("/api/categories");
    const categories = await categoryJson.json();
    setCategories(categories.categories)
  }

  const navigate = useNavigate();

  function setUp() {
    getBudget();
    getAllTransactions();
    getCategories();
  }
  useEffect(()=> setUp(),[])

  const handleAddTransaction = () => {
    navigate("/add-transaction");
  };

  const amountSpentThisMonth = amountSpentInMonth(transactions, currMonth, currYear);
  const budgetLeft = budgetRemaining(amountSpentThisMonth, budget);
  const recentTransactions = getRecentTransactions(transactions, 5, currMonth, currYear);
  const catExpenses = totalCategoryExpenses(transactions, currMonth, currYear);
  const totals = totalCategoryExpensesSortedList(catExpenses, categories);

  // console.log(amountSpentThisMonth);
  // console.log("This is budgetleft "+budgetLeft);
  // console.log("This is recenttransaction " + recentTransactions);
  // console.log(catExpenses);
  // console.log(totals);

  return (
    <>
      <div>
        <header class="bg-white shadow">
          <div class="flex mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 class="text-3xl font-bold tracking-tight text-gray-900">
              Your Dashboard
            </h1>
            <button
              type="button"
              class="ml-auto text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              onClick={handleAddTransaction}
            >
              Add Transaction
            </button>
          </div>
        </header>
        <main>
          <div class="mx-auto max-w-8xl py-6 lg:px-8">
            <div class="justify-center flex flex-wrap lg:flex-nowrap ">
              <div class="mb-6 w-full md:w-2/3 order-1 md:order-1">
                <BudgetSummary
                  month={currentMonthUSName}
                  budgetLeft={Number(budgetLeft).toFixed(2)}
                  budget={Number(budget).toFixed(2)}
                  spent={Number(amountSpentThisMonth).toFixed(2)}
                  dateLeftMonth={dateLeftMonth}
                />
                <RecentTransactoin transaction_list={recentTransactions} />
              </div>
              <TodayTotal categories={categories} totals={totals}/>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default Dashboard1;
