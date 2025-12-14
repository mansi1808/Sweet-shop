import { Sweet } from "@/lib/mockData";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";

interface SweetCardProps {
  sweet: Sweet;
}

export function SweetCard({ sweet }: SweetCardProps) {
  const { addToCart } = useCart();

  const isOutOfStock = sweet.stock === 0;
  const isLowStock = sweet.stock > 0 && sweet.stock < 10;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <Card className="overflow-hidden h-full flex flex-col group border-0 shadow-sm hover:shadow-md transition-shadow duration-300 bg-card">
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={sweet.image}
            alt={sweet.name}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          {sweet.isNew && (
            <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground hover:bg-accent/90">
              New Arrival
            </Badge>
          )}
          {isOutOfStock && (
            <div className="absolute inset-0 bg-background/60 backdrop-blur-[1px] flex items-center justify-center">
              <Badge variant="destructive" className="text-lg py-1 px-4">
                Sold Out
              </Badge>
            </div>
          )}
        </div>

        <CardHeader className="p-4 pb-0">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-1">
                {sweet.category}
              </p>
              <h3 className="font-serif text-lg font-bold leading-tight group-hover:text-primary transition-colors">
                {sweet.name}
              </h3>
            </div>
            <span className="font-bold text-lg text-primary">
              ${sweet.price.toFixed(2)}
            </span>
          </div>
        </CardHeader>

        <CardContent className="p-4 flex-grow">
          <p className="text-sm text-muted-foreground line-clamp-2">
            {sweet.description}
          </p>
          {isLowStock && (
            <p className="text-xs text-orange-500 mt-2 font-medium">
              Only {sweet.stock} left!
            </p>
          )}
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <Button
            className="w-full"
            onClick={() => addToCart(sweet)}
            disabled={isOutOfStock}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
