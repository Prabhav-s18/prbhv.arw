/* =====================================================================
   PHOTO DATA
   Add / edit photos here. Each entry becomes one gallery tile.

   category : "drift" | "street" | "portrait" | "lifestyle"
   src      : path to your real image, e.g. "assets/earthshakers.jpg"
              (leave blank "" to keep the placeholder swatch)
   ratio    : aspect ratio "width/height" — only used for placeholder tiles
              (real photos size themselves automatically, no cropping)
   location : short caption shown on hover + in the lightbox
===================================================================== */
const photoData = [
  {
    title: "Earthshakers",
    category: "drift",
    src: "assets/drift-earthshakers.jpg",
    location: "Drift day, VIC"
  },
  {
    title: "Two of a Kind",
    category: "drift",
    src: "assets/drift-duo-green.jpg",
    location: "Night meet, VIC"
  },
  {
    title: "Shark Tooth",
    category: "drift",
    src: "assets/drift-duo-black.jpg",
    location: "Track day, VIC"
  },
  {
    title: "Waiting on Lygon St",
    category: "street",
    src: "assets/street-umbrella.jpg",
    location: "Melbourne"
  },
  {
    title: "Street — more soon",
    category: "street",
    src: "",
    ratio: "3/4",
    location: "Coming soon"
  },
  {
    title: "Street — more soon",
    category: "street",
    src: "",
    ratio: "4/5",
    location: "Coming soon"
  },
  {
    title: "Golden Hour",
    category: "portrait",
    src: "assets/portrait-goldenhour.jpg",
    location: "Studley Park"
  },
  {
    title: "Red Room",
    category: "portrait",
    src: "assets/portrait-heart.jpg",
    location: "Melbourne"
  },
  {
    title: "Portrait — more soon",
    category: "portrait",
    src: "",
    ratio: "4/5",
    location: "Coming soon"
  },
  {
    title: "The Blessing",
    category: "lifestyle",
    src: "assets/lifestyle-ceremony.jpg",
    location: "Community event"
  },
  {
    title: "Dhol & Dupatta",
    category: "lifestyle",
    src: "assets/lifestyle-dance.jpg",
    location: "Family celebration"
  },
  {
    title: "Family — more soon",
    category: "lifestyle",
    src: "",
    ratio: "5/4",
    location: "Coming soon"
  }
];

const categoryClass = {
  drift: "ph-drift",
  street: "ph-street",
  portrait: "ph-portrait",
  lifestyle: "ph-lifestyle"
};
const categoryLabel = {
  drift: "Drift / Motorsport",
  street: "Street",
  portrait: "Portrait",
  lifestyle: "Family / Lifestyle"
};

/* ===================================================================
   RENDER GALLERY (masonry — each tile keeps its real aspect ratio)
=================================================================== */
const gallery = document.getElementById("gallery");

function renderGallery(){
  gallery.innerHTML = "";
  photoData.forEach((photo, i) => {
    const item = document.createElement("div");
    item.className = "g-item";
    item.dataset.category = photo.category;
    item.dataset.index = i;
    item.style.animationDelay = `${(i % 6) * 0.06}s`;

    if (photo.src){
      item.innerHTML = `
        <div class="g-tag">${categoryLabel[photo.category]}</div>
        <img class="g-photo" src="${photo.src}" alt="${photo.title}" loading="lazy">
        <div class="g-caption-hint">${photo.title}${photo.location ? " — " + photo.location : ""}</div>
      `;
    } else {
      item.innerHTML = `
        <div class="g-tag">${categoryLabel[photo.category]}</div>
        <div class="g-photo g-placeholder ${categoryClass[photo.category]}" style="aspect-ratio:${photo.ratio || "1/1"};"></div>
        <div class="g-caption-hint">${photo.title}</div>
      `;
    }
    item.addEventListener("click", () => openLightbox(i));
    gallery.appendChild(item);
  });
}
renderGallery();

/* ===================================================================
   FILTER TABS
=================================================================== */
const tabs = document.querySelectorAll(".tab");
tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    const filter = tab.dataset.filter;
    document.querySelectorAll(".g-item").forEach(item => {
      const match = filter === "all" || item.dataset.category === filter;
      item.classList.toggle("hidden", !match);
    });
  });
});

/* ===================================================================
   LIGHTBOX
=================================================================== */
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxTitle = document.getElementById("lightboxTitle");
const lightboxLocation = document.getElementById("lightboxLocation");
let currentIndex = 0;

function openLightbox(index){
  currentIndex = index;
  updateLightbox();
  lightbox.classList.add("open");
  document.body.style.overflow = "hidden";
}

function updateLightbox(){
  const photo = photoData[currentIndex];
  if (photo.src){
    lightboxImage.innerHTML = `<img src="${photo.src}" alt="${photo.title}">`;
  } else {
    lightboxImage.innerHTML = `<div class="lightbox-placeholder ${categoryClass[photo.category]}" style="aspect-ratio:${photo.ratio || "1/1"};"></div>`;
  }
  lightboxTitle.textContent = photo.title;
  lightboxLocation.textContent = photo.location || "";
}

function closeLightbox(){
  lightbox.classList.remove("open");
  document.body.style.overflow = "";
}

document.getElementById("lightboxClose").addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });

document.getElementById("lightboxPrev").addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + photoData.length) % photoData.length;
  updateLightbox();
});
document.getElementById("lightboxNext").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % photoData.length;
  updateLightbox();
});

document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("open")) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowRight") document.getElementById("lightboxNext").click();
  if (e.key === "ArrowLeft") document.getElementById("lightboxPrev").click();
});

/* ===================================================================
   MOBILE NAV
=================================================================== */
const navBurger = document.getElementById("navBurger");
const mobileNav = document.getElementById("mobileNav");
navBurger.addEventListener("click", () => mobileNav.classList.toggle("open"));
mobileNav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => mobileNav.classList.remove("open")));

/* ===================================================================
   LIGHT / DARK MODE TOGGLE
=================================================================== */
const modeToggle = document.getElementById("modeToggle");
const savedMode = localStorage.getItem("prabhav-mode");
if (savedMode === "light") document.body.classList.add("light-mode");

modeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  localStorage.setItem("prabhav-mode", document.body.classList.contains("light-mode") ? "light" : "dark");
});

/* ===================================================================
   MISC
=================================================================== */
document.getElementById("year").textContent = new Date().getFullYear();

// Portfolio PDF placeholder — point this at your exported PDF once you have one
document.getElementById("pdfLink").addEventListener("click", (e) => {
  e.preventDefault();
  alert("Add your portfolio PDF to the assets folder and update the #pdfLink href in index.html.");
});
