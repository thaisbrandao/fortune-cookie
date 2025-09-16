import { useState } from "react";
import { FortuneCookie } from "./components/FortuneCookie";
import { FortuneDisplay } from "./components/FortuneDisplay";
import { CherryBlossomBackground } from "./components/CherryBlossomBackground";
import { LanguageSelector } from "./components/LanguageSelector";
import { ShareButtons } from "./components/ShareButtons";
import { SocialMetaTags } from "./components/SocialMetaTags";
import {
  LanguageProvider,
  useLanguage,
} from "./contexts/LanguageContext";

function FortuneApp() {
  const { t } = useLanguage();
  const [currentFortune, setCurrentFortune] = useState("");
  const [showFortune, setShowFortune] = useState(false);
  const [shareImageUrl, setShareImageUrl] = useState("");

  const handleFortuneReveal = (fortune: string) => {
    setCurrentFortune(fortune);
    setShowFortune(true);
  };

  const handleImageGenerated = (imageUrl: string) => {
    setShareImageUrl(imageUrl);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Social Media Meta Tags */}
      <SocialMetaTags
        fortune={currentFortune}
        shareImageUrl={shareImageUrl}
      />

      {/* Background with subtle texture */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1658573074835-570832ba7b8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxqYXBhbmVzZSUyMG1pbmltYWxpc3QlMjB0ZXh0dXJlJTIwbmF0dXJhbCUyMHdvb2QlMjBwYXBlcnxlbnwxfHx8fDE3NTc5MjU0MDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.1,
        }}
      />

      {/* Cherry blossom image overlay */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1744662027002-ae4eff16e7ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWxpY2F0ZSUyMGNoZXJyeSUyMGJsb3Nzb20lMjBwZXRhbHMlMjBzb2Z0JTIwbmF0dXJhbCUyMGxpZ2h0aW5nfGVufDF8fHx8MTc1NzkyNTQwNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Animated cherry blossom petals */}
      <CherryBlossomBackground />

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header with Language Selector */}
        <header className="text-center py-16 relative">
          {/* Language Selector */}
          <div className="absolute top-8 right-8">
            <LanguageSelector />
          </div>

          <h1
            className="text-7xl text-amber-900 mb-6 tracking-wide font-bold"
            style={{
              fontFamily: "var(--font-cursive)",
              textShadow:
                "0 4px 8px rgba(139, 69, 19, 0.2), 0 2px 4px rgba(139, 69, 19, 0.1)",
            }}
          >
            {t.title}
          </h1>
          <div className="flex justify-center mb-8">
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-amber-300/60 to-transparent"></div>
          </div>
        </header>

        {/* Fortune Cookie Section */}
        <main className="flex-1 flex flex-col justify-center items-center px-6">
          {!showFortune && (
            <div className="transform transition-all duration-1000">
              <FortuneCookie
                onFortuneReveal={handleFortuneReveal}
              />
            </div>
          )}

          {/* Main Fortune Display as Focal Point */}
          {showFortune && (
            <div className="flex flex-col items-center space-y-8">
              <FortuneDisplay
                fortune={currentFortune}
                isVisible={showFortune}
              />
              <ShareButtons
                fortune={currentFortune}
                isVisible={showFortune}
              />
            </div>
          )}
        </main>

        {/* Minimal Footer */}
        <footer className="text-center py-12">
          <p
            className="text-xs text-amber-600/50 tracking-widest font-light"
            style={{ fontFamily: "var(--font-japanese)" }}
          >
            {t.footer}
          </p>
        </footer>
      </div>

      {/* Subtle golden light overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-yellow-200/20 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <FortuneApp />
    </LanguageProvider>
  );
}