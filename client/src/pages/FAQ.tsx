import { useState } from 'react';
import { ChevronDown, BookOpen, Lightbulb, HelpCircle } from 'lucide-react';

/**
 * FAQ Page
 * 
 * Seção educativa sobre numerologia pitagórica com:
 * - Perguntas frequentes sobre o método
 * - Explicação de cada número (1-9)
 * - Guia de interpretação
 * - Dicas de uso
 */

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'geral' | 'metodo' | 'numeros' | 'interpretacao';
}

interface NumberInfo {
  number: number;
  name: string;
  keyword: string;
  description: string;
  positivo: string[];
  negativo: string[];
  profissoes: string[];
}

const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'geral',
    question: 'O que é Numerologia Pitagórica?',
    answer: `A Numerologia Pitagórica é um sistema antigo de interpretação que utiliza números para compreender a natureza humana e os padrões da vida. Baseada nos ensinamentos do filósofo grego Pitágoras, esta técnica reduz nomes e datas a números de 1 a 9, cada um com significados e vibrações específicas. Esses números revelam características pessoais, talentos, desafios e o propósito de vida de cada indivíduo.`,
  },
  {
    id: 'faq-2',
    category: 'geral',
    question: 'Como funciona o Mapa Numerológico?',
    answer: `O Mapa Numerológico Natal (MNN) é um gráfico que organiza os números derivados do seu nome completo e data de nascimento. Cada número tem uma posição e significado específico: Caminho de Destino (propósito de vida), Motivação (desejos da alma), Expressão (como você se manifesta), Eu Íntimo (sua essência), Mérito (força de realização), Desafios e Ciclos de Vida. Juntos, esses números formam um mapa único que revela seu potencial e lições de vida.`,
  },
  {
    id: 'faq-3',
    category: 'metodo',
    question: 'Como se calcula o Caminho de Destino?',
    answer: `O Caminho de Destino é calculado somando todos os dígitos da sua data de nascimento (dia + mês + ano) até obter um número de 1 a 9. Por exemplo, se você nasceu em 25/08/1990: 2+5+0+8+1+9+9+0 = 34 → 3+4 = 7. Este número representa o propósito principal de sua vida e as lições que você veio aprender nesta encarnação.`,
  },
  {
    id: 'faq-4',
    category: 'metodo',
    question: 'Como se calcula a Motivação?',
    answer: `A Motivação (também chamada de Desejo da Alma) é calculada somando apenas as VOGAIS do seu nome completo, convertendo cada letra em seu valor numérico (A=1, E=5, I=9, O=6, U=3). Depois soma-se todos os valores até obter um número de 1 a 9. Este número revela seus desejos mais profundos, o que sua alma realmente quer vivenciar e conquistar.`,
  },
  {
    id: 'faq-5',
    category: 'metodo',
    question: 'O que significa o número Expressão?',
    answer: `A Expressão é calculada somando TODAS as letras do seu nome completo (vogais + consoantes). Este número representa como você se manifesta no mundo, seus talentos naturais, sua personalidade externa e a forma como as pessoas o percebem. É o "você" que o mundo vê, sua capacidade de comunicação e expressão criativa.`,
  },
  {
    id: 'faq-6',
    category: 'interpretacao',
    question: 'Como interpretar meu Mapa Numerológico?',
    answer: `Para interpretar seu mapa, analise cada número considerando: 1) Sua essência e significado fundamental, 2) Como ele se manifesta em sua vida, 3) Os riscos e desafios associados, 4) Como potencializar seus aspectos positivos. Lembre-se que os números não determinam seu futuro, mas revelam padrões energéticos que você pode usar para tomar decisões mais conscientes e evoluir pessoalmente.`,
  },
  {
    id: 'faq-7',
    category: 'interpretacao',
    question: 'Os números mestres (11, 22, 33) são especiais?',
    answer: `Sim! Os números mestres (11, 22, 33) têm significados amplificados e especiais. O 11 representa iluminação espiritual e intuição elevada. O 22 simboliza grandes realizações e poder de manifestação. O 33 é o número do amor universal e compaixão. Se você tem um número mestre em seu mapa, isso indica uma missão espiritual mais elevada e potencial para grandes transformações.`,
  },
  {
    id: 'faq-8',
    category: 'numeros',
    question: 'Posso mudar meu Mapa Numerológico?',
    answer: `Seu Mapa Numerológico Natal é fixo e baseado em sua data de nascimento e nome de nascimento. No entanto, você pode influenciar sua vida através de: 1) Escolhas conscientes, 2) Desenvolvimento pessoal, 3) Mudanças de nome (que criam um novo mapa secundário), 4) Práticas espirituais. Os números mostram o potencial e os padrões, mas você tem livre arbítrio para como vivê-los.`,
  },
  {
    id: 'faq-9',
    category: 'geral',
    question: 'Como usar as interpretações para evoluir?',
    answer: `Use as interpretações como um guia de autoconhecimento: 1) Identifique seus pontos fortes (números positivos), 2) Reconheça seus desafios (números com aspectos negativos), 3) Desenvolva estratégias para potencializar seus talentos, 4) Trabalhe conscientemente em seus desafios, 5) Tome decisões alinhadas com sua vibração numerológica. A numerologia é uma ferramenta de evolução pessoal, não destino.`,
  },
  {
    id: 'faq-10',
    category: 'interpretacao',
    question: 'O que são Ciclos de Vida?',
    answer: `Os Ciclos de Vida (também chamados de Períodos) dividem sua vida em três fases principais: Ciclo Formativo (infância/adolescência), Ciclo Produtivo (vida adulta ativa) e Ciclo de Colheita (maturidade). Cada ciclo tem uma vibração numerológica que influencia os eventos e lições daquele período. Compreender seus ciclos ajuda a entender melhor as fases da sua vida.`,
  },
];

const NUMBERS_INFO: NumberInfo[] = [
  {
    number: 1,
    name: 'Renascimento',
    keyword: 'Novo Começo',
    description: 'Representa novos inícios, liderança, independência e inovação. É o número do pioneiro, daquele que abre caminhos.',
    positivo: ['Liderança', 'Iniciativa', 'Coragem', 'Independência', 'Criatividade', 'Determinação'],
    negativo: ['Egoísmo', 'Impulsividade', 'Agressividade', 'Falta de cooperação'],
    profissoes: ['Empreendedor', 'Gerente', 'Inventor', 'Diretor', 'Piloto', 'Pesquisador'],
  },
  {
    number: 2,
    name: 'Parceria',
    keyword: 'Harmonia',
    description: 'Simboliza cooperação, diplomacia, sensibilidade e intuição. É o número da dualidade, do equilíbrio entre opostos.',
    positivo: ['Cooperação', 'Sensibilidade', 'Intuição', 'Diplomacia', 'Paciência', 'Harmonia'],
    negativo: ['Dependência', 'Indecisão', 'Timidez', 'Passividade'],
    profissoes: ['Mediador', 'Conselheiro', 'Artista', 'Psicólogo', 'Professor', 'Assistente Social'],
  },
  {
    number: 3,
    name: 'Criatividade',
    keyword: 'Expressão',
    description: 'Representa criatividade, comunicação, alegria e expansão. É o número da expressão artística e da sociabilidade.',
    positivo: ['Criatividade', 'Comunicação', 'Otimismo', 'Sociabilidade', 'Alegria', 'Versatilidade'],
    negativo: ['Dispersão', 'Superficialidade', 'Falta de foco', 'Exagero'],
    profissoes: ['Artista', 'Escritor', 'Ator', 'Comunicólogo', 'Designer', 'Músico'],
  },
  {
    number: 4,
    name: 'Estabilidade',
    keyword: 'Estrutura',
    description: 'Simboliza estabilidade, trabalho, disciplina e construção. É o número do alicerce sólido e da responsabilidade.',
    positivo: ['Disciplina', 'Responsabilidade', 'Praticidade', 'Confiabilidade', 'Lealdade', 'Organização'],
    negativo: ['Rigidez', 'Tédio', 'Falta de flexibilidade', 'Pessimismo'],
    profissoes: ['Engenheiro', 'Contador', 'Construtor', 'Administrador', 'Técnico', 'Organizador'],
  },
  {
    number: 5,
    name: 'Liberdade',
    keyword: 'Mudança',
    description: 'Representa liberdade, mudança, aventura e dinamismo. É o número do movimento, da adaptação e da experiência.',
    positivo: ['Adaptabilidade', 'Liberdade', 'Dinamismo', 'Curiosidade', 'Aventura', 'Versatilidade'],
    negativo: ['Instabilidade', 'Irresponsabilidade', 'Impulsividade', 'Falta de compromisso'],
    profissoes: ['Viajante', 'Jornalista', 'Vendedor', 'Piloto', 'Consultor', 'Ator'],
  },
  {
    number: 6,
    name: 'Amor',
    keyword: 'Responsabilidade',
    description: 'Simboliza amor, responsabilidade, família e cuidado. É o número do coração, da compaixão e do serviço.',
    positivo: ['Amor', 'Compaixão', 'Responsabilidade', 'Dedicação', 'Harmonia', 'Cuidado'],
    negativo: ['Possessividade', 'Sacrifício excessivo', 'Codependência', 'Ciúmes'],
    profissoes: ['Enfermeiro', 'Professor', 'Assistente Social', 'Conselheiro', 'Terapeuta', 'Cuidador'],
  },
  {
    number: 7,
    name: 'Sabedoria',
    keyword: 'Introspecção',
    description: 'Representa sabedoria, análise, espiritualidade e introspecção. É o número do filósofo, do buscador de verdade.',
    positivo: ['Sabedoria', 'Análise', 'Espiritualidade', 'Intuição', 'Reflexão', 'Discernimento'],
    negativo: ['Isolamento', 'Pessimismo', 'Crítica severa', 'Desconfiança'],
    profissoes: ['Filósofo', 'Pesquisador', 'Cientista', 'Terapeuta', 'Místico', 'Escritor'],
  },
  {
    number: 8,
    name: 'Poder',
    keyword: 'Abundância',
    description: 'Simboliza poder, abundância, sucesso e realização material. É o número do executivo, do realizador de grandes feitos.',
    positivo: ['Poder', 'Abundância', 'Realização', 'Autoridade', 'Sucesso', 'Eficiência'],
    negativo: ['Ganância', 'Materialismo', 'Abuso de poder', 'Obsessão'],
    profissoes: ['Executivo', 'Empresário', 'Juiz', 'Banqueiro', 'Diretor', 'Investidor'],
  },
  {
    number: 9,
    name: 'Conclusão',
    keyword: 'Transformação',
    description: 'Representa conclusão, transformação, universalidade e compaixão. É o número do sábio, do que vê o quadro geral.',
    positivo: ['Compaixão', 'Universalidade', 'Transformação', 'Sabedoria', 'Desapego', 'Intuição'],
    negativo: ['Melancolia', 'Apego ao passado', 'Confusão', 'Falta de limites'],
    profissoes: ['Filósofo', 'Ativista', 'Artista', 'Conselheiro', 'Educador', 'Humanitário'],
  },
];

export default function FAQ() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<'todos' | 'geral' | 'metodo' | 'numeros' | 'interpretacao'>('todos');

  const filteredFAQ = selectedCategory === 'todos' 
    ? FAQ_ITEMS 
    : FAQ_ITEMS.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#07131B] via-[#0A1F2E] to-[#07131B]">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#00FFFF] to-[#19E6FF] text-white py-16">
        <div className="container text-center space-y-4">
          {/* Imagem do Pitágoras */}
          <div className="flex justify-center mb-6">
            <img 
              src="/pitagoras.png" 
              alt="Pitágoras - Pai da Numerologia" 
              className="w-40 h-40 object-contain rounded-full shadow-2xl animate-[fadeInUp_0.8s_ease-out]" 
            />
          </div>
          
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen size={32} />
            <h1 className="text-4xl font-bold text-white">Centro de Aprendizado</h1>
          </div>
          <p className="text-lg text-white max-w-2xl mx-auto">
            Aprenda sobre o método pitagórico, entenda o significado de cada número e como usar a numerologia para sua evolução pessoal.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <div className="container py-16">
        {/* FAQ Section */}
        <section className="mb-20">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-[#19E6FF] mb-4 flex items-center gap-3">
              <HelpCircle size={28} className="text-[#19E6FF]" />
              Perguntas Frequentes
            </h2>
            <p className="text-white">
              Encontre respostas para as dúvidas mais comuns sobre numerologia pitagórica.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 mb-8">
            {[
              { value: 'todos', label: 'Todas' },
              { value: 'geral', label: 'Geral' },
              { value: 'metodo', label: 'Método' },
              { value: 'numeros', label: 'Números' },
              { value: 'interpretacao', label: 'Interpretação' },
            ].map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value as any)}
                className={`px-4 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === cat.value
                    ? 'bg-[#00FFFF] text-white shadow-lg'
                    : 'bg-[#0A1F2E] text-white border border-[#1A3A4A] hover:border-[#19E6FF]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-4">
            {filteredFAQ.map((item) => (
              <div
                key={item.id}
                className="card-mystical overflow-hidden"
              >
                <button
                  onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                  className="w-full flex items-center justify-between p-6 hover:bg-indigo-50 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-[#19E6FF] text-left">
                    {item.question}
                  </h3>
                  <ChevronDown
                    size={20}
                    className={`text-[#19E6FF] flex-shrink-0 transition-transform ${
                      expandedId === item.id ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {expandedId === item.id && (
                  <div className="px-6 pb-6 border-t border-[#1A3A4A] pt-4">
                    <p className="text-white leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Numbers Section */}
        <section>
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-[#19E6FF] mb-4 flex items-center gap-3">
              <Lightbulb size={28} className="text-[#19E6FF]" />
              Os 9 Números Pitagóricos
            </h2>
            <p className="text-white">
              Conheça o significado e as características de cada número.
            </p>
          </div>

          {/* Numbers Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {NUMBERS_INFO.map((num) => (
              <div
                key={num.number}
                className="card-mystical space-y-4 border-l-4 border-[#19E6FF] hover:shadow-lg transition-shadow bg-[#0A1F2E] border border-[#1A3A4A]"
              >
                {/* Number Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-[#19E6FF]">{num.name}</h3>
                    <p className="text-sm text-[#00FFFF]">{num.keyword}</p>
                  </div>
                  <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00FFFF] to-[#19E6FF]">
                    {num.number}
                  </div>
                </div>

                {/* Description */}
                <p className="text-white text-sm leading-relaxed">
                  {num.description}
                </p>

                {/* Positive Traits */}
                <div>
                  <p className="text-xs font-bold text-green-400 uppercase tracking-wide mb-2">
                    Aspectos Positivos
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {num.positivo.map((trait) => (
                      <span
                        key={trait}
                        className="px-2 py-1 rounded-full bg-green-900 text-green-300 text-xs font-medium"
                      >
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Negative Traits */}
                <div>
                  <p className="text-xs font-bold text-red-400 uppercase tracking-wide mb-2">
                    Aspectos a Trabalhar
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {num.negativo.map((trait) => (
                      <span
                        key={trait}
                        className="px-2 py-1 rounded-full bg-red-900 text-red-300 text-xs font-medium"
                      >
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Professions */}
                <div className="pt-4 border-t border-[#1A3A4A]">
                  <p className="text-xs font-bold text-[#19E6FF] uppercase tracking-wide mb-2">
                    Profissões Afins
                  </p>
                  <p className="text-sm text-white">
                    {num.profissoes.join(', ')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tips Section */}
        <section className="mt-20">
          <div className="card-mystical bg-gradient-to-br from-[#0A1F2E] to-[#1A0820] border-[#1A3A4A] space-y-6">
            <h2 className="text-2xl font-bold text-[#19E6FF] flex items-center gap-3">
              <Lightbulb size={24} className="text-[#19E6FF]" />
              Dicas para Usar a Numerologia
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <h3 className="font-bold text-[#19E6FF]">✨ Autoconhecimento</h3>
                <p className="text-white text-sm">
                  Use seu mapa numerológico como ferramenta de autoconhecimento. Identifique seus pontos fortes e áreas de desenvolvimento.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-bold text-[#19E6FF]">🎯 Tomada de Decisões</h3>
                <p className="text-white text-sm">
                  Considere suas vibrações numerológicas ao tomar decisões importantes. Alinhe suas ações com sua essência.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-bold text-[#19E6FF]">🌱 Evolução Pessoal</h3>
                <p className="text-white text-sm">
                  Trabalhe conscientemente em seus desafios numerológicos. A evolução vem do autoconhecimento e ação.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-bold text-[#19E6FF]">🔮 Intuição</h3>
                <p className="text-white text-sm">
                  Combine a análise numerológica com sua intuição. A sabedoria vem da integração da razão e intuição.
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
    </div>
  );
}
