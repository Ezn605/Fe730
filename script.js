const menuButton = document.querySelector('.menu-button');
const overlay = document.getElementById('nav-overlay');
const heroRotator = document.querySelector('.hero-rotator');
const menuBars = document.querySelectorAll('.menu-button span');
const closeTargets = overlay.querySelectorAll('[data-close]');
const navLinks = overlay.querySelectorAll('.nav-link');

const heroPhrases = ['Co-Founder', '4th year student', 'Name'];
const typingSpeed = 1;
let heroPhraseIndex = 0;
let heroCharacterIndex = 0;
let isDeleting = false;
let heroTimerId = null;
let menuCloseTimerId = null;

function rotateHeroText() {
  if (!heroRotator) {
    return;
  }

  const currentPhrase = heroPhrases[heroPhraseIndex];
  const nextCharacterCount = isDeleting ? heroCharacterIndex - 1 : heroCharacterIndex + 1;

  heroRotator.textContent = currentPhrase.slice(0, nextCharacterCount);
  heroCharacterIndex = nextCharacterCount;

  let delay = (isDeleting ? 85 : 120) * typingSpeed;

  if (!isDeleting && heroCharacterIndex === currentPhrase.length) {
    delay = 1200 * typingSpeed;
    isDeleting = true;
  } else if (isDeleting && heroCharacterIndex === 0) {
    isDeleting = false;
    heroPhraseIndex = (heroPhraseIndex + 1) % heroPhrases.length;
    delay = 320 * typingSpeed;
  }

  heroTimerId = window.setTimeout(rotateHeroText, delay);
}

function setMenuIconState(isOpen) {
  if (menuBars.length < 2) {
    return;
  }

  if (isOpen) {
    menuBars[0].style.transform = 'translateY(7px) rotate(45deg)';
    menuBars[1].style.transform = 'translateY(-7px) rotate(-45deg)';
  } else {
    menuBars[0].style.transform = '';
    menuBars[1].style.transform = '';
  }
}

function setMenuOpen(isOpen) {
  if (menuCloseTimerId) {
    window.clearTimeout(menuCloseTimerId);
    menuCloseTimerId = null;
  }

  if (isOpen) {
    overlay.hidden = false;
    overlay.classList.remove('is-closing');
  } else {
    overlay.classList.add('is-closing');
    menuCloseTimerId = window.setTimeout(() => {
      overlay.hidden = true;
      overlay.classList.remove('is-closing');
      menuCloseTimerId = null;
    }, 320);
  }

  document.body.classList.toggle('menu-open', isOpen);
  menuButton.classList.toggle('is-open', isOpen);
  setMenuIconState(isOpen);
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
}

menuButton.addEventListener('click', () => {
  setMenuOpen(overlay.hidden);
});

closeTargets.forEach((target) => {
  target.addEventListener('click', () => setMenuOpen(false));
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => setMenuOpen(false));
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !overlay.hidden) {
    setMenuOpen(false);
  }
});

if (heroRotator) {
  heroRotator.textContent = heroPhrases[0];
}

if (heroTimerId) {
  window.clearTimeout(heroTimerId);
}

window.setTimeout(rotateHeroText, 900 * typingSpeed);

setMenuOpen(false);
