import React from 'react';
import {
  Ruler,
  Camera,
  PenTool,
  Route,
  Users,
  Lightbulb,
  Box,
} from 'lucide-react';
import { CardItem } from './ui/expanding-cards';

// 1. Imports oficiais, únicos e imutáveis da pasta assets/images/
import card1AlquimiaImg from '@assets/images/Card 1 - Alquimia Espacial.png';
import card2TradicionalImg from '@assets/images/Card 2 - Projetos Tradicionais.png';
import entregavel1PlantasImg from '@assets/images/Entregável 1 - Plantas.png';
import entregavel2RendersImg from '@assets/images/Entregável 2 -Renders.png';
import entregavel3CroquisImg from '@assets/images/Entregável 3 - Croquis 2.png';
import entregavel4RoadmapImg from '@assets/images/Entregável 4 - Roadmap.png';
import entregavel5CocriacaoImg from '@assets/images/Entregável 5 - Cocriação.png';
import entregavel6DecisoesImg from '@assets/images/Entregável 6 - Decisões Conscientes.png';
import entregavel7ConscienciaImg from '@assets/images/Entregável 7 - Consciência Espacial.png';

// 2. Imagens dos Cards de Alinhamento
export const ALINHAMENTO_IMAGES = {
  alquimia: card1AlquimiaImg,
  tradicional: card2TradicionalImg,
} as const;

// 3. Coleção Oficial dos 7 Entregáveis (com metadados e imagem vinculada)
export const ENTREGAVEIS_OFERTA: CardItem[] = [
  {
    id: "plantas-arquitetonicas",
    title: "Plantas Arquitetônicas",
    badge: "O QUE VOCÊ RECEBE",
    description:
      "Plantas de layout, implantação, cobertura, cortes, fachadas e vistas explicativas que registram as principais decisões do projeto. Elas orientam a compreensão da arquitetura, mas não substituem projetos executivos ou complementares.",
    imgSrc: entregavel1PlantasImg,
    icon: React.createElement(Ruler, { className: "w-5 h-5" }),
  },
  {
    id: "imagens-realistas",
    title: "Imagens Realistas",
    badge: "O QUE VOCÊ RECEBE",
    description:
      "Visualizações em alta qualidade que permitem perceber materiais, iluminação, proporções e atmosfera dos ambientes antes da obra começar. Seu objetivo é facilitar decisões e alinhar expectativas, não representar todos os detalhes construtivos.",
    imgSrc: entregavel2RendersImg,
    icon: React.createElement(Camera, { className: "w-5 h-5" }),
  },
  {
    id: "croquis-conceituais",
    title: "Croquis Conceituais",
    badge: "O QUE VOCÊ RECEBE",
    description:
      "Diagramas explicativos que revelam fluxos, relações espaciais, estratégias construtivas e o raciocínio por trás das escolhas arquitetônicas. Não são projetos complementares, mas instrumentos para compreender a lógica do projeto antes da execução.",
    imgSrc: entregavel3CroquisImg,
    icon: React.createElement(PenTool, { className: "w-5 h-5" }),
  },
  {
    id: "roadmap-materializacao",
    title: "Roadmap Guia",
    badge: "O QUE VOCÊ RECEBE",
    description:
      "Um guia que organiza tudo o que foi definido durante o programa e indica os próximos passos para transformar o projeto em realidade. Ele orienta a continuidade do processo, mas não substitui cronogramas de obra nem gerenciamento da execução.",
    imgSrc: entregavel4RoadmapImg,
    icon: React.createElement(Route, { className: "w-5 h-5" }),
  },
  {
    id: "co-criacao-arquitetonica",
    title: "Processo de Cocriação",
    badge: "O QUE VOCÊ CONQUISTA",
    description:
      "Você participa ativamente das decisões estratégicas e compreende os motivos por trás de cada solução desenvolvida. O resultado é um projeto que reflete suas necessidades sem abrir mão da coerência arquitetônica construída ao longo da jornada.",
    imgSrc: entregavel5CocriacaoImg,
    icon: React.createElement(Users, { className: "w-5 h-5" }),
  },
  {
    id: "clareza-decidir",
    title: "Decisões Conscientes",
    badge: "O QUE VOCÊ CONQUISTA",
    description:
      "Após a cocriação, você ganha total clareza para escolher os melhores materiais e fornecedores na hora da compra, garantindo decisões autônomas e consciente para a execução do projeto.",
    imgSrc: entregavel6DecisoesImg,
    icon: React.createElement(Lightbulb, { className: "w-5 h-5" }),
  },
  {
    id: "consciencia-espacial",
    title: "Consciência Espacial",
    badge: "O QUE VOCÊ CONQUISTA",
    description:
      "Sem acompanhamento de obra, você conquista total autonomia para executar por conta própria. Compreender a lógica do espaço garante a firmeza necessária para não deixar ninguém alterar o projeto.",
    imgSrc: entregavel7ConscienciaImg,
    icon: React.createElement(Box, { className: "w-5 h-5" }),
  },
];

// 4. Tópicos de Alinhamento de Expectativas
export const ALQUIMIA_TOPICS = [
  {
    title: 'Quer clareza antes de construir',
    desc: 'Quer entender seu espaço, organizar suas ideias e definir um caminho antes de iniciar a obra.',
  },
  {
    title: 'Deseja participar das decisões',
    desc: 'Prefere construir o projeto junto e compreender o motivo de cada escolha.',
  },
  {
    title: 'Busca autonomia para executar',
    desc: 'Quer um direcionamento seguro para conduzir sua obra por etapas com mais confiança.',
  },
  {
    title: 'Valoriza o essencial bem planejado',
    desc: 'Entende que boas decisões no início evitam desperdícios e permitem construir dentro da sua realidade.',
  },
];

export const TRADICIONAL_TOPICS = [
  {
    title: 'Busca um projeto executivo completo',
    desc: 'Precisa de todos os detalhamentos técnicos para uma execução altamente planejada.',
  },
  {
    title: 'Precisa de acompanhamento de obra',
    desc: 'Deseja suporte presencial, gerenciamento ou fiscalização durante a construção.',
  },
  {
    title: 'Quer integrar vários profissionais',
    desc: 'Busca uma equipe completa envolvendo arquitetura, estrutura, instalações e outros complementares.',
  },
  {
    title: 'Possui maior investimento para detalhamento',
    desc: 'Valoriza uma entrega mais extensa, com maior nível de documentação e aprofundamento técnico.',
  },
];
