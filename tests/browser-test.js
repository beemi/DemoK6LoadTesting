import {check} from 'k6';
import {browser} from 'k6/experimental/browser';

export const options = {
    scenarios: {
        browser: {
            executor: 'constant-vus',
            vus: 1,
            duration: '1m',
            options: {
                browser: {
                    type: 'chromium',
                },
            },
        },
    },
}

export default async function () {
    const page = browser.newPage();

    await page.goto('https://otel-demo.field-eng.grafana.net/')

    const productCard = page.locator('(//div[@data-cy="product-card"])[1]')
    await productCard.click()

    const quantityOption = page.locator('[data-cy="product-quantity"]')
    quantityOption.selectOption('3')

    const addToCardBtn = page.locator('[data-cy="product-add-to-cart"]')
    await addToCardBtn.click()

    check(page, {
        'cart item name': page => page.locator('//p[text()="National Park Foundation Explorascope"]').isVisible() === true,
        'cart item quantity': page => page.locator('//p[text()="3"]').isVisible() === true
    })
    page.close();
}
