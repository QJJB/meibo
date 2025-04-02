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

### 1️⃣ Clonage du projet

Commence par cloner le dépôt :

```sh
git clone <URL_du_dépôt>
```

Ensuite, entre dans le dossier du projet :

```sh
cd meibo
```

---

### 2️⃣ Installation et configuration du backend (Laravel)

> Assure-toi d’avoir PHP, Composer et une base de données (MySQL/PostgreSQL) installés.

1. Installe les dépendances PHP avec Composer :

   ```sh
   composer install
   ```

2. Copie le fichier d’environnement et configure-le :

   ```sh
   cp .env.example .env
   ```

3. Génère la clé d’application :

   ```sh
   php artisan key:generate
   ```

4. Configure la base de données dans le fichier `.env`, puis exécute les migrations (uniquement lors de la première configuration) :

   ```sh
   php artisan migrate --seed
   ```

5. Lance le serveur Laravel :

   ```sh
   php artisan serve
   ```

---

### 3️⃣ Installation et lancement du frontend (React.js)

> Assure-toi d’avoir Node.js et npm installés.

1. Installe les dépendances :

   ```sh
   npm install
   ```

2. Copie le fichier des variables d'environnement :

   ```sh
   cp .env.example .env.local
   ```

3. Lance le serveur React.js :

   ```sh
   npm run dev
   ```

---
