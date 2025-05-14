<template>
  <div class="calculator-container">
    <Calculator 
      :current-value="displayValue"
      :previous-value="previousValue"
      :operation="operation"
      @input-digit="inputDigit"
      @handle-operation="handleOperation"
      @calculate="calculate"
      @clear="clear"
      @delete="deleteDigit"
    />
    <CalculatorHistory 
      :history="history"
      @use-history-result="useHistoryResult"
      @clear-history="clearHistory"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Calculator from './components/Calculator.vue';
import CalculatorHistory from './components/CalculatorHistory.vue';
import { HistoryItem, Operation } from './models/Calculator';
import { CalculatorService } from './services/CalculatorService';

export default defineComponent({
  name: 'App',
  components: {
    Calculator,
    CalculatorHistory
  },
  setup() {
    // Initialize calculator service
    const calculatorService = new CalculatorService();

    // State
    const displayValue = ref('0');
    const previousValue = ref<number | null>(null);
    const operation = ref<Operation>(null);
    const history = ref<HistoryItem[]>([]);
    const waitingForSecondOperand = ref(false);

    // Input a digit
    const inputDigit = (digit: string): void => {
      const result = calculatorService.processInputDigit(
        digit, 
        displayValue.value, 
        waitingForSecondOperand.value
      );

      displayValue.value = result.newValue;
      waitingForSecondOperand.value = result.waitingForSecondOperand;
    };

    // Handle operation
    const handleOperation = (op: Operation): void => {
      const inputValue = parseFloat(displayValue.value);

      if (previousValue.value === null) {
        previousValue.value = inputValue;
      } else if (!waitingForSecondOperand.value) {
        calculate();
      }

      operation.value = op;
      waitingForSecondOperand.value = true;
    };

    // Calculate result
    const calculate = (): void => {
      if (previousValue.value === null || operation.value === null) {
        return;
      }

      const currentValue = parseFloat(displayValue.value);

      try {
        // Perform calculation
        const result = calculatorService.performCalculation(
          previousValue.value, 
          currentValue, 
          operation.value
        );

        // Format calculation for history
        const calculationText = calculatorService.formatCalculation(
          previousValue.value, 
          currentValue, 
          operation.value
        );

        // Add to history
        addToHistory(calculationText, result);

        // Update values
        displayValue.value = result.toString();
        previousValue.value = null;
        operation.value = null;
        waitingForSecondOperand.value = true;
      } catch (error) {
        // Handle errors (e.g., division by zero)
        displayValue.value = 'Error';
        previousValue.value = null;
        operation.value = null;
        waitingForSecondOperand.value = true;
      }
    };

    // Clear calculator
    const clear = (): void => {
      displayValue.value = '0';
      previousValue.value = null;
      operation.value = null;
      waitingForSecondOperand.value = false;
    };

    // Delete last digit
    const deleteDigit = (): void => {
      if (waitingForSecondOperand.value) return;

      displayValue.value = calculatorService.deleteLastDigit(displayValue.value);
    };

    // Add calculation to history
    const addToHistory = (calculation: string, result: number): void => {
      const historyItem = calculatorService.createHistoryItem(calculation, result);
      history.value.push(historyItem);
    };

    // Clear history
    const clearHistory = (): void => {
      history.value = [];
    };

    // Use result from history
    const useHistoryResult = (index: number): void => {
      if (index >= 0 && index < history.value.length) {
        displayValue.value = history.value[index].result.toString();
      }
    };

    return {
      displayValue,
      previousValue,
      operation,
      history,
      inputDigit,
      handleOperation,
      calculate,
      clear,
      deleteDigit,
      clearHistory,
      useHistoryResult
    };
  }
});
</script>
