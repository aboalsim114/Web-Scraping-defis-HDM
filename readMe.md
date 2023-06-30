# Web Scraping - Restaurants Tripadvisor

Ce projet est une application Node.js qui utilise Puppeteer, une bibliothèque d'automatisation de navigateur Chrome/Chromium sans tête, pour extraire des informations sur les restaurants de Tripadvisor pour Charleroi, Wallonie, Belgique.

L'application se dirige vers une liste de restaurants à Charleroi, collecte des liens vers des restaurants individuels, visite chaque page de restaurant, extrait des informations spécifiques (nom et numéro), et sauvegarde ces informations dans un fichier JSON. Elle crée également une capture d'écran de chaque page de restaurant et les sauvegarde dans un dossier 'images'.

## Prérequis

Pour exécuter cette application, vous devez avoir installé sur votre machine :

- Node.js

## Dépendances

- Puppeteer
- fs/promises (Module File System de Node.js avec promesses)

## Installation

Tout d'abord, clonez le dépôt sur votre machine locale :

```bash
  git clone https://github.com/aboalsim114/Web-Scraping-defis-HDM.git
```

Ensuite, naviguez vers le dépôt cloné :

```bash
  cd  Web-Scraping-defis-HDM.git
```

Installez les dépendances :

```bash
    npm install
```

## Utilisation

Pour exécuter l'application, utilisez la commande suivante :

```bash
    npm start
```

L'application commencera à extraire les informations et à les sauvegarder dans un fichier nommé info.json dans le répertoire racine. Les captures d'écran seront sauvegardées dans un dossier nommé 'images'.

## Résultats

Le fichier de sortie info.json contient un tableau d'objets d'informations sur les restaurants. Chaque objet contient le nom et le numéro du restaurant.

```bash
   [
    {
        "nom": "Nom du restaurant",
        "numero": "Numéro du restaurant"
    },
    ...
]

```
