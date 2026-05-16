import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCart } from "../../store/actions/shoppingCartActions";

const ProductListItem = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.client.user);

  const getImageUrl = (mainImage) => {
    if (!mainImage) return null;
    if (mainImage.startsWith("http")) return mainImage;
    return new URL(`/src/assets/products/${mainImage}`, import.meta.url).href;
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (product) {
      dispatch(addProductToCart(product, 1, user?.id));
    }
  };

  const handleCardClick = () => {
    const categoryName = (product?.categoryName || "product")
      .toLowerCase()
      .trim()
      .replaceAll(" ", "-")
      .replaceAll("/", "-");

    const categoryId = product?.category_id || product?.categoryId || 0;
    const nameSlug = (product?.name || "")
      .toLowerCase()
      .trim()
      .replaceAll(" ", "-")
      .replaceAll("/", "-")
      .replace(/[^a-z0-9-]/g, "");

    navigate(`/shop/${categoryName}/${categoryId}/${nameSlug}/${product?.id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="w-full flex items-center gap-6 border border-[#ECECEC] p-4 cursor-pointer group hover:shadow-lg transition-shadow duration-300 bg-white rounded-[5px]"
    >
      <div className="w-[120px] h-[120px] flex-shrink-0 overflow-hidden bg-[#F3F3F3] rounded">
        <img
          src={getImageUrl(product?.mainImage)}
          alt={product?.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="flex flex-col gap-2 flex-1 min-w-0">
        <h3 className="font-bold text-[16px] leading-6 text-[#252B42] truncate uppercase">
          {product?.name}
        </h3>
        <span className="font-bold text-[14px] text-[#737373]">
          {product?.categoryName}
        </span>
        <p className="font-normal text-[14px] text-[#737373] line-clamp-2">
          {product?.description}
        </p>
        <div className="flex items-center gap-[5px]">
          <span className="font-bold text-[16px] text-[#BDBDBD] line-through">
            ${product?.price}
          </span>
          {product?.discountPrice && (
            <span className="font-bold text-[16px] text-[#23856D]">
              ${product?.discountPrice}
            </span>
          )}
        </div>
      </div>
      <button
        onClick={handleAddToCart}
        className="flex-shrink-0 px-6 py-3 bg-[#23A6F0] text-white font-bold text-[14px] rounded-[5px] hover:bg-[#1a7bb3] transition-colors active:scale-95 shadow-md"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductListItem;
