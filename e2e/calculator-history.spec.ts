import { test, expect } from '@playwright/test';

test.describe('Calculator History Functionality', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the calculator app
    await page.goto('/');
    // Wait for the calculator to be visible
    await page.waitForSelector('.calculator-container');
  });

  test('should add calculations to history', async ({ page }) => {
    // Perform a calculation
    await page.click('button:has-text("5")');
    await page.click('button:has-text("+")');
    await page.click('button:has-text("3")');
    await page.click('button:has-text("=")');

    // Check that the calculation is added to history
    const historyItem = await page.locator('.history-item').first();
    const historyText = await historyItem.textContent();

    expect(historyText).toContain('5 + 3');
    expect(historyText).toContain('8');
  });

  test('should clear history when clear button is clicked', async ({ page }) => {
    // Perform a calculation to add to history
    await page.click('button:has-text("8")');
    await page.click('button:has-text("/")');
    await page.click('button:has-text("2")');
    await page.click('button:has-text("=")');

    // Verify history item exists
    expect(await page.locator('.history-item').count()).toBe(1);

    // Click clear history button
    await page.click('button:has-text("Effacer l\'historique")');

    // Verify history is cleared
    expect(await page.locator('.history-item').count()).toBe(0);
  });
});
