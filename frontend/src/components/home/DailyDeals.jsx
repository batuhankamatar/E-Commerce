import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDailyDeals } from "../../store/productSlice";
import { useNavigate } from "react-router-dom";

const DailyDeals = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { dailyDeals, loading } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchDailyDeals());
  }, [dispatch]);

  const mainDeals = dailyDeals.slice(0, 3);

  if (loading && dailyDeals.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500 font-['Montserrat']">
        Loading Daily Deals...
      </div>
    );
  }

  const getImageUrl = (mainImage) => {
    if (!mainImage) return null;

    try {
      return new URL(`/src/assets/products/${mainImage}`, import.meta.url).href;
    } catch (error) {
      console.error("Görsel Bulunamadı:", mainImage);
      return null;
    }
  };

  return (
    <section className="py-[80px] px-4 lg:px-[195px] bg-[#FAFAFA]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[30px]">
        {mainDeals.map((deal) => (
          <div
            key={deal.id}
            className="flex bg-white rounded-[5px] border border-[#ECECEC] h-[300px] overflow-hidden hover:shadow-2xl transition-all duration-300 group cursor-pointer"
            onClick={() => navigate(`/product/${deal.id}`)}
          >
            <div className="flex-[1.2] p-8 flex flex-col justify-center gap-6 z-10 bg-white">
              <div className="flex flex-col gap-2">
                <span className="text-[#737373] font-bold text-[14px]">
                  Ends Today
                </span>
                <h3 className="text-[#252B42] font-bold text-[24px] leading-[32px] group-hover:text-[#23A6F0] transition-colors">
                  {deal.name}
                </h3>
              </div>

              <div className="flex flex-col gap-4">
                <span className="text-[#737373] font-bold text-[14px]">
                  Explore Items
                </span>
                <div className="flex gap-2 items-center">
                  <span className="text-[#2DC071] font-bold text-[18px]">
                    ${deal.discountPrice}
                  </span>
                  <span className="text-[#BDBDBD] line-through text-[14px]">
                    ${deal.price}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex-1 relative flex items-center justify-center p-4">
              <img
                src={getImageUrl(deal.mainImage)}
                alt={deal.name}
                className="max-w-full max-h-[85%] object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-xl"
                style={{
                  mixBlendMode: "multiply",
                  filter: "contrast(1.05)",
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
