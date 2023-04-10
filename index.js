// SOCIAL NAVIGATION
const socialLinks = document.querySelectorAll('.social-nav a');

const onSocialLinkFocus = (focusedLink) => {
  socialLinks.forEach((link) => {
    link.style.opacity = 0.25;
  });
  focusedLink.style.opacity = 1;
};

socialLinks.forEach((link) => {
  ['focus', 'mouseover'].forEach((event) => {
    link.addEventListener(event, () => onSocialLinkFocus(link));
  });
});

const onSocialLinkBlur = () => {
  socialLinks.forEach((link) => {
    link.style.opacity = 1;
  });
};

socialLinks.forEach((link) => {
  ['blur', 'mouseout'].forEach((event) => {
    link.addEventListener(event, () => onSocialLinkBlur());
  });
});

// HAMBURGER MENU
const hamburgerMenu = document.querySelector('.site-nav');

const trapHamburgerMenuFocus = (e) => {
  const tabIsPressed = e.key === 'Tab' || e.keyCode === 9;
  const focusableElements = hamburgerMenu.querySelectorAll('a[href], button');
  const firstFocusableElement = focusableElements[0];
  const lastFocusableElement = focusableElements[focusableElements.length - 1];

  if (tabIsPressed) {
    // shift + tab
    if (e.shiftKey) {
      if (document.activeElement === firstFocusableElement) {
        lastFocusableElement.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastFocusableElement) {
        firstFocusableElement.focus();
        e.preventDefault();
      }
    }
  }
};

const openHamburgerMenu = () => {
  const hamburgerMenuCloseButton = document.getElementById(
    'hamburgerNavCloseButton'
  );

  hamburgerMenu.classList.add('-open');
  hamburgerMenuCloseButton.focus();
  hamburgerMenu.addEventListener('keydown', (e) => trapHamburgerMenuFocus(e));
};

const closeHamburgerMenu = () => {
  hamburgerMenu.classList.remove('-open');
  hamburgerMenu.removeEventListener('keydown', (e) =>
    trapHamburgerMenuFocus(e)
  );
};

// SITE NAVIGATION
const siteNavLinks = document.querySelectorAll('.site-nav-links a');
const clearActiveLinkStyles = () => {
  siteNavLinks.forEach((link) => link.classList.remove('-active'));
};
const addActiveLinkStyles = (activeLink) => {
  activeLink.classList.add('-active');
};

siteNavLinks.forEach((link) =>
  link.addEventListener('click', (e) => {
    e.preventDefault();

    clearActiveLinkStyles();
    addActiveLinkStyles(link);

    if (hamburgerMenu.classList.contains('-open')) {
      closeHamburgerMenu();
    }

    window.location.href = link.getAttribute('href');
  })
);

// COPYRIGHT YEAR
const copyrightYearElements = document.querySelectorAll('.copyrightYear');
const currentYear = new Date().getFullYear();

copyrightYearElements.forEach((element) => {
  element.innerHTML = currentYear;
});
