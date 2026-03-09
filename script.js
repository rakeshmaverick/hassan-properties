document.querySelectorAll(".slider").forEach((slider) => {
  const slides = slider.querySelector(".slides");
  const images = slider.querySelectorAll("img");
  const prev = slider.querySelector(".prev");
  const next = slider.querySelector(".next");
  const dotsContainer = slider.querySelector(".dots");

  let index = 0;
  const total = images.length;

  // Create dots
  images.forEach((_, i) => {
    const dot = document.createElement("span");
    if (i === 0) dot.classList.add("active");

    dot.addEventListener("click", () => {
      index = i;
      updateSlide();
    });

    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll("span");

  function updateSlide() {
    slides.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((dot) => dot.classList.remove("active"));
    dots[index].classList.add("active");
  }

  next.addEventListener("click", () => {
    index = (index + 1) % total;
    updateSlide();
  });

  prev.addEventListener("click", () => {
    index = (index - 1 + total) % total;
    updateSlide();
  });

  // Touch Swipe
  let startX = 0;

  slider.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  slider.addEventListener("touchend", (e) => {
    let endX = e.changedTouches[0].clientX;

    if (startX - endX > 50) {
      index = (index + 1) % total;
    } else if (endX - startX > 50) {
      index = (index - 1 + total) % total;
    }

    updateSlide();
  });
});

// MOBILE MENU
document.querySelector(".menu-toggle").addEventListener("click", () => {
  document.querySelector(".nav").classList.toggle("active");
});

// FILTER FUNCTION
function filterProperties() {
  const searchValue = document.getElementById("searchInput").value.trim();

  const typeValue = document.getElementById("typeFilter").value;

  document.querySelectorAll(".card").forEach((card) => {
    const id = card.getAttribute("data-id");
    const type = card.getAttribute("data-type");

    const matchId = id.includes(searchValue);
    const matchType = typeValue === "all" || type === typeValue;

    if (matchId && matchType) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

// RESET
function resetFilters() {
  document.getElementById("searchInput").value = "";
  document.getElementById("typeFilter").value = "all";
  document.querySelectorAll(".card").forEach((card) => {
    card.style.display = "block";
  });
}

// Filter category
function filterCategory(category) {
  const cards = document.querySelectorAll(".card");

  cards.forEach((card) => {
    const cardCategory = card.getAttribute("data-category");

    if (category === "all" || cardCategory === category) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

//Toggle menu
function toggleMenu() {
  const nav = document.getElementById("navMenu");

  nav.classList.toggle("active");
}

document.querySelectorAll("#navMenu a").forEach((link) => {
  link.addEventListener("click", () => {
    document.getElementById("navMenu").classList.remove("active");
  });
});


fetch("privacy-policy.html")
.then(res => res.text())
.then(data => {
document.getElementById("privacy-container").innerHTML = data;
});