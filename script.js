/////////////////////////
///// DOM elements

// Tab - winners
const tabBtnsContainer = document.querySelector('.tab-btns');
const allTabBtns = document.querySelectorAll('.tab');
const allTabContents = document.querySelectorAll('.content');

// Slides - news
const allSlides = document.querySelectorAll('.slide');
const btnsChangeSlide = document.querySelectorAll('.btns-slide');
const allDots = document.querySelectorAll('.dot');
const dotsContainer = document.querySelector('.dots');

// Flowing sections
const allContainers = document.querySelectorAll('.container');

// Film window
const overlay = document.querySelector('.overlay');
const closeBtn = document.querySelector('.fa-xmark');
const filmTitle = document.querySelector('.film-title');
const filmDesc = document.querySelector('.film-desc');

// Form window
const formOverlay = document.querySelector('.form-overlay');
const form = document.querySelector('.form');
const btnSend = document.querySelector('input[type="submit"]');
const btnForm = document.querySelector('.btn-form');

// Links
const btnLinks = document.querySelector('.btn-links');
const linksView = document.querySelector('.links-view');

/////////////////////////
///// Tab buttons

tabBtnsContainer.addEventListener('click', function (e) {
  const btn = e.target.closest('.tab');
  if (!btn) return;

  // activate correct tab button
  allTabBtns.forEach((el) => el.classList.remove('active-tab'));
  btn.classList.add('active-tab');

  // set content
  allTabContents.forEach((el) => el.classList.add('hidden'));
  document.querySelector(`.${btn.dataset.content}`).classList.remove('hidden');
});

/////////////////////////
///// News slider

let curSlide = 1;
manageSlides();
addBtnHandlers();
addDotsHandler();

function manageSlides(x = 1) {
  allSlides.forEach((el, i) => {
    const transVal = (i + 1 - x) * 100;
    el.style.transform = `translateX(${transVal}%)`;
  });
  curSlide = x;
}

function manageDots(x = 1) {
  allDots.forEach((el) => el.classList.remove('marked'));
  allDots[x - 1].classList.add('marked');
}

function addBtnHandlers() {
  btnsChangeSlide.forEach((el) =>
    el.addEventListener('click', function (e) {
      const btn = e.target.closest('.btns-slide');

      if (btn.classList.contains('btn-prev')) curSlide--;
      if (btn.classList.contains('btn-next')) curSlide++;

      if (curSlide > allSlides.length) curSlide = 1;
      if (curSlide < 1) curSlide = allSlides.length;

      manageDots(curSlide);
      manageSlides(curSlide);
    })
  );
}

function addDotsHandler() {
  dotsContainer.addEventListener('click', function (e) {
    const dot = e.target.closest('.dot');
    if (!dot) return;

    manageDots(+dot.dataset.val);
    manageSlides(+dot.dataset.val);
  });
}

/////////////////////////
///// Flowing sections

const obsOptions = {
  root: null,
  treshold: 0.1,
  rootMargin: '150px',
};
function loadSection(entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.style.transform = 'translateY(0%)';
  observer.unobserve(entry.target);
}

const observer = new IntersectionObserver(loadSection, obsOptions);
allContainers.forEach((el) => observer.observe(el));

/////////////////////////
///// Film window

closeBtn.addEventListener('click', closeWindow);
overlay.addEventListener('click', closeWindow);
overlay.firstElementChild.addEventListener('click', function (e) {
  e.stopPropagation();
});

window.addEventListener('hashchange', function () {
  const txt = window.location.hash;
  if (!txt.startsWith('#bf')) return;

  overlay.classList.remove('hidden');
  const title = txt.slice(4);
  filmTitle.textContent = title.replaceAll('-', ' ');
  filmDesc.textContent = filmData.get(title);
});

function closeWindow() {
  overlay.classList.add('hidden');
  window.location.hash = 'main';
}

/////////////////////////
///// Form window

formOverlay.addEventListener('click', () =>
  formOverlay.classList.add('hidden')
);
formOverlay.firstElementChild.addEventListener('click', function (e) {
  e.stopPropagation();
});
form.addEventListener('submit', function (e) {
  e.preventDefault();
  form.querySelectorAll('[id]').forEach((el) => (el.value = ''));
  formOverlay.classList.add('hidden');
});

btnForm.addEventListener('click', () => formOverlay.classList.remove('hidden'));

/////////////////////////
///// Links

btnLinks.addEventListener('click', function (e) {
  e.preventDefault();
  btnLinks.classList.add('hidden');
  linksView.classList.remove('hidden');
  linksView.classList.add('show-anim');
});

/////////////////////////
///// Refresh page

function init() {
  document.querySelector('.main-header').scrollIntoView(true);
}
init();
