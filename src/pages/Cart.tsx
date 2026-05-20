import { Link, useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus, Truck, Store, ArrowRight, Lock } from "lucide-react";
import { useState } from "react";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, total, itemCount } = useCart();
  const [delivery, setDelivery] = useState("pickup");
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-32 text-center space-y-8">
        <h1 className="text-4xl font-extrabold uppercase tracking-tighter">Tu carrito está vacío</h1>
        <Link to="/tools" className="btn-primary inline-flex">Volver a la Tienda</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-24">
      <header className="mb-12">
        <h1 className="text-4xl md:text-7xl font-extrabold uppercase tracking-tighter">Carrito de Compras</h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-12">
          <section className="bg-white border border-border-light rounded-container overflow-hidden">
            <div className="hidden md:grid grid-cols-12 p-6 bg-industrial-gray label-tech border-b border-border-light">
              <span className="col-span-6">Producto</span>
              <span className="col-span-2 text-center">Cantidad</span>
              <span className="col-span-3 text-right">Subtotal</span>
              <span className="col-span-1"></span>
            </div>

            <div className="divide-y divide-border-light">
              {cart.map(item => (
                <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 items-center">
                  <div className="col-span-1 md:col-span-6 flex gap-6 items-center">
                    <div className="w-24 h-24 bg-industrial-gray rounded-industrial overflow-hidden border border-border-light flex-shrink-0">
                      <img src={item.image} className="w-full h-full object-cover mix-blend-multiply" alt={item.name} />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-heading font-bold text-lg uppercase leading-none text-primary">{item.name}</h3>
                      <p className="label-tech opacity-60">SKU: {item.sku}</p>
                    </div>
                  </div>

                  <div className="col-span-1 md:col-span-2 flex justify-center">
                    <div className="flex items-center border-2 border-matte-black rounded-industrial p-1 bg-white">
                      <button onClick={() => updateQuantity(item.id, -1)} className="p-2 hover:text-burgundy transition-colors"><Minus className="w-4 h-4" /></button>
                      <span className="w-8 text-center font-mono font-bold text-lg">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="p-2 hover:text-burgundy transition-colors"><Plus className="w-4 h-4" /></button>
                    </div>
                  </div>

                  <div className="col-span-1 md:col-span-3 text-right font-headline font-extrabold text-xl text-primary">
                    ${(item.price * item.quantity).toLocaleString("es-CL")}
                  </div>

                  <div className="col-span-1 flex justify-end">
                    <button onClick={() => removeFromCart(item.id)} className="p-2 text-on-surface-variant hover:text-burgundy transition-colors">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-xl font-extrabold uppercase tracking-tight flex items-center gap-2 text-primary">
              <Truck className="w-6 h-6 text-burgundy" /> Opciones de Entrega
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button 
                onClick={() => setDelivery("pickup")}
                className={`p-6 border rounded-container flex flex-col text-left transition-all ${delivery === "pickup" ? "border-matte-black bg-white ring-2 ring-matte-black/5" : "border-border-light bg-white"}`}
              >
                <div className="flex items-center justify-between w-full mb-4">
                  <Store className="w-5 h-5 text-primary" />
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${delivery === "pickup" ? "border-matte-black" : "border-border-light"}`}>
                    {delivery === "pickup" && <div className="w-2 h-2 rounded-full bg-matte-black" />}
                  </div>
                </div>
                <span className="font-heading font-bold uppercase mb-1 text-primary">Retiro Gratis Santa Cruz</span>
                <span className="text-sm text-on-surface-variant">Disponible hoy en Bodega Principal.</span>
              </button>

              <button 
                onClick={() => setDelivery("shipping")}
                className={`p-6 border rounded-container flex flex-col text-left transition-all ${delivery === "shipping" ? "border-matte-black bg-white ring-2 ring-matte-black/5" : "border-border-light bg-white"}`}
              >
                <div className="flex items-center justify-between w-full mb-4">
                  <Truck className="w-5 h-5 text-primary" />
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${delivery === "shipping" ? "border-matte-black" : "border-border-light"}`}>
                    {delivery === "shipping" && <div className="w-2 h-2 rounded-full bg-matte-black" />}
                  </div>
                </div>
                <span className="font-heading font-bold uppercase mb-1 text-primary">Envío a Regiones</span>
                <span className="text-sm text-on-surface-variant">Despacho por pagar vía Starken / Chilexpress.</span>
              </button>
            </div>
          </section>
        </div>

        <aside className="lg:col-span-4 h-fit">
          <div className="bg-industrial-gray border border-border-light rounded-container p-8 space-y-8 sticky top-28">
            <h2 className="font-sans font-bold text-xl border-b border-border-light pb-4 text-primary">Resumen</h2>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Artículos ({itemCount})</span>
                <span className="font-bold text-primary">${total.toLocaleString("es-CL")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Despacho</span>
                <span className="font-bold text-burgundy">Gratis</span>
              </div>
            </div>

            <div className="border-t border-border-light pt-6 flex justify-between items-end">
              <span className="font-sans font-bold text-lg text-primary">Total</span>
              <span className="text-3xl font-extrabold tracking-tighter text-primary">${total.toLocaleString("es-CL")}</span>
            </div>

            <button onClick={() => navigate("/payment")} className="btn-secondary w-full justify-center">
              Continuar al Pago <ArrowRight className="w-5 h-5" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] font-mono uppercase tracking-widest text-on-surface-variant opacity-60">
              <Lock className="w-3 h-3" /> Pago 100% seguro
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
