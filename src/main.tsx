import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";

import ErrorPage from "./components/ErrorPage";
import ItemDetail from "./components/ItemDetail";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename="/vite-React-TS">
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/:id" element={<ItemDetail />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
