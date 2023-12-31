const puppeteer = require('puppeteer');
const fs = require('fs/promises');


async function start() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    const url = 'https://fr.tripadvisor.be/Restaurants-g188646-Charleroi_Hainaut_Province_Wallonia.html';
    await page.goto(url, {
        waitUntil: 'load',
        timeout: 0
    });

    await page.waitForNetworkIdle();

    // Récupère les liens des restaurants de la page
    await page.waitForSelector('.biGQs ');
    const restoLinks = await page.$$eval('.biGQs > a', (links) => links.map((link) => link.href));

    console.log(restoLinks);

    // Tableau pour stocker les données des restaurants
    const restaurantData = [];

    // Parcourt les liens des restaurants
    for (const link of restoLinks) {
        const newPage = await browser.newPage(); // Crée une nouvelle page pour chaque restaurant
        await newPage.goto(link, { waitUntil: 'networkidle0' }); // Navigue vers le lien du restaurant et attend que les requêtes réseau soient terminées
        const name = await newPage.$eval('h1[data-test-target=top-info-header]', (element) => element.textContent); // Récupère le nom du restaurant
        await newPage.screenshot({ path: `images/${name}.png`, fullPage: true }); // fais une capture d'ecran de chaque page avec le nom du restaurent .png 
        const number = await newPage.$eval('span.AYHFM a.BMQDV', (el) => el.textContent); // Récupère le numéro du restaurant
        console.log("number : ", number);
        console.log("titre : ", name);
        restaurantData.push({ name, number });
        await newPage.close(); // Ferme la nouvelle page après avoir récupéré les informations


    }


    const currentDate = new Date();
    const fileName = currentDate.toISOString().replace(/[-:]/g, "").slice(0, 14) + ".json";
    const jsonData = JSON.stringify(restaurantData, null, 2);
    if (restaurantData.length > 0) {

        await fs.writeFile(fileName, jsonData);
    }


    await browser.close()

}



start();