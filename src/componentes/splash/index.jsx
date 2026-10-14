import { useEffect, useState } from 'react';
import './splash.css';

function SplashScreen({ onFinish }) {
  const [fade, setFade] = useState(false);

  useEffect(() => {
    // El splash screen dura 2.5 segundos visible antes de desvanecerse
    const timer = setTimeout(() => {
      setFade(true); // Activa la animación de desvanecimiento
      setTimeout(() => {
        onFinish(); // Oculta el splash y muestra la app
      }, 500); 
    }, 2500);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className={`splash-container ${fade ? 'fade-out' : ''}`}>
      <div className="splash-content">
        <img src="/splash_android.png" alt="Disney App Splash Screen" className="splash-image" />
        <div className="splash-loader"></div>
      </div>
    </div>
  );
}

export default SplashScreen;