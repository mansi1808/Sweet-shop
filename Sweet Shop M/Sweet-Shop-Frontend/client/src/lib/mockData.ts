import { z } from "zod";

export const SweetSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  category: z.string(),
  image: z.string(),
  stock: z.number(),
  rating: z.number(),
  isNew: z.boolean().optional(),
});

export type Sweet = z.infer<typeof SweetSchema>;

export const UserSchema = z.object({
  id: z.number(),
  username: z.string(),
  role: z.enum(["user", "admin"]),
  name: z.string(),
});

export type User = z.infer<typeof UserSchema>;

export const OrderSchema = z.object({
  id: z.string(),
  userId: z.number(),
  items: z.array(
    z.object({
      sweetId: z.number(),
      quantity: z.number(),
      price: z.number(),
      name: z.string(),
    })
  ),
  total: z.number(),
  status: z.enum(["pending", "processing", "completed", "cancelled"]),
  date: z.string(),
});

export type Order = z.infer<typeof OrderSchema>;

export const CATEGORIES = ["Macarons", "Chocolates", "Pastries", "Cakes", "Gift Boxes"];

export const MOCK_SWEETS: Sweet[] = [
  {
    id: 1,
    name: "Raspberry Rose Macaron",
    description: "Delicate almond shells filled with raspberry rose ganache.",
    price: 3.50,
    category: "Macarons",
    image: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&q=80&w=800",
    stock: 45,
    rating: 4.8,
    isNew: true
  },
  {
    id: 2,
    name: "Dark Chocolate Truffle",
    description: "70% dark chocolate ganache dusted with cocoa powder.",
    price: 2.50,
    category: "Chocolates",
    image: "https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&q=80&w=800",
    stock: 120,
    rating: 4.9
  },
  {
    id: 3,
    name: "Pistachio Éclair",
    description: "Choux pastry filled with pistachio cream and topped with glaze.",
    price: 5.50,
    category: "Pastries",
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=800",
    stock: 15,
    rating: 4.7
  },
  {
    id: 4,
    name: "Salted Caramel Tart",
    description: "Buttery tart shell with salted caramel and chocolate ganache.",
    price: 6.00,
    category: "Pastries",
    image: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&q=80&w=800",
    stock: 20,
    rating: 4.9,
    isNew: true
  },
  {
    id: 5,
    name: "Lemon Meringue Cupcake",
    description: "Zesty lemon cupcake topped with toasted meringue.",
    price: 4.00,
    category: "Cakes",
    image: "https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&q=80&w=800",
    stock: 30,
    rating: 4.6
  },
  {
    id: 6,
    name: "Assorted Gift Box",
    description: "A curated selection of our finest macarons and chocolates.",
    price: 45.00,
    category: "Gift Boxes",
    image: "https://images.unsplash.com/photo-1526081347589-7fa3cb41b4b2?auto=format&fit=crop&q=80&w=800",
    stock: 10,
    rating: 5.0
  }
];

export const MOCK_USERS: User[] = [
  { id: 1, username: "user", role: "user", name: "Alice Sweet" },
  { id: 2, username: "admin", role: "admin", name: "Chef Baker" },
];
