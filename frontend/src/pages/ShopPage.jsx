import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/actions/productActions";
import { setFilter } from "../store/reducers/productReducer";
import ShopBreadcrumb from "../components/shop/ShopBreadcrumb";
import CategoryBanner from "../components/shop/CategoryBanner";
import FilterBar from "../components/shop/FilterBar";
import ProductCard from "../components/shop/ProductCard";
import ProductListItem from "../components/shop/ProductListItem";
import Pagination from "../components/shop/Pagination";
import Clients from "../components/home/Clients";

const ShopPage = () => {
  const { gender, categoryName, categoryId } = useParams();
  const dispatch = useDispatch();

  const { productList, total, loading, filter, offset } = useSelector(
    (state) => state.product,
  );

  const [view, setView] = useState("grid");
  const [sort, setSort] = useState("popularity");
  const currentPage = Math.floor(offset / 25);

  const loadProducts = (page = 0) => {
    const newOffset = page * 25;
    dispatch(
      fetchProducts({
        category: categoryId,
        filter: filter,
        sort: sort,
        offset: newOffset,
      }),
    );
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    loadProducts(0);
  }, [dispatch, categoryId, sort, filter]);

  return (
    <div className="flex flex-col min-h-screen font-['Montserrat']">
      <ShopBreadcrumb gender={gender} categoryName={categoryName} />
      <CategoryBanner />

      <FilterBar
        totalCount={total}
        view={view}
        setView={setView}
        sort={sort}
        setSort={setSort}
        onFilter={(val) => {
          dispatch(setFilter(val));
        }}
      />

      <div className="w-full bg-white relative min-h-[400px]">
        <div className="w-full max-w-[1124px] mx-auto px-4 lg:px-0 pt-12 pb-12">
          {loading && (
            <div className="absolute inset-0 bg-white/70 z-50 flex flex-col items-center justify-center">
              <div className="w-12 h-12 border-4 border-[#23A6F0] border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-[#23A6F0] font-bold">Yükleniyor...</p>
            </div>
          )}

          {!loading && productList.length === 0 ? (
            <div className="text-center py-20 text-[#737373]">
              Ürün bulunamadı.
            </div>
          ) : view === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[30px]">
              {productList.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {productList.map((product) => (
                <ProductListItem key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      {total > 25 && (
        <div className="w-full flex justify-center py-12">
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(total / 25)}
            onPageChange={(p) => loadProducts(p)}
          />
        </div>
      )}
      <Clients />
    </div>
  );
};

export default ShopPage;
