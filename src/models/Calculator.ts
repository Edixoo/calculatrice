/**
 * Interface for history items
 */
export interface HistoryItem {
  calculation: string;
  result: number;
}

/**
 * Type for calculator operations
 */
export type Operation = '+' | '-' | '*' | '/' | null;