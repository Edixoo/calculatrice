import { HistoryItem } from './models/Calculator';
import { CalculatorService } from './services/CalculatorService';

describe('History System', () => {
  let calculatorService: CalculatorService;

  beforeEach(() => {
    calculatorService = new CalculatorService();
  });

  describe('createHistoryItem', () => {
    it('should create a history item with the correct properties', () => {
      const calculation = '2 + 3';
      const result = 5;
      const historyItem = calculatorService.createHistoryItem(calculation, result);

      expect(historyItem).toEqual({
        calculation,
        result
      });
    });

    it('should handle different calculation strings', () => {
      const testCases = [
        { calculation: '10 - 5', result: 5 },
        { calculation: '2 * 3', result: 6 },
        { calculation: '10 / 2', result: 5 },
        { calculation: '0 + 0', result: 0 }
      ];

      testCases.forEach(testCase => {
        const historyItem = calculatorService.createHistoryItem(testCase.calculation, testCase.result);
        expect(historyItem).toEqual({
          calculation: testCase.calculation,
          result: testCase.result
        });
      });
    });
  });

  describe('formatCalculation', () => {
    it('should format addition calculation correctly', () => {
      expect(calculatorService.formatCalculation(2, 3, '+')).toBe('2 + 3');
    });

    it('should format subtraction calculation correctly', () => {
      expect(calculatorService.formatCalculation(5, 3, '-')).toBe('5 - 3');
    });

    it('should format multiplication calculation correctly', () => {
      expect(calculatorService.formatCalculation(2, 3, '*')).toBe('2 * 3');
    });

    it('should format division calculation correctly', () => {
      expect(calculatorService.formatCalculation(6, 3, '/')).toBe('6 / 3');
    });

    it('should handle null operation', () => {
      expect(calculatorService.formatCalculation(2, 3, null)).toBe('2 null 3');
    });

    it('should handle decimal numbers', () => {
      expect(calculatorService.formatCalculation(2.5, 3.5, '+')).toBe('2.5 + 3.5');
    });

    it('should handle negative numbers', () => {
      expect(calculatorService.formatCalculation(-2, -3, '+')).toBe('-2 + -3');
    });
  });

  describe('History Management', () => {
    it('should be able to add items to history array', () => {
      // Simulate history array
      const history: HistoryItem[] = [];

      // Create and add history items
      const item1 = calculatorService.createHistoryItem('2 + 3', 5);
      const item2 = calculatorService.createHistoryItem('10 - 4', 6);

      history.push(item1);
      history.push(item2);

      // Verify history array
      expect(history.length).toBe(2);
      expect(history[0]).toEqual({
        calculation: '2 + 3',
        result: 5
      });
      expect(history[1]).toEqual({
        calculation: '10 - 4',
        result: 6
      });
    });

    it('should be able to clear history array', () => {
      // Simulate history array
      let history: HistoryItem[] = [];

      // Add items to history
      history.push(calculatorService.createHistoryItem('2 + 3', 5));
      history.push(calculatorService.createHistoryItem('10 - 4', 6));

      // Verify history has items
      expect(history.length).toBe(2);

      // Clear history
      history = [];

      // Verify history is empty
      expect(history.length).toBe(0);
    });

    it('should be able to access history items by index', () => {
      // Simulate history array
      const history: HistoryItem[] = [];

      // Add items to history
      history.push(calculatorService.createHistoryItem('2 + 3', 5));
      history.push(calculatorService.createHistoryItem('10 - 4', 6));

      // Access items by index
      expect(history[0].result).toBe(5);
      expect(history[1].result).toBe(6);
    });

    it('should handle invalid index access gracefully', () => {
      // Simulate history array
      const history: HistoryItem[] = [
        { calculation: '2 + 3', result: 5 }
      ];

      // Verify valid index access works
      expect(history[0].result).toBe(5);

      // Verify invalid index access returns undefined
      expect(history[5]).toBeUndefined();
    });
  });
});
