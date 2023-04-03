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
