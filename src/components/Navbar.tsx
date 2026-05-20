import { Link, NavLink } from "react-router-dom";
import { ShoppingCart, Search, Menu, Sun } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-50 w-full bg-[#F9F9FB]/80 backdrop-blur-md border-b border-border-light">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <Sun className="w-8 h-8 text-burgundy group-hover:rotate-12 transition-transform" />
          <span className="font-headline font-extrabold text-xl md:text-2xl uppercase tracking-tighter text-primary">
            TecnoSolar<span className="hidden sm:inline"> Santa Cruz</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {[
            { name: "Home", path: "/" },
            { name: "Catalog", path: "/tools" },
            { name: "Lighting", path: "/lighting" },
            { name: "Contact", path: "/contact" }
          ].map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `font-mono text-xs uppercase tracking-widest transition-all ${
                  isActive
                    ? "text-primary border-b-2 border-primary pb-1"
                    : "text-on-surface-variant hover:text-primary"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-industrial-gray rounded-full transition-colors hidden sm:block">
            <Search className="w-5 h-5" />
          </button>
          <Link to="/cart" className="p-2 hover:bg-industrial-gray rounded-full transition-colors relative">
            <ShoppingCart className="w-5 h-5" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-burgundy text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {itemCount}
              </span>
            )}
          </Link>
          <button className="md:hidden p-2 hover:bg-industrial-gray rounded-full transition-colors">
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
