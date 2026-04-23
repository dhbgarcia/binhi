import React from 'react';

const ProductCard = ({ name, image }) => {
  return (
    <div
      className="w-[306px] h-[256px] bg-emerald-950 rounded-xl bg-cover bg-center relative flex flex-col items-center"
      style={{ backgroundImage: `url('../assets/productbackground.svg')` }}
    >
      <div className="mt-4 p-2 bg-white rounded-xl w-[170px] h-[150px] flex items-center justify-center">
        <img src={image} alt={name} className="h-[100px] object-contain" />
      </div>
      <div className="absolute bottom-3 text-white font-bold text-lg">{name}</div>
    </div>
  );
};

export default ProductCard;
