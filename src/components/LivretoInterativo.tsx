import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { 
  Heart, 
  Sparkles, 
  MapPin, 
  Calendar, 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  Copy, 
  Check, 
  Send, 
  Bookmark, 
  VolumeX, 
  Compass, 
  Navigation, 
  RotateCcw,
  Eye,
  EyeOff,
  Image as ImageIcon,
  Hand
} from 'lucide-react';
import { WEDDING_DATA } from '../weddingData';

interface LivretoInterativoProps {
  onPlayMusic?: () => void;
  isMusicPlaying?: boolean;
  onToggleMusic?: () => void;
}

// Imagens em Alta Definição selecionadas para o fundo cinematográfico
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

export const LivretoInterativo: React.FC<LivretoInterativoProps> = ({
  onPlayMusic,
  isMusicPlaying = false,
  onToggleMusic
}) => {
  // Estado de abertura do envelope e selo
  const [envelopeState, setEnvelopeState] = useState<'sealed' | 'opening' | 'opened'>('sealed');
  
  // Índice da folha atual (0 = Capa, 1..7 = Conteúdo)
  const [currentPage, setCurrentPage] = useState(0);

  // Fundo dinâmico
  const [bgIndex, setBgIndex] = useState(0);
  const [bgBlur, setBgBlur] = useState(true);

  // Menu Marcador de Fita (Bookmark Ribbon)
  const [isRibbonMenuOpen, setIsRibbonMenuOpen] = useState(false);

  // Dica visual de arrastar na primeira vez que abre o livro
  const [showSwipeHint, setShowSwipeHint] = useState(true);

  // Estado de cópia do Pix
  const [copiedPix, setCopiedPix] = useState(false);

  // Formulário de RSVP dentro do livreto
  const [rsvpName, setRsvpName] = useState('');
  const [rsvpPhone, setRsvpPhone] = useState('');
  const [rsvpAttending, setRsvpAttending] = useState<'yes' | 'no'>('yes');
  const [rsvpCompanions, setRsvpCompanions] = useState('1');
  const [rsvpMessage, setRsvpMessage] = useState('');

  // Estados de FÍSICA DE ARRASTO COM OS DEDOS (Folhear Realista)
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef<number>(0);
  const startYRef = useRef<number>(0);
  const isHorizontalSwipe = useRef<boolean | null>(null);

  // Contagem regressiva viva
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const TOTAL_PAGES = 8;

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

  const triggerHaptic = () => {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(15);
      } catch {
        // Ignora silenciosamente se o navegador não permitir
      }
    }
  };

  const goToNextPage = () => {
    if (currentPage < TOTAL_PAGES - 1) {
      setCurrentPage((prev) => prev + 1);
      setShowSwipeHint(false);
      triggerHaptic();
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
      triggerHaptic();
    }
  };

  const jumpToPage = (index: number) => {
    setCurrentPage(index);
    setIsRibbonMenuOpen(false);
    setShowSwipeHint(false);
    triggerHaptic();
  };

  // Atalhos de teclado (Setas Esquerda / Direita / PageUp / PageDown)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (envelopeState !== 'opened') return;
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        setCurrentPage((prev) => (prev < TOTAL_PAGES - 1 ? prev + 1 : prev));
        setShowSwipeHint(false);
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        setCurrentPage((prev) => (prev > 0 ? prev - 1 : prev));
      } else if (e.key === 'Escape') {
        setIsRibbonMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [envelopeState]);

  // Transição do Selo de Cera
  const handleBreakSeal = () => {
    if (envelopeState !== 'sealed') return;
    setEnvelopeState('opening');
    triggerHaptic();

    // Tocar a música síncrona no clique físico (Essencial para desbloquear no iOS Safari e Android!)
    if (onPlayMusic) {
      onPlayMusic();
    }

    // Confetes dourados especiais
    confetti({
      particleCount: 110,
      spread: 80,
      origin: { y: 0.58 },
      colors: ['#CAA36B', '#D8B765', '#FAF7F2', '#9E7338', '#56695B'],
      ticks: 220,
      gravity: 0.85,
      scalar: 1.2,
    });

    // Revelar o Livreto
    setTimeout(() => {
      setEnvelopeState('opened');
    }, 900);
  };

  const handleCloseToEnvelope = () => {
    setEnvelopeState('sealed');
    setCurrentPage(0);
    setIsRibbonMenuOpen(false);
    setShowSwipeHint(true);
  };

  // Cópia da chave Pix
  const handleCopyPix = () => {
    navigator.clipboard.writeText(WEDDING_DATA.pix.pixKey);
    setCopiedPix(true);
    triggerHaptic();
    confetti({
      particleCount: 55,
      spread: 60,
      origin: { y: 0.65 },
      colors: ['#CAA36B', '#D8B765', '#56695B'],
    });
    setTimeout(() => setCopiedPix(false), 3000);
  };

  // Envio do RSVP pelo WhatsApp
  const handleSendRsvp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpName.trim()) return;

    const status = rsvpAttending === 'yes' ? '✅ SIM, com muita alegria estarei presente!' : '❌ Infelizmente não poderei comparecer, mas desejo toda a felicidade!';
    const msgCompanions = rsvpCompanions ? `\n👥 *Acompanhantes:* ${rsvpCompanions} pessoa(s)` : '';
    const msgDedication = rsvpMessage.trim() ? `\n💌 *Mensagem:* "${rsvpMessage.trim()}"` : '';

    const text = encodeURIComponent(
      `Olá Daniela & Édson! ❤️\n\n*CONFIRMAÇÃO DE PRESENÇA (Livreto Digital)*\n${status}\n\n👤 *Nome:* ${rsvpName}\n📱 *WhatsApp:* ${rsvpPhone || 'Não informado'}${msgCompanions}${msgDedication}`
    );

    window.open(`https://wa.me/${WEDDING_DATA.rsvp.whatsappNumber}?text=${text}`, '_blank');
  };

  // Google Calendar URL
  const getGoogleCalendarUrl = () => {
    const startDate = "20270925T193000Z";
    const endDate = "20270926T030000Z";
    const title = encodeURIComponent(WEDDING_DATA.date.calendarSummary);
    const details = encodeURIComponent(WEDDING_DATA.date.calendarDescription);
    const location = encodeURIComponent(`${WEDDING_DATA.venue.name}, ${WEDDING_DATA.venue.address}, ${WEDDING_DATA.venue.city}`);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${details}&location=${location}`;
  };

  // ==============================================================
  // GESTOS TÁTEIS: FOLHEAR COM OS DEDOS COM FÍSICA E RESISTÊNCIA
  // ==============================================================
  const onTouchStartHandler = (clientX: number, clientY: number) => {
    startXRef.current = clientX;
    startYRef.current = clientY;
    isHorizontalSwipe.current = null;
    setIsDragging(true);
  };

  const onTouchMoveHandler = (clientX: number, clientY: number) => {
    if (!isDragging) return;
    const diffX = clientX - startXRef.current;
    const diffY = clientY - startYRef.current;

    if (isHorizontalSwipe.current === null) {
      if (Math.abs(diffX) > 8 || Math.abs(diffY) > 8) {
        isHorizontalSwipe.current = Math.abs(diffX) > Math.abs(diffY);
      }
    }

    if (isHorizontalSwipe.current) {
      // Resistência elástica nos extremos (primeira e última folha)
      let currentOffset = diffX;
      if ((currentPage === 0 && diffX > 0) || (currentPage === TOTAL_PAGES - 1 && diffX < 0)) {
        currentOffset = diffX * 0.22;
      }
      setDragOffset(currentOffset);
    }
  };

  const onTouchEndHandler = () => {
    if (!isDragging) return;
    const swipeThreshold = 45;

    if (isHorizontalSwipe.current) {
      if (dragOffset < -swipeThreshold && currentPage < TOTAL_PAGES - 1) {
        goToNextPage();
      } else if (dragOffset > swipeThreshold && currentPage > 0) {
        goToPrevPage();
      }
    }

    setIsDragging(false);
    setDragOffset(0);
    isHorizontalSwipe.current = null;
  };

  const nextBackground = () => {
    setBgIndex((prev) => (prev + 1) % HD_BACKGROUNDS.length);
  };

  // Cálculo da rotação 3D proporcional ao arraste do dedo
  const dragRatio = Math.max(-1, Math.min(1, dragOffset / 280));
  const rotateAngle = dragRatio * -18; // Leve inclinação tridimensional ao puxar a página
  const translateX = dragOffset * 0.35;

  return (
    <div className="relative min-h-screen w-full overflow-hidden select-none bg-[#1A1816] text-[#24211E]">
      
      {/* ============================================================== */}
      {/* 1. FUNDO CINEMATOGRÁFICO DE ALTA DEFINIÇÃO COM KEN BURNS      */}
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

        {/* Camadas de iluminação quente e vinheta */}
        <div 
          className={`absolute inset-0 transition-backdrop duration-700 ${
            bgBlur ? 'backdrop-blur-md bg-black/50' : 'bg-black/35 backdrop-blur-[1px]'
          }`} 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/65 pointer-events-none" />
      </div>

      {/* ============================================================== */}
      {/* 2. BARRA DE CONTROLE SUPERIOR (MÚSICA, FUNDO E NAVEGAÇÃO)      */}
      {/* ============================================================== */}
      <header className="relative z-30 flex items-center justify-between px-3 sm:px-8 py-3 max-w-6xl mx-auto">
        {/* Monograma & Título */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#FAF7F2]/90 backdrop-blur-md border border-[#CAA36B]/60 flex items-center justify-center shadow-md">
            <span className="font-serif text-[#CAA36B] font-bold text-xs sm:text-sm tracking-wider">
              D&E
            </span>
          </div>
          <div className="hidden sm:block text-left">
            <p className="font-serif text-[#FAF7F2] text-sm tracking-widest uppercase">
              {WEDDING_DATA.couple.bride} & {WEDDING_DATA.couple.groom}
            </p>
            <p className="text-[10px] text-[#CAA36B] tracking-wider uppercase font-medium">
              25 de Setembro de 2027
            </p>
          </div>
        </div>

        {/* Controles Flutuantes da Experiência */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Botão de Trocar Foto de Fundo */}
          <button
            onClick={nextBackground}
            title="Alternar Foto de Casamento de Fundo"
            className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-full bg-black/45 hover:bg-black/65 backdrop-blur-md text-[#ECDCC2] border border-[#CAA36B]/30 hover:border-[#CAA36B] transition-all text-xs"
          >
            <ImageIcon className="w-3.5 h-3.5 text-[#CAA36B]" />
            <span className="hidden md:inline">Trocar Fundo</span>
          </button>

          {/* Botão de Alternar Desfoque (Foco no Livro) */}
          <button
            onClick={() => setBgBlur(!bgBlur)}
            title={bgBlur ? "Ver foto de fundo nítida" : "Focar no Livreto"}
            className="p-1.5 sm:p-2 rounded-full bg-black/45 hover:bg-black/65 backdrop-blur-md text-[#ECDCC2] border border-[#CAA36B]/30 hover:border-[#CAA36B] transition-all text-xs"
          >
            {bgBlur ? <Eye className="w-3.5 h-3.5 text-[#CAA36B]" /> : <EyeOff className="w-3.5 h-3.5 text-[#ECDCC2]" />}
          </button>

          {/* Botão de Trilha Sonora */}
          {onToggleMusic && (
            <button
              onClick={onToggleMusic}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-md border transition-all text-xs ${
                isMusicPlaying
                  ? 'bg-[#CAA36B] text-white border-[#CAA36B] shadow-[0_0_15px_rgba(202,163,107,0.5)]'
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
                  <span className="font-medium hidden sm:inline">Pra Você Guardei o Amor</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5" />
                  <span className="font-medium hidden sm:inline">Tocar Música</span>
                </>
              )}
            </button>
          )}

          {/* Botão de Voltar ao Envelope Fechado */}
          {envelopeState === 'opened' && (
            <button
              onClick={handleCloseToEnvelope}
              title="Guardar no Envelope"
              className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-full bg-black/45 hover:bg-black/65 backdrop-blur-md text-[#ECDCC2] border border-[#CAA36B]/30 hover:border-[#CAA36B] transition-all text-xs"
            >
              <RotateCcw className="w-3 h-3 text-[#CAA36B]" />
              <span className="hidden sm:inline">Envelope</span>
            </button>
          )}
        </div>
      </header>

      {/* ============================================================== */}
      {/* 3. TELA INICIAL: O ENVELOPE COM SELO DE CERA 3D               */}
      {/* ============================================================== */}
      {envelopeState !== 'opened' && (
        <div className="relative z-20 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4 py-6">
          
          <div className="text-center mb-6 sm:mb-8 animate-fadeIn">
            <span className="font-script text-3xl sm:text-5xl text-[#CAA36B] drop-shadow-md">
              Você foi convidado(a)
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl text-[#FAF7F2] uppercase tracking-[0.2em] mt-1 font-normal drop-shadow-lg">
              {WEDDING_DATA.couple.bride} & {WEDDING_DATA.couple.groom}
            </h1>
            <p className="text-xs sm:text-sm text-[#ECDCC2] tracking-widest uppercase mt-2 font-light">
              Uma celebração inesquecível de amor & comunhão
            </p>
          </div>

          {/* O Envelope de Papel Linho */}
          <div 
            onClick={handleBreakSeal}
            className={`group relative w-full max-w-[400px] aspect-[4/3] bg-[#F7F3E9] rounded-2xl sm:rounded-3xl shadow-[0_30px_70px_rgba(0,0,0,0.65)] border-2 border-[#CAA36B]/50 p-6 sm:p-8 flex flex-col items-center justify-center cursor-pointer transition-all duration-700 hover:scale-[1.02] hover:shadow-[0_35px_80px_rgba(202,163,107,0.4)] ${
              envelopeState === 'opening' ? 'scale-95 opacity-40' : 'scale-100 opacity-100'
            }`}
          >
            {/* Textura do Envelope */}
            <div className="absolute inset-0 bg-paper rounded-2xl sm:rounded-3xl opacity-80 pointer-events-none" />

            {/* Dobra triangular superior do envelope */}
            <div 
              className={`absolute top-0 left-0 right-0 h-1/2 bg-[#ECDCC2] origin-top transition-transform duration-700 border-b border-[#CAA36B]/30 ${
                envelopeState === 'opening' ? '-rotate-x-180' : 'rotate-x-0'
              }`}
              style={{
                clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
              }}
            />

            {/* Detalhes de Hot Stamping Dourado */}
            <div className="relative z-10 text-center pointer-events-none">
              <p className="font-serif text-xs text-[#7A746E] tracking-[0.3em] uppercase mb-1">
                Convite Oficial
              </p>
              <h2 className="font-serif text-2xl text-[#24211E] tracking-wider">
                {WEDDING_DATA.couple.monogram}
              </h2>
              <p className="text-[11px] text-[#CAA36B] tracking-widest uppercase mt-1">
                25 . 09 . 2027
              </p>
            </div>

            {/* O SELO DE CERA 3D (WAX SEAL) */}
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div 
                className={`relative w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center cursor-pointer transition-transform duration-300 group-hover:scale-110 active:scale-95 ${
                  envelopeState === 'opening' ? 'animate-wax-break' : 'wax-seal-pulse'
                }`}
                style={{
                  background: 'radial-gradient(circle, #CAA36B 0%, #B98E4D 45%, #7D572C 95%)',
                  boxShadow: '0 12px 30px rgba(0, 0, 0, 0.5), inset 0 2px 4px rgba(255, 255, 255, 0.5), inset 0 -4px 8px rgba(0,0,0,0.5)',
                }}
              >
                {/* Borda Orgânica com Relevo de Cera Derretida */}
                <div 
                  className="absolute inset-[-4px] rounded-full border-2 border-[#D8B765]/60 pointer-events-none opacity-80"
                  style={{ filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.3))' }}
                />

                {/* Anel Interno Gravado */}
                <div className="w-[82%] h-[82%] rounded-full border border-[#FAF7F2]/40 flex flex-col items-center justify-center text-center shadow-inner">
                  <span className="font-script text-[#FAF7F2] text-2xl sm:text-3xl leading-none drop-shadow">
                    D & E
                  </span>
                  <div className="flex items-center gap-1 mt-0.5 opacity-80">
                    <Heart className="w-2.5 h-2.5 text-[#FAF7F2] fill-[#FAF7F2]" />
                  </div>
                </div>

                {/* Brilho Especular Reflexivo */}
                <div className="absolute top-2 left-3 w-8 h-4 bg-white/25 rounded-full rotate-[-35deg] blur-[1px] pointer-events-none" />
              </div>
            </div>

            {/* Chamada para Ação com Brilho */}
            <div className="absolute bottom-4 sm:bottom-6 left-0 right-0 text-center z-10 pointer-events-none">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#CAA36B]/20 text-[#7D572C] text-xs font-semibold tracking-wide uppercase group-hover:bg-[#CAA36B] group-hover:text-white transition-colors duration-300">
                <Sparkles className="w-3.5 h-3.5" />
                Toque no selo para abrir
              </span>
            </div>
          </div>

          <p className="text-xs text-[#ECDCC2]/80 mt-5 tracking-wider text-center">
            Toque no selo de cera para abrir e folhear o livreto
          </p>
        </div>
      )}

      {/* ============================================================== */}
      {/* 4. O LIVRETO INTERATIVO (BOOKLET / FLIPBOOK ABERTO)           */}
      {/* ============================================================== */}
      {envelopeState === 'opened' && (
        <main 
          className="relative z-20 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-3 sm:px-6 py-2 sm:py-4"
        >

          {/* Dica de Swipe com os Dedos no Celular (Some após folhear) */}
          {showSwipeHint && (
            <div className="sm:hidden mb-2 animate-bounce flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#CAA36B]/90 text-white text-[11px] font-medium shadow-md">
              <Hand className="w-3.5 h-3.5" />
              <span>Deslize o dedo na tela para folhear</span>
            </div>
          )}

          {/* Fita Marcadora de Cetim Dourada (Bookmark Ribbon) */}
          <div className="relative w-full max-w-3xl flex justify-end pr-3 sm:pr-8 -mb-2 z-40">
            <button
              onClick={() => setIsRibbonMenuOpen(!isRibbonMenuOpen)}
              className="relative px-3 pt-2 pb-5 bg-gradient-to-b from-[#CAA36B] to-[#9E7338] text-white shadow-lg ribbon-fold hover:translate-y-1 transition-all flex flex-col items-center group cursor-pointer"
              title="Abrir Índice das Páginas"
            >
              <Bookmark className="w-3.5 h-3.5 fill-white group-hover:scale-110 transition-transform" />
              <span className="text-[9px] uppercase tracking-wider font-semibold mt-0.5">
                Índice
              </span>
            </button>
          </div>

          {/* Menu Dropdown de Páginas (Ao clicar na fita de cetim) */}
          {isRibbonMenuOpen && (
            <div className="absolute top-14 right-4 sm:right-12 z-50 w-72 bg-[#FAF7F2] rounded-2xl shadow-2xl border border-[#CAA36B]/40 p-4 text-[#24211E] animate-fadeIn">
              <div className="flex items-center justify-between pb-2 border-b border-[#CAA36B]/20 mb-2">
                <span className="font-serif font-semibold text-sm tracking-wider uppercase text-[#CAA36B]">
                  Sumário do Convite
                </span>
                <span className="text-xs text-[#7A746E]">8 Folhas</span>
              </div>
              <nav className="flex flex-col gap-1 max-h-72 overflow-y-auto pr-1">
                {[
                  { page: 0, title: "Capa do Livreto", desc: "Monograma & Dedicatória" },
                  { page: 1, title: "Nossa História", desc: "Carta comovente & Foto" },
                  { page: 2, title: "A Cerimônia", desc: "Data, Horário & Contagem" },
                  { page: 3, title: "Como Chegar", desc: "Sítio Verde Flor & Trajeto" },
                  { page: 4, title: "Traje & Estilo", desc: "Dress Code & Paleta" },
                  { page: 5, title: "Presentes & Pix", desc: "Chave Pix com Cópia" },
                  { page: 6, title: "Confirmar Presença", desc: "Formulário RSVP WhatsApp" },
                  { page: 7, title: "Contracapa", desc: "Agradecimento Final" },
                ].map((item) => (
                  <button
                    key={item.page}
                    onClick={() => jumpToPage(item.page)}
                    className={`flex items-center justify-between p-2 rounded-xl text-left transition-all ${
                      currentPage === item.page
                        ? 'bg-[#CAA36B] text-white font-medium shadow-xs'
                        : 'hover:bg-[#ECDCC2]/50 text-[#24211E]'
                    }`}
                  >
                    <div>
                      <p className="text-xs font-semibold">{item.title}</p>
                      <p className={`text-[10px] ${currentPage === item.page ? 'text-white/80' : 'text-[#7A746E]'}`}>
                        {item.desc}
                      </p>
                    </div>
                    <span className="text-[11px] opacity-70">
                      {item.page + 1}
                    </span>
                  </button>
                ))}
              </nav>
            </div>
          )}

          {/* ESTRUTURA DO LIVRETO (BOOK CONTAINER COM SUPORTE A TOUCH DRAG) */}
          <div 
            onTouchStart={(e) => onTouchStartHandler(e.touches[0].clientX, e.touches[0].clientY)}
            onTouchMove={(e) => onTouchMoveHandler(e.touches[0].clientX, e.touches[0].clientY)}
            onTouchEnd={onTouchEndHandler}
            onMouseDown={(e) => onTouchStartHandler(e.clientX, e.clientY)}
            onMouseMove={(e) => isDragging && onTouchMoveHandler(e.clientX, e.clientY)}
            onMouseUp={onTouchEndHandler}
            onMouseLeave={onTouchEndHandler}
            style={{
              transform: isDragging 
                ? `perspective(1400px) rotateY(${rotateAngle}deg) translateX(${translateX}px)` 
                : 'perspective(1400px) rotateY(0deg) translateX(0px)',
              transition: isDragging ? 'none' : 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
            }}
            className="relative w-full max-w-[420px] md:max-w-3xl h-[78vh] sm:h-[600px] max-h-[720px] flex items-stretch justify-center book-shadow rounded-2xl overflow-hidden bg-[#FAF7F2] border border-[#CAA36B]/40 touch-pan-y cursor-grab active:cursor-grabbing"
          >
            
            {/* Lombada Central Sombreada para Efeito Livro Aberto (Desktop) */}
            <div className="hidden md:block absolute inset-y-0 left-1/2 -translate-x-1/2 w-12 book-spine-gradient z-30 pointer-events-none" />

            {/* Borda Dourada Interna de Papel Moeda */}
            <div className="absolute inset-2 sm:inset-3 border border-[#CAA36B]/25 rounded-xl pointer-events-none z-20" />

            {/* Textura de Papel Algodão Fino */}
            <div className="absolute inset-0 bg-paper opacity-75 pointer-events-none z-10" />

            {/* Sombras de curvatura de página durante arraste */}
            {dragOffset < 0 && (
              <div 
                className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black/20 to-transparent pointer-events-none z-30" 
                style={{ opacity: Math.min(1, Math.abs(dragRatio)) }}
              />
            )}
            {dragOffset > 0 && (
              <div 
                className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black/20 to-transparent pointer-events-none z-30" 
                style={{ opacity: Math.min(1, Math.abs(dragRatio)) }}
              />
            )}

            {/* ORELHA DE PÁGINA (DOG-EAR) - Toque rápido para virar a folha */}
            {currentPage < TOTAL_PAGES - 1 && (
              <div 
                onClick={(e) => { e.stopPropagation(); goToNextPage(); }}
                className="absolute bottom-0 right-0 z-40 w-12 h-12 cursor-pointer group flex items-end justify-end p-1"
                title="Toque ou arraste para virar a folha"
              >
                <div className="w-8 h-8 bg-gradient-to-tl from-[#CAA36B] via-[#DFBF85] to-[#FAF7F2] shadow-[-2px_-2px_6px_rgba(0,0,0,0.2)] rounded-tl-lg transition-transform duration-300 group-hover:scale-125 flex items-center justify-center">
                  <span className="text-[10px] text-[#7D572C] font-bold">➔</span>
                </div>
              </div>
            )}

            {currentPage > 0 && (
              <div 
                onClick={(e) => { e.stopPropagation(); goToPrevPage(); }}
                className="absolute bottom-0 left-0 z-40 w-12 h-12 cursor-pointer group flex items-end justify-start p-1"
                title="Toque ou arraste para voltar a folha"
              >
                <div className="w-8 h-8 bg-gradient-to-tr from-[#CAA36B] via-[#DFBF85] to-[#FAF7F2] shadow-[2px_-2px_6px_rgba(0,0,0,0.2)] rounded-tr-lg transition-transform duration-300 group-hover:scale-125 flex items-center justify-center">
                  <span className="text-[10px] text-[#7D572C] font-bold">⬅</span>
                </div>
              </div>
            )}

            {/* ============================================================== */}
            {/* PÁGINAS DO LIVRETO DINÂMICAS                                    */}
            {/* ============================================================== */}
            <div className="relative w-full h-full flex flex-col z-20 overflow-y-auto overflow-x-hidden p-5 sm:p-9">

              {/* ======================================================== */}
              {/* FOLHA 0: CAPA DO LIVRETO                                 */}
              {/* ======================================================== */}
              {currentPage === 0 && (
                <div className="flex-1 flex flex-col items-center justify-between text-center max-w-md mx-auto py-2 sm:py-4 animate-fadeIn">
                  <div className="space-y-1">
                    <p className="font-serif text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#CAA36B]">
                      Com a bênção de Deus e de nossos pais
                    </p>
                    <div className="flex items-center justify-center gap-3 my-1.5">
                      <span className="h-[1px] w-12 bg-[#CAA36B]/50" />
                      <Heart className="w-3.5 h-3.5 text-[#CAA36B] fill-[#CAA36B]" />
                      <span className="h-[1px] w-12 bg-[#CAA36B]/50" />
                    </div>
                  </div>

                  <div className="my-auto py-2">
                    <div className="w-18 h-18 sm:w-22 sm:h-22 mx-auto rounded-full bg-[#ECDCC2]/60 border border-[#CAA36B]/50 flex items-center justify-center mb-3 shadow-xs">
                      <span className="font-serif text-3xl sm:text-4xl text-[#9E7338] font-semibold tracking-wider">
                        D & E
                      </span>
                    </div>

                    <h2 className="font-serif text-2xl sm:text-4xl text-[#24211E] tracking-widest uppercase font-medium">
                      {WEDDING_DATA.couple.bride} & {WEDDING_DATA.couple.groom}
                    </h2>
                    
                    <p className="text-[11px] text-[#7A746E] tracking-widest uppercase mt-1">
                      {WEDDING_DATA.couple.brideFullName} & {WEDDING_DATA.couple.groomFullName}
                    </p>

                    <div className="mt-4 p-3.5 rounded-xl bg-[#F4EFE1]/85 border border-[#CAA36B]/30 max-w-xs mx-auto">
                      <p className="font-script text-xl sm:text-2xl text-[#9E7338]">
                        "Pra você guardei o amor que nunca soube dar..."
                      </p>
                      <p className="text-[10px] text-[#7A746E] tracking-wider uppercase mt-1 font-medium">
                        Sábado, 25 de Setembro de 2027 • 16h30
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <button
                      onClick={goToNextPage}
                      className="group flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#CAA36B] to-[#9E7338] text-white font-medium text-xs sm:text-sm tracking-wider uppercase shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
                    >
                      <span>Folhear Convite</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <span className="text-[10px] text-[#7A746E] flex items-center gap-1">
                      <Hand className="w-3 h-3 text-[#CAA36B]" />
                      Deslize o dedo para virar
                    </span>
                  </div>
                </div>
              )}

              {/* ======================================================== */}
              {/* FOLHA 1: NOSSA HISTÓRIA & CARTA DOS NOIVOS               */}
              {/* ======================================================== */}
              {currentPage === 1 && (
                <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-5 sm:gap-8 max-w-2xl mx-auto py-1 animate-fadeIn">
                  {/* Foto do Casal estilo Moldura Vintage */}
                  <div className="w-44 sm:w-56 aspect-[4/5] rounded-2xl overflow-hidden shadow-xl border-4 border-white rotate-[-2deg] shrink-0 bg-[#ECDCC2]">
                    <img 
                      src={WEDDING_DATA.photos.hero} 
                      alt="Daniela & Édson"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>

                  {/* Carta Aos Convidados */}
                  <div className="flex-1 text-left space-y-2.5">
                    <div className="inline-block px-3 py-1 rounded-full bg-[#ECDCC2]/60 border border-[#CAA36B]/40 text-[#9E7338] text-[10px] font-semibold tracking-widest uppercase">
                      Capítulo I • O Nosso Amor
                    </div>
                    <h3 className="font-serif text-2xl sm:text-3xl text-[#24211E]">
                      O Começo de Uma Nova Família
                    </h3>
                    <p className="text-xs sm:text-sm text-[#524B43] leading-relaxed">
                      Depois de tantos momentos especiais, risos compartilhados e sonhos construídos lado a lado, chegou a hora de darmos o passo mais importante de nossas vidas.
                    </p>
                    <p className="text-xs sm:text-sm text-[#524B43] leading-relaxed">
                      Ter você ao nosso lado nesse dia torna tudo ainda mais memorável. Este convite foi preparado com todo carinho para que você viva essa contagem regressiva junto com a gente!
                    </p>
                    <div className="pt-2 border-t border-[#CAA36B]/30">
                      <p className="font-script text-2xl text-[#CAA36B]">
                        Com todo nosso carinho,
                      </p>
                      <p className="font-serif text-sm text-[#24211E] tracking-widest uppercase font-medium">
                        Daniela & Édson
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* ======================================================== */}
              {/* FOLHA 2: A CERIMÔNIA & CONTAGEM REGRESSIVA               */}
              {/* ======================================================== */}
              {currentPage === 2 && (
                <div className="flex-1 flex flex-col items-center justify-center text-center max-w-xl mx-auto py-1 animate-fadeIn">
                  <div className="inline-block px-3 py-1 rounded-full bg-[#ECDCC2]/60 border border-[#CAA36B]/40 text-[#9E7338] text-[10px] font-semibold tracking-widest uppercase mb-1">
                    Capítulo II • O Grande Dia
                  </div>
                  
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#24211E] mb-0.5">
                    Cerimônia & Celebração
                  </h3>
                  
                  <p className="font-script text-2xl text-[#CAA36B] mb-3">
                    25 de Setembro de 2027
                  </p>

                  {/* Relógio de Contagem Regressiva */}
                  <div className="grid grid-cols-4 gap-2 sm:gap-3 w-full max-w-md my-2">
                    {[
                      { label: "Dias", value: timeLeft.days },
                      { label: "Horas", value: timeLeft.hours },
                      { label: "Minutos", value: timeLeft.minutes },
                      { label: "Segundos", value: timeLeft.seconds },
                    ].map((item, idx) => (
                      <div key={idx} className="p-2 sm:p-3 rounded-2xl bg-[#F4EFE1] border border-[#CAA36B]/40 shadow-xs">
                        <span className="font-serif text-xl sm:text-3xl font-bold text-[#9E7338]">
                          {item.value}
                        </span>
                        <p className="text-[9px] uppercase tracking-wider text-[#7A746E] mt-0.5">
                          {item.label}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Informações de Horário */}
                  <div className="flex items-center justify-center gap-6 my-3 text-xs text-[#524B43]">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-[#CAA36B]" />
                      <span>Recepção: <strong>16h30</strong></span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Heart className="w-4 h-4 text-[#CAA36B]" />
                      <span>Cerimônia: <strong>17h00</strong></span>
                    </div>
                  </div>

                  {/* Botão de Adicionar à Agenda */}
                  <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
                    <a
                      href={getGoogleCalendarUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ECDCC2] hover:bg-[#CAA36B] hover:text-white transition-all text-[#24211E] text-xs font-medium border border-[#CAA36B]/50 shadow-xs"
                    >
                      <Calendar className="w-3.5 h-3.5 text-[#9E7338]" />
                      <span>Salvar no Google Agenda</span>
                    </a>
                  </div>
                </div>
              )}

              {/* ======================================================== */}
              {/* FOLHA 3: COMO CHEGAR (SÍTIO VERDE FLOR)                  */}
              {/* ======================================================== */}
              {currentPage === 3 && (
                <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-4 sm:gap-6 max-w-2xl mx-auto py-1 animate-fadeIn">
                  {/* Foto do Espaço */}
                  <div className="w-full md:w-1/2 aspect-[4/3] rounded-2xl overflow-hidden shadow-md border-2 border-[#CAA36B]/40 bg-[#ECDCC2]">
                    <img 
                      src={WEDDING_DATA.venue.image} 
                      alt={WEDDING_DATA.venue.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Endereço e Trajeto */}
                  <div className="w-full md:w-1/2 text-left space-y-2.5">
                    <div className="inline-block px-3 py-1 rounded-full bg-[#ECDCC2]/60 border border-[#CAA36B]/40 text-[#9E7338] text-[10px] font-semibold tracking-widest uppercase">
                      Capítulo III • O Local
                    </div>
                    
                    <h3 className="font-serif text-2xl sm:text-3xl text-[#24211E]">
                      {WEDDING_DATA.venue.name}
                    </h3>
                    
                    <div className="flex items-start gap-2 text-xs sm:text-sm text-[#524B43]">
                      <MapPin className="w-4 h-4 text-[#CAA36B] shrink-0 mt-0.5" />
                      <span>{WEDDING_DATA.venue.address} • {WEDDING_DATA.venue.city}</span>
                    </div>

                    <p className="text-xs text-[#7A746E] leading-relaxed">
                      {WEDDING_DATA.venue.description}
                    </p>

                    {/* Botões de Rotas (Waze, Maps, Uber) */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      <a
                        href={WEDDING_DATA.venue.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#24211E] text-[#FAF7F2] text-xs font-medium hover:bg-[#CAA36B] transition-colors shadow-xs"
                      >
                        <Compass className="w-3.5 h-3.5" />
                        <span>Google Maps</span>
                      </a>
                      <a
                        href={WEDDING_DATA.venue.wazeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#00D7FE] text-black text-xs font-semibold hover:opacity-90 transition-opacity shadow-xs"
                      >
                        <Navigation className="w-3.5 h-3.5" />
                        <span>Waze</span>
                      </a>
                      <a
                        href={WEDDING_DATA.venue.uberUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black text-white text-xs font-medium hover:bg-neutral-800 transition-colors shadow-xs"
                      >
                        <span>Pedir Uber</span>
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* ======================================================== */}
              {/* FOLHA 4: TRAJE (DRESS CODE) & PALETA                    */}
              {/* ======================================================== */}
              {currentPage === 4 && (
                <div className="flex-1 flex flex-col items-center justify-center text-center max-w-xl mx-auto py-1 animate-fadeIn">
                  <div className="inline-block px-3 py-1 rounded-full bg-[#ECDCC2]/60 border border-[#CAA36B]/40 text-[#9E7338] text-[10px] font-semibold tracking-widest uppercase mb-1">
                    Capítulo IV • O Que Vestir
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl text-[#24211E] mb-0.5">
                    {WEDDING_DATA.dressCode.title}
                  </h3>

                  <p className="text-xs text-[#7A746E] max-w-md mx-auto mb-3">
                    {WEDDING_DATA.dressCode.subtitle}
                  </p>

                  {/* Amostras de Cores Recomendadas */}
                  <div className="w-full bg-[#F4EFE1] p-3 rounded-2xl border border-[#CAA36B]/30 mb-3">
                    <p className="text-[10px] font-semibold text-[#524B43] uppercase tracking-wider mb-2">
                      Paleta de Cores em Harmonia com a Natureza
                    </p>
                    <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
                      {WEDDING_DATA.dressCode.recommendedColors.map((color, idx) => (
                        <div key={idx} className="flex flex-col items-center group">
                          <div 
                            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-black/10 shadow-xs transition-transform group-hover:scale-110"
                            style={{ backgroundColor: color.hex }}
                            title={color.name}
                          />
                          <span className="text-[9px] text-[#7A746E] mt-1 font-medium">
                            {color.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Lembrete da Noiva & Gramado */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left text-xs">
                    <div className="p-2.5 rounded-xl bg-[#FAF7F2] border border-[#CAA36B]/30">
                      <p className="font-semibold text-[#9E7338] text-[10px] uppercase tracking-wider mb-0.5">
                        ✨ Toque de Carinho
                      </p>
                      <p className="text-[#524B43] text-[11px]">
                        {WEDDING_DATA.dressCode.gentleReminder}
                      </p>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#FAF7F2] border border-[#CAA36B]/30">
                      <p className="font-semibold text-[#56695B] text-[10px] uppercase tracking-wider mb-0.5">
                        🌿 Dica para o Gramado
                      </p>
                      <p className="text-[#524B43] text-[11px]">
                        Recomendamos salto bloco, anabela ou sapatos confortáveis para aproveitar o jardim.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* ======================================================== */}
              {/* FOLHA 5: LISTA DE PRESENTES & CHAVE PIX                 */}
              {/* ======================================================== */}
              {currentPage === 5 && (
                <div className="flex-1 flex flex-col items-center justify-center text-center max-w-lg mx-auto py-1 animate-fadeIn">
                  <div className="inline-block px-3 py-1 rounded-full bg-[#ECDCC2]/60 border border-[#CAA36B]/40 text-[#9E7338] text-[10px] font-semibold tracking-widest uppercase mb-1">
                    Capítulo V • Lista de Presentes
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl text-[#24211E] mb-1">
                    Carinho em Forma de Presente
                  </h3>

                  <p className="text-xs text-[#524B43] mb-3">
                    A sua presença é o maior presente! Caso queira nos abençoar com uma contribuição para o nosso novo lar e Lua de Mel:
                  </p>

                  {/* Cartão de Pix com Cópia Fácil */}
                  <div className="w-full bg-[#F4EFE1] p-3.5 sm:p-5 rounded-2xl border-2 border-[#CAA36B]/50 shadow-md">
                    <p className="text-[10px] uppercase tracking-widest text-[#7A746E] font-semibold mb-1">
                      Chave Pix E-mail
                    </p>
                    
                    <div className="p-2.5 rounded-xl bg-white border border-[#CAA36B]/40 flex items-center justify-between gap-2 mb-3">
                      <span className="font-mono text-xs sm:text-sm text-[#24211E] font-medium truncate select-all">
                        {WEDDING_DATA.pix.pixKey}
                      </span>
                      <button
                        onClick={handleCopyPix}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                          copiedPix
                            ? 'bg-emerald-600 text-white'
                            : 'bg-[#CAA36B] hover:bg-[#9E7338] text-white shadow-xs'
                        }`}
                      >
                        {copiedPix ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Copiado!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copiar</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="text-[11px] text-[#7A746E] space-y-0.5 text-center">
                      <p><strong>Favorecida:</strong> {WEDDING_DATA.pix.recipientName}</p>
                      <p><strong>Instituição:</strong> {WEDDING_DATA.pix.bank}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* ======================================================== */}
              {/* FOLHA 6: CONFIRMAÇÃO DE PRESENÇA (RSVP)                  */}
              {/* ======================================================== */}
              {currentPage === 6 && (
                <div className="flex-1 flex flex-col items-center justify-center text-center max-w-lg mx-auto py-1 animate-fadeIn">
                  <div className="inline-block px-3 py-1 rounded-full bg-[#ECDCC2]/60 border border-[#CAA36B]/40 text-[#9E7338] text-[10px] font-semibold tracking-widest uppercase mb-1">
                    Capítulo VI • Confirmação de Presença
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl text-[#24211E] mb-0.5">
                    Confirme Sua Presença
                  </h3>

                  <p className="text-xs text-[#7A746E] mb-2.5">
                    Por favor, confirme até <strong>{WEDDING_DATA.rsvp.deadline}</strong> para organizarmos tudo com carinho.
                  </p>

                  {/* Formulário RSVP direto */}
                  <form onSubmit={handleSendRsvp} className="w-full bg-[#F4EFE1] p-3.5 rounded-2xl border border-[#CAA36B]/40 space-y-2 text-left">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-[#7A746E] font-semibold mb-0.5">
                        Seu Nome Completo *
                      </label>
                      <input
                        type="text"
                        required
                        value={rsvpName}
                        onChange={(e) => setRsvpName(e.target.value)}
                        placeholder="Ex: Ana Clara da Silva"
                        className="w-full px-3 py-1.5 rounded-xl bg-white border border-[#CAA36B]/40 text-xs text-[#24211E] focus:outline-none focus:ring-1 focus:ring-[#CAA36B]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-[#7A746E] font-semibold mb-0.5">
                          WhatsApp
                        </label>
                        <input
                          type="tel"
                          value={rsvpPhone}
                          onChange={(e) => setRsvpPhone(e.target.value)}
                          placeholder="(61) 99999-9999"
                          className="w-full px-3 py-1.5 rounded-xl bg-white border border-[#CAA36B]/40 text-xs text-[#24211E] focus:outline-none focus:ring-1 focus:ring-[#CAA36B]"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-[#7A746E] font-semibold mb-0.5">
                          Acompanhantes
                        </label>
                        <select
                          value={rsvpCompanions}
                          onChange={(e) => setRsvpCompanions(e.target.value)}
                          className="w-full px-3 py-1.5 rounded-xl bg-white border border-[#CAA36B]/40 text-xs text-[#24211E] focus:outline-none focus:ring-1 focus:ring-[#CAA36B]"
                        >
                          <option value="0">Apenas eu</option>
                          <option value="1">+ 1 acompanhante</option>
                          <option value="2">+ 2 acompanhantes</option>
                          <option value="3">+ 3 acompanhantes</option>
                        </select>
                      </div>
                    </div>

                    {/* Presença Sim / Não */}
                    <div className="flex gap-2 pt-0.5">
                      <button
                        type="button"
                        onClick={() => setRsvpAttending('yes')}
                        className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                          rsvpAttending === 'yes'
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'bg-white text-[#524B43] border border-[#CAA36B]/30'
                        }`}
                      >
                        ✓ Sim, estarei lá!
                      </button>
                      <button
                        type="button"
                        onClick={() => setRsvpAttending('no')}
                        className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                          rsvpAttending === 'no'
                            ? 'bg-rose-700 text-white shadow-xs'
                            : 'bg-white text-[#524B43] border border-[#CAA36B]/30'
                        }`}
                      >
                        Não poderei ir
                      </button>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-[#7A746E] font-semibold mb-0.5">
                        Recado aos Noivos (Opcional)
                      </label>
                      <textarea
                        rows={1}
                        value={rsvpMessage}
                        onChange={(e) => setRsvpMessage(e.target.value)}
                        placeholder="Deixe uma mensagem de carinho..."
                        className="w-full px-3 py-1 rounded-xl bg-white border border-[#CAA36B]/40 text-xs text-[#24211E] focus:outline-none focus:ring-1 focus:ring-[#CAA36B] resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#CAA36B] to-[#9E7338] text-white text-xs font-semibold uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Confirmar via WhatsApp</span>
                    </button>
                  </form>
                </div>
              )}

              {/* ======================================================== */}
              {/* FOLHA 7: CONTRACAPA & RECADINHO FINAL                    */}
              {/* ======================================================== */}
              {currentPage === 7 && (
                <div className="flex-1 flex flex-col items-center justify-between text-center max-w-md mx-auto py-2 sm:py-4 animate-fadeIn">
                  <div className="space-y-1">
                    <p className="font-serif text-xs uppercase tracking-[0.25em] text-[#CAA36B]">
                      Com carinho e gratidão
                    </p>
                    <div className="flex items-center justify-center gap-3 my-1.5">
                      <span className="h-[1px] w-12 bg-[#CAA36B]/50" />
                      <Heart className="w-3.5 h-3.5 text-[#CAA36B] fill-[#CAA36B]" />
                      <span className="h-[1px] w-12 bg-[#CAA36B]/50" />
                    </div>
                  </div>

                  <div className="my-auto py-2">
                    <p className="font-script text-3xl sm:text-4xl text-[#9E7338] mb-1.5">
                      Esperamos por você!
                    </p>

                    <h2 className="font-serif text-2xl sm:text-3xl text-[#24211E] tracking-widest uppercase font-medium">
                      {WEDDING_DATA.couple.bride} & {WEDDING_DATA.couple.groom}
                    </h2>

                    <p className="text-xs text-[#524B43] max-w-xs mx-auto mt-2 leading-relaxed">
                      "O amor não se vê com os olhos, mas com o coração."
                    </p>

                    <p className="text-[11px] text-[#CAA36B] tracking-wider uppercase mt-3">
                      25 de Setembro de 2027 • Sítio Verde Flor
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => jumpToPage(0)}
                      className="px-4 py-2 rounded-full bg-[#ECDCC2] hover:bg-[#CAA36B] hover:text-white transition-all text-[#24211E] text-xs font-semibold cursor-pointer"
                    >
                      Voltar à Capa
                    </button>
                    <button
                      onClick={handleCloseToEnvelope}
                      className="px-4 py-2 rounded-full bg-[#24211E] text-white hover:bg-[#CAA36B] transition-all text-xs font-semibold shadow-xs cursor-pointer"
                    >
                      Fechar Envelope
                    </button>
                  </div>
                </div>
              )}

            </div>

            {/* ======================================================== */}
            {/* RODAPÉ DO LIVRETO: PAGINAÇÃO E CONTROLES                */}
            {/* ======================================================== */}
            <div className="absolute bottom-2 left-0 right-0 z-30 flex items-center justify-between px-4 sm:px-8 text-xs text-[#7A746E]">
              {/* Botão Anterior */}
              <button
                onClick={goToPrevPage}
                disabled={currentPage === 0}
                className={`flex items-center gap-1 font-medium transition-all ${
                  currentPage === 0
                    ? 'opacity-0 pointer-events-none'
                    : 'text-[#9E7338] hover:text-[#24211E] cursor-pointer'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Anterior</span>
              </button>

              {/* Indicador de Folhas */}
              <div className="flex items-center gap-1.5">
                {Array.from({ length: TOTAL_PAGES }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => jumpToPage(idx)}
                    title={`Página ${idx + 1}`}
                    className={`transition-all rounded-full cursor-pointer ${
                      currentPage === idx
                        ? 'w-5 h-1.5 bg-[#CAA36B]'
                        : 'w-1.5 h-1.5 bg-[#CAA36B]/30 hover:bg-[#CAA36B]/60'
                    }`}
                  />
                ))}
              </div>

              {/* Botão Próximo */}
              <button
                onClick={goToNextPage}
                disabled={currentPage === TOTAL_PAGES - 1}
                className={`flex items-center gap-1 font-medium transition-all ${
                  currentPage === TOTAL_PAGES - 1
                    ? 'opacity-0 pointer-events-none'
                    : 'text-[#9E7338] hover:text-[#24211E] cursor-pointer'
                }`}
              >
                <span className="hidden sm:inline">Próxima</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>

          <p className="text-[11px] sm:text-xs text-[#ECDCC2]/75 mt-2.5 text-center tracking-wide flex items-center justify-center gap-1">
            <Hand className="w-3.5 h-3.5 text-[#CAA36B]" />
            <span>Deslize ou toque nos cantos para virar as páginas</span>
          </p>

        </main>
      )}

    </div>
  );
};
