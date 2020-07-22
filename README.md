# lesponeysdetalence.fr

Site internet, gestion des joueurs pour les matchs

Les joueurs peuvent mettre à jour leur présence :
- présent
- absent
- à la bourre
- ne sais pas

Possibilité d'ajout de commentaires par match

Envoi de mail : Sélection des destinataires (à tous, à ceux présents ou sélection individuelle)

Possibilité de vote par match pour les meilleurs joueurs et les plus mauvais

Affichage du résultat des matchs

Liens vers Applications :
-> compteur de score
-> placement sur terrain de 6 équipes
-> résultats FFVB

Site crée en PHP.
Bdd Mysql
frontend : javascript, bootstrap et requêtes AJAX

commande sql : classement des joueurs par nombre de votes reçus (sur la table VoteAction)
SELECT joueurs.nom, num_vote, count(num_vote) FROM `VoteAction` , joueurs WHERE joueurs.id = num_vote GROUP BY num_vote
