import { useState } from 'react';
import { Gift, Heart, Copy, Check, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { WEDDING_DATA, type GiftQuota } from '../weddingData';
import { PixModal } from './PixModal';

export const GiftsSection = () => {
  const [selectedGift, setSelectedGift] = useState<GiftQuota | null>(null);
  const [copiedQuickPix, setCopiedQuickPix] = useState(false);

  const handleCopyDirectPix = () => {
    navigator.clipboard.writeText(WEDDING_DATA.pix.pixKey);
    setCopiedQuickPix(true);

    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#CAA36B', '#D8B765', '#FAF7F2'],
    });

    setTimeout(() => setCopiedQuickPix(false), 3000);
  };

  return (
    <section id="presentes" className="py-20 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Cabeçalho */}
      <div className="text-center mb-14">
        <span className="font-serif text-xs uppercase tracking-[0.25em] text-[#9E7338] font-semibold">
          Gesto de Carinho
        </span>
        <h2 className="font-serif text-4xl sm:text-5xl text-[#24211E] mt-2 mb-3">
          Lista de Presentes & Cotas
        </h2>
        <p className="text-sm text-[#756E65] max-w-lg mx-auto leading-relaxed">
          A sua presença no nosso casamento é o nosso maior e mais precioso presente! Mas se você desejar nos presentear com uma lembrança para o início da nossa vida a dois, criamos cotas de Lua de Mel simples e diretas via Pix.
        </p>
      </div>

      {/* Card Rápido de Pix Direto */}
      <div className="bg-[#FAF7F2] p-6 sm:p-8 rounded-3xl border border-[#CAA36B]/40 shadow-md mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 text-center md:text-left">
          <div className="w-14 h-14 rounded-2xl bg-[#ECDCC2]/60 flex items-center justify-center text-[#9E7338] shrink-0">
            <Gift className="w-7 h-7" />
          </div>
          <div>
            <h3 className="font-serif text-2xl font-medium text-[#24211E]">
              Pix Direto para os Noivos
            </h3>
            <p className="text-xs text-[#756E65] mt-0.5">
              Sem intermediários ou taxas de plataformas. 100% destinado ao casal.
            </p>
            <p className="text-xs font-semibold text-[#9E7338] mt-1">
              Chave Pix: {WEDDING_DATA.pix.pixKey} ({WEDDING_DATA.pix.recipientName})
            </p>
          </div>
        </div>

        <button
          onClick={handleCopyDirectPix}
          className={`py-3 px-6 rounded-full font-medium text-xs flex items-center gap-2 shrink-0 transition-all duration-300 shadow-xs ${
            copiedQuickPix
              ? 'bg-[#56695B] text-white'
              : 'bg-[#CAA36B] hover:bg-[#9E7338] text-white hover:shadow-md'
          }`}
        >
          {copiedQuickPix ? (
            <>
              <Check className="w-4 h-4" />
              <span>Chave Copiada! ✨</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Copiar Chave Pix</span>
            </>
          )}
        </button>
      </div>

      {/* Grade de Cotas Divertidas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {WEDDING_DATA.gifts.map((gift) => (
          <div
            key={gift.id}
            className="bg-[#FAF7F2] rounded-3xl border border-[#CAA36B]/30 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group hover:-translate-y-1"
          >
            <div>
              {/* Foto da Cota */}
              <div className="relative h-44 w-full overflow-hidden bg-[#ECDCC2]/30">
                <img
                  src={gift.image}
                  alt={gift.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Badge de Categoria */}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-[#24211E] text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-xs">
                  {gift.category}
                </div>

                {gift.popular && (
                  <div className="absolute top-3 right-3 bg-[#CAA36B] text-white text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-xs flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Queridinho
                  </div>
                )}
              </div>

              {/* Informações da Cota */}
              <div className="p-6">
                <div className="flex items-baseline justify-between mb-2">
                  <span className="font-serif text-2xl font-bold text-[#9E7338]">
                    R$ {gift.price.toFixed(2)}
                  </span>
                </div>

                <h3 className="font-serif text-xl font-medium text-[#24211E] mb-2 leading-snug">
                  {gift.title}
                </h3>
                
                <p className="text-xs text-[#665F56] leading-relaxed">
                  {gift.description}
                </p>
              </div>
            </div>

            {/* Botão de Presentear */}
            <div className="p-6 pt-0">
              <button
                onClick={() => setSelectedGift(gift)}
                className="w-full py-2.5 px-4 rounded-xl bg-[#F4EFE1] group-hover:bg-[#CAA36B] text-[#9E7338] group-hover:text-white font-medium text-xs flex items-center justify-center gap-2 transition-all duration-300 border border-[#CAA36B]/30 group-hover:border-transparent"
              >
                <Heart className="w-3.5 h-3.5 fill-current" />
                <span>Presentear com Pix</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de Pagamento Pix */}
      <PixModal 
        gift={selectedGift} 
        onClose={() => setSelectedGift(null)} 
      />
    </section>
  );
};
