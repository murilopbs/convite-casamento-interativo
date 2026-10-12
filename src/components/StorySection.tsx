import { Heart, Sparkles } from 'lucide-react';
import { WEDDING_DATA } from '../weddingData';
import { SectionFeedbackBox } from './SectionFeedbackBox';

export const StorySection = () => {
  return (
    <section id="historia" className="py-20 px-4 sm:px-6 max-w-4xl mx-auto">
      {/* Cabeçalho da Seção */}
      <div className="text-center mb-14">
        <span className="font-serif text-xs uppercase tracking-[0.25em] text-[#9E7338] font-semibold">
          Capítulos do Nosso Amor
        </span>
        <h2 className="font-serif text-4xl sm:text-5xl text-[#24211E] mt-2 mb-3">
          Nossa História
        </h2>
        <div className="flex items-center justify-center gap-3">
          <span className="h-[1px] w-12 bg-[#CAA36B]/40" />
          <Heart className="w-3.5 h-3.5 text-[#CAA36B] fill-[#CAA36B]/40" />
          <span className="h-[1px] w-12 bg-[#CAA36B]/40" />
        </div>
      </div>

      {/* Foto Romântica Editorial da Trajetória do Casal */}
      <div className="mb-12 max-w-xl mx-auto rounded-3xl overflow-hidden border-2 border-[#CAA36B]/30 shadow-xl bg-[#FAF7F2] p-2">
        <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden group">
          <img 
            src={WEDDING_DATA.photos.storyPhoto} 
            alt="Daniela e Edson juntos" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 text-center text-white">
            <p className="font-script text-2xl sm:text-3xl text-[#ECDCC2] drop-shadow-md">
              "O destino nos uniu e o amor nos transformou"
            </p>
          </div>
        </div>
      </div>

      {/* Cartões dos Marcos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
        {WEDDING_DATA.story.map((item, index) => (
          <div 
            key={item.year}
            className="bg-[#FAF7F2] p-8 rounded-3xl border border-[#CAA36B]/30 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-serif text-3xl font-semibold text-[#CAA36B]">
                  {item.year}
                </span>
                <Sparkles className="w-4 h-4 text-[#CAA36B]/50 group-hover:text-[#CAA36B] transition-colors" />
              </div>
              <h3 className="font-serif text-xl font-medium text-[#24211E] mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-[#665F56] leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#CAA36B]/20 flex items-center justify-between text-xs text-[#9E7338]">
              <span className="font-serif italic">Capítulo 0{index + 1}</span>
              <span>✦</span>
            </div>
          </div>
        ))}
      </div>

      {/* Caixa de Perguntas / Validação da Nossa História */}
      <SectionFeedbackBox
        sectionId="historia"
        sectionTitle="Nossa História"
        questions={[
          {
            id: 'marcos_anos',
            question: 'Marcos e anos da história (2020, 2023, 2025): Os anos e textos resumem bem a trajetória de vocês?',
            options: [
              'Sim, estão perfeitos e contam nossa história com carinho!',
              'Gostaria de ajustar as datas ou reescrever algum dos capítulos.',
            ],
          },
          {
            id: 'foto_trajetoria',
            question: 'Foto do ensaio no meio da história: Gostou da foto do casal ilustrando a trajetória?',
            options: [
              'Sim, deu um toque muito especial e emocionante.',
              'Prefiro sem foto nessa seção, apenas os cartões de texto.',
            ],
          },
        ]}
      />
    </section>
  );
};
