import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import ShopBreadcrumb from "../components/shop/ShopBreadcrumb";
import CategoryBanner from "../components/shop/CategoryBanner";
import FilterBar from "../components/shop/FilterBar";
import ProductCard from "../components/shop/ProductCard";
import ProductListItem from "../components/shop/ProductListItem";
import Pagination from "../components/shop/Pagination";
import Clients from "../components/home/Clients";

const ShopPage = () => {
  const { categoryCode } = useParams();
  const [products, setProducts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const [view, setView] = useState("grid");
  const [sort, setSort] = useState("popularity");
  const [loading, setLoading] = useState(true);

  const fetchProducts = (page = 0) => {
    setLoading(true);
    const params = new URLSearchParams({
      sort,
      page,
      size: 12,
      ...(categoryCode && { categoryCode: categoryCode.toUpperCase() }),
    });

    axiosInstance
      .get(`/products/shop?${params}`)
      .then((res) => {
        setProducts(res.data.products);
        setTotalCount(res.data.totalCount);
        setTotalPages(res.data.totalPages);
        setCurrentPage(res.data.currentPage);
      })
      .catch((err) => console.error("Ürünler çekilemedi:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProducts(0);
  }, [categoryCode, sort]);

  return (
    <div className="flex flex-col min-h-screen font-['Montserrat']">
      <ShopBreadcrumb />
      <CategoryBanner />
      <FilterBar
        totalCount={totalCount}
        view={view}
        setView={setView}
        sort={sort}
        setSort={setSort}
        onFilter={() => fetchProducts(0)}
      />

      <div className="w-full bg-white">
        <div className="w-full max-w-[1124px] mx-auto px-4 lg:px-0 pt-12 pb-12">
          {loading ? (
            <div className="flex items-center justify-center h-[400px] text-[#737373]">
              Loading...
            </div>
          ) : view === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[30px]">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {products.map((product) => (
                <ProductListItem key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      {totalPages > 1 && (
        <div className="w-full flex justify-center py-12">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(p) => fetchProducts(p)}
          />
        </div>
      )}

      <Clients />
    </div>
  );
};

export default ShopPage;
