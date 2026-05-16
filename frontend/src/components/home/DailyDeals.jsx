import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDailyDeals } from "../../store/actions/productActions";
import { useNavigate } from "react-router-dom";

const DailyDeals = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { dailyDeals, loading } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchDailyDeals());
  }, [dispatch]);

  const mainDeals = dailyDeals.slice(0, 3);

  const handleDealClick = (deal) => {
    const categoryName = (deal.categoryName || "product")
      .toLowerCase()
      .trim()
      .replaceAll(" ", "-")
      .replaceAll("/", "-");

    const categoryId = deal.category_id || deal.categoryId || 0;

    const nameSlug = (deal.name || "")
      .toLowerCase()
      .trim()
      .replaceAll(" ", "-")
      .replaceAll("/", "-")
      .replace(/[^a-z0-9-]/g, "");

    navigate(`/shop/${categoryName}/${categoryId}/${nameSlug}/${deal.id}`);
  };

  if (loading && dailyDeals.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500 font-['Montserrat']">
        <div className="w-12 h-12 border-4 border-[#23A6F0] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        Loading Daily Deals...
      </div>
    );
  }

  const getImageUrl = (deal) => {
    const imgPath =
      deal.mainImage ||
      (deal.images && deal.images.length > 0
        ? deal.images[0].url || deal.images[0]
        : null);

    if (!imgPath) return "https://via.placeholder.com/300x300?text=No+Image";

    if (typeof imgPath === "string" && imgPath.startsWith("http")) {
      return imgPath;
    }

    try {
      return new URL(`/src/assets/products/${imgPath}`, import.meta.url).href;
    } catch (e) {
      return "https://via.placeholder.com/300x300?text=Image+Not+Found";
    }
  };

  return (
    <section className="py-[80px] px-4 lg:px-[195px] bg-[#FAFAFA] font-['Montserrat']">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[30px]">
        {mainDeals.map((deal) => (
          <div
            key={deal.id}
            className="flex bg-white rounded-[5px] border border-[#ECECEC] h-[300px] overflow-hidden hover:shadow-2xl transition-all duration-300 group cursor-pointer"
            onClick={() => handleDealClick(deal)}
          >
            <div className="flex-[1.2] p-8 flex flex-col justify-center gap-6 z-10 bg-white">
              <div className="flex flex-col gap-2">
                <span className="text-[#737373] font-bold text-[14px]">
                  Ends Today
                </span>
                <h3 className="text-[#252B42] font-bold text-[24px] leading-[32px] group-hover:text-[#23A6F0] transition-colors line-clamp-2">
                  {deal.name}
                </h3>
              </div>

              <div className="flex flex-col gap-4">
                <span className="text-[#737373] font-bold text-[14px]">
                  Explore Items
                </span>
                <div className="flex gap-2 items-center">
                  <span className="text-[#2DC071] font-bold text-[18px]">
                    ${(deal.price * 0.9).toFixed(2)}{" "}
                  </span>
                  <span className="text-[#BDBDBD] line-through text-[14px]">
                    ${deal.price}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex-1 relative flex items-center justify-center p-4">
              <img
                src={getImageUrl(deal)}
                alt={deal.name}
                className="max-w-full max-h-[85%] object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-xl"
                style={{
                  mixBlendMode: "multiply",
                  filter: "contrast(1.05)",
                }}
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/300x300?text=Image+Error";
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DailyDeals;
