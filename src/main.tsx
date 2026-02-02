import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import NotFound from "./pages/NotFound.tsx";
import LogIn from "./pages/LogIn.tsx";
import Register from "./pages/Register.tsx";
import Home from "./pages/Home.tsx";
import NewPost from "./pages/NewPost.tsx";
import EditPost from "./pages/EditPost.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="/log-in" element={<LogIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/posts">
            <Route path="new" element={<NewPost />} />
            <Route path=":postId/edit" element={<EditPost />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
