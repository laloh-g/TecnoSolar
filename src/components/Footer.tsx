import { Link } from "react-router-dom";
import { Sun } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-industrial-gray border-t border-border-light pt-16 pb-8 md:pb-16 mt-auto">
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand Column */}
        <div className="md:col-span-2 space-y-6">
          <div className="flex items-center gap-2">
            <Sun className="w-6 h-6 text-burgundy" />
            <span className="font-headline font-extrabold text-xl uppercase tracking-tighter">
              TecnoSolar
            </span>
          </div>
          <p className="font-sans text-sm text-on-surface-variant max-w-sm leading-relaxed">
            Orgullosamente desde la VI Región - TecnoSolar Santa Cruz. Ingeniería de alto rendimiento para los desafíos del campo y la industria moderna. Todos los derechos reservados.
          </p>
        </div>

        {/* Links Column */}
        <div className="space-y-4">
          <h4 className="font-sans font-semibold text-primary">Compañía</h4>
          <ul className="space-y-2 text-sm text-on-surface-variant">
            <li><Link to="/tools" className="hover:text-primary transition-colors">Tienda Santa Cruz</Link></li>
            <li><Link to="/about-us" className="hover:text-primary transition-colors">Sobre Nosotros</Link></li>
            <li><Link to="#" className="hover:text-primary transition-colors">Casos de Éxito</Link></li>
          </ul>
        </div>

        {/* Support Column */}
        <div className="space-y-4">
          <h4 className="font-sans font-semibold text-primary">Soporte</h4>
          <ul className="space-y-2 text-sm text-on-surface-variant">
            <li><Link to="#" className="hover:text-primary transition-colors">Contacto</Link></li>
            <li><Link to="#" className="hover:text-primary transition-colors">Garantía</Link></li>
            <li><Link to="#" className="hover:text-primary transition-colors">Términos y Condiciones</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-16 pt-8 border-t border-border-light flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-on-surface-variant uppercase tracking-widest">
        <span>© 2024 TecnoSolar Santa Cruz</span>
        <div className="flex gap-8">
          <Link to="#" className="hover:text-primary">Políticas de Privacidad</Link>
          <Link to="#" className="hover:text-primary">Legales</Link>
        </div>
      </div>
    </footer>
  );
}
