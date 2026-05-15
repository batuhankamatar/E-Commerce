import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetail } from "../store/actions/productActions";
import ProductImageGallery from "../components/product/ProductImageGallery";
import ProductInfo from "../components/product/ProductInfo";
import ProductTabs from "../components/product/ProductTabs";
import BestsellerSimple from "../components/home/BestsellerSimple";
import Clients from "../components/home/Clients";
import { ChevronLeft } from "lucide-react";

const ProductPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { productDetail: product, loading } = useSelector(
    (state) => state.product,
  );

  useEffect(() => {
    dispatch(fetchProductDetail(id));
    window.scrollTo(0, 0);
  }, [dispatch, id]);

  const getImageUrl = (img) => {
    if (!img) return "https://via.placeholder.com/500x600?text=No+Image";
    if (typeof img === "string" && img.startsWith("http")) return img;
    if (img.url) return img.url;
    return "https://via.placeholder.com/500x600?text=No+Image";
  };

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-[#23A6F0] border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-[#23A6F0] font-bold font-['Montserrat']">
          Loading Details...
        </p>
      </div>
    );

  if (!product || !product.id) return null;

  const images = product.images || [];

  return (
    <div className="flex flex-col font-['Montserrat'] bg-white">
      <div className="w-full bg-[#FAFAFA] py-6">
        <div className="w-full max-w-[1050px] mx-auto px-4 lg:px-0 flex items-center justify-between py-[10px]">
          <div className="flex items-center gap-[15px]">
            <Link to="/" className="font-bold text-[14px] text-[#252B42]">
              Home
            </Link>
            <span className="text-[#BDBDBD] text-[12px]">›</span>
            <Link to="/shop" className="font-bold text-[14px] text-[#BDBDBD]">
              Shop
            </Link>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[#23A6F0] font-bold text-sm"
          >
            <ChevronLeft size={16} /> Back
          </button>
        </div>
      </div>

      <div className="w-full py-8 lg:py-12 px-4 lg:px-0">
        <div className="w-full max-w-[1050px] mx-auto flex flex-col lg:flex-row gap-[30px]">
          <ProductImageGallery images={images} getImageUrl={getImageUrl} />
          <ProductInfo product={product} />
        </div>
      </div>

      <ProductTabs product={product} reviews={product.reviews || []} />
      <BestsellerSimple limit={8} />
      <Clients />
    </div>
  );
};

export default ProductPage;
