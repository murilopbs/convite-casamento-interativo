import { Users, Heart, Wine, Utensils, Music, Clock } from 'lucide-react';
import { WEDDING_DATA } from '../weddingData';

export const TimelineSection = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Users': return <Users className="w-5 h-5" />;
      case 'Heart': return <Heart className="w-5 h-5 fill-current" />;
      case 'GlassWater': return <Wine className="w-5 h-5" />;
      case 'Utensils': return <Utensils className="w-5 h-5" />;
      case 'Music': return <Music className="w-5 h-5" />;
      default: return <Clock className="w-5 h-5" />;
    }
  };

  return (
    <section id="programacao" className="py-20 px-4 sm:px-6 max-w-4xl mx-auto">
      {/* Cabeçalho */}
      <div className="text-center mb-16">
        <span className="font-serif text-xs uppercase tracking-[0.25em] text-[#9E7338] font-semibold">
          Roteiro dos Momentos
        </span>
        <h2 className="font-serif text-4xl sm:text-5xl text-[#24211E] mt-2 mb-3">
          Programação do Grande Dia
        </h2>
        <p className="text-sm text-[#756E65] max-w-md mx-auto">
          Preparamos cada detalhe com muito carinho para celebrarmos juntos do início ao fim.
        </p>
      </div>

      {/* Linha do Tempo Visual */}
      <div className="relative">
        {/* Linha Central vertical */}
        <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-[2px] bg-gradient-to-b from-[#CAA36B]/20 via-[#CAA36B] to-[#CAA36B]/20 -translate-x-1/2" />

        <div className="space-y-10 relative">
          {WEDDING_DATA.timeline.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <div 
                key={item.time} 
                className={`flex flex-col md:flex-row items-start md:items-center ${
                  isEven ? 'md:flex-row-reverse' : ''
                } gap-6 md:gap-12 relative group`}
              >
                {/* Conteúdo do Card */}
                <div className={`w-full md:w-1/2 pl-14 md:pl-0 ${isEven ? 'md:text-left' : 'md:text-right'}`}>
                  <div className="bg-[#FAF7F2] p-6 rounded-2xl border border-[#CAA36B]/30 shadow-xs hover:shadow-md transition-all duration-300 group-hover:border-[#CAA36B]">
                    <span className="inline-block px-3 py-1 bg-[#F4EFE1] text-[#9E7338] font-serif text-xs font-semibold rounded-full mb-2">
                      {item.time}
                    </span>
                    <h3 className="font-serif text-xl font-medium text-[#24211E] mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#665F56] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Marcador Central com Ícone */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#FAF7F2] border-2 border-[#CAA36B] flex items-center justify-center text-[#9E7338] shadow-md group-hover:scale-110 group-hover:bg-[#F4EFE1] transition-all duration-300 z-10">
                  {getIcon(item.icon)}
                </div>

                {/* Espaço Vazio para Equilíbrio no Desktop */}
                <div className="hidden md:block w-1/2" />
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-12 text-center">
        <p className="text-xs text-[#8E867E] italic">
          * Pedimos a gentileza de chegar com 15 minutos de antecedência para desfrutar do welcome drink.
        </p>
      </div>
    </section>
  );
};
