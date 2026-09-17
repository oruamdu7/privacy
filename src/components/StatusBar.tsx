import { Wifi, MessageSquare } from 'lucide-react';

interface StatusBarProps {
  time?: string;
  batteryPercentage?: number;
}

export default function StatusBar({ time = '19:45', batteryPercentage = 85 }: StatusBarProps) {
  return (
    <div
      id="mobile-status-bar"
      className="w-full bg-black text-white px-4 py-1.5 flex items-center justify-between text-xs select-none font-sans"
    >
      {/* Left side: Time and WhatsApp notification */}
      <div className="flex items-center gap-2">
        <span className="font-semibold tracking-tight text-[13px]">{time}</span>
        <div className="flex items-center opacity-90 text-[11px]">
          <MessageSquare className="w-3.5 h-3.5 fill-white" />
        </div>
      </div>

      {/* Right side: Indicators, Network, Battery */}
      <div className="flex items-center gap-1.5 text-[11px]">
        {/* Do not disturb / silent symbol */}
        <div className="w-3.5 h-3.5 flex items-center justify-center">
          <div className="w-3 h-0.5 bg-white/90 rounded-full" />
        </div>

        {/* Wifi */}
        <Wifi className="w-3.5 h-3.5" />

        {/* Cellular Signal with arrows */}
        <div className="flex items-center gap-0.5">
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3L2 12h3v8h14v-8h3L12 3zm0 3.5L17.5 11H15v7H9v-7H6.5L12 6.5z" opacity="0" />
            <path d="M2 22h4v-4H2v4zm6 0h4v-8H8v8zm6 0h4v-12h-4v12zm6 0h4V2h-4v20z" />
          </svg>
        </div>

        {/* Battery with percentage */}
        <div className="flex items-center bg-white/20 rounded-sm px-1 py-0.2 text-[10px] font-bold">
          <span>{batteryPercentage}</span>
        </div>
      </div>
    </div>
  );
}
