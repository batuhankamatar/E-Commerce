import React from "react";

const LOCATIONS = [
  {
    city: "Paris",
    address: "1901 Thorn ridge Cir.",
    postal: "75000 Paris",
    phone: "+451 215 215",
    fax: "+451 215 215",
  },
  {
    city: "Berlin",
    address: "4140 Parker Rd.",
    postal: "75000 Paris",
    phone: "+451 215 215",
    fax: "+451 215 215",
  },
  {
    city: "New York",
    address: "2715 Ash Dr. San Jose,",
    postal: "75000 Paris",
    phone: "+451 215 215",
    fax: "+451 215 215",
  },
  {
    city: "London",
    address: "3517 W. Gray St. Utica,",
    postal: "75000 Paris",
    phone: "+451 215 215",
    fax: "+451 215 215",
  },
];

const LocationCard = ({ city, address, postal, phone, fax }) => (
  <div className="flex flex-col gap-4 p-[25px] rounded-[2px]">
    <h3 className="font-bold text-[24px] leading-8 tracking-[0.1px] text-white">
      {city}
    </h3>
    <p className="font-normal text-[20px] leading-[30px] tracking-[0.2px] text-white">
      {address}
    </p>
    <div className="w-[50px] h-[2px] bg-[#23A6F0]" />
    <span className="font-bold text-[16px] leading-6 tracking-[0.1px] text-white">
      {postal}
    </span>
    <span className="font-bold text-[16px] leading-6 tracking-[0.1px] text-white">
      Phone ; {phone}
    </span>
    <span className="font-bold text-[16px] leading-6 tracking-[0.1px] text-white">
      Fax : {fax}
    </span>
  </div>
);

const ContactInfo = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-[5px]">
    {LOCATIONS.map((loc) => (
      <LocationCard key={loc.city} {...loc} />
    ))}
  </div>
);

export default ContactInfo;
