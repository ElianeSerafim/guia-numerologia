/**
 * Interpretações Detalhadas dos Ciclos Trimestrais
 * 
 * Baseado no Guia Completo de Interpretação dos Ciclos Trimestrais na Numerologia
 * Contém interpretações específicas para cada combinação de Ano Pessoal + Vibração Trimestral
 */

export interface TrimestreInterpretation {
  vibration: number;
  essence: string;
  byPersonalYear: {
    [key: number]: {
      description: string;
      whatToDo: string[];
      whatToAvoid: string[];
    };
  };
}

export const TRIMESTRE_INTERPRETATIONS: { [key: number]: TrimestreInterpretation } = {
  1: {
    vibration: 1,
    essence: "Energia de novos começos, iniciativa, liderança e independência. Este trimestre traz a força do pioneirismo e do protagonismo.",
    byPersonalYear: {
      1: {
        description: "Potência máxima de recomeço. É hora de plantar todas as sementes que deseja colher nos próximos 9 anos. Período ideal para: iniciar empreendimentos, lançar projetos pessoais, assumir posições de liderança.",
        whatToDo: ["Iniciar novos projetos", "Assumir liderança", "Ser pioneiro", "Confiar na sua visão"],
        whatToAvoid: ["Excesso de individualismo", "Impulsividade sem planejamento", "Ignorar conselhos", "Agressividade"]
      },
      2: {
        description: "Novos começos nas parcerias. Inicie colaborações, sociedades ou relacionamentos que valorizem sua individualidade dentro da parceria. Encontre o equilíbrio entre cooperar e liderar.",
        whatToDo: ["Iniciar parcerias", "Equilibrar independência e cooperação", "Liderar com diplomacia"],
        whatToAvoid: ["Submissão excessiva", "Perder sua identidade nas relações", "Competir com parceiros"]
      },
      3: {
        description: "Nascimento da sua expressão criativa. Lance projetos artísticos, inicie cursos de comunicação, seja pioneira em áreas criativas. Sua voz precisa ser ouvida de forma autêntica e original.",
        whatToDo: ["Lançar projetos criativos", "Comunicar-se autenticamente", "Ser original na expressão"],
        whatToAvoid: ["Dispersão criativa", "Superficialidade", "Copiar outros artistas"]
      },
      4: {
        description: "Fundação de novas estruturas. Comece a construir bases sólidas para projetos de longo prazo. Inicie rotinas de disciplina, organize sistemas, seja pioneira em métodos práticos.",
        whatToDo: ["Criar bases sólidas", "Estabelecer rotinas", "Ser pioneiro em métodos práticos"],
        whatToAvoid: ["Rigidez excessiva", "Resistência a mudanças necessárias", "Trabalho sem descanso"]
      },
      5: {
        description: "Liberdade para começar. Inicie aventuras, viagens, mudanças corajosas. É o trimestre para ser pioneira em novas experiências e expandir horizontes com ousadia.",
        whatToDo: ["Iniciar aventuras", "Viajar", "Experimentar o novo", "Expandir horizontes"],
        whatToAvoid: ["Imprudência", "Instabilidade extrema", "Fuga de responsabilidades"]
      },
      6: {
        description: "Novos começos no lar e família. Inicie reformas, mude-se, comece novos ciclos familiares. Assuma a liderança nos cuidados com quem ama.",
        whatToDo: ["Iniciar reformas", "Liderar na família", "Criar harmonia no lar"],
        whatToAvoid: ["Controle excessivo", "Sacrifício da própria identidade", "Imposição de vontades"]
      },
      7: {
        description: "Despertar espiritual e intelectual. Inicie estudos profundos, práticas espirituais, processos de autoconhecimento. Seja pioneira no seu caminho interior.",
        whatToDo: ["Iniciar estudos profundos", "Praticar meditação", "Buscar autoconhecimento"],
        whatToAvoid: ["Isolamento excessivo", "Arrogância intelectual", "Desconexão do mundo material"]
      },
      8: {
        description: "Novos empreendimentos financeiros. Lance negócios, inicie investimentos, assuma posições de poder. Combine liderança com prosperidade material.",
        whatToDo: ["Lançar negócios", "Investir", "Assumir poder", "Buscar prosperidade"],
        whatToAvoid: ["Ganância", "Autoritarismo", "Obsessão por dinheiro", "Desonestidade"]
      },
      9: {
        description: "Recomeço através do fechamento. Inicie processos de finalização consciente, seja pioneira em deixar ir. Novo começo nasce do que você libera.",
        whatToDo: ["Finalizar ciclos conscientemente", "Perdoar", "Liberar o passado", "Doar e compartilhar"],
        whatToAvoid: ["Apego ao passado", "Amargura", "Resistência ao término", "Isolamento emocional"]
      }
    }
  },
  2: {
    vibration: 2,
    essence: "Energia de cooperação, diplomacia, sensibilidade e parcerias. Este trimestre pede paciência, receptividade e trabalho em equipe.",
    byPersonalYear: {
      1: {
        description: "Aprender a cooperar sem perder a liderança. Busque parceiros para seus projetos iniciados. Equilibre independência com colaboração.",
        whatToDo: ["Buscar parceiros", "Praticar diplomacia", "Equilibrar liderança e cooperação"],
        whatToAvoid: ["Teimosia", "Recusa em ouvir", "Individualismo extremo"]
      },
      2: {
        description: "Aprofundamento das relações. Período de consolidação de parcerias, aumento da sensibilidade emocional. Fortaleça vínculos e pratique a escuta ativa.",
        whatToDo: ["Fortalecer vínculos", "Praticar escuta ativa", "Cultivar sensibilidade"],
        whatToAvoid: ["Dependência emocional", "Submissão", "Perda de limites"]
      },
      3: {
        description: "Parcerias criativas florescem. Colabore em projetos artísticos, una forças com pessoas expressivas. A comunicação em dupla ou grupo traz resultados.",
        whatToDo: ["Colaborar criativamente", "Comunicar-se em grupo", "Unir talentos"],
        whatToAvoid: ["Competição criativa", "Ciúmes artísticos", "Dispersão em muitas parcerias"]
      },
      4: {
        description: "Cooperação prática e estruturada. Trabalhe em equipe para construir projetos sólidos. Parcerias de trabalho ganham importância.",
        whatToDo: ["Trabalhar em equipe", "Construir juntos", "Formalizar parcerias"],
        whatToAvoid: ["Rigidez nas relações", "Controle excessivo", "Falta de flexibilidade"]
      },
      5: {
        description: "Momento de desacelerar na mudança. Busque companhia para suas aventuras, não vá sozinha. Liberdade precisa de apoio emocional.",
        whatToDo: ["Buscar companhia", "Compartilhar aventuras", "Equilibrar liberdade e conexão"],
        whatToAvoid: ["Solidão nas mudanças", "Instabilidade relacional", "Fuga de compromissos"]
      },
      6: {
        description: "Harmonia nas relações familiares. Fortaleça laços afetivos, pratique o amor incondicional. Parcerias românticas se aprofundam.",
        whatToDo: ["Fortalecer laços familiares", "Praticar amor incondicional", "Aprofundar relacionamentos"],
        whatToAvoid: ["Controle familiar", "Sacrifício excessivo", "Dependência afetiva"]
      },
      7: {
        description: "Conexões espirituais profundas. Busque parceiros no caminho espiritual, participe de grupos de estudo. A intuição se fortalece nas relações.",
        whatToDo: ["Buscar conexões espirituais", "Participar de grupos de estudo", "Confiar na intuição"],
        whatToAvoid: ["Isolamento espiritual", "Arrogância mística", "Desconexão emocional"]
      },
      8: {
        description: "Sociedades financeiras favorecidas. Forme parcerias de negócios, busque investidores. O sucesso vem através da cooperação estratégica.",
        whatToDo: ["Formar sociedades", "Buscar investidores", "Cooperar estrategicamente"],
        whatToAvoid: ["Desconfiança excessiva", "Controle total", "Exploração de parceiros"]
      },
      9: {
        description: "Apoio emocional nos processos de término. Não enfrente finalizações sozinha. Busque terapia, amigos, suporte para atravessar fechamentos de ciclo.",
        whatToDo: ["Buscar apoio emocional", "Fazer terapia", "Compartilhar sentimentos"],
        whatToAvoid: ["Isolamento na dor", "Dependência emocional", "Dramatização excessiva"]
      }
    }
  },
  3: {
    vibration: 3,
    essence: "Energia de expressão, criatividade, comunicação e alegria. Este trimestre convida à expansão da sua voz e talentos artísticos.",
    byPersonalYear: {
      1: {
        description: "Expresse suas novas ideias. Comunique seus projetos ao mundo, use criatividade para divulgar seus começos. Seja autêntica na sua expressão.",
        whatToDo: ["Comunicar projetos", "Expressar-se autenticamente", "Usar criatividade na divulgação"],
        whatToAvoid: ["Arrogância", "Dispersão comunicativa", "Falta de autenticidade"]
      },
      2: {
        description: "Comunicação nas parcerias. Expresse sentimentos, crie junto com parceiros, use a arte para fortalecer vínculos. Diálogos criativos são essenciais.",
        whatToDo: ["Expressar sentimentos", "Criar em parceria", "Dialogar criativamente"],
        whatToAvoid: ["Fofoca", "Manipulação verbal", "Superficialidade emocional"]
      },
      3: {
        description: "Ápice da expressão criativa. Seu trimestre mais potente do ano. Lance projetos artísticos, escreva, cante, dance, comunique-se sem filtros. Brilhe!",
        whatToDo: ["Lançar projetos artísticos", "Expressar-se livremente", "Brilhar", "Comunicar sem filtros"],
        whatToAvoid: ["Dispersão extrema", "Superficialidade", "Exibicionismo", "Falta de foco"]
      },
      4: {
        description: "Estruture sua criatividade. Dê forma prática aos talentos artísticos. Organize apresentações, crie rotinas criativas, transforme arte em trabalho.",
        whatToDo: ["Estruturar criatividade", "Organizar apresentações", "Profissionalizar arte"],
        whatToAvoid: ["Rigidez criativa", "Perfeccionismo paralisante", "Falta de espontaneidade"]
      },
      5: {
        description: "Aventuras criativas. Viaje para eventos culturais, experimente diferentes formas de expressão. Liberdade através da arte e comunicação.",
        whatToDo: ["Viajar para eventos culturais", "Experimentar novas formas de expressão", "Expandir repertório"],
        whatToAvoid: ["Dispersão excessiva", "Instabilidade criativa", "Falta de compromisso"]
      },
      6: {
        description: "Criatividade em família. Decore a casa, crie momentos alegres com quem ama, expresse amor através da arte. Beleza e harmonia no lar.",
        whatToDo: ["Decorar o lar", "Criar momentos familiares", "Expressar amor pela arte"],
        whatToAvoid: ["Perfeccionismo estético", "Controle sobre expressão alheia", "Superficialidade afetiva"]
      },
      7: {
        description: "Expresse sua sabedoria. Ensine, escreva sobre espiritualidade, comunique seus aprendizados profundos. Criatividade intelectual e espiritual.",
        whatToDo: ["Ensinar", "Escrever sobre espiritualidade", "Compartilhar sabedoria"],
        whatToAvoid: ["Arrogância intelectual", "Comunicação hermética", "Desconexão da simplicidade"]
      },
      8: {
        description: "Marketing e comunicação de negócios. Invista em divulgação criativa, branding, redes sociais. Expresse prosperidade através da imagem profissional.",
        whatToDo: ["Investir em marketing", "Trabalhar branding", "Usar redes sociais estrategicamente"],
        whatToAvoid: ["Ostentação", "Comunicação manipulativa", "Superficialidade profissional"]
      },
      9: {
        description: "Expresse-se antes de encerrar. Comunique o que precisa ser dito, use a arte para processar finais. Criatividade como cura e liberação.",
        whatToDo: ["Comunicar o necessário", "Usar arte para curar", "Expressar-se antes de finalizar"],
        whatToAvoid: ["Amargura na comunicação", "Dramatização excessiva", "Palavras destrutivas"]
      }
    }
  },
  4: {
    vibration: 4,
    essence: "Energia de estrutura, disciplina, trabalho e construção. Este trimestre exige organização, persistência e foco no mundo material.",
    byPersonalYear: {
      1: {
        description: "Estruture seus novos começos. Crie planos sólidos, organize rotinas, estabeleça bases para projetos iniciados. Transforme ideias em ação concreta.",
        whatToDo: ["Criar planos sólidos", "Estabelecer rotinas", "Transformar ideias em ação"],
        whatToAvoid: ["Impulsividade", "Falta de planejamento", "Desorganização"]
      },
      2: {
        description: "Construa parcerias sólidas. Formalize colaborações, crie contratos, organize o lado prático das relações. Estabilidade nas conexões.",
        whatToDo: ["Formalizar parcerias", "Criar contratos", "Organizar relações"],
        whatToAvoid: ["Informalidade excessiva", "Falta de limites", "Dependência não estruturada"]
      },
      3: {
        description: "Disciplina criativa. Estabeleça rotinas para projetos artísticos, organize seu trabalho criativo. Transforme talento em método.",
        whatToDo: ["Estabelecer rotinas criativas", "Organizar trabalho artístico", "Profissionalizar talento"],
        whatToAvoid: ["Rigidez que mata criatividade", "Perfeccionismo paralisante", "Excesso de método"]
      },
      4: {
        description: "Máxima produtividade e construção. Seu trimestre mais potente. Foque totalmente no trabalho, estabeleça fundações duradouras. Período de colheita do esforço.",
        whatToDo: ["Focar no trabalho", "Construir fundações", "Ser produtivo", "Colher resultados"],
        whatToAvoid: ["Workaholismo", "Rigidez extrema", "Negligência da saúde", "Falta de descanso"]
      },
      5: {
        description: "Organize a mudança. Planeje as transições, estruture as aventuras. Mesmo na liberdade, é hora de ter método e responsabilidade.",
        whatToDo: ["Planejar mudanças", "Estruturar transições", "Ter método na liberdade"],
        whatToAvoid: ["Impulsividade", "Falta de planejamento", "Irresponsabilidade"]
      },
      6: {
        description: "Construa o lar. Reformas, organização doméstica, criação de rotinas familiares. Responsabilidades com a família exigem estrutura.",
        whatToDo: ["Fazer reformas", "Organizar o lar", "Criar rotinas familiares"],
        whatToAvoid: ["Controle excessivo", "Rigidez familiar", "Negligência do descanso"]
      },
      7: {
        description: "Disciplina espiritual. Crie rotinas de meditação, organize estudos, estruture práticas espirituais. O caminho interior precisa de método.",
        whatToDo: ["Criar rotinas de meditação", "Organizar estudos", "Estruturar práticas espirituais"],
        whatToAvoid: ["Rigidez espiritual", "Dogmatismo", "Excesso de método sem coração"]
      },
      8: {
        description: "Expansão material sólida. Construa impérios, estabeleça negócios duradouros, organize finanças com disciplina. Sucesso através da persistência.",
        whatToDo: ["Construir negócios duradouros", "Organizar finanças", "Ser persistente"],
        whatToAvoid: ["Ganância", "Workaholismo", "Negligência da vida pessoal"]
      },
      9: {
        description: "Organize finalizações. Crie listas do que precisa ser encerrado, estabeleça prazos para términos. Finalize com método e responsabilidade.",
        whatToDo: ["Organizar finalizações", "Estabelecer prazos", "Finalizar com método"],
        whatToAvoid: ["Procrastinação", "Apego ao passado", "Rigidez nos términos"]
      }
    }
  },
  5: {
    vibration: 5,
    essence: "Energia de liberdade, mudança, aventura e expansão. Este trimestre traz movimento, versatilidade e desejo de experiências novas.",
    byPersonalYear: {
      1: {
        description: "Liberdade nos novos começos. Inicie com ousadia, experimente diferentes caminhos, não se prenda a um único método. Seja aventureira no pioneirismo.",
        whatToDo: ["Iniciar com ousadia", "Experimentar caminhos", "Ser aventureiro"],
        whatToAvoid: ["Imprudência", "Falta de foco", "Dispersão excessiva"]
      },
      2: {
        description: "Movimento nas parcerias. Viaje com parceiros, experimente novas formas de relacionar-se. Liberdade dentro das conexões.",
        whatToDo: ["Viajar com parceiros", "Experimentar novas formas de relação", "Equilibrar liberdade e conexão"],
        whatToAvoid: ["Instabilidade relacional", "Fuga de compromissos", "Infidelidade"]
      },
      3: {
        description: "Aventuras criativas. Experimente diferentes formas de expressão, viaje para eventos culturais, comunique-se com públicos diversos. Expansão artística.",
        whatToDo: ["Experimentar formas de expressão", "Viajar para eventos culturais", "Expandir artisticamente"],
        whatToAvoid: ["Dispersão criativa", "Superficialidade", "Falta de compromisso"]
      },
      4: {
        description: "Quebra da rotina. Mesmo no ano de estrutura, este trimestre pede flexibilidade. Ajuste planos, adapte-se, permita mudanças dentro da organização.",
        whatToDo: ["Ajustar planos", "Adaptar-se", "Permitir mudanças"],
        whatToAvoid: ["Rigidez", "Resistência a mudanças", "Teimosia"]
      },
      5: {
        description: "Máxima liberdade e transformação. Seu trimestre mais intenso. Viaje, mude, experimente, expanda horizontes sem limites. Abraçe totalmente o novo.",
        whatToDo: ["Viajar", "Mudar", "Experimentar", "Expandir horizontes"],
        whatToAvoid: ["Imprudência extrema", "Instabilidade total", "Fuga de responsabilidades", "Vícios"]
      },
      6: {
        description: "Mudanças no lar. Mude-se, renove ambientes, traga novidades para a família. Equilibre responsabilidades com desejo de liberdade.",
        whatToDo: ["Renovar ambientes", "Trazer novidades", "Equilibrar responsabilidade e liberdade"],
        whatToAvoid: ["Irresponsabilidade familiar", "Mudanças impulsivas", "Negligência do lar"]
      },
      7: {
        description: "Jornadas espirituais. Viagens sagradas, retiros, experiências místicas. Liberdade para explorar diferentes caminhos espirituais.",
        whatToDo: ["Fazer viagens sagradas", "Participar de retiros", "Explorar caminhos espirituais"],
        whatToAvoid: ["Turismo espiritual superficial", "Fuga da realidade", "Instabilidade mística"]
      },
      8: {
        description: "Expansão de negócios. Abra filiais, explore novos mercados, diversifique investimentos. Liberdade financeira através da ousadia.",
        whatToDo: ["Expandir negócios", "Explorar novos mercados", "Diversificar investimentos"],
        whatToAvoid: ["Imprudência financeira", "Riscos excessivos", "Instabilidade nos negócios"]
      },
      9: {
        description: "Liberdade através da liberação. Mude radicalmente ao deixar ir. Viaje para processar términos, experimente a vida após finalizações.",
        whatToDo: ["Mudar após liberar", "Viajar para processar", "Experimentar nova vida"],
        whatToAvoid: ["Fuga da dor", "Mudanças impulsivas", "Instabilidade emocional"]
      }
    }
  },
  6: {
    vibration: 6,
    essence: "Energia de amor, responsabilidade, família e harmonia. Este trimestre foca nas relações afetivas, lar e beleza.",
    byPersonalYear: {
      1: {
        description: "Novos começos no amor. Inicie relacionamentos afetivos, assuma responsabilidades familiares, crie seu lar. Liderança amorosa.",
        whatToDo: ["Iniciar relacionamentos", "Assumir responsabilidades familiares", "Criar o lar"],
        whatToAvoid: ["Controle amoroso", "Sacrifício da identidade", "Dependência afetiva"]
      },
      2: {
        description: "Harmonia profunda nas parcerias. Compromissos afetivos se fortalecem, casamentos são favorecidos. Amor e cooperação em equilíbrio perfeito.",
        whatToDo: ["Fortalecer compromissos", "Casar", "Equilibrar amor e cooperação"],
        whatToAvoid: ["Dependência total", "Perda de limites", "Submissão"]
      },
      3: {
        description: "Expresse amor criativamente. Declare sentimentos, crie arte sobre relacionamentos, embeleze sua vida e seu lar com expressão autêntica.",
        whatToDo: ["Declarar sentimentos", "Criar arte sobre amor", "Embelezar o lar"],
        whatToAvoid: ["Superficialidade afetiva", "Dramatização", "Falta de autenticidade"]
      },
      4: {
        description: "Construa família sólida. Formalize relacionamentos, organize o lar, crie rotinas de cuidado. Responsabilidade afetiva estruturada.",
        whatToDo: ["Formalizar relacionamentos", "Organizar o lar", "Criar rotinas de cuidado"],
        whatToAvoid: ["Rigidez familiar", "Controle excessivo", "Falta de afeto"]
      },
      5: {
        description: "Liberdade no amor. Experimente novas formas de amar, renove relacionamentos, equilibre compromisso com autonomia. Amor sem prisões.",
        whatToDo: ["Renovar relacionamentos", "Equilibrar compromisso e autonomia", "Experimentar no amor"],
        whatToAvoid: ["Infidelidade", "Irresponsabilidade afetiva", "Fuga de compromissos"]
      },
      6: {
        description: "Ápice do amor e responsabilidade. Seu trimestre mais potente. Dedique-se totalmente à família, ao lar, aos relacionamentos. Amor incondicional.",
        whatToDo: ["Dedicar-se à família", "Praticar amor incondicional", "Cuidar do lar"],
        whatToAvoid: ["Sacrifício excessivo", "Controle familiar", "Dependência afetiva", "Negligência de si"]
      },
      7: {
        description: "Amor espiritual. Busque conexões profundas, pratique amor consciente, cuide da família com sabedoria. Harmonia interior reflete no lar.",
        whatToDo: ["Buscar conexões profundas", "Praticar amor consciente", "Cuidar com sabedoria"],
        whatToAvoid: ["Frieza emocional", "Isolamento familiar", "Arrogância espiritual"]
      },
      8: {
        description: "Prosperidade familiar. Invista no lar, providencie conforto material para quem ama, equilibre sucesso profissional com vida familiar.",
        whatToDo: ["Investir no lar", "Providenciar conforto", "Equilibrar trabalho e família"],
        whatToAvoid: ["Materialismo no amor", "Negligência familiar", "Controle pelo dinheiro"]
      },
      9: {
        description: "Amor no término. Perdoe, libere com amor, cuide de quem fica. Finalize relacionamentos com compaixão ou fortaleça os que permanecem.",
        whatToDo: ["Perdoar", "Liberar com amor", "Finalizar com compaixão"],
        whatToAvoid: ["Amargura", "Vingança", "Apego doloroso"]
      }
    }
  },
  7: {
    vibration: 7,
    essence: "Energia de introspecção, sabedoria, espiritualidade e análise. Este trimestre convida ao mergulho interior e busca de conhecimento profundo.",
    byPersonalYear: {
      1: {
        description: "Novos começos internos. Inicie jornada espiritual, busque autoconhecimento, estude. Liderança nasce da sabedoria interior.",
        whatToDo: ["Iniciar jornada espiritual", "Buscar autoconhecimento", "Estudar profundamente"],
        whatToAvoid: ["Isolamento excessivo", "Arrogância intelectual", "Desconexão do mundo"]
      },
      2: {
        description: "Conexões espirituais profundas. Busque parceiros no caminho interior, compartilhe sabedoria, pratique escuta intuitiva nas relações.",
        whatToDo: ["Buscar parceiros espirituais", "Compartilhar sabedoria", "Praticar escuta intuitiva"],
        whatToAvoid: ["Isolamento", "Frieza emocional", "Arrogância mística"]
      },
      3: {
        description: "Expresse sua sabedoria. Ensine, escreva, comunique aprendizados profundos. Criatividade intelectual e espiritual floresce.",
        whatToDo: ["Ensinar", "Escrever", "Comunicar sabedoria"],
        whatToAvoid: ["Arrogância intelectual", "Comunicação hermética", "Desconexão da simplicidade"]
      },
      4: {
        description: "Estruture práticas espirituais. Crie rotinas de meditação, organize estudos, discipline o caminho interior. Espiritualidade prática.",
        whatToDo: ["Criar rotinas espirituais", "Organizar estudos", "Disciplinar práticas"],
        whatToAvoid: ["Rigidez espiritual", "Dogmatismo", "Excesso de método"]
      },
      5: {
        description: "Jornadas espirituais. Viaje para lugares sagrados, experimente diferentes práticas, expanda consciência. Liberdade no caminho interior.",
        whatToDo: ["Viajar para lugares sagrados", "Experimentar práticas", "Expandir consciência"],
        whatToAvoid: ["Turismo espiritual superficial", "Instabilidade mística", "Fuga da realidade"]
      },
      6: {
        description: "Amor e espiritualidade. Cuide da família com sabedoria, pratique amor consciente, crie harmonia espiritual no lar.",
        whatToDo: ["Cuidar com sabedoria", "Praticar amor consciente", "Harmonizar espiritualmente o lar"],
        whatToAvoid: ["Frieza emocional", "Isolamento familiar", "Arrogância espiritual"]
      },
      7: {
        description: "Máximo mergulho interior. Seu trimestre mais potente. Medite profundamente, estude mistérios, conecte-se com o sagrado. Iluminação possível.",
        whatToDo: ["Meditar profundamente", "Estudar mistérios", "Conectar-se com o sagrado"],
        whatToAvoid: ["Isolamento extremo", "Arrogância espiritual", "Desconexão total", "Fuga da vida"]
      },
      8: {
        description: "Sabedoria nos negócios. Use intuição para decisões financeiras, busque prosperidade consciente, lidere com sabedoria.",
        whatToDo: ["Usar intuição nos negócios", "Buscar prosperidade consciente", "Liderar com sabedoria"],
        whatToAvoid: ["Materialismo sem ética", "Frieza nos negócios", "Arrogância intelectual"]
      },
      9: {
        description: "Sabedoria no término. Finalize com consciência, busque compreensão profunda dos ciclos, libere com sabedoria espiritual.",
        whatToDo: ["Finalizar conscientemente", "Compreender ciclos", "Liberar com sabedoria"],
        whatToAvoid: ["Amargura", "Isolamento na dor", "Arrogância espiritual"]
      }
    }
  },
  8: {
    vibration: 8,
    essence: "Energia de poder, prosperidade, realização material e autoridade. Este trimestre foca em conquistas concretas e sucesso no mundo material.",
    byPersonalYear: {
      1: {
        description: "Novos empreendimentos poderosos. Lance negócios, inicie investimentos, assuma posições de liderança financeira. Pioneirismo próspero.",
        whatToDo: ["Lançar negócios", "Iniciar investimentos", "Assumir liderança financeira"],
        whatToAvoid: ["Ganância", "Autoritarismo", "Desonestidade"]
      },
      2: {
        description: "Sociedades prósperas. Forme parcerias financeiras, busque investidores, coopere para o sucesso material. Poder compartilhado.",
        whatToDo: ["Formar parcerias financeiras", "Buscar investidores", "Cooperar para sucesso"],
        whatToAvoid: ["Desconfiança excessiva", "Controle total", "Exploração"]
      },
      3: {
        description: "Marketing e comunicação de negócios. Invista em divulgação, branding, redes sociais. Expresse prosperidade criativamente.",
        whatToDo: ["Investir em marketing", "Trabalhar branding", "Usar redes sociais"],
        whatToAvoid: ["Ostentação", "Comunicação manipulativa", "Superficialidade"]
      },
      4: {
        description: "Construção de impérios. Estabeleça negócios duradouros, organize finanças com disciplina, construa prosperidade sólida.",
        whatToDo: ["Estabelecer negócios duradouros", "Organizar finanças", "Construir prosperidade"],
        whatToAvoid: ["Workaholismo", "Ganância", "Negligência da vida pessoal"]
      },
      5: {
        description: "Expansão de negócios. Abra filiais, explore novos mercados, diversifique investimentos. Prosperidade através da ousadia.",
        whatToDo: ["Expandir negócios", "Explorar mercados", "Diversificar investimentos"],
        whatToAvoid: ["Imprudência financeira", "Riscos excessivos", "Instabilidade"]
      },
      6: {
        description: "Prosperidade familiar. Invista no lar, providencie conforto material, equilibre sucesso profissional com vida familiar.",
        whatToDo: ["Investir no lar", "Providenciar conforto", "Equilibrar trabalho e família"],
        whatToAvoid: ["Materialismo no amor", "Negligência familiar", "Controle pelo dinheiro"]
      },
      7: {
        description: "Sabedoria financeira. Use intuição para negócios, busque prosperidade consciente, lidere com sabedoria espiritual.",
        whatToDo: ["Usar intuição nos negócios", "Buscar prosperidade consciente", "Liderar com sabedoria"],
        whatToAvoid: ["Materialismo sem ética", "Frieza", "Arrogância"]
      },
      8: {
        description: "Ápice do poder material. Seu trimestre mais potente. Conquiste sucesso máximo, assuma poder total, realize ambições. Prosperidade plena.",
        whatToDo: ["Conquistar sucesso", "Assumir poder", "Realizar ambições"],
        whatToAvoid: ["Ganância extrema", "Autoritarismo", "Obsessão por dinheiro", "Desonestidade"]
      },
      9: {
        description: "Prosperidade através da generosidade. Doe, compartilhe riqueza, finalize negócios com ética. Sucesso no desapego material.",
        whatToDo: ["Doar", "Compartilhar riqueza", "Finalizar com ética"],
        whatToAvoid: ["Apego ao dinheiro", "Ganância no término", "Desonestidade"]
      }
    }
  },
  9: {
    vibration: 9,
    essence: "Energia de finalização, compaixão, universalidade e liberação. Este trimestre convida a encerrar ciclos, perdoar e servir.",
    byPersonalYear: {
      1: {
        description: "Recomeço através do término. Finalize para iniciar, libere o passado para criar o novo. Novos começos nascem do desapego.",
        whatToDo: ["Finalizar conscientemente", "Liberar o passado", "Perdoar"],
        whatToAvoid: ["Apego ao passado", "Resistência ao término", "Amargura"]
      },
      2: {
        description: "Apoio nos términos. Não enfrente finalizações sozinho, busque suporte emocional, finalize parcerias com compaixão.",
        whatToDo: ["Buscar apoio", "Finalizar com compaixão", "Compartilhar a dor"],
        whatToAvoid: ["Isolamento", "Dependência emocional", "Dramatização"]
      },
      3: {
        description: "Expresse-se antes de encerrar. Comunique o necessário, use arte para processar finais, libere através da criatividade.",
        whatToDo: ["Comunicar o necessário", "Usar arte para curar", "Expressar-se"],
        whatToAvoid: ["Amargura na comunicação", "Dramatização", "Palavras destrutivas"]
      },
      4: {
        description: "Organize finalizações. Crie listas, estabeleça prazos, finalize com método e responsabilidade. Términos estruturados.",
        whatToDo: ["Organizar finalizações", "Estabelecer prazos", "Finalizar com método"],
        whatToAvoid: ["Procrastinação", "Apego", "Rigidez nos términos"]
      },
      5: {
        description: "Liberdade através da liberação. Mude radicalmente ao deixar ir, viaje para processar, experimente vida após finalizações.",
        whatToDo: ["Mudar após liberar", "Viajar para processar", "Experimentar nova vida"],
        whatToAvoid: ["Fuga da dor", "Mudanças impulsivas", "Instabilidade"]
      },
      6: {
        description: "Amor no término. Perdoe, libere com amor, cuide de quem fica. Finalize relacionamentos com compaixão.",
        whatToDo: ["Perdoar", "Liberar com amor", "Cuidar com compaixão"],
        whatToAvoid: ["Amargura", "Vingança", "Apego doloroso"]
      },
      7: {
        description: "Sabedoria no término. Finalize conscientemente, compreenda ciclos profundamente, libere com sabedoria espiritual.",
        whatToDo: ["Finalizar conscientemente", "Compreender ciclos", "Liberar com sabedoria"],
        whatToAvoid: ["Amargura", "Isolamento", "Arrogância"]
      },
      8: {
        description: "Prosperidade através da generosidade. Doe, compartilhe, finalize negócios com ética. Sucesso no desapego material.",
        whatToDo: ["Doar", "Compartilhar", "Finalizar com ética"],
        whatToAvoid: ["Apego ao dinheiro", "Ganância", "Desonestidade"]
      },
      9: {
        description: "Máxima finalização e liberação. Seu trimestre mais potente. Encerre ciclos profundos, perdoe totalmente, sirva à humanidade. Compaixão universal.",
        whatToDo: ["Encerrar ciclos profundos", "Perdoar totalmente", "Servir à humanidade"],
        whatToAvoid: ["Amargura extrema", "Isolamento total", "Apego ao passado", "Vitimização"]
      }
    }
  }
};

/**
 * Busca interpretação detalhada para um ciclo trimestral específico
 * @param personalYear Ano Pessoal (1-9)
 * @param trimestreVibration Vibração do Trimestre (1-9, 11, 22, 33)
 * @returns Interpretação detalhada ou null se não encontrada
 */
export function getDetailedTrimestreInterpretation(
  personalYear: number,
  trimestreVibration: number
): {
  essence: string;
  description: string;
  whatToDo: string[];
  whatToAvoid: string[];
} | null {
  const vibrationData = TRIMESTRE_INTERPRETATIONS[trimestreVibration];
  if (!vibrationData) return null;

  const yearData = vibrationData.byPersonalYear[personalYear];
  if (!yearData) return null;

  return {
    essence: vibrationData.essence,
    description: yearData.description,
    whatToDo: yearData.whatToDo,
    whatToAvoid: yearData.whatToAvoid
  };
}

/**
 * Interpretações de Números Mestres para Ciclos Trimestrais
 * Baseado na metodologia oficial fornecida
 */

export interface MasterNumberInterpretation {
  number: number;
  title: string;
  essence: string;
  orientation: string;
  caution: string;
}

export const MASTER_NUMBER_INTERPRETATIONS: Record<number, MasterNumberInterpretation> = {
  11: {
    number: 11,
    title: "Inspiração e Intuição",
    essence: "Visão, canal criativo-espiritual, mensagens claras.",
    orientation: "Escreva insights, simplifique a rotina para ouvir a alma, transforme inspiração em ação pequena e constante.",
    caution: "Ansiedade, excesso de estímulo, idealismo sem aterramento."
  },
  22: {
    number: 22,
    title: "Grande Construção",
    essence: "Materializar algo robusto, impacto, legado.",
    orientation: "Planeje em etapas, delegue, documente processos, construa algo que funcione sem você 24h.",
    caution: "Sobrecarga, querer 'salvar tudo', perfeccionismo paralisante."
  },
  33: {
    number: 33,
    title: "Amor-Mestre e Cura",
    essence: "Servir com amor, ensinar pelo exemplo, cura emocional.",
    orientation: "Cuide do seu coração e do seu corpo, escolha limites amorosos, transforme cuidado em estrutura sustentável.",
    caution: "Autoabandono, culpa, atração por relações de resgate."
  }
};

/**
 * Retorna interpretação de número mestre se aplicável
 */
export const getMasterNumberInterpretation = (number: number): MasterNumberInterpretation | null => {
  if (number === 11 || number === 22 || number === 33) {
    return MASTER_NUMBER_INTERPRETATIONS[number];
  }
  return null;
};
