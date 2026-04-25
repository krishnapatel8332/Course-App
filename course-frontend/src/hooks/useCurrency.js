import { useMemo } from 'react';

// Hardcoded for demonstration, but based on timezone.
// Real app might use an exchange rate API like https://open.er-api.com/v6/latest/USD
const EXCHANGE_RATES = {
  USD: 1,
  INR: 83.5, // 1 USD = 83.5 INR
  EUR: 0.92,
  GBP: 0.79,
  AUD: 1.5,
};

export function useCurrency() {
  const { currency, symbol, rate } = useMemo(() => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      let cur = 'USD';
      
      if (tz.includes('Kolkata') || tz.includes('Calcutta') || tz.includes('Asia/Colombo')) {
        cur = 'INR';
      } else if (tz.includes('Europe/London')) {
        cur = 'GBP';
      } else if (tz.includes('Europe/')) {
        cur = 'EUR';
      } else if (tz.includes('Australia/')) {
        cur = 'AUD';
      }

      const symbols = { USD: '$', INR: '₹', EUR: '€', GBP: '£', AUD: 'A$' };
      
      return {
        currency: cur,
        symbol: symbols[cur] || '$',
        rate: EXCHANGE_RATES[cur] || 1,
      };
    } catch (e) {
      return { currency: 'USD', symbol: '$', rate: 1 };
    }
  }, []);

  const formatPrice = (usdPrice) => {
    const convertedPrice = usdPrice * rate;
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: currency,
    }).format(convertedPrice);
  };

  return { currency, symbol, formatPrice };
}
