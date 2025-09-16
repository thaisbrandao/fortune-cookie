import { useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface SocialMetaTagsProps {
  fortune?: string;
  shareImageUrl?: string;
}

export function SocialMetaTags({ fortune, shareImageUrl }: SocialMetaTagsProps) {
  const { t } = useLanguage();

  useEffect(() => {
    const updateMetaTags = () => {
      const title = fortune ? `"${fortune}" - ${t.title}` : t.title;
      const description = fortune ? 
        `${t.todayMessage} "${fortune}"` : 
        `${t.clickInstruction} - ${t.title}`;
      const url = window.location.href;
      const image = shareImageUrl || `${window.location.origin}/fortune-cookie-default.jpg`;

      // Update or create meta tags
      const updateOrCreateMeta = (property: string, content: string, isProperty = true) => {
        const selector = isProperty ? `meta[property="${property}"]` : `meta[name="${property}"]`;
        let meta = document.querySelector(selector) as HTMLMetaElement;
        
        if (!meta) {
          meta = document.createElement('meta');
          if (isProperty) {
            meta.setAttribute('property', property);
          } else {
            meta.setAttribute('name', property);
          }
          document.head.appendChild(meta);
        }
        meta.setAttribute('content', content);
      };

      // Update title
      document.title = title;

      // Open Graph tags
      updateOrCreateMeta('og:title', title);
      updateOrCreateMeta('og:description', description);
      updateOrCreateMeta('og:url', url);
      updateOrCreateMeta('og:type', 'website');
      updateOrCreateMeta('og:image', image);
      updateOrCreateMeta('og:image:width', '1200');
      updateOrCreateMeta('og:image:height', '630');
      updateOrCreateMeta('og:site_name', t.title);

      // Twitter Card tags
      updateOrCreateMeta('twitter:card', 'summary_large_image', false);
      updateOrCreateMeta('twitter:title', title, false);
      updateOrCreateMeta('twitter:description', description, false);
      updateOrCreateMeta('twitter:image', image, false);

      // WhatsApp specific (uses Open Graph)
      updateOrCreateMeta('og:locale', t.language === 'pt' ? 'pt_BR' : 
                                    t.language === 'es' ? 'es_ES' :
                                    t.language === 'fr' ? 'fr_FR' :
                                    t.language === 'it' ? 'it_IT' : 'en_US');

      // General meta tags
      updateOrCreateMeta('description', description, false);
      updateOrCreateMeta('author', 'Thaís Brandao', false);
      updateOrCreateMeta('keywords', 'fortune cookie, wisdom, quotes, daily inspiration, fortune, luck', false);
    };

    updateMetaTags();

    // Cleanup function to reset meta tags when component unmounts
    return () => {
      // Reset to default values
      document.title = t.title;
      const defaultDescription = `${t.clickInstruction} - ${t.title}`;
      
      const updateOrCreateMeta = (property: string, content: string, isProperty = true) => {
        const selector = isProperty ? `meta[property="${property}"]` : `meta[name="${property}"]`;
        const meta = document.querySelector(selector) as HTMLMetaElement;
        if (meta) {
          meta.setAttribute('content', content);
        }
      };

      updateOrCreateMeta('og:title', t.title);
      updateOrCreateMeta('og:description', defaultDescription);
      updateOrCreateMeta('twitter:title', t.title, false);
      updateOrCreateMeta('twitter:description', defaultDescription, false);
      updateOrCreateMeta('description', defaultDescription, false);
    };
  }, [fortune, shareImageUrl, t]);

  return null; // This component doesn't render anything
}