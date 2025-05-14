<template>
  <div class="history">
    <h3>Historique</h3>
    <div class="history-list">
      <div 
        v-for="(item, index) in history" 
        :key="index"
        class="history-item"
        @click="$emit('use-history-result', index)"
      >
        {{ item.calculation }} = {{ item.result }}
      </div>
      <div v-if="history.length === 0" class="history-empty">
        Aucun calcul dans l'historique
      </div>
    </div>
    <button 
      class="clear-history" 
      @click="$emit('clear-history')"
      :disabled="history.length === 0"
    >
      Effacer l'historique
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { HistoryItem } from '../models/Calculator';

export default defineComponent({
  name: 'CalculatorHistory',
  props: {
    history: {
      type: Array as () => HistoryItem[],
      required: true
    }
  },
  emits: ['use-history-result', 'clear-history']
});
</script>

<style scoped>
.history-empty {
  padding: 10px;
  text-align: center;
  color: #999;
  font-style: italic;
}
</style>