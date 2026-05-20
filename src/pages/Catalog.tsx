import { useState, useEffect } from "react";
import { SlidersHorizontal, ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import { PRODUCTS } from "../data/products";
import { useCart } from "../context/CartContext";
import { Product } from "../types";

const CATEGORIES = ["Herramientas Eléctricas", "Iluminación Solar"];

export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch("/productos.json")
      .then(res => {
        if (!res.ok) throw new Error("No se pudo cargar el catálogo dinámico");
        return res.json();
      })
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.warn("Fallback to static products array:", err);
        setProducts(PRODUCTS);
        setLoading(false);
      });
  }, []);

  const filteredProducts = selectedCategory 
    ? products.filter(p => p.category === selectedCategory)
    : products;

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
      <header className="mb-12 border-b border-border-light pb-8">
        <h1 className="text-4xl md:text-6xl font-extrabold uppercase tracking-tighter mb-4">Catálogo Técnico</h1>
        <p className="text-on-surface-variant max-w-2xl">Equipos de alto rendimiento seleccionados para la industria agrícola y vinícola de la VI Región.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Sidebar Filters */}
        <aside className="lg:col-span-3 space-y-8 hidden md:block">
          <div className="card-industrial p-6 space-y-6 bg-white">
            <h3 className="font-sans font-bold text-lg border-b border-border-light pb-4">Filtros Técnicos</h3>
            
            <div className="space-y-4">
              <span className="label-tech block">Categorías</span>
              <div className="space-y-2">
                {CATEGORIES.map(cat => (
                  <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 rounded-sm border-border-light text-matte-black focus:ring-burgundy"
                      checked={selectedCategory === cat}
                      onChange={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                    />
                    <span className="text-sm font-medium text-on-surface-variant group-hover:text-primary transition-colors">{cat}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="lg:col-span-9 space-y-8">
          <div className="flex items-center justify-between">
            <span className="label-tech">{filteredProducts.length} Productos Encontrados</span>
            <button className="md:hidden flex items-center gap-2 label-tech border border-border-light p-2 rounded-sm bg-white">
              <SlidersHorizontal className="w-4 h-4" /> Filtros
            </button>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {[1, 2, 3].map((n) => (
                <div key={n} className="card-industrial bg-white p-6 h-[420px] animate-pulse flex flex-col justify-between">
                  <div className="bg-neutral-200 aspect-square w-full rounded-sm"></div>
                  <div className="space-y-3 mt-4">
                    <div className="h-4 bg-neutral-200 w-1/3 rounded-sm"></div>
                    <div className="h-6 bg-neutral-200 w-5/6 rounded-sm"></div>
                  </div>
                  <div className="space-y-2 mt-auto">
                    <div className="h-8 bg-neutral-200 w-1/2 rounded-sm"></div>
                    <div className="h-10 bg-neutral-200 w-full rounded-sm"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
            >
              <AnimatePresence>
                {filteredProducts.map(product => (
                  <motion.article
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    key={product.id}
                    className="card-industrial group flex flex-col h-full bg-white relative"
                  >
                    <Link to={`/product/${product.id}`} className="block relative bg-industrial-gray aspect-square p-8 flex items-center justify-center overflow-hidden">
                      {product.tag && (
                        <span className="absolute top-4 left-4 bg-burgundy text-white font-mono text-[10px] px-2 py-1 rounded-sm z-10 uppercase tracking-widest">
                          {product.tag}
                        </span>
                      )}
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                      />
                    </Link>
                    <div className="p-6 flex flex-col flex-grow space-y-4">
                      <div className="space-y-1">
                        <span className="label-tech text-on-surface-variant opacity-60">{product.category}</span>
                        <h3 className="font-headline font-bold text-lg leading-tight uppercase line-clamp-2 text-primary">
                          {product.name}
                        </h3>
                      </div>
                      <div className="mt-auto space-y-4">
                        <div className="text-xl font-headline font-extrabold text-primary">
                          ${product.price.toLocaleString("es-CL")}
                        </div>
                        <button 
                          onClick={() => addToCart(product)}
                          className="w-full btn-secondary py-3 text-sm justify-center group/btn"
                        >
                          <ShoppingCart className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" /> 
                          Añadir
                        </button>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
