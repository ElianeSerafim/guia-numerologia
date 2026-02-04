import { useLocation } from 'wouter';
import { ArrowLeft, Heart, Sparkles } from 'lucide-react';

/**
 * About Page - Quem é a Numeróloga?
 * 
 * Design: Elegante e místico com foto e biografia de Eliane Serafim
 * - Desktop: Foto à esquerda, texto à direita
 * - Mobile: Foto no topo, texto abaixo
 * - Paleta roxo/dourada
 */

export default function About() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#07131B] via-[#0A1F2E] to-[#07131B]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#07131B]/80 backdrop-blur-md border-b border-[#1A3A4A]">
        <div className="container flex items-center justify-between py-4">
          <button
            onClick={() => setLocation('/')}
            className="flex items-center gap-2 text-lg font-bold text-[#19E6FF] hover:text-[#00FFFF] transition-colors"
          >
            <ArrowLeft size={20} />
            Voltar
          </button>
          <h1 className="text-xl font-bold text-[#19E6FF]">Quem é a Numeróloga?</h1>
          <div className="w-20"></div>
        </div>
      </header>

      {/* Main Content */}
      <section className="container py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          {/* Desktop Layout: Flex row */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Foto - Esquerda (Desktop) / Topo (Mobile) */}
            <div className="flex justify-center md:justify-start order-1 md:order-1">
              <div className="relative">
                {/* Decorative circle background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#19E6FF]/20 to-[#00FFFF]/20 rounded-full blur-2xl -z-10 w-96 h-96 mx-auto"></div>
                
                {/* Foto */}
                <img
                  src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663241638345/llHYCXEGFqZapfCc.jpg"
                  alt="Eliane Serafim - Numeróloga"
                  className="w-80 h-80 md:w-96 md:h-96 rounded-2xl object-cover shadow-2xl border-4 border-[#19E6FF] hover:shadow-[0_0_40px_rgba(212,175,55,0.3)] transition-all duration-300"
                />

                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-[#19E6FF] to-[#FFC700] rounded-full flex items-center justify-center shadow-lg">
                  <Sparkles className="text-[#07131B]" size={28} />
                </div>
                <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-br from-[#00FFFF] to-[#19E6FF] rounded-full shadow-lg"></div>
              </div>
            </div>

            {/* Texto - Direita (Desktop) / Abaixo (Mobile) */}
            <div className="space-y-6 order-2 md:order-2">
              <div className="space-y-2">
                <h2 className="text-5xl md:text-6xl font-bold text-[#19E6FF]">
                  Quem é <span className="text-[#00FFFF]">Eliane Serafim</span>
                </h2>
                <div className="h-1 w-24 bg-gradient-to-r from-[#19E6FF] to-[#00FFFF]"></div>
              </div>

              <div className="space-y-4 text-white text-lg leading-relaxed">
                <p>
                  <span className="text-[#19E6FF] font-semibold">Eliane Serafim</span> é numeróloga, estrategista digital e desenvolvedora de soluções tecnológicas aplicadas ao autoconhecimento. Atua profissionalmente com Numerologia desde 2017, unindo interpretação simbólica, leitura prática de ciclos e visão estratégica de vida e negócios.
                </p>

                <p>
                  Criadora do projeto <span className="text-[#19E6FF] font-semibold">Encrespa Geral</span>, Eliane também é referência em identidade, autenticidade e posicionamento consciente, especialmente para mulheres que desejam prosperar sem se desconectar de quem são.
                </p>

                <p>
                  Com formação e atuação sólida em tecnologia, UX, automação e desenvolvimento de chatbots, Eliane integra Numerologia e inovação de forma ética, lógica e atualizada, trazendo a linguagem dos números para o mundo real — decisões, relacionamentos, carreira e propósito.
                </p>

                <p>
                  Seu trabalho é baseado em estudo contínuo, experiência prática e responsabilidade: aqui, a Numerologia não é previsão mística, mas ferramenta de clareza, estratégia e alinhamento pessoal.
                </p>

                <p>
                  Atende pessoas e empresas que buscam compreender seus ciclos, potencializar talentos e construir caminhos mais conscientes, prósperos e sustentáveis.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <button
                  onClick={() => setLocation('/pricing')}
                  className="bg-gradient-to-r from-[#19E6FF] to-[#FFC700] hover:from-[#FFC700] hover:to-[#FFD700] text-[#07131B] px-8 py-4 text-lg font-bold rounded-lg shadow-lg shadow-[#19E6FF]/30 transition-all hover:shadow-[#19E6FF]/50 flex items-center justify-center gap-2"
                >
                  <Heart size={20} />
                  Conhecer os Planos
                </button>

                <button
                  onClick={() => setLocation('/')}
                  className="border-2 border-[#19E6FF] text-[#19E6FF] hover:bg-[#19E6FF]/10 px-8 py-4 text-lg font-bold rounded-lg transition-all"
                >
                  Calcular Mapa Numerológico
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="container py-16">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-4xl font-bold text-[#19E6FF] text-center mb-12">Princípios de Trabalho</h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-gradient-to-br from-[#0A1F2E] to-[#3A1A50] border border-[#1A3A4A] rounded-xl p-8 space-y-4 hover:shadow-xl hover:shadow-[#19E6FF]/20 transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-[#19E6FF] to-[#FFC700] rounded-lg flex items-center justify-center">
                <Sparkles className="text-[#07131B]" size={24} />
              </div>
              <h4 className="text-2xl font-bold text-[#19E6FF]">Autenticidade</h4>
              <p className="text-white">Trabalho baseado em estudo contínuo, experiência prática e responsabilidade com seus clientes.</p>
            </div>

            {/* Card 2 */}
            <div className="bg-gradient-to-br from-[#0A1F2E] to-[#3A1A50] border border-[#1A3A4A] rounded-xl p-8 space-y-4 hover:shadow-xl hover:shadow-[#19E6FF]/20 transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-[#19E6FF] to-[#FFC700] rounded-lg flex items-center justify-center">
                <Heart className="text-[#07131B]" size={24} />
              </div>
              <h4 className="text-2xl font-bold text-[#19E6FF]">Clareza</h4>
              <p className="text-white">Numerologia não é previsão mística, mas ferramenta de clareza, estratégia e alinhamento pessoal.</p>
            </div>

            {/* Card 3 */}
            <div className="bg-gradient-to-br from-[#0A1F2E] to-[#3A1A50] border border-[#1A3A4A] rounded-xl p-8 space-y-4 hover:shadow-xl hover:shadow-[#19E6FF]/20 transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-[#19E6FF] to-[#FFC700] rounded-lg flex items-center justify-center">
                <Sparkles className="text-[#07131B]" size={24} />
              </div>
              <h4 className="text-2xl font-bold text-[#19E6FF]">Inovação</h4>
              <p className="text-white">Integração de Numerologia e tecnologia de forma ética, lógica e atualizada para o mundo real.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Premium CTA Section */}
      <section className="container py-20 my-16">
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#19E6FF]/10 via-[#00FFFF]/10 to-[#19E6FF]/10 border-2 border-[#19E6FF]/50 p-12 md:p-16">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#19E6FF]/5 rounded-full blur-3xl -mr-20 -mt-20" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#00FFFF]/5 rounded-full blur-3xl -ml-20 -mb-20" />

            <div className="relative z-10 text-center space-y-6">
              <div className="flex justify-center mb-4">
                <div className="bg-gradient-to-r from-[#19E6FF] to-[#FFC700] p-4 rounded-full">
                  <Heart className="text-[#07131B]" size={32} />
                </div>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-white">
                Quer um <span className="text-[#19E6FF]">Atendimento Personalizado?</span>
              </h2>

              <p className="text-xl text-gray-200 max-w-2xl mx-auto">
                Converse diretamente com Eliane para um atendimento exclusivo, análise profunda do seu mapa numerológico e recomendações personalizadas para sua vida e negócios.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                <button
                  onClick={() => window.open('https://wa.me/5511978828967?text=Ol%C3%A1%20Eliane!%20Gostaria%20de%20agendar%20um%20atendimento%20personalizado%20de%20numerologia.', '_blank')}
                  className="bg-gradient-to-r from-[#19E6FF] to-[#FFC700] hover:from-[#FFC700] hover:to-[#FFD700] text-[#07131B] px-8 py-6 text-lg font-bold rounded-lg shadow-lg shadow-[#19E6FF]/30 transition-all hover:shadow-[#19E6FF]/50 flex items-center justify-center gap-2"
                >
                  <Heart size={20} />
                  Agendar Atendimento Agora
                </button>
              </div>

              <p className="text-sm text-gray-400 pt-4">
                ✨ Resposta em até 24 horas | 🎯 Análise profunda e personalizada | 💎 Recomendações exclusivas
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#1A3A4A] bg-[#1A0820] mt-16">
        <div className="container py-8 text-center text-white text-sm font-light space-y-2">
          <p>Portal Numerologia 2026 © {new Date().getFullYear()} - Método Pitagórico</p>
          <p className="text-xs text-[#19E6FF]">Desenvolvido por <span className="font-semibold">Artweb Creative</span></p>
        </div>
      </footer>
    </div>
  );
}
