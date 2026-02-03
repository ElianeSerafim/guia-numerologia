/**
 * CheckoutPagSeguro Component
 * Handles payment processing with PagSeguro
 * Supports: Pix, Credit/Debit Card, Boleto
 */

import { useState, useEffect } from 'react';
import { trpc } from '@/lib/trpc';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, AlertCircle, CheckCircle, CreditCard, Smartphone, FileText, Check, X, Eye, EyeOff } from 'lucide-react';
import { PLANS } from '@/types/payment';

interface CheckoutPagSeguroProps {
  planId: 'navigator' | 'visionary' | 'illuminated';
  planName: string;
  amount: number;
  email: string;
  name: string;
  onClose: () => void;
  onSuccess?: (orderId: string) => void;
  onError?: (error: string) => void;
}

export default function CheckoutPagSeguro({ planId, planName, amount, email: initialEmail, name: initialName, onClose, onSuccess, onError }: CheckoutPagSeguroProps) {
  const [email, setEmail] = useState(initialEmail);
  const [name, setName] = useState(initialName);
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'credit_card' | 'boleto'>('pix');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');

  // Address states
  const [cep, setCep] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [complement, setComplement] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [loadingCep, setLoadingCep] = useState(false);
  const [cepError, setCepError] = useState('');

  // Validation states
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
    passwordConfirm: false,
  });

  const [validation, setValidation] = useState({
    name: { isValid: false, message: '' },
    email: { isValid: false, message: '' },
    password: { isValid: false, message: '' },
    passwordConfirm: { isValid: false, message: '' },
  });

  // Password visibility states
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const plan = PLANS[planId as keyof typeof PLANS];
  const initiatePagSeguro = trpc.payment.initiatePagSeguro.useMutation();

  // Validation functions
  const validateName = (value: string) => {
    if (!value.trim()) {
      return { isValid: false, message: 'Nome é obrigatório' };
    }
    if (value.trim().length < 3) {
      return { isValid: false, message: 'Nome deve ter pelo menos 3 caracteres' };
    }
    return { isValid: true, message: '' };
  };

  const validateEmail = (value: string) => {
    if (!value.trim()) {
      return { isValid: false, message: 'E-mail é obrigatório' };
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return { isValid: false, message: 'E-mail inválido' };
    }
    return { isValid: true, message: '' };
  };

  const validatePassword = (value: string) => {
    if (!value) {
      return { isValid: false, message: 'Senha é obrigatória' };
    }
    if (value.length < 6) {
      return { isValid: false, message: 'Mínimo 6 caracteres' };
    }
    return { isValid: true, message: '' };
  };

  const validatePasswordConfirm = (value: string) => {
    if (!value) {
      return { isValid: false, message: 'Confirmação é obrigatória' };
    }
    if (value !== password) {
      return { isValid: false, message: 'Senhas não coincidem' };
    }
    return { isValid: true, message: '' };
  };

  // CEP lookup function
  const fetchAddressByCep = async (cepValue: string) => {
    // Remove non-numeric characters
    const cleanCep = cepValue.replace(/\D/g, '');
    
    // Validate CEP format (8 digits)
    if (cleanCep.length !== 8) {
      return;
    }

    setLoadingCep(true);
    setCepError('');

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
      const data = await response.json();

      if (data.erro) {
        setCepError('CEP não encontrado');
        return;
      }

      // Auto-fill address fields
      setStreet(data.logradouro || '');
      setNeighborhood(data.bairro || '');
      setCity(data.localidade || '');
      setState(data.uf || '');
    } catch (error) {
      setCepError('Erro ao buscar CEP');
    } finally {
      setLoadingCep(false);
    }
  };

  // Debounced CEP lookup
  useEffect(() => {
    const timer = setTimeout(() => {
      if (cep) {
        fetchAddressByCep(cep);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [cep]);

  // Real-time validation
  useEffect(() => {
    if (touched.name) {
      setValidation(prev => ({ ...prev, name: validateName(name) }));
    }
  }, [name, touched.name]);

  useEffect(() => {
    if (touched.email) {
      setValidation(prev => ({ ...prev, email: validateEmail(email) }));
    }
  }, [email, touched.email]);

  useEffect(() => {
    if (touched.password) {
      setValidation(prev => ({ ...prev, password: validatePassword(password) }));
    }
  }, [password, touched.password]);

  useEffect(() => {
    if (touched.passwordConfirm) {
      setValidation(prev => ({ ...prev, passwordConfirm: validatePasswordConfirm(passwordConfirm) }));
    }
  }, [passwordConfirm, password, touched.passwordConfirm]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Validate inputs
      if (!email || !name) {
        throw new Error('Por favor, preencha todos os campos');
      }

      if (!password || password.length < 6) {
        throw new Error('Senha deve ter pelo menos 6 caracteres');
      }

      if (password !== passwordConfirm) {
        throw new Error('As senhas não coincidem');
      }

      // Validate address fields
      if (!cep || !street || !number || !neighborhood || !city || !state) {
        throw new Error('Por favor, preencha todos os campos de endereço');
      }

      // Call tRPC mutation to initiate payment
      const response = await initiatePagSeguro.mutateAsync({
        email,
        name,
        password,
        planId,
        planName: plan.name,
        amount: plan.price,
        paymentMethod,
        address: {
          cep,
          street,
          number,
          complement,
          neighborhood,
          city,
          state,
        },
      });

      if (response.success && response.paymentLink) {
        setOrderId(response.orderId);
        setSuccess(true);
        onSuccess?.(response.orderId);

        // Redirect to PagSeguro payment page after 2 seconds
        setTimeout(() => {
          window.location.href = response.paymentLink;
        }, 2000);
      } else {
        throw new Error('Falha ao iniciar pagamento');
      }
    } catch (err) {
      // Log detalhado do erro para debug
      console.error('❌ ERRO DETALHADO NO CHECKOUT:', {
        error: err,
        message: err instanceof Error ? err.message : 'Erro desconhecido',
        stack: err instanceof Error ? err.stack : undefined,
        data: {
          email,
          name,
          planId,
          paymentMethod,
          hasPassword: !!password,
          hasAddress: !!(cep && street && number),
        },
      });

      // Extrair mensagem de erro detalhada
      let errorMessage = 'Erro ao processar pagamento';
      
      if (err instanceof Error) {
        errorMessage = err.message;
        
        // Se for erro do tRPC, tentar extrair detalhes
        if ('data' in err && err.data && typeof err.data === 'object') {
          const trpcError = err.data as any;
          if (trpcError.message) {
            errorMessage = trpcError.message;
          }
          if (trpcError.code) {
            errorMessage += ` (Código: ${trpcError.code})`;
          }
          console.error('🔍 Detalhes do erro tRPC:', trpcError);
        }
      }

      setError(errorMessage);
      onError?.(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <Card className="w-full max-w-sm mx-auto">
        <CardContent className="pt-8 pb-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-green-100 rounded-full animate-pulse" />
              <CheckCircle className="relative h-16 w-16 text-green-500" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-white mb-2">Pagamento Iniciado!</h2>
          <p className="text-white/80 mb-4">
            Você será redirecionado para completar o pagamento em breve...
          </p>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-green-700">
              <strong>ID do Pedido:</strong> {orderId}
            </p>
            <p className="text-sm text-green-700 mt-2">
              Método de Pagamento: <strong>{getPaymentMethodLabel(paymentMethod)}</strong>
            </p>
          </div>

          <Button
            onClick={() => window.location.href = '/pricing'}
            variant="outline"
            className="w-full"
          >
            Voltar aos Planos
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-sm mx-auto my-4 px-2">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Checkout - {plan.name}</CardTitle>
        <CardDescription>
          Escolha seu método de pagamento preferido
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3 px-3 pb-4">
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Plan Summary */}
          <div className="bg-gradient-to-br from-[#0A1F2E] to-[#1A3A4A] rounded-lg p-3 text-white">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-[#19E6FF]">Plano</span>
              <span className="font-bold text-[#00FFFF]">{plan.name}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-[#19E6FF]">Mapas Inclusos</span>
              <span className="font-bold text-white">{plan.mapsLimit}</span>
            </div>
            <div className="border-t border-[#1A3A4A] pt-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#19E6FF]">Valor Total</span>
                <span className="text-xl font-bold text-[#00FFFF]">
                  R$ {plan.price.toFixed(2).replace('.', ',')}
                </span>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-semibold text-white mb-1.5">
                Nome Completo
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onBlur={() => setTouched(prev => ({ ...prev, name: true }))}
                  placeholder="Seu nome completo"
                  className={`w-full px-3 py-2 pr-10 text-sm border rounded-lg focus:outline-none focus:ring-2 text-white bg-slate-800 ${
                    touched.name
                      ? validation.name.isValid
                        ? 'border-green-500 focus:ring-green-500'
                        : 'border-red-500 focus:ring-red-500'
                      : 'border-slate-200 focus:ring-indigo-500'
                  }`}
                  disabled={isLoading}
                />
                {touched.name && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    {validation.name.isValid ? (
                      <Check size={18} className="text-green-500" />
                    ) : (
                      <X size={18} className="text-red-500" />
                    )}
                  </div>
                )}
              </div>
              {touched.name && !validation.name.isValid && (
                <p className="text-xs text-red-400 mt-1">{validation.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-1.5">
                E-mail
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setTouched(prev => ({ ...prev, email: true }))}
                  placeholder="seu@email.com"
                  className={`w-full px-3 py-2 pr-10 text-sm border rounded-lg focus:outline-none focus:ring-2 text-white bg-slate-800 ${
                    touched.email
                      ? validation.email.isValid
                        ? 'border-green-500 focus:ring-green-500'
                        : 'border-red-500 focus:ring-red-500'
                      : 'border-slate-200 focus:ring-indigo-500'
                  }`}
                  disabled={isLoading}
                />
                {touched.email && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    {validation.email.isValid ? (
                      <Check size={18} className="text-green-500" />
                    ) : (
                      <X size={18} className="text-red-500" />
                    )}
                  </div>
                )}
              </div>
              {touched.email && !validation.email.isValid && (
                <p className="text-xs text-red-400 mt-1">{validation.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-1.5">
                Senha
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => setTouched(prev => ({ ...prev, password: true }))}
                  placeholder="Mínimo 6 caracteres"
                  className={`w-full px-3 py-2 pr-20 text-sm border rounded-lg focus:outline-none focus:ring-2 text-white bg-slate-800 ${
                    touched.password
                      ? validation.password.isValid
                        ? 'border-green-500 focus:ring-green-500'
                        : 'border-red-500 focus:ring-red-500'
                      : 'border-slate-200 focus:ring-indigo-500'
                  }`}
                  disabled={isLoading}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-slate-400 hover:text-white transition-colors"
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                  {touched.password && (
                    <div>
                      {validation.password.isValid ? (
                        <Check size={18} className="text-green-500" />
                      ) : (
                        <X size={18} className="text-red-500" />
                      )}
                    </div>
                  )}
                </div>
              </div>
              {touched.password && !validation.password.isValid && (
                <p className="text-xs text-red-400 mt-1">{validation.password.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-1.5">
                Confirmar Senha
              </label>
              <div className="relative">
                <input
                  type={showPasswordConfirm ? 'text' : 'password'}
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  onBlur={() => setTouched(prev => ({ ...prev, passwordConfirm: true }))}
                  placeholder="Confirme sua senha"
                  className={`w-full px-3 py-2 pr-20 text-sm border rounded-lg focus:outline-none focus:ring-2 text-white bg-slate-800 ${
                    touched.passwordConfirm
                      ? validation.passwordConfirm.isValid
                        ? 'border-green-500 focus:ring-green-500'
                        : 'border-red-500 focus:ring-red-500'
                      : 'border-slate-200 focus:ring-indigo-500'
                  }`}
                  disabled={isLoading}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                    className="text-slate-400 hover:text-white transition-colors"
                    disabled={isLoading}
                  >
                    {showPasswordConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                  {touched.passwordConfirm && (
                    <div>
                      {validation.passwordConfirm.isValid ? (
                        <Check size={18} className="text-green-500" />
                      ) : (
                        <X size={18} className="text-red-500" />
                      )}
                    </div>
                  )}
                </div>
              </div>
              {touched.passwordConfirm && !validation.passwordConfirm.isValid && (
                <p className="text-xs text-red-400 mt-1">{validation.passwordConfirm.message}</p>
              )}
            </div>
          </div>

          {/* Address Section */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white mb-2">Endereço de Cobrança</h3>
            
            <div className="grid grid-cols-2 gap-3">
              {/* CEP */}
              <div>
                <label className="block text-sm font-semibold text-white mb-1.5">
                  CEP
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={cep}
                    onChange={(e) => setCep(e.target.value)}
                    placeholder="00000-000"
                    maxLength={9}
                    className="w-full px-3 py-2 pr-10 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white bg-slate-800"
                    disabled={isLoading}
                  />
                  {loadingCep && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <Loader2 size={18} className="text-indigo-500 animate-spin" />
                    </div>
                  )}
                </div>
                {cepError && (
                  <p className="text-xs text-red-400 mt-1">{cepError}</p>
                )}
              </div>

              {/* Número */}
              <div>
                <label className="block text-sm font-semibold text-white mb-1.5">
                  Número
                </label>
                <input
                  type="text"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  placeholder="123"
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white bg-slate-800"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Rua */}
            <div>
              <label className="block text-sm font-semibold text-white mb-1.5">
                Rua
              </label>
              <input
                type="text"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                placeholder="Nome da rua"
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white bg-slate-800"
                disabled={isLoading}
              />
            </div>

            {/* Complemento */}
            <div>
              <label className="block text-sm font-semibold text-white mb-1.5">
                Complemento (Opcional)
              </label>
              <input
                type="text"
                value={complement}
                onChange={(e) => setComplement(e.target.value)}
                placeholder="Apto, bloco, etc."
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white bg-slate-800"
                disabled={isLoading}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              {/* Bairro */}
              <div>
                <label className="block text-sm font-semibold text-white mb-1.5">
                  Bairro
                </label>
                <input
                  type="text"
                  value={neighborhood}
                  onChange={(e) => setNeighborhood(e.target.value)}
                  placeholder="Bairro"
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white bg-slate-800"
                  disabled={isLoading}
                />
              </div>

              {/* Cidade */}
              <div>
                <label className="block text-sm font-semibold text-white mb-1.5">
                  Cidade
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Cidade"
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white bg-slate-800"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Estado */}
            <div>
              <label className="block text-sm font-semibold text-white mb-1.5">
                Estado
              </label>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder="UF"
                maxLength={2}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white bg-slate-800"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Payment Method Selection */}
          <div>
            <label className="block text-sm font-semibold text-white mb-2">
              Método de Pagamento
            </label>

            <div className="space-y-2">
              {/* Pix Option */}
              <label className="flex items-center p-3 border-2 border-slate-200 rounded-lg cursor-pointer hover:border-indigo-500 transition-colors"
                style={{
                  borderColor: paymentMethod === 'pix' ? '#00FFFF' : '#E2E8F0',
                  backgroundColor: paymentMethod === 'pix' ? '#0A1F2E' : 'transparent',
                }}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="pix"
                  checked={paymentMethod === 'pix'}
                  onChange={(e) => setPaymentMethod(e.target.value as 'pix' | 'credit_card' | 'boleto')}
                  className="w-4 h-4"
                  disabled={isLoading}
                />
                <Smartphone size={18} className="ml-3" style={{ color: paymentMethod === 'pix' ? '#00FFFF' : '#6366F1' }} />
                <div className="ml-3">
                  <p className="font-semibold" style={{ color: paymentMethod === 'pix' ? '#00FFFF' : '#FFFFFF' }}>Pix</p>
                  <p className="text-xs" style={{ color: paymentMethod === 'pix' ? '#19E6FF' : 'rgba(255,255,255,0.8)' }}>Instantâneo</p>
                </div>
              </label>

              {/* Credit Card Option */}
              <label className="flex items-center p-3 border-2 border-slate-200 rounded-lg cursor-pointer hover:border-indigo-500 transition-colors"
                style={{
                  borderColor: paymentMethod === 'credit_card' ? '#00FFFF' : '#E2E8F0',
                  backgroundColor: paymentMethod === 'credit_card' ? '#0A1F2E' : 'transparent',
                }}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="credit_card"
                  checked={paymentMethod === 'credit_card'}
                  onChange={(e) => setPaymentMethod(e.target.value as 'pix' | 'credit_card' | 'boleto')}
                  className="w-4 h-4"
                  disabled={isLoading}
                />
                <CreditCard size={18} className="ml-3" style={{ color: paymentMethod === 'credit_card' ? '#00FFFF' : '#6366F1' }} />
                <div className="ml-3">
                  <p className="font-semibold" style={{ color: paymentMethod === 'credit_card' ? '#00FFFF' : '#FFFFFF' }}>Cartão de Crédito/Débito</p>
                  <p className="text-xs" style={{ color: paymentMethod === 'credit_card' ? '#19E6FF' : 'rgba(255,255,255,0.8)' }}>Visa, Mastercard, Elo</p>
                </div>
              </label>

              {/* Boleto Option */}
              <label className="flex items-center p-3 border-2 border-slate-200 rounded-lg cursor-pointer hover:border-indigo-500 transition-colors"
                style={{
                  borderColor: paymentMethod === 'boleto' ? '#00FFFF' : '#E2E8F0',
                  backgroundColor: paymentMethod === 'boleto' ? '#0A1F2E' : 'transparent',
                }}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="boleto"
                  checked={paymentMethod === 'boleto'}
                  onChange={(e) => setPaymentMethod(e.target.value as 'pix' | 'credit_card' | 'boleto')}
                  className="w-4 h-4"
                  disabled={isLoading}
                />
                <FileText size={18} className="ml-3" style={{ color: paymentMethod === 'boleto' ? '#00FFFF' : '#6366F1' }} />
                <div className="ml-3">
                  <p className="font-semibold" style={{ color: paymentMethod === 'boleto' ? '#00FFFF' : '#FFFFFF' }}>Boleto Bancário</p>
                  <p className="text-xs" style={{ color: paymentMethod === 'boleto' ? '#19E6FF' : 'rgba(255,255,255,0.8)' }}>Vencimento em 3 dias</p>
                </div>
              </label>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
                <div className="flex-1">
                  <p className="font-semibold text-red-900">Erro</p>
                  <p className="text-sm text-red-700 mt-1">{error}</p>
                  <details className="mt-3">
                    <summary className="text-xs text-red-600 cursor-pointer hover:underline">
                      Ver detalhes técnicos (para suporte)
                    </summary>
                    <div className="mt-2 p-3 bg-red-100 rounded text-xs font-mono text-red-900 overflow-auto max-h-40">
                      <p><strong>Abra o Console do Navegador (F12)</strong> para ver logs detalhados</p>
                      <p className="mt-1">Ou tire um print desta tela e envie para suporte</p>
                    </div>
                  </details>
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading || !email || !name}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 font-semibold"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processando...
              </>
            ) : (
              `Pagar R$ ${plan.price.toFixed(2).replace('.', ',')}`
            )}
          </Button>

          {/* Guarantee Badge */}
          <div className="text-center pt-4 border-t border-slate-200">
            <p className="text-xs text-white/80">
              ✓ Garantia de Satisfação de 7 dias
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

/**
 * Helper function to get payment method label
 */
function getPaymentMethodLabel(method: string): string {
  const labels: Record<string, string> = {
    pix: 'Pix',
    credit_card: 'Cartão de Crédito/Débito',
    boleto: 'Boleto Bancário',
  };
  return labels[method] || 'Desconhecido';
}
