import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'pt' | 'es' | 'fr' | 'it';

interface Translations {
  title: string;
  subtitle: string;
  clickInstruction: string;
  tryAnother: string;
  todayMessage: string;
  fortuneLabel: string;
  ancientWisdom: string;
  footer: string;
  languages: {
    en: string;
    pt: string;
    es: string;
    fr: string;
    it: string;
  };
  share: {
    title: string;
    whatsapp: string;
    instagram: string;
    twitter: string;
    facebook: string;
    copy: string;
    copied: string;
    copyFailed: string;
    copyManual: string;
  };
  fortunes: string[];
}

const translations: Record<Language, Translations> = {
  en: {
    title: "Fortune Cookie",
    subtitle: "",
    clickInstruction: "Click the fortune cookie to reveal your message",
    tryAnother: "Try another fortune",
    todayMessage: "Today your message is:",
    fortuneLabel: "運命",
    ancientWisdom: "古からの智慧",
    footer: "by Thaís Brandaoり",
    languages: {
      en: "English",
      pt: "Português",
      es: "Español",
      fr: "Français",
      it: "Italiano"
    },
    share: {
      title: "Share your fortune",
      whatsapp: "Share on WhatsApp",
      instagram: "Share on Instagram",
      twitter: "Share on Twitter",
      facebook: "Share on Facebook",
      copy: "Copy message",
      copied: "Copied!",
      copyFailed: "Copy failed - try manual copy",
      copyManual: "Please copy manually:"
    },
    fortunes: [
      "The journey of a thousand miles begins with a single step.",
      "Cherry blossoms bloom brightest just before they fall.",
      "In stillness, the heart finds its true direction.",
      "The bamboo that bends is stronger than the oak that resists.",
      "Today's accomplishments were yesterday's impossibilities.",
      "A wise person learns from the mistakes of others.",
      "The tea is never as good as the first sip, or as bad as the last.",
      "When the flower blooms, the bees come uninvited.",
      "The best time to plant a tree was 20 years ago. The second best time is now.",
      "Your future is created by what you do today, not tomorrow.",
      "Like water, flow around obstacles rather than through them.",
      "The moon does not fight the darkness, it simply shines.",
      "Even the longest winter eventually gives way to spring.",
      "A mountain is made of grains of earth, an ocean of drops of water.",
      "Patience is the key that unlocks many doors.",
      "Perseverance overcomes talent when talent does not persist.",
      "Those who plant virtue reap happiness.",
      "Patience is bitter, but its fruit is sweet.",
      "A rolling stone gathers no moss.",
      "Even a journey of a thousand miles begins with a single step.",
      "The bamboo that bends is stronger than the oak that resists.",
      "When looking at the moon, do not see your own shadow.",
      "Luck favors those who prepare.",
      "Deep water does not make noise.",
      "Fall seven times, stand up eight.",
      "To learn is to discover what you already know.",
      "The wind does not break strong trees, but helps the flexible grow.",
      "A man without courage is like a tree without roots.",
      "He who wants to harvest rice must bend over the field.",
      "Wisdom is like fire: people take it from others.",
      "A child is the bow, the mother is the string.",
      "Rain does not fall on one roof alone.",
      "A bird does not sing because it has an answer, it sings because it has a song.",
      "Smooth seas do not make skillful sailors.",
      "Haste has no blessing.",
      "No matter how tall the mountain, it cannot block the sun.",
      "Little by little, the bird builds its nest.",
      "If you want to go fast, go alone; if you want to go far, go together.",
      "The frog does not drink up the pond it lives in.",
      "A wise man adapts to circumstances as water shapes itself to the vessel.",
      "One who endures conquers.",
      "He who forgives ends the quarrel.",
      "When the roots are deep, there is no reason to fear the wind.",
      "Better to light a candle than curse the darkness.",
      "A smile is the shortest distance between two hearts."
    ]
  },
  pt: {
    title: "Biscoito da Sorte",
    subtitle: "",
    clickInstruction: "Clique no biscoito da sorte para revelar sua mensagem",
    tryAnother: "Tentar outra sorte",
    todayMessage: "Sua mensagem de hoje é:",
    fortuneLabel: "運命",
    ancientWisdom: "古からの智慧",
    footer: "por Thaís Brandaoり",
    languages: {
      en: "English",
      pt: "Português",
      es: "Español",
      fr: "Français",
      it: "Italiano"
    },
    share: {
      title: "Compartilhe sua sorte",
      whatsapp: "Compartilhar no WhatsApp",
      instagram: "Compartilhar no Instagram",
      twitter: "Compartilhar no Twitter",
      facebook: "Compartilhar no Facebook",
      copy: "Copiar mensagem",
      copied: "Copiado!",
      copyFailed: "Falha na cópia - tente copiar manualmente",
      copyManual: "Por favor, copie manualmente:"
    },
    fortunes: [
      "A jornada de mil milhas começa com um único passo.",
      "As flores de cerejeira brilham mais intensamente antes de cair.",
      "Na quietude, o coração encontra sua verdadeira direção.",
      "O bambu que se dobra é mais forte que o carvalho que resiste.",
      "As conquistas de hoje eram as impossibilidades de ontem.",
      "Uma pessoa sábia aprende com os erros dos outros.",
      "O chá nunca é tão bom quanto o primeiro gole, nem tão ruim quanto o último.",
      "Quando a flor desabrocha, as abelhas vêm sem convite.",
      "O melhor momento para plantar uma árvore foi há 20 anos. O segundo melhor momento é agora.",
      "Seu futuro é criado pelo que você faz hoje, não amanhã.",
      "Como a água, flua ao redor dos obstáculos, não através deles.",
      "A lua não luta contra a escuridão, ela simplesmente brilha.",
      "Até o inverno mais longo eventualmente dá lugar à primavera.",
      "Uma montanha é feita de grãos de terra, um oceano de gotas de água.",
      "A paciência é a chave que abre muitas portas.",
      "A perseverança supera o talento quando o talento não persiste.",
      "Quem planta virtude colhe felicidade.",
      "A paciência é amarga, mas seus frutos são doces.",
      "Pedra que rola não cria limo.",
      "Mesmo uma jornada de mil milhas começa com um único passo.",
      "O bambu que se curva é mais forte que o carvalho que resiste.",
      "Ao olhar para a lua, não veja sua própria sombra.",
      "A sorte favorece aqueles que se preparam.",
      "Águas profundas não fazem barulho.",
      "Caia sete vezes, levante-se oito.",
      "Aprender é descobrir o que você já sabe.",
      "O vento não quebra árvores fortes, mas ajuda as flexíveis a crescer.",
      "Um homem sem coragem é como uma árvore sem raízes.",
      "Quem quer colher arroz deve se curvar no campo.",
      "A sabedoria é como o fogo: as pessoas a pegam umas das outras.",
      "A criança é o arco, a mãe é a corda.",
      "A chuva não cai só no telhado de uma casa.",
      "Um pássaro não canta porque tem uma resposta, canta porque tem uma canção.",
      "Mares calmos não fazem bons marinheiros.",
      "A pressa não traz bênção.",
      "Não importa quão alta seja a montanha, ela não pode bloquear o sol.",
      "De grão em grão, o pássaro faz o ninho.",
      "Se quer ir rápido, vá sozinho; se quer ir longe, vá acompanhado.",
      "O sapo não bebe toda a água do lago onde vive.",
      "Um sábio adapta-se às circunstâncias como a água ao recipiente.",
      "Quem persevera conquista.",
      "Quem perdoa põe fim à briga.",
      "Quando as raízes são profundas, não há razão para temer o vento.",
      "Melhor acender uma vela do que amaldiçoar a escuridão.",
      "Um sorriso é a menor distância entre dois corações."
    ]
  },
  es: {
    title: "Galleta de la Fortuna",
    subtitle: "",
    clickInstruction: "Haz clic en la galleta de la fortuna para revelar tu mensaje",
    tryAnother: "Probar otra fortuna",
    todayMessage: "Tu mensaje de hoy es:",
    fortuneLabel: "運命",
    ancientWisdom: "古からの智慧",
    footer: "por Thaís Brandaoり",
    languages: {
      en: "English",
      pt: "Português",
      es: "Español",
      fr: "Français",
      it: "Italiano"
    },
    share: {
      title: "Comparte tu fortuna",
      whatsapp: "Compartir en WhatsApp",
      instagram: "Compartir en Instagram",
      twitter: "Compartir en Twitter",
      facebook: "Compartir en Facebook",
      copy: "Copiar mensaje",
      copied: "¡Copiado!",
      copyFailed: "Error al copiar - intenta copiar manualmente",
      copyManual: "Por favor, copia manualmente:"
    },
    fortunes: [
      "El viaje de mil millas comienza con un solo paso.",
      "Las flores de cerezo brillan más intensamente justo antes de caer.",
      "En la quietud, el corazón encuentra su verdadera dirección.",
      "El bambú que se dobla es más fuerte que el roble que resiste.",
      "Los logros de hoy eran las imposibilidades de ayer.",
      "Una persona sabia aprende de los errores de otros.",
      "El té nunca es tan bueno como el primer sorbo, ni tan malo como el último.",
      "Cuando la flor florece, las abejas vienen sin invitación.",
      "El mejor momento para plantar un árbol fue hace 20 años. El segundo mejor momento es ahora.",
      "Tu futuro se crea por lo que haces hoy, no mañana.",
      "Como el agua, fluye alrededor de los obstáculos, no a través de ellos.",
      "La luna no lucha contra la oscuridad, simplemente brilla.",
      "Incluso el invierno más largo eventualmente da paso a la primavera.",
      "Una montaña está hecha de granos de tierra, un océano de gotas de agua.",
      "La paciencia es la llave que abre muchas puertas.",
      "La perseverancia supera al talento cuando el talento no persiste.",
      "Quien siembra virtud cosecha felicidad.",
      "La paciencia es amarga, pero sus frutos son dulces.",
      "Piedra que rueda no cría moho.",
      "Incluso un viaje de mil millas comienza con un solo paso.",
      "El bambú que se dobla es más fuerte que el roble que resiste.",
      "Al mirar la luna, no veas tu propia sombra.",
      "La suerte favorece a quienes se preparan.",
      "Las aguas profundas no hacen ruido.",
      "Cae siete veces, levántate ocho.",
      "Aprender es descubrir lo que ya sabes.",
      "El viento no rompe los árboles fuertes, pero ayuda a crecer a los flexibles.",
      "Un hombre sin valor es como un árbol sin raíces.",
      "Quien quiere cosechar arroz debe agacharse en el campo.",
      "La sabiduría es como el fuego: se toma de otros.",
      "El niño es el arco, la madre es la cuerda.",
      "La lluvia no cae sobre un solo tejado.",
      "Un pájaro no canta porque tenga una respuesta, canta porque tiene una canción.",
      "Mares tranquilos no hacen marineros expertos.",
      "La prisa no trae bendición.",
      "No importa cuán alta sea la montaña, no puede bloquear el sol.",
      "Poco a poco, el pájaro construye su nido.",
      "Si quieres ir rápido, ve solo; si quieres ir lejos, ve acompañado.",
      "La rana no bebe el estanque donde vive.",
      "Un sabio se adapta a las circunstancias como el agua al recipiente.",
      "Quien persevera conquista.",
      "Quien perdona pone fin a la pelea.",
      "Cuando las raíces son profundas, no hay razón para temer al viento.",
      "Mejor encender una vela que maldecir la oscuridad.",
      "Una sonrisa es la distancia más corta entre dos corazones."
    ]
  },
  fr: {
    title: "Biscuit de Fortune",
    subtitle: "",
    clickInstruction: "Cliquez sur le biscuit de fortune pour révéler votre message",
    tryAnother: "Essayer une autre fortune",
    todayMessage: "Votre message d'aujourd'hui est :",
    fortuneLabel: "運命",
    ancientWisdom: "古からの智慧",
    footer: "par Thaís Brandaoり",
    languages: {
      en: "English",
      pt: "Português",
      es: "Español",
      fr: "Français",
      it: "Italiano"
    },
    share: {
      title: "Partagez votre fortune",
      whatsapp: "Partager sur WhatsApp",
      instagram: "Partager sur Instagram",
      twitter: "Partager sur Twitter",
      facebook: "Partager sur Facebook",
      copy: "Copier le message",
      copied: "Copié !",
      copyFailed: "Échec de la copie - essayez de copier manuellement",
      copyManual: "Veuillez copier manuellement :"
    },
    fortunes: [
      "Le voyage de mille lieues commence par un seul pas.",
      "Les fleurs de cerisier brillent le plus juste avant de tomber.",
      "Dans le calme, le cœur trouve sa vraie direction.",
      "Le bambou qui plie est plus fort que le chêne qui résiste.",
      "Les accomplissements d'aujourd'hui étaient les impossibilités d'hier.",
      "Une personne sage apprend des erreurs des autres.",
      "Le thé n'est jamais aussi bon que la première gorgée, ni aussi mauvais que la dernière.",
      "Quand la fleur s'épanouit, les abeilles viennent sans invitation.",
      "Le meilleur moment pour planter un arbre était il y a 20 ans. Le deuxième meilleur moment est maintenant.",
      "Votre avenir est créé par ce que vous faites aujourd'hui, pas demain.",
      "Comme l'eau, contournez les obstacles plutôt que de les traverser.",
      "La lune ne combat pas les ténèbres, elle brille simplement.",
      "Même l'hiver le plus long cède finalement place au printemps.",
      "Une montagne est faite de grains de terre, un océan de gouttes d'eau.",
      "La patience est la clé qui ouvre de nombreuses portes.",
      "La persévérance dépasse le talent quand le talent n'insiste pas.",
      "Celui qui sème la vertu récolte le bonheur.",
      "La patience est amère, mais ses fruits sont doux.",
      "Pierre qui roule n'amasse pas mousse.",
      "Même un voyage de mille lieues commence par un seul pas.",
      "Le bambou qui plie est plus fort que le chêne qui résiste.",
      "En regardant la lune, ne vois pas ton ombre.",
      "La chance sourit à ceux qui se préparent.",
      "Les eaux profondes ne font pas de bruit.",
      "Tombe sept fois, relève-toi huit.",
      "Apprendre, c'est découvrir ce que l'on sait déjà.",
      "Le vent ne brise pas les arbres forts, mais aide les souples à grandir.",
      "Un homme sans courage est comme un arbre sans racines.",
      "Qui veut récolter du riz doit se pencher sur le champ.",
      "La sagesse est comme le feu : on la prend chez les autres.",
      "L'enfant est l'arc, la mère est la corde.",
      "La pluie ne tombe pas sur un seul toit.",
      "Un oiseau ne chante pas parce qu'il a une réponse, il chante parce qu'il a une chanson.",
      "Les mers calmes ne font pas de bons marins.",
      "La hâte n'apporte pas de bénédiction.",
      "Peu importe la hauteur de la montagne, elle ne peut cacher le soleil.",
      "Petit à petit, l'oiseau fait son nid.",
      "Si tu veux aller vite, va seul ; si tu veux aller loin, va ensemble.",
      "La grenouille ne boit pas toute l'eau de l'étang où elle vit.",
      "Un sage s'adapte aux circonstances comme l'eau prend la forme du vase.",
      "Celui qui persévère conquiert.",
      "Celui qui pardonne met fin à la querelle.",
      "Quand les racines sont profondes, le vent n'est pas à craindre.",
      "Mieux vaut allumer une bougie que maudire l'obscurité.",
      "Un sourire est la plus courte distance entre deux cœurs."
    ]
  },
  it: {
    title: "Biscotto della Fortuna",
    subtitle: "",
    clickInstruction: "Clicca sul biscotto della fortuna per rivelare il tuo messaggio",
    tryAnother: "Prova un'altra fortuna",
    todayMessage: "Il tuo messaggio di oggi è:",
    fortuneLabel: "運命",
    ancientWisdom: "古からの智慧",
    footer: "di Thaís Brandaoり",
    languages: {
      en: "English",
      pt: "Português",
      es: "Español",
      fr: "Français",
      it: "Italiano"
    },
    share: {
      title: "Condividi la tua fortuna",
      whatsapp: "Condividi su WhatsApp",
      instagram: "Condividi su Instagram",
      twitter: "Condividi su Twitter",
      facebook: "Condividi su Facebook",
      copy: "Copia messaggio",
      copied: "Copiato!",
      copyFailed: "Copia fallita - prova a copiare manualmente",
      copyManual: "Per favore, copia manualmente:"
    },
    fortunes: [
      "Il viaggio di mille miglia inizia con un singolo passo.",
      "I fiori di ciliegio brillano più intensamente prima di cadere.",
      "Nel silenzio, il cuore trova la sua vera direzione.",
      "Il bambù che si piega è più forte della quercia che resiste.",
      "I successi di oggi erano le impossibilità di ieri.",
      "Una persona saggia impara dagli errori degli altri.",
      "Il tè non è mai buono come il primo sorso, né cattivo come l'ultimo.",
      "Quando il fiore sboccia, le api arrivano senza invito.",
      "Il momento migliore per piantare un albero era 20 anni fa. Il secondo momento migliore è ora.",
      "Il tuo futuro è creato da quello che fai oggi, non domani.",
      "Come l'acqua, fluisci intorno agli ostacoli piuttosto che attraversarli.",
      "La luna non combatte l'oscurità, semplicemente splende.",
      "Anche l'inverno più lungo alla fine lascia spazio alla primavera.",
      "Una montagna è fatta di granelli di terra, un oceano di gocce d'acqua.",
      "La pazienza è la chiave che apre molte porte.",
      "La perseveranza supera il talento quando il talento non persiste.",
      "Chi semina virtù raccoglie felicità.",
      "La pazienza è amara, ma i suoi frutti sono dolci.",
      "Pietra che rotola non fa muschio.",
      "Anche un viaggio di mille miglia inizia con un singolo passo.",
      "Il bambù che si piega è più forte della quercia che resiste.",
      "Guardando la luna, non vedere la tua ombra.",
      "La fortuna favorisce coloro che si preparano.",
      "Le acque profonde non fanno rumore.",
      "Cadi sette volte, alzati otto.",
      "Imparare è scoprire quello che già sai.",
      "Il vento non spezza gli alberi forti, ma aiuta i flessibili a crescere.",
      "Un uomo senza coraggio è come un albero senza radici.",
      "Chi vuole raccogliere riso deve chinarsi sul campo.",
      "La saggezza è come il fuoco: la gente la prende dagli altri.",
      "Il bambino è l'arco, la madre è la corda.",
      "La pioggia non cade su un solo tetto.",
      "Un uccello non canta perché ha una risposta, canta perché ha una canzone.",
      "Mari calmi non fanno marinai esperti.",
      "La fretta non porta benedizione.",
      "Non importa quanto alta sia la montagna, non può bloccare il sole.",
      "Poco a poco, l'uccello costruisce il suo nido.",
      "Se vuoi andare veloce, vai da solo; se vuoi andare lontano, vai insieme.",
      "La rana non beve tutto lo stagno in cui vive.",
      "Un saggio si adatta alle circostanze come l'acqua alla forma del recipiente.",
      "Chi persevera conquista.",
      "Chi perdona pone fine alla lite.",
      "Quando le radici sono profonde, non c'è ragione di temere il vento.",
      "Meglio accendere una candela che maledire l'oscurità.",
      "Un sorriso è la distanza più breve tra due cuori."
    ]
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Helper function to get initial language
const getInitialLanguage = (): Language => {
  // Try to get language from localStorage first
  if (typeof window !== 'undefined') {
    // Check URL parameters first (for shared links)
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang');
    if (urlLang && ['en', 'pt', 'es', 'fr', 'it'].includes(urlLang)) {
      return urlLang as Language;
    }

    // Then check localStorage
    const saved = localStorage.getItem('fortune-cookie-language');
    if (saved && ['en', 'pt', 'es', 'fr', 'it'].includes(saved)) {
      return saved as Language;
    }

    // Fallback to browser language detection
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('pt')) return 'pt';
    if (browserLang.startsWith('es')) return 'es';
    if (browserLang.startsWith('fr')) return 'fr';
    if (browserLang.startsWith('it')) return 'it';
  }
  
  return 'en'; // Default fallback
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en'); // Start with safe default
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Initialize language after component mounts to avoid hydration issues
    const initialLang = getInitialLanguage();
    setLanguageState(initialLang);
    setIsInitialized(true);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    // Save to localStorage for persistence
    if (typeof window !== 'undefined') {
      localStorage.setItem('fortune-cookie-language', lang);
    }
  };

  const value = {
    language,
    setLanguage,
    t: translations[language]
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}