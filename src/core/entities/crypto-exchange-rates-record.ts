interface ExchangeRateRecord {
  [fiat: string]: string;
}

export interface CryptoExchangeRatesRecord {
  [crypto: string]: ExchangeRateRecord;
}
