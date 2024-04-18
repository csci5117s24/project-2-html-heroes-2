import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Landing from "./pages/Landing";
import Dashboard1 from "./pages/Dashboard_tyler";
import Dashboard from "./pages/Dashboard";
import { AddTransaction } from "./pages/AddTransactionForm";
import { TransactionList } from "./pages/TransactionList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path="/dashboard_tyler" element={<Dashboard1 />} />
          <Route path="/add-transaction" element={<AddTransaction />} />
          <Route path="/transactions" element={<TransactionList />} />
          <Route path="/transactions/:category" element={<TransactionList />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
