const heroSectionId = document.getElementById('hero');

const createHero = () => {
  const hero = document.createElement('div');
  hero.innerHTML = `
    <h1>Hero</h1>
    <button>Click me</button>
    <p>Paragraph</p>
    <nav>
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      </ul>
    </nav>
  `;

  return hero;
};

heroSectionId.appendChild(createHero());
