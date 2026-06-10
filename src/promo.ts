import { staticFile } from 'remotion';

export interface PromoContent {
    title: string;
    websiteLabel: string;
    badge: string;
}

export const PROMO_INSERT_AFTER_QUESTION = 15;
export const PROMO_DURATION_SECONDS = 20;

export const promoContentEs: PromoContent = {
    title: 'DESCARGA PAPELCRAFT GRATIS ENTRANDO A PAPEL.COOL',
    websiteLabel: 'papel.cool',
    badge: 'ESCANEA Y ENTRA',
};

export const promoContentEn: PromoContent = {
    title: 'DOWNLOAD FREE PAPERCRAFT AT PAPEL.COOL',
    websiteLabel: 'papel.cool',
    badge: 'SCAN AND ENTER',
};

export const promoQrImage = staticFile('qr-web.svg');
export const promoBackgroundVideo = staticFile('promo-papelcool-background.mp4');
