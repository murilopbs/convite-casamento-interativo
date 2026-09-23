import { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  QrCode, 
  CheckCircle2, 
  Sparkles, 
  Copy, 
  Check, 
  ExternalLink, 
  X, 
  Navigation, 
  Car, 
  Send
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { WEDDING_DATA } from '../weddingData';

export const ConviteCardInterativo = () => {
  // Estados para os modais interativos
  const [activeModal, setActiveModal] = useState<'pix' | 'local' | 'rsvp' | 'agenda' | 'traje' | null>(null);
  
  // Estado para cópia de chave Pix
  const [copiedPix, setCopiedPix] = useState(false);

  // Estados para o mini formulário de RSVP
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [guestAttending, setGuestAttending] = useState<'yes' | 'no'>('yes');
  const [guestCompanions, setGuestCompanions] = useState('1');

  const handleCopyPix = () => {
    navigator.clipboard.writeText(WEDDING_DATA.pix.pixKey);
    setCopiedPix(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#CAA36B', '#D8B765', '#56695B'],
    });
    setTimeout(() => setCopiedPix(false), 3000);
  };

  const handleSendRsvp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) return;

    const status = guestAttending === 'yes' ? '✅ SIM, com certeza estarei presente!' : '❌ Infelizmente não poderei comparecer.';
    const text = encodeURIComponent(
      `Olá Daniela & Edshow! ❤️\n\n*CONFIRMAÇÃO DE PRESENÇA (Convite Digital)*\n${status}\n\n👤 *Nome:* ${guestName}\n📱 *WhatsApp:* ${guestPhone || 'Não informado'}\n👥 *Acompanhantes:* ${guestCompanions} pessoa(s)`
    );

    window.open(`https://wa.me/${WEDDING_DATA.rsvp.whatsappNumber}?text=${text}`, '_blank');
    setActiveModal(null);
  };

  // Google Calendar
  const getGoogleCalendarUrl = () => {
    const startDate = "20261121T193000Z";
    const endDate = "20261122T030000Z";
    const title = encodeURIComponent(WEDDING_DATA.date.calendarSummary);
    const details = encodeURIComponent(WEDDING_DATA.date.calendarDescription);
    const location = encodeURIComponent(`${WEDDING_DATA.venue.name}, ${WEDDING_DATA.venue.address}, ${WEDDING_DATA.venue.city}`);

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${details}&location=${location}`;
  };

  const downloadIcs = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'SUMMARY:Casamento Daniela & Edshow',
      `DESCRIPTION:${WEDDING_DATA.date.calendarDescription}`,
      `LOCATION:${WEDDING_DATA.venue.name} - ${WEDDING_DATA.venue.address}`,
      'DTSTART:20261121T163000',
      'DTEND:20261122T040000',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'casamento-daniela-e-edshow.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#E5DFD5] py-4 sm:py-10 px-2 sm:px-4 flex items-center justify-center font-sans">
      
      {/* Moldura do Convite Mobile-First (Semelhante ao modelo do Mercado Livre) */}
      <div className="relative w-full max-w-[430px] bg-[#FAF7F2] rounded-[36px] shadow-[0_25px_60px_rgba(0,0,0,0.18)] border-[6px] border-[#24211E]/90 overflow-hidden flex flex-col text-[#24211E]">
        
        {/* TOPO: Foto do casal com degradê suave para o fundo do papel */}
        <div className="relative h-96 w-full overflow-hidden">
          <img 
            src={WEDDING_DATA.photos.hero} 
            alt="Daniela e Edshow" 
            className="w-full h-full object-cover object-top"
          />
          {/* Degradê que funde a foto com o papel do convite */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FAF7F2]/40 to-[#FAF7F2]" />
          
          <div className="absolute top-4 left-0 right-0 flex justify-center">
            <span className="bg-black/30 backdrop-blur-md text-white text-[10px] uppercase tracking-widest px-3 py-1 rounded-full border border-white/20">
              Convite Oficial
            </span>
          </div>
        </div>

        {/* CORPO DO CONVITE */}
        <div className="relative -mt-16 px-6 pb-8 flex flex-col items-center text-center z-10">
          
          {/* Benção de Deus */}
          <p className="font-serif text-[11px] sm:text-xs tracking-[0.25em] text-[#7A746E] uppercase font-semibold mb-3">
            Com a bênção de Deus e de nossos pais
          </p>

          {/* Nomes dos Noivos em Caligrafia Elegante */}
          <h1 className="font-script text-5xl sm:text-6xl text-[#24211E] mb-5 tracking-wide leading-tight">
            {WEDDING_DATA.couple.bride} <span className="text-[#CAA36B] font-serif text-3xl font-light">e</span> {WEDDING_DATA.couple.groom}
          </h1>

          {/* Bloco de Data Tradicional com Linhas Laterais */}
          <div className="w-full max-w-[320px] mb-5">
            {/* Linha superior com o mês */}
            <div className="flex items-center justify-center gap-3 mb-2">
              <span className="h-[1px] flex-1 bg-[#24211E]/40" />
              <span className="font-serif text-xs uppercase tracking-[0.3em] font-semibold text-[#24211E]">
                {WEDDING_DATA.date.formattedMonth}
              </span>
              <span className="h-[1px] flex-1 bg-[#24211E]/40" />
            </div>

            {/* Bloco Central: DIA DA SEMANA | DIA | HORÁRIO */}
            <div className="flex items-center justify-between border-y border-[#24211E]/40 py-2.5">
              <div className="w-1/3 text-center">
                <span className="font-serif text-[11px] uppercase tracking-wider text-[#524B43] font-medium block">
                  {WEDDING_DATA.date.formattedWeekDay}
                </span>
              </div>

              <div className="w-1/3 text-center border-x border-[#24211E]/30">
                <span className="font-serif text-4xl sm:text-5xl font-semibold text-[#24211E] leading-none">
                  {WEDDING_DATA.date.formattedDay}
                </span>
              </div>

              <div className="w-1/3 text-center">
                <span className="font-serif text-[11px] uppercase tracking-wider text-[#524B43] font-medium block">
                  Às {WEDDING_DATA.date.formattedTime}
                </span>
              </div>
            </div>
          </div>

          {/* LOCAL (Cerimônia e Recepção no mesmo local) */}
          <div className="mb-4">
            <span className="font-serif text-[10px] uppercase tracking-[0.25em] text-[#8E867E] block mb-1">
              Local
            </span>
            <div className="inline-block bg-[#F4EFE1] px-4 py-1.5 rounded-full border border-[#CAA36B]/30 mb-1">
              <h2 className="font-serif text-sm font-semibold tracking-wider uppercase text-[#24211E]">
                {WEDDING_DATA.venue.name}
              </h2>
            </div>
            <p className="text-[11px] text-[#7A746E] italic mt-0.5">
              * Cerimônia e Recepção realizadas no mesmo local
            </p>
            <p className="text-[10px] text-[#8E867E]">
              {WEDDING_DATA.venue.address} • {WEDDING_DATA.venue.city}
            </p>
          </div>

          {/* Ornamento Clássico */}
          <div className="flex items-center justify-center gap-2 my-2 text-[#CAA36B]/60">
            <span className="text-xs">❧</span>
            <span className="h-[1px] w-12 bg-[#CAA36B]/40" />
            <span className="text-sm text-[#CAA36B]">❦</span>
            <span className="h-[1px] w-12 bg-[#CAA36B]/40" />
            <span className="text-xs">❧</span>
          </div>

          {/* CHAMADA PARA OS ÍCONES */}
          <div className="my-3">
            <p className="font-serif text-[10px] uppercase tracking-[0.2em] font-bold text-[#8C6228] flex items-center justify-center gap-1.5">
              <Sparkles className="w-3 h-3 text-[#CAA36B]" />
              Clique nos ícones para interagir
              <Sparkles className="w-3 h-3 text-[#CAA36B]" />
            </p>
          </div>

          {/* BOTÕES CIRCULARES INTERATIVOS (Conforme a imagem enviada) */}
          <div className="grid grid-cols-4 gap-3 w-full pt-1 mb-6">
            
            {/* 1. Confirmar Presença (RSVP) */}
            <button
              onClick={() => setActiveModal('rsvp')}
              className="flex flex-col items-center group transition-transform active:scale-95"
            >
              <div className="w-13 h-13 rounded-full bg-[#FAF7F2] border-2 border-[#56695B] flex items-center justify-center text-[#56695B] shadow-sm group-hover:bg-[#56695B] group-hover:text-white transition-all">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <span className="text-[9px] font-semibold uppercase tracking-wider text-[#524B43] mt-1.5 leading-tight group-hover:text-[#24211E]">
                Confirmar<br />Presença
              </span>
            </button>

            {/* 2. Presente Pix */}
            <button
              onClick={() => setActiveModal('pix')}
              className="flex flex-col items-center group transition-transform active:scale-95"
            >
              <div className="w-13 h-13 rounded-full bg-[#FAF7F2] border-2 border-[#CAA36B] flex items-center justify-center text-[#CAA36B] shadow-sm group-hover:bg-[#CAA36B] group-hover:text-white transition-all">
                <QrCode className="w-6 h-6" />
              </div>
              <span className="text-[9px] font-semibold uppercase tracking-wider text-[#524B43] mt-1.5 leading-tight group-hover:text-[#24211E]">
                Presente<br />Pix
              </span>
            </button>

            {/* 3. Localização (Cerimônia e Recepção juntas) */}
            <button
              onClick={() => setActiveModal('local')}
              className="flex flex-col items-center group transition-transform active:scale-95"
            >
              <div className="w-13 h-13 rounded-full bg-[#FAF7F2] border-2 border-[#7A6B56] flex items-center justify-center text-[#7A6B56] shadow-sm group-hover:bg-[#7A6B56] group-hover:text-white transition-all">
                <MapPin className="w-6 h-6" />
              </div>
              <span className="text-[9px] font-semibold uppercase tracking-wider text-[#524B43] mt-1.5 leading-tight group-hover:text-[#24211E]">
                Local do<br />Casamento
              </span>
            </button>

            {/* 4. Salvar na Agenda */}
            <button
              onClick={() => setActiveModal('agenda')}
              className="flex flex-col items-center group transition-transform active:scale-95"
            >
              <div className="w-13 h-13 rounded-full bg-[#FAF7F2] border-2 border-[#A06E3E] flex items-center justify-center text-[#A06E3E] shadow-sm group-hover:bg-[#A06E3E] group-hover:text-white transition-all">
                <Calendar className="w-6 h-6" />
              </div>
              <span className="text-[9px] font-semibold uppercase tracking-wider text-[#524B43] mt-1.5 leading-tight group-hover:text-[#24211E]">
                Salvar na<br />Agenda
              </span>
            </button>
          </div>

          {/* DICA DE TRAJE (BOTÃO EXTRA DISCRETO) */}
          <button
            onClick={() => setActiveModal('traje')}
            className="text-[11px] text-[#8C6228] underline font-medium hover:text-[#24211E] transition-colors"
          >
            👗 Ver informações sobre Traje (Dress Code)
          </button>

        </div>

        {/* DETALHE BOTÂNICO FLORAL INFERIOR (FOLHAS DE EUCALIPTO / FLORAIS) */}
        <div className="relative w-full h-14 bg-gradient-to-t from-[#E8DFD0] to-transparent flex items-center justify-center overflow-hidden">
          <div className="flex items-center gap-4 text-[#56695B]/40">
            <span className="text-xl">🌿</span>
            <span className="font-serif text-xs tracking-widest text-[#7A746E]">D & E</span>
            <span className="text-xl">🌿</span>
          </div>
        </div>

      </div>

      {/* ============================================================== */}
      {/* MODAL 1: PRESENTE PIX */}
      {/* ============================================================== */}
      {activeModal === 'pix' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="relative w-full max-w-sm bg-[#FAF7F2] rounded-3xl border border-[#CAA36B]/40 shadow-2xl p-6 text-center text-[#24211E]">
            <button 
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-[#ECDCC2] text-[#756E65]"
            >
              <X className="w-4 h-4" />
            </button>

            <span className="font-serif text-xs uppercase tracking-widest text-[#9E7338] font-semibold">
              Presente aos Noivos
            </span>
            <h3 className="font-serif text-2xl font-medium mt-1 mb-2">
              Chave Pix Direta
            </h3>
            <p className="text-xs text-[#665F56] mb-4">
              Sua presença é o nosso maior presente! Se desejar nos abençoar com qualquer valor, use o Pix direto:
            </p>

            {/* QR Code */}
            <div className="p-3 bg-white rounded-2xl border border-[#CAA36B]/30 inline-block mb-4 shadow-xs">
              <img 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(WEDDING_DATA.pix.mockCopyPasteCode)}&color=24-33-30&bgcolor=250-247-242`}
                alt="QR Code Pix"
                className="w-40 h-40 object-contain mx-auto"
              />
            </div>

            {/* Dados Bancários */}
            <div className="bg-[#F4EFE1] p-3 rounded-xl border border-[#CAA36B]/25 text-left text-xs text-[#524B43] mb-4 space-y-1">
              <div><strong>Favorecido:</strong> {WEDDING_DATA.pix.recipientName}</div>
              <div><strong>Chave (E-mail):</strong> {WEDDING_DATA.pix.pixKey}</div>
              <div><strong>Instituição:</strong> {WEDDING_DATA.pix.bank}</div>
            </div>

            {/* Botão Copiar */}
            <button
              onClick={handleCopyPix}
              className={`w-full py-3 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                copiedPix 
                  ? 'bg-[#56695B] text-white' 
                  : 'bg-[#CAA36B] hover:bg-[#9E7338] text-white shadow-xs'
              }`}
            >
              {copiedPix ? (
                <>
                  <Check className="w-4 h-4" />
                  Chave Pix Copiada com Sucesso! ✨
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copiar Chave Pix ({WEDDING_DATA.pix.pixKey})
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL 2: LOCAL DO CASAMENTO (CERIMÔNIA & RECEPÇÃO) */}
      {/* ============================================================== */}
      {activeModal === 'local' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="relative w-full max-w-sm bg-[#FAF7F2] rounded-3xl border border-[#CAA36B]/40 shadow-2xl p-6 text-center text-[#24211E]">
            <button 
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-[#ECDCC2] text-[#756E65]"
            >
              <X className="w-4 h-4" />
            </button>

            <span className="font-serif text-xs uppercase tracking-widest text-[#9E7338] font-semibold">
              Como Chegar
            </span>
            <h3 className="font-serif text-2xl font-medium mt-1 mb-1">
              {WEDDING_DATA.venue.name}
            </h3>
            <p className="text-xs text-[#56695B] font-medium bg-[#56695B]/10 py-1 px-3 rounded-full inline-block mb-3">
              Cerimônia e Recepção no mesmo local
            </p>
            <p className="text-xs text-[#665F56] mb-5">
              {WEDDING_DATA.venue.address} • {WEDDING_DATA.venue.city}
            </p>

            <div className="space-y-2.5">
              {/* Google Maps */}
              <a 
                href={WEDDING_DATA.venue.googleMapsUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl text-xs font-semibold bg-white hover:bg-[#F4EFE1] border border-[#CAA36B]/30 flex items-center justify-between text-[#24211E] transition-colors shadow-xs"
              >
                <div className="flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-[#9E7338]" />
                  <span>Abrir no Google Maps</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-[#9E7338]" />
              </a>

              {/* Waze */}
              <a 
                href={WEDDING_DATA.venue.wazeUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl text-xs font-semibold bg-white hover:bg-[#F4EFE1] border border-[#CAA36B]/30 flex items-center justify-between text-[#24211E] transition-colors shadow-xs"
              >
                <div className="flex items-center gap-2">
                  <Car className="w-4 h-4 text-[#9E7338]" />
                  <span>Navegar com Waze</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-[#9E7338]" />
              </a>

              {/* Uber Direto */}
              <a 
                href={WEDDING_DATA.venue.uberUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl text-xs font-semibold bg-[#24211E] hover:bg-black text-white flex items-center justify-between transition-colors shadow-xs"
              >
                <div className="flex items-center gap-2">
                  <span className="font-serif font-bold text-xs">U</span>
                  <span>Pedir Uber até o Local</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-white/70" />
              </a>
            </div>

            <p className="text-[10px] text-[#8E867E] mt-4">
              * O local conta com estacionamento privativo e serviço de valet.
            </p>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL 3: CONFIRMAR PRESENÇA (RSVP) */}
      {/* ============================================================== */}
      {activeModal === 'rsvp' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="relative w-full max-w-sm bg-[#FAF7F2] rounded-3xl border border-[#CAA36B]/40 shadow-2xl p-6 text-[#24211E]">
            <button 
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-[#ECDCC2] text-[#756E65]"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center mb-4">
              <span className="font-serif text-xs uppercase tracking-widest text-[#9E7338] font-semibold">
                Confirmação de Presença
              </span>
              <h3 className="font-serif text-2xl font-medium mt-1">
                R.S.V.P.
              </h3>
              <p className="text-xs text-[#7A746E]">
                Favor confirmar até {WEDDING_DATA.rsvp.deadline}
              </p>
            </div>

            <form onSubmit={handleSendRsvp} className="space-y-3 text-left">
              <div>
                <label className="text-[11px] font-medium text-[#24211E] block mb-1">
                  Seu Nome Completo *
                </label>
                <input 
                  type="text" 
                  required
                  placeholder="Ex: Carlos Oliveira"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl bg-white border border-[#CAA36B]/30 outline-none focus:border-[#CAA36B]"
                />
              </div>

              <div>
                <label className="text-[11px] font-medium text-[#24211E] block mb-1">
                  WhatsApp com DDD
                </label>
                <input 
                  type="tel" 
                  placeholder="(00) 00000-0000"
                  value={guestPhone}
                  onChange={(e) => setGuestPhone(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl bg-white border border-[#CAA36B]/30 outline-none focus:border-[#CAA36B]"
                />
              </div>

              <div>
                <label className="text-[11px] font-medium text-[#24211E] block mb-1">
                  Você irá comparecer?
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setGuestAttending('yes')}
                    className={`py-2 px-2 rounded-xl text-xs font-semibold border transition-all ${
                      guestAttending === 'yes'
                        ? 'bg-[#56695B] text-white border-[#56695B]'
                        : 'bg-white text-[#24211E] border-[#CAA36B]/30'
                    }`}
                  >
                    Sim, estarei lá!
                  </button>

                  <button
                    type="button"
                    onClick={() => setGuestAttending('no')}
                    className={`py-2 px-2 rounded-xl text-xs font-semibold border transition-all ${
                      guestAttending === 'no'
                        ? 'bg-[#ab6a55] text-white border-[#ab6a55]'
                        : 'bg-white text-[#24211E] border-[#CAA36B]/30'
                    }`}
                  >
                    Não poderei ir
                  </button>
                </div>
              </div>

              {guestAttending === 'yes' && (
                <div>
                  <label className="text-[11px] font-medium text-[#24211E] block mb-1">
                    Quantas pessoas (incluindo você)?
                  </label>
                  <select 
                    value={guestCompanions}
                    onChange={(e) => setGuestCompanions(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl bg-white border border-[#CAA36B]/30 outline-none focus:border-[#CAA36B]"
                  >
                    <option value="1">1 pessoa</option>
                    <option value="2">2 pessoas</option>
                    <option value="3">3 pessoas</option>
                    <option value="4">4 pessoas</option>
                  </select>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl text-xs font-semibold bg-[#25D366] hover:bg-[#1EBE5D] text-white flex items-center justify-center gap-2 transition-colors mt-2 shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                Confirmar no WhatsApp dos Noivos
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL 4: SALVAR NA AGENDA */}
      {/* ============================================================== */}
      {activeModal === 'agenda' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="relative w-full max-w-sm bg-[#FAF7F2] rounded-3xl border border-[#CAA36B]/40 shadow-2xl p-6 text-center text-[#24211E]">
            <button 
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-[#ECDCC2] text-[#756E65]"
            >
              <X className="w-4 h-4" />
            </button>

            <span className="font-serif text-xs uppercase tracking-widest text-[#9E7338] font-semibold">
              Save the Date
            </span>
            <h3 className="font-serif text-2xl font-medium mt-1 mb-2">
              Salvar na Agenda
            </h3>
            <p className="text-xs text-[#665F56] mb-5">
              Não perca nenhum instante do nosso grande dia!
            </p>

            <div className="space-y-3">
              <a
                href={getGoogleCalendarUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl text-xs font-semibold bg-white hover:bg-[#F4EFE1] border border-[#CAA36B]/30 flex items-center justify-center gap-2 text-[#24211E] transition-colors shadow-xs"
              >
                <Calendar className="w-4 h-4 text-[#9E7338]" />
                Adicionar ao Google Agenda
              </a>

              <button
                onClick={downloadIcs}
                className="w-full py-3 px-4 rounded-xl text-xs font-semibold bg-white hover:bg-[#F4EFE1] border border-[#CAA36B]/30 flex items-center justify-center gap-2 text-[#24211E] transition-colors shadow-xs"
              >
                <Calendar className="w-4 h-4 text-[#9E7338]" />
                Salvar no Apple iCal / iPhone (.ics)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL 5: TRAJE (DRESS CODE) */}
      {/* ============================================================== */}
      {activeModal === 'traje' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="relative w-full max-w-sm bg-[#FAF7F2] rounded-3xl border border-[#CAA36B]/40 shadow-2xl p-6 text-center text-[#24211E]">
            <button 
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-[#ECDCC2] text-[#756E65]"
            >
              <X className="w-4 h-4" />
            </button>

            <span className="font-serif text-xs uppercase tracking-widest text-[#9E7338] font-semibold">
              Guia de Estilo
            </span>
            <h3 className="font-serif text-2xl font-medium mt-1 mb-1">
              Dress Code
            </h3>
            <p className="font-serif text-lg text-[#CAA36B] font-medium mb-3">
              {WEDDING_DATA.dressCode.title}
            </p>
            
            <p className="text-xs text-[#665F56] mb-4 leading-relaxed">
              {WEDDING_DATA.dressCode.subtitle}
            </p>

            <div className="bg-[#F6EFE1] p-3 rounded-xl border border-[#CAA36B]/30 text-xs text-[#7D572C] font-medium mb-4 text-left">
              ✨ <strong>Lembrete carinhoso:</strong> Tons de branco, off-white e perolados são reservados exclusivamente para a nossa noiva.
            </div>

            <p className="text-[11px] text-[#756E65] italic">
              {WEDDING_DATA.dressCode.footwearTip}
            </p>
          </div>
        </div>
      )}

    </div>
  );
};
