document.addEventListener("DOMContentLoaded", function () {
  console.log("Script chargé et DOM prêt !");

  // Sélection des éléments du DOM
  const themeSelector = document.getElementById("theme-selector");
  const displayMode = document.getElementById("display-mode");
  const searchInput = document.getElementById("search-input");
  const searchBtn = document.getElementById("search-btn");
  const photoGallery = document.getElementById("photo-gallery");
  const videoGallery = document.getElementById("video-gallery");
  const uploadForm = document.getElementById("upload-form");
  const fileInput = document.getElementById("file-input");
  const mostViewed = document.getElementById("most-viewed");
  const mostDownloaded = document.getElementById("most-downloaded");

  let mediaStats = JSON.parse(localStorage.getItem("mediaStats")) || { views: {}, downloads: {} };

  /*** 🌙 Gestion du Thème ***/
  function applyTheme(theme) {
    document.body.classList.remove("light-mode", "dark-mode", "neon-mode");
    document.body.classList.add(`${theme}-mode`);
    localStorage.setItem("theme", theme);
  }

  themeSelector.addEventListener("change", function () {
    applyTheme(themeSelector.value);
  });

  if (localStorage.getItem("theme")) {
    applyTheme(localStorage.getItem("theme"));
    themeSelector.value = localStorage.getItem("theme");
  }

  /*** 🎭 Mode d'affichage ***/
  displayMode.addEventListener("change", function () {
    document.querySelectorAll(".gallery img, .gallery video").forEach(item => {
      item.style.width = displayMode.value === "list" ? "100%" : "300px";
    });
  });

  /*** 🔎 Recherche ***/
  searchBtn.addEventListener("click", function () {
    const query = searchInput.value.toLowerCase();
    document.querySelectorAll(".gallery img, .gallery video").forEach(media => {
      media.style.display = media.src.toLowerCase().includes(query) ? "block" : "none";
    });
  });

  /*** 📤 Ajout de fichiers ***/
  uploadForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const file = fileInput.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (event) {
      if (file.type.startsWith("image/")) {
        addMedia(photoGallery, "img", event.target.result, file.name);
      } else if (file.type.startsWith("video/")) {
        addMedia(videoGallery, "video", event.target.result, file.name);
      }
    };
    reader.readAsDataURL(file);
  });

  /*** 🖼️ Ajouter une image ou une vidéo à la galerie ***/
  function addMedia(gallery, type, src, name) {
    const media = document.createElement(type);
    media.src = src;
    if (type === "video") media.controls = true;
    media.classList.add("gallery-item");
    media.addEventListener("click", () => updateStats(name));
    gallery.appendChild(media);
    updateStats(name);
  }

  /*** 📊 Mise à jour des statistiques ***/
  function updateStats(name) {
    if (!mediaStats.views[name]) mediaStats.views[name] = 0;
    mediaStats.views[name]++;
    localStorage.setItem("mediaStats", JSON.stringify(mediaStats));
    updateStatistics();
  }

  /*** 📈 Afficher les statistiques ***/
  function updateStatistics() {
    let maxViews = 0, mostViewedMedia = "Aucune donnée";
    for (const media in mediaStats.views) {
      if (mediaStats.views[media] > maxViews) {
        maxViews = mediaStats.views[media];
        mostViewedMedia = media;
      }
    }
    mostViewed.textContent = `Média le plus consulté : ${mostViewedMedia}`;
  }

  updateStatistics(); // Charger les stats au démarrage
});
