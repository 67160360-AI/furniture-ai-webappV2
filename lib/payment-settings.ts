export type PaymentSettings = {
  promptpay: {
    enabled: boolean
    accountName: string
    promptpayId: string
    qrImageUrl: string
  }
  creditCard: { enabled: boolean }
  bankTransfer: {
    enabled: boolean
    bankName: string
    accountName: string
    accountNumber: string
  }
  cod: { enabled: boolean }
}

export type PaymentMethod = 'promptpay' | 'bank_transfer' | 'credit_card' | 'cod'

export const DEFAULT_PAYMENT_SETTINGS: PaymentSettings = {
  promptpay: {
    enabled: true,
    accountName: 'บจก. เมซง ฟอร์ม จำกัด',
    promptpayId: '',
    qrImageUrl: '',
  },
  creditCard: { enabled: true },
  bankTransfer: {
    enabled: true,
    bankName: 'ธนาคารกสิกรไทย (KBANK)',
    accountName: 'บจก. เมซง ฟอร์ม จำกัด',
    accountNumber: '099-2-84912-3',
  },
  cod: { enabled: true },
}
