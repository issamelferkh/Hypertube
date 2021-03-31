# Hypertube
    - Le résultat d'une recherche doit être affiché sous forme de miniatures triées par nom.


## Hyper Plan
- fix subtitles
- fix sort
- fix filter

- Update scrap js +++ [x]
- auteur file
- delete all logs
- build

- Understand
  - node flash
  - node session
  - how to still loged in
  - how check if loged or not front and back

### Jeu: [ ] Finish User Part
- The app must allow a user to register asking at least an email address, a username, a last name, a first name and a password that is somehow protected.
- The user must be able to register and connect via Omniauth. You must then implement at least 2 strategies: the 42 strategy and another one of your choice.
  - Google
    - Check if ggId exist add aditional info to DB and redirect to the App: Issue!
    - Check if username of email exist, add ggId to DB and redirect to the App
    - If is a newUser add to DB and redirect to the App
  - 42
- The user must then be able to connect with his/her username and password.
- The user must be able to receive an email allowing him/her to re-initialize his/her password should the first one be forgotten.
- The user must be able to disconnect with 1 click from any pages on the site.
- The user must be able to select a preferred language that will be English by default.
- Modify the email address, profile picture and information.
- Consult the profile of any other user, ie see the profile picture and information. The email address however will remain private.

### Ven: [ ] Finish Library Part
- Bibliothèque
  - Accès
    - La bibliothèque n'est accessible qu'aux utilisateurs connectés
      - how it work sty logged ?

  - Affichage par défaut
    - scrap ?
    - affiche ?
    - Par défaut, lorsqu'aucune recherche n'a été effectuée, la bibliothèque doit afficher les miniatures des medias les plus populaires des sources gérées pas l'application. Cette liste doit être triée (selon un critère choisi par les soutenus).
      - sort from DB ?

  - Les miniatures
    - Les miniatures doit être composée du nom de la video, ainsi que, si disponible, de son année de production, de sa note et d'une image de couverture.
      - ?
    - Sur les medias les plus populaires, toutes ces infos devraient logiquement être disponibles.
    - Les vidéos vues doivent être clairement différenciées des vidéos non vues.

  - Pagination et tri
    - La liste de videos doit être paginée, et les pages doivent être chargées automatiquement de manière asynchrone.
    - La liste doit être triable selon différents critères.

  - Recherche
    - Le moteur de recherche doit interroger au minimum deux sources externes distinctes, et limiter les résultats aux videos.
    - Le résultat d'une recherche doit être affiché sous forme de miniatures triées par nom.
    - Essayez de chercher une vidéo, vous pouvez avoir un exemple avec `curl http://www.randomlists.com/random-movies\?qty\=1 | cat | ruby -e "p gets.match(/port'>([^<]*)/)[1]"`.

#### Research
- [ ] The search engine will interrogate at least two external sources of your choice.
  - comme par exemple http://www.legittorrents.info, ou encore https://archive.org
- [x] And return the ensemble of results in thumbnails forms.
- [x] You will limit the research to videos only.

#### Thumbnails
- [ ] If a research has been done, the results will show as thumbnails sorted by names.
- [ ] If no research was done, you will show the most popular medias from your external sources, sorted as per the criteria of your choice (downloads, peers, seeders, etc...).
- In addition to the name of the video, a thumbnail must be composed, if available, of its production year, its IMDb note and a cover image.
  name of the video
  production year
  IMDb note
  cover image.
  watched from unwatched

- You will differentiate the videos watched from unwatched, as you prefer.
- The list will be paginated, at the end of each page. The following one must be automatically charged asynchronically. That means there cannot be a link from each page.
- The page will be sortable and filtered according to criteria such as name, genre, the IMDb grade, the gap of production year etc...
  sortable: select list
  A-Z
  Z-A
  IMDb
  Year Released: OK

  filtered:
  Genres: select list
  IMDb: starts
  Year Released: select list: Issue


### Sam: [ ] Finish Video Part

- Issue: getSubtitles
  - /goinfre/iel-ferk/issam/src/components/player/Player.js
  - /goinfre/iel-ferk/issam/API/index.js
  - /goinfre/iel-ferk/issam/API/routes/movieRoutes.js
  - /goinfre/iel-ferk/issam/API/controllers/movieControllers.js

- Partie vidéo
  - Accès
    - La section avec le player n'est accessible qu'aux utilisateurs connectés ?

  - Informations sur la video
    - En plus du player, la section video doit présenter des informations sur la video en cours. Testez avec une vidéo populaire, vous devriez avoir le résumé, le casting, l'année de production, etc.
    - On doit également retrouver la liste des commentaires laissés par les utilisateurs pour la video, ainsi que la possibilité de laisser un nouveau commentaire.

  - Téléchargement d'une video
    - Le lancement d'une video doit lancer le téléchargement de la video sur le serveur via le protocole BitTorrent. Dès que la lecture intégrale ininterrompue est possible, le player commence à streamer la video.
    - Le téléchargement doit se faire en background, de manière non-bloquante.

  - Conversion des videos
    - Lorsque la video n'est pas lisible nativement par le navigateur, elle doit être convertie à la volée pour qu'elle puisse être streamée. Au minimum, le format mkv doit être supporté.
    - Par exemple, ce magnet doit être streamable: `magnet:?xt=urn:btih:79816060ea56d56f2a2148cd45705511079f9bca&dn=TPB.AFK.2013.720p.h264-SimonKlose&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Fopen.demonii.com%3A1337&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Fexodus.desync.com%3A6969`

  - Sauvegarde des videos
    - Une video déjà téléchargée (par n'importe quel utilisteur) doit être sauvegardée sur le serveur, et supprimée si elle n'a pas été visionnée pendant un mois. Evidemment, le lancement d'une video déjà présente sur le serveur ne doit pas la re-télécharger, mais streamer à partir de la copie présente sur le serveur.

  - Sous-titres
    - Si des sous-titres anglais sont disponibles pour la video, ils doivent être automatiquement téléchargés et sélectionnables directement sur le player.
    - De même, si la langue de la vidéo ne correspond pas à la langue préférée de l'utilisateur et que des sous-titres sont disponibles, ils doivent être automatiquement téléchargés et sélectionnables.

- This part can only be accessible to connected users.
#### Videos Details
- This section will present the details of a video, ie show the player of the video as well as – if available - the summary, casting (at least producer, director, main cast etc...) the production year, length, IMDb grade, a cover story and anything you think relevant.
- You will also give the users the option of leaving a comment on the video, and show the list of prior comments.
  -> View: Consult the profile (add link in comments) of any other user, ie see the profile picture and information. The email address however will remain private.

#### Videos Lunch
- To launch the video on the server we must - if the file wasn’t downloaded prior – launch the download from the associated torrent on the server, and stream the video flux from that one as soon as enough data has been downloaded to ensure a seamless watching of the video. Of course, any treatment must be done in the background in a non-blocking manner.
- Once the movie is entirely downloaded, it must be saved on the server, so that we don’t need to re-download the movie again. If a movie is unwatched for a month, it will have to be erased.
- If English subtitles are available for this video, they will need to be downloaded and available for the video player. In addition, if the language of the video does not match the preferred language of the user, and some subtitles are available for this video, they
  will need to be downloaded and selectable as well.
- If the video is not natively readable for the browser (That means it isn’t either mp4, nor webm.) , you will convert it on the fly in an acceptable format. The mkv support is a minimum.

### Dim: [ ] Check All + Build and push
- Delete all console.log and test again
- Test each feature front and back +++
- Fix all email pic contents
  - activationMail.html > line 170
  src="images/hypertube_logo2.png"
  does not apear in the activation email
  - forget password email have same problem of pictures -> pic issue in send mail


### Lun: [ ] Correction


