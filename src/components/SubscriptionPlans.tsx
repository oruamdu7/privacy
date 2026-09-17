import { SubscriptionPlan } from '../types';

interface SubscriptionPlansProps {
  subscriptionPlans: SubscriptionPlan[];
  promotionPlans: SubscriptionPlan[];
  onSelectPlan: (plan: SubscriptionPlan) => void;
}

export default function SubscriptionPlans({
  subscriptionPlans,
  promotionPlans,
  onSelectPlan,
}: SubscriptionPlansProps) {
  return (
    <div id="subscription-plans-section" className="px-4 py-2 select-none">
      {/* Assinaturas Section */}
      <div className="mb-6">
        <h2
          id="heading-assinaturas"
          className="text-base font-bold text-neutral-900 mb-2.5 tracking-tight"
        >
          Assinaturas
        </h2>

        <div className="flex flex-col gap-2.5">
          {subscriptionPlans.map((plan) => (
            <button
              key={plan.id}
              id={`plan-btn-${plan.id}`}
              type="button"
              onClick={() => onSelectPlan(plan)}
              className="w-full h-14 rounded-2xl bg-gradient-to-r from-[#ff8238] via-[#ff9b58] to-[#ffb87d] p-1.5 flex items-center justify-between shadow-xs hover:shadow-md hover:brightness-105 active:scale-[0.99] transition-all cursor-pointer group"
            >
              {/* Left pill tag */}
              <div className="h-full px-5 rounded-xl bg-[#ff7324]/30 backdrop-blur-xs flex items-center justify-center">
                <span className="font-bold text-neutral-900 text-[15px]">
                  {plan.label}
                </span>
              </div>

              {/* Right price */}
              <div className="pr-4 flex items-center gap-1.5">
                <span className="font-bold text-neutral-900 text-base md:text-[17px] tracking-tight">
                  {plan.priceFormatted}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Promoções Section */}
      <div>
        <h2
          id="heading-promocoes"
          className="text-base font-bold text-neutral-900 mb-2.5 tracking-tight"
        >
          Promoções
        </h2>

        <div className="flex flex-col gap-3">
          {promotionPlans.map((plan) => {
            const isSp = plan.isHighlighted;
            return (
              <button
                key={plan.id}
                id={`plan-btn-${plan.id}`}
                type="button"
                onClick={() => onSelectPlan(plan)}
                className={`relative w-full rounded-2xl p-1.5 flex flex-col justify-between shadow-xs hover:shadow-md hover:brightness-105 active:scale-[0.99] transition-all cursor-pointer group ${
                  isSp 
                    ? 'bg-gradient-to-r from-pink-600 via-rose-500 to-[#ff7324] min-h-[84px] text-white' 
                    : 'bg-gradient-to-r from-[#ff8238] via-[#ff9b58] to-[#ffb87d] h-14 text-neutral-900'
                }`}
              >
                {/* Upper row: Label & Price */}
                <div className="w-full flex items-center justify-between h-full">
                  {/* Left pill / label wrapper */}
                  <div className={`h-11 px-4 rounded-xl flex items-center justify-center ${
                    isSp ? 'bg-white/25 backdrop-blur-xs' : 'bg-[#ff7324]/30 backdrop-blur-xs'
                  }`}>
                    <span className={`font-extrabold text-[15px] ${isSp ? 'text-white' : 'text-neutral-900'}`}>
                      {plan.label}
                    </span>
                  </div>

                  {/* Right Price */}
                  <div className="pr-3 flex flex-col items-end justify-center">
                    <span className={`font-black text-base md:text-[17px] tracking-tight ${isSp ? 'text-white' : 'text-neutral-900'}`}>
                      {plan.priceFormatted}
                    </span>
                    {plan.monthlyEquivalent && (
                      <span className="text-[10px] opacity-80 font-medium">
                        {plan.monthlyEquivalent}
                      </span>
                    )}
                  </div>
                </div>

                {/* Lower row / description if exists */}
                {plan.description && (
                  <div className="w-full px-4 pb-1 text-left mt-1">
                    <p className="text-[11px] font-bold text-pink-100 tracking-wide flex items-center gap-1">
                      <span className="inline-block w-1.5 h-1.5 bg-green-400 rounded-full animate-ping" />
                      {plan.description}
                    </p>
                  </div>
                )}

                {/* Badge Overlay */}
                {plan.badge && (
                  <span className={`absolute -top-2.5 right-3 px-2 py-0.5 rounded-full text-[10px] font-black tracking-wider uppercase shadow-xs ${
                    isSp 
                      ? 'bg-amber-300 text-neutral-900 animate-bounce' 
                      : 'bg-white text-rose-600 border border-rose-200'
                  }`}>
                    {plan.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
