import { useState, type FormEvent } from 'react';
import { CheckCircle2, XCircle, Send, Heart, CalendarClock } from 'lucide-react';
import confetti from 'canvas-confetti';
import { WEDDING_DATA } from '../weddingData';

export const RsvpSection = () => {
  const [attending, setAttending] = useState<'yes' | 'no'>('yes');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [adultsCount, setAdultsCount] = useState('1');
  const [childrenCount, setChildrenCount] = useState('0');
  const [dietary, setDietary] = useState('Nenhuma');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (attending === 'yes') {
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#CAA36B', '#D8B765', '#FAF7F2'],
      });
    }

    const attendanceText = attending === 'yes' 
      ? '✅ *SIM! Com certeza estarei lá para celebrar com vocês!*' 
      : '❌ *Infelizmente não poderei comparecer, mas estarei em oração e torcida pelo casal.*';

    const companionsText = attending === 'yes'
      ? `👥 *Adultos:* ${adultsCount} | *Crianças:* ${childrenCount}\n🥗 *Restrição Alimentar:* ${dietary}\n`
      : '';

    const messageText = encodeURIComponent(
      `Olá Daniela & Edshow! ❤️\n\n*CONFIRMAÇÃO DE PRESENÇA - CASAMENTO*\n\n${attendanceText}\n\n👤 *Nome:* ${name}\n📱 *WhatsApp:* ${phone || 'Não informado'}\n${companionsText}💌 *Mensagem aos noivos:* ${message || 'Muito amor e felicidades nessa nova fase!'}`
    );

    const whatsappUrl = `https://wa.me/${WEDDING_DATA.rsvp.whatsappNumber}?text=${messageText}`;

    setSubmitted(true);
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="rsvp" className="py-20 px-4 sm:px-6 max-w-3xl mx-auto">
      {/* Cabeçalho */}
      <div className="text-center mb-12">
        <span className="font-serif text-xs uppercase tracking-[0.25em] text-[#9E7338] font-semibold">
          Confirmação de Presença
        </span>
        <h2 className="font-serif text-4xl sm:text-5xl text-[#24211E] mt-2 mb-3">
          R.S.V.P.
        </h2>
        <div className="inline-flex items-center gap-2 bg-[#F4EFE1] px-4 py-1.5 rounded-full border border-[#CAA36B]/30 text-xs text-[#9E7338] font-medium">
          <CalendarClock className="w-3.5 h-3.5" />
          <span>Favor confirmar até <strong>{WEDDING_DATA.rsvp.deadline}</strong></span>
        </div>
      </div>

      {submitted ? (
        <div className="bg-[#FAF7F2] p-8 sm:p-12 rounded-3xl border border-[#CAA36B]/40 shadow-xl text-center space-y-4 animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-[#ECDCC2] flex items-center justify-center text-[#9E7338] mx-auto">
            <Heart className="w-8 h-8 fill-current" />
          </div>
          <h3 className="font-serif text-3xl font-medium text-[#24211E]">
            Agradecemos de coração!
          </h3>
          <p className="text-sm text-[#756E65] max-w-md mx-auto">
            Sua resposta foi registrada e enviada para o WhatsApp dos noivos. Mal podemos esperar para viver esse momento inesquecível!
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="text-xs uppercase tracking-wider text-[#9E7338] font-semibold hover:underline pt-4 block mx-auto"
          >
            Editar minha resposta
          </button>
        </div>
      ) : (
        <form 
          onSubmit={handleSubmit}
          className="bg-[#FAF7F2] p-6 sm:p-10 rounded-3xl border border-[#CAA36B]/30 shadow-xl space-y-6"
        >
          {/* Opção Comparecimento */}
          <div>
            <label className="text-xs uppercase tracking-wider text-[#9E7338] font-semibold block mb-3 text-center sm:text-left">
              Você poderá comemorar conosco?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setAttending('yes')}
                className={`py-3.5 px-4 rounded-2xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                  attending === 'yes'
                    ? 'bg-[#CAA36B] text-white border-[#CAA36B] shadow-sm'
                    : 'bg-white text-[#24211E] border-[#CAA36B]/30 hover:bg-[#F4EFE1]'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                Sim, com certeza estarei lá!
              </button>

              <button
                type="button"
                onClick={() => setAttending('no')}
                className={`py-3.5 px-4 rounded-2xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                  attending === 'no'
                    ? 'bg-[#ab6a55] text-white border-[#ab6a55] shadow-sm'
                    : 'bg-white text-[#24211E] border-[#CAA36B]/30 hover:bg-[#F4EFE1]'
                }`}
              >
                <XCircle className="w-4 h-4" />
                Infelizmente não poderei
              </button>
            </div>
          </div>

          {/* Nome e WhatsApp */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-[#24211E] block mb-1">
                Seu Nome Completo *
              </label>
              <input
                type="text"
                required
                placeholder="Ex: Carlos Eduardo de Oliveira"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full text-xs p-3.5 rounded-2xl bg-white border border-[#CAA36B]/30 outline-none focus:border-[#CAA36B] transition-colors"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-[#24211E] block mb-1">
                Seu WhatsApp com DDD *
              </label>
              <input
                type="tel"
                required
                placeholder="(00) 00000-0000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full text-xs p-3.5 rounded-2xl bg-white border border-[#CAA36B]/30 outline-none focus:border-[#CAA36B] transition-colors"
              />
            </div>
          </div>

          {/* Acompanhantes e Restrições (Apenas se for 'Sim') */}
          {attending === 'yes' && (
            <div className="space-y-4 pt-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-[#24211E] block mb-1">
                    Total de Adultos
                  </label>
                  <select
                    value={adultsCount}
                    onChange={(e) => setAdultsCount(e.target.value)}
                    className="w-full text-xs p-3.5 rounded-2xl bg-white border border-[#CAA36B]/30 outline-none focus:border-[#CAA36B]"
                  >
                    <option value="1">1 (Apenas eu)</option>
                    <option value="2">2 pessoas</option>
                    <option value="3">3 pessoas</option>
                    <option value="4">4 pessoas</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-medium text-[#24211E] block mb-1">
                    Crianças (até 10 anos)
                  </label>
                  <select
                    value={childrenCount}
                    onChange={(e) => setChildrenCount(e.target.value)}
                    className="w-full text-xs p-3.5 rounded-2xl bg-white border border-[#CAA36B]/30 outline-none focus:border-[#CAA36B]"
                  >
                    <option value="0">Nenhuma</option>
                    <option value="1">1 criança</option>
                    <option value="2">2 crianças</option>
                    <option value="3">3+ crianças</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-[#24211E] block mb-1">
                  Alguma restrição alimentar?
                </label>
                <select
                  value={dietary}
                  onChange={(e) => setDietary(e.target.value)}
                  className="w-full text-xs p-3.5 rounded-2xl bg-white border border-[#CAA36B]/30 outline-none focus:border-[#CAA36B]"
                >
                  <option value="Nenhuma">Nenhuma restrição alimentar</option>
                  <option value="Vegetariano">Vegetariano</option>
                  <option value="Vegano">Vegano</option>
                  <option value="Sem Glúten (Celíaco)">Sem Glúten (Celíaco)</option>
                  <option value="Intolerância à Lactose">Intolerância à Lactose</option>
                </select>
              </div>
            </div>
          )}

          {/* Mensagem aos Noivos */}
          <div>
            <label className="text-xs font-medium text-[#24211E] block mb-1">
              Deixe um recado carinhoso para os noivos:
            </label>
            <textarea
              rows={3}
              placeholder="Escreva algo especial que você gostaria de dizer para Daniela e Edshow..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full text-xs p-3.5 rounded-2xl bg-white border border-[#CAA36B]/30 outline-none focus:border-[#CAA36B] resize-none"
            />
          </div>

          {/* Botão de Envio */}
          <button
            type="submit"
            className="w-full py-4 px-6 rounded-2xl font-medium text-sm bg-[#CAA36B] hover:bg-[#9E7338] text-white flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <Send className="w-4 h-4" />
            <span>Confirmar e Notificar via WhatsApp</span>
          </button>
        </form>
      )}
    </section>
  );
};
