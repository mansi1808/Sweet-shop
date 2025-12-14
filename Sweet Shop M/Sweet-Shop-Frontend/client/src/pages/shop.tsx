import { useState } from "react";
import { MOCK_SWEETS, CATEGORIES } from "@/lib/mockData";
import { SweetCard } from "@/components/sweet-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

export default function Shop() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("All");
  const [sort, setSort] = useState<string>("featured");

  const filteredSweets = MOCK_SWEETS.filter((sweet) => {
    const matchesSearch = sweet.name.toLowerCase().includes(search.toLowerCase()) || 
                          sweet.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || sweet.category === category;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    if (sort === "rating") return b.rating - a.rating;
    return 0; // featured/default
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-10 gap-4">
        <div>
          <h1 className="font-serif text-4xl font-bold mb-2">Shop Sweets</h1>
          <p className="text-muted-foreground">Discover our full range of handcrafted delights.</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-64 flex-shrink-0 space-y-8">
          <div className="space-y-4">
            <h3 className="font-serif font-bold text-lg flex items-center gap-2">
              <Search className="w-4 h-4" />
              Search
            </h3>
            <Input
              placeholder="Search sweets..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="space-y-4">
            <h3 className="font-serif font-bold text-lg flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4" />
              Categories
            </h3>
            <div className="flex flex-wrap gap-2 lg:flex-col lg:items-start">
              <Button
                variant={category === "All" ? "default" : "outline"}
                size="sm"
                onClick={() => setCategory("All")}
                className="justify-start"
              >
                All Sweets
              </Button>
              {CATEGORIES.map((cat) => (
                <Button
                  key={cat}
                  variant={category === cat ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setCategory(cat)}
                  className="justify-start w-full"
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-muted-foreground">
              Showing {filteredSweets.length} results
            </p>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium hidden sm:inline">Sort by:</span>
              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Top Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {filteredSweets.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSweets.map((sweet) => (
                <SweetCard key={sweet.id} sweet={sweet} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-muted/30 rounded-lg">
              <p className="text-lg font-medium">No sweets found matching your criteria.</p>
              <Button
                variant="link"
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                }}
              >
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
