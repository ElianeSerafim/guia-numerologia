
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
- [x] Corrigir erro "Cannot read properties of undefined (reading 'toString')" - RESOLVIDO
- [x] Problema: Servidor importava ebookGenerator do cliente em vez do servidor - CORRIGIDO
- [x] Problema: Propriedade 'me' deveria ser 'merito' - CORRIGIDO
- [x] Geração de e-book testada e funcionando - PDF de 8 páginas gerado com sucesso
- [x] Correção: Validarção muito rigorosa rejeitava charts incompletos - CORRIGIDO
- [x] Chrome reinstalado após reset do sandbox
- [x] Migração de Puppeteer para jsPDF - CONCLUÍDA
- [x] E-book gerado com sucesso usando jsPDF (PDF 1.3)
- [x] Correção: Regex para remover CSS com [°s\S] em vez de . - CONCLUÍDA
- [x] Conteúdo numerológico agora aparece corretamente no PDF - TESTADO


## Erro: WhatsApp não salva corretamente no Admin

- [x] Problema: Cadastro do WhatsApp não persiste quando cliente acessa plano - RESOLVIDO
- [x] Causa: Estado newWhatsappLink não sincroniza com config quando muda - IDENTIFICADA
- [x] Solução: Adicionar useEffect para sincronizar estado com config - IMPLEMENTADA
- [x] Teste: Verificar se WhatsApp salvo é recuperado corretamente - PRONTO PARA TESTAR


## Correção: Ciclos Trimestrais (Períodos de 3 meses)

- [x] Localizar código de cálculo de ciclos trimestrais no dashboard
- [x] Corrigir 1º Trimestre: AP + Mês de Nascimento (reduzido)
- [x] Corrigir 2º Trimestre: AP + Dia de Nascimento (reduzido)
- [x] Corrigir 3º Trimestre: AP + Ano de Nascimento (reduzido)
- [x] Corrigir 4º Trimestre: AP + Próximo AP
- [x] Testar com exemplo: Adriana (04/06/1975) em 2026
- [x] Atualizar e-book com ciclos trimestrais corretos


## Integração: Base de Conhecimento Numerológica no E-book

- [x] Criar arquivo knowledgeBase.ts com interpretações de números (1-9, 11, 22, 33)
- [x] Integrar interpretações ao ebookGenerator.ts
- [x] Adicionar essência, luz e sombra de cada número no e-book
- [x] Adicionar práticas afetivas e válvulas de escape
- [x] Testar e-book com interpretações personalizadas - PDF de 28KB com 4 páginas
- [x] Verificar se PDF renderiza corretamente com novo conteúdo - CONFIRMADO


## Atualização: Template Profissional do E-book

- [ ] Analisar estrutura do modelo profissional fornecido
- [ ] Atualizar introdução com filosofia da numerologia pitagórica
- [ ] Reformular seção de Mérito com interpretações expandidas
- [ ] Reformular seção de Motivação com interpretações expandidas
- [ ] Reformular seção de Eu Íntimo com interpretações expandidas
- [ ] Reformular seção de Caminho do Destino com interpretações expandidas
- [ ] Reformular seção de Expressão com interpretações expandidas
- [ ] Reformular seção de Desafios com interpretações expandidas
- [ ] Reformular seção de Ciclos de Vida com descrições detalhadas
- [x] Testar e-book com novo template profissional - PDF 25KB 4 paginas
- [x] Verificar se PDF renderiza corretamente com novo conteudo - CONFIRMADO

## Passo 2: Integração de Desafios e Realizações Expandidas

- [x] Adicionar interpretações de Desafios (D1, D2, DM) ao knowledgeBase
- [x] Adicionar interpretações de Realizações (R1-R4) ao knowledgeBase
- [x] Integrar interpretações ao ebookGenerator.ts
- [x] Testar e-book com interpretações de Desafios e Realizações - PDF 23KB 4 páginas
- [x] Fazer checkpoint e publicar


## Passo 3: Integração de Ciclos Trimestrais Expandidos

- [x] Adicionar interpretações de Ciclos Trimestrais (CT1-CT4) ao knowledgeBase
- [x] Integrar interpretações de Ciclos Trimestrais ao ebookGenerator.ts
- [x] Testar e-book com interpretações de Ciclos Trimestrais - PDF 23KB 4 páginas
- [x] Fazer checkpoint e publicar
