import { FAQItem } from '@/components/cp06-faq/ui/faq-tabs';

// -----------------------------------------------------------------------------
// DADOS OFICIAIS DO FAQ (Alquimia Espacial)
// -----------------------------------------------------------------------------

export const categories: Record<string, string> = {
  formato: "Formato",
  tempo: "Tempo",
  participacao: "Participação",
  escopo: "Escopo",
  resultado: "Resultado",
  contratacao: "Contratação",
};

export const faqData: Record<string, FAQItem[]> = {
  formato: [
    {
      question: "Por que as sessões são vídeos gravados, e não reuniões ao vivo?",
      answer: "Porque boas decisões pedem tempo. Trabalhando de forma assíncrona, você assiste no seu ritmo, revê quantas vezes quiser e responde quando estiver seguro — sem a pressa de uma chamada com hora marcada. E do meu lado, como sou um ateliê digital, sem equipe, esse espaço entre as sessões é o que me permite estudar cada projeto com profundidade, em vez de correr entre vários clientes ao mesmo tempo. A única reunião ao vivo do programa é a de levantamento, logo no início — presencial, se eu estiver na sua região, ou por videochamada, se for à distância."
    },
    {
      question: "Como funciona a comunicação durante o programa?",
      answer: "Direto comigo, pelo WhatsApp, sempre um a um — não trabalho com grupos, porque grupo dispersa e eu preciso manter o foco no criativo de cada cliente. Se outras pessoas estiverem envolvidas na decisão, elas acompanham pela sua própria página do projeto, mas quem me envia o feedback é você."
    },
    {
      question: "O que realmente diferencia esse formato de contratar um arquiteto tradicional?",
      answer: "A forma como as decisões são construídas. Em vez de aprovar um resultado pronto no final, você acompanha o raciocínio por trás de cada escolha ao longo das sessões — o que foi testado, o que foi descartado e por quê. O projeto final não é só um conjunto de desenhos bonitos; é uma direção que você entende de verdade."
    }
  ],
  tempo: [
    {
      question: "Quanto tempo dura o programa?",
      answer: "Em média, entre 4 e 8 semanas — bem mais rápido que um projeto tradicional, que costuma levar meses. Esse prazo existe porque cada sessão precisa amadurecer antes da próxima: eu estudo, testo possibilidades e só então apresento; você assiste, reflete e me devolve o feedback."
    },
    {
      question: "Quando eu recebo a próxima sessão?",
      answer: "Assim que eu recebo o seu feedback, eu estudo o material e entro nos bastidores — muito estudo, testes e conciliação com os outros clientes que tenho no momento. Pode parecer que nada está acontecendo nesse intervalo, mas é aí que o resultado está sendo construído: em média, leva uma semana, podendo variar com a complexidade do projeto. E do seu lado também não tem pressa — você responde quando estiver seguro."
    },
    {
      question: "Posso pausar o processo se acontecer algum imprevisto?",
      answer: "Sim. Se você pausar, retomamos exatamente de onde paramos, sem custo extra — desde que seja a continuação do mesmo projeto. O que não é possível é voltar depois de um tempo com uma ideia completamente diferente e ainda aproveitar as sessões restantes: nesse caso, recomeçamos do zero com a nova ideia, e as sessões adicionais necessárias para concluir entram como um investimento à parte."
    },
    {
      question: "Quanto tempo eu preciso dedicar em cada sessão?",
      answer: "Principalmente o tempo de assistir à apresentação e organizar sua resposta — algo simples, feito no seu ritmo. Todo o trabalho técnico, os estudos e a modelagem ficam comigo, nos bastidores, entre uma sessão e outra."
    }
  ],
  participacao: [
    {
      question: "O Alquimia Espacial é pra mim?",
      answer: "Se você gosta de participar das decisões do seu espaço, valoriza autonomia e não se importa em cuidar da execução depois por conta própria, provavelmente sim. Agora, se o que você busca é alguém acompanhando cada etapa da obra e resolvendo tudo por você, esse programa não é o formato ideal."
    },
    {
      question: "Preciso já saber exatamente o que eu quero antes de começar?",
      answer: "Não. Essa é inclusive uma das situações mais comuns. As primeiras sessões existem justamente para investigar o espaço e revelar prioridades que muitas vezes nem você tinha percebido ainda — o processo ajuda a chegar lá, você não precisa chegar pronto."
    },
    {
      question: "Preciso entender de arquitetura para participar?",
      answer: "Não. Meu trabalho é traduzir as questões técnicas em decisões simples, para que você participe com segurança em cada etapa, sem precisar dominar termos ou desenhos técnicos."
    },
    {
      question: "Posso fazer o processo com meu marido, esposa ou sócio?",
      answer: "Pode, e costuma até ajudar — as sessões podem ser assistidas juntos, e todos com acesso à página do projeto acompanham o material. Se vocês tiverem opiniões diferentes, isso já faz parte do processo: em vez de escolher uma proposta inteira de uma vez, vocês vão comparando possibilidades ao longo das sessões, e é comum que a direção final combine o que cada um preferiu."
    },
    {
      question: "Posso mudar de ideia no meio do processo?",
      answer: "Pequenos ajustes fazem parte — é pra isso que existe o feedback entre uma sessão e outra. O que não dá pra fazer é, lá na frente, descartar tudo o que já construímos até ali e recomeçar do zero: cada sessão é um degrau pra próxima, e é essa continuidade que garante um resultado consistente dentro do prazo combinado."
    }
  ],
  escopo: [
    {
      question: "O que exatamente está incluso no Alquimia Espacial?",
      answer: "Você recebe o anteprojeto do seu espaço: plantas básicas com layout, fluxos, iluminação, mobiliário, proporções e funcionalidade, além de imagens renderizadas e um roadmap guia. E leva algo que não vem em arquivo: a capacidade de decidir o que é melhor pro seu espaço, construída durante a própria cocriação."
    },
    {
      question: "O que não está incluso?",
      answer: "Projeto executivo, elétrico, hidráulico, estrutural e acompanhamento de obra não fazem parte do Alquimia Espacial — meu papel é resolver as questões espaciais do seu projeto, não conduzir a execução dele. Se a sua obra precisar desses serviços, a contratação desses profissionais é por sua conta."
    },
    {
      question: "E se o meu terreno ou imóvel tiver alguma particularidade técnica, como um terreno muito irregular?",
      answer: "Eu sempre indico quando algo pede um levantamento técnico mais preciso — uma topografia profissional, por exemplo. Se você optar por não contratar, a gente adapta: eu trabalho com o que tem disponível, mas a responsabilidade por essa escolha passa a ser sua, já que a recomendação foi feita."
    }
  ],
  resultado: [
    {
      question: "Como eu sei que o resultado final vai realmente representar o que eu quero?",
      answer: "Porque nada no Alquimia Espacial é decidido por acaso: cada escolha nasce de estudo, de possibilidades testadas e comparadas, e do seu próprio feedback ao longo das sessões — o projeto já é validado com você várias vezes antes da entrega. E nos poucos casos em que o resultado final não é exatamente o que você imaginava no início, você sai sabendo que foi o melhor caminho possível dentro do que investigamos juntos."
    },
    {
      question: "O que eu recebo ao final do programa?",
      answer: "Um kit com a documentação do seu anteprojeto, imagens e visualizações do espaço, o Roadmap de Materialização e tudo organizado e acessível na sua página do projeto."
    },
    {
      question: "Depois que o programa termina, eu consigo executar sozinho?",
      answer: "A direção de como e por onde começar eu te entrego — é o que o Roadmap de Materialização resolve. A partir daí, orçar com fornecedores, contratar os profissionais complementares e tocar a execução passa a ser por sua conta, mas com um caminho estruturado, não com dúvidas soltas."
    }
  ],
  contratacao: [
    {
      question: "Como eu recebo uma proposta?",
      answer: "Você preenche o formulário da página. A partir dele, eu analiso o seu projeto individualmente e preparo uma proposta personalizada, com escopo e investimento compatíveis com o seu caso."
    },
    {
      question: "Por que o valor não aparece na página?",
      answer: "Porque cada projeto é diferente. Mostrar um valor fixo geraria comparações antes mesmo de eu entender a complexidade do seu espaço — prefiro analisar seu caso primeiro pra chegar em um investimento que realmente faça sentido pra ele."
    },
    {
      question: "O programa é mais barato que um projeto tradicional?",
      answer: "O investimento costuma ser mais acessível, porque o Alquimia Espacial entrega exatamente o nível de arquitetura que resolve o seu espaço — sem os custos de detalhamento executivo ou acompanhamento que você talvez nem precise. O pagamento também pode ser parcelado no cartão."
    },
    {
      question: "Como funciona o pagamento?",
      answer: "O link de pagamento já vem na própria proposta, com as condições disponíveis. Assim que o pagamento é confirmado, o programa começa oficialmente."
    },
    {
      question: "O que acontece logo depois que eu contratar?",
      answer: "Assim que o pagamento é confirmado, o programa começa oficialmente: você recebe acesso à sua página exclusiva do projeto e marcamos a reunião de levantamento. A partir daí, eu preparo o espaço digitalmente e desenvolvo cada sessão nos bastidores até a entrega final — é aí que se abre e se fecha oficialmente o meu trabalho no projeto."
    }
  ]
};
