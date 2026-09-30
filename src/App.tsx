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
import { LivretoInterativo } from './components/LivretoInterativo';
import { Sparkles, Layers, BookOpen } from 'lucide-react';

export function App() {
  const getInitialModel = (): 'modelo1' | 'modelo2' | 'modelo3' => {
    const path = window.location.pathname;
    const hash = window.location.hash;
    const params = new URLSearchParams(window.location.search);
    
    if (path.includes('/convite1') || hash.includes('convite1') || params.get('modelo') === '1') {
      return 'modelo1';
    }
    if (path.includes('/convite2') || hash.includes('convite2') || params.get('modelo') === '2') {
      return 'modelo2';
    }
    // Padrão: Modelo 3 (Novo Livreto Interativo)
    return 'modelo3';
  };

  const [currentModel, setCurrentModel] = useState<'modelo1' | 'modelo2' | 'modelo3'>(getInitialModel);
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioPlayerRef = useRef<AudioPlayerHandle | null>(null);

  // Sincroniza navegação de histórico / rota
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (path.includes('/convite1') || hash.includes('convite1')) {
        setCurrentModel('modelo1');
      } else if (path.includes('/convite2') || hash.includes('convite2')) {
        setCurrentModel('modelo2');
      } else {
        setCurrentModel('modelo3');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Travar o scroll da página enquanto o envelope estiver fechado no Modelo 1
  useEffect(() => {
    if (!isEnvelopeOpen && currentModel === 'modelo1') {
      document.body.style.overflow = 'hidden';
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isEnvelopeOpen, currentModel]);

  const switchModel = (model: 'modelo1' | 'modelo2' | 'modelo3') => {
    setCurrentModel(model);
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (model === 'modelo3') {
      window.history.pushState(null, '', '/');
    } else if (model === 'modelo2') {
      window.history.pushState(null, '', '/convite2');
    } else {
      window.history.pushState(null, '', '/convite1');
    }
  };

  const handleOpenEnvelope = () => {
    setIsEnvelopeOpen(true);
    document.body.style.overflow = '';
    window.scrollTo({ top: 0, behavior: 'instant' });
    setTimeout(() => {
      audioPlayerRef.current?.playAudio();
    }, 400);
  };

  const handleReopenEnvelope = () => {
    setIsEnvelopeOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <div className="relative min-h-screen bg-[#FAF7F2]">
      
      {/* Player de Áudio Global sincronizado com a música "Pra Você Guardei o Amor" */}
      <AudioPlayer 
        ref={audioPlayerRef} 
        onPlaybackChange={setIsMusicPlaying}
        hideFloatingButton={currentModel === 'modelo3'}
      />

      {/* SELETOR FLUTUANTE DE APRESENTAÇÃO (PARA O CLIENTE COMPARAR OS 3 MODELOS) */}
      <aside aria-label="Seletor de modelos de convite" className="fixed top-2.5 left-1/2 -translate-x-1/2 z-50 bg-[#24211E]/95 backdrop-blur-md p-1 rounded-full border border-[#CAA36B]/40 shadow-2xl flex items-center gap-1 text-[11px] max-w-[95vw] overflow-x-auto">
        <button
          onClick={() => switchModel('modelo3')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-medium transition-all shrink-0 ${
            currentModel === 'modelo3'
              ? 'bg-[#CAA36B] text-white shadow-xs'
              : 'text-[#ECDCC2] hover:text-white'
          }`}
        >
          <BookOpen className="w-3 h-3 text-amber-300" />
          <span>Modelo 3: Livreto & Selo</span>
          <span className="hidden sm:inline-block px-1 py-0.2 bg-white/20 text-[9px] rounded-full uppercase font-bold tracking-wider">
            Novo
          </span>
        </button>

        <button
          onClick={() => switchModel('modelo1')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-medium transition-all shrink-0 ${
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
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-medium transition-all shrink-0 ${
            currentModel === 'modelo2'
              ? 'bg-[#CAA36B] text-white shadow-xs'
              : 'text-[#ECDCC2] hover:text-white'
          }`}
        >
          <Layers className="w-3 h-3" />
          <span>Modelo 2: Cartão Interativo</span>
        </button>
      </aside>

      {/* ============================================================== */}
      {/* MODELO 3: LIVRETO INTERATIVO COM SELO DE CERA & FUNDO HD       */}
      {/* ============================================================== */}
      {currentModel === 'modelo3' ? (
        <div className="pt-10">
          <LivretoInterativo 
            onPlayMusic={() => audioPlayerRef.current?.playAudio()}
            isMusicPlaying={isMusicPlaying}
            onToggleMusic={() => audioPlayerRef.current?.toggleAudio()}
          />
        </div>
      ) : currentModel === 'modelo2' ? (
        /* ============================================================== */
        /* MODELO 2: CONVITE INTERATIVO ESTILO CARTÃO                     */
        /* ============================================================== */
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
