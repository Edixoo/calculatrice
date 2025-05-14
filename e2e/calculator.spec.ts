import { test, expect } from '@playwright/test';

test.describe('Calculator Basic Operations', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the calculator app
    await page.goto('/');
    // Wait for the calculator to be visible
    await page.waitForSelector('.calculator-container');
  });

  test('should perform addition correctly', async ({ page }) => {
    // Click on digits and operation buttons
    await page.click('button:has-text("7")');
    await page.click('button:has-text("+")');
    await page.click('button:has-text("3")');
    await page.click('button:has-text("=")');

    // Check the result
    const displayValue = await page.locator('.current-operand').textContent();
    expect(displayValue?.trim()).toBe('10');
  });

  test('should perform subtraction correctly', async ({ page }) => {
    // Click on digits and operation buttons
    await page.click('button:has-text("9")');
    await page.click('button:has-text("-")');
    await page.click('button:has-text("4")');
    await page.click('button:has-text("=")');

    // Check the result
    const displayValue = await page.locator('.current-operand').textContent();
    expect(displayValue?.trim()).toBe('5');
  });

  test('should perform multiplication correctly', async ({ page }) => {
    // Click on digits and operation buttons
    await page.click('button:has-text("6")');
    await page.click('button:has-text("×")');
    await page.click('button:has-text("7")');
    await page.click('button:has-text("=")');

    // Check the result
    const displayValue = await page.locator('.current-operand').textContent();
    expect(displayValue?.trim()).toBe('42');
  });

  test('should perform division correctly', async ({ page }) => {
    // Click on digits and operation buttons
    await page.click('button:has-text("8")');
    await page.click('button:has-text("/")');
    await page.click('button:has-text("2")');
    await page.click('button:has-text("=")');

    // Check the result
    const displayValue = await page.locator('.current-operand').textContent();
    expect(displayValue?.trim()).toBe('4');
  });

  test('should handle decimal operations', async ({ page }) => {
    // Click on digits and operation buttons
    await page.click('button:has-text("5")');
    await page.click('button:has-text(".")');
    await page.click('button:has-text("5")');
    await page.click('button:has-text("+")');
    await page.click('button:has-text("2")');
    await page.click('button:has-text(".")');
    await page.click('button:has-text("5")');
    await page.click('button:has-text("=")');

    // Check the result
    const displayValue = await page.locator('.current-operand').textContent();
    expect(displayValue?.trim()).toBe('8');
  });

  test('should clear the display', async ({ page }) => {
    // Enter some digits
    await page.click('button:has-text("5")');
    await page.click('button:has-text("6")');

    // Clear the display
    await page.click('button:has-text("C")');

    // Check that the display is cleared
    const displayValue = await page.locator('.current-operand').textContent();
    expect(displayValue?.trim()).toBe('0');
  });
});
