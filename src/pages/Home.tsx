import { Link } from "react-router-dom";
import { ArrowRight, Truck, Store, ShieldCheck, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";

export default function Home() {
  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-32">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 space-y-8"
          >
            <div className="inline-flex items-center gap-2 bg-industrial-gray border border-border-light px-3 py-1 rounded-industrial">
              <span className="w-2 h-2 rounded-full bg-solar-orange animate-pulse" />
              <span className="label-tech">Equipamiento Profesional</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold uppercase leading-[0.9] tracking-tighter max-w-2xl">
              Potencia que nace en el valle.
            </h1>
            <p className="text-lg text-on-surface-variant max-w-xl leading-relaxed">
              Herramientas inalámbricas y soluciones solares desde Santa Cruz para todo Chile. Ingeniería robusta diseñada para el campo y la industria vinícola.
            </p>
            <Link to="/tools" className="btn-primary inline-flex">
              Ver Catálogo <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
          
          <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.8, delay: 0.2 }}
             className="flex-1 w-full relative"
          >
            <div className="aspect-[4/3] rounded-container overflow-hidden group">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3Ao9S2qNl7BnkuQ9fM9NpDnN4bM5K-USQNdrnJK6GcsVq756bfj6YbAyXF44VC2q07ZxkC99TaYB9nKkCARpOvo7EmAMDFQwBAqDGgn8OqA9ZsZ_C8ov4xuwr0VVN115EWOff9Z-sYTku5oOcvBfPFaUdTH0m4sTu0DmgHfL5LeQzDGQQqfuT-yxXIXzy3g-pZIHBc9SRN9i8WM7ldXPvCtvuE84PjsyL7uUwQDpW1XKUNDpsm0oBI2XkrOh6Qu9gLqqDfY2lHJo" 
                alt="Herramienta Industrial" 
                data-alt="A highly detailed cinematic shot of a premium, robust black and neon orange cordless drill resting on a weathered wooden wine barrel. In the background, softly out of focus, are the sunlit vineyards of the Colchagua Valley, Chile."
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="bg-white border-y border-border-light py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Truck, title: "Despacho Rápido", desc: "A todo Chile garantizado." },
              { icon: Store, title: "Retiro en Santa Cruz", desc: "Directo en nuestra bodega central." },
              { icon: ShieldCheck, title: "Garantía Real", desc: "Soporte técnico especializado local." },
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-6 p-4 rounded-container hover:bg-industrial-gray transition-colors">
                <div className="w-12 h-12 bg-industrial-gray border border-border-light rounded-industrial flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-sans font-bold text-lg">{feature.title}</h3>
                  <p className="text-sm text-on-surface-variant">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bento Grid Featured */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-24 space-y-12">
        <div className="flex justify-between items-end">
          <div className="space-y-2">
            <h2 className="text-4xl font-extrabold uppercase tracking-tighter">Equipamiento Destacado</h2>
            <p className="text-on-surface-variant">Soluciones diseñadas para máxima exigencia industrial.</p>
          </div>
          <Link to="/tools" className="hidden sm:flex items-center gap-2 label-tech hover:text-solar-orange transition-colors">
            Ver Todo <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Large Card */}
          <Link to="/tools" className="md:col-span-2 group relative h-[500px] card-industrial flex flex-col md:flex-row">
            <div className="flex-1 p-10 flex flex-col justify-between z-10 bg-white/80 backdrop-blur-sm md:bg-transparent">
              <div className="space-y-4">
                <span className="label-tech text-secondary">Línea Industrial</span>
                <h3 className="text-3xl font-extrabold uppercase leading-tight">Herramientas Inalámbricas Pro</h3>
                <p className="text-sm text-on-surface-variant max-w-xs">Taladros, esmeriles y llaves de impacto de alto torque para trabajos pesados.</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-matte-black text-white flex items-center justify-center group-hover:bg-solar-orange group-hover:text-matte-black transition-all">
                <ArrowUpRight className="w-6 h-6" />
              </div>
            </div>
            <div className="flex-1 h-full overflow-hidden">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9BoqlOWoFGPdpG33grYfGXb7gsnDJXaJv2cNSrgxfJzsIK4rVd727G1ypLcptoEYiJX8YGj-RtPkVbOViUMUU-QvibgmApkkwsuivkZ7gtw8sj-WB6ZYz-Lu1W5DeX9MqZMKZd4KjOH4vh73u7ja5nnvCUGtZ0ghkxzinvTJwHd0MUMH4jW-KFX6Bq1D8WDUBYO6wl4FwT-loBE3abtnietXCtxtUhe-NUaKrR6cN4lUrTT7LBk8NxgeIEmK2qP-8d2kG09vah-0" 
                alt="Herramientas Pro" 
                data-alt="A meticulously arranged flat lay of professional cordless power tools, including a heavy-duty impact drill and an angle grinder, resting on a clean industrial workbench."
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          </Link>

          {/* Side Cards Stack */}
          <div className="space-y-6">
            <Link to="/tools" className="block h-[240px] card-industrial relative group p-8">
              <div className="relative z-10 space-y-2">
                <span className="label-tech">Eficiencia</span>
                <h3 className="text-xl font-extrabold uppercase">Focos Solares</h3>
              </div>
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBs1ynP6K7eFlQdooFY609A_JIAde5QQuI84MXmxnIezMnZdAaNcNH9L41MkFDKzqICRRVUEMBYD3QSuRQluHhXixEriVPTtWECiO_-DDaneA3RDrggeVDfUPr-geOry7QkpaXZICCsZh4IVRslW5mQeI6XBE0DdWNjvgb7ZQ1VaWa7f3NyDHBqHWCkzbxA7fj4HsmDaWJKsfp5VLrVV4uhnmbpjyq7KVO5MDkrfGi6OklORVCcTS4bDMqi792M9WEXhMJbJyl9Ttk" 
                alt="Solar" 
                data-alt="A sleek, modern solar-powered LED floodlight mounted against a clean white textured wall."
                className="absolute right-0 bottom-0 w-2/3 h-2/3 object-contain opacity-80 group-hover:scale-110 transition-transform duration-500"
              />
            </Link>
            
            <Link to="/tools" className="block h-[240px] card-industrial relative group p-8">
              <div className="relative z-10 space-y-2">
                <span className="label-tech">Seguridad</span>
                <h3 className="text-xl font-extrabold uppercase">Iluminación de Emergencia</h3>
              </div>
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1uWyysqvjchZ4E61MQdU246xtYux2Oy7jtXBBB88K--LmiRnQGn_0YATqegVkA3xYkfdNOEOmnBnQ-9fl7SFAcBxP0jZSYyUzYekFyJiSm2OLXBrhWb4ljRn7QKIY8xc-1iAYc3e4ThZx0pbLzjCBkr-1drMYlttLweT8Aw70dyqTMnF4Zk0QZguZGbeCShqudmengUfbjXxRWldWHvFyltwF6SyigoquZe4pPbbtVsPgjohSA5St0_lUlugV8ciyYneh7nN_7VM" 
                alt="Emergencia" 
                data-alt="A minimalist, rectangular emergency lighting unit designed for industrial spaces with a stark white casing."
                className="absolute right-0 bottom-0 w-2/3 h-2/3 object-contain opacity-80 group-hover:scale-110 transition-transform duration-500"
              />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
