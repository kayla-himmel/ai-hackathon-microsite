// INITIATE AUTH OF THE APP
class App {
  constructor() {
    // Okta sign out event logic
    document.getElementById('sign-out').addEventListener('click', (event) => {
      event.preventDefault();
      this.signIn.authClient.signOut((err) => {
        if (err) {
          return alert(`Error: ${err}`);
        }
        this.showSignIn();
      });
    });
    // Okta sign in event logic
    this.signIn = new OktaSignIn({
      baseUrl: process.env.OKTA_ISSUER,
      clientId: process.env.OKTA_CLIENT_ID,
      redirectUri: window.location.origin,
      authParams: {
        issuer: `${process.env.OKTA_ISSUER}oauth2/default`,
      },
      logo: './assets/WT_logo_black.svg',
      i18n: {
        en: {
          'primaryauth.title': 'Please sign in to see AI Hackathon info',
        },
      },
    });
  }
  // Initialize the sign-in module
  async init() {
    this.signIn.authClient.token
      .getUserInfo()
      .then(() => {
        this.showPage();
      })
      .catch(() => {
        this.showSignIn();
      });
  }
  async showPage() {
    this.render();
    document.getElementById('sign-out').style.display = 'inline-block';
    document.getElementById('protected-content').style.display = 'block';
    this.signIn.remove();
  }
  showSignIn() {
    document.getElementById('sign-out').style.display = 'none';
    document.getElementById('protected-content').style.display = 'none';
    this.signIn
      .showSignInToGetTokens({
        el: '#widget-container',
      })
      .then((tokens) => {
        this.signIn.authClient.tokenManager.setTokens(tokens);
        this.showPage();
      });
  }
  async request(method, url, data = null) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const accessToken = this.signIn.authClient.getAccessToken();
    if (accessToken) {
      headers.append('Authorization', `Bearer ${accessToken}`);
    }

    const response = await fetch(url, {
      method,
      headers,
      body: data ? JSON.stringify(data) : null,
    });

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(`Request failed with status ${response.status}`);
    }
  }
  render() {}
}

let app = new App();
app.init();

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
