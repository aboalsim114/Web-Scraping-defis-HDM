const puppeteer = require('puppeteer');
const fs = require('fs/promises');


async function start() {
    const browser = await puppeteer.launch({ headless: false }); // Lancement du navigateur
    const page = await browser.newPage(); // Création d'une nouvelle page dans le navigateur
    const url = 'https://fr.tripadvisor.be/Restaurants-g188646-Charleroi_Hainaut_Province_Wallonia.html';

    await page.goto(url);
    await page.waitForNetworkIdle()

    await page.evaluate(() => {
        let cookies = document.querySelector("#onetrust-accept-btn-handler");
        cookies.click()

    });

    await page.waitForNetworkIdle()


    const namesResto = await page.$$("")


    await page.screenshot({ path: 'images/bg.png', fullPage: true });


}

start();