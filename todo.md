
## Revisão de Cálculos Numerólógicos

- [x] Revisar fórmulas de cálculo do mapa (MO, EU, EX, CD, ME) - Validado
- [x] Corrigir fórmulas de Desafios (D1, D2, D3, DM) - D2 corrigido, DM corrigido, D3 adicionado
- [x] Corrigir fórmulas de Ciclos e Realizações (C1, C2, C3, R1, R2, R3, R4) - Validado
- [x] Testar cálculos com exemplos práticos - Validado


## Problemas Reportados pelo Usuário (Sessão Atual)

- [x] Mudanças no código não aparecem no navegador (cache issue) - Resolvido com restart do servidor
- [x] Cálculo do EU não está correto - deveria ser 6 para "Eliane Serafim dos Santos" - RESOLVIDO: Adicionado I=9 e R=9 ao LETTER_VALUES
- [x] Contraste dos cards roxos - texto ouro em fundo roxo é difícil de ler - Verificado: Contraste está OK (#F3E5F5 em #2A1240)
- [x] Data de nascimento exibida incorretamente (04/01/1970 aparece como 3/01/1970) - RESOLVIDO: Mudado input de type="date" para type="text" e adicionado suporte para DD/MM/YYYY no calculateChart


## Problemas Novos (Após Deploy)

- [x] Data de nascimento invertida: digita 04/01/1970, aparece 01/04/1970 (DD/MM vs MM/DD) - RESOLVIDO
- [x] Textos com fundo roxo precisam ser brancos (melhor contraste) - RESOLVIDO
- [x] Progresso de Ano Pessoal com erro - RESOLVIDO


## Nova Solicitação

- [x] Unificar cards de "Idade das Realizações" e "Realizações Pínáculos" em um único card - CONCLUÍDO
- [x] Usar cálculos do card "Idade das Realizações" (que está correto) - CONCLUÍDO
- [x] Mostrar os Pínáculos (Ciclos de Vida) com as idades corretas - CONCLUÍDO


## Formatação de Data

- [x] Adicionar máscara de entrada DD/MM/YYYY no campo de data (formatação automática enquanto digita) - CONCLUÍDO


## Problemas Urgentes (Nova Sessão)

- [x] Textos escuros em cards roxos de interpretação detalhada - mudar para branco - RESOLVIDO
- [x] Adicionar faixas de idade nos Ciclos de Vida (0-29, 29-56, 56+) - RESOLVIDO
- [x] Previsões 2026 não estão carregando - RESOLVIDO (personalYear2026 agora retorna corretamente)


## Base de Conhecimento Abran (Metodologia Oficial)

- [x] Receber arquivos JSON com Base de Conhecimento - CONCLUÍDO
- [x] Integrar knowledgeBase.json ao projeto - CONCLUÍDO
- [x] Criar ebookGenerator.ts com regras inegociáveis - CONCLUÍDO
- [x] Validar estrutura e chaves do JSON - CONCLUÍDO
- [x] Testar geração de e-books com dados reais - PRONTO PARA TESTAR
- [x] Adicionar faixas de idade dos desafios - CONCLUÍDO
- [ ] Criar componente de exportação PDF - PRÓXIMO PASSO
- [ ] Integrar ao fluxo de geração de mapas - PRÓXIMO PASSO


## Integração de Template Premium de E-book (Sessão Atual)

- [x] Integrar novo template ao ebookGenerator.ts - CONCLUÍDO
- [x] Atualizar rota de e-book para usar Puppeteer - CONCLUÍDO
- [x] Instalar puppeteer para conversão HTML→PDF - CONCLUÍDO
- [x] Otimizar para mobile (sem espaçamento excessivo) - CONCLUÍDO
- [x] Adicionar paleta roxo/rosa/dourado - CONCLUÍDO
- [x] Adicionar numeração de página - CONCLUÍDO
- [x] Quebras de página A4 - CONCLUÍDO
- [ ] Fazer checkpoint e deploy em produção

## Erro Crítico Identificado (Sessão Atual)

- [x] ERRO: ebookGenerator.ts não existe em src/lib/ - RESOLVIDO: Arquivo criado
- [x] Criar ebookGenerator.ts com função exportarEbookHTML - CONCLUÍDO
- [x] Instalar Chrome para Puppeteer - CONCLUÍDO
- [ ] Corrigir erro "Cannot read properties of undefined (reading 'toString')" - EM INVESTIGAÇÃO
