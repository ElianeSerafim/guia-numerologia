/**
 * CouponManagement Component
 * Gerencia cupons de desconto
 */

import { useState } from 'react';
import { useSalesManagement } from '@/hooks/useSalesManagement';
import { Plus, Trash2, Lock, Unlock } from 'lucide-react';

export default function CouponManagement() {
  const { coupons, createCoupon, deleteCoupon, toggleCouponStatus } = useSalesManagement();
  const [showForm, setShowForm] = useState(false);
  const [formError, setFormError] = useState('');
  const [formData, setFormData] = useState({
    code: '',
    discountType: 'percentage' as 'percentage' | 'fixed',
    discountValue: 0,
    maxUses: 0,
    applicablePlans: [] as ('navigator' | 'visionary' | 'illuminated')[],
    expiryDate: '',
  });

  const handleCreateCoupon = () => {
    setFormError('');

    if (!formData.code.trim()) {
      setFormError('Código do cupom é obrigatório');
      return;
    }

    if (formData.discountValue <= 0) {
      setFormError('Valor do desconto deve ser maior que 0');
      return;
    }

    if (formData.maxUses <= 0) {
      setFormError('Número máximo de usos deve ser maior que 0');
      return;
    }

    if (formData.applicablePlans.length === 0) {
      setFormError('Selecione pelo menos um plano aplicável');
      return;
    }

    if (!formData.expiryDate) {
      setFormError('Data de expiração é obrigatória');
      return;
    }

    const success = createCoupon(
      formData.code,
      formData.discountType,
      formData.discountValue,
      formData.maxUses,
      formData.applicablePlans,
      formData.expiryDate,
      localStorage.getItem('numerology_user_email') || 'admin'
    );

    if (!success) {
      setFormError('Cupom com este código já existe');
      return;
    }

    setFormData({
      code: '',
      discountType: 'percentage',
      discountValue: 0,
      maxUses: 0,
      applicablePlans: [],
      expiryDate: '',
    });
    setShowForm(false);
  };

  const handleTogglePlan = (plan: 'navigator' | 'visionary' | 'illuminated') => {
    setFormData((prev) => ({
      ...prev,
      applicablePlans: prev.applicablePlans.includes(plan)
        ? prev.applicablePlans.filter((p) => p !== plan)
        : [...prev.applicablePlans, plan],
    }));
  };

  const getPlanLabel = (plan: string) => {
    switch (plan) {
      case 'navigator':
        return 'Navegador';
      case 'visionary':
        return 'Visionário';
      case 'illuminated':
        return 'Iluminado';
      default:
        return plan;
    }
  };

  const isExpired = (expiryDate: string) => new Date(expiryDate) < new Date();

  return (
    <div className="space-y-6">
      {/* Botão Criar Cupom */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-900">Gerenciar Cupons</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <Plus size={20} />
          Novo Cupom
        </button>
      </div>

      {/* Formulário de Criação */}
      {showForm && (
        <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Criar Novo Cupom</h3>

          {formError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
              {formError}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Código */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Código do Cupom
              </label>
              <input
                type="text"
                value={formData.code}
                onChange={(e) =>
                  setFormData({ ...formData, code: e.target.value.toUpperCase() })
                }
                placeholder="EX: DESCONTO20"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Tipo de Desconto */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Tipo de Desconto
              </label>
              <select
                value={formData.discountType}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    discountType: e.target.value as 'percentage' | 'fixed',
                  })
                }
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="percentage">Percentual (%)</option>
                <option value="fixed">Valor Fixo (R$)</option>
              </select>
            </div>

            {/* Valor do Desconto */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Valor do Desconto {formData.discountType === 'percentage' ? '(%)' : '(R$)'}
              </label>
              <input
                type="number"
                value={formData.discountValue}
                onChange={(e) =>
                  setFormData({ ...formData, discountValue: parseFloat(e.target.value) })
                }
                placeholder="0"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Máximo de Usos */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Máximo de Usos
              </label>
              <input
                type="number"
                value={formData.maxUses}
                onChange={(e) =>
                  setFormData({ ...formData, maxUses: parseInt(e.target.value) })
                }
                placeholder="0"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Data de Expiração */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Data de Expiração
              </label>
              <input
                type="date"
                value={formData.expiryDate}
                onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Planos Aplicáveis */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-slate-900 mb-3">
              Planos Aplicáveis
            </label>
            <div className="flex gap-4">
              {(['navigator', 'visionary', 'illuminated'] as const).map((plan) => (
                <label key={plan} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.applicablePlans.includes(plan)}
                    onChange={() => handleTogglePlan(plan)}
                    className="w-4 h-4 rounded border-slate-300"
                  />
                  <span className="text-slate-700">{getPlanLabel(plan)}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Botões */}
          <div className="flex gap-3">
            <button
              onClick={handleCreateCoupon}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Criar Cupom
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="px-4 py-2 bg-slate-300 text-slate-900 rounded-lg hover:bg-slate-400 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Lista de Cupons */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {coupons.length === 0 ? (
          <div className="p-8 text-center text-slate-600">
            Nenhum cupom criado ainda. Clique em "Novo Cupom" para começar.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left py-3 px-4 font-semibold text-slate-900">Código</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900">Desconto</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900">Usos</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900">Expiração</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900">Planos</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900">Ações</th>
                </tr>
              </thead>
              <tbody>
                {coupons.map((coupon) => (
                  <tr key={coupon.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-3 px-4 font-semibold text-slate-900">{coupon.code}</td>
                    <td className="py-3 px-4 text-slate-600">
                      {coupon.discountType === 'percentage'
                        ? `${coupon.discountValue}%`
                        : `R$ ${coupon.discountValue.toFixed(2)}`}
                    </td>
                    <td className="py-3 px-4 text-slate-600">
                      {coupon.usedCount} / {coupon.maxUses}
                    </td>
                    <td className="py-3 px-4 text-slate-600">
                      {new Date(coupon.expiryDate).toLocaleDateString('pt-BR')}
                      {isExpired(coupon.expiryDate) && (
                        <span className="ml-2 text-red-600 font-semibold">(Expirado)</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-slate-600 text-sm">
                      {coupon.applicablePlans.map((p) => getPlanLabel(p)).join(', ')}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          coupon.isActive
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {coupon.isActive ? 'Ativo' : 'Inativo'}
                      </span>
                    </td>
                    <td className="py-3 px-4 flex gap-2">
                      <button
                        onClick={() => toggleCouponStatus(coupon.id)}
                        className="p-2 hover:bg-slate-200 rounded-lg transition-colors"
                        title={coupon.isActive ? 'Desativar' : 'Ativar'}
                      >
                        {coupon.isActive ? (
                          <Lock size={18} className="text-slate-600" />
                        ) : (
                          <Unlock size={18} className="text-slate-600" />
                        )}
                      </button>
                      <button
                        onClick={() => deleteCoupon(coupon.id)}
                        className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                        title="Deletar"
                      >
                        <Trash2 size={18} className="text-red-600" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
