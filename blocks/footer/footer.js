import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);

  const footerSecMeta = getMetadata('footersec');
  const footerSecPath = footerSecMeta ? new URL(footerSecMeta, window.location).pathname : '/footersec';
  const fragmentSec = await loadFragment(footerSecPath);

  // decorate footer DOM
  block.textContent = '';
  const footer = document.createElement('div');
  const footerSec = document.createElement('div');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);
  while (fragmentSec.firstElementChild) footerSec.append(fragmentSec.firstElementChild);

  block.append(footer);
  block.append(footerSec);

  const currentPage = window.location.pathname.split('/');
  const menuFooterLinks = document.querySelectorAll('.footersec a');

  if (currentPage.length > 1 && currentPage[1] !== '') {
    menuFooterLinks.forEach((link) => {
      const linkPage = link.getAttribute('href');
      if (linkPage.includes(currentPage[1])) {
        link.closest('p').classList.add('footer-active');
      }
    });
  } else {
    menuFooterLinks.forEach((link) => {
      const listItem = link.closest('p');
      listItem.classList.remove('footer-active');
    });
  }

  const signupBlock = document.querySelector('.signup-block');
  if (signupBlock) {
    signupBlock.classList.add('hide');
  }

  window.addEventListener('click', (e) => {
    const signinBlock = document.querySelector('.signin');
    if (signupBlock && signinBlock) {
      if (!signupBlock.contains(e.target) && !signinBlock.contains(e.target)) {
        if (signupBlock.classList.contains('show')) {
          signupBlock.classList.remove('show');
          signupBlock.classList.add('hide');
        }
      }
    }
  });
}
