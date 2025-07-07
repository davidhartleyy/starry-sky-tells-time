import { useState, useEffect } from 'react';

const DigitalClock = () => {
  const [time, setTime] = useState(new Date());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getTimezone = () => {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  };

  if (!mounted) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center" style={{ background: 'var(--gradient-night-sky)' }}>
        <div className="text-center">
          <div className="text-8xl md:text-9xl font-light text-white mb-4 font-mono">
            --:--
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden" style={{ background: 'var(--gradient-night-sky)' }}>
      {/* Animated stars background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-60 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="text-center z-10 px-4">
        {/* Main Clock */}
        <div 
          className="text-8xl md:text-9xl lg:text-[12rem] font-light text-white mb-6 font-mono tracking-wider transition-all duration-300"
          style={{ 
            textShadow: 'var(--text-glow-shadow)',
            filter: 'drop-shadow(0 0 30px rgba(135, 206, 235, 0.3))'
          }}
        >
          {formatTime(time)}
        </div>

        {/* Date */}
        <div className="text-xl md:text-2xl text-clock-glow mb-4 font-light tracking-wide">
          {formatDate(time)}
        </div>

        {/* Timezone */}
        <div className="text-lg text-white/70 font-light">
          {getTimezone()}
        </div>

        {/* Subtle pulsing dot for seconds */}
        <div className="flex justify-center mt-8">
          <div 
            className="w-3 h-3 bg-clock-glow rounded-full animate-pulse"
            style={{ 
              boxShadow: '0 0 15px hsl(var(--clock-glow) / 0.8)' 
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default DigitalClock;