export interface SubscriptionPlan {
  id: string;
  durationMonths: number;
  label: string;
  priceFormatted: string;
  priceNumeric: number;
  isPromotion?: boolean;
  badge?: string;
  monthlyEquivalent?: string;
  checkoutUrl?: string;
  description?: string;
  isHighlighted?: boolean;
}

export interface LockedPost {
  id: string;
  date: string;
  caption: string;
  mediaCount: {
    photos: number;
    videos: number;
  };
  likes: number;
  comments: number;
  blurredImage: string;
  isLocked: boolean;
}

export interface ProfileData {
  name: string;
  username: string;
  verified: boolean;
  age: number;
  bioShort: string;
  bioFull: string;
  avatarUrl: string;
  bannerUrls: string[];
  isOnline: boolean;
  postsCount: number;
  mediaCount: number;
  likesCount: string;
  audioDurationSeconds: number;
  audioUrl?: string;
}
