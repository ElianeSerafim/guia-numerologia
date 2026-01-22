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
    { label: 'A Numerológa', href: '/about' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Planos', href: '/pricing' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#07131B]/90 backdrop-blur-md border-b border-[#19E6FF]/50'
          : 'bg-transparent'
      }`}
    >
      <div className="container flex items-center justify-between py-4">
        {/* Logo */}
        <button
          onClick={() => setLocation('/app')}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <img src="/logo-hexagon.png" alt="Portal Numerologia" className="w-10 h-10" />
          <span className="font-bold text-lg text-[#00FFFF] hidden sm:inline">
            Portal
          </span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => setLocation(item.href)}
              className="text-[#00FFFF] hover:text-[#19E6FF] transition-colors font-medium"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => setLocation('/app')}
            className="px-6 py-2 border-2 border-[#00FFFF] text-[#00FFFF] rounded-lg font-semibold hover:bg-[#00FFFF]/10 transition-colors"
          >
            Entrar
          </button>
          <button
            onClick={() => setLocation('/pricing')}
            className="px-6 py-2 bg-gradient-to-r from-[#00FFFF] to-[#19E6FF] text-[#07131B] rounded-lg font-semibold hover:shadow-lg shadow-[#00FFFF]/30 transition-shadow"
          >
            Começar Agora
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-[#19E6FF]"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <nav className="md:hidden bg-[#07131B] border-b border-[#1A3A4A]">
          <div className="container py-4 space-y-3">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  setLocation(item.href);
                  setIsOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-[#19E6FF] hover:bg-[#0A1F2E] rounded-lg transition-colors"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => {
                setLocation('/app');
                setIsOpen(false);
              }}
              className="w-full px-4 py-2 border-2 border-[#19E6FF] text-[#19E6FF] rounded-lg font-semibold"
            >
              Entrar
            </button>
            <button
              onClick={() => {
                setLocation('/pricing');
                setIsOpen(false);
              }}
              className="w-full px-4 py-2 bg-gradient-to-r from-[#00FFFF] to-[#19E6FF] text-white rounded-lg font-semibold"
            >
              Começar Agora
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
