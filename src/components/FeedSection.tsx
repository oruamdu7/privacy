import { useState } from 'react';
import { Lock, Heart, MessageCircle, Bookmark, Share2, Image, Video } from 'lucide-react';
import { LockedPost, ProfileData, SubscriptionPlan } from '../types';

interface FeedSectionProps {
  profile: ProfileData;
  posts: LockedPost[];
  onUnlockPost: (plan?: SubscriptionPlan) => void;
}

export default function FeedSection({ profile, posts, onUnlockPost }: FeedSectionProps) {
  const [activeTab, setActiveTab] = useState<'posts' | 'media' | 'likes'>('posts');
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});

  const toggleLike = (postId: string) => {
    setLikedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  return (
    <div id="profile-feed-section" className="w-full bg-white mt-4 border-t border-neutral-100">
      {/* Feed Tabs */}
      <div className="flex items-center justify-around border-b border-neutral-100 px-2 select-none">
        <button
          id="tab-posts"
          type="button"
          onClick={() => setActiveTab('posts')}
          className={`py-3 px-3 text-sm font-semibold transition-all relative ${
            activeTab === 'posts'
              ? 'text-[#ff5436]'
              : 'text-neutral-500 hover:text-neutral-800'
          }`}
        >
          <span>Posts ({profile.postsCount})</span>
          {activeTab === 'posts' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ff5436] rounded-full" />
          )}
        </button>

        <button
          id="tab-media"
          type="button"
          onClick={() => setActiveTab('media')}
          className={`py-3 px-3 text-sm font-semibold transition-all relative ${
            activeTab === 'media'
              ? 'text-[#ff5436]'
              : 'text-neutral-500 hover:text-neutral-800'
          }`}
        >
          <span>Mídias ({profile.mediaCount})</span>
          {activeTab === 'media' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ff5436] rounded-full" />
          )}
        </button>

        <button
          id="tab-likes"
          type="button"
          onClick={() => setActiveTab('likes')}
          className={`py-3 px-3 text-sm font-semibold transition-all relative ${
            activeTab === 'likes'
              ? 'text-[#ff5436]'
              : 'text-neutral-500 hover:text-neutral-800'
          }`}
        >
          <span>Curtidas ({profile.likesCount})</span>
          {activeTab === 'likes' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ff5436] rounded-full" />
          )}
        </button>
      </div>

      {/* Posts List */}
      <div className="divide-y divide-neutral-100">
        {posts.map((post) => {
          const isLiked = likedPosts[post.id];
          const displayLikes = isLiked ? post.likes + 1 : post.likes;

          return (
            <article
              key={post.id}
              id={`feed-post-${post.id}`}
              className="p-4 flex flex-col gap-3"
            >
              {/* Post Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-neutral-100 shrink-0">
                    <img
                      src={profile.avatarUrl}
                      alt={profile.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-sm text-neutral-900 leading-none">
                        {profile.name}
                      </span>
                      <svg className="w-4 h-4 text-[#1877f2]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.2 14.6l-3.9-3.9 1.41-1.41 2.49 2.49 6.29-6.29 1.41 1.41-7.7 7.7z" />
                      </svg>
                    </div>
                    <span className="text-xs text-neutral-400 font-medium">
                      {post.date}
                    </span>
                  </div>
                </div>
              </div>

              {/* Caption */}
              <p className="text-[14.5px] text-neutral-800 leading-relaxed">
                {post.caption}
              </p>

              {/* Locked Media Card */}
              <div
                onClick={() => onUnlockPost()}
                className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-900 group cursor-pointer shadow-xs border border-neutral-200/80"
              >
                {/* Heavily blurred background preview */}
                <img
                  src={post.blurredImage}
                  alt="Mídia bloqueada"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover filter blur-xl scale-110 opacity-40 brightness-75 group-hover:scale-115 transition-transform duration-500"
                />

                {/* Dark lock overlay */}
                <div className="absolute inset-0 bg-black/40 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center text-white">
                  <div className="w-13 h-13 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-3 shadow-md border border-white/30 group-hover:scale-105 transition-transform">
                    <Lock className="w-6 h-6 text-white" />
                  </div>

                  <h3 className="font-bold text-base mb-1 tracking-tight text-white drop-shadow-sm">
                    Conteúdo Exclusivo
                  </h3>

                  <p className="text-xs text-white/80 max-w-xs mb-3">
                    Assine para ter acesso a este e todos os outros posts desbloqueados.
                  </p>

                  <div className="flex items-center gap-3 text-xs text-white/90 bg-black/30 px-3 py-1 rounded-full border border-white/20 mb-4">
                    <span className="flex items-center gap-1">
                      <Image className="w-3.5 h-3.5" /> {post.mediaCount.photos} fotos
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Video className="w-3.5 h-3.5" /> {post.mediaCount.videos} vídeo
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onUnlockPost();
                    }}
                    className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#ff5436] to-[#ff7e36] text-white text-xs font-bold shadow-md hover:brightness-110 active:scale-95 transition-all"
                  >
                    Desbloquear por R$ 14,98
                  </button>
                </div>
              </div>

              {/* Engagement Action Bar */}
              <div className="flex items-center justify-between pt-1 text-neutral-600">
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => toggleLike(post.id)}
                    className="flex items-center gap-1.5 text-xs font-semibold hover:text-neutral-900 transition-colors cursor-pointer"
                  >
                    <Heart
                      className={`w-5 h-5 transition-colors ${
                        isLiked ? 'text-[#ff4b4b] fill-[#ff4b4b]' : 'text-neutral-600'
                      }`}
                    />
                    <span>{displayLikes}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onUnlockPost()}
                    className="flex items-center gap-1.5 text-xs font-semibold hover:text-neutral-900 transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-5 h-5 text-neutral-600" />
                    <span>{post.comments}</span>
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => onUnlockPost()}
                    className="text-neutral-600 hover:text-neutral-900 transition-colors p-1"
                  >
                    <Bookmark className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: 'marcele_paiva no Privacy',
                          url: window.location.href,
                        }).catch(() => {});
                      }
                    }}
                    className="text-neutral-600 hover:text-neutral-900 transition-colors p-1"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
