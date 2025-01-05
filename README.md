# **Démineur - Projet JavaScript**

## **Description**
Ce projet est une implémentation du célèbre jeu de Démineur en JavaScript. Il s'agit d'un projet académique développé dans le cadre de la formation **EPSI B3 DevOps**. L'application offre plusieurs fonctionnalités et niveaux de difficulté, permettant une expérience utilisateur fluide et personnalisée.

## **Fonctionnalités**
### **Divers**
- **Sélection de la difficulté** : Débutant, Intermédiaire, Expert, et Maître.
- **Bouton de lancement de partie** : Initialisation d'une nouvelle partie.
- **Compteur de temps** : Affichage du temps écoulé pendant la partie.
- **Mise en forme de la page** : Interface utilisateur intuitive et interactive.

### **Jeu**
- **Lancement de la partie** : Génération aléatoire d'un plateau.
- **Placement des bombes** : Positionnement aléatoire des mines sur le plateau.
- **Sélection des cases** :
  - Révélation des cases adjacentes si vides.
  - Propagation automatique si nécessaire.
- **Clic droit pour placer/enlever un drapeau** :
  - Bloque la révélation des cases avec drapeau.
- **Fin de jeu** :
  - Affichage du résultat (gagné ou perdu).
  - Révélation complète du plateau.

### **Bonus**
- **Système de classement** : 
  - En cas de victoire, l'utilisateur entre son nom.
  - Classement basé sur le temps écoulé, affiché sous le plateau.

## **Niveaux de difficulté**
| **Difficulté**  | **Dimensions** | **Mines** |
|------------------|----------------|-----------|
| Débutant         | 9x9            | 10        |
| Intermédiaire    | 16x16          | 40        |
| Expert           | 22x22          | 100       |
| Maître           | 30x30          | 250       |

## **Utilisation**
1. Sélectionne un niveau de difficulté.
2. Clique sur "Démarrer la partie".
3. Joue au démineur en cliquant sur les cases :
   - **Clic gauche** : Révèle une case.
   - **Clic droit** : Place ou enlève un drapeau.
4. Le jeu se termine si :
   - Toutes les cases sans mines sont révélées (Victoire 🎉).
   - Une mine est révélée (Défaite 💥).

## **Technologies utilisées**
- **HTML5** : Structure de la page.
- **CSS3** : Mise en forme et design.
- **JavaScript** : Logique du jeu et interactions utilisateur.
