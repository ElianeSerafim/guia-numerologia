/**
 * InterpretationSection Component
 * 
 * Design: Apresentação elegante de interpretações em Markdown
 * - Renderização de Markdown com estilos customizados
 * - Tipografia clara e legível
 * - Espaçamento apropriado
 */

interface InterpretationSectionProps {
  interpretation: string;
}

export default function InterpretationSection({ interpretation }: InterpretationSectionProps) {
  return (
    <div className="card-mystical">
      <div className="prose prose-slate max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: interpretation }} />
    </div>
  );
}
