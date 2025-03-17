import React, { useEffect, useState } from 'react';
import moment, { Moment } from 'moment';

interface CountdownProps {
  date: string; // Format: "DD/MM/YYYY"
  texto?: string; // Optional prop for text color
}


const parseDateString = (dateStr: string): Moment => {
  return moment(dateStr, 'DD/MM/YYYY');
};

const Countdown: React.FC<CountdownProps> = ({ date, texto }) => {
  const [days, setDays] = useState<string>('00');
  const [hours, setHours] = useState<string>('00');
  const [minutes, setMinutes] = useState<string>('00');
  const [seconds, setSeconds] = useState<string>('00');

  const target: Moment = parseDateString(date);
  const now: Moment = moment();

  useEffect(() => {
    const interval = setInterval(() => {
      const difference = target.diff(moment());

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      setDays(d < 10 ? `0${d}` : d.toString());

      const h = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      setHours(h < 10 ? `0${h}` : h.toString());

      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      setMinutes(m < 10 ? `0${m}` : m.toString());

      const s = Math.floor((difference % (1000 * 60)) / 1000);
      setSeconds(s < 10 ? `0${s}` : s.toString());
    }, 1000);

    return () => clearInterval(interval);
  }, [target]);

  // Styles with added animations
  const cuentaStyle = ` font-[200] text-3xl ${
    texto || 'text-white'
  } rounded-full w-10 h-10 text-center flex items-center justify-center transition-all duration-300 hover:scale-110`;
  
  const textitoStyle = `font-[300] text-[11px] ${
    texto || 'text-white'
  } text-center transition-opacity duration-300`;
  
  const dospu = `text-3xl font-[300] mb-5 ${
    texto === 'text-black' ? 'text-black' : texto || 'text-white'
  } text-center transition-all duration-300`;

  return (
    <div className="w-60">
      <div
        className={`flex font-[200] ${
          texto || 'text-white'
        } justify-between items-center mt-2 animate-fadeIn`}
      >
        <div className="flex flex-col items-center">
          <span className={cuentaStyle}>{days}</span>
          <span className={textitoStyle}>días</span>
        </div>
        <span className={dospu}>:</span>
        <div className="flex flex-col items-center">
          <span className={cuentaStyle}>{hours}</span>
          <span className={textitoStyle}>horas</span>
        </div>
        <span className={dospu}>:</span>
        <div className="flex flex-col items-center">
          <span className={cuentaStyle}>{minutes}</span>
          <span className={textitoStyle}>minutos</span>
        </div>
        <span className={dospu}>:</span>
        <div className="flex flex-col items-center">
          <span className={cuentaStyle}>{seconds}</span>
          <span className={textitoStyle}>segundos</span>
        </div>
      </div>
    </div>
  );
};


export default Countdown;