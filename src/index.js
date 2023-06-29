const puppeteer = require("puppeteer")


async function start() {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto("https://fr.tripadvisor.be/Restaurants-g188646-Charleroi_Hainaut_Province_Wallonia.html")
    await page.screenshot({ path: "images/bg.png", fullPage: true })
    await browser.close()
}
start()