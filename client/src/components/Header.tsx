/**
 * Header Component - Cabeçalho Transparente
 * 
 * Design: Minimalista místico com fundo transparente
 * - Logo e navegação
 * - Links para FAQ e Pricing
 * - Efeito blur ao scroll
 */

import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Menu, X, Sparkles } from 'lucide-react';

export default function Header() {
  const [, setLocation] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'FAQ', href: '/faq' },
    { label: 'Planos', href: '/pricing' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-md border-b border-slate-200/50'
          : 'bg-transparent'
      }`}
    >
      <div className="container flex items-center justify-between py-4">
        {/* Logo */}
        <button
          onClick={() => setLocation('/app')}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-lg flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <span className="font-bold text-lg text-white hidden sm:inline">
            Bússola
          </span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => setLocation(item.href)}
              className="text-slate-700 hover:text-indigo-600 transition-colors font-medium"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => setLocation('/app')}
            className="px-6 py-2 border-2 border-indigo-600 text-indigo-600 rounded-lg font-semibold hover:bg-indigo-50 transition-colors"
          >
            Entrar
          </button>
          <button
            onClick={() => setLocation('/pricing')}
            className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-700 text-white rounded-lg font-semibold hover:shadow-lg transition-shadow"
          >
            Começar Agora
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <nav className="md:hidden bg-white border-b border-slate-200">
          <div className="container py-4 space-y-3">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  setLocation(item.href);
                  setIsOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => {
                setLocation('/app');
                setIsOpen(false);
              }}
              className="w-full px-4 py-2 border-2 border-indigo-600 text-indigo-600 rounded-lg font-semibold"
            >
              Entrar
            </button>
            <button
              onClick={() => {
                setLocation('/pricing');
                setIsOpen(false);
              }}
              className="w-full px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-700 text-white rounded-lg font-semibold"
            >
              Começar Agora
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
