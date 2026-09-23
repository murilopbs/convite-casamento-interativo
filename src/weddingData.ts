export interface GiftQuota {
  id: string;
  title: string;
  category: string;
  price: number;
  description: string;
  image: string;
  popular?: boolean;
}

export interface TimelineEvent {
  time: string;
  title: string;
  description: string;
  icon: string;
}

export interface StoryMilestone {
  year: string;
  title: string;
  description: string;
}

export const WEDDING_DATA = {
  couple: {
    bride: "Daniela",
    groom: "Edshow",
    monogram: "D & E",
    subtitle: "Convidam para celebrar a união de suas vidas",
    quote: "O amor não se vê com os olhos, mas com o coração.",
  },
  
  date: {
    // 21 de Novembro de 2026 às 16:30
    isoDateTime: "2026-11-21T16:30:00",
    formattedDay: "21",
    formattedMonth: "Novembro",
    formattedYear: "2026",
    formattedWeekDay: "Sábado",
    formattedTime: "16:30",
    fullDateDisplay: "Sábado, 21 de Novembro de 2026 às 16h30",
    calendarSummary: "Casamento Daniela & Edshow",
    calendarDescription: "Cerimônia e Recepção de Casamento de Daniela & Edshow no Villa Bella Vista. Estamos muito felizes em celebrar este dia com você!",
  },

  venue: {
    name: "Villa Bella Vista Eventos",
    description: "Um refúgio campestre cercado pela natureza, jardins floridos e arquitetura toscana.",
    address: "Estrada das Hortênsias, 1450 - Vale dos Vinhedos",
    city: "Serra Gaúcha - RS",
    image: "/assets/venue.jpg",
    googleMapsUrl: "https://maps.google.com/?q=Villa+Bella+Vista+Eventos+Serra+Gaucha",
    wazeUrl: "https://waze.com/ul?q=Villa%20Bella%20Vista%20Eventos%20Serra%20Gaucha&navigate=yes",
    // Link direto para abrir o app do Uber com destino setado
    uberUrl: "https://m.uber.com/ul/?action=setPickup&pickup=my_location&dropoff[formatted_address]=Estrada%20das%20Hort%C3%AAnsiass%201450&dropoff[nickname]=Villa%20Bella%20Vista%20-%20Casamento%20Daniela%20e%20Edshow",
  },

  music: {
    url: "/assets/romantic-melody.mp3",
    title: "Acoustic Romantic Symphony",
  },

  photos: {
    hero: "/assets/couple.jpg",
    waxSeal: "/assets/wax_seal.jpg",
    venue: "/assets/venue.jpg",
  },

  dressCode: {
    title: "Passeio Completo / Traje Social",
    subtitle: "Queremos que você se sinta elegante e pronto para celebrar até o amanhecer!",
    guidelines: [
      { label: "Mulheres", description: "Vestidos longos ou midi elegantes, tecidos fluidos e sapatos confortáveis para curtir a festa no jardim." },
      { label: "Homens", description: "Terno completo ou blazer com camisa social, gravata opcional e sapato social." },
    ],
    gentleReminder: "Lembramos com carinho que o branco, off-white e tons perolados são reservados exclusivamente para a nossa noiva. ✨",
    recommendedColors: [
      { name: "Verde Sálvia", hex: "#7E9084" },
      { name: "Terracota", hex: "#B86B53" },
      { name: "Azul Serenity", hex: "#8DA4C4" },
      { name: "Champagne / Nude", hex: "#D8C7B0" },
      { name: "Rosa Chá", hex: "#CCA4A4" },
      { name: "Verde Oliva", hex: "#5C6B56" },
    ],
    footwearTip: "Dica amiga: Teremos área de cerimônia com piso gramado. Para as convidadas, recomendamos salto bloco, anabela ou protetores de salto!",
  },

  timeline: [
    {
      time: "16:30",
      title: "Chegada dos Convidados",
      description: "Welcome drink refrescante e acomodação nos jardins ao som de cordas acústicas.",
      icon: "Users",
    },
    {
      time: "17:00",
      title: "Cerimônia das Alianças",
      description: "O momento do 'Sim' sob a luz do pôr do sol.",
      icon: "Heart",
    },
    {
      time: "18:15",
      title: "Coquetel & Fotos",
      description: "Brinde oficial, finger foods e abraços aos recém-casados no lounge.",
      icon: "GlassWater",
    },
    {
      time: "20:00",
      title: "Jantar dos Noivos",
      description: "Menu gastronômico preparado especialmente para celebrar esse amor.",
      icon: "Utensils",
    },
    {
      time: "21:30",
      title: "Abertura da Pista & Festa",
      description: "DJ, drinks autorais e muita dança até altas horas!",
      icon: "Music",
    },
  ] as TimelineEvent[],

  story: [
    {
      year: "2019",
      title: "O Primeiro Olhar",
      description: "Um encontro despretensioso entre amigos em comum que virou uma conversa sem fim e uma conexão instantânea.",
    },
    {
      year: "2021",
      title: "Novos Horizontes",
      description: "Nossa primeira grande viagem juntos, dividindo planos, sonhos e a certeza de que a vida era muito mais bonita lado a lado.",
    },
    {
      year: "2024",
      title: "O Pedido de Casamento",
      description: "Sob um céu estrelado à beira-mar, a pergunta mais esperada de todas e o 'SIM' mais fácil e emocionante das nossas vidas.",
    },
  ] as StoryMilestone[],

  pix: {
    recipientName: "Daniela & Edshow Casamento",
    pixKey: "casamentodanielaeedshow@gmail.com",
    keyType: "Chave E-mail",
    bank: "Banco Digital / Pix Direto",
    // Código Pix Copia e Cola para demonstração
    mockCopyPasteCode: "00020126580014br.gov.bcb.pix0136casamentodanielaeedshow@gmail.com5204000053039865802BR5925Daniela e Edshow Casamento6009SAO PAULO62070503***6304E8A2",
    whatsappNotificationPhone: "5511999998888", // Telefone fictício para envio do comprovante
  },

  // Cotas de presentes / Lua de Mel
  gifts: [
    {
      id: "cota-1",
      title: "Primeira rodada de drinks na Lua de Mel",
      category: "Diversão & Brinde",
      price: 80,
      description: "Para os noivos começarem a brindar logo no primeiro pôr do sol da viagem!",
      image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "cota-2",
      title: "Jantar romântico à luz de velas",
      category: "Gastronomia",
      price: 150,
      popular: true,
      description: "Uma noite inesquecible com vinho e alta gastronomia para o casal recém-casado.",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "cota-3",
      title: "Passeio de barco em águas cristalinas",
      category: "Aventura",
      price: 250,
      popular: true,
      description: "Um dia inteiro de navegação para mergulhar e contemplar o paraíso a dois.",
      image: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "cota-4",
      title: "Dia de SPA & Massagem pós-casamento",
      category: "Relaxamento",
      price: 180,
      description: "Porque depois de dançar até de manhã no casamento, os noivos merecem relaxar!",
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "cota-5",
      title: "Diária de resort com vista para o mar",
      category: "Hospedagem",
      price: 450,
      description: "Ajude os noivos a acordarem com o barulho das ondas do mar na suíte.",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "cota-6",
      title: "Cota livre de carinho (Qualquer valor)",
      category: "Especial",
      price: 100,
      description: "Contribua com o valor que seu coração desejar para apoiar o início dessa nova família.",
      image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=600&q=80",
    },
  ] as GiftQuota[],

  rsvp: {
    deadline: "20 de Outubro de 2026",
    whatsappNumber: "5511999998888",
  },
};
