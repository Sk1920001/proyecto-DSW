"use client"; 
import { useEffect } from 'react';

const TranslateSelector = () => {
  useEffect(() => {
    if (!document.getElementById('google-translate-script')) { // Verifica si el script ya existe
      const googleTranslateScript = document.createElement('script');
      googleTranslateScript.type = 'text/javascript';
      googleTranslateScript.id = 'google-translate-script';
      googleTranslateScript.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      document.body.appendChild(googleTranslateScript);
    }

    if (!window.googleTranslateElementInit) { // Inicializa el widget de Google Translate solo una vez
      window.googleTranslateElementInit = function() { 
        new window.google.translate.TranslateElement({ pageLanguage: 'en' }, 'google_translate_element');
      };
    }
  }, []);

  return (
    <div id="google_translate_element"></div>
  );
};

export default TranslateSelector;
