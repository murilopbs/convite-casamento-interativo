import React, { useState, useEffect, useRef } from 'react';
import { PageFlip } from 'page-flip';
import confetti from 'canvas-confetti';
import { 
  Heart, 
  MapPin, 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  Copy, 
  Check, 
  Send, 
  Bookmark, 
  VolumeX, 
  Compass, 
  Navigation, 
  Eye, 
  EyeOff, 
  Image as ImageIcon
} from 'lucide-react';
import { WEDDING_DATA } from '../weddingData';

interface ConviteLivroEditorialProps {
  onPlayMusic?: () => void;
  isMusicPlaying?: boolean;
  onToggleMusic?: () => void;
}

// 5 Fotos cinematográficas em alta definição para o fundo do cenário
const HD_BACKGROUNDS = [
  {
    url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=85",
    title: "Mesa Iluminada ao Ar Livre",
  },
  {
    url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=2000&q=85",
    title: "Pôr do Sol Dourado",
  },
  {
    url: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=2000&q=85",
    title: "Arco Floral no Jardim",
  },
  {
    url: WEDDING_DATA.venue.image,
    title: "Sítio Verde Flor (O Local)",
  },
  {
    url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=2000&q=85",
    title: "Brinde & Recepção",
  }
];

export const ConviteLivroEditorial: React.FC<ConviteLivroEditorialProps> = ({
  onPlayMusic,
  isMusicPlaying = false,
  onToggleMusic
}) => {
  const bookContainerRef = useRef<HTMLDivElement | null>(null);
  const pageFlipInstance = useRef<PageFlip | null>(null);

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(8);

  // Fundo e ambientação
  const [bgIndex, setBgIndex] = useState(0);
  const [bgBlur, setBgBlur] = useState(true);

  // Menu Marcador de Fita (Bookmark Ribbon)
  const [isRibbonOpen, setIsRibbonOpen] = useState(false);

  // Estados dos formulários e interações
  const [copiedPix, setCopiedPix] = useState(false);
  const [rsvpName, setRsvpName] = useState('');
  const [rsvpPhone, setRsvpPhone] = useState('');
  const [rsvpAttending, setRsvpAttending] = useState<'yes' | 'no'>('yes');
  const [rsvpCompanions, setRsvpCompanions] = useState('1');
  const [rsvpMessage, setRsvpMessage] = useState('');

  // Contagem regressiva
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Som suave de virada de página (Web Audio API - sintetizado, ultra leve e sem dependência externa)
  const playPageSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(180, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(60, ctx.currentTime + 0.12);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } catch {
      // Falha silenciosa se áudio estiver desabilitado
    }
  };

  const triggerHaptic = () => {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(12);
      } catch {
        // Ignora
      }
    }
  };

  // Atualizar contagem regressiva
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
      }
    };
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // Inicialização do Motor de Dobra de Página Realista (PageFlip)
  useEffect(() => {
    if (!bookContainerRef.current) return;

    // Dimensões fluidas e responsivas para evitar corte de texto
    const calculateBookDimensions = () => {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      let bookW = 360;
      let bookH = 560;

      if (screenWidth < 380) {
        bookW = 320;
        bookH = Math.min(Math.round(screenHeight * 0.74), 510);
      } else if (screenWidth < 640) {
        bookW = Math.min(screenWidth - 36, 380);
        bookH = Math.min(Math.round(screenHeight * 0.74), 580);
      } else {
        // Tablet / Desktop
        bookW = 400;
        bookH = Math.min(Math.round(screenHeight * 0.74), 620);
      }

      return { bookW, bookH };
    };

    const { bookW, bookH } = calculateBookDimensions();

    const pageFlip = new PageFlip(bookContainerRef.current, {
      width: bookW,
      height: bookH,
      size: 'fixed',
      minWidth: 290,
      maxWidth: 550,
      minHeight: 460,
      maxHeight: 780,
      drawShadow: true,
      maxShadowOpacity: 0.35,
      showCover: false,
      usePortrait: true,
      mobileScrollSupport: false,
      clickEventForward: true,
      useMouseEvents: true,
      swipeDistance: 15,
      showPageCorners: true,
      disableFlipByClick: false,
      flippingTime: 420,
    });

    const pages = bookContainerRef.current.querySelectorAll<HTMLElement>('.editorial-page-item');
    if (pages.length > 0) {
      pageFlip.loadFromHTML(pages);
      setTotalPages(pages.length);
    }

    pageFlip.on('flip', (e: { data: number }) => {
      setCurrentPage(e.data);
      playPageSound();
      triggerHaptic();
    });

    pageFlipInstance.current = pageFlip;

    // Ajuste dinâmico de resize com debounce suave
    let resizeTimer: ReturnType<typeof setTimeout> | undefined;
    const handleResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        try {
          pageFlip.update();
        } catch {
          // Ignora
        }
      }, 150);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      try {
        pageFlip.destroy();
      } catch {
        // Ignora
      }
    };
  }, []);

  // Atalhos de teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        pageFlipInstance.current?.flipNext('bottom');
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        pageFlipInstance.current?.flipPrev('bottom');
      } else if (e.key === 'Escape') {
        setIsRibbonOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const flipNext = () => {
    pageFlipInstance.current?.flipNext('bottom');
  };

  const flipPrev = () => {
    pageFlipInstance.current?.flipPrev('bottom');
  };

  const jumpToPage = (index: number) => {
    pageFlipInstance.current?.flip(index, 'bottom');
    setIsRibbonOpen(false);
  };

  const handleCopyPix = () => {
    navigator.clipboard.writeText(WEDDING_DATA.pix.pixKey);
    setCopiedPix(true);
    triggerHaptic();
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.65 },
      colors: ['#CAA36B', '#D8B765', '#56695B'],
    });
    setTimeout(() => setCopiedPix(false), 3000);
  };

  const handleSendRsvp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpName.trim()) return;

    const status = rsvpAttending === 'yes' ? '✅ SIM, com muita alegria estarei presente!' : '❌ Infelizmente não poderei comparecer, mas desejo toda a felicidade!';
    const msgCompanions = rsvpCompanions ? `\n👥 *Acompanhantes:* ${rsvpCompanions} pessoa(s)` : '';
    const msgDedication = rsvpMessage.trim() ? `\n💌 *Mensagem:* "${rsvpMessage.trim()}"` : '';

    const text = encodeURIComponent(
      `Olá Daniela & Édson! ❤️\n\n*CONFIRMAÇÃO DE PRESENÇA (Convite Livro Editorial)*\n${status}\n\n👤 *Nome:* ${rsvpName}\n📱 *WhatsApp:* ${rsvpPhone || 'Não informado'}${msgCompanions}${msgDedication}`
    );

    window.open(`https://wa.me/${WEDDING_DATA.rsvp.whatsappNumber}?text=${text}`, '_blank');
  };

  const getGoogleCalendarUrl = () => {
    const startDate = "20270925T193000Z";
    const endDate = "20270926T030000Z";
    const title = encodeURIComponent(WEDDING_DATA.date.calendarSummary);
    const details = encodeURIComponent(WEDDING_DATA.date.calendarDescription);
    const location = encodeURIComponent(`${WEDDING_DATA.venue.name}, ${WEDDING_DATA.venue.address}, ${WEDDING_DATA.venue.city}`);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${details}&location=${location}`;
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden select-none bg-[#1A1816] text-[#24211E] flex flex-col justify-between">
      
      {/* ============================================================== */}
      {/* 1. CENÁRIO CINEMATOGRÁFICO DE FUNDO (ALTA DEFINIÇÃO)           */}
      {/* ============================================================== */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {HD_BACKGROUNDS.map((bg, idx) => (
          <div
            key={bg.url}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
              idx === bgIndex ? 'opacity-100 animate-ken-burns' : 'opacity-0'
            }`}
            style={{ backgroundImage: `url(${bg.url})` }}
          />
        ))}
        {/* Iluminação suave e vinheta */}
        <div className={`absolute inset-0 transition-backdrop duration-700 ${bgBlur ? 'backdrop-blur-md bg-black/55' : 'bg-black/35 backdrop-blur-[1px]'}`} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/60 pointer-events-none" />
      </div>

      {/* ============================================================== */}
      {/* 2. BARRA DE CONTROLE SUPERIOR (MÚSICA, FUNDO E ÍNDICE)         */}
      {/* ============================================================== */}
      <header className="relative z-30 flex items-center justify-between px-3 sm:px-8 py-2.5 max-w-5xl mx-auto w-full">
        {/* Monograma & Identidade */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#FAF7F2]/90 backdrop-blur-md border border-[#CAA36B]/60 flex items-center justify-center shadow-md">
            <span className="font-serif text-[#CAA36B] font-bold text-xs tracking-wider">
              D&E
            </span>
          </div>
          <div className="hidden sm:block text-left">
            <p className="font-serif text-[#FAF7F2] text-xs tracking-widest uppercase">
              {WEDDING_DATA.couple.bride} & {WEDDING_DATA.couple.groom}
            </p>
            <p className="text-[9px] text-[#CAA36B] tracking-wider uppercase font-medium">
              25 . 09 . 2027 • Tendência Livro
            </p>
          </div>
        </div>

        {/* Controles Flutuantes */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Alternar Fundo HD */}
          <button
            onClick={() => setBgIndex((prev) => (prev + 1) % HD_BACKGROUNDS.length)}
            title="Alternar Foto de Casamento de Fundo"
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/45 hover:bg-black/65 backdrop-blur-md text-[#ECDCC2] border border-[#CAA36B]/30 hover:border-[#CAA36B] transition-all text-[11px] cursor-pointer"
          >
            <ImageIcon className="w-3.5 h-3.5 text-[#CAA36B]" />
            <span className="hidden md:inline">Trocar Fundo</span>
          </button>

          {/* Alternar Desfoque */}
          <button
            onClick={() => setBgBlur(!bgBlur)}
            title={bgBlur ? "Ver foto de fundo nítida" : "Focar no Livro"}
            className="p-1.5 rounded-full bg-black/45 hover:bg-black/65 backdrop-blur-md text-[#ECDCC2] border border-[#CAA36B]/30 hover:border-[#CAA36B] transition-all text-xs cursor-pointer"
          >
            {bgBlur ? <Eye className="w-3.5 h-3.5 text-[#CAA36B]" /> : <EyeOff className="w-3.5 h-3.5 text-[#ECDCC2]" />}
          </button>

          {/* Trilha Sonora "Pra Você Guardei o Amor" */}
          {onToggleMusic && (
            <button
              onClick={() => {
                onToggleMusic();
                if (!isMusicPlaying && onPlayMusic) onPlayMusic();
              }}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full backdrop-blur-md border transition-all text-xs cursor-pointer ${
                isMusicPlaying
                  ? 'bg-[#CAA36B] text-white border-[#CAA36B] shadow-[0_0_12px_rgba(202,163,107,0.5)]'
                  : 'bg-black/45 text-[#ECDCC2] border-[#CAA36B]/30 hover:border-[#CAA36B]'
              }`}
            >
              {isMusicPlaying ? (
                <>
                  <div className="flex items-end gap-0.5 h-3">
                    <span className="w-0.5 bg-white rounded-full sound-bar-1" />
                    <span className="w-0.5 bg-white rounded-full sound-bar-2" />
                    <span className="w-0.5 bg-white rounded-full sound-bar-3" />
                  </div>
                  <span className="font-medium hidden sm:inline text-[11px]">Pra Você Guardei o Amor</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5" />
                  <span className="font-medium hidden sm:inline text-[11px]">Música</span>
                </>
              )}
            </button>
          )}

          {/* Fita de Índice / Sumário */}
          <button
            onClick={() => setIsRibbonOpen(!isRibbonOpen)}
            className="relative px-2.5 py-1 rounded-full bg-[#CAA36B] text-white hover:bg-[#9E7338] transition-all text-[11px] font-semibold flex items-center gap-1 cursor-pointer shadow-md"
            title="Abrir Sumário"
          >
            <Bookmark className="w-3 h-3 fill-white" />
            <span>Índice</span>
          </button>
        </div>
      </header>

      {/* Menu Dropdown de Páginas */}
      {isRibbonOpen && (
        <div className="fixed top-12 right-4 sm:right-16 z-50 w-64 bg-[#FAF7F2] rounded-2xl shadow-2xl border border-[#CAA36B]/40 p-3 text-[#24211E] animate-fadeIn">
          <div className="flex items-center justify-between pb-1.5 border-b border-[#CAA36B]/20 mb-2">
            <span className="font-serif font-semibold text-xs tracking-wider uppercase text-[#CAA36B]">
              Sumário do Livro
            </span>
            <span className="text-[10px] text-[#7A746E]">8 Lâminas</span>
          </div>
          <nav className="flex flex-col gap-1 max-h-64 overflow-y-auto pr-1">
            {[
              { page: 0, title: "Capa do Livro", desc: "Monograma & Foto Oficial" },
              { page: 1, title: "Save The Date", desc: "Contagem & Mensagem" },
              { page: 2, title: "A Cerimônia", desc: "Horários & Calendário" },
              { page: 3, title: "O Local", desc: "Sítio Verde Flor & GPS" },
              { page: 4, title: "Dress Code", desc: "Traje & Paleta Botânica" },
              { page: 5, title: "Presentes & Pix", desc: "Chave Pix com Cópia" },
              { page: 6, title: "Confirmar Presença", desc: "RSVP WhatsApp" },
              { page: 7, title: "Contracapa", desc: "Agradecimento Final" },
            ].map((item) => (
              <button
                key={item.page}
                onClick={() => jumpToPage(item.page)}
                className={`flex items-center justify-between p-1.5 rounded-lg text-left transition-all cursor-pointer ${
                  currentPage === item.page
                    ? 'bg-[#CAA36B] text-white font-medium'
                    : 'hover:bg-[#ECDCC2]/50 text-[#24211E]'
                }`}
              >
                <div>
                  <p className="text-[11px] font-semibold leading-tight">{item.title}</p>
                  <p className={`text-[9px] ${currentPage === item.page ? 'text-white/80' : 'text-[#7A746E]'}`}>
                    {item.desc}
                  </p>
                </div>
                <span className="text-[10px] opacity-70">
                  {item.page + 1}
                </span>
              </button>
            ))}
          </nav>
        </div>
      )}

      {/* ============================================================== */}
      {/* 3. O LIVRO EDITORIAL REALISTA COM MOTOR DE DOBRA DE PÁGINAS   */}
      {/* ============================================================== */}
      <main className="relative z-20 flex-1 flex flex-col items-center justify-center px-2 sm:px-4 py-1">
        
        {/* Container do Livro (Onde o PageFlip cria a magia) */}
        <div className="relative flex items-center justify-center max-w-full">
          
          <div 
            ref={bookContainerRef} 
            className="editorial-flipbook shadow-[0_20px_60px_rgba(0,0,0,0.65)] rounded-2xl overflow-hidden bg-[#FAF8F5]"
          >

            {/* ======================================================== */}
            {/* LÂMINA 1: CAPA NOBRE (ESTILO VÍDEO MODELO 4)            */}
            {/* ======================================================== */}
            <div className="editorial-page-item w-full h-full bg-[#FAF8F5] relative overflow-hidden flex flex-col justify-between p-3.5 sm:p-5 text-center select-none border border-[#CAA36B]/30" data-density="soft">
              <div className="absolute inset-0 bg-paper opacity-85 pointer-events-none" />

              {/* Topo: Guirlanda Botânica e Monograma */}
              <div className="relative z-10 pt-1 space-y-1">
                {/* Monograma com ramos de oliveira em ouro */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto rounded-full border border-[#CAA36B]/60 flex items-center justify-center bg-[#FAF7F2] shadow-xs relative">
                  <div className="absolute -inset-1 border border-[#CAA36B]/25 rounded-full pointer-events-none" />
                  <span className="font-serif text-xl sm:text-2xl text-[#9E7338] font-semibold tracking-wider">
                    D & E
                  </span>
                </div>

                <p className="font-serif text-[10px] uppercase tracking-[0.25em] text-[#7A746E] pt-1">
                  Convidam você para o casamento de
                </p>

                <h1 className="font-serif text-2xl sm:text-3xl text-[#24211E] tracking-widest uppercase font-medium">
                  {WEDDING_DATA.couple.bride} & {WEDDING_DATA.couple.groom}
                </h1>
              </div>

              {/* Metade Inferior: Foto Oficial do Casal com Moldura Nobre */}
              <div className="relative z-10 my-auto py-1">
                <div className="w-full aspect-[4/3] rounded-xl overflow-hidden shadow-md border-2 border-white/90 bg-[#ECDCC2]">
                  <img 
                    src={WEDDING_DATA.photos.hero} 
                    alt="Daniela & Édson"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>

              {/* Rodapé da Capa com o Cantinho Convidativo */}
              <div className="relative z-10 pb-0.5 flex items-center justify-between text-[#7A746E] border-t border-[#CAA36B]/25 pt-2">
                <span className="text-[10px] text-[#CAA36B] font-serif uppercase tracking-widest font-medium">
                  25 . 09 . 2027
                </span>

                <div 
                  onClick={flipNext}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#CAA36B]/20 hover:bg-[#CAA36B] hover:text-white text-[#9E7338] text-[10px] font-semibold animate-corner-breathe cursor-pointer transition-all shadow-2xs"
                >
                  <span>Folhear Lâmina</span>
                  <span className="text-xs font-bold">➔</span>
                </div>
              </div>
            </div>

            {/* ======================================================== */}
            {/* LÂMINA 2: SAVE THE DATE & CARTA AOS CONVIDADOS           */}
            {/* ======================================================== */}
            <div className="editorial-page-item w-full h-full bg-[#FAF8F5] relative overflow-hidden flex flex-col justify-between p-3.5 sm:p-5 text-center select-none border border-[#CAA36B]/30" data-density="soft">
              <div className="absolute inset-0 bg-paper opacity-85 pointer-events-none" />

              <div className="relative z-10 pt-1 space-y-1">
                <div className="inline-block px-2.5 py-0.5 rounded-full bg-[#ECDCC2]/60 border border-[#CAA36B]/40 text-[#9E7338] text-[9px] font-semibold tracking-widest uppercase">
                  Capítulo I • O Começo
                </div>

                <h2 className="font-serif text-xl sm:text-2xl text-[#24211E] tracking-widest uppercase">
                  Save The Date
                </h2>

                <p className="font-script text-xl sm:text-2xl text-[#CAA36B]">
                  25 de Setembro de 2027
                </p>
              </div>

              {/* Contagem Regressiva em Cartões Nobres */}
              <div className="relative z-10 my-auto py-1">
                <div className="grid grid-cols-4 gap-1.5 max-w-xs mx-auto mb-3">
                  {[
                    { label: "Dias", value: timeLeft.days },
                    { label: "Horas", value: timeLeft.hours },
                    { label: "Minutos", value: timeLeft.minutes },
                    { label: "Segundos", value: timeLeft.seconds },
                  ].map((item, idx) => (
                    <div key={idx} className="p-1.5 rounded-xl bg-[#F4EFE1] border border-[#CAA36B]/35 shadow-xs">
                      <span className="font-serif text-lg sm:text-xl font-bold text-[#9E7338] block leading-tight">
                        {item.value}
                      </span>
                      <p className="text-[8px] uppercase tracking-wider text-[#7A746E]">
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Carta dos Noivos com Trecho Musical */}
                <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#CAA36B]/30 text-left max-w-xs mx-auto space-y-1.5 shadow-2xs">
                  <p className="font-script text-base sm:text-lg text-[#9E7338] text-center">
                    "Pra você guardei o amor que nunca soube dar..."
                  </p>
                  <p className="text-[11px] text-[#524B43] leading-relaxed">
                    Depois de tantos momentos inesquecíveis, chegou o dia de darmos o passo mais lindo de nossas vidas. Ter a sua presença ao nosso lado torna este sonho completo!
                  </p>
                </div>
              </div>

              {/* Assinatura dos Noivos */}
              <div className="relative z-10 pb-0.5 flex items-center justify-between text-[#7A746E] border-t border-[#CAA36B]/25 pt-2">
                <span className="font-script text-base text-[#CAA36B]">
                  Com carinho, Dani & Édson
                </span>
                <span className="text-[9px] uppercase tracking-wider text-[#9E7338]">
                  Página 2 de 8
                </span>
              </div>
            </div>

            {/* ======================================================== */}
            {/* LÂMINA 3: A CERIMÔNIA & CRONOGRAMA DA CELEBRAÇÃO         */}
            {/* ======================================================== */}
            <div className="editorial-page-item w-full h-full bg-[#FAF8F5] relative overflow-hidden flex flex-col justify-between p-3.5 sm:p-5 text-center select-none border border-[#CAA36B]/30" data-density="soft">
              <div className="absolute inset-0 bg-paper opacity-85 pointer-events-none" />

              <div className="relative z-10 pt-1 space-y-0.5">
                <div className="inline-block px-2.5 py-0.5 rounded-full bg-[#ECDCC2]/60 border border-[#CAA36B]/40 text-[#9E7338] text-[9px] font-semibold tracking-widest uppercase">
                  Capítulo II • O Grande Dia
                </div>
                <h2 className="font-serif text-xl sm:text-2xl text-[#24211E]">
                  A Cerimônia & Horários
                </h2>
                <p className="text-[10px] text-[#7A746E] uppercase tracking-wider">
                  Sábado • 16h30
                </p>
              </div>

              {/* Linha do Tempo Visual */}
              <div className="relative z-10 my-auto py-1 max-w-xs mx-auto w-full space-y-2 text-left">
                {[
                  { time: "16h30", title: "Recepção com Welcome Drink", desc: "Acolhimento nos jardins com música acústica." },
                  { time: "17h00", title: "Cerimônia das Alianças", desc: "A bênção do nosso matrimônio ao pôr do sol." },
                  { time: "18h30", title: "Jantar & Brinde", desc: "Gastronomia e momentos especiais com os convidados." },
                  { time: "20h00", title: "Abertura da Pista de Dança", desc: "Muita música e celebração até a madrugada!" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-2 rounded-xl bg-[#FAF7F2] border border-[#CAA36B]/25">
                    <span className="font-serif font-bold text-xs text-[#9E7338] w-11 shrink-0 pt-0.5">
                      {item.time}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-semibold text-[#24211E] truncate">{item.title}</p>
                      <p className="text-[9px] text-[#7A746E] leading-tight">{item.desc}</p>
                    </div>
                  </div>
                ))}

                {/* Botão de Salvar no Calendário */}
                <div className="pt-1 text-center" onPointerDown={(e) => e.stopPropagation()}>
                  <a
                    href={getGoogleCalendarUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-[#ECDCC2] hover:bg-[#CAA36B] hover:text-white transition-all text-[#24211E] text-[11px] font-semibold border border-[#CAA36B]/40 shadow-xs cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5 text-[#9E7338]" />
                    <span>Salvar no Google Agenda</span>
                  </a>
                </div>
              </div>

              <div className="relative z-10 pb-0.5 flex items-center justify-between text-[#7A746E] border-t border-[#CAA36B]/25 pt-2">
                <span className="text-[10px] text-[#CAA36B] font-serif uppercase tracking-wider">
                  Sítio Verde Flor
                </span>
                <span className="text-[9px] uppercase tracking-wider text-[#9E7338]">
                  Página 3 de 8
                </span>
              </div>
            </div>

            {/* ======================================================== */}
            {/* LÂMINA 4: O LOCAL (SÍTIO VERDE FLOR & TRAJETOS)          */}
            {/* ======================================================== */}
            <div className="editorial-page-item w-full h-full bg-[#FAF8F5] relative overflow-hidden flex flex-col justify-between p-3.5 sm:p-5 text-center select-none border border-[#CAA36B]/30" data-density="soft">
              <div className="absolute inset-0 bg-paper opacity-85 pointer-events-none" />

              <div className="relative z-10 pt-1 space-y-0.5">
                <div className="inline-block px-2.5 py-0.5 rounded-full bg-[#ECDCC2]/60 border border-[#CAA36B]/40 text-[#9E7338] text-[9px] font-semibold tracking-widest uppercase">
                  Capítulo III • O Espaço
                </div>
                <h2 className="font-serif text-xl sm:text-2xl text-[#24211E]">
                  {WEDDING_DATA.venue.name}
                </h2>
                <p className="text-[10px] text-[#7A746E] uppercase tracking-wider">
                  {WEDDING_DATA.venue.city}
                </p>
              </div>

              {/* Foto e Endereço */}
              <div className="relative z-10 my-auto py-1 max-w-xs mx-auto w-full space-y-2">
                <div className="w-full aspect-[16/9] rounded-xl overflow-hidden shadow-xs border-2 border-white/90 bg-[#ECDCC2]">
                  <img 
                    src={WEDDING_DATA.venue.image} 
                    alt={WEDDING_DATA.venue.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-2.5 rounded-xl bg-[#FAF7F2] border border-[#CAA36B]/30 text-left space-y-1">
                  <div className="flex items-start gap-1.5 text-[11px] text-[#524B43]">
                    <MapPin className="w-3.5 h-3.5 text-[#CAA36B] shrink-0 mt-0.5" />
                    <span>{WEDDING_DATA.venue.address}</span>
                  </div>
                  <p className="text-[9px] text-[#7A746E] leading-relaxed">
                    {WEDDING_DATA.venue.description}
                  </p>
                </div>

                {/* Botões de GPS com stopPropagation para não acionar arraste */}
                <div className="flex justify-center gap-1.5 pt-1" onPointerDown={(e) => e.stopPropagation()}>
                  <a
                    href={WEDDING_DATA.venue.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#24211E] text-[#FAF7F2] text-[10px] font-medium hover:bg-[#CAA36B] transition-colors shadow-xs cursor-pointer"
                  >
                    <Compass className="w-3 h-3" />
                    <span>Maps</span>
                  </a>
                  <a
                    href={WEDDING_DATA.venue.wazeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#00D7FE] text-black text-[10px] font-bold hover:opacity-90 transition-opacity shadow-xs cursor-pointer"
                  >
                    <Navigation className="w-3 h-3" />
                    <span>Waze</span>
                  </a>
                  <a
                    href={WEDDING_DATA.venue.uberUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-black text-white text-[10px] font-medium hover:bg-neutral-800 transition-colors shadow-xs cursor-pointer"
                  >
                    <span>Uber</span>
                  </a>
                </div>
              </div>

              <div className="relative z-10 pb-0.5 flex items-center justify-between text-[#7A746E] border-t border-[#CAA36B]/25 pt-2">
                <span className="text-[10px] text-[#CAA36B] font-serif uppercase tracking-wider">
                  Planaltina - DF
                </span>
                <span className="text-[9px] uppercase tracking-wider text-[#9E7338]">
                  Página 4 de 8
                </span>
              </div>
            </div>

            {/* ======================================================== */}
            {/* LÂMINA 5: DRESS CODE & PALETA BOTÂNICA NO CAMPO          */}
            {/* ======================================================== */}
            <div className="editorial-page-item w-full h-full bg-[#FAF8F5] relative overflow-hidden flex flex-col justify-between p-3.5 sm:p-5 text-center select-none border border-[#CAA36B]/30" data-density="soft">
              <div className="absolute inset-0 bg-paper opacity-85 pointer-events-none" />

              <div className="relative z-10 pt-1 space-y-0.5">
                <div className="inline-block px-2.5 py-0.5 rounded-full bg-[#ECDCC2]/60 border border-[#CAA36B]/40 text-[#9E7338] text-[9px] font-semibold tracking-widest uppercase">
                  Capítulo IV • O Que Vestir
                </div>
                <h2 className="font-serif text-xl sm:text-2xl text-[#24211E]">
                  {WEDDING_DATA.dressCode.title}
                </h2>
                <p className="text-[10px] text-[#7A746E] max-w-xs mx-auto">
                  {WEDDING_DATA.dressCode.subtitle}
                </p>
              </div>

              {/* Amostras de Cores e Recomendações */}
              <div className="relative z-10 my-auto py-1 max-w-xs mx-auto w-full space-y-2">
                <div className="p-3 rounded-xl bg-[#F4EFE1] border border-[#CAA36B]/30 shadow-2xs">
                  <p className="text-[9px] font-semibold text-[#524B43] uppercase tracking-wider mb-2">
                    Paleta de Cores em Harmonia com o Sítio
                  </p>
                  <div className="flex items-center justify-center gap-2 flex-wrap">
                    {WEDDING_DATA.dressCode.recommendedColors.map((color, idx) => (
                      <div key={idx} className="flex flex-col items-center">
                        <div 
                          className="w-6 h-6 rounded-full border border-black/10 shadow-xs"
                          style={{ backgroundColor: color.hex }}
                          title={color.name}
                        />
                        <span className="text-[8px] text-[#7A746E] mt-0.5 font-medium">
                          {color.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-1.5 text-left text-xs">
                  <div className="p-2 rounded-xl bg-[#FAF7F2] border border-[#CAA36B]/30">
                    <p className="font-semibold text-[#9E7338] text-[10px] uppercase tracking-wider">
                      ✨ Carinho com a Noiva
                    </p>
                    <p className="text-[#524B43] text-[10px] leading-tight">
                      {WEDDING_DATA.dressCode.gentleReminder}
                    </p>
                  </div>
                  <div className="p-2 rounded-xl bg-[#FAF7F2] border border-[#CAA36B]/30">
                    <p className="font-semibold text-[#56695B] text-[10px] uppercase tracking-wider">
                      🌿 Dica para o Gramado
                    </p>
                    <p className="text-[#524B43] text-[10px] leading-tight">
                      Recomendamos sapatos com salto bloco, anabela ou calçados confortáveis para curtir o jardim.
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative z-10 pb-0.5 flex items-center justify-between text-[#7A746E] border-t border-[#CAA36B]/25 pt-2">
                <span className="text-[10px] text-[#CAA36B] font-serif uppercase tracking-wider">
                  Elegância & Conforto
                </span>
                <span className="text-[9px] uppercase tracking-wider text-[#9E7338]">
                  Página 5 de 8
                </span>
              </div>
            </div>

            {/* ======================================================== */}
            {/* LÂMINA 6: LISTA DE PRESENTES & CHAVE PIX                */}
            {/* ======================================================== */}
            <div className="editorial-page-item w-full h-full bg-[#FAF8F5] relative overflow-hidden flex flex-col justify-between p-3.5 sm:p-5 text-center select-none border border-[#CAA36B]/30" data-density="soft">
              <div className="absolute inset-0 bg-paper opacity-85 pointer-events-none" />

              <div className="relative z-10 pt-1 space-y-0.5">
                <div className="inline-block px-2.5 py-0.5 rounded-full bg-[#ECDCC2]/60 border border-[#CAA36B]/40 text-[#9E7338] text-[9px] font-semibold tracking-widest uppercase">
                  Capítulo V • Presentes
                </div>
                <h2 className="font-serif text-xl sm:text-2xl text-[#24211E]">
                  Carinho em Forma de Presente
                </h2>
                <p className="text-[10px] text-[#7A746E]">
                  Sua presença é o nosso maior presente!
                </p>
              </div>

              {/* Cartão de Pix Seguro */}
              <div className="relative z-10 my-auto py-1 max-w-xs mx-auto w-full space-y-2">
                <p className="text-[11px] text-[#524B43] leading-relaxed">
                  Caso queira nos presentear com uma contribuição para o início do nosso novo lar e nossa viagem de Lua de Mel:
                </p>

                <div 
                  className="p-3.5 rounded-2xl bg-[#F4EFE1] border-2 border-[#CAA36B]/45 shadow-sm text-center space-y-2"
                  onPointerDown={(e) => e.stopPropagation()}
                >
                  <p className="text-[9px] uppercase tracking-widest text-[#7A746E] font-semibold">
                    Chave Pix Oficial (E-mail)
                  </p>

                  <div className="p-2 rounded-xl bg-white border border-[#CAA36B]/40 flex items-center justify-between gap-1.5 shadow-2xs">
                    <span className="font-mono text-xs text-[#24211E] truncate select-all">
                      {WEDDING_DATA.pix.pixKey}
                    </span>
                    <button
                      onClick={handleCopyPix}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all shrink-0 cursor-pointer ${
                        copiedPix ? 'bg-emerald-600 text-white' : 'bg-[#CAA36B] hover:bg-[#9E7338] text-white'
                      }`}
                    >
                      {copiedPix ? (
                        <>
                          <Check className="w-3 h-3" />
                          <span>Copiado!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copiar</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="text-[10px] text-[#7A746E] space-y-0.5">
                    <p><strong>Favorecida:</strong> {WEDDING_DATA.pix.recipientName}</p>
                    <p><strong>Instituição:</strong> {WEDDING_DATA.pix.bank}</p>
                  </div>
                </div>
              </div>

              <div className="relative z-10 pb-0.5 flex items-center justify-between text-[#7A746E] border-t border-[#CAA36B]/25 pt-2">
                <span className="text-[10px] text-[#CAA36B] font-serif uppercase tracking-wider">
                  Lua de Mel & Novo Lar
                </span>
                <span className="text-[9px] uppercase tracking-wider text-[#9E7338]">
                  Página 6 de 8
                </span>
              </div>
            </div>

            {/* ======================================================== */}
            {/* LÂMINA 7: CONFIRMAÇÃO DE PRESENÇA (RSVP)                 */}
            {/* ======================================================== */}
            <div className="editorial-page-item w-full h-full bg-[#FAF8F5] relative overflow-hidden flex flex-col justify-between p-3.5 sm:p-5 text-center select-none border border-[#CAA36B]/30" data-density="soft">
              <div className="absolute inset-0 bg-paper opacity-85 pointer-events-none" />

              <div className="relative z-10 pt-1 space-y-0.5">
                <div className="inline-block px-2.5 py-0.5 rounded-full bg-[#ECDCC2]/60 border border-[#CAA36B]/40 text-[#9E7338] text-[9px] font-semibold tracking-widest uppercase">
                  Capítulo VI • RSVP
                </div>
                <h2 className="font-serif text-xl sm:text-2xl text-[#24211E]">
                  Confirme Sua Presença
                </h2>
                <p className="text-[10px] text-[#7A746E]">
                  Por favor, confirme até <strong>{WEDDING_DATA.rsvp.deadline}</strong>
                </p>
              </div>

              {/* Formulário com stopPropagation completo para digitação segura no mobile */}
              <div 
                className="relative z-10 my-auto py-0.5 max-w-xs mx-auto w-full"
                onPointerDown={(e) => e.stopPropagation()}
                onTouchStart={(e) => e.stopPropagation()}
              >
                <form onSubmit={handleSendRsvp} className="p-3 rounded-2xl bg-[#F4EFE1] border border-[#CAA36B]/40 space-y-1.5 text-left shadow-2xs">
                  <div>
                    <label className="block text-[9px] uppercase tracking-wider text-[#7A746E] font-semibold mb-0.5">
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      required
                      value={rsvpName}
                      onChange={(e) => setRsvpName(e.target.value)}
                      placeholder="Seu nome"
                      className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-[#CAA36B]/40 text-xs text-[#24211E] focus:outline-none focus:ring-1 focus:ring-[#CAA36B]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-1.5">
                    <div>
                      <label className="block text-[9px] uppercase tracking-wider text-[#7A746E] font-semibold mb-0.5">
                        WhatsApp
                      </label>
                      <input
                        type="tel"
                        value={rsvpPhone}
                        onChange={(e) => setRsvpPhone(e.target.value)}
                        placeholder="(61) 99999-9999"
                        className="w-full px-2 py-1.5 rounded-lg bg-white border border-[#CAA36B]/40 text-xs text-[#24211E] focus:outline-none focus:ring-1 focus:ring-[#CAA36B]"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] uppercase tracking-wider text-[#7A746E] font-semibold mb-0.5">
                        Acompanhantes
                      </label>
                      <select
                        value={rsvpCompanions}
                        onChange={(e) => setRsvpCompanions(e.target.value)}
                        className="w-full px-2 py-1.5 rounded-lg bg-white border border-[#CAA36B]/40 text-xs text-[#24211E] focus:outline-none focus:ring-1 focus:ring-[#CAA36B]"
                      >
                        <option value="0">Apenas eu</option>
                        <option value="1">+ 1 pessoa</option>
                        <option value="2">+ 2 pessoas</option>
                        <option value="3">+ 3 pessoas</option>
                      </select>
                    </div>
                  </div>

                  {/* Sim / Não */}
                  <div className="flex gap-1.5 pt-0.5">
                    <button
                      type="button"
                      onClick={() => setRsvpAttending('yes')}
                      className={`flex-1 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                        rsvpAttending === 'yes' ? 'bg-emerald-600 text-white shadow-2xs' : 'bg-white text-[#524B43] border border-[#CAA36B]/30'
                      }`}
                    >
                      ✓ Estarei lá!
                    </button>
                    <button
                      type="button"
                      onClick={() => setRsvpAttending('no')}
                      className={`flex-1 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                        rsvpAttending === 'no' ? 'bg-rose-700 text-white shadow-2xs' : 'bg-white text-[#524B43] border border-[#CAA36B]/30'
                      }`}
                    >
                      Não poderei
                    </button>
                  </div>

                  <div>
                    <label className="block text-[9px] uppercase tracking-wider text-[#7A746E] font-semibold mb-0.5">
                      Recado aos Noivos (Opcional)
                    </label>
                    <input
                      type="text"
                      value={rsvpMessage}
                      onChange={(e) => setRsvpMessage(e.target.value)}
                      placeholder="Deixe uma mensagem..."
                      className="w-full px-2.5 py-1 rounded-lg bg-white border border-[#CAA36B]/40 text-xs text-[#24211E] focus:outline-none focus:ring-1 focus:ring-[#CAA36B]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2 px-3 rounded-lg bg-gradient-to-r from-[#CAA36B] to-[#9E7338] text-white text-[11px] font-semibold uppercase tracking-wider shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-1"
                  >
                    <Send className="w-3 h-3" />
                    <span>Confirmar no WhatsApp</span>
                  </button>
                </form>
              </div>

              <div className="relative z-10 pb-0.5 flex items-center justify-between text-[#7A746E] border-t border-[#CAA36B]/25 pt-2">
                <span className="text-[10px] text-[#CAA36B] font-serif uppercase tracking-wider">
                  Até 25 de Agosto
                </span>
                <span className="text-[9px] uppercase tracking-wider text-[#9E7338]">
                  Página 7 de 8
                </span>
              </div>
            </div>

            {/* ======================================================== */}
            {/* LÂMINA 8: CONTRACAPA & RECADINHO FINAL                  */}
            {/* ======================================================== */}
            <div className="editorial-page-item w-full h-full bg-[#FAF8F5] relative overflow-hidden flex flex-col justify-between p-3.5 sm:p-5 text-center select-none border border-[#CAA36B]/30" data-density="soft">
              <div className="absolute inset-0 bg-paper opacity-85 pointer-events-none" />

              <div className="relative z-10 pt-1 space-y-1">
                <p className="font-serif text-[10px] uppercase tracking-[0.25em] text-[#CAA36B]">
                  Com todo nosso amor e carinho
                </p>
                <div className="flex items-center justify-center gap-2 my-1">
                  <span className="h-[1px] w-10 bg-[#CAA36B]/50" />
                  <Heart className="w-3.5 h-3.5 text-[#CAA36B] fill-[#CAA36B]" />
                  <span className="h-[1px] w-10 bg-[#CAA36B]/50" />
                </div>
              </div>

              <div className="relative z-10 my-auto py-2">
                <p className="font-script text-2xl sm:text-3xl text-[#9E7338] mb-1">
                  Esperamos por você!
                </p>

                <h2 className="font-serif text-2xl sm:text-3xl text-[#24211E] tracking-widest uppercase font-medium">
                  {WEDDING_DATA.couple.bride} & {WEDDING_DATA.couple.groom}
                </h2>

                <p className="text-xs text-[#524B43] max-w-xs mx-auto mt-2 leading-relaxed">
                  "O amor não se vê com os olhos, mas com o coração."
                </p>

                <p className="text-[10px] text-[#CAA36B] tracking-wider uppercase mt-3 font-medium">
                  25 de Setembro de 2027 • Sítio Verde Flor
                </p>
              </div>

              {/* Botões de Ação Final */}
              <div className="relative z-10 pb-0.5 flex items-center justify-center gap-2 pt-2 border-t border-[#CAA36B]/25">
                <button
                  onClick={() => jumpToPage(0)}
                  className="px-4 py-1.5 rounded-full bg-[#ECDCC2] hover:bg-[#CAA36B] hover:text-white transition-all text-[#24211E] text-xs font-semibold cursor-pointer shadow-2xs"
                >
                  Voltar à Capa
                </button>
              </div>
            </div>

          </div>

        </div>

      </main>

      {/* ============================================================== */}
      {/* 4. RODAPÉ DE NAVEGAÇÃO & CONTROLES TÁTEIS                      */}
      {/* ============================================================== */}
      <footer className="relative z-30 flex items-center justify-between px-4 sm:px-8 py-2 max-w-md mx-auto w-full text-xs text-[#ECDCC2]">
        {/* Botão Anterior */}
        <button
          onClick={flipPrev}
          disabled={currentPage === 0}
          className={`flex items-center gap-1 font-medium transition-all cursor-pointer ${
            currentPage === 0 ? 'opacity-30 pointer-events-none' : 'text-[#ECDCC2] hover:text-white'
          }`}
        >
          <ChevronLeft className="w-4 h-4 text-[#CAA36B]" />
          <span className="hidden sm:inline">Anterior</span>
        </button>

        {/* Indicadores de Lâminas */}
        <div className="flex items-center gap-1">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => jumpToPage(idx)}
              title={`Lâmina ${idx + 1}`}
              className={`transition-all rounded-full cursor-pointer ${
                currentPage === idx
                  ? 'w-4 h-1.5 bg-[#CAA36B]'
                  : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/60'
              }`}
            />
          ))}
        </div>

        {/* Botão Próxima */}
        <button
          onClick={flipNext}
          disabled={currentPage >= totalPages - 1}
          className={`flex items-center gap-1 font-medium transition-all cursor-pointer ${
            currentPage >= totalPages - 1 ? 'opacity-30 pointer-events-none' : 'text-[#ECDCC2] hover:text-white'
          }`}
        >
          <span className="hidden sm:inline">Próxima</span>
          <ChevronRight className="w-4 h-4 text-[#CAA36B]" />
        </button>
      </footer>

    </div>
  );
};
