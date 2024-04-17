import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import AddTransactionForm from "./pages/AddTransactionForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-transaction" element={<AddTransactionForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
