import { useState, useEffect } from 'react';
import { useLocation, Link } from 'wouter';
import { Compass, ArrowRight, AlertCircle, CheckCircle, Lock, Eye, EyeOff } from 'lucide-react';
import { trpc } from '@/lib/trpc';

/**
 * ResetPassword Page - Página de Redefinição de Senha
 * 
 * Design: Elegante e místico
 * - Formulário de nova senha
 * - Validação de token
 * - Feedback visual claro
 */

export default function ResetPassword() {
  const [, setLocation] = useLocation();
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isValidating, setIsValidating] = useState(true);
  const [email, setEmail] = useState('');

  const validateToken = trpc.passwordReset.validateToken.useQuery(
    { token },
    { enabled: !!token, retry: false }
  );

  const resetPassword = trpc.passwordReset.reset.useMutation();

  // Extract token from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tokenParam = params.get('token');
    
    if (tokenParam) {
      setToken(tokenParam);
    } else {
      setError('Token não encontrado na URL');
      setIsValidating(false);
    }
  }, []);

  // Validate token
  useEffect(() => {
    if (validateToken.data) {
      setEmail(validateToken.data.email);
      setIsValidating(false);
    } else if (validateToken.error) {
      setError(validateToken.error.message || 'Token inválido ou expirado');
      setIsValidating(false);
    }
  }, [validateToken.data, validateToken.error]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!password.trim()) {
      setError('Por favor, insira uma senha');
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('A senha deve ter no mínimo 6 caracteres');
      setIsLoading(false);
      return;
    }

    if (password !== passwordConfirm) {
      setError('As senhas não coincidem');
      setIsLoading(false);
      return;
    }

    try {
      await resetPassword.mutateAsync({ token, newPassword: password });
      setSuccess(true);
      setPassword('');
      setPasswordConfirm('');
      setIsLoading(false);
      
      // Redirecionar para login após 3 segundos
      setTimeout(() => {
        setLocation('/auth');
      }, 3000);
    } catch (err: any) {
      setError(err.message || 'Erro ao redefinir senha. Tente novamente.');
      setIsLoading(false);
    }
  };

  if (isValidating) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 rounded-full border-4 border-slate-200 border-t-indigo-600 animate-spin mx-auto"></div>
          <p className="text-slate-600">Validando token...</p>
        </div>
      </div>
    );
  }

  if (error && !token) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md card-mystical space-y-6 text-center">
          <div className="flex justify-center">
            <div className="p-4 rounded-full bg-red-50">
              <AlertCircle size={48} className="text-red-600" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-slate-900">{error}</h2>
          
          <Link href="/forgot-password">
            <a className="inline-flex items-center gap-2 btn-mystical">
              <span>Solicitar Novo Link</span>
              <ArrowRight size={18} />
            </a>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-4 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-700">
              <Compass size={32} className="text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Portal Numerologia</h1>
          <p className="text-slate-600">Redefina sua senha</p>
        </div>

        {/* Reset Form */}
        {!success ? (
          <form onSubmit={handleSubmit} className="card-mystical space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">Nova Senha</h2>
            
            <p className="text-slate-600 text-sm">
              Crie uma nova senha para sua conta <span className="font-semibold text-indigo-600">{email}</span>
            </p>

            {/* Password Input */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-semibold text-slate-900">
                Nova Senha
              </label>
              <div className="relative">
                <Lock size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError('');
                  }}
                  placeholder="Mínimo 6 caracteres"
                  disabled={isLoading}
                  className="w-full pl-12 pr-12 py-3 rounded-lg border-2 border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Password Confirm Input */}
            <div className="space-y-2">
              <label htmlFor="passwordConfirm" className="block text-sm font-semibold text-slate-900">
                Confirmar Senha
              </label>
              <div className="relative">
                <Lock size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  id="passwordConfirm"
                  type={showPasswordConfirm ? 'text' : 'password'}
                  value={passwordConfirm}
                  onChange={(e) => {
                    setPasswordConfirm(e.target.value);
                    setError('');
                  }}
                  placeholder="Digite a senha novamente"
                  disabled={isLoading}
                  className="w-full pl-12 pr-12 py-3 rounded-lg border-2 border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPasswordConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-200">
                <AlertCircle size={16} className="text-red-600 flex-shrink-0" />
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-mystical flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                  <span>Redefinindo...</span>
                </>
              ) : (
                <>
                  <span>Redefinir Senha</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            {/* Back to Login */}
            <div className="text-center">
              <Link href="/auth">
                <a className="text-sm text-indigo-600 hover:text-indigo-700 font-semibold">
                  ← Voltar ao Login
                </a>
              </Link>
            </div>
          </form>
        ) : (
          /* Success Message */
          <div className="card-mystical space-y-6">
            <div className="flex justify-center">
              <div className="p-4 rounded-full bg-green-50">
                <CheckCircle size={48} className="text-green-600" />
              </div>
            </div>

            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-slate-900">Senha Redefinida!</h2>
              <p className="text-slate-600">
                Sua senha foi alterada com sucesso. Agora você pode fazer login com sua nova senha.
              </p>
            </div>

            <div className="bg-indigo-50 rounded-lg p-4 space-y-2">
              <p className="text-sm font-semibold text-indigo-900">
                ✓ Sucesso
              </p>
              <p className="text-xs text-indigo-700">
                Você será redirecionado para a página de login em alguns segundos.
              </p>
            </div>

            <Link href="/auth">
              <a className="block text-center text-sm text-indigo-600 hover:text-indigo-700 font-semibold">
                Clique aqui se não for redirecionado
              </a>
            </Link>
          </div>
        )}

        {/* Footer Links */}
        <div className="text-center">
          <button
            onClick={() => setLocation('/')}
            className="text-sm text-indigo-600 hover:text-indigo-700 font-semibold"
          >
            ← Voltar ao Início
          </button>
        </div>
      </div>
    </div>
  );
}
