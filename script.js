document.addEventListener("DOMContentLoaded", function () {
  const themeSelector = document.getElementById("theme-selector");
  const displayMode = document.getElementById("display-mode");
  const animationsToggle = document.getElementById("animations-toggle");
  const searchInput = document.getElementById("search-input");
  const searchBtn = document.getElementById("search-btn");
  const photoGallery = document.getElementById("photo-gallery");
  const videoGallery = document.getElementById("video-gallery");
  const uploadForm = document.getElementById("upload-form");
  const fileInput = document.getElementById("file-input");
  const statistics = document.getElementById("statistics");
  const mostViewed = document.getElementById("most-viewed");
  const mostDownloaded = document.getElementById("most-downloaded");

  let mediaStats = {
    views: {},
    downloads: {}
  };

  // Changer de thème
  themeSelector.addEventListener("change", function () {
    document.body.classList.remove("light-mode", "dark-mode", "neon-mode");
    document.body.classList.add(themeSelector.value + "-mode");
    localStorage.setItem("theme", themeSelector.value);
  });

  // Charger le thème enregistré
  if (localStorage.getItem("theme")) {
    document.body.classList.add(localStorage.getItem("theme") + "-mode");
    themeSelector.value = localStorage.getItem("theme");
  }

  // Affichage des médias
  displayMode.addEventListener("change", function () {
    const galleryItems = document.querySelectorAll(".gallery img, .gallery video");
    if (displayMode.value === "list") {
      galleryItems.forEach(item => item.style.width = "100%");
    } else {
      galleryItems.forEach(item => item.style.width = "300px");
    }
  });

  // Rechercher un média
  searchBtn.addEventListener("click", function () {
    const searchQuery = searchInput.value.toLowerCase();
    const images = photoGallery.querySelectorAll("img");
    const videos = videoGallery.querySelectorAll("video");
    images.forEach(img => {
      if (img.src.toLowerCase().includes(searchQuery)) {
        img.style.display = "block";
      } else {
        img.style.display = "none";
      }
    });
    videos.forEach(video => {
      if (video.src.toLowerCase().includes(searchQuery)) {
        video.style.display = "block";
      } else {
        video.style.display = "none";
      }
    });
  });

  // Ajouter un fichier
  uploadForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const file = fileInput.files[0];

    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (event) {
      if (file.type.startsWith("image/")) {
        const img = document.createElement("img");
        img.src = event.target.result;
        photoGallery.appendChild(img);
        updateStats(file.name, 'image');
      } else if (file.type.startsWith("video/")) {
        const video = document.createElement("video");
        video.src = event.target.result;
        video.controls = true;
        videoGallery.appendChild(video);
        updateStats(file.name, 'video');
      }
    };
    reader.readAsDataURL(file);
  });

  // Mettre à jour les statistiques de médias
  function updateStats(name, type) {
    if (!mediaStats[type]) {
      mediaStats[type] = {};
    }
    if (!mediaStats[type][name]) {
      mediaStats[type][name] = { views: 0, downloads: 0 };
    }
    mediaStats[type][name].views++;
    updateStatistics();
  }

  // Afficher les statistiques
  function updateStatistics() {
    let maxViews = 0;
    let maxDownloads = 0;
    let mostViewedMedia = '';
    let mostDownloadedMedia = '';

    for (const mediaType in mediaStats) {
      for (const mediaName in mediaStats[mediaType]) {
        if (mediaStats[mediaType][mediaName].views > maxViews) {
          maxViews = mediaStats[mediaType][mediaName].views;
          mostViewedMedia = mediaName;
        }
        if (mediaStats[mediaType][mediaName].downloads > maxDownloads) {
          maxDownloads = mediaStats[mediaType][mediaName].downloads;
          mostDownloadedMedia = mediaName;
        }
      }
    }

    most
