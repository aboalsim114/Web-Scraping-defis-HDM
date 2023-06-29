const puppeteer = require("puppeteer");
const fs = require("fs/promises");

async function start() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://fr.tripadvisor.be/FindRestaurants?geo=188646&diningOptions=10600&establishmentTypes=10591&broadened=true");
    await page.screenshot({ path: "images/bg.png", fullPage: true });
    const names = await page.evaluate(() => {
        return Array.from(document.querySelectorAll("#lithium-root > main > div > div:nth-child(5) > div.sVSQW > div > div.seiBA._T.wCxWg > div.LvzMf._T > div.Ikpld.f.e > span:nth-child(1) > div > div > div.yJIls.z.P0.M0 > header > div > div.jhsNf.N.G > div.VDEXx.u.Ff.K > div > a")).map(x => x.textContent);
    });
    await fs.writeFile("Restaurants/names.txt", names.join("\r\n"))
    await browser.close();
}

start();