# 🔥 MeiBo

> Application de gestion de tâches collaborative conçue pour faciliter l’organisation et le suivi du travail en équipe.

## Technologies utilisées

### Frontend

- **React.js** – Pour une application rapide, optimisée et flexible.
- **TypeScript** – Pour un code plus robuste et maintenable.
- **Tailwind CSS** – Pour un design élégant et une mise en page efficace.
- **GSAP** – Pour des animations fluides et dynamiques.
- **React Query** – Pour une gestion avancée des requêtes et du cache côté client.
- **Axios** – Pour des appels API rapides et optimisés.

### Backend

- **Laravel** – Un framework PHP puissant et modulaire.
- **Laravel Breeze** – Un système d’authentification simple et efficace.
- (Autres technologies à compléter)

## Installation du projet Meibo

> Assure-toi d’avoir PHP, Composer et une base de données (MySQL/PostgreSQL) installés.
> Assure-toi d’avoir Node.js et npm installés.

Commence par cloner le dépôt :

```sh
git clone <URL_du_dépôt>
```

Ensuite, entre dans le dossier du projet :

```sh
cd meibo
```

Installe les dépendances PHP avec Composer :

```sh
composer install
```

Copie le fichier d’environnement et configure-le :

```sh
cp .env.example .env
```

Génère la clé d’application :

```sh
php artisan key:generate
```

Configure la base de données dans le fichier `.env`, puis exécute les migrations :

```sh
php artisan migrate --seed
```

> [!NOTE]
> Exécuter uniquement lors de la première configuration de la db

Installe les dépendances JavaScript avec npm :

```sh
npm install
```
   
Lance le serveur React.js :

```sh
npm run dev
```

Lance le serveur Laravel :

```sh
php artisan serve
```
