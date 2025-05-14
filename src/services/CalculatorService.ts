import { HistoryItem, Operation } from '../models/Calculator';

/**
 * Calculator Service - Contains all business logic for calculator operations
 */
export class CalculatorService {
  /**
   * Add two numbers
   */
  public add(a: number, b: number): number {
    return a + b;
  }

  /**
   * Subtract b from a
   */
  public subtract(a: number, b: number): number {
    return a - b;
  }

  /**
   * Multiply two numbers
   */
  public multiply(a: number, b: number): number {
    return a * b;
  }

  /**
   * Divide a by b
   */
  public divide(a: number, b: number): number {
    if (b === 0) {
      throw new Error('Division by zero');
    }
    return a / b;
  }

  /**
   * Perform calculation based on operation
   */
  public performCalculation(a: number, b: number, operation: Operation): number {
    switch (operation) {
      case '+':
        return this.add(a, b);
      case '-':
        return this.subtract(a, b);
      case '*':
        return this.multiply(a, b);
      case '/':
        return this.divide(a, b);
      default:
        throw new Error('Invalid operation');
    }
  }

  /**
   * Format calculation for history
   */
  public formatCalculation(a: number, b: number, operation: Operation): string {
    return `${a} ${operation} ${b}`;
  }

  /**
   * Create history item
   */
  public createHistoryItem(calculation: string, result: number): HistoryItem {
    return {
      calculation,
      result
    };
  }

  /**
   * Process input digit based on current display value and waiting state
   */
  public processInputDigit(digit: string, currentValue: string, waitingForSecondOperand: boolean): { newValue: string, waitingForSecondOperand: boolean } {
    if (waitingForSecondOperand) {
      return {
        newValue: digit,
        waitingForSecondOperand: false
      };
    } else {
      return {
        newValue: currentValue === '0' ? digit : currentValue + digit,
        waitingForSecondOperand: false
      };
    }
  }

  /**
   * Delete last digit from display value
   */
  public deleteLastDigit(displayValue: string): string {
    return displayValue.length > 1 ? displayValue.slice(0, -1) : '0';
  }
}