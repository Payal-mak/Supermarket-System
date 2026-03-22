import { createContext, useContext, useReducer, useCallback } from 'react';

const CartContext = createContext(null);

const initialState = { items: [], isOpen: false };

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const exists = state.items.find(i => i.product_id === action.payload.product_id);
      if (exists) {
        return {
          ...state,
          items: state.items.map(i =>
            i.product_id === action.payload.product_id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }
      return { ...state, items: [...state.items, { ...action.payload, quantity: 1 }] };
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(i => i.product_id !== action.payload) };
    case 'UPDATE_QTY':
      if (action.payload.qty <= 0) {
        return { ...state, items: state.items.filter(i => i.product_id !== action.payload.id) };
      }
      return {
        ...state,
        items: state.items.map(i =>
          i.product_id === action.payload.id ? { ...i, quantity: action.payload.qty } : i
        ),
      };
    case 'CLEAR_CART':
      return { ...state, items: [] };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addItem    = useCallback((product) => dispatch({ type: 'ADD_ITEM', payload: product }), []);
  const removeItem = useCallback((id) => dispatch({ type: 'REMOVE_ITEM', payload: id }), []);
  const updateQty  = useCallback((id, qty) => dispatch({ type: 'UPDATE_QTY', payload: { id, qty } }), []);
  const clearCart  = useCallback(() => dispatch({ type: 'CLEAR_CART' }), []);

  const itemCount    = state.items.reduce((s, i) => s + i.quantity, 0);
  const subtotal     = state.items.reduce((s, i) => s + i.price.selling_price * i.quantity, 0);
  const gstAmount    = state.items.reduce((s, i) => {
    const gst = (i.price.selling_price * i.price.gst_percent) / 100;
    return s + gst * i.quantity;
  }, 0);
  const total        = subtotal + gstAmount;
  const savings      = state.items.reduce((s, i) => s + (i.price.mrp - i.price.selling_price) * i.quantity, 0);

  const isInCart = (id) => state.items.some(i => i.product_id === id);
  const getQty   = (id) => state.items.find(i => i.product_id === id)?.quantity || 0;

  return (
    <CartContext.Provider value={{
      items: state.items, itemCount, subtotal, gstAmount, total, savings,
      addItem, removeItem, updateQty, clearCart, isInCart, getQty,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be inside CartProvider');
  return ctx;
};
