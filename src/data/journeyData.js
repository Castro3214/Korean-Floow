/**
 * METODO KOREAN FLOW - JORNADA COMPLETA DE 21 DIAS
 * Estruturada nas 3 fases do método:
 * - Fase 1: Despertar & Consciência (Dias 1 — 7)
 * - Fase 2: Fortalecimento & Fluidez (Dias 8 — 14)
 * - Fase 3: Transformação & Hábito (Dias 15 — 21)
 *
 * Cada dia referencia exercícios reutilizáveis do banco central exercisesData.js
 */

import { getExerciseById } from './exercisesData.js';

export const JOURNEY_PHASES = [
  {
    id: 1,
    week: "Dias 1 — 7",
    title: "Despertar & Consciência",
    subtitle: "Movimento consciente, respiração, mobilidade e conexão corporal",
    daysRange: [1, 7],
    color: "#C9B8DC"
  },
  {
    id: 2,
    week: "Dias 8 — 14",
    title: "Fortalecimento & Fluidez",
    subtitle: "Controle, estabilidade, mobilidade e fluidez gradual",
    daysRange: [8, 14],
    color: "#8F78A8"
  },
  {
    id: 3,
    week: "Dias 15 — 21",
    title: "Transformação & Hábito",
    subtitle: "Consistência duradoura e uma rotina sustentável de autocuidado",
    daysRange: [15, 21],
    color: "#C8A45D"
  }
];

export const JOURNEY_DAYS = [
  {
    "id": 1,
    "day": 1,
    "phase": 1,
    "phaseName": "Despertar & Consciência",
    "title": "Respiração & Mobilidade Suave",
    "subtitle": "Conexão com o centro e soltura da coluna",
    "description": "Inicie sua jornada liberando o peso do corpo, ativando a respiração Danjeon e despertando a articulação das vértebras.",
    "duration": "16 min",
    "level": "Iniciante",
    "focus": "Mobilidade da coluna e respiração profunda",
    "category": "Mobilidade",
    "quote": "A serenidade do movimento começa quando desaceleramos a respiração.",
    "mindsetTip": "No lifestyle coreano, a elegância corporal nasce da tranquilidade interna. Não force o corpo; permita que ele se acomode com graça.",
    "exercises": ["respiracao-danjeon", "gato-vaca", "postura-crianca", "roll-down"]
  },
  {
    "id": 2,
    "day": 2,
    "phase": 1,
    "phaseName": "Despertar & Consciência",
    "title": "Despertar do Corpo",
    "subtitle": "Ativação das extremidades e abertura torácica",
    "description": "Movimentos gentis que acordam a circulação da sola dos pés até a linha do peito, dissipando o cansaço matinal ou a fadiga do dia.",
    "duration": "17 min",
    "level": "Iniciante",
    "focus": "Circulação, abertura de peito e flexibilidade costal",
    "category": "Mobilidade",
    "quote": "O corpo desperta quando é tratado com gentileza e atenção.",
    "mindsetTip": "Uma coluna flexível e um peito aberto refletem uma mente que sabe acolher a vida com leveza.",
    "exercises": ["mobilizacao-pes-tornozelos", "gato-vaca", "spine-twist", "abertura-peito"]
  },
  {
    "id": 3,
    "day": 3,
    "phase": 1,
    "phaseName": "Despertar & Consciência",
    "title": "Postura & Presença",
    "subtitle": "Alinhamento axial e respiração tridimensional",
    "description": "Prática com foco na postura ereta, soltando a bacia e ativando a respiração costal para aliviar tensões na lombar.",
    "duration": "16 min",
    "level": "Iniciante",
    "focus": "Alinhamento axial, bacia neutra e respiração 3D",
    "category": "Respiração",
    "quote": "A postura nobre nasce do equilíbrio com a gravidade, não da rigidez.",
    "mindsetTip": "Imagine um fio invisível alongando sua coluna ao céu, enquanto seus pés repousam firmes na terra.",
    "exercises": ["respiracao-costal", "mobilizacao-quadril", "alinhamento-postural", "roll-down"]
  },
  {
    "id": 4,
    "day": 4,
    "phase": 1,
    "phaseName": "Despertar & Consciência",
    "title": "Mobilidade com Fluidez",
    "subtitle": "Ondulações laterais e descompressão lombar",
    "description": "Série com transições suaves que devolvem elasticidade à cintura e descomprimem as costas após horas sentada.",
    "duration": "18 min",
    "level": "Iniciante",
    "focus": "Alongamento lateral, arcos suaves e relaxamento lombar",
    "category": "Mobilidade",
    "quote": "Mova-se como a água que contorna os obstáculos sem perder sua essência.",
    "mindsetTip": "Fluidez é a capacidade de transitar entre posturas com suavidade e sem pressa.",
    "exercises": ["gato-vaca", "mermaid-stretch", "postura-crianca", "soltura-lombar"]
  },
  {
    "id": 5,
    "day": 5,
    "phase": 1,
    "phaseName": "Despertar & Consciência",
    "title": "Centro & Controle",
    "subtitle": "Conexão com o Powerhouse e estabilidade pélvica",
    "description": "Primeiro contato estruturado com o centro de força do Pilates, fortalecendo a cinta abdominal sem dor ou impacto.",
    "duration": "18 min",
    "level": "Iniciante",
    "focus": "Ativação do core profundo e suporte lombar",
    "category": "Pilates",
    "quote": "Quando o centro é forte, os movimentos dos braços e pernas tornam-se leves.",
    "mindsetTip": "A verdadeira força feminina é serena, contida e profunda.",
    "exercises": ["the-hundred-prep", "pelvic-curl", "single-leg-stretch", "ritual-desaceleracao"]
  },
  {
    "id": 6,
    "day": 6,
    "phase": 1,
    "phaseName": "Despertar & Consciência",
    "title": "Alongamento Consciente",
    "subtitle": "Liberação do pescoço, trapézios e cadeia posterior",
    "description": "Sessão restaurativa desenhada para derreter a tensão do pescoço, dos ombros e alongar suavemente a parte de trás das pernas.",
    "duration": "17 min",
    "level": "Iniciante",
    "focus": "Descompressão cervical e flexibilidade dos isquiotibiais",
    "category": "Mobilidade",
    "quote": "Soltar o peso que não nos pertence é o primeiro passo da leveza.",
    "mindsetTip": "Respire nas áreas de maior rigidez e imagine o ar dissolvendo cada nó de tensão.",
    "exercises": ["descompressao-cervical", "spine-twist", "alongamento-posterior", "postura-crianca"]
  },
  {
    "id": 7,
    "day": 7,
    "phase": 1,
    "phaseName": "Despertar & Consciência",
    "title": "Primeiro Ritual Korean Flow",
    "subtitle": "Consolidação da primeira semana e celebração do hábito",
    "description": "Integração dos movimentos da Fase 1 em um fluxo contínuo e harmonioso, consagrando sua primeira semana de consistência.",
    "duration": "18 min",
    "level": "Iniciante",
    "focus": "Ritmo respiratório, ponte pélvica e integração postural",
    "category": "Respiração",
    "quote": "Sete dias de presença constroem a base de uma vida inteira de harmonia.",
    "mindsetTip": "Celebre sua dedicação. Você provou para si mesma que é capaz de reservar tempo para o seu bem-estar.",
    "exercises": ["respiracao-danjeon", "gato-vaca", "pelvic-curl", "ritual-desaceleracao"]
  },
  {
    "id": 8,
    "day": 8,
    "phase": 2,
    "phaseName": "Fortalecimento & Fluidez",
    "title": "Força & Estabilidade",
    "subtitle": "Início da Fase 2 com ativação de glúteos e linha cruzada",
    "description": "Entramos na Fase 2 fortalecendo os estabilizadores da coluna e tonificando os glúteos para uma sustentação firme e elegante.",
    "duration": "19 min",
    "level": "Intermediário",
    "focus": "Estabilidade cruzada no Bird Dog e tônus glúteo",
    "category": "Pilates",
    "quote": "A estabilidade externa nasce da calma interna.",
    "mindsetTip": "Mantenha o foco em movimentos lentos e precisos. A lentidão controlada é a maior prova de força.",
    "exercises": ["bird-dog", "prancha-antebracos", "side-kick-prep", "postura-crianca"]
  },
  {
    "id": 9,
    "day": 9,
    "phase": 2,
    "phaseName": "Fortalecimento & Fluidez",
    "title": "Core & Equilíbrio",
    "subtitle": "Coordenação simultânea e tônus abdominal consciente",
    "description": "Prática focada no fortalecimento harmonioso da musculatura profunda do abdômen, sem flexões forçadas de pescoço.",
    "duration": "19 min",
    "level": "Intermediário",
    "focus": "Coordenação motora, resistência do Powerhouse e soltura lombar",
    "category": "Pilates",
    "quote": "O equilíbrio é a arte de encontrar estabilidade no próprio centro.",
    "mindsetTip": "Sinta seu abdômen como um cinto de seda firme que envolve e protege a sua coluna a cada respiração.",
    "exercises": ["the-hundred-prep", "single-leg-stretch", "double-leg-stretch-prep", "soltura-lombar"]
  },
  {
    "id": 10,
    "day": 10,
    "phase": 2,
    "phaseName": "Fortalecimento & Fluidez",
    "title": "Movimento & Coordenação",
    "subtitle": "Círculos articulares e abertura do peito",
    "description": "Desenvolvimento do controle motor com círculos de perna no ar e extensão da parte superior das costas no Swan Prep.",
    "duration": "20 min",
    "level": "Intermediário",
    "focus": "Mobilidade de quadril, extensão torácica e desenrolar da coluna",
    "category": "Pilates",
    "quote": "Coordenação é mente e corpo conversando em perfeito uníssono.",
    "mindsetTip": "Deixe cada movimento terminar antes de começar o próximo. Não tenha pressa de chegar ao fim.",
    "exercises": ["mobilizacao-quadril", "single-leg-circles", "swan-prep", "roll-down"]
  },
  {
    "id": 11,
    "day": 11,
    "phase": 2,
    "phaseName": "Fortalecimento & Fluidez",
    "title": "Pilates com Fluidez",
    "subtitle": "Massagem da coluna com o Rolling Like a Ball",
    "description": "Sequência dinâmica e agradável que usa o embalo consciente para massagear as costas e conectar o ritmo respiratório.",
    "duration": "20 min",
    "level": "Intermediário",
    "focus": "Controle dinâmico, rolamento sobre as escápulas e alongamento lateral",
    "category": "Pilates",
    "quote": "A fluidez liberta o corpo da rigidez do cotidiano.",
    "mindsetTip": "Sorria durante a prática. O movimento também é uma celebração de alegria e leveza.",
    "exercises": ["the-hundred-prep", "rolling-like-a-ball", "mermaid-stretch", "ritual-desaceleracao"]
  },
  {
    "id": 12,
    "day": 12,
    "phase": 2,
    "phaseName": "Fortalecimento & Fluidez",
    "title": "Mobilidade Profunda",
    "subtitle": "Rotações diagonais no The Saw e alongamento de fáscias",
    "description": "Alívio das tensões mais profundas da lombar e da linha posterior através de rotações conscientes e respiração dilatada.",
    "duration": "19 min",
    "level": "Intermediário",
    "focus": "Rotação da cintura, alongamento isquiotibial e alívio do pescoço",
    "category": "Mobilidade",
    "quote": "Flexibilidade física abre espaço para flexibilidade emocional.",
    "mindsetTip": "Ao alcançar o pé no The Saw, sinta que está estendendo a mão para uma versão mais serena de você mesma.",
    "exercises": ["descompressao-cervical", "spine-twist", "the-saw-prep", "alongamento-posterior"]
  },
  {
    "id": 13,
    "day": 13,
    "phase": 2,
    "phaseName": "Fortalecimento & Fluidez",
    "title": "Controle & Respiração",
    "subtitle": "Extensão dorsal consciente e retorno ao alinhamento",
    "description": "Equilíbrio entre sustentação pélvica e nado de bruços (Swimming Prep) para tonificar as costas e aprofundar o ar nos pulmões.",
    "duration": "18 min",
    "level": "Iniciante",
    "focus": "Fortalecimento paravertebral, expansão costal e tônus postural",
    "category": "Respiração",
    "quote": "Respirar com controle é governar a própria energia.",
    "mindsetTip": "Seu corpo é seu templo sagrado. Trate-o com deferência e paciência.",
    "exercises": ["respiracao-costal", "pelvic-curl", "swimming-prep", "alinhamento-postural"]
  },
  {
    "id": 14,
    "day": 14,
    "phase": 2,
    "phaseName": "Fortalecimento & Fluidez",
    "title": "Ritual de Consistência",
    "subtitle": "Conclusão da Fase 2 e fortalecimento do compromisso",
    "description": "Encerramento das duas primeiras semanas consolidando a estabilidade da bacia e o alinhamento da postura com serenidade.",
    "duration": "21 min",
    "level": "Intermediário",
    "focus": "Estabilidade pélvica completa e resistência suave",
    "category": "Pilates",
    "quote": "Duas semanas de cuidado já transformaram a relação que você tem com seu corpo.",
    "mindsetTip": "Você cruzou a metade da jornada. Sinta a diferença na forma como você respira, caminha e se senta.",
    "exercises": ["bird-dog", "single-leg-circles", "side-kick-prep", "postura-crianca"]
  },
  {
    "id": 15,
    "day": 15,
    "phase": 3,
    "phaseName": "Transformação & Hábito",
    "title": "Corpo Presente",
    "subtitle": "Início da Fase 3: Consciência integral e abertura",
    "description": "Entramos na fase final com presença plena, abrindo o coração e articulando a coluna com maestria e delicadeza.",
    "duration": "19 min",
    "level": "Iniciante",
    "focus": "Presença consciente, abertura peitoral e coluna flexível",
    "category": "Mobilidade",
    "quote": "Estar presente no próprio corpo é o maior presente que você pode se dar.",
    "mindsetTip": "Não se preocupe com o amanhã. Esteja inteira no movimento de agora.",
    "exercises": ["respiracao-danjeon", "abertura-peito", "mermaid-stretch", "roll-down"]
  },
  {
    "id": 16,
    "day": 16,
    "phase": 3,
    "phaseName": "Transformação & Hábito",
    "title": "Força com Leveza",
    "subtitle": "Sustentação na prancha e relaxamento restaurativo",
    "description": "Prática que combina momentos de força isométrica serena com torções relaxantes para nutrir o tônus e a calma.",
    "duration": "20 min",
    "level": "Intermediário",
    "focus": "Força do centro sem rigidez e soltura espinhal",
    "category": "Pilates",
    "quote": "A verdadeira força não grita; ela se sustenta em silêncio.",
    "mindsetTip": "Na prancha, sinta o corpo firme como o bambu coreano: forte na raiz, flexível no topo.",
    "exercises": ["prancha-antebracos", "pelvic-curl", "swimming-prep", "soltura-lombar"]
  },
  {
    "id": 17,
    "day": 17,
    "phase": 3,
    "phaseName": "Transformação & Hábito",
    "title": "Fluidez & Controle",
    "subtitle": "Desafio suave no Teaser Prep e expansão do centro",
    "description": "Desenvolvimento do equilíbrio refinado sobre os ísquios com a preparação do Teaser, acessível e acolhedora.",
    "duration": "21 min",
    "level": "Intermediário",
    "focus": "Equilíbrio em V, contenção abdominal e ritmo fluido",
    "category": "Pilates",
    "quote": "O controle gracioso é a expressão máxima da harmonia corporal.",
    "mindsetTip": "Se perder o equilíbrio no Teaser, acolha o momento com um sorriso e retorne suavemente.",
    "exercises": ["the-saw-prep", "double-leg-stretch-prep", "teaser-prep", "ritual-desaceleracao"]
  },
  {
    "id": 18,
    "day": 18,
    "phase": 3,
    "phaseName": "Transformação & Hábito",
    "title": "Movimento Consciente",
    "subtitle": "Reconexão das raízes aos ombros com cuidado diário",
    "description": "Sequência suave para lubrificar as articulações, restaurar a postura e oxigenar cada célula com carinho.",
    "duration": "18 min",
    "level": "Iniciante",
    "focus": "Articulação dos pés, extensão suave da coluna e descompressão",
    "category": "Mobilidade",
    "quote": "Movimento consciente é autocuidado em ação.",
    "mindsetTip": "Observe como sua coluna se move com muito mais fluidez hoje do que no Dia 1.",
    "exercises": ["mobilizacao-pes-tornozelos", "gato-vaca", "swan-prep", "postura-crianca"]
  },
  {
    "id": 19,
    "day": 19,
    "phase": 3,
    "phaseName": "Transformação & Hábito",
    "title": "Integração",
    "subtitle": "Harmonia entre força, equilíbrio e postura",
    "description": "Reunião de movimentos emblemáticos do Pilates em um fluxo que integra mente, respiração e tônus muscular.",
    "duration": "22 min",
    "level": "Intermediário",
    "focus": "Coordenação global, centro estável e postura em pé equilibrada",
    "category": "Pilates",
    "quote": "Quando todas as partes do corpo trabalham em união, a sensação é de leveza pura.",
    "mindsetTip": "Sinta a firmeza nos pés e a elegância no olhar ao finalizar a prática.",
    "exercises": ["bird-dog", "rolling-like-a-ball", "single-leg-stretch", "alinhamento-postural"]
  },
  {
    "id": 20,
    "day": 20,
    "phase": 3,
    "phaseName": "Transformação & Hábito",
    "title": "Seu Ritual",
    "subtitle": "Autonomia corporal e consolidação do hábito diário",
    "description": "Prática com ritmo acolhedor para você saborear a autonomia conquistada e sentir que o movimento é seu refúgio permanente.",
    "duration": "20 min",
    "level": "Iniciante",
    "focus": "Respiração no Danjeon, abertura das costelas e relaxamento",
    "category": "Respiração",
    "quote": "O movimento não é mais uma obrigação; agora é o seu momento sagrado.",
    "mindsetTip": "Respire com orgulho. Você construiu um hábito que continuará nutrindo sua vida.",
    "exercises": ["respiracao-danjeon", "mermaid-stretch", "soltura-lombar", "ritual-desaceleracao"]
  },
  {
    "id": 21,
    "day": 21,
    "phase": 3,
    "phaseName": "Transformação & Hábito",
    "title": "Korean Flow",
    "subtitle": "A consagração da sua jornada de 21 dias",
    "description": "O ápice do Método Korean Flow: uma prática completa e triunfante que sela sua transformação em postura, calma e consistência.",
    "duration": "22 min",
    "level": "Intermediário",
    "focus": "Celebração do movimento, equilíbrio no centro e alinhamento total",
    "category": "Pilates",
    "quote": "Você completou sua jornada de 21 dias. Este não é o fim, mas o florescer do seu novo ritmo de vida.",
    "mindsetTip": "Coloque a mão sobre o peito e sinta a paz, a força e a graça que agora habitam em você. Parabéns por essa conquista extraordinária.",
    "exercises": ["respiracao-danjeon", "pelvic-curl", "teaser-prep", "roll-down"]
  }
]
;

/**
 * Retorna os dados completos de um dia pelo número do dia (1 a 21)
 */
export function getDayById(dayNumber) {
  const num = parseInt(dayNumber, 10);
  return JOURNEY_DAYS.find(d => d.day === num || d.id === num) || null;
}

/**
 * Retorna a lista de objetos completos dos exercícios de um dia específico
 */
export function getExercisesForDay(dayNumber) {
  const day = getDayById(dayNumber);
  if (!day || !Array.isArray(day.exercises)) return [];

  return day.exercises
    .map(exId => {
      if (typeof exId === 'object' && exId !== null) return exId;
      return getExerciseById(exId);
    })
    .filter(Boolean);
}

/**
 * Retorna os dias filtrados por fase
 */
export function getDaysByPhase(phaseId) {
  return JOURNEY_DAYS.filter(d => d.phase === phaseId);
}