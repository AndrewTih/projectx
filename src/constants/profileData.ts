export interface App {
  name: string;
  icon: string;
  refLink: string;
  referrals: number;
  earned: number;
  old_ref_percent: number; // старый процент
  new_ref_percent: number; // новый процент
  description: string; // краткое описание
}

export const APPS: App[] = [
  {
    name: 'Crypto Wallet',
    icon: 'CW',
    refLink: 'https://app1.example.com/ref/12345',
    referrals: 12,
    earned: 320,
    old_ref_percent: 5,
    new_ref_percent: 7,
    description: 'Партнёр — это пользователь, который зарегистрировался по вашей ссылке и приносит вам доход.'
  },
  {
    name: 'NFT Market',
    icon: 'NM',
    refLink: 'https://app2.example.com/ref/12345',
    referrals: 7,
    earned: 180,
    old_ref_percent: 3,
    new_ref_percent: 5,
    description: 'Партнёр — это пользователь, который зарегистрировался по вашей ссылке и приносит вам доход.'
  },
]; 