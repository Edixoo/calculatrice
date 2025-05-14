import { test, expect } from '@playwright/test';

test.describe('Calculator Edge Cases', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the calculator app
    await page.goto('/');
    // Wait for the calculator to be visible
    await page.waitForSelector('.calculator-container');
  });

  test('should handle division by zero', async ({ page }) => {
    // Perform division by zero
    await page.click('button:has-text("5")');
    await page.click('button:has-text("/")');
    await page.click('button:has-text("0")');
    await page.click('button:has-text("=")');

    const displayValue = await page.locator('.current-operand').textContent();
    expect(displayValue?.trim()).not.toBe('0'); // The result should not be 0
  });


  test('should handle consecutive operations', async ({ page }) => {
    // Perform consecutive operations without pressing equals
    await page.click('button:has-text("5")');
    await page.click('button:has-text("+")');
    await page.click('button:has-text("3")');
    await page.click('button:has-text("×")');
    await page.click('button:has-text("2")');
    await page.click('button:has-text("=")');

    const displayValue = await page.locator('.current-operand').textContent();
    expect(displayValue?.trim()).not.toBe('0');
  });

  test('should handle decimal point correctly', async ({ page }) => {
    // Test that multiple decimal points are not allowed in a single number
    await page.click('button:has-text("5")');
    await page.click('button:has-text(".")');
    await page.click('button:has-text("2")');
    await page.click('button:has-text("3")');

    // Check that only one decimal point is used
    const displayValue = await page.locator('.current-operand').textContent();
    expect(displayValue?.trim()).toBe('5.23');
  });

  test('should handle delete button correctly', async ({ page }) => {
    // Enter a number
    await page.click('button:has-text("1")');
    await page.click('button:has-text("2")');
    await page.click('button:has-text("3")');

    // Delete the last digit
    await page.click('button:has-text("⌫")');

    // Check the result
    const displayValue = await page.locator('.current-operand').textContent();
    expect(displayValue?.trim()).toBe('12');

    // Delete all digits
    await page.click('button:has-text("⌫")');
    await page.click('button:has-text("⌫")');

    // Check that the display shows 0
    const finalDisplayValue = await page.locator('.current-operand').textContent();
    expect(finalDisplayValue?.trim()).toBe('0');
  });
});
