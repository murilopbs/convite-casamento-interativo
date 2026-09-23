import { useState, useEffect } from 'react';
import { X, Copy, Check, QrCode, Send } from 'lucide-react';
import confetti from 'canvas-confetti';
import { WEDDING_DATA, type GiftQuota } from '../weddingData';

interface PixModalProps {
  gift: GiftQuota | null;
  onClose: () => void;
}

export const PixModal = ({ gift, onClose }: PixModalProps) => {
  const [copied, setCopied] = useState(false);
  const [customAmount, setCustomAmount] = useState<number | string>(gift?.price || 150);
  const [guestName, setGuestName] = useState('');
  const [guestMessage, setGuestMessage] = useState('');

  // Fechar com a tecla ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!gift) return null;

  const handleCopyPix = () => {
    navigator.clipboard.writeText(WEDDING_DATA.pix.pixKey);
    setCopied(true);

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#CAA36B', '#D8B765', '#9E7338'],
    });

    setTimeout(() => setCopied(false), 3000);
  };

  const getWhatsAppMessageUrl = () => {
    const text = encodeURIComponent(
      `Olá Daniela & Édson! ❤️\n\nAcabei de enviar um presente de casamento via Pix!\n\n🎁 *Presente:* ${gift.title}\n💰 *Valor:* R$ ${customAmount}\n👤 *De:* ${guestName || 'Convidado Especial'}\n💌 *Mensagem:* ${guestMessage || 'Felicidades aos noivos! Que Deus abençoe essa linda união!'}\n\n(Estou enviando o comprovante em anexo)`
    );

    return `https://wa.me/${WEDDING_DATA.pix.whatsappNotificationPhone}?text=${text}`;
  };

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(
    WEDDING_DATA.pix.mockCopyPasteCode
  )}&color=24-33-30&bgcolor=250-247-242`;

  return (
    <div 
      onClick={(e) => {
        // Clicar fora da caixa fecha o modal
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs animate-fade-in"
    >
      {/* Caixa do Modal com rolagem interna suave e limites de altura */}
      <div className="relative w-full max-w-md max-h-[90vh] bg-[#FAF7F2] rounded-3xl border-2 border-[#CAA36B]/50 shadow-2xl overflow-y-auto p-5 sm:p-7 text-[#24211E] overscroll-contain">
        
        {/* BOTÃO FECHAR SUPERIOR FIXO / DESTACADO */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/95 hover:bg-[#ECDCC2] text-[#24211E] border border-[#CAA36B]/40 shadow-md flex items-center justify-center transition-transform active:scale-95"
          aria-label="Fechar janela"
          title="Fechar"
        >
          <X className="w-5 h-5 text-[#24211E]" />
        </button>

        {/* Cabeçalho do Modal */}
        <div className="text-center mb-5 pr-10">
          <span className="font-serif text-xs uppercase tracking-widest text-[#9E7338] font-bold">
            Presentear com Pix
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-medium mt-1 leading-snug">
            {gift.title}
          </h3>
          <p className="text-xs text-[#756E65] mt-1">
            {gift.description}
          </p>
        </div>

        {/* Valor da Cota */}
        <div className="bg-[#F4EFE1] p-3.5 rounded-2xl border border-[#CAA36B]/30 mb-5 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-[#8E867E] font-bold block">
              Valor Sugerido
            </span>
            <span className="font-serif text-2xl font-bold text-[#9E7338]">
              R$ {gift.price.toFixed(2)}
            </span>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-[#756E65] block mb-1">
              Ou ajuste o valor:
            </span>
            <div className="flex items-center gap-1 bg-white px-2.5 py-1 rounded-xl border border-[#CAA36B]/40">
              <span className="text-xs text-[#756E65] font-medium">R$</span>
              <input
                type="number"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                className="w-20 text-sm font-semibold text-[#24211E] outline-none"
              />
            </div>
          </div>
        </div>

        {/* QR Code Pix */}
        <div className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl border border-[#CAA36B]/30 shadow-xs mb-5">
          <div className="relative w-44 h-44 bg-[#FAF7F2] p-2 rounded-xl border border-[#CAA36B]/20 flex items-center justify-center">
            <img 
              src={qrCodeUrl} 
              alt="QR Code Pix" 
              className="w-full h-full object-contain rounded-lg"
            />
          </div>
          <p className="text-xs text-[#756E65] mt-2.5 flex items-center gap-1.5 font-medium">
            <QrCode className="w-3.5 h-3.5 text-[#9E7338]" />
            Aponte a câmera do aplicativo do seu banco
          </p>
        </div>

        {/* Chave Pix e Botão Copiar */}
        <div className="space-y-2.5 mb-5">
          <div className="bg-[#F4EFE1] p-3 rounded-xl border border-[#CAA36B]/25 text-xs text-[#524B43] space-y-1">
            <div><strong>Favorecido:</strong> {WEDDING_DATA.pix.recipientName}</div>
            <div><strong>Chave Pix:</strong> {WEDDING_DATA.pix.pixKey}</div>
          </div>

          <button
            onClick={handleCopyPix}
            className={`w-full py-3.5 px-4 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 transition-all duration-300 shadow-xs active:scale-[0.99] ${
              copied
                ? 'bg-[#56695B] text-white'
                : 'bg-[#CAA36B] hover:bg-[#9E7338] text-white hover:shadow-md'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                <span>Chave Pix Copiada com Sucesso! ✨</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copiar Chave Pix ({WEDDING_DATA.pix.pixKey})</span>
              </>
            )}
          </button>
        </div>

        {/* Recado e WhatsApp */}
        <div className="pt-4 border-t border-[#CAA36B]/20 space-y-2.5">
          <p className="text-xs uppercase tracking-wider text-[#9E7338] font-bold">
            Avise os Noivos no WhatsApp (Opcional):
          </p>

          <input
            type="text"
            placeholder="Seu nome completo"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            className="w-full text-xs p-2.5 rounded-xl bg-white border border-[#CAA36B]/30 outline-none focus:border-[#CAA36B]"
          />

          <textarea
            placeholder="Escreva uma mensagem de carinho aos noivos..."
            value={guestMessage}
            onChange={(e) => setGuestMessage(e.target.value)}
            rows={2}
            className="w-full text-xs p-2.5 rounded-xl bg-white border border-[#CAA36B]/30 outline-none focus:border-[#CAA36B] resize-none"
          />

          <a
            href={getWhatsAppMessageUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-4 rounded-xl font-semibold text-xs bg-[#25D366] hover:bg-[#1EBE5D] text-white flex items-center justify-center gap-2 transition-colors shadow-xs"
          >
            <Send className="w-3.5 h-3.5" />
            Enviar Comprovante e Mensagem no WhatsApp
          </a>

          {/* BOTÃO FECHAR INFERIOR DE FÁCIL ACESSO PARA O POLEGAR */}
          <button
            type="button"
            onClick={onClose}
            className="w-full py-3 px-4 rounded-xl font-semibold text-xs text-[#7A746E] hover:text-[#24211E] bg-[#F4EFE1] hover:bg-[#ECDCC2] border border-[#CAA36B]/30 transition-colors mt-2"
          >
            ✕ Fechar Janela
          </button>
        </div>

      </div>
    </div>
  );
};
