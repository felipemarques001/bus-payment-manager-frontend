export const PAYMENT_OPTIONS = [
    { value: 'PIX', label: 'PIX'},
    { value: 'CARD', label: 'Cartão'},
    { value: 'BILLET', label: 'Boleto'},
    { value: 'CASH_PAYMENT', label: 'Espécie'},
] as const;

export type TuitionPaymentType = typeof PAYMENT_OPTIONS[number]['value'];