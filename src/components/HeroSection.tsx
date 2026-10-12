import { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Download, Heart } from 'lucide-react';
import { WEDDING_DATA } from '../weddingData';
import { SectionFeedbackBox } from './SectionFeedbackBox';

export const HeroSection = () => {
  // Contagem regressiva precisa
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date(WEDDING_DATA.date.isoDateTime).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // Gerador de link do Google Calendar
  const getGoogleCalendarUrl = () => {
    // 25/09/2027 16:30 BRT -> 19:30 UTC
    const startDate = "20270925T193000Z";
    const endDate = "20270926T040000Z";
    const title = encodeURIComponent(WEDDING_DATA.date.calendarSummary);
    const details = encodeURIComponent(WEDDING_DATA.date.calendarDescription);
    const location = encodeURIComponent(`${WEDDING_DATA.venue.name}, ${WEDDING_DATA.venue.address}, ${WEDDING_DATA.venue.city}`);

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${details}&location=${location}`;
  };

  // Gerador e download de arquivo .ics para Apple Calendar / iOS / Outlook
  const downloadIcsFile = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Casamento Daniela e Edson//PT-BR',
      'CALSCALE:GREGORIAN',
      'BEGIN:VEVENT',
      'SUMMARY:Casamento Daniela & Edson',
      `DESCRIPTION:${WEDDING_DATA.date.calendarDescription}`,
      `LOCATION:${WEDDING_DATA.venue.name} - ${WEDDING_DATA.venue.address}, ${WEDDING_DATA.venue.city}`,
      'DTSTART:20270925T163000',
      'DTEND:20270926T040000',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'casamento-daniela-e-edson.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="relative pt-6 pb-20 px-4 sm:px-6 max-w-5xl mx-auto flex flex-col items-center text-center">
      {/* Logo Oficial do Casório Dani & Edson */}
      <div className="w-28 h-28 sm:w-36 sm:h-36 mx-auto mb-3 transition-transform duration-500 hover:scale-105">
        <img 
          src={WEDDING_DATA.photos.logo} 
          alt="Logo Oficial Daniela & Edson" 
          className="w-full h-full object-contain drop-shadow-xs"
        />
      </div>

      {/* Detalhe Superior de Boas-Vindas */}
      <div className="mb-3 inline-flex items-center gap-2 bg-[#F4EFE1] px-4 py-1.5 rounded-full border border-[#CAA36B]/30 shadow-xs">
        <Heart className="w-3.5 h-3.5 text-[#CAA36B] fill-[#CAA36B]" />
        <span className="font-serif uppercase tracking-[0.2em] text-[11px] font-semibold text-[#8C6228]">
          Celebração de Casamento
        </span>
      </div>

      <p className="font-script text-3xl sm:text-5xl text-[#CAA36B] mb-2">
        {WEDDING_DATA.couple.subtitle}
      </p>

      {/* Título Principal com Nomes */}
      <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl tracking-tight text-[#24211E] font-medium mb-4 leading-none">
        {WEDDING_DATA.couple.bride} <span className="font-script text-5xl sm:text-7xl text-[#CAA36B] font-normal">&</span> {WEDDING_DATA.couple.groom}
      </h1>

      <p className="font-serif italic text-lg sm:text-xl text-[#756E65] max-w-xl mb-8">
        "{WEDDING_DATA.couple.quote}"
      </p>

      {/* Foto Principal do Casal com Moldura Editorial Perfeita (Aspecto Retrato) */}
      <div className="relative w-full max-w-md sm:max-w-lg aspect-[3/4] sm:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-[#FAF7F2] mb-10 group bg-[#F4EFE1]">
        <img 
          src={WEDDING_DATA.photos.hero} 
          alt={`${WEDDING_DATA.couple.bride} e ${WEDDING_DATA.couple.groom}`}
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Gradiente sutil */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

        {/* Monograma flutuante no canto */}
        <div className="absolute bottom-5 left-5 text-left text-white drop-shadow-md">
          <p className="font-serif text-2xl tracking-widest uppercase font-semibold">
            {WEDDING_DATA.couple.monogram}
          </p>
          <p className="text-xs uppercase tracking-widest text-[#ECDCC2]">
            {WEDDING_DATA.date.formattedDay} • {WEDDING_DATA.date.formattedMonth} • {WEDDING_DATA.date.formattedYear}
          </p>
        </div>

        <div className="absolute bottom-5 right-5 bg-black/50 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs text-[#FAF7F2] border border-white/20">
          📍 {WEDDING_DATA.venue.city}
        </div>
      </div>

      {/* Cards de Data, Hora e Local */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl mb-12">
        <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-[#CAA36B]/30 shadow-xs flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-[#ECDCC2]/60 flex items-center justify-center text-[#9E7338] mb-2">
            <Calendar className="w-5 h-5" />
          </div>
          <span className="text-[11px] uppercase tracking-wider text-[#8E867E] font-semibold">Data</span>
          <span className="font-serif text-xl font-medium text-[#24211E] mt-0.5">{WEDDING_DATA.date.formattedDay} de {WEDDING_DATA.date.formattedMonth}</span>
          <span className="text-xs text-[#756E65]">{WEDDING_DATA.date.formattedWeekDay}</span>
        </div>

        <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-[#CAA36B]/30 shadow-xs flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-[#ECDCC2]/60 flex items-center justify-center text-[#9E7338] mb-2">
            <Clock className="w-5 h-5" />
          </div>
          <span className="text-[11px] uppercase tracking-wider text-[#8E867E] font-semibold">Horário</span>
          <span className="font-serif text-xl font-medium text-[#24211E] mt-0.5">{WEDDING_DATA.date.formattedTime}h</span>
          <span className="text-xs text-[#756E65]">Pontualmente</span>
        </div>

        <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-[#CAA36B]/30 shadow-xs flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-[#ECDCC2]/60 flex items-center justify-center text-[#9E7338] mb-2">
            <MapPin className="w-5 h-5" />
          </div>
          <span className="text-[11px] uppercase tracking-wider text-[#8E867E] font-semibold">Espaço</span>
          <span className="font-serif text-xl font-medium text-[#24211E] mt-0.5 truncate max-w-[200px]">{WEDDING_DATA.venue.name}</span>
          <span className="text-xs text-[#756E65]">{WEDDING_DATA.venue.city}</span>
        </div>
      </div>

      {/* Contagem Regressiva */}
      <div className="w-full max-w-2xl bg-gradient-to-b from-[#F4EFE1] to-[#FAF7F2] p-6 sm:p-8 rounded-3xl border border-[#CAA36B]/40 shadow-xl mb-10">
        <p className="font-serif text-xs uppercase tracking-[0.25em] text-[#9E7338] font-semibold mb-4">
          Contagem Regressiva para o Grande Dia
        </p>

        <div className="grid grid-cols-4 gap-2 sm:gap-4">
          <div className="bg-[#FAF7F2] p-3 sm:p-4 rounded-2xl border border-[#CAA36B]/25 shadow-xs flex flex-col items-center">
            <span className="font-serif text-3xl sm:text-5xl font-semibold text-[#24211E]">
              {timeLeft.days}
            </span>
            <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#756E65] mt-1">Dias</span>
          </div>

          <div className="bg-[#FAF7F2] p-3 sm:p-4 rounded-2xl border border-[#CAA36B]/25 shadow-xs flex flex-col items-center">
            <span className="font-serif text-3xl sm:text-5xl font-semibold text-[#24211E]">
              {String(timeLeft.hours).padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#756E65] mt-1">Horas</span>
          </div>

          <div className="bg-[#FAF7F2] p-3 sm:p-4 rounded-2xl border border-[#CAA36B]/25 shadow-xs flex flex-col items-center">
            <span className="font-serif text-3xl sm:text-5xl font-semibold text-[#24211E]">
              {String(timeLeft.minutes).padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#756E65] mt-1">Min</span>
          </div>

          <div className="bg-[#FAF7F2] p-3 sm:p-4 rounded-2xl border border-[#CAA36B]/25 shadow-xs flex flex-col items-center">
            <span className="font-serif text-3xl sm:text-5xl font-semibold text-[#9E7338]">
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#756E65] mt-1">Seg</span>
          </div>
        </div>

        {/* Botões de Salvar na Agenda */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
          <a
            href={getGoogleCalendarUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#FAF7F2] hover:bg-[#ECDCC2] text-[#24211E] text-xs font-medium px-4 py-2.5 rounded-full border border-[#CAA36B]/40 transition-all duration-300 shadow-xs hover:shadow-sm"
          >
            <Calendar className="w-4 h-4 text-[#9E7338]" />
            Adicionar ao Google Agenda
          </a>

          <button
            onClick={downloadIcsFile}
            className="inline-flex items-center gap-2 bg-[#FAF7F2] hover:bg-[#ECDCC2] text-[#24211E] text-xs font-medium px-4 py-2.5 rounded-full border border-[#CAA36B]/40 transition-all duration-300 shadow-xs hover:shadow-sm"
          >
            <Download className="w-4 h-4 text-[#9E7338]" />
            Salvar no Apple iCal (.ics)
          </button>
        </div>
      </div>

      {/* Menu Rápido de Atalhos Elegante */}
      <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-medium text-[#756E65]">
        <a href="#historia" className="px-3.5 py-1.5 rounded-full bg-[#FAF7F2] hover:bg-[#ECDCC2] border border-[#CAA36B]/30 transition-colors">
          Nossa História
        </a>
        <a href="#programacao" className="px-3.5 py-1.5 rounded-full bg-[#FAF7F2] hover:bg-[#ECDCC2] border border-[#CAA36B]/30 transition-colors">
          Programação
        </a>
        <a href="#localizacao" className="px-3.5 py-1.5 rounded-full bg-[#FAF7F2] hover:bg-[#ECDCC2] border border-[#CAA36B]/30 transition-colors">
          Como Chegar
        </a>
        <a href="#dresscode" className="px-3.5 py-1.5 rounded-full bg-[#FAF7F2] hover:bg-[#ECDCC2] border border-[#CAA36B]/30 transition-colors">
          Dress Code
        </a>
        <a href="#presentes" className="px-3.5 py-1.5 rounded-full bg-[#FAF7F2] hover:bg-[#ECDCC2] border border-[#CAA36B]/30 transition-colors">
          Lista de Presentes Pix
        </a>
        <a href="#rsvp" className="px-3.5 py-1.5 rounded-full bg-[#CAA36B] text-white hover:bg-[#9E7338] transition-colors shadow-xs">
          Confirmar Presença
        </a>
      </div>

      {/* Caixa de Perguntas / Validação da Capa Principal */}
      <SectionFeedbackBox
        sectionId="hero"
        sectionTitle="Capa Principal & Foto"
        questions={[
          {
            id: 'foto_principal',
            question: 'Foto principal do casal: O que acharam da foto e do enquadramento de vocês dois?',
            options: [
              'Aprovada! O enquadramento ficou lindo e valorizou nós dois.',
              'Gostaria de testar outra foto (vamos enviar um novo arquivo).',
            ],
          },
          {
            id: 'frase_romantica',
            question: 'Frase dos noivos: A frase atual ("O amor não se vê com os olhos, mas com o coração") reflete vocês dois?',
            options: [
              'Sim, perfeita! Podemos manter essa frase.',
              'Queremos sugerir outra frase ou versículo próprio.',
            ],
          },
          {
            id: 'logo_apresentacao',
            question: 'Logo e nomes no topo: A apresentação com a logo oficial e o monograma atendeu às expectativas?',
            options: [
              'Sim, muito elegante e combinou com o estilo do nosso casamento.',
              'Gostaria de ajustes no tamanho ou no posicionamento.',
            ],
          },
        ]}
      />
    </section>
  );
};
