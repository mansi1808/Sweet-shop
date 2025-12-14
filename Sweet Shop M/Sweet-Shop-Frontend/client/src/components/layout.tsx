import { Link, useLocation } from "wouter";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, User as UserIcon, LogOut, Menu, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { CartDrawer } from "./cart-drawer";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const { user, logout } = useAuth();
  const { itemCount, setIsOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isAdmin = user?.role === "admin";

  const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
    const isActive = location === href;
    return (
      <Link href={href} className={cn(
        "text-sm font-medium transition-colors hover:text-primary",
        isActive ? "text-primary font-bold" : "text-muted-foreground"
      )}>
        {children}
      </Link>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans text-foreground">
      <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="font-serif text-2xl font-bold tracking-tight text-primary hover:opacity-90 transition-opacity">
            La Pâtisserie
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/shop">Shop</NavLink>
            {isAdmin && (
              <NavLink href="/admin/dashboard">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4" />
                  Admin
                </span>
              </NavLink>
            )}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => setIsOpen(true)}
              aria-label="Open cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <Badge
                  variant="default"
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full p-0 text-[10px]"
                >
                  {itemCount}
                </Badge>
              )}
            </Button>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <UserIcon className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.username}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {isAdmin && (
                    <>
                      <Link href="/admin/dashboard">
                        <DropdownMenuItem className="cursor-pointer">
                          Dashboard
                        </DropdownMenuItem>
                      </Link>
                      <DropdownMenuSeparator />
                    </>
                  )}
                  <DropdownMenuItem
                    className="text-destructive focus:text-destructive cursor-pointer"
                    onClick={logout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login">
                <Button variant="default" size="sm" className="hidden md:flex">
                  Sign In
                </Button>
              </Link>
            )}

            {/* Mobile Menu Trigger */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <div className="flex flex-col gap-4 mt-8">
                  <Link href="/" className="text-lg font-medium" onClick={() => setMobileMenuOpen(false)}>
                    Home
                  </Link>
                  <Link href="/shop" className="text-lg font-medium" onClick={() => setMobileMenuOpen(false)}>
                    Shop
                  </Link>
                  {isAdmin && (
                    <Link href="/admin/dashboard" className="text-lg font-medium" onClick={() => setMobileMenuOpen(false)}>
                      Admin Dashboard
                    </Link>
                  )}
                  {!user && (
                    <Link href="/login" className="text-lg font-medium text-primary" onClick={() => setMobileMenuOpen(false)}>
                      Sign In
                    </Link>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="border-t bg-muted/30">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-serif text-lg font-bold mb-4">La Pâtisserie</h3>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                Crafting moments of sweetness with artisanal ingredients and passion since 2025.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-4">Visit Us</h4>
              <p className="text-muted-foreground text-sm">
                123 Baker Street<br />
                Sweet Valley, CA 90210
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-4">Hours</h4>
              <p className="text-muted-foreground text-sm">
                Mon - Fri: 8am - 8pm<br />
                Sat - Sun: 9am - 6pm
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-xs text-muted-foreground">
            © 2025 La Pâtisserie. All rights reserved.
          </div>
        </div>
      </footer>

      <CartDrawer />
    </div>
  );
}
