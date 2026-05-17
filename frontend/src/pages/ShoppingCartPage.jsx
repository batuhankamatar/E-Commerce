import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  updateCartItemQuantity,
  removeProductFromCart,
  toggleCartItemCheck,
} from "../store/actions/shoppingCartActions";
import { Trash2, ChevronRight, ShoppingBag, ShieldCheck } from "lucide-react";

const ShoppingCartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.shoppingCart.cart) || [];

  const getProductImageUrl = (p) => {
    const imgPath =
      p?.mainImage ||
      p?.imageUrls?.[0] ||
      p?.images?.[0]?.imgUrl ||
      p?.images?.[0]?.url ||
      p?.images?.[0] ||
      null;

    if (!imgPath) return "https://via.placeholder.com/80x100?text=No+Img";
    if (typeof imgPath === "string" && imgPath.startsWith("http"))
      return imgPath;

    try {
      return new URL(`/src/assets/products/${imgPath}`, import.meta.url).href;
    } catch (e) {
      return "https://via.placeholder.com/80x100?text=Error";
    }
  };

  const totalSelectedPrice = cartItems.reduce((acc, item) => {
    if (item.checked) {
      return acc + item.count * item.product.price;
    }
    return acc;
  }, 0);

  const totalSelectedCount = cartItems.reduce((acc, item) => {
    if (item.checked) {
      return acc + item.count;
    }
    return acc;
  }, 0);

  const shippingStandardPrice = 29.99;
  const isShippingFree = totalSelectedPrice >= 150 || totalSelectedPrice === 0;
  const currentShippingPrice = isShippingFree ? 0 : shippingStandardPrice;
  const fixedDiscount = totalSelectedPrice > 0 ? 10.0 : 0;

  const grandTotal = totalSelectedPrice + currentShippingPrice - fixedDiscount;

  return (
    <div className="w-full bg-[#FAFAFA] font-['Montserrat'] min-h-[600px] pb-20">
      <div className="w-full bg-white py-6 border-b border-gray-100">
        <div className="w-full max-w-[1050px] mx-auto px-4 flex items-center gap-[15px]">
          <Link
            to="/"
            className="font-bold text-[14px] text-[#252B42] no-underline hover:text-[#23A6F0]"
          >
            Home
          </Link>
          <ChevronRight size={14} className="text-[#BDBDBD]" />
          <span className="font-bold text-[14px] text-[#BDBDBD]">
            Shopping Cart
          </span>
        </div>
      </div>

      <div className="w-full max-w-[1050px] mx-auto px-4 mt-10">
        <h1 className="font-bold text-[24px] text-[#252B42] mb-8 flex items-center gap-3">
          <ShoppingBag className="text-[#23A6F0]" /> Alışveriş Sepetim (
          {cartItems.length} Ürün)
        </h1>

        {cartItems.length === 0 ? (
          <div className="bg-white border border-gray-100 shadow-sm rounded-[5px] p-16 text-center flex flex-col items-center gap-4">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-300">
              <ShoppingBag size={40} />
            </div>
            <p className="text-[#737373] font-medium text-[16px]">
              Sepetinizde şu anda ürün bulunmamaktadır.
            </p>
            <Link
              to="/shop"
              className="mt-2 px-8 py-3 bg-[#23A6F0] hover:bg-[#1a7bb3] text-white font-bold text-sm rounded-[5px] no-underline shadow-md transition-all active:scale-95"
            >
              Alışverişe Devam Et
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="flex-1 w-full flex flex-col gap-4">
              <div className="hidden md:block bg-white border border-[#ECECEC] rounded-[5px] overflow-hidden shadow-sm">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="bg-[#FAFAFA] border-b border-[#ECECEC] text-[#737373] font-bold text-[14px]">
                      <th className="p-4 w-12 text-center">Seç</th>
                      <th className="p-4">Ürün Bilgisi</th>
                      <th className="p-4 text-center w-36">Adet</th>
                      <th className="p-4 text-right w-32">Birim Fiyat</th>
                      <th className="p-4 text-right w-32">Toplam</th>
                      <th className="p-4 w-16 text-center">Sil</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {cartItems.map((item) => (
                      <tr
                        key={item.product.id}
                        className="hover:bg-gray-50/50 transition-colors"
                      >
                        <td className="p-4 text-center">
                          <input
                            type="checkbox"
                            checked={item.checked}
                            onChange={() =>
                              dispatch(toggleCartItemCheck(item.product.id))
                            }
                            className="w-[18px] h-[18px] accent-[#23A6F0] cursor-pointer"
                          />
                        </td>

                        <td className="p-4 flex items-center gap-4">
                          <div className="w-16 h-20 bg-[#F3F3F3] rounded overflow-hidden flex-shrink-0 border border-gray-100">
                            <img
                              src={getProductImageUrl(item.product)}
                              alt={item.product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex flex-col gap-1 min-w-0">
                            <span className="font-bold text-[15px] text-[#252B42] uppercase truncate max-w-[280px]">
                              {item.product.name}
                            </span>
                            <span className="text-[12px] text-[#737373] line-clamp-1">
                              {item.product.description}
                            </span>
                          </div>
                        </td>

                        <td className="p-4 text-center">
                          <div className="flex items-center justify-center border border-gray-200 rounded h-9 bg-white max-w-[110px] mx-auto">
                            <button
                              onClick={() =>
                                dispatch(
                                  updateCartItemQuantity(
                                    item.product.id,
                                    item.count - 1,
                                    item.id,
                                  ),
                                )
                              }
                              className="px-3 bg-gray-50 hover:bg-gray-100 font-bold h-full border-none cursor-pointer transition-colors"
                            >
                              -
                            </button>
                            <span className="px-4 text-sm font-bold text-[#252B42]">
                              {item.count}
                            </span>
                            <button
                              onClick={() =>
                                dispatch(
                                  updateCartItemQuantity(
                                    item.product.id,
                                    item.count + 1,
                                    item.id,
                                  ),
                                )
                              }
                              className="px-3 bg-gray-50 hover:bg-gray-100 font-bold h-full border-none cursor-pointer transition-colors"
                            >
                              +
                            </button>
                          </div>
                        </td>

                        <td className="p-4 text-right font-bold text-[#737373] text-[15px]">
                          ${item.product.price?.toFixed(2)}
                        </td>

                        <td className="p-4 text-right font-bold text-[#23856D] text-[16px]">
                          ${(item.product.price * item.count).toFixed(2)}
                        </td>

                        <td className="p-4 text-center">
                          <button
                            onClick={() =>
                              dispatch(
                                removeProductFromCart(item.product.id, item.id),
                              )
                            }
                            className="text-gray-400 hover:text-[#E74040] bg-transparent border-none cursor-pointer p-2 transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex flex-col gap-4 md:hidden">
                {cartItems.map((item) => (
                  <div
                    key={item.product.id}
                    className="bg-white border border-[#ECECEC] rounded-[5px] p-4 flex flex-col gap-4 shadow-sm relative"
                  >
                    <div className="flex gap-3 items-start">
                      <input
                        type="checkbox"
                        checked={item.checked}
                        onChange={() =>
                          dispatch(toggleCartItemCheck(item.product.id))
                        }
                        className="w-[18px] h-[18px] accent-[#23A6F0] cursor-pointer mt-1"
                      />
                      <div className="w-16 h-20 bg-[#F3F3F3] rounded overflow-hidden flex-shrink-0 border border-gray-100">
                        <img
                          src={getProductImageUrl(item.product)}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col gap-1 flex-1 min-w-0">
                        <span className="font-bold text-[14px] text-[#252B42] uppercase truncate">
                          {item.product.name}
                        </span>
                        <span className="font-bold text-[15px] text-[#23856D] mt-1">
                          ${(item.product.price * item.count).toFixed(2)}
                        </span>
                      </div>
                      <button
                        onClick={() =>
                          dispatch(
                            removeProductFromCart(item.product.id, item.id),
                          )
                        }
                        className="text-gray-400 hover:text-[#E74040] bg-transparent border-none cursor-pointer p-1"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    <div className="flex justify-between items-center border-t border-gray-50 pt-3 mt-1">
                      <span className="text-[12px] text-[#737373]">
                        Birim: ${item.product.price?.toFixed(2)}
                      </span>
                      <div className="flex items-center border border-gray-200 rounded h-8 bg-white w-[100px]">
                        <button
                          onClick={() =>
                            dispatch(
                              updateCartItemQuantity(
                                item.product.id,
                                item.count - 1,
                                item.id,
                              ),
                            )
                          }
                          className="px-2.5 bg-gray-50 hover:bg-gray-100 font-bold h-full border-none cursor-pointer"
                        >
                          -
                        </button>
                        <span className="flex-1 text-center text-xs font-bold text-[#252B42]">
                          {item.count}
                        </span>
                        <button
                          onClick={() =>
                            dispatch(
                              updateCartItemQuantity(
                                item.product.id,
                                item.count + 1,
                                item.id,
                              ),
                            )
                          }
                          className="px-2.5 bg-gray-50 hover:bg-gray-100 font-bold h-full border-none cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full lg:min-w-[320px] flex flex-col gap-4">
              <div className="bg-white border border-[#ECECEC] rounded-[5px] p-5 shadow-sm">
                <h2 className="font-bold text-[18px] text-[#252B42] border-b border-gray-100 pb-3 mb-4 uppercase tracking-wide">
                  Sipariş Özeti
                </h2>

                <div className="flex flex-col gap-3 font-medium text-[14px]">
                  <div className="flex justify-between items-center text-[#737373]">
                    <span>Ürünün Toplamı</span>
                    <span className="text-[#252B42] font-bold">
                      ${totalSelectedPrice.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-[#737373]">
                    <span>Kargo Toplamı</span>
                    {isShippingFree ? (
                      <span className="text-[#2DC071] font-bold uppercase text-[12px] bg-emerald-50 px-2 py-0.5 rounded">
                        Bedava
                      </span>
                    ) : (
                      <span className="text-[#252B42] font-bold">
                        ${shippingStandardPrice.toFixed(2)}
                      </span>
                    )}
                  </div>

                  {!isShippingFree && (
                    <p className="text-[11px] text-[#737373] bg-amber-50/80 border border-amber-100 p-2 rounded leading-normal">
                      <span className="font-bold text-amber-700">
                        Kargo Bedava Kampanyası!
                      </span>{" "}
                      150$ ve üzeri alışverişlerinizde kargo ücretsiz.
                    </p>
                  )}

                  {totalSelectedPrice > 0 && (
                    <div className="flex justify-between items-center text-[#E74040]">
                      <span>10$ Sepet İndirimi</span>
                      <span className="font-bold">
                        -${fixedDiscount.toFixed(2)}
                      </span>
                    </div>
                  )}

                  <div className="border-t border-gray-100 my-2"></div>

                  <div className="flex justify-between items-center">
                    <span className="text-[15px] font-bold text-[#252B42]">
                      Toplam
                    </span>
                    <span className="text-[22px] font-bold text-[#23A6F0]">
                      ${grandTotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => navigate("/checkout")}
                  disabled={totalSelectedCount === 0}
                  className="w-full h-12 bg-[#23A6F0] hover:bg-[#1a7bb3] disabled:bg-gray-200 disabled:text-gray-400 text-white font-bold text-sm rounded-[5px] border-none cursor-pointer transition-all mt-5 shadow-md active:scale-95 uppercase tracking-wider"
                >
                  Siparişi Onayla
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[#737373] text-[12px] font-bold px-2 py-1">
                <ShieldCheck size={16} className="text-[#2DC071]" />
                <span>Güvenli Alışveriş Garantisi</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingCartPage;
