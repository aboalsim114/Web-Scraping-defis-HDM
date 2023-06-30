const puppeteer = require('puppeteer');
const fs = require('fs/promises');


async function start() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    const url = 'https://fr.tripadvisor.be/Restaurants-g188646-Charleroi_Hainaut_Province_Wallonia.html';
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 }); // Timeout set to 60 seconds


    // Récupère les liens des restaurants de la page
    const restoLinks = await page.evaluate(() => {
        return Array.from(document.querySelectorAll(".biGQs > a")).map((link) => link.href);
    });



    await page.waitForNetworkIdle();

    console.log(restoLinks);

    // Tableau pour stocker les données des restaurants
    const restaurantData = [];

    // Parcourt les liens des restaurants
    for (const link of restoLinks) {
        const newPage = await browser.newPage(); // Crée une nouvelle page pour chaque restaurant
        await newPage.goto(link, { waitUntil: 'networkidle0' }); // Navigue vers le lien du restaurant et attend que les requêtes réseau soient terminées
        const name = await newPage.$eval('h1[data-test-target=top-info-header]', (element) => element.textContent); // Récupère le nom du restaurant
        const number = await newPage.$eval('span.AYHFM a.BMQDV', (el) => el.textContent); // Récupère le numéro du restaurant
        console.log("number : ", number);
        console.log("titre : ", name);
        restaurantData.push({ name, number });
        await newPage.close(); // Ferme la nouvelle page après avoir récupéré les informations
        const jsonData = JSON.stringify(restaurantData, null, 2); // Convertit les données des restaurants en JSON
        await fs.writeFile('info.json', jsonData);
    }



}

start();