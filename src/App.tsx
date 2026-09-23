import { useState, useRef, useEffect } from 'react';
import { EnvelopeIntro } from './components/EnvelopeIntro';
import { AudioPlayer, type AudioPlayerHandle } from './components/AudioPlayer';
import { HeroSection } from './components/HeroSection';
import { StorySection } from './components/StorySection';
import { TimelineSection } from './components/TimelineSection';
import { LocationSection } from './components/LocationSection';
import { DressCodeSection } from './components/DressCodeSection';
import { GiftsSection } from './components/GiftsSection';
import { RsvpSection } from './components/RsvpSection';
import { FooterSection } from './components/FooterSection';
import { ConviteCardInterativo } from './components/ConviteCardInterativo';
import { Sparkles, Layers } from 'lucide-react';

export function App() {
  // Detecta se a rota atual é /convite2 ou hash #convite2
  const isConvite2Initial = 
    window.location.pathname.includes('/convite2') || 
    window.location.hash.includes('convite2') ||
    new URLSearchParams(window.location.search).get('modelo') === '2';

  const [currentModel, setCurrentModel] = useState<'modelo1' | 'modelo2'>(
    isConvite2Initial ? 'modelo2' : 'modelo1'
  );

  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const audioPlayerRef = useRef<AudioPlayerHandle | null>(null);

  // Sincroniza navegação de histórico / rota
  useEffect(() => {
    const handlePopState = () => {
      const isC2 = window.location.pathname.includes('/convite2') || window.location.hash.includes('convite2');
      setCurrentModel(isC2 ? 'modelo2' : 'modelo1');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const switchModel = (model: 'modelo1' | 'modelo2') => {
    setCurrentModel(model);
    if (model === 'modelo2') {
      window.history.pushState(null, '', '/convite2');
    } else {
      window.history.pushState(null, '', '/');
    }
  };

  const handleOpenEnvelope = () => {
    setIsEnvelopeOpen(true);
    setTimeout(() => {
      audioPlayerRef.current?.playAudio();
    }, 400);
  };

  const handleReopenEnvelope = () => {
    setIsEnvelopeOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-[#FAF7F2]">
      
      {/* SELETOR FLUTUANTE DE APRESENTAÇÃO (PARA O CLIENTE ESCOLHER OU COMPARAR OS 2 MODELOS) */}
      <aside aria-label="Seletor de modelos de convite" className="fixed top-3 left-1/2 -translate-x-1/2 z-50 bg-[#24211E]/90 backdrop-blur-md p-1 rounded-full border border-[#CAA36B]/40 shadow-2xl flex items-center gap-1 text-xs">
        <button
          onClick={() => switchModel('modelo1')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-medium transition-all ${
            currentModel === 'modelo1'
              ? 'bg-[#CAA36B] text-white shadow-xs'
              : 'text-[#ECDCC2] hover:text-white'
          }`}
        >
          <Sparkles className="w-3 h-3" />
          <span>Modelo 1: Landing Page</span>
        </button>

        <button
          onClick={() => switchModel('modelo2')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-medium transition-all ${
            currentModel === 'modelo2'
              ? 'bg-[#CAA36B] text-white shadow-xs'
              : 'text-[#ECDCC2] hover:text-white'
          }`}
        >
          <Layers className="w-3 h-3" />
          <span>Modelo 2: Convite Interativo (Mercado Livre)</span>
        </button>
      </aside>

      {/* ============================================================== */}
      {/* MODELO 2: CONVITE INTERATIVO ESTILO CARTÃO (FOTO DE REFERÊNCIA) */}
      {/* ============================================================== */}
      {currentModel === 'modelo2' ? (
        <div className="pt-10">
          <ConviteCardInterativo />
        </div>
      ) : (
        /* ============================================================== */
        /* MODELO 1: LANDING PAGE COMPLETA DE ALTO PADRÃO                   */
        /* ============================================================== */
        <div className="text-[#24211E] selection:bg-[#ECDCC2] selection:text-[#24211E]">
          {/* Intro Interativa: Envelope 3D com Selo de Cera */}
          <EnvelopeIntro 
            isOpen={isEnvelopeOpen} 
            onOpen={handleOpenEnvelope} 
          />

          {/* Trilha Sonora Flutuante */}
          <AudioPlayer ref={audioPlayerRef} />

          {/* Textura de Fundo Sutil de Papel Linho */}
          <div className="fixed inset-0 bg-paper pointer-events-none opacity-60 z-0" />

          {/* Conteúdo Principal do Convite */}
          <main className="relative z-10 pt-8">
            <HeroSection />
            
            <div className="flex items-center justify-center gap-4 py-4 max-w-xs mx-auto text-[#CAA36B]/40">
              <span className="h-[1px] w-full bg-[#CAA36B]/30" />
              <span className="font-serif text-lg tracking-widest text-[#CAA36B]">❦</span>
              <span className="h-[1px] w-full bg-[#CAA36B]/30" />
            </div>

            <StorySection />
            
            <div className="flex items-center justify-center gap-4 py-4 max-w-xs mx-auto text-[#CAA36B]/40">
              <span className="h-[1px] w-full bg-[#CAA36B]/30" />
              <span className="font-serif text-lg tracking-widest text-[#CAA36B]">❦</span>
              <span className="h-[1px] w-full bg-[#CAA36B]/30" />
            </div>

            <TimelineSection />

            <div className="flex items-center justify-center gap-4 py-4 max-w-xs mx-auto text-[#CAA36B]/40">
              <span className="h-[1px] w-full bg-[#CAA36B]/30" />
              <span className="font-serif text-lg tracking-widest text-[#CAA36B]">❦</span>
              <span className="h-[1px] w-full bg-[#CAA36B]/30" />
            </div>

            <LocationSection />

            <div className="flex items-center justify-center gap-4 py-4 max-w-xs mx-auto text-[#CAA36B]/40">
              <span className="h-[1px] w-full bg-[#CAA36B]/30" />
              <span className="font-serif text-lg tracking-widest text-[#CAA36B]">❦</span>
              <span className="h-[1px] w-full bg-[#CAA36B]/30" />
            </div>

            <DressCodeSection />

            <div className="flex items-center justify-center gap-4 py-4 max-w-xs mx-auto text-[#CAA36B]/40">
              <span className="h-[1px] w-full bg-[#CAA36B]/30" />
              <span className="font-serif text-lg tracking-widest text-[#CAA36B]">❦</span>
              <span className="h-[1px] w-full bg-[#CAA36B]/30" />
            </div>

            <GiftsSection />

            <div className="flex items-center justify-center gap-4 py-4 max-w-xs mx-auto text-[#CAA36B]/40">
              <span className="h-[1px] w-full bg-[#CAA36B]/30" />
              <span className="font-serif text-lg tracking-widest text-[#CAA36B]">❦</span>
              <span className="h-[1px] w-full bg-[#CAA36B]/30" />
            </div>

            <RsvpSection />

            <FooterSection onReopenEnvelope={handleReopenEnvelope} />
          </main>
        </div>
      )}
    </div>
  );
}

export default App;
