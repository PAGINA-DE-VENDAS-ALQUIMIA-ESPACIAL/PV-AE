import React, { useState, useEffect, useRef } from 'react';
import { X, Lock, ArrowRight, Sparkles, UserCheck, UserPlus, LogIn } from 'lucide-react';

interface ClientPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRequestProposal: () => void;
}

export const ClientPortalModal: React.FC<ClientPortalModalProps> = ({ isOpen, onClose, onRequestProposal }) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('register');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogged, setIsLogged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const authTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (authTimerRef.current) {
        clearTimeout(authTimerRef.current);
      }
    };
  }, []);

  if (!isOpen) return null;

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (authTimerRef.current) clearTimeout(authTimerRef.current);
    authTimerRef.current = setTimeout(() => {
      setIsLoading(false);
      setIsLogged(true);
    }, 1000);
  };

  const handleGoogleAuth = () => {
    setIsLoading(true);
    if (authTimerRef.current) clearTimeout(authTimerRef.current);
    authTimerRef.current = setTimeout(() => {
      setIsLoading(false);
      setIsLogged(true);
    }, 1000);
  };

  const handleReset = () => {
    setIsLogged(false);
    setName('');
    setEmail('');
    setPassword('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity animate-in fade-in duration-300" 
        onClick={handleReset}
      />

      {/* Modal Box */}
      <div className="relative w-full max-w-md bg-neutral-950 border border-neutral-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.95)] z-10 overflow-hidden text-left my-auto">
        {/* Subtle top indicator line */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-neutral-800 via-neutral-400 to-neutral-800" />

        {/* Close Button */}
        <button
          type="button"
          onClick={handleReset}
          className="absolute top-5 right-5 p-2 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700 transition-all cursor-pointer z-20"
          aria-label="Fechar portal"
        >
          <X className="w-5 h-5" />
        </button>

        {!isLogged ? (
          <div>
            {/* Header */}
            <div className="mb-5">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono uppercase tracking-widest mb-1.5 font-medium">
                <Lock className="w-3.5 h-3.5" />
                <span>docto-espacial • Portal do Cliente</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Espaço de Co-criação
              </h3>
              <p className="text-neutral-400 text-xs sm:text-sm mt-1">
                Acesse ou crie sua conta para acompanhar sua proposta e visualizar seus arquivos de projeto.
              </p>

              {/* Login / Register Tabs */}
              <div className="mt-4 grid grid-cols-2 gap-1 p-1 rounded-xl bg-neutral-900 border border-neutral-800">
                <button
                  type="button"
                  onClick={() => setActiveTab('register')}
                  className={`py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    activeTab === 'register'
                      ? 'bg-neutral-800 text-white border border-neutral-700'
                      : 'text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Criar Conta</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('login')}
                  className={`py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    activeTab === 'login'
                      ? 'bg-neutral-800 text-white border border-neutral-700'
                      : 'text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Já sou Cliente</span>
                </button>
              </div>
            </div>

            {/* Google Fast Auth Button */}
            <div className="mb-4">
              <button
                type="button"
                onClick={handleGoogleAuth}
                disabled={isLoading}
                className="w-full py-2.5 px-4 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-white text-xs font-medium flex items-center justify-center gap-2.5 transition-all cursor-pointer hover:bg-neutral-850"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z" />
                  <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z" />
                  <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 10.8 0 12.5s.7 2.8 1.9 5.2l3.7-2.9z" />
                  <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16c1.8 3.7 5.6 7 10.1 7z" />
                </svg>
                <span>Continuar com o Google</span>
              </button>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-neutral-800" />
                </div>
                <div className="relative flex justify-center text-[10px] uppercase font-mono tracking-wider text-neutral-500 bg-neutral-950 px-2">
                  <span>ou com e-mail</span>
                </div>
              </div>
            </div>

            {/* Email / Password Form */}
            <form onSubmit={handleAuth} className="space-y-3.5">
              {activeTab === 'register' && (
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Seu nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs placeholder-neutral-500 focus:outline-none focus:border-neutral-500 transition-all"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  E-mail
                </label>
                <input
                  type="email"
                  required
                  placeholder="seuemail@exemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs placeholder-neutral-500 focus:outline-none focus:border-neutral-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Senha {activeTab === 'register' && '(Crie uma senha)'}
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs placeholder-neutral-500 focus:outline-none focus:border-neutral-500 transition-all"
                />
              </div>

              <div className="pt-2 flex flex-col gap-3">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 rounded-xl bg-white hover:bg-neutral-200 text-black font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
                >
                  {isLoading ? (
                    <span>Processando...</span>
                  ) : (
                    <>
                      <span>{activeTab === 'register' ? 'Criar Minha Conta' : 'Acessar Espaço'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <div className="text-center pt-2 border-t border-neutral-900">
                  <p className="text-[11px] text-neutral-400">
                    Quer solicitar um projeto antes de cadastrar?
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onRequestProposal();
                    }}
                    className="text-white hover:underline text-xs font-semibold mt-1 inline-flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <span>Preencher formulário de proposta</span>
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  </button>
                </div>
              </div>
            </form>
          </div>
        ) : (
          /* LOGGED IN WELCOME VIEW */
          <div className="py-4 text-center animate-in zoom-in-95 duration-300">
            <div className="w-12 h-12 rounded-full bg-neutral-900 border border-neutral-700 flex items-center justify-center mx-auto mb-4 text-emerald-400">
              <UserCheck className="w-6 h-6" />
            </div>

            <h3 className="text-xl font-bold text-white mb-2">
              Bem-vindo ao Espaço de Co-criação!
            </h3>

            <p className="text-neutral-400 text-xs sm:text-sm max-w-sm mx-auto leading-relaxed mb-6">
              Seu portal <strong className="text-white">docto-espacial</strong> foi ativado. Sua proposta personalizada e ambiente de co-criação estão prontos.
            </p>

            <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 text-left mb-6 space-y-2 text-xs">
              <div className="flex justify-between text-neutral-400">
                <span>Status da Conta:</span>
                <span className="text-emerald-400 font-mono font-semibold">Ativo / Em Análise</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Usuário Cadastrado:</span>
                <span className="text-white font-mono">{email || 'cliente@alquimia.com'}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="w-full py-3 px-4 rounded-xl border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700 text-xs font-semibold transition-all cursor-pointer"
            >
              <span>Sair do Portal</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

