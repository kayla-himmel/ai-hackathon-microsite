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
  document.body.classList.add('-navOpen');
  hamburgerMenuCloseButton.focus();
  hamburgerMenu.addEventListener('keydown', (e) => trapHamburgerMenuFocus(e));
};

const closeHamburgerMenu = () => {
  hamburgerMenu.classList.remove('-open');
  document.body.classList.remove('-navOpen');
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

// TOP NAVIGATION LINKS
const userIsAtBottomOfPage = () => {
  return window.innerHeight + window.pageYOffset >= document.body.offsetHeight;
};

const userIsAtSection = (section) => {
  const sectionTop = section.offsetTop;
  const sectionHeight = section.offsetHeight;

  return (
    window.pageYOffset >= sectionTop &&
    window.pageYOffset < sectionTop + sectionHeight - 1
  );
};

const setSectionNavLinkAsActive = (section) => {
  const sectionId = section.id === 'hero' ? 'home' : section.id;
  const sectionNavLink = document.querySelectorAll(
    `.site-nav-links li a[href="#${sectionId}"]`
  )[0];
  const sectionNavLinkIsNotActive =
    !sectionNavLink.classList.contains('-active');

  if (sectionNavLinkIsNotActive) {
    clearActiveLinkStyles();
    addActiveLinkStyles(sectionNavLink);
  }
};

window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');

  if (userIsAtBottomOfPage()) {
    setSectionNavLinkAsActive(sections[sections.length - 1]);
    return;
  }

  sections.forEach((section) => {
    if (userIsAtSection(section)) {
      setSectionNavLinkAsActive(section);
    }
  });
});
