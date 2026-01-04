/**
 * Footer Component - Rodapé Elegante
 * 
 * Design: Minimalista místico com informações de contato e links
 */

import { useLocation } from 'wouter';
import { Mail, MessageCircle, Heart } from 'lucide-react';

export default function Footer() {
  const [, setLocation] = useLocation();
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { label: 'Início', href: '/app' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Planos', href: '/pricing' },
    { label: 'Histórico', href: '/history' },
  ];

  return (
    <footer className="bg-gradient-to-b from-slate-900 to-slate-950 text-slate-300 pt-16 pb-8">
      <div className="container">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg"></div>
              <span className="font-bold text-white">Bússola Numerológica</span>
            </div>
            <p className="text-sm text-slate-400">
              Descubra os mistérios do seu destino através da numerologia pitagórica.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Navegação</h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => setLocation(link.href)}
                    className="text-sm hover:text-indigo-400 transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-white mb-4">Recursos</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setLocation('/faq')}
                  className="text-sm hover:text-indigo-400 transition-colors"
                >
                  Aprenda Numerologia
                </button>
              </li>
              <li>
                <button
                  onClick={() => setLocation('/pricing')}
                  className="text-sm hover:text-indigo-400 transition-colors"
                >
                  Planos de Assinatura
                </button>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm hover:text-indigo-400 transition-colors"
                >
                  Termos de Serviço
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm hover:text-indigo-400 transition-colors"
                >
                  Política de Privacidade
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-4">Contato</h3>
            <div className="space-y-3">
              <a
                href="https://wa.me/5511999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm hover:text-indigo-400 transition-colors"
              >
                <MessageCircle size={16} />
                WhatsApp
              </a>
              <a
                href="mailto:contato@bussola-numerologica.com"
                className="flex items-center gap-2 text-sm hover:text-indigo-400 transition-colors"
              >
                <Mail size={16} />
                E-mail
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 my-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between text-sm text-slate-400">
          <p>
            © {currentYear} Bússola Numerológica. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-1 mt-4 md:mt-0">
            Feito com <Heart size={14} className="text-red-500" /> para sua evolução
          </div>
        </div>
      </div>
    </footer>
  );
}
