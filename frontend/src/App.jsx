import { Routes, Route, useLocation } from "react-router-dom";
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
import ShopPage from "./pages/ShopPage";
import TopBar from "./components/shop/TopBar";

function AppContent() {
  const location = useLocation();
  const isShopPage = location.pathname.startsWith("/shop");

  return (
    <div className="App flex flex-col min-h-screen">
      <ToastContainer position="top-right" autoClose={3000} />
      {isShopPage && <TopBar />}
      <Header />
      <PageContent>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/shop/:categoryCode" element={<ShopPage />} />
        </Routes>
      </PageContent>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
