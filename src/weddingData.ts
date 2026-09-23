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
    brideFullName: "Daniela Borges Meneses",
    groom: "Édson",
    groomFullName: "Édson Martins da Silva",
    groomNickname: "Edshow",
    monogram: "D & E",
    subtitle: "Convidam com muita alegria para a celebração de seu casamento",
    quote: "O amor não se vê com os olhos, mas com o coração.",
  },
  
  date: {
    // 25 de Setembro de 2027 às 16:30
    isoDateTime: "2027-09-25T16:30:00",
    formattedDay: "25",
    formattedMonth: "Setembro",
    formattedYear: "2027",
    formattedWeekDay: "Sábado",
    formattedTime: "16:30",
    fullDateDisplay: "Sábado, 25 de Setembro de 2027 às 16h30",
    calendarSummary: "Casamento Daniela & Édson",
    calendarDescription: "Cerimônia e Recepção de Casamento de Daniela Borges Meneses e Édson Martins da Silva no Sítio Verde Flor. Estamos muito felizes em celebrar este dia com você!",
  },

  venue: {
    name: "Sítio Verde Flor",
    description: "Um espaço aconchegante cercado pela natureza para celebrar momentos únicos e inesquecíveis.",
    address: "DF-128, km 4/5 (sentido Planaltina-GO) - Próximo ao Posto da Polícia Rodoviária",
    city: "Planaltina - DF",
    image: "/assets/venue.jpg",
    googleMapsUrl: "https://maps.app.goo.gl/w5LhhDMeNQ1e5iKCA",
    wazeUrl: "https://waze.com/ul?q=Sitio%20Verde%20Flor%20Planaltina%20DF&navigate=yes",
    uberUrl: "https://m.uber.com/ul/?action=setPickup&pickup=my_location&dropoff[formatted_address]=DF-128%20km%204/5%20Planaltina%20DF&dropoff[nickname]=Sitio%20Verde%20Flor",
  },

  music: {
    url: "/assets/romantic-melody.mp3",
    title: "Acoustic Romantic Symphony",
  },

  photos: {
    hero: "/assets/couple.jpg",
    waxSeal: "/assets/wax_seal.jpg",
    logo: "/assets/logo_dani_edson.png",
    venue: "/assets/venue.jpg",
  },

  dressCode: {
    title: "Passeio Completo / Traje Social",
    subtitle: "Queremos que você se sinta elegante e confortável para celebrar do início ao fim!",
    guidelines: [
      { label: "Mulheres", description: "Vestidos longos ou midi elegantes, tecidos fluidos e sapatos confortáveis para curtir a festa no campo." },
      { label: "Homens", description: "Terno completo ou costume com camisa social, sapato social e gravata opcional." },
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
    footwearTip: "Dica amiga: O espaço do sítio possui áreas com gramado. Para maior conforto das convidadas, recomendamos salto bloco, anabela ou protetores de salto!",
  },

  timeline: [
    {
      time: "16:30",
      title: "Chegada dos Convidados",
      description: "Welcome drink refrescante e acomodação nos jardins ao som de música acústica.",
      icon: "Users",
    },
    {
      time: "17:00",
      title: "Cerimônia das Alianças",
      description: "O momento do 'Sim' sob a luz suave do entardecer.",
      icon: "Heart",
    },
    {
      time: "18:15",
      title: "Coquetel & Fotos",
      description: "Brinde oficial, finger foods e abraços aos recém-casados.",
      icon: "GlassWater",
    },
    {
      time: "20:00",
      title: "Jantar dos Noivos",
      description: "Buffet gastronômico preparado especialmente para celebrar esse amor.",
      icon: "Utensils",
    },
    {
      time: "21:30",
      title: "Abertura da Pista & Festa",
      description: "Música animada, drinks e muita dança até altas horas!",
      icon: "Music",
    },
  ] as TimelineEvent[],

  story: [
    {
      year: "2020",
      title: "O Primeiro Olhar",
      description: "Um encontro especial que virou uma conversa sem fim e uma conexão instantânea entre nós.",
    },
    {
      year: "2023",
      title: "Crescendo Juntos",
      description: "Dividindo sonhos, planos e a certeza de que a vida era muito mais completa lado a lado.",
    },
    {
      year: "2025",
      title: "O Pedido de Casamento",
      description: "Um momento inesquecível, a pergunta mais linda e o 'SIM' mais emocionante das nossas vidas.",
    },
  ] as StoryMilestone[],

  pix: {
    recipientName: "Daniela Borges & Édson Martins",
    pixKey: "danielaeedsoncasamento@gmail.com",
    keyType: "Chave Pix E-mail",
    bank: "Banco Digital / Pix Direto",
    mockCopyPasteCode: "00020126580014br.gov.bcb.pix0136danielaeedsoncasamento@gmail.com5204000053039865802BR5925Daniela e Edson Casamento6009PLANALTINA62070503***6304D1B8",
    whatsappNotificationPhone: "5561999998888",
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
      description: "Uma noite inesquecível com vinho e alta gastronomia para o casal recém-casado.",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "cota-3",
      title: "Passeio de barco em águas cristalinas",
      category: "Aventura",
      price: 250,
      popular: true,
      description: "Um dia inteiro de navegação para contemplar o paraíso e relaxar a dois.",
      image: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "cota-4",
      title: "Dia de SPA & Massagem pós-festa",
      category: "Relaxamento",
      price: 180,
      description: "Depois de dançar a noite inteira, os noivos merecem uma massagem relaxante!",
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "cota-5",
      title: "Diária de hospedagem dos noivos",
      category: "Hospedagem",
      price: 450,
      description: "Ajude os noivos a desfrutarem de momentos únicos na suíte nupcial.",
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
    deadline: "25 de Agosto de 2027",
    whatsappNumber: "5561999998888",
  },
};
