import { useState, useRef, useEffect, useImperativeHandle, forwardRef } from 'react';
import { Volume2, VolumeX, Music2 } from 'lucide-react';
import { WEDDING_DATA } from '../weddingData';

export interface AudioPlayerHandle {
  playAudio: () => void;
}

export const AudioPlayer = forwardRef<AudioPlayerHandle>((_, ref) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useImperativeHandle(ref, () => ({
    playAudio: () => {
      if (audioRef.current && !isPlaying) {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch((err) => {
            console.log('Audio autoplay prevented by browser policy:', err);
          });
      }
    }
  }));

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((e) => console.log('Playback error:', e));
    }
  };

  useEffect(() => {
    // Definir volume suave (40%)
    if (audioRef.current) {
      audioRef.current.volume = 0.35;
    }
  }, []);

  return (
    <>
      <audio 
        ref={audioRef} 
        src={WEDDING_DATA.music.url} 
        loop 
        preload="auto"
      />

      <div className="fixed bottom-5 right-5 z-40">
        <button
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pausar música ambiente' : 'Tocar música ambiente'}
          className="flex items-center gap-2.5 bg-[#FAF7F2]/90 backdrop-blur-md px-3.5 py-2 rounded-full border border-[#CAA36B]/40 shadow-lg hover:shadow-xl hover:border-[#CAA36B] transition-all duration-300 text-[#24211E] group"
        >
          {/* Ícone de Play / Pause com equalizador */}
          <div className="relative w-8 h-8 rounded-full bg-[#ECDCC2] flex items-center justify-center text-[#9E7338] transition-transform duration-300 group-hover:scale-105">
            {isPlaying ? (
              <div className="flex items-end justify-center gap-0.5 h-3.5">
                <span className="w-0.5 bg-[#9E7338] rounded-full sound-bar-1" />
                <span className="w-0.5 bg-[#9E7338] rounded-full sound-bar-2" />
                <span className="w-0.5 bg-[#9E7338] rounded-full sound-bar-3" />
                <span className="w-0.5 bg-[#9E7338] rounded-full sound-bar-4" />
              </div>
            ) : (
              <Music2 className="w-4 h-4 text-[#9E7338]" />
            )}
          </div>

          <div className="hidden sm:flex flex-col text-left pr-1">
            <span className="text-[10px] uppercase tracking-wider text-[#9E7338] font-semibold">
              Trilha Sonora
            </span>
            <span className="text-xs text-[#524B43] font-medium max-w-[120px] truncate">
              {isPlaying ? 'Tocando...' : 'Ouvir Música'}
            </span>
          </div>

          <div className="text-[#9E7338]">
            {isPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-[#8E867E]" />}
          </div>
        </button>
      </div>
    </>
  );
});
