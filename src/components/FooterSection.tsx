import { useState } from 'react';
import { Heart, Share2, Mail, Check } from 'lucide-react';
import { WEDDING_DATA } from '../weddingData';

interface FooterSectionProps {
  onReopenEnvelope: () => void;
}

export const FooterSection = ({ onReopenEnvelope }: FooterSectionProps) => {
  const [shared, setShared] = useState(false);

  const handleShare = () => {
    const shareText = `Convite de Casamento de ${WEDDING_DATA.couple.bride} & ${WEDDING_DATA.couple.groom}! Toque para ver todos os detalhes, mapa e lista de presentes: ${window.location.href}`;
    
    if (navigator.share) {
      navigator.share({
        title: `Casamento ${WEDDING_DATA.couple.bride} & ${WEDDING_DATA.couple.groom}`,
        text: `Você foi convidado para o casamento de ${WEDDING_DATA.couple.bride} & ${WEDDING_DATA.couple.groom}!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(shareText);
      setShared(true);
      setTimeout(() => setShared(false), 3000);
    }
  };

  return (
    <footer className="pt-16 pb-24 px-4 text-center border-t border-[#CAA36B]/20 bg-[#F4EFE1]/40">
      <div className="max-w-xl mx-auto flex flex-col items-center">
        
        {/* Monograma */}
        <div className="w-14 h-14 rounded-full bg-[#FAF7F2] border border-[#CAA36B]/40 flex items-center justify-center text-[#CAA36B] shadow-xs mb-4">
          <span className="font-serif text-xl tracking-widest uppercase">
            {WEDDING_DATA.couple.monogram}
          </span>
        </div>

        <p className="font-script text-3xl sm:text-4xl text-[#CAA36B] mb-1">
          Esperamos por você!
        </p>

        <h3 className="font-serif text-2xl sm:text-3xl text-[#24211E] uppercase tracking-widest font-medium mb-3">
          {WEDDING_DATA.couple.bride} & {WEDDING_DATA.couple.groom}
        </h3>

        <p className="text-xs text-[#756E65] max-w-sm mb-8 leading-relaxed">
          "O amor é paciente, é benigno; o amor não arde em ciúmes, não se ufana, não se ensoberbe... tudo sofre, tudo crê, tudo espera, tudo suporta."
        </p>

        {/* Botões de Ação Final */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          <button
            onClick={onReopenEnvelope}
            className="inline-flex items-center gap-2 bg-[#FAF7F2] hover:bg-[#ECDCC2] text-[#24211E] text-xs font-medium px-4 py-2.5 rounded-full border border-[#CAA36B]/30 transition-all shadow-xs"
          >
            <Mail className="w-3.5 h-3.5 text-[#9E7338]" />
            Reabrir Envelope Virtual
          </button>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-2 bg-[#FAF7F2] hover:bg-[#ECDCC2] text-[#24211E] text-xs font-medium px-4 py-2.5 rounded-full border border-[#CAA36B]/30 transition-all shadow-xs"
          >
            {shared ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#56695B]" />
                <span>Link Copiado!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-[#9E7338]" />
                <span>Compartilhar Convite</span>
              </>
            )}
          </button>
        </div>

        {/* Créditos Discretos */}
        <div className="flex items-center gap-1.5 text-[11px] text-[#8E867E]">
          <span>Feito com</span>
          <Heart className="w-3 h-3 text-[#CAA36B] fill-current" />
          <span>para o casamento de {WEDDING_DATA.couple.bride} e {WEDDING_DATA.couple.groom}</span>
        </div>
      </div>
    </footer>
  );
};
