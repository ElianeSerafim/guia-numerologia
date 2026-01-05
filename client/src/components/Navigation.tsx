import { Link } from 'wouter';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

/**
 * Navigation Component
 * 
 * Barra de navegação elegante com links para:
 * - Home
 * - FAQ/Educação
 * - Preços
 * - Login
 */

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Início' },
    { href: '/faq', label: 'Aprenda' },
    { href: '/pricing', label: 'Planos' },
  ];

  return (
    <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="container flex items-center justify-between py-4">
        {/* Logo */}
        <Link href="/">
          <a className="flex items-center gap-2 font-bold text-xl text-white hover:text-indigo-600 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center">
              <span className="text-white font-bold">◯</span>
            </div>
            <span>Bússola</span>
          </a>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <a className="text-slate-700 hover:text-indigo-600 font-medium transition-colors">
                {link.label}
              </a>
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden md:block">
          <Link href="/auth">
            <a className="px-6 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-700 text-white font-medium hover:shadow-lg transition-all">
              Entrar
            </a>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <div className="container py-4 space-y-3">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <a
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-2 text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors"
                >
                  {link.label}
                </a>
              </Link>
            ))}
            <Link href="/auth">
              <a
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-700 text-white font-medium text-center"
              >
                Entrar
              </a>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
