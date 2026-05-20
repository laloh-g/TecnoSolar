import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ChevronRight, ShoppingCart, MessageSquare, Plus, Minus, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { PRODUCTS } from "../data/products";
import { useCart } from "../context/CartContext";
import { Product } from "../types";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [showSpecs, setShowSpecs] = useState(true);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/productos.json")
      .then(res => {
        if (!res.ok) throw new Error("No se pudo cargar el catálogo");
        return res.json();
      })
      .then((data: Product[]) => {
        const found = data.find(p => p.id === Number(id));
        setProduct(found || null);
        setLoading(false);
      })
      .catch(err => {
        console.warn("Fallback to static products array in ProductDetail:", err);
        const found = PRODUCTS.find(p => p.id === Number(id));
        setProduct(found || null);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-32 text-center space-y-8 animate-pulse">
        <div className="h-8 bg-neutral-200 w-1/3 mx-auto rounded-sm"></div>
        <div className="h-4 bg-neutral-200 w-1/2 mx-auto rounded-sm"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-32 text-center space-y-8">
        <h1 className="text-3xl font-extrabold uppercase">Producto no encontrado</h1>
        <Link to="/tools" className="btn-primary inline-flex">Volver al Catálogo</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, qty);
    navigate("/cart");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-16">
      <nav className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-on-surface-variant mb-12">
        <Link to="/tools" className="hover:text-primary">Catalog</Link>
        <ChevronRight className="w-3 h-3" />
        <Link to="#" className="hover:text-primary">{product.category}</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-primary font-bold">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-7 space-y-6">
          <div className="aspect-square bg-white border border-border-light rounded-container p-12 flex items-center justify-center relative overflow-hidden group">
            {product.tag && (
              <span className="absolute top-6 left-6 bg-burgundy text-white font-mono text-xs px-3 py-1 rounded-sm uppercase tracking-widest z-20">
                {product.tag}
              </span>
            )}
            <motion.img 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </div>

        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-extrabold uppercase leading-[0.9] tracking-tighter text-primary">
              {product.name}
            </h1>
            <p className="label-tech text-on-surface-variant">SKU: {product.sku}</p>
            <div className="text-5xl font-extrabold tracking-tighter text-primary">
              ${product.price.toLocaleString("es-CL")}
            </div>
            <p className="text-on-surface-variant leading-relaxed">
              {product.description}
            </p>
          </div>

          <hr className="border-border-light" />

          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-burgundy animate-pulse" />
              <span className="label-tech">Disponibilidad Inmediata</span>
            </div>

            <div className="space-y-3">
              <label className="font-headline font-bold uppercase tracking-tight text-sm text-primary">Cantidad</label>
              <div className="flex items-center border-2 border-matte-black rounded-industrial w-32 justify-between">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-3 hover:bg-industrial-gray">
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-mono font-bold">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="p-3 hover:bg-industrial-gray">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button onClick={handleAddToCart} className="btn-primary w-full justify-center h-16">
              <ShoppingCart className="w-5 h-5" /> Añadir al Carrito
            </button>
          </div>

          <div className="border-t border-border-light pt-4">
            <button onClick={() => setShowSpecs(!showSpecs)} className="w-full flex items-center justify-between py-4 uppercase font-headline font-bold text-primary">
              Ficha Técnica
              <ChevronDown className={`w-5 h-5 transition-transform ${showSpecs ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {showSpecs && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <table className="w-full text-left text-sm border-collapse">
                    <tbody>
                      {product.specs.map((spec, i) => (
                        <tr key={spec.label} className={i % 2 === 0 ? "bg-white" : "bg-industrial-gray"}>
                          <td className="p-4 font-bold border-b border-border-light/20 text-primary">{spec.label}</td>
                          <td className="p-4 font-mono text-xs text-burgundy border-b border-border-light/20">{spec.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
