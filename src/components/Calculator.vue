<template>
  <div class="calculator">
    <div class="display">
      <div class="previous-operand">{{ previousOperand }}</div>
      <div class="current-operand">{{ currentValue }}</div>
    </div>
    <div class="buttons">
      <button class="clear" @click="$emit('clear')">C</button>
      <button class="delete" @click="$emit('delete')">⌫</button>
      <button class="operation" @click="$emit('handle-operation', '/')">/</button>
      <button class="operation" @click="$emit('handle-operation', '*')">×</button>
      <button class="number" @click="$emit('input-digit', '7')">7</button>
      <button class="number" @click="$emit('input-digit', '8')">8</button>
      <button class="number" @click="$emit('input-digit', '9')">9</button>
      <button class="operation" @click="$emit('handle-operation', '-')">-</button>
      <button class="number" @click="$emit('input-digit', '4')">4</button>
      <button class="number" @click="$emit('input-digit', '5')">5</button>
      <button class="number" @click="$emit('input-digit', '6')">6</button>
      <button class="operation" @click="$emit('handle-operation', '+')">+</button>
      <button class="number" @click="$emit('input-digit', '1')">1</button>
      <button class="number" @click="$emit('input-digit', '2')">2</button>
      <button class="number" @click="$emit('input-digit', '3')">3</button>
      <button class="equals" @click="$emit('calculate')">=</button>
      <button class="number zero" @click="$emit('input-digit', '0')">0</button>
      <button class="number" @click="$emit('input-digit', '.')">.</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { Operation } from '../models/Calculator';

export default defineComponent({
  name: 'Calculator',
  props: {
    currentValue: {
      type: String,
      required: true
    },
    previousValue: {
      type: Number,
      default: null
    },
    operation: {
      type: String as () => Operation,
      default: null
    }
  },
  emits: ['input-digit', 'handle-operation', 'calculate', 'clear', 'delete'],
  setup(props) {
    const previousOperand = computed(() => {
      if (props.previousValue !== null && props.operation !== null) {
        return `${props.previousValue} ${props.operation}`;
      }
      return '';
    });

    return {
      previousOperand
    };
  }
});
</script>