import React from "react";
import BestsellerSimple from "../components/home/BestsellerSimple";
import Clients from "../components/home/Clients";

const ProductListPage = () => (
  <div className="flex flex-col font-['Montserrat'] bg-white">
    <BestsellerSimple limit={8} />
    <Clients />
  </div>
);

export default ProductListPage;
