import { useState } from 'react';
import Header from './components/Header';
import ProfileHeader from './components/ProfileHeader';
import AudioPlayer from './components/AudioPlayer';
import SubscriptionPlans from './components/SubscriptionPlans';
import FeedSection from './components/FeedSection';
import CheckoutModal from './components/CheckoutModal';
import InfoModal from './components/InfoModal';
import {
  PROFILE_DATA,
  SUBSCRIPTION_PLANS,
  PROMOTION_PLANS,
  LOCKED_POSTS,
} from './data/mockData';
import { SubscriptionPlan } from './types';
import { Smartphone, Monitor, CheckCircle } from 'lucide-react';

export default function App() {
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [hasSubscribed, setHasSubscribed] = useState(false);
  const [viewMode, setViewMode] = useState<'mobile-frame' | 'responsive'>('mobile-frame');

  const handleSelectPlan = (plan: SubscriptionPlan) => {
    if (plan.checkoutUrl) {
      window.open(plan.checkoutUrl, '_blank');
    } else {
      setSelectedPlan(plan);
      setIsCheckoutOpen(true);
    }
  };

  const handleUnlockPost = (plan?: SubscriptionPlan) => {
    const targetPlan = plan || SUBSCRIPTION_PLANS[0];
    if (targetPlan.checkoutUrl) {
      window.open(targetPlan.checkoutUrl, '_blank');
    } else {
      setSelectedPlan(targetPlan);
      setIsCheckoutOpen(true);
    }
  };

  const handleSubscriptionSuccess = () => {
    setIsCheckoutOpen(false);
    setHasSubscribed(true);
    setTimeout(() => {
      // Keep feedback active
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-[#eceef2] text-neutral-900 flex flex-col items-center justify-start sm:py-6">
      {/* Desktop view switcher banner (only visible on large screens) */}
      <div className="hidden sm:flex items-center gap-2 mb-4 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-neutral-200/80 shadow-xs text-xs font-semibold text-neutral-600">
        <span className="text-neutral-400 mr-1">Visualização:</span>
        <button
          type="button"
          onClick={() => setViewMode('mobile-frame')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all cursor-pointer ${
            viewMode === 'mobile-frame'
              ? 'bg-neutral-900 text-white shadow-xs'
              : 'hover:text-neutral-900'
          }`}
        >
          <Smartphone className="w-3.5 h-3.5" />
          Como no Print (Celular)
        </button>
        <button
          type="button"
          onClick={() => setViewMode('responsive')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all cursor-pointer ${
            viewMode === 'responsive'
              ? 'bg-neutral-900 text-white shadow-xs'
              : 'hover:text-neutral-900'
          }`}
        >
          <Monitor className="w-3.5 h-3.5" />
          Largura Fluida
        </button>
      </div>

      {/* Subscription Active Notification Banner */}
      {hasSubscribed && (
        <div className="w-full max-w-md px-4 mb-3 animate-fade-in">
          <div className="bg-emerald-500 text-white p-3 rounded-2xl shadow-md flex items-center gap-3">
            <CheckCircle className="w-5 h-5 shrink-0" />
            <div className="text-xs">
              <span className="font-bold block">Assinatura Ativada com Sucesso!</span>
              <span>Você agora tem acesso ilimitado a todos os posts e vídeos de @luana.paivam.</span>
            </div>
          </div>
        </div>
      )}

      {/* Main Container: Exact mobile frame reproduction */}
      <div
        id="app-main-viewport"
        className={`w-full bg-white transition-all duration-300 relative shadow-2xl ${
          viewMode === 'mobile-frame'
            ? 'max-w-[430px] sm:rounded-[40px] sm:border-[8px] sm:border-neutral-900 overflow-hidden'
            : 'max-w-xl sm:rounded-3xl border border-neutral-200 overflow-hidden'
        }`}
      >
        {/* Privacy Header */}
        <Header onOpenInfo={() => setIsInfoOpen(true)} />

        {/* Profile Details (Cover, Avatar, Name, Handle, Bio) */}
        <ProfileHeader profile={PROFILE_DATA} />

        {/* Audio Player Card */}
        <AudioPlayer
          avatarUrl={PROFILE_DATA.avatarUrl}
          totalDuration={PROFILE_DATA.audioDurationSeconds}
          audioUrl={PROFILE_DATA.audioUrl}
        />

        {/* Subscription & Promotion Plans */}
        <SubscriptionPlans
          subscriptionPlans={SUBSCRIPTION_PLANS}
          promotionPlans={PROMOTION_PLANS}
          onSelectPlan={handleSelectPlan}
        />

        {/* Feed with locked posts and tabs */}
        <FeedSection
          profile={PROFILE_DATA}
          posts={LOCKED_POSTS}
          onUnlockPost={handleUnlockPost}
        />

        {/* Mobile Navigation Home Indicator bar at very bottom (visible like in print) */}
        <div className="w-full py-2 flex items-center justify-center bg-white border-t border-neutral-100">
          <div className="w-32 h-1 bg-neutral-900 rounded-full" />
        </div>
      </div>

      {/* Checkout Modal (PIX / Cartão) */}
      <CheckoutModal
        plan={selectedPlan}
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onSuccess={handleSubscriptionSuccess}
      />

      {/* Info Modal */}
      <InfoModal
        profile={PROFILE_DATA}
        isOpen={isInfoOpen}
        onClose={() => setIsInfoOpen(false)}
      />
    </div>
  );
}
