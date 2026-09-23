import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart } from 'lucide-react';
import { WEDDING_DATA } from '../weddingData';

interface EnvelopeIntroProps {
  onOpen: () => void;
  isOpen: boolean;
}

export const EnvelopeIntro = ({ onOpen, isOpen }: EnvelopeIntroProps) => {
  const [isOpening, setIsOpening] = useState(false);

  // Travar o scroll da página enquanto o envelope estiver fechado
  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = 'hidden';
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleSealClick = () => {
    if (isOpening || isOpen) return;
    setIsOpening(true);

    // Disparar confetes dourados refinados
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#CAA36B', '#D8B765', '#FAF7F2', '#9E7338'],
      ticks: 200,
      gravity: 0.8,
      scalar: 1.15,
    });

    // Animação de abertura antes de revelar a landing page
    setTimeout(() => {
      window.scrollTo(0, 0);
      onOpen();
    }, 1100);
  };

  if (isOpen) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#FAF7F2] p-4 sm:p-6 transition-opacity duration-1000 touch-none overscroll-none select-none ${
        isOpening ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{ touchAction: 'none' }}
    >
      {/* Textura de fundo e luzes suaves */}
      <div className="absolute inset-0 bg-paper pointer-events-none opacity-90" />
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#ECDCC2]/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#CAA36B]/25 rounded-full blur-3xl pointer-events-none" />

      {/* Conteúdo Central do Envelope */}
      <div className="relative w-full max-w-[460px] mx-auto flex flex-col items-center">
        
        {/* Título e Nomes Superiores com Grande Destaque */}
        <div className="text-center mb-5">
          <p className="font-script text-3xl sm:text-4xl text-[#CAA36B] tracking-wide mb-1">
            Você foi convidado(a)
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl tracking-widest text-[#24211E] uppercase font-medium">
            {WEDDING_DATA.couple.bride} & {WEDDING_DATA.couple.groom}
          </h1>
          <p className="text-xs text-[#7A746E] tracking-wider uppercase mt-0.5">
            {WEDDING_DATA.couple.brideFullName} & {WEDDING_DATA.couple.groomFullName}
          </p>
          <div className="flex items-center justify-center gap-3 mt-2">
            <span className="h-[1px] w-14 bg-[#CAA36B]/50" />
            <Heart className="w-3.5 h-3.5 text-[#CAA36B] fill-[#CAA36B]" />
            <span className="h-[1px] w-14 bg-[#CAA36B]/50" />
          </div>
        </div>

        {/* Envelope 3D Grande e Responsivo */}
        <div 
          onClick={handleSealClick}
          className="relative w-full aspect-[4/3] bg-[#F4EFE1] rounded-3xl shadow-2xl border-2 border-[#CAA36B]/40 cursor-pointer overflow-hidden p-6 sm:p-8 flex flex-col justify-between group transition-all duration-500 hover:shadow-[0_25px_60px_rgba(202,163,107,0.35)] hover:-translate-y-1 active:scale-[0.98]"
        >
          {/* Aba Superior do Envelope (Triângulo com perspectiva) */}
          <div 
            className={`absolute top-0 left-0 right-0 h-1/2 bg-[#ECDCC2] origin-top transition-transform duration-1000 ease-in-out border-b border-[#CAA36B]/30 ${
              isOpening ? '-rotate-x-180' : 'rotate-x-0'
            }`}
            style={{
              clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
            }}
          />

          {/* Abas Laterais */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, rgba(236,220,194,0.3) 0%, transparent 50%), linear-gradient(225deg, rgba(236,220,194,0.3) 0%, transparent 50%)',
            }}
          />

          {/* Detalhe de linha dourada interna */}
          <div className="relative z-10 border border-[#CAA36B]/30 rounded-2xl p-5 sm:p-6 h-full flex flex-col items-center justify-between text-center bg-[#FAF7F2]/90 backdrop-blur-xs">
            
            <div className="pt-1">
              <span className="font-serif text-xs uppercase tracking-[0.25em] text-[#9E7338] font-bold">
                Celebração de Casamento
              </span>
              <p className="font-serif text-lg sm:text-xl text-[#24211E] mt-1 font-semibold">
                {WEDDING_DATA.date.formattedDay} de {WEDDING_DATA.date.formattedMonth}, {WEDDING_DATA.date.formattedYear}
              </p>
              <p className="text-xs sm:text-sm text-[#7A746E] font-medium">
                {WEDDING_DATA.venue.name} • {WEDDING_DATA.venue.city}
              </p>
            </div>

            {/* Selo de Cera 3D Central */}
            <div className="relative my-2 sm:my-3 flex flex-col items-center">
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full wax-seal-pulse transition-transform duration-300 group-hover:scale-105 active:scale-95 shadow-2xl">
                <img 
                  src={WEDDING_DATA.photos.waxSeal} 
                  alt="Selo de Cera dos Noivos" 
                  className="w-full h-full object-cover rounded-full"
                />
                
                {/* Brilho dourado reflexivo */}
                <div className="absolute inset-0 rounded-full bg-radial from-white/20 via-transparent to-black/20 pointer-events-none" />
              </div>

              {/* Botão com ALTO CONTRASTE e FONTE GRANDE para celular */}
              <div className="mt-3 bg-[#24211E] hover:bg-black text-[#ECDCC2] px-5 py-2.5 rounded-full border-2 border-[#CAA36B] shadow-lg flex items-center gap-2 transition-transform group-hover:scale-105">
                <Sparkles className="w-4 h-4 text-[#CAA36B] animate-spin" style={{ animationDuration: '4s' }} />
                <span className="text-xs sm:text-sm font-bold tracking-wider uppercase">
                  Toque no selo para abrir
                </span>
              </div>
            </div>

            <p className="font-script text-2xl text-[#CAA36B] pb-1">
              Com amor, {WEDDING_DATA.couple.bride} & {WEDDING_DATA.couple.groom}
            </p>
          </div>
        </div>

        {/* Instrução inferior nítida */}
        <p className="text-xs text-[#7A746E] mt-4 tracking-wide text-center font-medium">
          ✨ Experiência interativa com música e navegação
        </p>
      </div>
    </div>
  );
};
