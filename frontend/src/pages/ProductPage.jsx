import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import ProductImageGallery from "../components/product/ProductImageGallery";
import ProductInfo from "../components/product/ProductInfo";
import ProductTabs from "../components/product/ProductTabs";
import BestsellerSimple from "../components/home/BestsellerSimple";
import Clients from "../components/home/Clients";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const [productRes, reviewRes] = await Promise.all([
          axiosInstance.get(`/products/${id}`),
          axiosInstance.get(`/reviews/product/${id}`),
        ]);
        setProduct(productRes.data);
        setReviews(reviewRes.data);
      } catch (err) {
        console.error("Ürün çekilemedi:", err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
    window.scrollTo(0, 0);
  }, [id]);

  const getImageUrl = (img) => {
    if (!img) return null;
    if (img.startsWith("http")) return img;
    return new URL(`/src/assets/products/${img}`, import.meta.url).href;
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen font-['Montserrat'] text-[#737373]">
        Loading...
      </div>
    );

  if (!product) return null;

  const images =
    product.imageUrls?.length > 0 ? product.imageUrls : [product.mainImage];

  return (
    <div className="flex flex-col font-['Montserrat'] bg-white">
      <div className="w-full bg-[#FAFAFA] py-6">
        <div className="w-full max-w-[1050px] mx-auto px-4 lg:px-0 flex items-center gap-[15px] py-[10px]">
          <Link
            to="/"
            className="font-bold text-[14px] leading-6 tracking-[0.2px] text-[#252B42] hover:text-[#23A6F0] transition-colors"
          >
            Home
          </Link>
          <span className="text-[#BDBDBD] text-[12px]">›</span>
          <Link
            to="/shop"
            className="font-bold text-[14px] leading-6 tracking-[0.2px] text-[#BDBDBD] hover:text-[#23A6F0] transition-colors"
          >
            Shop
          </Link>
        </div>
      </div>

      <div className="w-full py-8 lg:py-12 px-4 lg:px-0">
        <div className="w-full max-w-[1050px] mx-auto flex flex-col lg:flex-row gap-[30px]">
          <ProductImageGallery images={images} getImageUrl={getImageUrl} />
          <ProductInfo product={product} reviewCount={reviews.length} />
        </div>
      </div>

      <ProductTabs product={product} reviews={reviews} />
      <BestsellerSimple limit={8} />
      <Clients />
    </div>
  );
};

export default ProductPage;
