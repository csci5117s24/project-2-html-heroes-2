import { useNavigate } from "react-router-dom";
import MonthSummmary from "../components/MonthSummary";
import RecentTransactions from "../components/RecentTransactions";
import SpendingSummary from "../components/SpendingSummary";
import TotalSpending from "../components/TotalSpending";

function Dashboard() {
  const navigate = useNavigate();

  const handleAddTransaction = () => {
    navigate("/add-transaction");
  };

  return (
    <div>
      <header class="bg-white shadow">
        <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flow-root">
          <h1 class="float-left text-3xl font-bold tracking-tight text-gray-900">
            Dashboard
          </h1>
          <div>
            {/* https://tailwindcomponents.com/component/tailwind-css-bouton-hover-effect */}
            <button
              className="float-right btn overflow-hidden relative w-auto bg-blue-500 text-sm text-white py-3 px-4 rounded-xl font-bold uppercase -- before:block before:absolute before:h-full before:w-1/2 before:rounded-full before:bg-blue-100 before:top-0 before:left-1/4 before:transition-transform before:opacity-0 before:hover:opacity-100 hover:text-white-200 hover:before:animate-ping transition-all duration-300"
              onClick={handleAddTransaction}
            >
              <span className="relative">Add Transaction</span>
            </button>
          </div>
        </div>
      </header>
      <main>
        <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <MonthSummmary />
          <TotalSpending />
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SpendingSummary />
            <RecentTransactions />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
