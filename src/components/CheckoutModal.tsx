import React, { useState } from 'react';
import { X, Check, Copy, ShieldCheck, Zap, CreditCard, QrCode } from 'lucide-react';
import { SubscriptionPlan } from '../types';

interface CheckoutModalProps {
  plan: SubscriptionPlan | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CheckoutModal({ plan, isOpen, onClose, onSuccess }: CheckoutModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'card'>('pix');
  const [copied, setCopied] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen || !plan) return null;

  const pixCode = `00020126580014br.gov.bcb.pix0136${Math.random().toString(36).substring(2)}5204000053039865405${plan.priceNumeric.toFixed(2)}5802BR5913PRIVACY PAGAM6009SAO PAULO62070503***6304`;

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onSuccess();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4 animate-fade-in">
      {/* Modal Card */}
      <div
        id="checkout-modal-sheet"
        className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col animate-slide-up"
      >
        {/* Header */}
        <div className="p-4 border-b border-neutral-100 flex items-center justify-between bg-neutral-50">
          <div>
            <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
              Assinatura Segura
            </span>
            <h2 className="text-lg font-bold text-neutral-900 leading-tight">
              Acesso a @marcele_paiva
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="w-8 h-8 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-neutral-500 hover:text-neutral-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Scrollable */}
        <div className="p-4 sm:p-5 overflow-y-auto flex-1 flex flex-col gap-4">
          {/* Plan Summary Card */}
          <div className="bg-gradient-to-r from-[#ff8238]/10 via-[#ff9b58]/10 to-[#ffb87d]/10 border border-[#ff8238]/30 rounded-2xl p-3.5 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-[#f05a28] uppercase">
                {plan.isPromotion ? 'Plano Promocional' : 'Plano Padrão'}
              </span>
              <p className="font-bold text-neutral-900 text-base">
                {plan.label} de acesso completo
              </p>
            </div>
            <div className="text-right">
              <span className="text-lg font-extrabold text-neutral-900">
                {plan.priceFormatted}
              </span>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="grid grid-cols-2 gap-2 bg-neutral-100 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setPaymentMethod('pix')}
              className={`py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                paymentMethod === 'pix'
                  ? 'bg-white text-[#ff5436] shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <QrCode className="w-4 h-4" />
              PIX (Imediato)
            </button>
            <button
              type="button"
              onClick={() => setPaymentMethod('card')}
              className={`py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                paymentMethod === 'card'
                  ? 'bg-white text-[#ff5436] shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <CreditCard className="w-4 h-4" />
              Cartão de Crédito
            </button>
          </div>

          {/* PIX Flow */}
          {paymentMethod === 'pix' ? (
            <div className="flex flex-col items-center text-center gap-3 pt-1">
              <div className="w-44 h-44 bg-white border-2 border-dashed border-neutral-200 rounded-2xl p-3 flex flex-col items-center justify-center shadow-xs">
                {/* Visual QR Code Mock */}
                <div className="w-full h-full bg-neutral-950 p-2 rounded-lg flex items-center justify-center">
                  <div className="w-full h-full bg-white p-2 rounded grid grid-cols-5 gap-1">
                    <div className="bg-black col-span-2 row-span-2 rounded-xs" />
                    <div className="bg-black" />
                    <div className="bg-black col-span-2 row-span-2 rounded-xs" />
                    <div className="bg-black" />
                    <div className="bg-black" />
                    <div className="bg-black" />
                    <div className="bg-black" />
                    <div className="bg-black" />
                    <div className="bg-black col-span-2 row-span-2 rounded-xs" />
                    <div className="bg-black" />
                    <div className="bg-black col-span-2" />
                  </div>
                </div>
              </div>

              <div className="w-full text-left">
                <label className="text-xs font-semibold text-neutral-500 mb-1 block">
                  Código Pix Copia e Cola:
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={pixCode}
                    className="w-full bg-neutral-50 border border-neutral-200 text-xs font-mono p-2 rounded-xl text-neutral-600 truncate"
                  />
                  <button
                    type="button"
                    onClick={handleCopyPix}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1 shrink-0 transition-all ${
                      copied
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[#ff5436] hover:bg-[#f0482b] text-white'
                    }`}
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? 'Copiado!' : 'Copiar'}
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={handlePay}
                disabled={isProcessing}
                className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-sm shadow-md hover:brightness-105 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isProcessing ? (
                  <span className="inline-block animate-spin">⏳</span>
                ) : (
                  <Zap className="w-4 h-4 fill-white" />
                )}
                {isProcessing ? 'Confirmando PIX...' : 'Já fiz o Pix (Liberar Acesso)'}
              </button>
            </div>
          ) : (
            /* Card Flow */
            <form onSubmit={handlePay} className="flex flex-col gap-3 pt-1">
              <div>
                <label className="text-xs font-semibold text-neutral-600 block mb-1">
                  Número do Cartão
                </label>
                <input
                  type="text"
                  placeholder="0000 0000 0000 0000"
                  maxLength={19}
                  required
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full border border-neutral-200 rounded-xl p-2.5 text-sm outline-none focus:border-[#ff5436]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-600 block mb-1">
                  Nome impresso no Cartão
                </label>
                <input
                  type="text"
                  placeholder="NOME COMO ESTÁ NO CARTÃO"
                  required
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  className="w-full border border-neutral-200 rounded-xl p-2.5 text-sm outline-none focus:border-[#ff5436]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-neutral-600 block mb-1">
                    Validade
                  </label>
                  <input
                    type="text"
                    placeholder="MM/AA"
                    maxLength={5}
                    required
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    className="w-full border border-neutral-200 rounded-xl p-2.5 text-sm outline-none focus:border-[#ff5436]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-neutral-600 block mb-1">
                    CVV
                  </label>
                  <input
                    type="password"
                    placeholder="123"
                    maxLength={4}
                    required
                    value={cardCvv}
                    onChange={(e) => setCardCvv(e.target.value)}
                    className="w-full border border-neutral-200 rounded-xl p-2.5 text-sm outline-none focus:border-[#ff5436]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-[#ff5436] to-[#ff7e36] text-white font-bold text-sm shadow-md hover:brightness-105 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isProcessing ? 'Processando transação...' : `Assinar por ${plan.priceFormatted}`}
              </button>
            </form>
          )}

          {/* Security & Discretion Badges */}
          <div className="border-t border-neutral-100 pt-3 flex flex-col gap-1.5 text-xs text-neutral-500">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Cobrança 100% discreta na fatura ("PAG*SERVICOS").</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Liberação imediata no seu dispositivo.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
