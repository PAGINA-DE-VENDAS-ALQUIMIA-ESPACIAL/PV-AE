import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, ShieldCheck } from 'lucide-react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Fecha com a tecla ESC e trava o scroll da página de fundo enquanto o modal estiver aberto
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div className="fixed inset-x-0 top-[88px] sm:top-[98px] bottom-0 z-40 flex items-center justify-center p-3 sm:p-5 md:p-6 pb-4 sm:pb-8">
      {/* Backdrop começa abaixo do cabeçalho fixo para não cobri-lo */}
      <div 
        className="fixed inset-x-0 top-[88px] sm:top-[98px] bottom-0 bg-black/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200" 
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Janela do Modal posicionada confortavelmente abaixo do cabeçalho sem encostar nele */}
      <div className="relative w-full max-w-2xl max-h-full bg-white text-slate-800 rounded-2xl sm:rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] z-10 flex flex-col border border-stone-200/90 overflow-hidden animate-in zoom-in-95 duration-200">

        
        {/* Linha superior de destaque em tom âmbar suave */}
        <div className="h-1 bg-gradient-to-r from-amber-500/50 via-amber-400 to-amber-600/50 w-full shrink-0" />

        {/* Header Fixo com Título em Caixa Alta */}
        <div className="flex items-center justify-between px-5 sm:px-7 py-3.5 sm:py-4 border-b border-stone-100 bg-stone-50/80 shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-700 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4 text-amber-700" />
            </div>
            <div>
              <h2 className="text-xs sm:text-sm font-bold text-slate-900 tracking-tight uppercase leading-snug">
                TERMOS DE SERVIÇO — PROGRAMA ALQUIMIA ESPACIAL

              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-full bg-white border border-slate-200 text-slate-500 hover:text-slate-900 hover:border-slate-300 hover:bg-slate-100 transition-all cursor-pointer shadow-2xs shrink-0 ml-2"
            aria-label="Fechar termos de serviço"
          >
            <X className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
          </button>
        </div>

        {/* Conteúdo com Scroll Suave e Texto Integral Fiel ao Arquivo Original */}
        <div className="p-5 sm:p-7 md:p-8 overflow-y-auto space-y-6 text-xs sm:text-sm leading-relaxed text-slate-600 font-normal">
          
          {/* Apresentação Inicial */}
          <div className="space-y-2.5">
            <p>
              O <strong className="font-semibold text-slate-900">Alquimia Espacial é um programa de co-criação arquitetônica online</strong>, realizado em formato de ateliê digital. O cliente participa da construção da solução e o arquiteto conduz o processo, desde o levantamento inicial até a entrega do anteprojeto.
            </p>
            <p>
              Estes termos existem para deixar claros o formato, o escopo e os combinados do programa. Ao realizar a contratação, o cliente declara estar de acordo com essas condições.
            </p>
          </div>

          <hr className="border-slate-200/80" />

          {/* RESUMO RÁPIDO */}
          <section className="space-y-2.5">
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide">
              RESUMO RÁPIDO
            </h3>
            <ol className="list-decimal pl-5 space-y-2.5 marker:font-semibold marker:text-slate-900">
              <li>
                <strong className="font-semibold text-slate-900">O Alquimia é um ateliê digital, não um escritório tradicional.</strong> O arquiteto trabalha sozinho, com uma quantidade limitada de clientes e uma agenda organizada para preservar a qualidade do trabalho e uma rotina sustentável. Por isso, o cliente tem acompanhamento durante todo o processo, mas não disponibilidade permanente ou respostas imediatas.
              </li>
              <li>
                <strong className="font-semibold text-slate-900">O programa entrega um anteprojeto arquitetônico.</strong> O foco está na criação e definição da arquitetura: organização dos espaços, soluções, estética, conforto, funcionalidade e representação da proposta. O material pode servir como base para a continuidade de projetos complementares futuros com outros profissionais.
              </li>
              <li>
                <strong className="font-semibold text-slate-900">Não estão incluídos projeto executivo, projetos complementares, acompanhamento ou execução de obra, orçamento detalhado, aprovação municipal completa, processos ou medição para financiamento em bancos.</strong> Esses serviços pertencem a outras etapas, exigências e áreas.
              </li>
              <li>
                <strong className="font-semibold text-slate-900">O programa tem quatro sessões com funções específicas.</strong> O cliente participa dando informações, referências e feedbacks; o arquiteto estuda, conduz e desenvolve cada etapa. As decisões não precisam ser tomadas todas de uma vez, mas uma etapa é construída sob a anterior até que seja concluída, não fica aberta indefinidamente.
              </li>
              <li>
                <strong className="font-semibold text-slate-900">O cliente tem tempo para pensar.</strong> As sessões são apresentadas em vídeo gravado e o feedback é enviado depois, por mensagem ou áudio. <strong className="font-semibold text-slate-900">A pressa não faz parte do escopo</strong>: o intervalo entre etapas existe justamente para que os serviços do ateliê sejam sustentáveis, para que o arquiteto possa estudar o projeto com profundidade e o cliente possa refletir bem antes de decidir.
              </li>
              <li>
                <strong className="font-semibold text-slate-900">O projeto tem começo, meio e fim.</strong> Ajustes compatíveis com o desenvolvimento fazem parte do processo. Mudanças que reabram decisões já consolidadas podem exigir uma sessão adicional. <strong className="font-semibold text-slate-900">Depois da aprovação final, qualquer nova alteração é um novo serviço.</strong>
              </li>
            </ol>
          </section>

          <hr className="border-slate-200/80" />

          {/* 1. ATELIÊ DIGITAL DE ARQUITETURA */}
          <section className="space-y-2">
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide">
              1. ATELIÊ DIGITAL DE ARQUITETURA
            </h3>
            <p><strong className="text-slate-900 font-semibold">1.1.</strong> O Alquimia Espacial não é um escritório de arquitetura tradicional. É um ateliê digital conduzido individualmente pelo arquiteto.</p>
            <p><strong className="text-slate-900 font-semibold">1.2.</strong> Essa escolha é intencional: o arquiteto limita a quantidade de projetos para trabalhar com profundidade, manter uma rotina sustentável e fazer o faturamento se adaptar ao ritmo do ateliê.</p>
            <p><strong className="text-slate-900 font-semibold">1.3.</strong> Por isso, o cliente contrata um processo arquitetônico estruturado, e não disponibilidade permanente, atendimento sob demanda ou respostas imediatas.</p>
            <p><strong className="text-slate-900 font-semibold">1.4.</strong> Antes da contratação, o contato tem caráter comercial. O envio de referências, ideias ou mensagens não significa que o projeto já começou nem cria obrigação de atendimento contínuo.</p>
            <p><strong className="text-slate-900 font-semibold">1.5.</strong> Depois da contratação, o projeto entra no fluxo do ateliê e passa a ser conduzido dentro da agenda estabelecida.</p>
          </section>

          <hr className="border-slate-200/80" />

          {/* 2. ENTREGÁVEIS AO CLIENTE */}
          <section className="space-y-2">
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide">
              2. ENTREGÁVEIS AO CLIENTE
            </h3>
            <p><strong className="text-slate-900 font-semibold">2.1.</strong> O cliente recebe um <strong className="font-semibold text-slate-900">anteprojeto arquitetônico</strong>, desenvolvido a partir de suas necessidades, referências, limitações e objetivos.</p>
            <p><strong className="text-slate-900 font-semibold">2.2.</strong> A entrega inclui plantas de implantação e cobertura, cortes, fachada, layout, imagens renderizadas e criações necessárias para compreender a solução proposta.</p>
            <p><strong className="text-slate-900 font-semibold">2.3.</strong> O cliente recebe também um <strong className="font-semibold text-slate-900">roadmap orientador</strong>, um mapa visual e ilustrativo dos próximos passos, sem caráter de cronograma, orçamento ou planejamento de obra.</p>
            <p><strong className="text-slate-900 font-semibold">2.4.</strong> O programa não inclui projeto executivo, detalhamento construtivo ou projetos complementares, como estrutural, elétrico, hidráulico, luminotécnico executivo ou outros necessários à execução.</p>
            <p><strong className="text-slate-900 font-semibold">2.5.</strong> Quando necessário, podem ser desenvolvidos <strong className="font-semibold text-slate-900">croquis conceituais de sistemas</strong>, para verificar a viabilidade das ideias e orientar futuros profissionais, sem substituir os respectivos projetos técnicos.</p>
          </section>

          <hr className="border-slate-200/80" />

          {/* 3. COMO O PROCESSO FUNCIONA */}
          <section className="space-y-2">
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide">
              3. COMO O PROCESSO FUNCIONA
            </h3>
            <p><strong className="text-slate-900 font-semibold">3.1.</strong> O programa começa com um levantamento inicial (presencial ou online) e segue por quatro sessões, cada uma com uma função específica.</p>
            <p><strong className="text-slate-900 font-semibold">3.2.</strong> As duas primeiras sessões exploram possibilidades. As duas últimas refinam e consolidam a solução escolhida.</p>
            <p><strong className="text-slate-900 font-semibold">3.3.</strong> O cliente participa ativamente, fornecendo sua visão, informações, referências, preferências e feedbacks.</p>
            <p><strong className="text-slate-900 font-semibold">3.4.</strong> O arquiteto utiliza esse feedback como base para realizar as análises necessárias — espaciais, técnicas, legislativas e contextuais — e desenvolver a etapa seguinte.</p>
            <p><strong className="text-slate-900 font-semibold">3.5.</strong> Cada sessão tem seu próprio momento de decisão. O cliente pode enviar novas referências e ideias durante o processo, mas isso não significa que todas as etapas anteriores permaneçam abertas.</p>
            <p><strong className="text-slate-900 font-semibold">3.6.</strong> Depois que uma direção é validada, ela passa a orientar as etapas seguintes. Pequenos ajustes fazem parte do processo; uma mudança substancial de direção pode exigir uma sessão adicional.</p>
            <p><strong className="text-slate-900 font-semibold">3.7.</strong> O cliente não precisa saber conduzir um projeto de arquitetura. Essa é justamente a função do arquiteto. Cabe ao cliente participar, refletir e dar feedback; cabe ao arquiteto interpretar essas informações e conduzir o processo.</p>
          </section>

          <hr className="border-slate-200/80" />

          {/* 4. COMUNICAÇÃO E RITMO DE TRABALHO */}
          <section className="space-y-2">
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide">
              4. COMUNICAÇÃO E RITMO DE TRABALHO
            </h3>
            <p><strong className="text-slate-900 font-semibold">4.1.</strong> As sessões são apresentadas em vídeos gravados, disponibilizados pelo YouTube na página exclusiva do projeto.</p>
            <p><strong className="text-slate-900 font-semibold">4.2.</strong> O cliente assiste com calma, pode pausar, fazer anotações e pesquisar referências antes de enviar seu feedback.</p>
            <p><strong className="text-slate-900 font-semibold">4.3.</strong> O feedback pode ser enviado por respostas aos comentários do vídeo, mensagem ou áudio e deve reunir as observações necessárias para a próxima etapa.</p>
            <p><strong className="text-slate-900 font-semibold">4.4.</strong> A comunicação do projeto acontece pelo WhatsApp 1:1, diretamente com o arquiteto. Preservando a sustentabilidade do processo criativo do programa, o arquiteto não participa de grupos com familiares ou outros envolvidos.</p>
            <p><strong className="text-slate-900 font-semibold">4.5.</strong> O cliente pode conversar sobre o projeto com outras pessoas e reunir suas opiniões, tendo a responsabilidade de consolidar essas informações antes de enviá-las ao arquiteto.</p>
            <p><strong className="text-slate-900 font-semibold">4.6.</strong> O intervalo entre uma sessão e outra costuma ser de aproximadamente uma semana, mas pode variar conforme o projeto e a alta demanda da agenda do ateliê.</p>
            <p><strong className="text-slate-900 font-semibold">4.7.</strong> O intervalo não representa falta de acompanhamento. É o tempo necessário para estudar, processar as informações e produzir a próxima etapa com atenção e qualidade.</p>
            <p><strong className="text-slate-900 font-semibold">4.8.</strong> O arquiteto não trabalha com ligações inesperadas nem com atendimento imediato. As mensagens serão respondidas dentro do fluxo normal do ateliê.</p>
          </section>

          <hr className="border-slate-200/80" />

          {/* 5. ANTEPROJETO, LEGISLAÇÃO E OBRA */}
          <section className="space-y-2">
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide">
              5. ANTEPROJETO, LEGISLAÇÃO E OBRA
            </h3>
            <p><strong className="text-slate-900 font-semibold">5.1.</strong> O arquiteto considera, no desenvolvimento do anteprojeto, a legislação e os parâmetros urbanísticos aplicáveis ao imóvel pela prefeitura vigente.</p>
            <p><strong className="text-slate-900 font-semibold">5.2.</strong> O Alquimia Espacial não é contratado como projeto executivo ou legal municipal completo. Cada prefeitura pode exigir padrões próprios de desenho, carimbo, penas, layers, documentos e procedimentos que não fazem parte do escopo.</p>
            <p><strong className="text-slate-900 font-semibold">5.3.</strong> Se houver erro do arquiteto na aplicação de um parâmetro urbanístico relevante para a concepção, o projeto será corrigido dentro do escopo contratado.</p>
            <p><strong className="text-slate-900 font-semibold">5.4.</strong> Diante das diferentes exigências dos mais de 5 mil municípios brasileiros, adequações gráficas ou administrativas para aprovação na prefeitura, inclusive quando houver exigência de atuação local, deverão ser feitas por profissional local, a partir do anteprojeto.</p>
            <p><strong className="text-slate-900 font-semibold">5.5.</strong> O programa também não inclui acompanhamento ou execução de obra, visitas técnicas periódicas, medições para financiamento ou envio de medições para instituições financeiras como a Caixa.</p>
            <p><strong className="text-slate-900 font-semibold">5.6.</strong> Quando o cliente precisar desses serviços, deverá contratar profissional habilitado para executá-los conforme as exigências de cada etapa.</p>
            <p><strong className="text-slate-900 font-semibold">5.7.</strong> O programa não inclui orçamento nem garantia de custo da obra. Cabe ao cliente avaliar sua capacidade de investimento e decidir quando e como executar o projeto.</p>
            <p><strong className="text-slate-900 font-semibold">5.8.</strong> A obra envolve projetos complementares, como estrutura e instalações, mão de obra, materiais, aprovações, gerenciamento e outras etapas. O Alquimia Espacial atua em uma parte específica: <strong className="font-semibold text-slate-900">transformar necessidades e ideias em uma solução arquitetônica clara e bem pensada</strong>.</p>
          </section>

          <hr className="border-slate-200/80" />

          {/* 6. IMÓVEL E INFORMAÇÕES DO CLIENTE */}
          <section className="space-y-2">
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide">
              6. IMÓVEL E INFORMAÇÕES DO CLIENTE
            </h3>
            <p><strong className="text-slate-900 font-semibold">6.1.</strong> O cliente é responsável por fornecer corretamente as informações, medidas, fotos, vídeos e demais dados necessários ao desenvolvimento do projeto.</p>
            <p><strong className="text-slate-900 font-semibold">6.2.</strong> Quando não houver levantamento topográfico, o arquiteto poderá utilizar dados de referência disponíveis em bases públicas, complementados pelas informações fornecidas pelo cliente.</p>
            <p><strong className="text-slate-900 font-semibold">6.3.</strong> Esses dados não substituem um levantamento topográfico profissional. Em terrenos com desníveis relevantes, é recomendável que o cliente providencie esse levantamento antes de iniciar o projeto.</p>
            <p><strong className="text-slate-900 font-semibold">6.4.</strong> Se informações posteriormente fornecidas ou verificadas forem diferentes das utilizadas no projeto, eventuais alterações serão avaliadas conforme o estágio do trabalho e a causa da diferença.</p>
          </section>

          <hr className="border-slate-200/80" />

          {/* 7. PAGAMENTO, MUDANÇAS E ENCERRAMENTO */}
          <section className="space-y-2">
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide">
              7. PAGAMENTO, MUDANÇAS E ENCERRAMENTO
            </h3>
            <p><strong className="text-slate-900 font-semibold">7.1.</strong> O programa começa oficialmente após a confirmação do pagamento. As condições de sinal e parcelamento são as apresentadas na proposta e no checkout.</p>
            <p><strong className="text-slate-900 font-semibold">7.2.</strong> O comprovante enviado pelo WhatsApp serve para formalizar a comunicação do pagamento e liberar o acesso à página do projeto, em até 24 horas.</p>
            <p><strong className="text-slate-900 font-semibold">7.3.</strong> Nas contratações realizadas online, o cliente poderá exercer o direito de arrependimento no prazo de 7 (sete) dias, nos termos da legislação aplicável. Após esse prazo, a desistência por iniciativa do cliente não gera devolução automática dos valores pagos. Caso o processo já tenha sido iniciado e o cliente queira interrompê-lo, as partes poderão buscar uma solução amigável, considerando o estágio do trabalho e os serviços já realizados.</p>
            <p><strong className="text-slate-900 font-semibold">7.4.</strong> O atraso no pagamento de qualquer parcela poderá suspender o andamento do projeto e o acesso às etapas ainda não disponibilizadas até a regularização do pagamento.</p>
            <p><strong className="text-slate-900 font-semibold">7.5.</strong> As vagas são limitadas por decisão de capacidade. O arquiteto não aumenta indefinidamente a quantidade de clientes para atender à demanda.</p>
            <p><strong className="text-slate-900 font-semibold">7.6.</strong> O prazo de referência do programa é de aproximadamente quatro a oito semanas, podendo variar conforme a participação do cliente, a complexidade do projeto e a agenda do ateliê.</p>
            <p><strong className="text-slate-900 font-semibold">7.7.</strong> O cliente deve fornecer os feedbacks das sessões, que normalmente ocorrem em intervalos semanais. Caso permaneça duas semanas sem responder, sem comunicar uma pausa no projeto, o projeto poderá ser considerado encerrado no estado em que estiver.</p>
            <p><strong className="text-slate-900 font-semibold">7.8.</strong> Ajustes pontuais e compatíveis com a etapa em andamento fazem parte do processo.</p>
            <p><strong className="text-slate-900 font-semibold">7.9.</strong> Se o cliente quiser reabrir uma decisão já consolidada e isso exigir uma nova etapa de exploração, poderá contratar uma sessão adicional. O valor de referência de cada sessão adicional é <strong className="font-semibold text-slate-900">1/4 do valor total do programa</strong>.</p>
            <p><strong className="text-slate-900 font-semibold">7.10.</strong> Se a mudança exigir reconstruir substancialmente o projeto ou reiniciar o processo, poderá ser necessária uma nova contratação.</p>
            <p><strong className="text-slate-900 font-semibold">7.11.</strong> Ao final, o cliente aprova o projeto por meio do formulário disponível na página do projeto. A aprovação encerra o ciclo contratado.</p>
            <p><strong className="text-slate-900 font-semibold">7.12.</strong> Depois do encerramento, alterações, ampliações ou novas etapas de desenvolvimento são novos serviços, sujeitos à disponibilidade e às condições vigentes.</p>
          </section>

          <hr className="border-slate-200/80" />

          {/* 8. CONTINUIDADE E RESPONSABILIDADE */}
          <section className="space-y-2">
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide">
              8. CONTINUIDADE E RESPONSABILIDADE
            </h3>
            <p><strong className="text-slate-900 font-semibold">8.1.</strong> O cliente pode utilizar o anteprojeto como base para continuar o desenvolvimento, executar a obra ou contratar outros profissionais.</p>
            <p><strong className="text-slate-900 font-semibold">8.2.</strong> O cliente pode inclusive contratar outro arquiteto para modificar ou desenvolver uma nova solução a partir do material entregue.</p>
            <p><strong className="text-slate-900 font-semibold">8.3.</strong> O arquiteto do Alquimia Espacial não responde por alterações, detalhamentos, projetos ou decisões realizadas posteriormente por terceiros.</p>
            <p><strong className="text-slate-900 font-semibold">8.4.</strong> A responsabilidade técnica de cada profissional corresponde às atividades que efetivamente realizar e registrar. O RRT do Alquimia Espacial não se estende automaticamente ao trabalho posterior de outros profissionais.</p>
            <p><strong className="text-slate-900 font-semibold">8.5.</strong> O arquiteto poderá utilizar imagens, plantas, renders e outros materiais do projeto para divulgar seu trabalho, preservando a privacidade do cliente e evitando, sempre que possível, informações que permitam sua identificação.</p>
            <p><strong className="text-slate-900 font-semibold">8.6.</strong> Ao realizar o pagamento, o cliente declara ter lido, compreendido e aceitado estes termos, juntamente com as condições específicas apresentadas na proposta e no checkout.</p>
            <p><strong className="text-slate-900 font-semibold">8.7.</strong> O aceite destes termos não elimina direitos assegurados pela legislação aplicável.</p>
          </section>

        </div>

      </div>
    </div>,
    document.body
  );
};
