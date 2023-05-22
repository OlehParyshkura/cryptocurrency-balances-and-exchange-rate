export abstract class IBalanceCalculatorService {
  abstract calculateFiatBalance(cryptoBalance: string, rate: string): string;
}
