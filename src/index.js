const puppeteer = require('puppeteer');
const fs = require('fs/promises');

async function startBrowser() {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    return { browser, page };
}

async function goToURL(page, url) {
    await page.goto(url);
    await page.waitForNetworkIdle();
}

async function captureScreenshot(page, path) {
    await page.screenshot({ path, fullPage: true });
}

async function extractNames(page) {
    return await page.evaluate(() => {
        return Array.from(document.querySelectorAll("#component_53 > div > div.acKDw.w.O > h1")).map(x => x.textContent);
    });
}

async function writeToFile(path, data) {
    await fs.writeFile(path, data.join("\n"));
}

async function start() {
    const { browser, page } = await startBrowser();
    const url = "https://fr.tripadvisor.be/Restaurants-g188646-Charleroi_Hainaut_Province_Wallonia.html";

    await goToURL(page, url);
    await captureScreenshot(page, "images/bg.png");

    const names = await extractNames(page);
    await writeToFile("Restaurants/info.json", names);

    await browser.close();
}

start();