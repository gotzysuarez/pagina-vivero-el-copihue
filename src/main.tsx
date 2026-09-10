import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import AdminApp from "./components/admin/AdminApp.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {window.location.pathname.startsWith("/admin") ? <AdminApp /> : <App />}
  </StrictMode>,
);
