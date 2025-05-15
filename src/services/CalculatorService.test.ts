import { CalculatorService } from './CalculatorService';

describe('CalculatorService', () => {
  let calculatorService: CalculatorService;

  beforeEach(() => {
    calculatorService = new CalculatorService();
  });

  describe('add', () => {
    it('should add two positive numbers correctly', () => {
      expect(calculatorService.add(2, 3)).toBe(5);
    });

    it('should add a positive and a negative number correctly', () => {
      expect(calculatorService.add(2, -3)).toBe(-1);
    });

    it('should add two negative numbers correctly', () => {
      expect(calculatorService.add(-2, -3)).toBe(-5);
    });

    it('should add zero correctly', () => {
      expect(calculatorService.add(2, 0)).toBe(2);
      expect(calculatorService.add(0, 3)).toBe(3);
      expect(calculatorService.add(0, 0)).toBe(0);
    });

    it('should handle decimal numbers', () => {
      expect(calculatorService.add(2.5, 3.5)).toBe(6);
      expect(calculatorService.add(2.1, 3.2)).toBeCloseTo(5.3);
    });
  });

  describe('subtract', () => {
    it('should subtract two positive numbers correctly', () => {
      expect(calculatorService.subtract(5, 3)).toBe(2);
    });

    it('should subtract a negative number from a positive number correctly', () => {
      expect(calculatorService.subtract(5, -3)).toBe(8);
    });

    it('should subtract a positive number from a negative number correctly', () => {
      expect(calculatorService.subtract(-5, 3)).toBe(-8);
    });

    it('should subtract two negative numbers correctly', () => {
      expect(calculatorService.subtract(-5, -3)).toBe(-2);
    });

    it('should subtract zero correctly', () => {
      expect(calculatorService.subtract(5, 0)).toBe(5);
      expect(calculatorService.subtract(0, 3)).toBe(-3);
      expect(calculatorService.subtract(0, 0)).toBe(0);
    });

    it('should handle decimal numbers', () => {
      expect(calculatorService.subtract(5.5, 3.5)).toBe(2);
      expect(calculatorService.subtract(5.1, 3.2)).toBeCloseTo(1.9);
    });
  });

  describe('multiply', () => {
    it('should multiply two positive numbers correctly', () => {
      expect(calculatorService.multiply(2, 3)).toBe(6);
    });

    it('should multiply a positive and a negative number correctly', () => {
      expect(calculatorService.multiply(2, -3)).toBe(-6);
      expect(calculatorService.multiply(-2, 3)).toBe(-6);
    });

    it('should multiply two negative numbers correctly', () => {
      expect(calculatorService.multiply(-2, -3)).toBe(6);
    });

    it('should multiply by zero correctly', () => {
      expect(calculatorService.multiply(2, 0)).toBe(0);
      expect(calculatorService.multiply(0, 3)).toBe(0);
      expect(calculatorService.multiply(0, 0)).toBe(0);
    });

    it('should handle decimal numbers', () => {
      expect(calculatorService.multiply(2.5, 2)).toBe(5);
      expect(calculatorService.multiply(2.1, 3)).toBeCloseTo(6.3);
    });
  });

  describe('divide', () => {
    it('should divide two positive numbers correctly', () => {
      expect(calculatorService.divide(6, 3)).toBe(2);
    });

    it('should divide a positive number by a negative number correctly', () => {
      expect(calculatorService.divide(6, -3)).toBe(-2);
    });

    it('should divide a negative number by a positive number correctly', () => {
      expect(calculatorService.divide(-6, 3)).toBe(-2);
    });

    it('should divide two negative numbers correctly', () => {
      expect(calculatorService.divide(-6, -3)).toBe(2);
    });

    it('should throw an error when dividing by zero', () => {
      expect(() => calculatorService.divide(6, 0)).toThrow('Division by zero');
    });

    it('should handle dividing zero correctly', () => {
      expect(calculatorService.divide(0, 3)).toBe(0);
    });

    it('should handle decimal numbers', () => {
      expect(calculatorService.divide(5, 2)).toBe(2.5);
      expect(calculatorService.divide(1, 3)).toBeCloseTo(0.333, 3);
    });
  });

  describe('performCalculation', () => {
    it('should perform addition correctly', () => {
      expect(calculatorService.performCalculation(2, 3, '+')).toBe(5);
    });

    it('should perform subtraction correctly', () => {
      expect(calculatorService.performCalculation(5, 3, '-')).toBe(2);
    });

    it('should perform multiplication correctly', () => {
      expect(calculatorService.performCalculation(2, 3, '*')).toBe(6);
    });

    it('should perform division correctly', () => {
      expect(calculatorService.performCalculation(6, 3, '/')).toBe(2);
    });

    it('should throw an error for invalid operation', () => {
      expect(() => calculatorService.performCalculation(2, 3, null)).toThrow('Invalid operation');
    });

    it('should throw an error for division by zero', () => {
      expect(() => calculatorService.performCalculation(6, 0, '/')).toThrow('Division by zero');
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
  });

  describe('processInputDigit', () => {
    it('should replace the current value with the digit when waiting for second operand', () => {
      const result = calculatorService.processInputDigit('5', '10', true);
      
      expect(result).toEqual({
        newValue: '5',
        waitingForSecondOperand: false
      });
    });

    it('should append the digit to the current value when not waiting for second operand and current value is not 0', () => {
      const result = calculatorService.processInputDigit('5', '10', false);
      
      expect(result).toEqual({
        newValue: '105',
        waitingForSecondOperand: false
      });
    });

    it('should replace the current value with the digit when not waiting for second operand and current value is 0', () => {
      const result = calculatorService.processInputDigit('5', '0', false);
      
      expect(result).toEqual({
        newValue: '5',
        waitingForSecondOperand: false
      });
    });
  });

  describe('deleteLastDigit', () => {
    it('should delete the last digit from the display value', () => {
      expect(calculatorService.deleteLastDigit('123')).toBe('12');
    });

    it('should return 0 when the display value has only one digit', () => {
      expect(calculatorService.deleteLastDigit('5')).toBe('0');
    });

    it('should handle decimal numbers', () => {
      expect(calculatorService.deleteLastDigit('12.3')).toBe('12.');
    });
  });
});