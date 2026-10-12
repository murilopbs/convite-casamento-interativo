import { useState, useEffect } from 'react';
import { MessageSquareHeart, Check, Copy, Send, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export interface FeedbackQuestion {
  id: string;
  question: string;
  options: string[];
}

interface SectionFeedbackBoxProps {
  sectionId: string;
  sectionTitle: string;
  questions: FeedbackQuestion[];
  recipientPhone?: string; // WhatsApp dos noivos ou assessoria
}

export const SectionFeedbackBox = ({
  sectionId,
  sectionTitle,
  questions,
  recipientPhone = '5561999998888',
}: SectionFeedbackBoxProps) => {
  const storageKey = `wedding_feedback_${sectionId}`;

  // Recupera respostas salvas do localStorage
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [customComment, setCustomComment] = useState<string>(() => {
    try {
      return localStorage.getItem(`${storageKey}_comment`) || '';
    } catch {
      return '';
    }
  });

  const [copied, setCopied] = useState(false);

  // Salva no localStorage quando o usuário interage
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(selectedAnswers));
      localStorage.setItem(`${storageKey}_comment`, customComment);
    } catch {
      // Ignora erro de localStorage
    }
  }, [selectedAnswers, customComment, storageKey]);

  const handleSelectOption = (questionId: string, option: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: option,
    }));
  };

  const generateFeedbackSummary = () => {
    let summary = `💍 *FEEDBACK DA NOIVA - SEÇÃO: ${sectionTitle.toUpperCase()}*\n\n`;

    questions.forEach((q, idx) => {
      const answer = selectedAnswers[q.id] || 'Não respondido';
      summary += `*${idx + 1}. ${q.question}*\n👉 Resposta: ${answer}\n\n`;
    });

    if (customComment.trim()) {
      summary += `📝 *Observações / Sugestões da Dani:*\n"${customComment.trim()}"\n`;
    }

    return summary;
  };

  const handleCopy = () => {
    const text = generateFeedbackSummary();
    navigator.clipboard.writeText(text);
    setCopied(true);

    confetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.8 },
      colors: ['#CAA36B', '#D8B765', '#FAF7F2'],
    });

    setTimeout(() => setCopied(false), 3000);
  };

  const handleSendWhatsApp = () => {
    const text = encodeURIComponent(generateFeedbackSummary());
    const url = `https://wa.me/${recipientPhone}?text=${text}`;
    window.open(url, '_blank');
  };

  return (
    <div className="w-full mt-10 pt-8 border-t-2 border-dashed border-[#CAA36B]/30">
      <div className="bg-[#FAF7F2] p-5 sm:p-7 rounded-3xl border border-[#CAA36B]/40 shadow-md">
        
        {/* Cabeçalho do Bloco de Feedback */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#ECDCC2] flex items-center justify-center text-[#9E7338] shrink-0">
              <MessageSquareHeart className="w-5 h-5" />
            </div>
            <div>
              <span className="font-serif text-[11px] uppercase tracking-widest text-[#9E7338] font-bold">
                Validação dos Noivos • Dani & Edson
              </span>
              <h4 className="font-serif text-lg sm:text-xl font-semibold text-[#24211E]">
                O que você achou de: {sectionTitle}?
              </h4>
            </div>
          </div>

          <span className="self-start sm:self-auto text-[11px] bg-[#F4EFE1] text-[#7A746E] px-3 py-1 rounded-full border border-[#CAA36B]/20 font-medium">
            Perguntas para aprovação
          </span>
        </div>

        {/* Lista de Perguntas */}
        <div className="space-y-6">
          {questions.map((q, qIndex) => (
            <div key={q.id} className="bg-white/80 p-4 sm:p-5 rounded-2xl border border-[#CAA36B]/25">
              <p className="text-xs sm:text-sm font-semibold text-[#24211E] mb-3">
                <span className="text-[#9E7338] mr-1.5">{qIndex + 1}.</span> {q.question}
              </p>

              <div className="grid grid-cols-1 gap-2">
                {q.options.map((option) => {
                  const isSelected = selectedAnswers[q.id] === option;

                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => handleSelectOption(q.id, option)}
                      className={`text-left text-xs sm:text-[13px] p-3 rounded-xl border transition-all flex items-start gap-3 cursor-pointer ${
                        isSelected
                          ? 'bg-[#F4EFE1] border-[#CAA36B] text-[#24211E] font-medium shadow-xs'
                          : 'bg-white border-[#CAA36B]/20 text-[#6B5E52] hover:bg-[#FAF7F2] hover:border-[#CAA36B]/50'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full mt-0.5 shrink-0 flex items-center justify-center border transition-colors ${
                          isSelected
                            ? 'border-[#CAA36B] bg-[#CAA36B] text-white'
                            : 'border-[#CAA36B]/40 bg-white'
                        }`}
                      >
                        {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                      </div>
                      <span className="flex-1 leading-relaxed">{option}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Campo de Comentário Livre */}
          <div className="bg-white/80 p-4 rounded-2xl border border-[#CAA36B]/25">
            <label className="text-xs font-semibold text-[#24211E] block mb-1.5">
              Alguma observação, dúvida ou ajuste específico para esta seção? (Opcional)
            </label>
            <textarea
              rows={2}
              value={customComment}
              onChange={(e) => setCustomComment(e.target.value)}
              placeholder="Ex: Gostaria de mudar a foto, ajustar o texto ou sugerir uma cor diferente..."
              className="w-full text-xs p-3 rounded-xl bg-white border border-[#CAA36B]/30 outline-none focus:border-[#CAA36B] transition-colors resize-none text-[#24211E]"
            />
          </div>
        </div>

        {/* Botões de Ação para Enviar ou Copiar */}
        <div className="mt-6 pt-4 border-t border-[#CAA36B]/20 flex flex-wrap items-center justify-between gap-3">
          <p className="text-[11px] text-[#7A746E]">
            Suas respostas ficam salvas automaticamente neste aparelho.
          </p>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white hover:bg-[#ECDCC2] text-[#24211E] border border-[#CAA36B]/40 text-xs font-medium transition-all shadow-xs"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Copiado! ✨</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#9E7338]" />
                  <span>Copiar Respostas</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleSendWhatsApp}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#CAA36B] hover:bg-[#9E7338] text-white text-xs font-semibold transition-all shadow-xs hover:shadow-md"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Enviar pelo WhatsApp</span>
              <Sparkles className="w-3 h-3 text-amber-200" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
