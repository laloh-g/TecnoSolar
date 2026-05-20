import { motion } from "motion/react";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function Contact() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-32">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-12"
        >
          <div className="space-y-4">
            <span className="label-tech">Contacto Directo</span>
            <h1 className="text-5xl md:text-7xl font-extrabold uppercase leading-[0.9] tracking-tighter text-primary">
              Hablemos de tu proyecto.
            </h1>
            <p className="text-lg text-on-surface-variant max-w-md leading-relaxed">
              Expertos en ingeniería fotovoltaica y herramientas industriales a tu disposición en Santa Cruz.
            </p>
          </div>

          <div className="space-y-6">
            {[
              { icon: MapPin, label: "Ubicación", value: "Ruta 90, Santa Cruz, Colchagua" },
              { icon: Phone, label: "Teléfono", value: "+56 9 1234 5678" },
              { icon: Mail, label: "Email", value: "contacto@tecnosolar.cl" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-6 p-6 card-industrial bg-white">
                <div className="w-12 h-12 bg-industrial-gray rounded-industrial flex items-center justify-center text-primary">
                  <item.icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="label-tech opacity-40">{item.label}</p>
                  <p className="font-sans font-bold text-lg text-primary">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="card-industrial bg-white p-8 md:p-12 shadow-sm"
        >
          <form action="https://api.web3forms.com/submit" method="POST" className="space-y-6">
            <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE" />
            
            <div className="space-y-4">
              <label className="label-tech block text-primary">Nombre Completo</label>
              <input 
                type="text" 
                name="name"
                required
                className="w-full bg-industrial-gray border-none rounded-industrial py-4 px-6 focus:ring-2 focus:ring-burgundy text-primary"
                placeholder="Juan Pérez"
              />
            </div>

            <div className="space-y-4">
              <label className="label-tech block text-primary">Email de Contacto</label>
              <input 
                type="email" 
                name="email"
                required
                className="w-full bg-industrial-gray border-none rounded-industrial py-4 px-6 focus:ring-2 focus:ring-burgundy text-primary"
                placeholder="juan@empresa.cl"
              />
            </div>

            <div className="space-y-4">
              <label className="label-tech block text-primary">Mensaje o Requerimiento</label>
              <textarea 
                name="message"
                required
                rows={4}
                className="w-full bg-industrial-gray border-none rounded-industrial py-4 px-6 focus:ring-2 focus:ring-burgundy text-primary"
                placeholder="Cuéntanos qué equipos necesitas..."
              />
            </div>

            <button type="submit" className="btn-secondary w-full justify-center h-16 group">
              Enviar Mensaje <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
