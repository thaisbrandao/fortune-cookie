import { useState } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';
import { ShareImageGenerator } from './ShareImageGenerator';
import { Share2, MessageCircle, Instagram, Twitter, Facebook, Copy, Check, ExternalLink } from 'lucide-react';

interface ShareButtonsProps {
  fortune: string;
  isVisible: boolean;
}

export function ShareButtons({ fortune, isVisible }: ShareButtonsProps) {
  const { t, language } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [notification, setNotification] = useState('');
  const [shareImageUrl, setShareImageUrl] = useState<string>('');

  if (!isVisible || !fortune) return null;

  const shareText = `"${fortune}" - ${t.title}`;
  // Include language parameter in URL for proper language persistence
  const baseUrl = window.location.origin + window.location.pathname;
  const websiteUrl = `${baseUrl}?lang=${language}`;
  const fullShareText = `${shareText}\n\n${websiteUrl}`;
  
  // Special WhatsApp message with language-specific discovery text
  const whatsappDiscoverMessage = language === 'en' ? 'Discover your message today' :
    language === 'pt' ? 'Descubra sua mensagem hoje' :
    language === 'es' ? 'Descubre tu mensaje hoy' :
    language === 'fr' ? 'Découvrez votre message aujourd\'hui' :
    'Scopri il tuo messaggio oggi';

  const whatsappShareText = `${whatsappDiscoverMessage} 🥠\n\n${websiteUrl}`;

  const handleWhatsAppShare = () => {
    try {
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
      
      let url;
      if (isMobile) {
        // Try app first
        url = `whatsapp://send?text=${encodeURIComponent(whatsappShareText)}`;
        window.location.href = url;
        
        // Fallback to API version
        setTimeout(() => {
          window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(whatsappShareText)}`, '_blank');
        }, 1000);
      } else {
        // Use web WhatsApp for desktop
        url = `https://web.whatsapp.com/send?text=${encodeURIComponent(whatsappShareText)}`;
        window.open(url, '_blank');
      }
    } catch (err) {
      console.error('WhatsApp share failed:', err);
      // Fallback to copy text
      handleCopyText();
    }
  };

  const handleTwitterShare = () => {
    try {
      // Twitter/X has a 280 character limit, account for URL length (~23 chars) 
      const maxLength = 250;
      const twitterText = shareText.length > maxLength ? shareText.substring(0, maxLength - 3) + '...' : shareText;
      const url = `https://x.com/intent/tweet?text=${encodeURIComponent(twitterText)}&url=${encodeURIComponent(websiteUrl)}`;
      window.open(url, '_blank');
    } catch (err) {
      console.error('Twitter share failed:', err);
      handleCopyText();
    }
  };

  const handleFacebookShare = () => {
    try {
      const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(websiteUrl)}&quote=${encodeURIComponent(shareText)}`;
      window.open(url, '_blank');
    } catch (err) {
      console.error('Facebook share failed:', err);
      handleCopyText();
    }
  };

  const handleInstagramShare = async () => {
    try {
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
      
      const instagramText = `${shareText}\n\n🔗 ${websiteUrl}`;
      
      // Copy text to clipboard first
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(instagramText);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      } else {
        fallbackCopyText(instagramText);
      }

      // Show language-specific instructions
      const instructions = language === 'en' ? 
        `✅ Text copied!\n\n📱 Opening Instagram...\n\n💡 Pro tip: You can also download the generated image for your story!` :
        language === 'pt' ? 
        `✅ Texto copiado!\n\n📱 Abrindo Instagram...\n\n💡 Dica: Você também pode baixar a imagem gerada para seu story!` :
        language === 'es' ? 
        `✅ ¡Texto copiado!\n\n📱 Abriendo Instagram...\n\n💡 Consejo: ¡También puedes descargar la imagen generada para tu historia!` :
        language === 'fr' ? 
        `✅ Texte copié!\n\n📱 Ouverture d'Instagram...\n\n💡 Astuce: Vous pouvez aussi télécharger l'image générée pour votre story!` :
        `✅ Testo copiato!\n\n📱 Aprendo Instagram...\n\n💡 Suggerimento: Puoi anche scaricare l'immagine generata per la tua storia!`;

      alert(instructions);
      
      // Open Instagram with better approach
      setTimeout(() => {
        if (isMobile) {
          try {
            // Try Instagram app first
            window.location.href = 'instagram://camera';
          } catch {
            // Fallback to web Instagram
            window.open('https://www.instagram.com/', '_blank');
          }
        } else {
          window.open('https://www.instagram.com/', '_blank');
        }
      }, 1000);
      
    } catch (err) {
      console.error('Instagram share failed:', err);
      fallbackCopyText(`${shareText}\n\n🔗 ${websiteUrl}`);
    }
  };

  // Handle image download for sharing
  const handleDownloadImage = () => {
    if (shareImageUrl) {
      const link = document.createElement('a');
      link.download = `fortune-cookie-${Date.now()}.png`;
      link.href = shareImageUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleImageGenerated = (imageUrl: string) => {
    setShareImageUrl(imageUrl);
  };

  const handleCopyText = async () => {
    try {
      // Try modern clipboard API first
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(fullShareText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } else {
        // Fallback method for older browsers or when clipboard API is blocked
        fallbackCopyText(fullShareText);
      }
    } catch (err) {
      console.error('Failed to copy text with clipboard API: ', err);
      // Use fallback method
      fallbackCopyText(fullShareText);
    }
  };

  const fallbackCopyText = (text: string) => {
    try {
      // Create a temporary textarea element
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      // Use execCommand as fallback
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      
      if (successful) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } else {
        // If all methods fail, show the text for manual copying
        showTextForManualCopy(text);
      }
    } catch (err) {
      console.error('Fallback copy method failed: ', err);
      showTextForManualCopy(text);
    }
  };

  const showTextForManualCopy = (text: string) => {
    // Create a simple prompt for manual copying as a fallback
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
    
    if (isMobile) {
      // On mobile, show an alert with the text to copy
      alert(`${t.share.copyManual}\n\n${text}`);
    } else {
      // On desktop, use a prompt that allows text selection
      window.prompt(t.share.copyManual, text);
    }
    
    // Show copied feedback anyway since user might have manually copied
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.5, duration: 0.8 }}
      className="mt-8 text-center"
    >
      {/* Hidden image generator */}
      <ShareImageGenerator 
        fortune={fortune} 
        onImageGenerated={handleImageGenerated}
      />
      
      <p 
        className="text-amber-700/70 text-sm mb-4 tracking-wide"
        style={{ fontFamily: 'var(--font-japanese)' }}
      >
        {t.share.title}
      </p>
      
      <div className="flex justify-center items-center space-x-3 flex-wrap gap-2">
        {/* WhatsApp */}
        <motion.button
          onClick={handleWhatsAppShare}
          className="flex items-center space-x-2 px-4 py-2 bg-green-50/80 hover:bg-green-100/80 border border-green-200/30 rounded-full text-green-700 text-sm transition-all duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title={t.share.whatsapp}
        >
          <MessageCircle size={16} />
          <span className="hidden sm:inline">WhatsApp</span>
        </motion.button>

        {/* Instagram */}
        <motion.button
          onClick={handleInstagramShare}
          className="flex items-center space-x-2 px-4 py-2 bg-pink-50/80 hover:bg-pink-100/80 border border-pink-200/30 rounded-full text-pink-700 text-sm transition-all duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title={t.share.instagram}
        >
          <Instagram size={16} />
          <span className="hidden sm:inline">Instagram</span>
        </motion.button>

        {/* Twitter */}
        <motion.button
          onClick={handleTwitterShare}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-50/80 hover:bg-blue-100/80 border border-blue-200/30 rounded-full text-blue-700 text-sm transition-all duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title={t.share.twitter}
        >
          <Twitter size={16} />
          <span className="hidden sm:inline">Twitter</span>
        </motion.button>

        {/* Facebook */}
        <motion.button
          onClick={handleFacebookShare}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-50/80 hover:bg-blue-100/80 border border-blue-200/30 rounded-full text-blue-800 text-sm transition-all duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title={t.share.facebook}
        >
          <Facebook size={16} />
          <span className="hidden sm:inline">Facebook</span>
        </motion.button>

        {/* Copy to Clipboard */}
        <motion.button
          onClick={handleCopyText}
          className="flex items-center space-x-2 px-4 py-2 bg-amber-50/80 hover:bg-amber-100/80 border border-amber-200/30 rounded-full text-amber-700 text-sm transition-all duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title={t.share.copy}
        >
          {copied ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
          <span className="hidden sm:inline">{copied ? t.share.copied : t.share.copy}</span>
        </motion.button>
      </div>

      {/* Download Image Button */}
      {shareImageUrl && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3, duration: 0.5 }}
          className="mt-4"
        >
          <motion.button
            onClick={handleDownloadImage}
            className="flex items-center space-x-2 px-4 py-2 bg-purple-50/80 hover:bg-purple-100/80 border border-purple-200/30 rounded-full text-purple-700 text-sm transition-all duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title={language === 'en' ? 'Download image for sharing' : 
                   language === 'pt' ? 'Baixar imagem para compartilhar' :
                   language === 'es' ? 'Descargar imagen para compartir' :
                   language === 'fr' ? 'Télécharger l\'image pour partager' :
                   'Scarica immagine per condividere'}
          >
            <Share2 size={16} />
            <span className="text-xs">
              {language === 'en' ? 'Download Image' :
               language === 'pt' ? 'Baixar Imagem' :
               language === 'es' ? 'Descargar Imagen' :
               language === 'fr' ? 'Télécharger Image' :
               'Scarica Immagine'}
            </span>
          </motion.button>
        </motion.div>
      )}

      {/* Notification for Instagram */}
      {notification && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="mt-3 text-xs text-amber-700/80 bg-amber-50/60 px-3 py-2 rounded-lg border border-amber-200/30"
          style={{ fontFamily: 'var(--font-japanese)' }}
        >
          {notification}
        </motion.div>
      )}
    </motion.div>
  );
}