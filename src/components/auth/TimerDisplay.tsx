'use client';

import { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

interface TimerDisplayProps {
  initialSeconds: number;
  onExpire: () => void;
  label?: string;
}

export function TimerDisplay({
  initialSeconds,
  onExpire,
  label = 'OTP expires in',
}: TimerDisplayProps) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);

  useEffect(() => {
    if (secondsLeft <= 0) {
      onExpire();
      return;
    }

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          onExpire();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsLeft, onExpire]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  return (
    <div className="flex items-center justify-center gap-2 text-sm">
      <Clock size={16} className="text-muted-foreground" />
      <span className="text-muted-foreground">
        {label}:{' '}
        <span className="font-semibold text-foreground">
          {minutes}:{seconds.toString().padStart(2, '0')}
        </span>
      </span>
    </div>
  );
}
