import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, Search, HelpCircle, Package, Clock, Handshake, FileText, Gift, DollarSign, MessageSquare, X } from 'lucide-react';
import GridBackground from '../GridBackground';

const categoryIcons: Record<string, React.ReactNode> = {
  formato: <Package className="w-4 h-4" aria-hidden="true" />,
  tempo: <Clock className="w-4 h-4" aria-hidden="true" />,
  participacao: <Handshake className="w-4 h-4" aria-hidden="true" />,
  escopo: <FileText className="w-4 h-4" aria-hidden="true" />,
  resultado: <Gift className="w-4 h-4" aria-hidden="true" />,
  contratacao: <DollarSign className="w-4 h-4" aria-hidden="true" />,
  // Fallbacks para chaves legadas
  geral: <Package className="w-4 h-4" aria-hidden="true" />,
  metodologia: <Clock className="w-4 h-4" aria-hidden="true" />,
  investimento: <DollarSign className="w-4 h-4" aria-hidden="true" />,
  garantia: <Gift className="w-4 h-4" aria-hidden="true" />,
};

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQProps {
  title?: string;
  subtitle?: string;
  categories: Record<string, string>;
  faqData: Record<string, FAQItem[]>;
  className?: string;
  defaultCategory?: string;
  /** Modo escuro ativado/desativado. Padrão: false (Modo Claro) */
  isDark?: boolean;
}

export const FAQ: React.FC<FAQProps> = React.memo(({
  title = "Mais clareza,\nmenos dúvidas",
  subtitle = "Conhecer o processo é tão importante quanto conhecer o resultado. Aqui estão as respostas para as dúvidas mais comuns sobre Alquimia Espacial.",
  categories,
  faqData,
  className = "",
  defaultCategory,
  isDark = false,
}) => {
  const categoryKeys = useMemo(() => Object.keys(categories), [categories]);
  const initialCategory = useMemo(() => {
    return defaultCategory && categories[defaultCategory] 
      ? defaultCategory 
      : categoryKeys[0] || '';
  }, [defaultCategory, categories, categoryKeys]);

  const [activeTab, setActiveTab] = useState<string>(initialCategory);
  const [openIndex, setOpenIndex] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Fecha a busca ao clicar totalmente fora do componente FAQ
  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
        setSearchQuery('');
      }
    }
    if (isSearchOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isSearchOpen]);

  // Foca no input quando a barra de pesquisa abre
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Busca global flexível por palavras-chave em todas as categorias
  const isSearching = isSearchOpen && searchQuery.trim().length > 0;

  const displayedQuestions = useMemo(() => {
    if (isSearching) {
      const rawQuery = searchQuery.toLowerCase().trim();
      // Extrai palavras significativas (com 2 ou mais caracteres)
      const keywords = rawQuery
        .split(/[\s,.;:!?\-/]+/)
        .map((w) => w.trim())
        .filter((w) => w.length >= 2);

      const scoredResults: {
        item: { categoryKey: string; categoryLabel: string; question: string; answer: string; globalIndex: string };
        score: number;
        exactMatch: boolean;
      }[] = [];

      Object.entries(faqData).forEach(([catKey, rawItems]) => {
        const items = (rawItems || []) as FAQItem[];
        const catLabel = categories[catKey] || catKey;

        items.forEach((item, itemIdx) => {
          const questionText = item.question.toLowerCase();
          const answerText = item.answer.toLowerCase();
          const fullText = `${questionText} ${answerText} ${catLabel.toLowerCase()}`;

          // Verifica correspondência exata de frase completa
          const isExact = fullText.includes(rawQuery);

          // Calcula pontuação por palavra-chave encontrada
          let score = 0;
          if (isExact) score += 100;

          keywords.forEach((word) => {
            if (questionText.includes(word)) {
              score += 10; // Maior peso para palavra no título da pergunta
            } else if (answerText.includes(word)) {
              score += 5; // Peso para palavra no texto da resposta
            } else if (catLabel.toLowerCase().includes(word)) {
              score += 2;
            }
          });

          // Se encontrou a frase completa OU pelo menos uma das palavras-chave
          if (score > 0) {
            scoredResults.push({
              item: {
                categoryKey: catKey,
                categoryLabel: catLabel,
                question: item.question,
                answer: item.answer,
                globalIndex: `${catKey}-${itemIdx}`,
              },
              score,
              exactMatch: isExact,
            });
          }
        });
      });

      // Ordena pelos resultados mais relevantes (maior pontuação)
      scoredResults.sort((a, b) => b.score - a.score);
      return scoredResults.map((res) => res.item);
    } else {
      const items = faqData[activeTab] || [];
      const catLabel = categories[activeTab] || activeTab;
      return items.map((item, itemIdx) => ({
        categoryKey: activeTab,
        categoryLabel: catLabel,
        question: item.question,
        answer: item.answer,
        globalIndex: `${activeTab}-${itemIdx}`,
      }));
    }
  }, [isSearching, searchQuery, faqData, categories, activeTab]);

  const toggleAccordion = useCallback((id: string) => {
    setOpenIndex((prev) => (prev === id ? null : id));
  }, []);

  // Renderiza o título destacando as palavras "clareza" e "dúvidas" em itálico na fonte serifada
  const formattedTitle = useMemo(() => {
    let rawLines: string[];
    if (title.includes('\n')) {
      rawLines = title.split('\n');
    } else if (title.includes('Mais clareza, menos dúvidas')) {
      rawLines = ['Mais clareza,', 'menos dúvidas'];
    } else {
      rawLines = [title];
    }

    const regex = /(clareza|dúvidas|duvidas|decidir)/gi;
    return rawLines.map((line, lineIdx) => {
      const parts = line.split(regex);
      return (
        <span key={`line-${lineIdx}`} className="block">
          {parts.map((part, i) => {
            const lower = part.toLowerCase();
            if (lower === 'clareza' || lower === 'dúvidas' || lower === 'duvidas' || lower === 'decidir') {
              return (
                <span
                  key={`title-highlight-${lineIdx}-${i}`}
                  className={`font-serif italic font-normal px-0.5 sm:px-1 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  {part}
                </span>
              );
            }
            return <React.Fragment key={`title-part-${lineIdx}-${i}`}>{part}</React.Fragment>;
          })}
        </span>
      );
    });
  }, [title, isDark]);

  // Renderiza o subtítulo com quebra de linha no desktop para "Aqui estão as respostas"
  const formattedSubtitle = useMemo(() => {
    if (!subtitle) return null;
    const breakPhrase = "Aqui estão as respostas";
    if (subtitle.includes(breakPhrase)) {
      const [firstPart, ...restParts] = subtitle.split(breakPhrase);
      return (
        <>
          {firstPart}
          <br className="hidden md:block" />
          {breakPhrase}{restParts.join(breakPhrase)}
        </>
      );
    }
    return subtitle;
  }, [subtitle]);

  return (
    <section
      ref={containerRef}
      aria-label="Perguntas Frequentes"
      className={`relative w-full pt-24 sm:pt-26 lg:pt-24 pb-8 sm:pb-12 md:py-14 px-3 sm:px-6 lg:px-8 font-sans overflow-hidden transition-colors duration-300 ${
        isDark ? 'bg-black text-white selection:bg-zinc-800 selection:text-white' : 'bg-white text-slate-900 selection:bg-slate-200 selection:text-slate-900'
      } ${className}`}
    >
      
      {/* Grid de fundo ortogonal */}
      <GridBackground isDark={isDark} opacity={isDark ? 0.2 : 0.18} gridSize={40} />

      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
        
        {/* Header Title Section com espaçamento ajustado */}
        <header className="text-center mb-8 sm:mb-10 space-y-3 sm:space-y-4">
          <motion.h2 
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-[26px] sm:text-[28px] md:text-[38px] lg:text-[40px] font-normal font-cargiona tracking-tight leading-[1.08] md:leading-[1.10] ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            {formattedTitle}
          </motion.h2>
          {formattedSubtitle && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className={`text-[13.5px] sm:text-base font-medium tracking-wide leading-relaxed max-w-[360px] sm:max-w-3xl mx-auto px-2 sm:px-0 ${
                isDark ? 'text-zinc-300' : 'text-slate-900'
              }`}
            >
              {formattedSubtitle}
            </motion.p>
          )}
        </header>

        {/* Seção de Categorias ou Barra de Pesquisa expandida */}
        <nav aria-label="Navegação por categorias do FAQ" className="w-full max-w-3xl mb-8 flex justify-center py-1 mx-auto">
          <AnimatePresence mode="wait">
            {!isSearchOpen ? (
              /* Pílulas de Categorias: no mobile círculos com ícones quando inativas, e pílulas sem ícones com texto quando ativas; no desktop pílulas apenas com texto */
              <motion.div
                key="categories-bar"
                role="tablist"
                aria-label="Categorias de perguntas frequentes"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.12 }}
                className="flex flex-nowrap items-center justify-between sm:justify-center gap-1.5 sm:gap-2.5 w-full max-w-full px-1"
              >
                {categoryKeys.map((key) => {
                  const isActive = activeTab === key;
                  return (
                    <button
                      key={`faq-category-btn-${key}`}
                      id={`faq-tab-${key}`}
                      role="tab"
                      aria-selected={isActive}
                      aria-controls="faq-accordion-container"
                      tabIndex={isActive ? 0 : -1}
                      onClick={() => {
                        setActiveTab(key);
                        setOpenIndex(null);
                      }}
                      className={`relative shrink-0 flex items-center justify-center transition-all duration-150 cursor-pointer whitespace-nowrap rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c49a2a] focus-visible:ring-offset-2 ${
                        isDark ? 'focus-visible:ring-offset-black' : 'focus-visible:ring-offset-white'
                      } ${
                        isActive
                          ? 'px-3.5 sm:px-4 py-2 sm:py-2.5 bg-[#c49a2a] text-white shadow-md shadow-[#c49a2a]/25 border border-[#d4af37] font-bold'
                          : isDark 
                            ? 'w-9 h-9 sm:w-auto sm:h-auto px-0 sm:px-3.5 py-0 sm:py-2.5 bg-[#18181c] hover:bg-[#22222a] text-zinc-300 border border-zinc-800 shadow-xs'
                            : 'w-9 h-9 sm:w-auto sm:h-auto px-0 sm:px-3.5 py-0 sm:py-2.5 bg-slate-100 hover:bg-slate-200/90 text-slate-900 border border-slate-200/80 shadow-2xs'
                      }`}
                    >
                      <span className="relative z-10 flex items-center justify-center font-bold uppercase tracking-wider text-xs">
                        {/* No mobile: se NÃO estiver ativo, mostra somente o ícone no círculo */}
                        {!isActive && (
                          <span className="sm:hidden flex items-center justify-center shrink-0">
                            {categoryIcons[key] || <HelpCircle className="w-4 h-4" aria-hidden="true" />}
                          </span>
                        )}
                        {/* Texto: visível no mobile quando ATIVO (sem ícone), e sempre no desktop */}
                        <span className={isActive ? 'inline' : 'hidden sm:inline'}>
                          {categories[key]}
                        </span>
                      </span>
                    </button>
                  );
                })}

                {/* Ícone de Lupa */}
                <button
                  type="button"
                  onClick={() => {
                    setIsSearchOpen(true);
                    setOpenIndex(null);
                  }}
                  aria-label="Buscar em todas as categorias de perguntas"
                  title="Buscar em todas as categorias"
                  className={`shrink-0 w-9 h-9 sm:w-auto sm:h-auto p-0 sm:p-2.5 sm:px-3.5 rounded-full transition-all duration-150 cursor-pointer flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c49a2a] focus-visible:ring-offset-2 ${
                    isDark
                      ? 'bg-[#18181c] hover:bg-[#22222a] border border-zinc-800 text-zinc-300 shadow-xs focus-visible:ring-offset-black'
                      : 'bg-slate-100 hover:bg-slate-200/90 border border-slate-200/80 text-slate-800 shadow-2xs focus-visible:ring-offset-white'
                  }`}
                >
                  <Search className="w-4 h-4" aria-hidden="true" />
                </button>
              </motion.div>
            ) : (
              /* Campo de Busca Expandido */
              <motion.div
                key="search-bar"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="w-full max-w-3xl flex flex-col items-center"
              >
                <div className="relative w-full flex items-center">
                  <Search className={`w-4 h-4 sm:w-5 sm:h-5 absolute left-5 pointer-events-none ${isDark ? 'text-zinc-400' : 'text-slate-400'}`} aria-hidden="true" />
                  
                  <input
                    ref={searchInputRef}
                    type="search"
                    role="searchbox"
                    aria-label="Digite termos para buscar em todas as perguntas"
                    value={searchQuery}
                    onKeyDown={(e) => {
                      if (e.key === 'Escape') {
                        if (searchQuery) {
                          setSearchQuery('');
                        } else {
                          setIsSearchOpen(false);
                        }
                        setOpenIndex(null);
                      }
                    }}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setOpenIndex(null);
                    }}
                    placeholder="Digite termos para buscar em todas as perguntas..."
                    className={`w-full rounded-full py-3.5 sm:py-4 pl-12 sm:pl-14 pr-12 text-sm sm:text-base outline-none transition-all shadow-sm border focus-visible:ring-2 focus-visible:ring-[#c49a2a] focus-visible:ring-offset-2 ${
                      isDark
                        ? 'bg-[#111115]/95 backdrop-blur-md border-zinc-700/80 focus:border-[#c49a2a] text-white placeholder-zinc-500 focus-visible:ring-offset-black'
                        : 'bg-slate-50 backdrop-blur-md border-slate-300 focus:border-[#c49a2a] text-slate-900 placeholder-slate-400 focus-visible:ring-offset-white'
                    }`}
                  />

                  {/* Botão X para limpar / fechar a busca */}
                  <button
                    type="button"
                    onClick={() => {
                      if (searchQuery) {
                        setSearchQuery('');
                      } else {
                        setIsSearchOpen(false);
                      }
                      setOpenIndex(null);
                    }}
                    aria-label={searchQuery ? "Limpar busca" : "Fechar busca"}
                    title={searchQuery ? "Limpar busca" : "Fechar busca"}
                    className={`absolute right-4 p-2 rounded-full transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c49a2a] ${
                      isDark ? 'text-zinc-400 hover:bg-white/10' : 'text-slate-500 hover:bg-slate-200'
                    }`}
                  >
                    <X className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                  </button>
                </div>

                {isSearching && (
                  <div
                    aria-live="polite"
                    className={`w-full text-xs sm:text-sm mt-3 px-3 flex items-center justify-between font-sans ${
                      isDark ? 'text-zinc-400' : 'text-slate-500'
                    }`}
                  >
                    <span>
                      Resultados para "<strong className={isDark ? 'text-white' : 'text-slate-900'}>{searchQuery}</strong>":
                    </span>
                    <span className="font-medium">
                      {displayedQuestions.length} pergunta{displayedQuestions.length !== 1 ? 's' : ''} encontrada{displayedQuestions.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        {/* Questions Accordion List */}
        <div
          id="faq-accordion-container"
          role="region"
          aria-labelledby={isSearching ? undefined : `faq-tab-${activeTab}`}
          className="w-full space-y-3 sm:space-y-4"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab + (isSearching ? `-search-${searchQuery}` : '')}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-3 sm:space-y-4"
            >
              {displayedQuestions.length === 0 ? (
                <div
                  role="status"
                  aria-live="polite"
                  className={`text-center py-12 border border-dashed rounded-2xl p-6 ${
                    isDark ? 'border-zinc-800/80 bg-[#0c0c0e]' : 'border-slate-200 bg-slate-50/50'
                  }`}
                >
                  <HelpCircle className={`w-8 h-8 mx-auto mb-2 ${isDark ? 'text-zinc-600' : 'text-slate-400'}`} aria-hidden="true" />
                  <p className={`text-sm font-medium ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}>
                    Nenhuma pergunta encontrada para sua busca.
                  </p>
                  <p className={`text-xs mt-1 ${isDark ? 'text-zinc-600' : 'text-slate-400'}`}>
                    Tente pesquisar por outro termo ou selecione uma categoria acima.
                  </p>
                </div>
              ) : (
                displayedQuestions.map((item) => {
                  const isOpen = openIndex === item.globalIndex;
                  const questionId = `faq-trigger-${item.globalIndex}`;
                  const panelId = `faq-panel-${item.globalIndex}`;

                  return (
                    <div
                      key={item.globalIndex}
                      className={`border rounded-2xl transition-all duration-200 overflow-hidden ${
                        isDark
                          ? isOpen ? 'bg-[#c49a2a]/15 border-[#c49a2a]/40 shadow-xs' : 'bg-[#0d0d10] border-[#1f1f24] hover:border-zinc-700/60'
                          : isOpen ? 'bg-[#fcf8ec] border-[#c49a2a]/50 shadow-xs' : 'bg-white/90 backdrop-blur-sm border-slate-200/90 hover:border-slate-300 shadow-xs'
                      }`}
                    >
                      <h3 className="m-0 p-0 font-normal">
                        <button
                          id={questionId}
                          type="button"
                          onClick={() => toggleAccordion(item.globalIndex)}
                          aria-expanded={isOpen}
                          aria-controls={panelId}
                          className={`w-full px-6 py-5 flex items-center justify-between text-left gap-4 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c49a2a] focus-visible:ring-inset ${
                            isDark ? 'focus-visible:ring-offset-black' : 'focus-visible:ring-offset-white'
                          }`}
                        >
                          <div className="flex flex-col gap-1.5 flex-1 pr-2">
                            {/* Badge de Categoria ao buscar */}
                            {isSearching && (
                              <span
                                className={`inline-block self-start font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md border ${
                                  isDark 
                                    ? 'text-zinc-400 bg-zinc-800/80 border-zinc-700/50' 
                                    : 'text-slate-600 bg-slate-100 border-slate-200'
                                }`}
                              >
                                {item.categoryLabel}
                              </span>
                            )}
                            <span className={`font-medium text-lg sm:text-xl transition-colors leading-snug ${
                              isDark 
                                ? 'text-zinc-100 group-hover:text-white' 
                                : 'text-slate-900 group-hover:text-black'
                            }`}>
                              {item.question}
                            </span>
                          </div>
                          
                          <div className={`p-1.5 rounded-full flex items-center justify-center transition-all duration-200 shrink-0 ${
                            isDark
                              ? isOpen ? 'text-white' : 'text-zinc-400 group-hover:text-white'
                              : isOpen ? 'text-slate-900' : 'text-slate-400 group-hover:text-slate-900'
                          }`}>
                            {isOpen ? (
                              <Minus className="w-5 h-5" aria-hidden="true" />
                            ) : (
                              <Plus className="w-5 h-5" aria-hidden="true" />
                            )}
                          </div>
                        </button>
                      </h3>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            id={panelId}
                            role="region"
                            aria-labelledby={questionId}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: 'easeInOut' }}
                            className="overflow-hidden"
                          >
                            <div className={`px-6 pb-6 pt-1 text-base sm:text-[17px] leading-relaxed border-t mt-1 ${
                              isDark 
                                ? 'text-zinc-300 border-zinc-800/40' 
                                : 'text-slate-600 border-slate-100'
                            }`}>
                              {item.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Card de Ajuda Centralizado */}
        <footer className="mt-10 sm:mt-12 flex justify-center w-full">
          <div className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all ${
            isDark 
              ? 'bg-[#18181c] text-zinc-300 border border-zinc-800 shadow-xs' 
              : 'bg-slate-100 text-slate-700 border border-slate-200/80 shadow-2xs'
          }`}>
            <MessageSquare className={`w-3.5 h-3.5 ${isDark ? 'text-zinc-400' : 'text-slate-500'}`} aria-hidden="true" />
            <span>Se ainda tiver dúvidas, estamos aqui para ajudar.</span>
          </div>
        </footer>

      </div>
    </section>
  );
});

FAQ.displayName = 'FAQ';

export default FAQ;
