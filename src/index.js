const puppeteer = require('puppeteer');
const fs = require('fs/promises');


// Fonction pour accéder à une URL spécifique
async function goToURL(page, url) {
    await page.goto(url);
    await page.waitForNetworkIdle(); // Attend que le réseau soit inactif toutes les ressources chargées)
}

// Fonction pour capturer une capture d'écran de la page
async function captureScreenshot(page, path) {
    await page.screenshot({ path, fullPage: true });
}

// Fonction pour extraire les noms à partir de la page
async function extractNames(page) {
    return await page.evaluate(() => {
        return Array.from(document.querySelectorAll("#component_53 > div > div.acKDw.w.O > h1")).map(x => x.textContent);
    });
}

// Fonction pour écrire des données dans un fichier
async function writeToFile(path, data) {
    await fs.writeFile(path, data.join("\n"));
}

// Fonction principale pour exécuter les étapes
async function start() {
    const browser = await puppeteer.launch({ headless: true }); // Lancement du navigateur 
    const page = await browser.newPage(); // Création d'une nouvelle page dans le navigateu
    const url = 'https://fr.tripadvisor.be/Restaurants-g188646-Charleroi_Hainaut_Province_Wallonia.html';



    await goToURL(page, url); // Accède à l'URL spécifiée
    await captureScreenshot(page, "images/bg.png"); // Capture une capture d'écran de la page et l'enregistre

    const names = await extractNames(page); // Extrait les noms à partir de la page
    await writeToFile("Restaurants/info.json", names); // Écrit les noms dans un fichier JSON

    await browser.close(); // Ferme le navigateur
}

start();