import { Routes, Route } from "react-router-dom";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import PageContent from "./layout/PageContent";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/AuthContext";
import BlogPage from "./pages/BlogPage";

function App() {
  return (
    <div className="App flex flex-col min-h-screen">
      <AuthProvider>
        <ToastContainer position="top-right" autoClose={3000} />
        <Header />
        <PageContent>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/blog" element={<BlogPage />} />
          </Routes>
        </PageContent>
        <Footer />{" "}
      </AuthProvider>
    </div>
  );
}

export default App;
