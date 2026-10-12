import { Info, ShieldAlert, Heart } from 'lucide-react';
import { WEDDING_DATA } from '../weddingData';
import { SectionFeedbackBox } from './SectionFeedbackBox';

export const DressCodeSection = () => {
  const { dressCode } = WEDDING_DATA;

  return (
    <section id="dresscode" className="py-20 px-4 sm:px-6 max-w-4xl mx-auto">
      {/* Cabeçalho */}
      <div className="text-center mb-14">
        <span className="font-serif text-xs uppercase tracking-[0.25em] text-[#9E7338] font-semibold">
          Guia de Estilo & Elegância
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

      <div className="bg-[#FAF7F2] p-6 sm:p-10 rounded-3xl border border-[#CAA36B]/30 shadow-xl space-y-8">
        
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

        {/* ============================================================== */}
        {/* DESTAQUE PRINCIPAL: TONS RESERVADOS (NÃO RECOMENDADOS P/ CONVIDADOS) */}
        {/* ============================================================== */}
        <div className="pt-2">
          <div className="flex items-center justify-center gap-2 mb-4">
            <ShieldAlert className="w-4 h-4 text-[#B86B53]" />
            <h3 className="font-serif text-xs uppercase tracking-[0.2em] text-[#9E7338] font-bold text-center">
              Atenção com Carinho: Cores Reservadas
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Madrinhas e Padrinhos: TERRACOTA */}
            <div className="bg-gradient-to-br from-[#FAF5EE] to-[#F3ECE1] p-5 rounded-2xl border-2 border-[#B86B53]/40 shadow-xs flex items-start gap-4">
              <div 
                className="w-12 h-12 rounded-full shrink-0 shadow-md border-2 border-white ring-2 ring-[#B86B53]/30"
                style={{ backgroundColor: '#B86B53' }}
              />
              <div>
                <span className="inline-block bg-[#B86B53] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mb-1">
                  Exclusivo dos Padrinhos & Madrinhas
                </span>
                <h4 className="font-serif text-lg font-semibold text-[#24211E]">
                  Tom Terracota
                </h4>
                <p className="text-xs text-[#6B5E52] mt-0.5 leading-relaxed">
                  As madrinhas e padrinhos estarão de terracota. <strong>Pedimos gentilmente aos convidados que evitem esta cor</strong> para que eles tenham seu merecido destaque no altar.
                </p>
              </div>
            </div>

            {/* Noiva: BRANCO E OFF-WHITE */}
            <div className="bg-gradient-to-br from-[#FAF5EE] to-[#F3ECE1] p-5 rounded-2xl border-2 border-[#CAA36B]/40 shadow-xs flex items-start gap-4">
              <div 
                className="w-12 h-12 rounded-full shrink-0 shadow-md border-2 border-[#CAA36B]/40 ring-2 ring-[#CAA36B]/20"
                style={{ backgroundColor: '#FDFBF7' }}
              />
              <div>
                <span className="inline-block bg-[#CAA36B] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mb-1">
                  Exclusivo da Noiva
                </span>
                <h4 className="font-serif text-lg font-semibold text-[#24211E]">
                  Branco, Off-White & Pérola
                </h4>
                <p className="text-xs text-[#6B5E52] mt-0.5 leading-relaxed">
                  Cores tradicionais reservadas exclusivamente para a nossa noiva brilhar no seu grande dia.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Paleta de Cores Sugerida para Convidados */}
        <div className="pt-4 border-t border-[#CAA36B]/20">
          <div className="text-center mb-5">
            <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#9E7338] font-semibold">
              <Heart className="w-3.5 h-3.5 fill-[#CAA36B] text-[#CAA36B]" />
              Sugestões de Paleta para Convidados:
            </span>
            <p className="text-xs text-[#756E65] mt-1">
              Tons elegantes, harmônicos e perfeitos para a celebração:
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            {dressCode.recommendedColors.map((color) => (
              <div key={color.name} className="flex flex-col items-center group cursor-pointer">
                <div 
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-md border-2 border-white transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
                <span className="text-[11px] text-[#665F56] font-medium mt-1.5 group-hover:text-[#24211E] transition-colors text-center">
                  {color.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Dica de Calçado & Conforto */}
        <div className="flex items-start gap-3 text-xs text-[#756E65] bg-[#FAF7F2] p-4 rounded-xl border border-dashed border-[#CAA36B]/40">
          <Info className="w-4 h-4 text-[#9E7338] shrink-0 mt-0.5" />
          <p>{dressCode.footwearTip}</p>
        </div>

      </div>

      {/* Caixa de Perguntas / Validação do Dress Code */}
      <SectionFeedbackBox
        sectionId="dresscode"
        sectionTitle="Dress Code & Paleta de Cores"
        questions={[
          {
            id: 'cores_reservadas',
            question: 'Cores reservadas (Terracota & Branco): O aviso de que terracota é exclusivo de madrinhas/padrinhos e branco é da noiva ficou claro e educado?',
            options: [
              'Sim, super claro, elegante e respeitoso!',
              'Gostaria de ajustar o texto ou o destaque dessa regra.',
            ],
          },
          {
            id: 'paleta_convidados',
            question: 'Paleta sugerida para convidados (Sálvia, Serenity, Champagne/Nude, Rosa Chá, Oliva, Lavanda): Aprovam as opções?',
            options: [
              'Sim, aprovada! Cores harmônicas e sofisticadas.',
              'Gostaria de tirar ou acrescentar alguma cor à paleta.',
            ],
          },
          {
            id: 'nivel_formalidade',
            question: 'Nível de formalidade do traje (Passeio Completo / Traje Social): Está alinhado com a proposta da festa?',
            options: [
              'Sim, ideal para o estilo e horário do nosso casamento.',
              'Gostaria de tornar mais descontraído ou mais clássico/black-tie.',
            ],
          },
        ]}
      />
    </section>
  );
};
