import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { orderService } from "../services/orderService";
import { toast } from "react-toastify";
import {
  ChevronRight,
  ShoppingBag,
  ChevronDown,
  ChevronUp,
  Calendar,
  DollarSign,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

const PreviousOrdersPage = () => {
  const user = useSelector((state) => state.client.user) || {};
  const userId = user.id;

  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  useEffect(() => {
    if (userId) {
      fetchOrders();
    }
  }, [userId]);

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const data = await orderService.getPreviousOrders(userId);
      setOrders(data || []);
    } catch (err) {
      console.error("Siparişler getirilirken hata:", err);
      toast.error("Geçmiş siparişleriniz yüklenemedi.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleOrderExpand = (orderId) => {
    if (expandedOrderId === orderId) {
      setExpandedOrderId(null);
    } else {
      setExpandedOrderId(orderId);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("tr-TR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (e) {
      return dateString;
    }
  };

  const getStatusStyle = (status) => {
    const cleanStatus = status?.toLowerCase() || "";
    if (
      cleanStatus.includes("hazırlanıyor") ||
      cleanStatus.includes("processing")
    ) {
      return {
        bg: "bg-amber-50 text-amber-700 border-amber-200",
        icon: <Clock size={14} />,
      };
    }
    if (
      cleanStatus.includes("tamamlandı") ||
      cleanStatus.includes("delivered") ||
      cleanStatus.includes("success")
    ) {
      return {
        bg: "bg-emerald-50 text-emerald-700 border-emerald-200",
        icon: <CheckCircle2 size={14} />,
      };
    }
    return {
      bg: "bg-blue-50 text-blue-700 border-blue-200",
      icon: <AlertCircle size={14} />,
    };
  };

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
            Siparişlerim
          </span>
        </div>
      </div>

      <div className="w-full max-w-[1050px] mx-auto px-4 mt-10">
        <h1 className="font-bold text-[24px] text-[#252B42] mb-8 flex items-center gap-3">
          <ShoppingBag className="text-[#23A6F0]" /> Sipariş Geçmişim (
          {orders.length} Sipariş)
        </h1>

        {isLoading ? (
          <div className="py-20 text-center text-sm text-[#737373] italic font-medium">
            Sipariş geçmişiniz yükleniyor...
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white border border-gray-100 shadow-sm rounded-[5px] p-16 text-center flex flex-col items-center gap-4">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-300">
              <ShoppingBag size={40} />
            </div>
            <p className="text-[#737373] font-medium text-[16px]">
              Henüz verilmiş bir siparişiniz bulunmamaktadır.
            </p>
            <Link
              to="/shop"
              className="mt-2 px-8 py-3 bg-[#23A6F0] hover:bg-[#1a7bb3] text-white font-bold text-sm rounded-[5px] no-underline shadow-md transition-all active:scale-95"
            >
              Alışverişe Başla
            </Link>
          </div>
        ) : (
          <div className="w-full flex flex-col gap-4">
            {orders.map((order) => {
              const isExpanded = expandedOrderId === order.id;
              const statusInfo = getStatusStyle(order.status || "Hazırlanıyor");

              return (
                <div
                  key={order.id}
                  className="bg-white border border-[#ECECEC] rounded-[5px] overflow-hidden shadow-sm transition-all"
                >
                  <div
                    onClick={() => toggleOrderExpand(order.id)}
                    className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:bg-gray-50/70 transition-colors select-none"
                  >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-1">
                      <div className="flex flex-col gap-1">
                        <span className="text-[11px] font-bold text-[#737373] uppercase tracking-wider">
                          Sipariş No
                        </span>
                        <span className="text-sm font-bold text-[#252B42]">
                          #ORD-{order.id}
                        </span>
                      </div>

                      <div className="flex flex-col gap-1">
                        <span className="text-[11px] font-bold text-[#737373] uppercase tracking-wider flex items-center gap-1">
                          <Calendar size={11} /> Tarih
                        </span>
                        <span className="text-xs font-semibold text-[#252B42]">
                          {formatDate(order.orderDate)}
                        </span>
                      </div>

                      <div className="flex flex-col gap-1">
                        <span className="text-[11px] font-bold text-[#737373] uppercase tracking-wider flex items-center gap-1">
                          <DollarSign size={11} /> Toplam Tutar
                        </span>
                        <span className="text-sm font-bold text-[#23A6F0]">
                          ${order.totalPrice?.toFixed(2)}
                        </span>
                      </div>

                      <div className="flex flex-col gap-1 items-start justify-center">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold border rounded-[20px] ${statusInfo.bg}`}
                        >
                          {statusInfo.icon}
                          {order.status || "Hazırlanıyor"}
                        </span>
                      </div>
                    </div>

                    <div className="text-gray-400 self-end md:self-center">
                      {isExpanded ? (
                        <ChevronUp size={20} />
                      ) : (
                        <ChevronDown size={20} />
                      )}
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="border-t border-[#ECECEC] bg-gray-50/50 p-5 animate-slideDown">
                      <h3 className="font-bold text-xs text-[#737373] uppercase tracking-wider mb-4">
                        Sipariş Detayındaki Ürünler
                      </h3>

                      <div className="bg-white border border-[#ECECEC] rounded-[5px] overflow-hidden">
                        <table className="w-full border-collapse text-left text-sm">
                          <thead>
                            <tr className="bg-[#FAFAFA] border-b border-[#ECECEC] text-[#737373] font-bold text-xs uppercase">
                              <th className="p-3 pl-5">Ürün ID</th>
                              <th className="p-3">Ürün Adı</th>
                              <th className="p-3">Birim Fiyat</th>
                              <th className="p-3 text-center w-24">Adet</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100 font-medium text-[#252B42]">
                            {order.items && order.items.length > 0 ? (
                              order.items.map((prod, idx) => (
                                <tr
                                  key={prod.id || idx}
                                  className="hover:bg-gray-50/30"
                                >
                                  <td className="p-3 pl-5 font-bold text-gray-500">
                                    #{prod.productId}
                                  </td>
                                  <td className="p-3 text-xs capitalize text-[#252B42] font-bold">
                                    {prod.productName}
                                  </td>
                                  <td className="p-3 text-xs text-[#23856D] font-bold">
                                    ${prod.price?.toFixed(2)}
                                  </td>
                                  <td className="p-3 text-center font-bold text-gray-700">
                                    {prod.quantity}
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td
                                  colSpan="4"
                                  className="p-4 text-center text-xs text-gray-400 italic"
                                >
                                  Ürün detay verisi bulunamadı.
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviousOrdersPage;
