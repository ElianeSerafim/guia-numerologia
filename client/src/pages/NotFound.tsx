import { useLocation } from "wouter";
import { Home, AlertCircle } from "lucide-react";

/**
 * NotFound Page - 404
 * 
 * Design: Consistente com o design minimalista místico
 */

export default function NotFound() {
  const [, setLocation] = useLocation();

  const handleGoHome = () => {
    setLocation("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="flex justify-center">
          <div className="p-4 rounded-full bg-red-100">
            <AlertCircle size={48} className="text-red-600" />
          </div>
        </div>

        <h1 className="text-5xl font-bold text-white">404</h1>

        <h2 className="text-2xl font-semibold text-slate-700">
          Página Não Encontrada
        </h2>

        <p className="text-slate-600 leading-relaxed">
          Desculpe, a página que você está procurando não existe ou foi movida.
        </p>

        <button
          onClick={handleGoHome}
          className="inline-flex items-center gap-2 btn-mystical"
        >
          <Home size={18} />
          <span>Voltar ao Início</span>
        </button>
      </div>
    </div>
  );
}
