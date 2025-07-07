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
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden" style={{ backgroundImage: 'url(/lovable-uploads/7341bf56-389c-470a-8957-74d490f2aed4.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>

      <div className="text-center z-10 px-4">
        {/* Main Clock */}
        <div 
          className="text-[98px] md:text-[131px] lg:text-[196px] font-extrabold text-white mb-6 font-inter transition-all duration-300"
          style={{ 
            textShadow: 'var(--text-glow-shadow)',
            filter: 'drop-shadow(0 0 15px rgba(135, 206, 235, 0.15))',
            letterSpacing: '-20%'
          }}
        >
          {formatTime(time)}
        </div>

      </div>
    </div>
  );
};

export default DigitalClock;