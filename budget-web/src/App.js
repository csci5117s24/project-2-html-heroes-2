import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Landing from "./pages/Landing";
import Dashboard1 from "./pages/Dashboard_tyler";
import Dashboard from "./pages/Dashboard";
import { AddTransaction } from "./pages/AddTransactionForm";
import { TransactionList } from "./pages/TransactionList";
import { CategoryList } from "./pages/CategoryList";
import SetUpBudget from "./pages/SetUpBudget";
import AddReceipt from "./pages/AddReceipt";
import CaptureReceipt from "./pages/CaptureReceipt";
import AdvancedSummary from "./pages/AdvancedSummary";
import { TransactionDetail } from "./pages/TransactionDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path="/dashboard1" element={<Dashboard1 />} />
          <Route path="/add-transaction" element={<AddTransaction />} />
          <Route path="/transactions" element={<TransactionList />} />
          <Route
            path="/transaction-detail/:id"
            element={<TransactionDetail />}
          />
          <Route path="/transactions/:category" element={<TransactionList />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/categories" element={<CategoryList />} />
          <Route path="/setup-budget" element={<SetUpBudget />} />
          <Route path="/add-receipt" element={<AddReceipt />} />
          <Route path="/capture-receipt" element={<CaptureReceipt />} />
          <Route path="/adv-summary" element={<AdvancedSummary />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
