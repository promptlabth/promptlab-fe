import { test, expect } from '@playwright/test'
 
test('should running main page', async ({ page }) => {

    // Given
    await page.goto('http://localhost:3000/')

    // When
    // await page.click('text=About')

    // Then
    await expect(page).toHaveTitle("หน้าหลัก")
})

// เขียนแคปชั่นขายของ
test('should navigate to Caption Page', async ({ page }) => {

    // Given
    await page.goto('http://localhost:3000/')

    // When
    await page.click('text=เขียนแคปชั่นขายของ')

    // Then
    await expect(page).toHaveTitle("เขียนแคปชั่นขายของ")
})

// เขียนบทความ
test('should navigate to write article Page', async ({ page }) => {

    // Given
    await page.goto('http://localhost:3000/')

    // When
    await page.click('text=เขียนบทความ')

    // Then
    await expect(page).toHaveTitle("เขียนบทความ")
})