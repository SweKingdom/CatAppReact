import { useState } from "react";
import CartContext from "./CartContext";

export default function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([])

    const addToCart = (cat) => {
        setCartItems(prev => {
            const existing = prev.find(item => item.id === cat.id);
            if (existing) {
                return prev.map(item =>
                    item.id === cat.id ? {...item, quantity: item.quantity +1} : item
                );
            }
            return [...prev, {...cat, quantity: 1}];
        });
    };

    const removeFromCart = (id) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    const increaseQuantity = (id) => {
        setCartItems(prev => 
            prev.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item)
        );
    };

    const decreaseQuantity = (id) => {
        setCartItems(prev => 
            prev
                .map(item => item.id === id ? { ...item, quantity: item.quantity - 1 } : item)
                .filter(item => item.quantity > 0)
        );
    };

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <CartContext.Provider value={{
            cartItems,
            setCartItems,
            addToCart,
            removeFromCart,
            increaseQuantity,
            decreaseQuantity,
            totalItems
        }}>
            {children}
        </CartContext.Provider>
    );
}