interface HeaderProps {
  onOpenInfo?: () => void;
}

export default function Header({ onOpenInfo }: HeaderProps) {
  return (
    <header
      id="privacy-header"
      className="sticky top-0 z-30 w-full bg-white border-b border-neutral-100/80 px-4 py-3 flex items-center justify-between"
    >
      {/* Spacer for symmetry */}
      <div className="w-8" />

      {/* Logo */}
      <div className="flex items-baseline select-none">
        <span className="font-extrabold text-[22px] tracking-tight text-neutral-900 font-sans">
          Privacy
        </span>
        <span className="w-2 h-2 rounded-full bg-[#ff5436] inline-block ml-0.5" />
      </div>

      {/* Info Icon button */}
      <button
        id="info-modal-btn"
        type="button"
        onClick={onOpenInfo}
        aria-label="Informações da conta"
        className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-800 hover:bg-neutral-100 transition-colors active:scale-95"
      >
        <div className="w-5 h-5 rounded-full border-[1.75px] border-neutral-800 flex items-center justify-center font-bold text-[11px] leading-none pt-0.5">
          i
        </div>
      </button>
    </header>
  );
}
