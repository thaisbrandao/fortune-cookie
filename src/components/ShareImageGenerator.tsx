import { useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface ShareImageGeneratorProps {
  fortune: string;
  onImageGenerated: (imageUrl: string) => void;
}

export function ShareImageGenerator({ fortune, onImageGenerated }: ShareImageGeneratorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    if (!fortune || !canvasRef.current) return;

    const generateImage = async () => {
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext('2d')!;
      
      // Set canvas size for social media (1200x630 is optimal for most platforms)
      canvas.width = 1200;
      canvas.height = 630;

      // Create warm gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#fef3c7'); // Warm amber
      gradient.addColorStop(0.3, '#fde68a'); // Light yellow
      gradient.addColorStop(0.7, '#f59e0b'); // Golden yellow
      gradient.addColorStop(1, '#d97706'); // Deeper amber
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add paper texture overlay
      ctx.fillStyle = 'rgba(139, 69, 19, 0.03)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw elegant decorative border
      ctx.strokeStyle = 'rgba(146, 64, 14, 0.4)';
      ctx.lineWidth = 6;
      ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60);
      
      // Inner border
      ctx.strokeStyle = 'rgba(146, 64, 14, 0.2)';
      ctx.lineWidth = 2;
      ctx.strokeRect(45, 45, canvas.width - 90, canvas.height - 90);

      // Draw decorative corners
      const cornerSize = 40;
      ctx.strokeStyle = 'rgba(146, 64, 14, 0.3)';
      ctx.lineWidth = 3;
      
      // Top-left corner
      ctx.beginPath();
      ctx.moveTo(45, 45 + cornerSize);
      ctx.lineTo(45, 45);
      ctx.lineTo(45 + cornerSize, 45);
      ctx.stroke();
      
      // Top-right corner
      ctx.beginPath();
      ctx.moveTo(canvas.width - 45 - cornerSize, 45);
      ctx.lineTo(canvas.width - 45, 45);
      ctx.lineTo(canvas.width - 45, 45 + cornerSize);
      ctx.stroke();
      
      // Bottom-left corner
      ctx.beginPath();
      ctx.moveTo(45, canvas.height - 45 - cornerSize);
      ctx.lineTo(45, canvas.height - 45);
      ctx.lineTo(45 + cornerSize, canvas.height - 45);
      ctx.stroke();
      
      // Bottom-right corner
      ctx.beginPath();
      ctx.moveTo(canvas.width - 45 - cornerSize, canvas.height - 45);
      ctx.lineTo(canvas.width - 45, canvas.height - 45);
      ctx.lineTo(canvas.width - 45, canvas.height - 45 - cornerSize);
      ctx.stroke();

      // Title at the top with shadow
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.font = 'bold 52px Georgia, serif';
      ctx.textAlign = 'center';
      ctx.fillText(t.title, canvas.width / 2 + 2, 122); // Shadow

      ctx.fillStyle = '#8b4513'; // Rich brown color
      ctx.font = 'bold 50px Georgia, serif';
      ctx.fillText(t.title, canvas.width / 2, 120);

      // Decorative line under title
      const lineWidth = 200;
      const lineX = (canvas.width - lineWidth) / 2;
      ctx.strokeStyle = 'rgba(146, 64, 14, 0.4)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(lineX, 140);
      ctx.lineTo(lineX + lineWidth, 140);
      ctx.stroke();

      // Fortune text in the center with better typography
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.font = '38px "Crimson Text", Georgia, serif';
      ctx.textAlign = 'center';
      
      // Handle text wrapping for long fortunes
      const maxWidth = canvas.width - 160;
      const words = fortune.split(' ');
      const lines: string[] = [];
      let currentLine = '';

      // More sophisticated word wrapping
      for (const word of words) {
        const testLine = currentLine + (currentLine ? ' ' : '') + word;
        const metrics = ctx.measureText(testLine);
        
        if (metrics.width > maxWidth && currentLine) {
          lines.push(currentLine);
          currentLine = word;
        } else {
          currentLine = testLine;
        }
      }
      if (currentLine) lines.push(currentLine);

      // Draw the fortune text lines with shadow effect
      const lineHeight = 55;
      const totalTextHeight = lines.length * lineHeight;
      const startY = (canvas.height - totalTextHeight) / 2 + 80;
      
      // Draw shadow first
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
      lines.forEach((line, index) => {
        ctx.fillText(line, canvas.width / 2 + 2, startY + (index * lineHeight) + 2);
      });
      
      // Draw actual text
      ctx.fillStyle = '#451a03'; // Very dark brown
      lines.forEach((line, index) => {
        ctx.fillText(line, canvas.width / 2, startY + (index * lineHeight));
      });

      // Add quotation marks
      ctx.fillStyle = 'rgba(146, 64, 14, 0.6)';
      ctx.font = 'bold 80px Georgia, serif';
      ctx.fillText('"', canvas.width / 2 - (maxWidth / 2) - 20, startY - 20);
      ctx.fillText('"', canvas.width / 2 + (maxWidth / 2) + 20, startY + totalTextHeight + 20);

      // Add decorative elements at bottom
      ctx.fillStyle = 'rgba(146, 64, 14, 0.5)';
      ctx.font = 'italic 24px Georgia, serif';
      
      const wisdomText = '🥠 ' + t.ancientWisdom + ' 🥠';
      ctx.fillText(wisdomText, canvas.width / 2, canvas.height - 100);

      // Website attribution with elegant styling
      ctx.fillStyle = '#92400e';
      ctx.font = '22px Georgia, serif';
      const urlText = window.location.origin.replace('https://', '').replace('http://', '');
      ctx.fillText(urlText, canvas.width / 2, canvas.height - 60);

      // Convert canvas to blob and create URL
      canvas.toBlob((blob) => {
        if (blob) {
          const imageUrl = URL.createObjectURL(blob);
          onImageGenerated(imageUrl);
        }
      }, 'image/png', 0.95);
    };

    // Add a small delay to ensure fonts are loaded
    setTimeout(generateImage, 100);
  }, [fortune, t]);

  return (
    <canvas 
      ref={canvasRef} 
      style={{ display: 'none' }}
      aria-hidden="true"
    />
  );
}