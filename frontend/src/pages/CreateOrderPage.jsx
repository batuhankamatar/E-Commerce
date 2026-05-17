import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { cities } from "../data/cities";
import { addressService } from "../services/addressService";
import { cardService } from "../services/cardService";
import { orderService } from "../services/orderService";
import { clearShoppingBag } from "../store/actions/shoppingCartActions";
import { toast } from "react-toastify";
import {
  Plus,
  MapPin,
  User,
  Phone,
  Trash2,
  Edit2,
  ChevronRight,
  CreditCard,
  CheckCircle2,
  ShieldCheck,
  Lock,
  ShoppingBag,
} from "lucide-react";

const CreateOrderPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.shoppingCart.cart) || [];
  const user = useSelector((state) => state.client.user) || {};
  const userId = user.id;

  const [activeStep, setActiveStep] = useState(1);
  const [isOrderSuccess, setIsOrderSuccess] = useState(false);
  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);

  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [isAddrLoading, setIsAddrLoading] = useState(true);
  const [isAddrFormOpen, setIsAddrFormOpen] = useState(false);
  const [isAddrEditing, setIsAddrEditing] = useState(false);
  const [currentAddrId, setCurrentAddrId] = useState(null);
  const [addrFormData, setAddrFormData] = useState({
    title: "",
    name: "",
    surname: "",
    phone: "",
    city: "",
    district: "",
    neighborhood: "",
    address: "",
  });

  const [cards, setCards] = useState([]);
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [isCardLoading, setIsCardLoading] = useState(false);
  const [isCardFormOpen, setIsCardFormOpen] = useState(false);
  const [isCardEditing, setIsCardEditing] = useState(false);
  const [currentCardId, setCurrentCardId] = useState(null);
  const [cardFormData, setCardFormData] = useState({
    card_no: "",
    expire_month: "",
    expire_year: "",
    name_on_card: "",
  });

  useEffect(() => {
    if (userId) {
      loadAddresses();
    }
  }, [userId]);

  useEffect(() => {
    if (userId && activeStep === 2) {
      loadCards();
    }
  }, [userId, activeStep]);

  const loadAddresses = async () => {
    try {
      setIsAddrLoading(true);
      const data = await addressService.getAddresses(userId);
      setAddresses(data || []);
      if (data && data.length > 0) {
        setSelectedAddressId(data[0].id);
      }
    } catch (err) {
      console.error(err);
      toast.error("Adres listeniz yüklenemedi.");
    } finally {
      setIsAddrLoading(false);
    }
  };

  const loadCards = async () => {
    try {
      setIsCardLoading(true);
      const data = await cardService.getCards(userId);
      setCards(data || []);
      if (data && data.length > 0) {
        setSelectedCardId(data[0].id);
      }
    } catch (err) {
      console.error(err);
      toast.error("Kayıtlı kartlarınız yüklenemedi.");
    } finally {
      setIsCardLoading(false);
    }
  };

  const handleAddrInputChange = (e) => {
    const { name, value } = e.target;
    setAddrFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCardInputChange = (e) => {
    const { name, value } = e.target;
    setCardFormData((prev) => ({ ...prev, [name]: value }));
  };

  const openAddAddrForm = () => {
    setIsAddrEditing(false);
    setCurrentAddrId(null);
    setAddrFormData({
      title: "",
      name: "",
      surname: "",
      phone: "",
      city: "",
      district: "",
      neighborhood: "",
      address: "",
    });
    setIsAddrFormOpen(true);
  };

  const openEditAddrForm = (addr) => {
    setIsAddrEditing(true);
    setCurrentAddrId(addr.id);
    setAddrFormData({
      title: addr.title || "",
      name: addr.name || "",
      surname: addr.surname || "",
      phone: addr.phone || "",
      city: addr.city || "",
      district: addr.district || "",
      neighborhood: addr.neighborhood || "",
      address: addr.address || "",
    });
    setIsAddrFormOpen(true);
  };

  const openAddCardForm = () => {
    setIsCardEditing(false);
    setCurrentCardId(null);
    setCardFormData({
      card_no: "",
      expire_month: "",
      expire_year: "",
      name_on_card: "",
    });
    setIsCardFormOpen(true);
  };

  const openEditCardForm = (card) => {
    setIsCardEditing(true);
    setCurrentCardId(card.id);
    setCardFormData({
      card_no: card.card_no || "",
      expire_month: card.expire_month || "",
      expire_year: card.expire_year || "",
      name_on_card: card.name_on_card || "",
    });
    setIsCardFormOpen(true);
  };

  const handleAddrFormSubmit = async (e) => {
    e.preventDefault();
    if (
      !addrFormData.title ||
      !addrFormData.name ||
      !addrFormData.surname ||
      !addrFormData.phone ||
      !addrFormData.city ||
      !addrFormData.district ||
      !addrFormData.neighborhood ||
      !addrFormData.address
    ) {
      toast.warning("Lütfen tüm alanları doldurun.");
      return;
    }
    try {
      if (isAddrEditing) {
        await addressService.updateAddress(currentAddrId, addrFormData);
        toast.success("Adres güncellendi.");
      } else {
        await addressService.createAddress(userId, addrFormData);
        toast.success("Adres kaydedildi.");
      }
      setIsAddrFormOpen(false);
      loadAddresses();
    } catch (err) {
      toast.error("Adres kaydedilemedi.");
    }
  };

  const handleCardFormSubmit = async (e) => {
    e.preventDefault();
    if (
      !cardFormData.card_no ||
      !cardFormData.expire_month ||
      !cardFormData.expire_year ||
      !cardFormData.name_on_card
    ) {
      toast.warning("Lütfen tüm kart alanlarını doldurun.");
      return;
    }
    try {
      if (isCardEditing) {
        await cardService.updateCard(currentCardId, cardFormData);
        toast.success("Kart bilgileri güncellendi.");
      } else {
        await cardService.createCard(userId, cardFormData);
        toast.success("Yeni kart başarıyla kaydedildi.");
      }
      setIsCardFormOpen(false);
      loadCards();
    } catch (err) {
      toast.error("Kart kaydedilemedi.");
    }
  };

  const handleDeleteAddr = async (e, id) => {
    e.stopPropagation();
    if (window.confirm("Bu adresi silmek istediğinize emin misiniz?")) {
      try {
        await addressService.deleteAddress(id);
        if (selectedAddressId === id) setSelectedAddressId(null);
        loadAddresses();
      } catch (err) {
        toast.error("Adres silinemedi.");
      }
    }
  };

  const handleDeleteCard = async (e, id) => {
    e.stopPropagation();
    if (window.confirm("Bu kartı silmek istediğinize emin misiniz?")) {
      try {
        await cardService.deleteCard(id);
        if (selectedCardId === id) setSelectedCardId(null);
        loadCards();
      } catch (err) {
        toast.error("Kart silinemedi.");
      }
    }
  };

  const handleCompleteOrder = async () => {
    if (!selectedAddressId) {
      toast.warning("Lütfen teslimat adresi seçtiğinizden emin olun.");
      return;
    }

    if (!selectedCardId) {
      toast.warning("Lütfen bir ödeme kartı seçtiğinizden emin olun.");
      return;
    }

    const activeItems = cartItems.filter((item) => item.checked);
    if (activeItems.length === 0) {
      toast.warning("Sepetinizde sipariş edilecek aktif ürün bulunmuyor.");
      return;
    }

    try {
      setIsSubmittingOrder(true);

      await orderService.createOrder(userId, selectedAddressId);

      dispatch(clearShoppingBag(userId));

      setIsOrderSuccess(true);
      toast.success("Siparişiniz başarıyla alındı! Teşekkür ederiz.");
    } catch (err) {
      console.error("Sipariş gönderme hatası:", err);
      toast.error("Sipariş oluşturulurken teknik bir sorun yaşandı.");
    } finally {
      setIsSubmittingOrder(false);
    }
  };

  const maskCardNo = (cardNo) => {
    if (!cardNo) return "";
    const clean = cardNo.toString().replace(/\s+/g, "");
    if (clean.length < 16) return cardNo;
    return `${clean.substring(0, 4)} ${clean.substring(4, 6)}** **** ${clean.substring(12)}`;
  };

  const totalSelectedPrice = cartItems.reduce((acc, item) => {
    if (item.checked) return acc + item.count * item.product.price;
    return acc;
  }, 0);

  const shippingStandardPrice = 29.99;
  const isShippingFree = totalSelectedPrice >= 150 || totalSelectedPrice === 0;
  const currentShippingPrice = isShippingFree ? 0 : shippingStandardPrice;
  const fixedDiscount = totalSelectedPrice > 0 ? 10.0 : 0;
  const grandTotal = totalSelectedPrice + currentShippingPrice - fixedDiscount;

  const currentSelectedAddressObj = addresses.find(
    (a) => a.id === selectedAddressId,
  );

  if (isOrderSuccess) {
    return (
      <div className="w-full bg-[#FAFAFA] font-['Montserrat'] min-h-[600px] flex items-center justify-center py-20 animate-fadeIn">
        <div className="bg-white border border-gray-100 shadow-xl rounded-xl p-12 max-w-lg text-center flex flex-col items-center gap-5 mx-4">
          <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center text-[#2DC071]">
            <CheckCircle2 size={48} className="fill-emerald-50" />
          </div>
          <h1 className="font-bold text-[26px] text-[#252B42] mt-2">
            Siparişiniz İçin Teşekkürler!
          </h1>
          <p className="text-[#737373] text-[15px] font-medium leading-relaxed">
            Harika bir seçim yaptınız. Siparişiniz başarıyla sisteme alındı ve
            hazırlık sürecine başlandı. Detayları e-posta adresiniz üzerinden
            takip edebilirsiniz.
          </p>
          <div className="w-full border-t border-gray-100 my-2"></div>
          <Link
            to="/shop"
            className="w-full py-3.5 bg-[#23A6F0] hover:bg-[#1a7bb3] text-white font-bold text-sm rounded-[5px] no-underline shadow-md transition-all active:scale-95 text-center uppercase tracking-wider"
          >
            Alışverişe Devam Et
          </Link>
        </div>
      </div>
    );
  }

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
          <Link
            to="/cart"
            className="font-bold text-[14px] text-[#737373] no-underline hover:text-[#23A6F0]"
          >
            Shopping Cart
          </Link>
          <ChevronRight size={14} className="text-[#BDBDBD]" />
          <span className="font-bold text-[14px] text-[#BDBDBD]">Checkout</span>
        </div>
      </div>

      <div className="w-full max-w-[1050px] mx-auto px-4 mt-8">
        <div className="w-full flex items-center justify-between bg-white border border-[#ECECEC] rounded-[5px] p-4 mb-8 shadow-sm">
          <div
            onClick={() => !isSubmittingOrder && setActiveStep(1)}
            className={`flex-1 flex items-center justify-center gap-3 border-r border-gray-100 py-2 cursor-pointer transition-colors ${activeStep === 1 ? "bg-gray-50/50" : ""}`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-sm ${activeStep === 1 ? "bg-[#23A6F0] text-white" : "bg-emerald-500 text-white"}`}
            >
              {activeStep === 2 ? "✓" : "1"}
            </div>
            <div className="flex flex-col text-left">
              <span
                className={`font-bold text-sm ${activeStep === 1 ? "text-[#23A6F0]" : "text-[#252B42]"}`}
              >
                Adres Bilgileri
              </span>
              {currentSelectedAddressObj ? (
                <span className="text-[11px] text-[#2DC071] font-bold capitalize truncate max-w-[120px]">
                  {currentSelectedAddressObj.title} Seçildi
                </span>
              ) : (
                <span className="text-[11px] text-[#737373] hidden sm:block">
                  Teslimat adresi seçimi
                </span>
              )}
            </div>
          </div>
          <div
            onClick={() =>
              selectedAddressId && !isSubmittingOrder && setActiveStep(2)
            }
            className={`flex-1 flex items-center justify-center gap-3 py-2 ${selectedAddressId ? "cursor-pointer" : "opacity-40 select-none"} ${activeStep === 2 ? "bg-gray-50/50" : ""}`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${activeStep === 2 ? "bg-[#23A6F0] text-white" : "bg-gray-200 text-gray-600"}`}
            >
              2
            </div>
            <div className="flex flex-col text-left">
              <span
                className={`font-bold text-sm ${activeStep === 2 ? "text-[#23A6F0]" : "text-gray-500"}`}
              >
                Ödeme Seçenekleri
              </span>
              <span className="text-[11px] text-gray-400 hidden sm:block">
                Kart ile güvenli ödeme
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {activeStep === 1 && (
            <div className="flex-1 w-full bg-white border border-[#ECECEC] rounded-[5px] p-6 shadow-sm animate-fadeIn">
              <div className="flex justify-between items-center border-b border-gray-100 pb-4 mb-6">
                <h2 className="font-bold text-[18px] text-[#252B42] flex items-center gap-2">
                  <MapPin size={20} className="text-[#23A6F0]" /> Teslimat
                  Adresi
                </h2>
                {!isAddrFormOpen && (
                  <button
                    onClick={openAddAddrForm}
                    className="flex items-center gap-1.5 px-4 py-2 bg-[#23A6F0] hover:bg-[#1a7bb3] text-white font-bold text-xs rounded-[4px] border-none cursor-pointer transition-all uppercase tracking-wider"
                  >
                    <Plus size={14} /> Yeni Adres Ekle
                  </button>
                )}
              </div>

              {isAddrFormOpen && (
                <form
                  onSubmit={handleAddrFormSubmit}
                  className="bg-gray-50/70 border border-[#ECECEC] rounded-[5px] p-6 mb-8"
                >
                  <h3 className="font-bold text-[15px] text-[#252B42] mb-5 pb-2 border-b border-gray-200">
                    {isAddrEditing ? "Adresi Güncelle" : "Yeni Adres Bilgileri"}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5 md:col-span-2">
                      <label className="text-xs font-bold text-[#737373]">
                        Adres Başlığı
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={addrFormData.title}
                        onChange={handleAddrInputChange}
                        className="h-10 border border-gray-200 rounded px-3 text-sm focus:border-[#23A6F0] outline-none"
                        placeholder="Ev, İş vb."
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-[#737373]">
                        Ad
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={addrFormData.name}
                        onChange={handleAddrInputChange}
                        className="h-10 border border-gray-200 rounded px-3 text-sm focus:border-[#23A6F0] outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-[#737373]">
                        Soyad
                      </label>
                      <input
                        type="text"
                        name="surname"
                        value={addrFormData.surname}
                        onChange={handleAddrInputChange}
                        className="h-10 border border-gray-200 rounded px-3 text-sm focus:border-[#23A6F0] outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-[#737373]">
                        Telefon
                      </label>
                      <input
                        type="text"
                        name="phone"
                        value={addrFormData.phone}
                        onChange={handleAddrInputChange}
                        className="h-10 border border-gray-200 rounded px-3 text-sm focus:border-[#23A6F0] outline-none"
                        placeholder="05xxxxxxxx"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-[#737373]">
                        Şehir
                      </label>
                      <select
                        name="city"
                        value={addrFormData.city}
                        onChange={handleAddrInputChange}
                        className="h-10 border border-gray-200 rounded px-3 text-sm focus:border-[#23A6F0] outline-none bg-white"
                      >
                        <option value="">Seçiniz...</option>
                        {cities.map((c) => (
                          <option key={c} value={c.toLowerCase()}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-[#737373]">
                        İlçe
                      </label>
                      <input
                        type="text"
                        name="district"
                        value={addrFormData.district}
                        onChange={handleAddrInputChange}
                        className="h-10 border border-gray-200 rounded px-3 text-sm focus:border-[#23A6F0] outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-[#737373]">
                        Mahalle
                      </label>
                      <input
                        type="text"
                        name="neighborhood"
                        value={addrFormData.neighborhood}
                        onChange={handleAddrInputChange}
                        className="h-10 border border-gray-200 rounded px-3 text-sm focus:border-[#23A6F0] outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5 md:col-span-2">
                      <label className="text-xs font-bold text-[#737373]">
                        Açık Adres
                      </label>
                      <textarea
                        name="address"
                        rows="3"
                        value={addrFormData.address}
                        onChange={handleAddrInputChange}
                        className="border border-gray-200 rounded p-3 text-sm focus:border-[#23A6F0] outline-none font-['Montserrat'] resize-none"
                      ></textarea>
                    </div>
                  </div>
                  <div className="flex justify-end gap-3 mt-6 border-t border-gray-200 pt-4">
                    <button
                      type="button"
                      onClick={() => setIsAddrFormOpen(false)}
                      className="px-5 h-10 border border-gray-300 rounded text-[#737373] font-bold text-xs cursor-pointer bg-white"
                    >
                      Vazgeç
                    </button>
                    <button
                      type="submit"
                      className="px-6 h-10 bg-[#2DC071] text-white font-bold text-xs rounded border-none cursor-pointer"
                    >
                      Kaydet
                    </button>
                  </div>
                </form>
              )}

              {isAddrLoading ? (
                <div className="py-12 text-center text-sm text-[#737373] italic">
                  Adresler yükleniyor...
                </div>
              ) : addresses.length === 0 ? (
                <div className="py-12 text-center border-2 border-dashed border-gray-200 rounded-[5px] text-[#737373] text-sm">
                  Kayıtlı adres bulunamadı.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {addresses.map((addr) => (
                    <div
                      key={addr.id}
                      onClick={() => setSelectedAddressId(addr.id)}
                      className={`border rounded-[5px] p-4 flex flex-col justify-between min-h-[160px] cursor-pointer relative transition-all shadow-sm ${selectedAddressId === addr.id ? "border-[#23A6F0] bg-[#23A6F0]/5 ring-2 ring-[#23A6F0]/20" : "border-[#ECECEC] bg-white"}`}
                    >
                      <div className="flex justify-between items-start w-full">
                        <span className="font-bold text-[14px] text-[#252B42] uppercase tracking-wide flex items-center gap-1.5">
                          <MapPin
                            size={14}
                            className={
                              selectedAddressId === addr.id
                                ? "text-[#23A6F0]"
                                : "text-[#737373]"
                            }
                          />
                          {addr.title}
                        </span>
                        {selectedAddressId === addr.id && (
                          <CheckCircle2 size={16} className="text-[#23A6F0]" />
                        )}
                      </div>
                      <div className="flex flex-col gap-1 text-[12px] text-[#737373] font-medium mt-3 flex-1">
                        <div className="text-[#252B42] font-bold">
                          {addr.name} {addr.surname}
                        </div>
                        <div>{addr.phone}</div>
                        <p className="mt-2 capitalize">
                          {addr.neighborhood} Mah. {addr.address}{" "}
                          {addr.district} / {addr.city}
                        </p>
                      </div>
                      <div className="flex justify-end gap-2 border-t border-gray-100 pt-2 mt-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openEditAddrForm(addr);
                          }}
                          className="p-2 text-gray-400 hover:text-[#23A6F0] border-none bg-transparent cursor-pointer"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={(e) => handleDeleteAddr(e, addr.id)}
                          className="p-2 text-gray-400 hover:text-[#E74040] border-none bg-transparent cursor-pointer"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeStep === 2 && (
            <div className="flex-1 w-full bg-white border border-[#ECECEC] rounded-[5px] p-6 shadow-sm animate-fadeIn">
              <div className="flex justify-between items-center border-b border-gray-100 pb-4 mb-6">
                <h2 className="font-bold text-[18px] text-[#252B42] flex items-center gap-2">
                  <CreditCard size={20} className="text-[#23A6F0]" /> Kart ile
                  Öde
                </h2>
                {!isCardFormOpen && (
                  <button
                    onClick={openAddCardForm}
                    className="flex items-center gap-1.5 px-4 py-2 bg-[#23A6F0] hover:bg-[#1a7bb3] text-white font-bold text-xs rounded-[4px] border-none cursor-pointer transition-all uppercase tracking-wider"
                  >
                    <Plus size={14} /> Yeni Kart Ekle
                  </button>
                )}
              </div>

              {isCardFormOpen && (
                <form
                  onSubmit={handleCardFormSubmit}
                  className="bg-gray-50/70 border border-[#ECECEC] rounded-[5px] p-6 mb-8 animate-fadeIn"
                >
                  <h3 className="font-bold text-[15px] text-[#252B42] mb-5 pb-2 border-b border-gray-200">
                    {isCardEditing
                      ? "Kart Bilgilerini Güncelle"
                      : "Yeni Kart Bilgileri"}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex flex-col gap-1.5 md:col-span-3">
                      <label className="text-xs font-bold text-[#737373]">
                        Kart Numarası
                      </label>
                      <input
                        type="text"
                        name="card_no"
                        maxLength="16"
                        value={cardFormData.card_no}
                        onChange={handleCardInputChange}
                        className="h-10 border border-gray-200 rounded px-3 text-sm focus:border-[#23A6F0] outline-none"
                        placeholder="1234123412341234"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5 md:col-span-3">
                      <label className="text-xs font-bold text-[#737373]">
                        Kart Üzerindeki İsim
                      </label>
                      <input
                        type="text"
                        name="name_on_card"
                        value={cardFormData.name_on_card}
                        onChange={handleCardInputChange}
                        className="h-10 border border-gray-200 rounded px-3 text-sm focus:border-[#23A6F0] outline-none"
                        placeholder="Ahmet Taş"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-[#737373]">
                        Son Kullanma Ayı
                      </label>
                      <select
                        name="expire_month"
                        value={cardFormData.expire_month}
                        onChange={handleCardInputChange}
                        className="h-10 border border-gray-200 rounded px-3 text-sm focus:border-[#23A6F0] outline-none bg-white"
                      >
                        <option value="">Ay</option>
                        {Array.from({ length: 12 }, (_, i) => i + 1).map(
                          (m) => (
                            <option key={m} value={m}>
                              {m < 10 ? `0${m}` : m}
                            </option>
                          ),
                        )}
                      </select>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-[#737373]">
                        Son Kullanma Yılı
                      </label>
                      <select
                        name="expire_year"
                        value={cardFormData.expire_year}
                        onChange={handleCardInputChange}
                        className="h-10 border border-gray-200 rounded px-3 text-sm focus:border-[#23A6F0] outline-none bg-white"
                      >
                        <option value="">Yıl</option>
                        {Array.from({ length: 15 }, (_, i) => 2026 + i).map(
                          (y) => (
                            <option key={y} value={y}>
                              {y}
                            </option>
                          ),
                        )}
                      </select>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-[#737373]">
                        CVV (Kaydedilmez)
                      </label>
                      <input
                        type="password"
                        maxLength="3"
                        disabled
                        className="h-10 border border-gray-200 rounded px-3 text-sm bg-gray-100 outline-none"
                        placeholder="***"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-3 mt-6 border-t border-gray-200 pt-4">
                    <button
                      type="button"
                      onClick={() => setIsCardFormOpen(false)}
                      className="px-5 h-10 border border-gray-300 rounded text-[#737373] font-bold text-xs cursor-pointer bg-white"
                    >
                      Vazgeç
                    </button>
                    <button
                      type="submit"
                      className="px-6 h-10 bg-[#2DC071] text-white font-bold text-xs rounded border-none cursor-pointer"
                    >
                      Kartı Kaydet
                    </button>
                  </div>
                </form>
              )}

              {isCardLoading ? (
                <div className="py-12 text-center text-sm text-[#737373] italic">
                  Kartlarınız yükleniyor...
                </div>
              ) : cards.length === 0 ? (
                <div className="py-12 text-center border-2 border-dashed border-gray-200 rounded-[5px] text-[#737373] text-sm">
                  Kayıtlı kart bulunamadı.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {cards.map((card) => {
                    const isCardSelected = selectedCardId === card.id;
                    return (
                      <div
                        key={card.id}
                        onClick={() => setSelectedCardId(card.id)}
                        className={`border rounded-xl p-5 flex flex-col justify-between min-h-[160px] cursor-pointer relative transition-all shadow-md bg-gradient-to-br from-gray-900 to-slate-800 text-white ${isCardSelected ? "ring-4 ring-[#23A6F0]/50 border-[#23A6F0]" : "border-gray-700"}`}
                      >
                        <div className="flex justify-between items-start w-full">
                          <span className="font-bold text-[14px] uppercase tracking-widest text-[#23A6F0]">
                            {card.name_on_card}
                          </span>
                          {isCardSelected && (
                            <CheckCircle2
                              size={18}
                              className="text-[#23A6F0] fill-[#23A6F0]/20"
                            />
                          )}
                        </div>
                        <div className="text-[18px] font-bold tracking-[0.2em] my-4 font-mono text-gray-200">
                          {maskCardNo(card.card_no)}
                        </div>
                        <div className="flex justify-between items-center w-full mt-2">
                          <div className="flex flex-col">
                            <span className="text-[9px] text-gray-400 uppercase font-bold tracking-wider">
                              Son Kul.
                            </span>
                            <span className="text-xs font-bold font-mono">
                              {card.expire_month < 10
                                ? `0${card.expire_month}`
                                : card.expire_month}
                              /{card.expire_year}
                            </span>
                          </div>
                          <div className="flex gap-1.5">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                openEditCardForm(card);
                              }}
                              className="p-1.5 text-gray-400 hover:text-[#23A6F0] border-none bg-transparent cursor-pointer"
                            >
                              <Edit2 size={14} />
                            </button>
                            <button
                              onClick={(e) => handleDeleteCard(e, card.id)}
                              className="p-1.5 text-gray-400 hover:text-[#E74040] border-none bg-transparent cursor-pointer"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          <div className="w-full lg:w-[320px] flex flex-col gap-4">
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

              {activeStep === 1 ? (
                <button
                  onClick={() => selectedAddressId && setActiveStep(2)}
                  disabled={!selectedAddressId || totalSelectedPrice === 0}
                  className="w-full h-12 bg-[#23A6F0] hover:bg-[#1a7bb3] disabled:bg-gray-200 disabled:text-gray-400 text-white font-bold text-sm rounded-[5px] border-none cursor-pointer transition-all mt-5 shadow-md uppercase tracking-wider flex items-center justify-center gap-1.5"
                >
                  Ödeme Adımına Geç <ChevronRight size={16} />
                </button>
              ) : (
                <button
                  onClick={handleCompleteOrder}
                  disabled={
                    !selectedCardId ||
                    totalSelectedPrice === 0 ||
                    isSubmittingOrder
                  }
                  className="w-full h-12 bg-[#2DC071] hover:bg-[#239e5b] disabled:bg-gray-200 disabled:text-gray-400 text-white font-bold text-sm rounded-[5px] border-none cursor-pointer transition-all mt-5 shadow-md uppercase tracking-wider flex items-center justify-center gap-1.5"
                >
                  {isSubmittingOrder ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <Lock size={16} /> Ödeme Yap (${grandTotal.toFixed(2)})
                    </>
                  )}
                </button>
              )}
            </div>

            <div className="flex items-center justify-center gap-2 text-[#737373] text-[12px] font-bold px-2 py-1">
              <ShieldCheck size={16} className="text-[#2DC071]" />
              <span>Güvenli Alışveriş Garantisi</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateOrderPage;
