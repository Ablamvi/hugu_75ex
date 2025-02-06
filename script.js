document.addEventListener("DOMContentLoaded", function () {
  const themeSelector = document.getElementById("theme-selector");
  const searchInput = document.getElementById("search-input");
  const searchBtn = document.getElementById("search-btn");
  const photoGallery = document.getElementById("photo-gallery");
  const videoGallery = document.getElementById("video-gallery");
  const uploadForm = document.getElementById("upload-form");
  const fileInput = document.getElementById("file-input");

  // Thème
  themeSelector.addEventListener("change", function () {
    document.body.className = themeSelector.value + "-mode";
    localStorage.setItem("theme", themeSelector.value);
  });

  // Rechercher un média
  searchBtn.addEventListener("click", function () {
    const searchQuery = searchInput.value.toLowerCase();
    const mediaItems = document.querySelectorAll(".gallery img, .gallery video");
    mediaItems.forEach(item => {
      item.style.display = item.src.toLowerCase().includes(searchQuery) ? "block" : "none";
    });
  });

  // Ajouter un fichier
  uploadForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const file = fileInput.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (event) {
      let media;
      if (file.type.startsWith("image/")) {
        media = document.createElement("img");
      } else if (file.type.startsWith("video/")) {
        media = document.createElement("video");
        media.controls = true;
      }
      if (media) {
        media.src = event.target.result;
        (file.type.startsWith("image/") ? photoGallery : videoGallery).appendChild(media);
      }
    };
    reader.readAsDataURL(file);
  });
});
