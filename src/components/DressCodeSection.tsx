import { Sparkles, Info } from 'lucide-react';
import { WEDDING_DATA } from '../weddingData';


export const DressCodeSection = () => {
  const { dressCode } = WEDDING_DATA;

  return (
    <section className="py-20 px-4 sm:px-6 max-w-4xl mx-auto">
      {/* Cabeçalho */}
      <div className="text-center mb-14">
        <span className="font-serif text-xs uppercase tracking-[0.25em] text-[#9E7338] font-semibold">
          Guia de Estilo
        </span>
        <h2 className="font-serif text-4xl sm:text-5xl text-[#24211E] mt-2 mb-3">
          Dress Code
        </h2>
        <p className="font-serif text-2xl text-[#CAA36B] font-medium">
          {dressCode.title}
        </p>
        <p className="text-sm text-[#756E65] mt-1 max-w-md mx-auto">
          {dressCode.subtitle}
        </p>
      </div>

      <div className="bg-[#FAF7F2] p-8 sm:p-10 rounded-3xl border border-[#CAA36B]/30 shadow-xl space-y-8">
        
        {/* Diretrizes Mulheres e Homens */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {dressCode.guidelines.map((guide) => (
            <div key={guide.label} className="bg-[#F4EFE1] p-6 rounded-2xl border border-[#CAA36B]/25">
              <span className="font-serif text-xs uppercase tracking-widest text-[#9E7338] font-semibold block mb-2">
                Para {guide.label}
              </span>
              <p className="text-sm text-[#524B43] leading-relaxed">
                {guide.description}
              </p>
            </div>
          ))}
        </div>

        {/* Paleta de Cores de Inspiração */}
        <div className="pt-4 border-t border-[#CAA36B]/20">
          <p className="text-xs uppercase tracking-widest text-[#9E7338] font-semibold mb-4 text-center">
            Paleta de Cores Sugerida para Inspirar seu Look:
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            {dressCode.recommendedColors.map((color) => (
              <div key={color.name} className="flex flex-col items-center group">
                <div 
                  className="w-12 h-12 rounded-full shadow-md border-2 border-white transition-transform duration-300 group-hover:scale-110 cursor-pointer"
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
                <span className="text-[11px] text-[#665F56] font-medium mt-1.5 group-hover:text-[#24211E] transition-colors">
                  {color.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Lembrete Carinhoso sobre a cor da Noiva */}
        <div className="bg-[#F6EFE1] p-4 sm:p-5 rounded-2xl border border-[#CAA36B]/40 flex items-center gap-3.5">
          <Sparkles className="w-5 h-5 text-[#CAA36B] shrink-0" />
          <p className="text-xs sm:text-sm text-[#7D572C] font-medium leading-relaxed">
            {dressCode.gentleReminder}
          </p>
        </div>

        {/* Dica de Calçado */}
        <div className="flex items-start gap-3 text-xs text-[#756E65] bg-[#FAF7F2] p-4 rounded-xl border border-dashed border-[#CAA36B]/40">
          <Info className="w-4 h-4 text-[#9E7338] shrink-0 mt-0.5" />
          <p>{dressCode.footwearTip}</p>
        </div>

      </div>
    </section>
  );
};
