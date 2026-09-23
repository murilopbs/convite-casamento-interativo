import { useState } from 'react';
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
      `Olá Daniela & Edshow! ❤️\n\nAcabei de enviar um presente de casamento via Pix!\n\n🎁 *Presente:* ${gift.title}\n💰 *Valor:* R$ ${customAmount}\n👤 *De:* ${guestName || 'Convidado Especial'}\n💌 *Mensagem:* ${guestMessage || 'Felicidades aos noivos! Que essa nova caminhada seja repleta de bênçãos e amor!'}\n\n(Estou enviando o comprovante em anexo)`
    );

    return `https://wa.me/${WEDDING_DATA.pix.whatsappNotificationPhone}?text=${text}`;
  };

  // QR Code gerado dinamicamente com base na chave Pix
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(
    WEDDING_DATA.pix.mockCopyPasteCode
  )}&color=24-33-30&bgcolor=250-247-242`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#FAF7F2] rounded-3xl border border-[#CAA36B]/40 shadow-2xl p-6 sm:p-8 my-8 text-[#24211E]">
        
        {/* Botão Fechar */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-[#ECDCC2]/60 text-[#756E65] hover:text-[#24211E] transition-colors"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Cabeçalho do Modal */}
        <div className="text-center mb-6 pr-6">
          <span className="font-serif text-xs uppercase tracking-widest text-[#9E7338] font-semibold">
            Presentear com Pix
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-medium mt-1">
            {gift.title}
          </h3>
          <p className="text-xs text-[#756E65] mt-1">
            {gift.description}
          </p>
        </div>

        {/* Valor da Cota */}
        <div className="bg-[#F4EFE1] p-4 rounded-2xl border border-[#CAA36B]/30 mb-6 flex items-center justify-between">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-[#8E867E] font-semibold block">
              Valor Sugerido
            </span>
            <span className="font-serif text-2xl font-bold text-[#9E7338]">
              R$ {gift.price.toFixed(2)}
            </span>
          </div>

          <div className="text-right">
            <span className="text-[11px] text-[#756E65] block mb-1">
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
        <div className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl border border-[#CAA36B]/30 shadow-xs mb-6">
          <div className="relative w-48 h-48 bg-[#FAF7F2] p-2 rounded-xl border border-[#CAA36B]/20 flex items-center justify-center">
            <img 
              src={qrCodeUrl} 
              alt="QR Code Pix" 
              className="w-full h-full object-contain rounded-lg"
            />
          </div>
          <p className="text-xs text-[#756E65] mt-3 flex items-center gap-1.5">
            <QrCode className="w-3.5 h-3.5 text-[#9E7338]" />
            Aponte a câmera do aplicativo do seu banco
          </p>
        </div>

        {/* Chave Pix e Botão Copiar */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between text-xs text-[#756E65] px-1">
            <span>{WEDDING_DATA.pix.keyType}: <strong>{WEDDING_DATA.pix.pixKey}</strong></span>
            <span>Favorecido: <strong>{WEDDING_DATA.pix.recipientName}</strong></span>
          </div>

          <button
            onClick={handleCopyPix}
            className={`w-full py-3.5 px-4 rounded-2xl font-medium text-sm flex items-center justify-center gap-2 transition-all duration-300 shadow-xs ${
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

        {/* Recado Carinhoso e Envio de Comprovante no WhatsApp */}
        <div className="pt-4 border-t border-[#CAA36B]/20 space-y-3">
          <p className="text-xs uppercase tracking-wider text-[#9E7338] font-semibold">
            Avise os Noivos no WhatsApp (Opcional):
          </p>

          <input
            type="text"
            placeholder="Seu nome completo"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            className="w-full text-xs p-3 rounded-xl bg-white border border-[#CAA36B]/30 outline-none focus:border-[#CAA36B]"
          />

          <textarea
            placeholder="Escreva uma mensagem de carinho aos noivos..."
            value={guestMessage}
            onChange={(e) => setGuestMessage(e.target.value)}
            rows={2}
            className="w-full text-xs p-3 rounded-xl bg-white border border-[#CAA36B]/30 outline-none focus:border-[#CAA36B] resize-none"
          />

          <a
            href={getWhatsAppMessageUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-4 rounded-xl font-medium text-xs bg-[#25D366] hover:bg-[#1EBE5D] text-white flex items-center justify-center gap-2 transition-colors shadow-xs"
          >
            <Send className="w-3.5 h-3.5" />
            Enviar Comprovante e Mensagem no WhatsApp
          </a>
        </div>

      </div>
    </div>
  );
};
