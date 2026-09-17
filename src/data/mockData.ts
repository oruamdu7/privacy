import avatarImg from '../assets/images/luana_perfil.jpg';
import bannerImg from '../assets/images/luana_capa.jpg';
import { ProfileData, SubscriptionPlan, LockedPost } from '../types';

export const PROFILE_DATA: ProfileData = {
  name: 'Giovana Roccha',
  username: 'giovanaroccha_',
  verified: true,
  age: 20,
  bioShort: 'Tenho 20 aninhos, acabei de entrar na faculdade de Fisioterapia. Aqui você vai ver meus vídeos...',
  bioFull: 'Tenho 20 aninhos, acabei de entrar na faculdade de Fisioterapia. Aqui você vai ver meus vídeos exclusivos, fotos da minha rotina, ensaios sem censura e bastidores que não posto em lugar nenhum! Vem conversar comigo no chat privado 😘',
  avatarUrl: avatarImg,
  bannerUrls: [
    bannerImg,
  ],
  isOnline: true,
  postsCount: 148,
  mediaCount: 92,
  likesCount: '4.9k',
  audioDurationSeconds: 29,
  audioUrl: 'https://files.catbox.moe/p41jny.mp3',
};

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: '1_month',
    durationMonths: 1,
    label: '1 mês',
    priceFormatted: 'R$ 14,98',
    priceNumeric: 14.98,
    isPromotion: false,
    checkoutUrl: 'https://app.syncpayments.com.br/payment-link/a1171cc2-3a34-4ec3-b916-2f919466f1cb',
  },
];

export const PROMOTION_PLANS: SubscriptionPlan[] = [
  {
    id: '3_months',
    durationMonths: 3,
    label: '3 meses',
    priceFormatted: 'R$ 29,97',
    priceNumeric: 29.97,
    isPromotion: true,
    monthlyEquivalent: 'R$ 9,99/mês',
    badge: 'Mais Popular',
    checkoutUrl: 'https://app.syncpayments.com.br/payment-link/a1551a8c-a698-4ddb-b82a-bd8641a76d8c',
  },
  {
    id: '6_months',
    durationMonths: 6,
    label: '6 meses',
    priceFormatted: 'R$ 49,98',
    priceNumeric: 49.98,
    isPromotion: true,
    monthlyEquivalent: 'R$ 8,33/mês',
    badge: 'Melhor Valor',
    checkoutUrl: 'https://app.syncpayments.com.br/payment-link/a1554055-f899-4232-8e6c-28455f38261b',
  },
  {
    id: 'conexao_namoradinha',
    durationMonths: 1,
    label: 'Conexão Namoradinha 💖',
    priceFormatted: 'R$ 297,98',
    priceNumeric: 297.98,
    isPromotion: true,
    badge: 'Mais Procurado 🔥',
    description: 'WhatsApp VIP + Chamadas de Vídeo inclusas',
    checkoutUrl: 'https://app.syncpayments.com.br/payment-link/a1555184-45dd-4d0a-a014-918590326a5e',
    isHighlighted: true,
  },
];

export const LOCKED_POSTS: LockedPost[] = [
  {
    id: 'post-1',
    date: 'Há 2 horas',
    caption: 'Gravei um vídeo novo bem safadinho na faculdade antes de ir pra aula... quem quer ver tudo sem censura? 🙈🔥',
    mediaCount: {
      photos: 4,
      videos: 1,
    },
    likes: 342,
    comments: 28,
    blurredImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    isLocked: true,
  },
  {
    id: 'post-2',
    date: 'Ontem às 22:15',
    caption: 'Foto do ensaio com meu biquíni favorito do Brasil 🇧🇷 Deixei o melhor ângulo exclusivo pros assinantes...',
    mediaCount: {
      photos: 6,
      videos: 2,
    },
    likes: 890,
    comments: 64,
    blurredImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
    isLocked: true,
  },
  {
    id: 'post-3',
    date: '3 dias atrás',
    caption: 'Acabei de sair do banho e resolvi mandar um mimo pros meus amores do chat VIP 💕',
    mediaCount: {
      photos: 3,
      videos: 1,
    },
    likes: 512,
    comments: 42,
    blurredImage: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
    isLocked: true,
  },
];
