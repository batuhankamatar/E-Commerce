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
  const { productId, id: backupId } = useParams();
  const id = productId || backupId;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { productDetail: product, loading } = useSelector(
    (state) => state.product,
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchProductDetail(id));
    }
    window.scrollTo(0, 0);
  }, [dispatch, id]);

  const getImageUrl = (img) => {
    const imgPath =
      img?.imgUrl ||
      img?.url ||
      img?.img ||
      (typeof img === "string" ? img : null);

    if (!imgPath) return null;

    if (typeof imgPath === "string" && imgPath.startsWith("http")) {
      return imgPath;
    }

    try {
      return new URL(`../assets/products/${imgPath}`, import.meta.url).href;
    } catch (e) {
      console.error("Görsel yükleme hatası:", e);
      return null;
    }
  };

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-[600px]">
        <div className="w-12 h-12 border-4 border-[#23A6F0] border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-[#23A6F0] font-bold">Loading Details...</p>
      </div>
    );

  if (!product || !product.id) return null;

  const normalizedProduct = {
    ...product,
    images:
      product?.imageUrls?.map((url) => ({ imgUrl: url })) ||
      product?.images ||
      [],
  };

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
          <ProductImageGallery
            images={normalizedProduct.images}
            getImageUrl={getImageUrl}
          />
          <ProductInfo product={normalizedProduct} />
        </div>
      </div>

      <ProductTabs
        product={normalizedProduct}
        reviews={product.reviews || []}
      />
      <BestsellerSimple limit={8} />
      <Clients />
    </div>
  );
};

export default ProductPage;
