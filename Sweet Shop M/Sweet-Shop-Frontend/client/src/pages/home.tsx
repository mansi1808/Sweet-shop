import { Button, buttonVariants } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Star, ShieldCheck } from "lucide-react";
import { SweetCard } from "@/components/sweet-card";
import { MOCK_SWEETS } from "@/lib/mockData";
import heroImage from "@assets/generated_images/elegant_artisan_sweet_shop_display_with_macarons_and_pastries.png";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function Home() {
  const featuredSweets = MOCK_SWEETS.filter((s) => s.isNew || s.rating >= 4.9).slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Artisan Sweets"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight">
              Life is Short,<br /> Make it Sweet.
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 text-white/90 font-light">
              Handcrafted macarons, artisanal chocolates, and delicate pastries made with passion and the finest ingredients.
            </p>
            <Link href="/shop" className={cn(buttonVariants({ size: "lg" }), "rounded-full px-8 text-lg h-14 bg-primary hover:bg-primary/90 text-primary-foreground border-none")}>
              Explore Our Collection
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            <div className="flex flex-col items-center p-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary">
                <Star className="w-8 h-8 fill-current" />
              </div>
              <h3 className="font-serif text-2xl font-bold mb-3">Premium Ingredients</h3>
              <p className="text-muted-foreground">
                We source only the finest Valrhona chocolate, Madagascar vanilla, and locally grown fruits.
              </p>
            </div>
            <div className="flex flex-col items-center p-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl font-bold mb-3">Artisan Crafted</h3>
              <p className="text-muted-foreground">
                Every sweet is handmade daily in small batches by our expert pastry chefs.
              </p>
            </div>
            <div className="flex flex-col items-center p-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary">
                <ArrowRight className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl font-bold mb-3">Same Day Delivery</h3>
              <p className="text-muted-foreground">
                Order before 2 PM for same-day delivery to keep your cravings satisfied instantly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-24 container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-primary font-medium tracking-widest uppercase text-sm">Curated Selection</span>
          <h2 className="font-serif text-4xl font-bold mt-3 mb-6">Our Customer Favorites</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredSweets.map((sweet) => (
            <SweetCard key={sweet.id} sweet={sweet} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/shop" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "rounded-full px-8")}>
            View All Sweets
          </Link>
        </div>
      </section>

      {/* Newsletter / CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">Join Our Sweet Community</h2>
          <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
            Subscribe to receive updates on new seasonal flavors, exclusive offers, and baking tips from our chefs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 w-full"
            />
            <Button variant="secondary" className="whitespace-nowrap">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
