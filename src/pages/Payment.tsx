import { Link } from "react-router-dom";
import { ArrowLeft, Landmark, Copy, CheckCircle2, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { useCart } from "../context/CartContext";

export default function Payment() {
  const { cart, total } = useCart();
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (val: string, label: string) => {
    navigator.clipboard.writeText(val);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  const shareWhatsApp = () => {
    const detailText = cart.map(item => `- ${item.quantity}x ${item.name} ($${(item.price * item.quantity).toLocaleString("es-CL")})`).join("\n  ");
    const message = `Hola TecnoSolar Santa Cruz, quiero confirmar mi pedido. 
  Detalle:
  ${detailText}
  Total a Transferir: $${total.toLocaleString("es-CL")}. Adjunto el comprobante de transferencia a continuación.`;
    
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/56931930339?text=${encoded}`, "_blank");
  };

  const BANK_DETAILS = [
    { label: "Banco", value: "Banco de Chile" },
    { label: "Tipo de Cuenta", value: "Cuenta Corriente" },
    { label: "Número de Cuenta", value: "002100845906" },
    { label: "RUT", value: "14.305.848-4" },
    { label: "Email", value: "wilson_guerreroes@yahoo.es" },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-12 md:py-24">
      <div className="flex flex-col items-center text-center mb-16">
        <div className="w-20 h-20 bg-industrial-gray rounded-full flex items-center justify-center mb-8 border border-border-light">
          <Landmark className="w-8 h-8 text-burgundy" />
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold uppercase tracking-tighter mb-4 text-primary">Pago Pendiente</h1>
        <p className="text-lg text-on-surface-variant max-w-md">
          Transfiere el monto total a nuestra cuenta para procesar tu orden.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="bg-matte-black text-white p-8 rounded-container flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <span className="label-tech text-white opacity-40 block mb-1">Orden de Compra</span>
              <h2 className="text-2xl font-extrabold tracking-tight">#TS-1024</h2>
            </div>
            <div className="text-left md:text-right">
              <span className="label-tech text-white opacity-40 block mb-1">Total a Transferir</span>
              <h2 className="text-4xl font-extrabold tracking-tighter text-solar-orange">${total.toLocaleString("es-CL")}</h2>
            </div>
          </div>

          <div className="card-industrial bg-white shadow-sm">
            <div className="p-6 border-b border-border-light">
              <h3 className="font-heading font-bold uppercase tracking-tight text-primary">Datos Bancarios</h3>
            </div>
            <div className="divide-y divide-border-light">
              {BANK_DETAILS.map((detail, i) => (
                <div key={detail.label} className={`flex items-center justify-between p-6 ${i % 2 !== 0 ? 'bg-industrial-gray' : ''}`}>
                  <div className="space-y-1">
                    <span className="label-tech opacity-40 block">{detail.label}</span>
                    <span className="font-sans font-bold text-lg text-primary">{detail.value}</span>
                  </div>
                  <button onClick={() => handleCopy(detail.value, detail.label)} className="p-3 hover:bg-white rounded-industrial transition-all active:scale-90">
                    <Copy className="w-5 h-5 opacity-40" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="card-industrial p-8 bg-white flex flex-col items-center text-center space-y-6">
            <span className="label-tech">Pago Rápido</span>
            <div className="w-48 h-48 bg-industrial-gray border border-border-light rounded-industrial p-4 flex items-center justify-center relative overflow-hidden group">
              <div className="w-full h-full bg-matte-black/5 grid grid-cols-5 gap-1">
                 {[...Array(25)].map((_, i) => (
                   <div key={i} className={`rounded-[1px] ${i % 3 === 0 ? 'bg-matte-black' : 'bg-transparent'}`} />
                 ))}
              </div>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Escanea con tu App Bancaria para cargar los datos.
            </p>
          </div>

          <div className="mt-auto space-y-4">
             <button onClick={shareWhatsApp} className="btn-secondary w-full justify-center h-16 group bg-[#25D366] border-none">
                <MessageSquare className="w-5 h-5 group-hover:rotate-12 transition-transform" /> Ya transferí, notificar
             </button>
             <p className="text-[10px] text-center font-mono opacity-40 uppercase tracking-widest leading-relaxed">
                Al notificar, validaremos tu transferencia de inmediato.
             </p>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {copied && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="fixed bottom-12 left-1/2 -translate-x-1/2 bg-matte-black text-white px-6 py-3 rounded-full flex items-center gap-3 label-tech shadow-2xl z-[100]">
            <CheckCircle2 className="w-4 h-4 text-solar-orange" /> {copied} copiado
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-24 flex justify-center">
        <Link to="/" className="flex items-center gap-2 label-tech hover:text-burgundy transition-colors">
          <ArrowLeft className="w-4 h-4" /> Volver al Inicio
        </Link>
      </div>
    </div>
  );
}
