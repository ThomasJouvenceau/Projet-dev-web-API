# Projet-dev-web-API
Principe du projet:

API de gestion d'événements sportifs
Description : Une API pour créer et gérer des événements sportifs, y inscrire des joueurs, et suivre les scores.
Entités :

User : peut se connecter, lire les données de toutes les équipes, ajouter/supprimer équipes/joueurs en favoris. Ne peut pas modifier les scores ou les autres stats 

Admin : a les plein pouvoirs 

Équipes : peut uniquement modifier base de données des joueurs de l’équipe PTS/MIN/FTS/RBD/TO etc/ peut envoyer demandes aux admins pour changement effectif 

Arbitre :gère les scores et les calendriers. 

Fonctionnalités :Authentification JWT pour sécuriser les actions d’ajout/modification.

Gestion des rôles : organisateurs (gérer les événements) et joueurs (s'inscrire et voir les scores).
Respect des conventions RESTful avec des endpoints tels que /events, /players, /scores.

Rôles:

Thierry:Gestion des routes, Création des models

Thomas: Gestion des models, des controlleurs

Jaël: Gestion de l'Authentification JWT(Middlewares/Routes)
