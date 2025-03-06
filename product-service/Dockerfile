# Utiliser une image officielle Node.js basée sur Alpine pour une image plus légère
FROM node:18-alpine

# Définir le répertoire de travail dans le conteneur (toutes les commandes suivantes seront exécutées à partir de ce répertoire)
WORKDIR /app

# Copier les fichiers package.json et package-lock.json (ou yarn.lock) dans le répertoire de travail
COPY package*.json ./

# Installer les dépendances en mode production (cela installe uniquement les dépendances nécessaires à l'exécution)
RUN npm install --production

# Copier tous les fichiers du répertoire local dans le conteneur (après l'installation des dépendances pour améliorer la mise en cache)
COPY . .

# Exposer le port 3002 afin que le conteneur puisse communiquer avec l'extérieur
EXPOSE 3002

# Spécifier la commande à exécuter lorsque le conteneur démarre
CMD ["node", "index.js"]
