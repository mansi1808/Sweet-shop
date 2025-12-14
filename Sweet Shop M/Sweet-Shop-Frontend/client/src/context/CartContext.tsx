import React, { createContext, useContext, useState, useEffect } from "react";
import { Sweet } from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";

interface CartItem extends Sweet {
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (sweet: Sweet, quantity?: number) => void;
  removeFromCart: (sweetId: number) => void;
  updateQuantity: (sweetId: number, quantity: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  // Load cart from local storage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("sweet_shop_cart");
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart", e);
      }
    }
  }, []);

  // Save cart to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("sweet_shop_cart", JSON.stringify(items));
  }, [items]);

  const addToCart = (sweet: Sweet, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === sweet.id);
      if (existing) {
        if (existing.quantity + quantity > sweet.stock) {
          toast({
            variant: "destructive",
            title: "Stock limit reached",
            description: `Only ${sweet.stock} items available.`,
          });
          return prev;
        }
        return prev.map((item) =>
          item.id === sweet.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...sweet, quantity }];
    });
    setIsOpen(true);
    toast({
      title: "Added to cart",
      description: `${quantity} x ${sweet.name}`,
    });
  };

  const removeFromCart = (sweetId: number) => {
    setItems((prev) => prev.filter((item) => item.id !== sweetId));
  };

  const updateQuantity = (sweetId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(sweetId);
      return;
    }
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === sweetId) {
          if (quantity > item.stock) {
             toast({
              variant: "destructive",
              title: "Stock limit reached",
              description: `Only ${item.stock} items available.`,
            });
            return item;
          }
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        total,
        itemCount,
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
