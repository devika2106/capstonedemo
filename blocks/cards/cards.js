import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
      else div.className = 'cards-card-body';
    });
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.replaceChildren(ul);

  const aboutusCards = document.querySelectorAll('.aboutuscards');
  if (aboutusCards) {
    aboutusCards.forEach((cards) => {
      const listElements = cards.querySelectorAll('.cards-card-body');
      listElements.forEach((listElement) => {
        if (!listElement.querySelector('.socialcontainer')) {
          const container = document.createElement('div');
          container.className = 'socialcontainer';
          const paragraphs = listElement.querySelectorAll('p');
          if (paragraphs) {
            paragraphs.forEach((p) => container.appendChild(p));
            listElement.appendChild(container);
          }
        }
      });
    });
  }
}
