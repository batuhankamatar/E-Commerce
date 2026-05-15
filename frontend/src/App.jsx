import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route, useLocation } from "react-router-dom";
import { verifyToken } from "./store/reducers/clientReducer";
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
import ProductPage from "./pages/ProductPage";
import ContactPage from "./pages/ContactPage";
import TeamPage from "./pages/TeamPage";
import AboutPage from "./pages/AboutPage";

function AppContent() {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(verifyToken());
  }, [dispatch]);

  const isTopBarPage =
    location.pathname.startsWith("/shop") ||
    location.pathname.startsWith("/product") ||
    location.pathname.startsWith("/contact");

  return (
    <div className="App flex flex-col min-h-screen">
      <ToastContainer position="top-right" autoClose={3000} />
      {isTopBarPage && <TopBar />}
      <Header />
      <PageContent>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route
            path="/shop/:gender/:categoryName/:categoryId"
            element={<ShopPage />}
          />

          <Route
            path="/shop/:gender/:categoryName/:categoryId/:productNameSlug/:id"
            element={<ProductPage />}
          />

          <Route path="/contact" element={<ContactPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/about" element={<AboutPage />} />
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
