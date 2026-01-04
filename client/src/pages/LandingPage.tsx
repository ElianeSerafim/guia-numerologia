/**
 * Landing Page - Página de Vendas Completa
 * 
 * Design: Minimalista místico com:
 * - Header transparente com navegação
 * - Hero section com CTA
 * - Seção de benefícios e entrega
 * - FAQ integrada
 * - Footer elegante
 */

import { useLocation } from 'wouter';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LifePathCalculator from '@/components/LifePathCalculator';
import { Check, Zap, Gift, Clock, Shield, Star, ChevronDown } from 'lucide-react';
import { useState } from 'react';

const faqItems = [
  {
    question: 'O que é numerologia pitagórica?',
    answer:
      'A numerologia pitagórica é um sistema ancestral que estuda a vibração dos números e sua influência na vida humana. Cada número possui uma essência única que revela aspectos profundos sobre personalidade, destino e potencial de evolução.',
  },
  {
    question: 'Como funciona o cálculo do mapa numerológico?',
    answer:
      'O mapa numerológico é calculado através de técnicas específicas que reduzem sua data de nascimento e nome completo a números de 1 a 9. Cada número revelado oferece interpretações detalhadas sobre diferentes aspectos de sua vida.',
  },
  {
    question: 'Preciso acreditar em numerologia para usar?',
    answer:
      'Não é necessário acreditar previamente. A numerologia é uma ferramenta de autoconhecimento que oferece perspectivas valiosas independentemente de crenças pessoais. Muitos a utilizam como guia para reflexão e tomada de decisões.',
  },
  {
    question: 'Posso gerar múltiplos mapas?',
    answer:
      'Sim! Dependendo do plano escolhido, você pode gerar de 2 a 10 mapas numerológicos. Isso permite explorar diferentes aspectos, comparar evolução ao longo do tempo ou analisar compatibilidade com outras pessoas.',
  },
  {
    question: 'Os dados são seguros?',
    answer:
      'Sim, todos os dados são processados localmente no seu navegador e nunca são armazenados em servidores. Sua privacidade e segurança são prioridades absolutas.',
  },
  {
    question: 'Posso exportar meu mapa em PDF?',
    answer:
      'Sim! Você pode baixar seu mapa numerológico completo em PDF de alta qualidade, incluindo todas as interpretações e previsões anuais.',
  },
];

const benefits = [
  {
    icon: Zap,
    title: 'Autoconhecimento Profundo',
    description:
      'Descubra aspectos ocultos de sua personalidade e potencial através de interpretações detalhadas.',
  },
  {
    icon: Gift,
    title: 'Previsões Anuais',
    description:
      'Receba insights sobre os ciclos de vida e previsões para o ano, incluindo oportunidades e desafios.',
  },
  {
    icon: Clock,
    title: 'Acesso Imediato',
    description:
      'Comece a explorar sua numerologia instantaneamente após a aprovação, sem esperas ou complicações.',
  },
  {
    icon: Shield,
    title: 'Dados 100% Privados',
    description:
      'Todos os cálculos são feitos localmente. Seus dados nunca são armazenados em servidores.',
  },
  {
    icon: Star,
    title: 'Histórico Completo',
    description:
      'Salve e compare múltiplos mapas para acompanhar sua evolução ao longo do tempo.',
  },
  {
    icon: Check,
    title: 'Exportação em PDF',
    description:
      'Baixe seus mapas em PDF de alta qualidade para compartilhar ou guardar como referência.',
  },
];

export default function LandingPage() {
  const [, setLocation] = useLocation();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900">
              Descubra os Mistérios do Seu{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-700">
                Destino
              </span>
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Explore a numerologia pitagórica e desbloqueie insights profundos sobre sua vida,
              personalidade e futuro através de cálculos precisos e interpretações detalhadas.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <button
              onClick={() => setLocation('/pricing')}
              className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-700 text-white rounded-lg font-semibold hover:shadow-xl transition-shadow text-lg"
            >
              Ver Planos →
            </button>
            <button
              onClick={() => setLocation('/faq')}
              className="px-8 py-4 border-2 border-slate-300 text-slate-900 rounded-lg font-semibold hover:border-indigo-600 hover:text-indigo-600 transition-colors text-lg"
            >
              Saiba Mais
            </button>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-6 pt-8 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <Shield size={18} className="text-green-600" />
              <span>100% Seguro e Privado</span>
            </div>
            <div className="flex items-center gap-2">
              <Check size={18} className="text-green-600" />
              <span>Acesso Imediato</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap size={18} className="text-green-600" />
              <span>Cálculos Precisos</span>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Por Que Escolher Nossa Plataforma?
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Oferecemos a experiência mais completa em numerologia pitagórica com tecnologia
              avançada e interpretações profundas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={index}
                  className="p-8 bg-white rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition-all"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">{benefit.title}</h3>
                  <p className="text-slate-600">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Life Path Calculator Section */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Teste Gratuitamente</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Descubra seu Numero do Caminho de Vida com nossa calculadora gratuita. Uma amostra
              do poder da numerologia pitagorica.
            </p>
          </div>

          <div className="flex justify-center">
            <LifePathCalculator />
          </div>
        </div>
      </section>

      {/* Delivery Section */}
      <section className="py-20">
        <div className="container max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Como Funciona</h2>
            <p className="text-xl text-slate-600">
              Processo simples e rápido para começar sua jornada de autoconhecimento
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                step: 1,
                title: 'Escolha um Plano',
                description: 'Selecione o plano que melhor se adequa às suas necessidades',
              },
              {
                step: 2,
                title: 'Contate via WhatsApp',
                description: 'Será redirecionado para confirmar sua compra por WhatsApp',
              },
              {
                step: 3,
                title: 'Receba Confirmação',
                description: 'Você receberá um e-mail de confirmação com os detalhes',
              },
              {
                step: 4,
                title: 'Acesso Liberado',
                description: 'Após aprovação, seu acesso será liberado automaticamente',
              },
              {
                step: 5,
                title: 'Gere Seus Mapas',
                description:
                  'Comece a calcular e explorar seus mapas numerológicos imediatamente',
              },
              {
                step: 6,
                title: 'Exporte em PDF',
                description: 'Baixe seus mapas completos em PDF para consultar sempre',
              },
            ].map((item, index) => (
              <div key={index} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {item.step}
                  </div>
                  {index < 5 && <div className="w-1 h-12 bg-gradient-to-b from-indigo-600 to-transparent mt-2"></div>}
                </div>
                <div className="pb-6">
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="container max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Perguntas Frequentes</h2>
            <p className="text-xl text-slate-600">
              Encontre respostas para as dúvidas mais comuns sobre numerologia
            </p>
          </div>

          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div
                key={index}
                className="border border-slate-200 rounded-lg overflow-hidden hover:border-indigo-300 transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-slate-50 transition-colors"
                >
                  <span className="text-lg font-semibold text-slate-900 text-left">
                    {item.question}
                  </span>
                  <ChevronDown
                    size={20}
                    className={`text-indigo-600 flex-shrink-0 transition-transform ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-6 py-4 bg-slate-50 border-t border-slate-200">
                    <p className="text-slate-700">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-slate-600 mb-4">Ainda tem dúvidas?</p>
            <button
              onClick={() => setLocation('/faq')}
              className="text-indigo-600 font-semibold hover:text-indigo-700 transition-colors"
            >
              Ver todas as perguntas →
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container max-w-3xl text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold text-slate-900">
              Pronto para Descobrir Seu Destino?
            </h2>
            <p className="text-xl text-slate-600">
              Escolha um plano e comece sua jornada de autoconhecimento hoje mesmo.
            </p>
          </div>

          <button
            onClick={() => setLocation('/pricing')}
            className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-700 text-white rounded-lg font-semibold hover:shadow-xl transition-shadow text-lg inline-block"
          >
            Ver Planos e Começar →
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
