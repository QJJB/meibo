## Routes générales

| **Méthode HTTP** | **URL**       | **Nom de la route** | **Description**                          |
|-------------------|---------------|---------------------|------------------------------------------|
| GET               | `/`           | _(aucun)_           | Page d'accueil (Welcome).               |
| GET               | `/dashboard`  | `dashboard`         | Tableau de bord de l'utilisateur.       |

---

## Routes pour le profil utilisateur

| **Méthode HTTP** | **URL**       | **Nom de la route**     | **Description**                          |
|-------------------|---------------|-------------------------|------------------------------------------|
| GET               | `/profile`    | `profile.edit`          | Affiche le formulaire d'édition du profil. |
| PATCH             | `/profile`    | `profile.update`        | Met à jour les informations du profil.  |
| DELETE            | `/profile`    | `profile.destroy`       | Supprime le compte utilisateur.         |

---

## Routes pour les projets (`projects`)

| **Méthode HTTP** | **URL**               | **Nom de la route**   | **Description**                          |
|-------------------|-----------------------|-----------------------|------------------------------------------|
| GET               | `/projects`          | `projects.index`      | Affiche la liste des projets.            |
| GET               | `/projects/create`   | `projects.create`     | Affiche le formulaire de création d'un projet. |
| POST              | `/projects`          | `projects.store`      | Enregistre un nouveau projet.            |
| GET               | `/projects/{project}`| `projects.show`       | Affiche les détails d'un projet spécifique. |
| GET               | `/projects/{project}/edit` | `projects.edit` | Affiche le formulaire d'édition d'un projet. |
| PUT/PATCH         | `/projects/{project}`| `projects.update`     | Met à jour un projet existant.           |
| DELETE            | `/projects/{project}`| `projects.destroy`    | Supprime un projet existant.             |

---

## Routes pour les tâches (`tasks`) imbriquées dans les projets

| **Méthode HTTP** | **URL**                                | **Nom de la route**        | **Description**                          |
|-------------------|----------------------------------------|----------------------------|------------------------------------------|
| GET               | `/projects/{project}/tasks`           | `projects.tasks.index`     | Affiche la liste des tâches d'un projet. |
| GET               | `/projects/{project}/tasks/create`    | `projects.tasks.create`    | Affiche le formulaire de création d'une tâche. |
| POST              | `/projects/{project}/tasks`           | `projects.tasks.store`     | Enregistre une nouvelle tâche pour un projet. |
| GET               | `/projects/{project}/tasks/{task}`    | `projects.tasks.show`      | Affiche les détails d'une tâche spécifique. |
| GET               | `/projects/{project}/tasks/{task}/edit` | `projects.tasks.edit`    | Affiche le formulaire d'édition d'une tâche. |
| PUT/PATCH         | `/projects/{project}/tasks/{task}`    | `projects.tasks.update`    | Met à jour une tâche existante.          |
| DELETE            | `/projects/{project}/tasks/{task}`    | `projects.tasks.destroy`   | Supprime une tâche existante.            |

## Routes pour l'authentification (`auth.php`)

| **Méthode HTTP** | **URL**                     | **Nom de la route**         | **Description**                                                                 |
|-------------------|-----------------------------|-----------------------------|---------------------------------------------------------------------------------|
| GET               | `/register`                | `register`                  | Affiche le formulaire d'inscription.                                           |
| POST              | `/register`                | _(aucun)_                   | Enregistre un nouvel utilisateur.                                              |
| GET               | `/login`                   | `login`                     | Affiche le formulaire de connexion.                                            |
| POST              | `/login`                   | _(aucun)_                   | Connecte un utilisateur.                                                       |
| POST              | `/logout`                  | `logout`                    | Déconnecte l'utilisateur.                                                      |
| GET               | `/forgot-password`         | `password.request`          | Affiche le formulaire pour demander un lien de réinitialisation de mot de passe. |
| POST              | `/forgot-password`         | `password.email`            | Envoie un lien de réinitialisation de mot de passe par email.                   |
| GET               | `/reset-password/{token}`  | `password.reset`            | Affiche le formulaire pour réinitialiser le mot de passe.                      |
| POST              | `/reset-password`          | `password.store`            | Réinitialise le mot de passe de l'utilisateur.                                 |
| GET               | `/verify-email`            | `verification.notice`       | Affiche une notification demandant de vérifier l'email.                        |
| GET               | `/verify-email/{id}/{hash}`| `verification.verify`       | Vérifie l'email de l'utilisateur via un lien unique.                           |
| POST              | `/email/verification-notification` | `verification.send` | Renvoie un email de vérification.                                              |
| GET               | `/confirm-password`        | `password.confirm`          | Affiche le formulaire pour confirmer le mot de passe.                          |
| POST              | `/confirm-password`        | _(aucun)_                   | Confirme le mot de passe de l'utilisateur.                                     |
| PUT               | `/password`                | `password.update`           | Met à jour le mot de passe de l'utilisateur.                                   |
