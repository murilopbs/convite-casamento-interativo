import { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart } from 'lucide-react';
import { WEDDING_DATA } from '../weddingData';

interface EnvelopeIntroProps {
  onOpen: () => void;
  isOpen: boolean;
}

export const EnvelopeIntro = ({ onOpen, isOpen }: EnvelopeIntroProps) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleSealClick = () => {
    if (isOpening || isOpen) return;
    setIsOpening(true);

    // Disparar confetes dourados refinados
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#CAA36B', '#D8B765', '#FAF7F2', '#9E7338'],
      ticks: 200,
      gravity: 0.8,
      scalar: 1.1,
    });

    // Animação de abertura antes de revelar a landing page
    setTimeout(() => {
      onOpen();
    }, 1200);
  };

  if (isOpen) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-[#FAF7F2] p-4 transition-opacity duration-1000 ${
      isOpening ? 'opacity-0 pointer-events-none' : 'opacity-100'
    }`}>
      {/* Textura de fundo e luzes suaves */}
      <div className="absolute inset-0 bg-paper pointer-events-none opacity-80" />
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#ECDCC2]/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#CAA36B]/20 rounded-full blur-3xl pointer-events-none" />

      {/* Conteúdo Central do Envelope */}
      <div className="relative w-full max-w-md mx-auto flex flex-col items-center">
        
        {/* Título e Monograma superior */}
        <div className="text-center mb-6 animate-fade-in">
          <p className="font-script text-3xl sm:text-4xl text-[#CAA36B] tracking-wide mb-1">
            Você foi convidado(a)
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl tracking-widest text-[#24211E] uppercase">
            {WEDDING_DATA.couple.bride} & {WEDDING_DATA.couple.groom}
          </h1>
          <div className="flex items-center justify-center gap-3 mt-2">
            <span className="h-[1px] w-12 bg-[#CAA36B]/40" />
            <Heart className="w-3.5 h-3.5 text-[#CAA36B] fill-[#CAA36B]/40" />
            <span className="h-[1px] w-12 bg-[#CAA36B]/40" />
          </div>
        </div>

        {/* Envelope 3D */}
        <div 
          onClick={handleSealClick}
          className="relative w-full aspect-[4/3] max-w-[380px] bg-[#F4EFE1] rounded-2xl shadow-2xl border border-[#CAA36B]/30 cursor-pointer overflow-hidden p-6 flex flex-col justify-between group transition-all duration-500 hover:shadow-[0_20px_50px_rgba(202,163,107,0.3)] hover:-translate-y-1"
        >
          {/* Aba Superior do Envelope (Triângulo estilizado) */}
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
          <div className="relative z-10 border border-[#CAA36B]/30 rounded-xl p-6 h-full flex flex-col items-center justify-between text-center bg-[#FAF7F2]/90 backdrop-blur-xs">
            
            <div className="pt-2">
              <span className="font-serif text-xs uppercase tracking-[0.25em] text-[#9E7338]">
                Grande Celebração
              </span>
              <p className="font-serif text-lg text-[#24211E] mt-1 font-medium">
                {WEDDING_DATA.date.formattedDay} de {WEDDING_DATA.date.formattedMonth}, {WEDDING_DATA.date.formattedYear}
              </p>
              <p className="text-xs text-[#7A746E]">
                {WEDDING_DATA.venue.name}
              </p>
            </div>

            {/* Selo de Cera 3D Central */}
            <div className="relative my-3 flex flex-col items-center">
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full wax-seal-pulse transition-transform duration-300 group-hover:scale-105 active:scale-95 shadow-xl">
                <img 
                  src={WEDDING_DATA.photos.waxSeal} 
                  alt="Selo de Cera dos Noivos" 
                  className="w-full h-full object-cover rounded-full"
                />
                
                {/* Brilho dourado */}
                <div className="absolute inset-0 rounded-full bg-radial from-white/20 via-transparent to-black/20 pointer-events-none" />
              </div>

              {/* Dica de clique animada */}
              <div className="flex items-center gap-1.5 mt-3 text-xs font-medium text-[#9E7338] bg-[#FAF7F2] px-3 py-1 rounded-full border border-[#CAA36B]/30 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '4s' }} />
                <span>Toque no selo para abrir</span>
              </div>
            </div>

            <p className="font-script text-xl text-[#CAA36B] pb-1">
              Com amor, {WEDDING_DATA.couple.bride} & {WEDDING_DATA.couple.groom}
            </p>
          </div>
        </div>

        {/* Instrução inferior */}
        <p className="text-xs text-[#8E867E] mt-6 tracking-wide text-center">
          Experiência interativa com áudio e navegação
        </p>
      </div>
    </div>
  );
};
