import React, { useState, useEffect, useCallback } from 'react';
import { cn } from '../../features/ui/primitives/styles';

interface MatrixTextProps {
  text: string;
  className?: string;
  delay?: number;
  glitchEffect?: boolean;
  color?: 'cyan' | 'magenta' | 'yellow' | 'green' | 'red';
}

interface LetterState {
  char: string;
  isMatrix: boolean;
  isSpace: boolean;
}

export const MatrixText: React.FC<MatrixTextProps> = ({
  text,
  className,
  delay = 100,
  glitchEffect = false,
  color = 'cyan'
}) => {
  const [letters, setLetters] = useState<LetterState[]>(() =>
    text.split('').map((char) => ({
      char,
      isMatrix: false,
      isSpace: char === ' ',
    }))
  );
  const [isAnimating, setIsAnimating] = useState(false);

  const getRandomChar = useCallback(() => {
    const chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
    return chars[Math.floor(Math.random() * chars.length)];
  }, []);

  const animateLetter = useCallback(
    (index: number) => {
      if (index >= text.length) return;

      setLetters((prev) => {
        const newLetters = [...prev];
        if (!newLetters[index].isSpace) {
          newLetters[index] = {
            ...newLetters[index],
            char: getRandomChar(),
            isMatrix: true,
          };
        }
        return newLetters;
      });

      setTimeout(() => {
        setLetters((prev) => {
          const newLetters = [...prev];
          newLetters[index] = {
            ...newLetters[index],
            char: text[index],
            isMatrix: false,
          };
          return newLetters;
        });
      }, 500);
    },
    [getRandomChar, text]
  );

  const startAnimation = useCallback(() => {
    if (isAnimating) return;

    setIsAnimating(true);
    let currentIndex = 0;

    const animate = () => {
      if (currentIndex >= text.length) {
        setIsAnimating(false);
        return;
      }

      animateLetter(currentIndex);
      currentIndex++;
      setTimeout(animate, delay);
    };

    animate();
  }, [animateLetter, text, isAnimating, delay]);

  useEffect(() => {
    const timer = setTimeout(startAnimation, 200);
    return () => clearTimeout(timer);
  }, [startAnimation]);

  const colorClasses = {
    cyan: 'text-cyber-cyan',
    magenta: 'text-cyber-magenta',
    yellow: 'text-cyber-yellow',
    green: 'text-cyber-green',
    red: 'text-cyber-red',
  };

  const matrixColorClasses = {
    cyan: 'text-cyber-cyan/70',
    magenta: 'text-cyber-magenta/70',
    yellow: 'text-cyber-yellow/70',
    green: 'text-cyber-green/70',
    red: 'text-cyber-red/70',
  };

  const glowClasses = {
    cyan: 'text-shadow-neon-cyan',
    magenta: 'text-shadow-neon-magenta',
    yellow: 'text-shadow-neon-yellow',
    green: 'drop-shadow-[0_0_8px_hsl(var(--cyber-green))]',
    red: 'drop-shadow-[0_0_8px_hsl(var(--cyber-red))]',
  };

  return (
    <div
      className={cn(
        "font-mono font-bold tracking-wider",
        glitchEffect && "glitch-text",
        className
      )}
      data-text={text}
    >
      <div className="flex flex-wrap">
        {letters.map((letter, index) => (
          <span
            key={index}
            className={cn(
              "inline-block transition-all duration-100",
              letter.isMatrix 
                ? cn(matrixColorClasses[color], "animate-pulse")
                : cn(colorClasses[color], glowClasses[color])
            )}
            style={{
              width: letter.isSpace ? '0.5ch' : '1ch',
              textAlign: 'center',
            }}
          >
            {letter.isSpace ? '\u00A0' : letter.char}
          </span>
        ))}
      </div>
    </div>
  );
};

export default MatrixText;