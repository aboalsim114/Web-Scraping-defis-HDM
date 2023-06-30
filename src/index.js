const puppeteer = require('puppeteer');
const fs = require('fs/promises');

async function start() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    const url = 'https://fr.tripadvisor.be/Restaurants-g188646-Charleroi_Hainaut_Province_Wallonia.html';

    await page.goto(url);
    await page.waitForNetworkIdle(); // Attend que la navigation et les requêtes réseau soient terminées



    // Récupère les liens des restaurants de la page
    const restoLinks = await page.$$eval('.biGQs > a', (links) => {
        return links.map((link) => link.href);



    });

    // Tableau pour stocker les données des restaurants

    const restaurantData = [];

    // Parcourt les liens des restaurants
    for (const link of restoLinks) {
        const newPage = await browser.newPage(); // Crée une nouvelle page pour chaque restaurant
        await newPage.goto(link); // Navigue vers le lien du restaurant
        await newPage.waitForNavigation();

        const name = await newPage.$eval('h1[data-test-target=top-info-header]', (element) => element.textContent); // Récupère le nom du restaurant
        const number = await newPage.$eval('.yEWoV', (element) => element.textContent); // Récupère le numéro du restaurant

        restaurantData.push({ name, number });


    }

    const jsonData = JSON.stringify(restaurantData, null, 2); // Convertit les données des restaurants en JSON
    await fs.writeFile('info.json', jsonData);

}

start();