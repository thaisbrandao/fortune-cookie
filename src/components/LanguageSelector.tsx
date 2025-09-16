import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage, Language } from '../contexts/LanguageContext';
import { ChevronDown, Globe } from 'lucide-react';

export function LanguageSelector() {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages: Language[] = ['en', 'pt', 'es', 'fr', 'it'];

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-amber-50/80 backdrop-blur-md border border-amber-200/30 rounded-full text-amber-800 hover:bg-amber-100/80 transition-all duration-200"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Globe size={16} />
        <span className="text-sm font-medium" style={{ fontFamily: 'var(--font-japanese)' }}>
          {t.languages[language]}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={16} />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full mt-2 right-0 bg-amber-50/95 backdrop-blur-md border border-amber-200/30 rounded-xl shadow-xl overflow-hidden z-50"
          >
            {languages.map((lang) => (
              <motion.button
                key={lang}
                onClick={() => {
                  setLanguage(lang);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-3 text-left text-sm hover:bg-amber-100/60 transition-colors duration-150 ${
                  language === lang ? 'bg-amber-100/40 text-amber-900' : 'text-amber-800'
                }`}
                style={{ fontFamily: 'var(--font-japanese)' }}
                whileHover={{ x: 4 }}
              >
                {t.languages[lang]}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop to close dropdown */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}