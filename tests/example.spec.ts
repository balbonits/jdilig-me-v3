import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Vite \+ React/);
});

test('counter button increments', async ({ page }) => {
  await page.goto('/');

  // Click the counter button.
  await page.click('text=count is 0');

  // Expect the counter to be 1.
  await expect(page.getByText('count is 1')).toBeVisible();
});

test('has Vite and React logos', async ({ page }) => {
  await page.goto('/');

  // Expect the logos to be visible
  await expect(page.getByAltText('Vite logo')).toBeVisible();
  await expect(page.getByAltText('React logo')).toBeVisible();
});