import { MapPin, Navigation, Car, ExternalLink, ShieldCheck } from 'lucide-react';
import { WEDDING_DATA } from '../weddingData';

export const LocationSection = () => {
  return (
    <section id="localizacao" className="py-20 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Cabeçalho */}
      <div className="text-center mb-14">
        <span className="font-serif text-xs uppercase tracking-[0.25em] text-[#9E7338] font-semibold">
          Destino do Nosso Amor
        </span>
        <h2 className="font-serif text-4xl sm:text-5xl text-[#24211E] mt-2 mb-3">
          Local & Como Chegar
        </h2>
        <p className="text-sm text-[#756E65] max-w-md mx-auto">
          Escolhemos um cenário acolhedor e cercado pela natureza para eternizar esse momento.
        </p>
      </div>

      <div className="bg-[#FAF7F2] rounded-3xl border border-[#CAA36B]/30 shadow-xl overflow-hidden">
        {/* Foto do Espaço em Destaque */}
        <div className="relative h-72 sm:h-96 w-full overflow-hidden">
          <img 
            src={WEDDING_DATA.venue.image} 
            alt={WEDDING_DATA.venue.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <span className="inline-block bg-[#CAA36B] text-white text-[11px] font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-2">
              Espaço da Cerimônia & Recepção
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-medium">
              {WEDDING_DATA.venue.name}
            </h3>
            <p className="text-xs sm:text-sm text-[#ECDCC2] flex items-center gap-1.5 mt-1">
              <MapPin className="w-4 h-4 shrink-0" />
              {WEDDING_DATA.venue.address} • {WEDDING_DATA.venue.city}
            </p>
          </div>
        </div>

        {/* Barra de 3 Botões de Navegação Direta */}
        <div className="p-6 sm:p-8 bg-[#FAF7F2]">
          <p className="text-xs uppercase tracking-widest text-[#9E7338] font-semibold mb-4 text-center">
            Escolha seu aplicativo de navegação preferido:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {/* Google Maps */}
            <a 
              href={WEDDING_DATA.venue.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 bg-white hover:bg-[#ECDCC2] text-[#24211E] font-medium text-sm py-3.5 px-4 rounded-2xl border border-[#CAA36B]/30 shadow-xs hover:shadow-md transition-all duration-300 group"
            >
              <div className="w-8 h-8 rounded-full bg-[#ECDCC2]/60 flex items-center justify-center text-[#9E7338] group-hover:scale-110 transition-transform">
                <Navigation className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="text-xs text-[#7A746E]">Abrir no</div>
                <div className="font-semibold text-sm">Google Maps</div>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-[#9E7338] ml-auto" />
            </a>

            {/* Waze */}
            <a 
              href={WEDDING_DATA.venue.wazeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 bg-white hover:bg-[#ECDCC2] text-[#24211E] font-medium text-sm py-3.5 px-4 rounded-2xl border border-[#CAA36B]/30 shadow-xs hover:shadow-md transition-all duration-300 group"
            >
              <div className="w-8 h-8 rounded-full bg-[#ECDCC2]/60 flex items-center justify-center text-[#9E7338] group-hover:scale-110 transition-transform">
                <Car className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="text-xs text-[#7A746E]">Navegar com</div>
                <div className="font-semibold text-sm">Waze</div>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-[#9E7338] ml-auto" />
            </a>

            {/* Uber Direto */}
            <a 
              href={WEDDING_DATA.venue.uberUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 bg-[#24211E] hover:bg-black text-white font-medium text-sm py-3.5 px-4 rounded-2xl border border-black shadow-xs hover:shadow-md transition-all duration-300 group"
            >
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                <span className="font-serif font-bold text-xs">U</span>
              </div>
              <div className="text-left">
                <div className="text-[11px] text-white/70">Pedir no</div>
                <div className="font-semibold text-sm">Uber p/ Destino</div>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-white/70 ml-auto" />
            </a>
          </div>

          {/* Dicas Práticas de Estacionamento & Conforto */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-[#CAA36B]/20 text-xs text-[#665F56]">
            <div className="flex items-start gap-2.5 bg-[#F4EFE1] p-4 rounded-xl border border-[#CAA36B]/20">
              <ShieldCheck className="w-4 h-4 text-[#9E7338] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#24211E] block font-medium mb-0.5">Estacionamento & Manobrista:</strong>
                O local conta com estacionamento privativo gratuito e serviço de valet para todos os convidados durante todo o evento.
              </div>
            </div>

            <div className="flex items-start gap-2.5 bg-[#F4EFE1] p-4 rounded-xl border border-[#CAA36B]/20">
              <Car className="w-4 h-4 text-[#9E7338] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#24211E] block font-medium mb-0.5">Se beber, vá de aplicativo:</strong>
                Recomendamos o uso de aplicativos de transporte para que você possa brindar e aproveitar a festa sem preocupações!
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
