// contexts/CartContext.js
import React, { createContext, useContext, useReducer } from "react";

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      // Assuming `payload` contains a product object with a quantity
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }], // Add quantity when adding to cart
      };
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] }); // Ensure `items` is initialized

  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  return (
    <CartContext.Provider value={{ cart: state.items, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
