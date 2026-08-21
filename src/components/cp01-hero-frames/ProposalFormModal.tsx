import React from 'react';
import { X, ExternalLink, MessageCircle, FileText, Sparkles } from 'lucide-react';

interface ProposalFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenLogin?: () => void;
}

export const ProposalFormModal: React.FC<ProposalFormModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const notionFormUrl = "https://alquimiaespacial.notion.site/36c302780bb881e29a53cd4ee6435a7e";
  const whatsappUrl = "https://wa.me/5571999999999?text=Ol%C3%A1!%20Gostaria%20de%20solicitar%20uma%20proposta%20de%20projeto%20com%20a%20Alquimia%20Espacial.";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-lg bg-neutral-950 border border-neutral-800 rounded-3xl shadow-2xl z-10 overflow-hidden flex flex-col my-auto text-left">
        
        {/* Top Accent Line */}
        <div className="h-1 bg-gradient-to-r from-amber-500/40 via-yellow-400 to-amber-500/40 w-full" />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700 transition-all cursor-pointer z-20"
          aria-label="Fechar"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-6 sm:p-8">
          <div className="mb-6">
            <span className="text-[11px] font-mono uppercase tracking-widest text-amber-400 font-semibold px-2.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 inline-block mb-3">
              Alquimia Espacial
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Solicitar Proposta
            </h3>
            <p className="text-neutral-400 text-xs sm:text-sm mt-1">
              Escolha a melhor opção para nos enviar as informações do seu projeto:
            </p>
          </div>

          {/* Option 1: Direct Notion Form (1 click, zero duplicate fields) */}
          <div className="space-y-3">
            <a
              href={notionFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="w-full p-4 rounded-2xl bg-gradient-to-r from-neutral-900 via-neutral-900 to-neutral-800/80 border border-neutral-800 hover:border-amber-400/50 hover:bg-neutral-850 transition-all flex items-center justify-between group text-left cursor-pointer shadow-lg"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white group-hover:text-amber-300 transition-colors flex items-center gap-1.5">
                    Formulário no Notion
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  </h4>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Preencha o formulário completo e integrado ao nosso CRM.
                  </p>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-amber-300 transition-colors shrink-0 ml-2" />
            </a>

            {/* Option 2: Direct WhatsApp Contact */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="w-full p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 hover:border-emerald-500/50 hover:bg-neutral-900 transition-all flex items-center justify-between group text-left cursor-pointer"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors">
                    Falar via WhatsApp
                  </h4>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Converse diretamente com nossa equipe de projetos.
                  </p>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-emerald-300 transition-colors shrink-0 ml-2" />
            </a>
          </div>

          <div className="mt-6 pt-4 border-t border-neutral-900 text-center">
            <p className="text-[11px] text-neutral-500">
              Resposta garantida em até 24h úteis.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
