import { X, ShieldCheck, CheckCircle2, UserCheck } from 'lucide-react';
import { ProfileData } from '../types';

interface InfoModalProps {
  profile: ProfileData;
  isOpen: boolean;
  onClose: () => void;
}

export default function InfoModal({ profile, isOpen, onClose }: InfoModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-fade-in">
      <div
        id="info-modal-card"
        className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-xl border border-neutral-100 flex flex-col gap-4 text-neutral-800"
      >
        <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
          <div className="flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-[#ff5436]" />
            <h3 className="font-bold text-base text-neutral-900">Sobre esta conta</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600 hover:text-neutral-900"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-3 bg-neutral-50 p-3 rounded-2xl">
          <img
            src={profile.avatarUrl}
            alt={profile.name}
            referrerPolicy="no-referrer"
            className="w-12 h-12 rounded-full object-cover border border-white shadow-xs"
          />
          <div>
            <div className="flex items-center gap-1">
              <span className="font-bold text-sm text-neutral-900">{profile.name}</span>
              <CheckCircle2 className="w-4 h-4 text-[#1877f2] fill-[#1877f2] text-white" />
            </div>
            <p className="text-xs text-neutral-500">@{profile.username}</p>
            <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              Identidade 100% Verificada
            </span>
          </div>
        </div>

        <div className="space-y-2 text-xs text-neutral-600">
          <div className="flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
            <span>Perfil oficial registrado na plataforma Privacy com documentação validada.</span>
          </div>
          <div className="flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
            <span>Conteúdo protegido por direitos autorais e criptografia de ponta a ponta.</span>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-neutral-900 text-white font-bold text-xs hover:bg-neutral-800 transition-colors"
        >
          Fechar
        </button>
      </div>
    </div>
  );
}
