import React from 'react';

const CartoonAvatar = ({ name, size = 'w-16 h-16' }) => {
  const getInitials = (name) => {
    return name ? name.charAt(0).toUpperCase() : 'U';
  };

  return (
    <div className={`${size} bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl`}>
      {getInitials(name)}
    </div>
  );
};

export default CartoonAvatar;