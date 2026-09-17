import { useState } from 'react';
import { ProfileData } from '../types';

interface ProfileHeaderProps {
  profile: ProfileData;
}

export default function ProfileHeader({ profile }: ProfileHeaderProps) {
  const [isBioExpanded, setIsBioExpanded] = useState(false);
  const [activeBannerIndex, setActiveBannerIndex] = useState(0);
  const [lightboxUrl, setLightboxUrl] = useState<string | null>(null);

  const hasMultipleBanners = profile.bannerUrls.length > 1;

  const handleBannerClick = () => {
    if (hasMultipleBanners) {
      setActiveBannerIndex((prev) => (prev + 1) % profile.bannerUrls.length);
    } else {
      setLightboxUrl(profile.bannerUrls[0]);
    }
  };

  return (
    <div id="profile-header" className="w-full bg-white pb-3">
      {/* Cover Banner */}
      <div
        id="profile-banner-container"
        className="relative w-full aspect-[16/9] bg-neutral-200 overflow-hidden select-none cursor-pointer group"
        onClick={handleBannerClick}
        title={hasMultipleBanners ? 'Clique para alternar fotos de capa' : 'Clique para ver em tela cheia'}
      >
        <img
          id="profile-banner-image"
          src={profile.bannerUrls[activeBannerIndex]}
          alt="Capa do perfil"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transition-all duration-300 group-hover:scale-[1.02]"
        />

        {/* Story pill indicators at top */}
        {hasMultipleBanners && (
          <div className="absolute top-2.5 left-0 right-0 px-4 flex items-center justify-center gap-1.5 z-10">
            {profile.bannerUrls.map((_, idx) => (
              <div
                key={idx}
                className={`h-1 flex-1 max-w-[80px] rounded-full transition-all duration-200 ${
                  idx === activeBannerIndex ? 'bg-white shadow-xs' : 'bg-white/40'
                }`}
              />
            ))}
          </div>
        )}

        {/* Subtle gradient overlay at bottom for smooth blending */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/10 pointer-events-none" />
      </div>

      {/* Avatar and Bio Section */}
      <div className="px-4">
        {/* Overlapping Avatar */}
        <div className="relative -mt-12 mb-3 inline-block">
          <button
            type="button"
            onClick={() => setLightboxUrl(profile.avatarUrl)}
            className="relative w-22 h-22 sm:w-24 sm:h-24 rounded-full border-4 border-white shadow-md bg-neutral-100 overflow-hidden cursor-pointer hover:opacity-95 transition-opacity block focus:outline-hidden group"
            title="Clique para ver foto de perfil"
          >
            <img
              id="profile-avatar-image"
              src={profile.avatarUrl}
              alt={profile.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            />
          </button>

          {/* Green Online Status Indicator */}
          {profile.isOnline && (
            <span
              id="online-status-indicator"
              className="absolute bottom-1 right-1 w-4.5 h-4.5 bg-[#00c853] rounded-full border-2 border-white shadow-xs pointer-events-none"
              title="Online agora"
            />
          )}
        </div>

        {/* Name and Verified Badge */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <h1
            id="profile-display-name"
            className="text-[22px] font-bold text-neutral-900 tracking-tight leading-tight"
          >
            {profile.name}
          </h1>

          {/* Blue Verified Badge */}
          {profile.verified && (
            <svg
              id="verified-badge-icon"
              className="w-5 h-5 text-[#1877f2] shrink-0"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.2 14.6l-3.9-3.9 1.41-1.41 2.49 2.49 6.29-6.29 1.41 1.41-7.7 7.7z" />
            </svg>
          )}
        </div>

        {/* Username Handle */}
        <p
          id="profile-username-handle"
          className="text-neutral-500 text-sm font-normal mt-0.5"
        >
          @{profile.username}
        </p>

        {/* Bio Text with "Ler mais" */}
        <div className="mt-3 text-[14.5px] leading-relaxed text-neutral-800">
          <p id="profile-bio-text" className="inline">
            {isBioExpanded ? profile.bioFull : profile.bioShort}{' '}
          </p>
          <button
            id="toggle-bio-button"
            type="button"
            onClick={() => setIsBioExpanded(!isBioExpanded)}
            className="text-[#f05a28] font-semibold hover:underline inline cursor-pointer text-[14.5px]"
          >
            {isBioExpanded ? 'Ler menos' : 'Ler mais'}
          </button>
        </div>
      </div>

      {/* Lightbox / Overlay para visualização das imagens em tela cheia */}
      {lightboxUrl && (
        <div
          id="image-lightbox-overlay"
          className="fixed inset-0 bg-black/90 z-[9999] flex items-center justify-center p-4 backdrop-blur-xs select-none"
          onClick={() => setLightboxUrl(null)}
        >
          {/* Botão Fechar no topo direito */}
          <button
            type="button"
            className="absolute top-4 right-4 bg-black/50 hover:bg-black/80 text-white rounded-full p-2.5 transition-colors focus:outline-hidden cursor-pointer"
            onClick={() => setLightboxUrl(null)}
            title="Fechar"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Imagem em destaque */}
          <img
            id="lightbox-main-image"
            src={lightboxUrl}
            alt="Imagem ampliada"
            referrerPolicy="no-referrer"
            className="max-w-full max-h-[90vh] object-contain rounded-md shadow-2xl animate-fade-in-up"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
