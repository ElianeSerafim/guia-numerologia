import React, { useState } from 'react';
import { Share2, Copy, Check } from 'lucide-react';

interface ShareButtonsProps {
  title?: string;
  description?: string;
  url?: string;
  showLabel?: boolean;
  variant?: 'horizontal' | 'vertical';
}

export const ShareButtons: React.FC<ShareButtonsProps> = ({
  title = 'Portal Numerologia 2026',
  description = 'Descubra os mistérios do seu destino com a numerologia pitagórica. Cálculos precisos e interpretações detalhadas.',
  url = typeof window !== 'undefined' ? window.location.href : '',
  showLabel = true,
  variant = 'horizontal',
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareLinks = {
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${title}\n\n${description}\n\n${url}`)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(title)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  };

  const containerClass = variant === 'horizontal' 
    ? 'flex gap-3 items-center' 
    : 'flex flex-col gap-2';

  const buttonBaseClass = 'p-2 rounded-lg transition-all duration-200 hover:scale-110 flex items-center justify-center gap-2';

  return (
    <div className={containerClass}>
      {showLabel && (
        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
          <Share2 className="inline mr-2" size={16} />
          Compartilhar:
        </span>
      )}

      {/* WhatsApp */}
      <a
        href={shareLinks.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className={`${buttonBaseClass} bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900 dark:text-green-200`}
        title="Compartilhar no WhatsApp"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.255.949c-1.238.503-2.39 1.242-3.286 2.128-1.797 1.797-2.745 4.236-2.745 6.772 0 1.563.29 3.07.845 4.51L1.07 23.5l4.773-1.572c1.447.860 3.083 1.32 4.897 1.32h.005c5.687 0 10.308-4.622 10.308-10.308 0-2.75-1.193-5.336-3.355-7.293-2.162-1.957-5.025-3.168-8.063-3.168z"/>
        </svg>
        {showLabel && <span className="text-xs font-medium">WhatsApp</span>}
      </a>

      {/* Facebook */}
      <a
        href={shareLinks.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className={`${buttonBaseClass} bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-200`}
        title="Compartilhar no Facebook"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
        {showLabel && <span className="text-xs font-medium">Facebook</span>}
      </a>

      {/* Twitter/X */}
      <a
        href={shareLinks.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className={`${buttonBaseClass} bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200`}
        title="Compartilhar no Twitter"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 002.856-3.915 10.013 10.013 0 01-2.8.856 4.958 4.958 0 002.165-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
        {showLabel && <span className="text-xs font-medium">Twitter</span>}
      </a>

      {/* LinkedIn */}
      <a
        href={shareLinks.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className={`${buttonBaseClass} bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800`}
        title="Compartilhar no LinkedIn"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
        </svg>
        {showLabel && <span className="text-xs font-medium">LinkedIn</span>}
      </a>

      {/* Copy Link */}
      <button
        onClick={handleCopyLink}
        className={`${buttonBaseClass} bg-purple-100 text-cyan-500 hover:bg-purple-200 dark:bg-blue-900 dark:text-purple-200`}
        title="Copiar link"
      >
        {copied ? (
          <>
            <Check className="w-5 h-5" />
            {showLabel && <span className="text-xs font-medium">Copiado!</span>}
          </>
        ) : (
          <>
            <Copy className="w-5 h-5" />
            {showLabel && <span className="text-xs font-medium">Copiar</span>}
          </>
        )}
      </button>
    </div>
  );
};
