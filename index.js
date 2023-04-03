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

    window.location.href = link.getAttribute('href');
  })
);

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
const openHamburgerMenu = () => {
  console.log('open hamburger menu');
};

const closeHamburgerMenu = () => {
  console.log('close hamburger menu');
};
