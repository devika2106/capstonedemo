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


 

 
}
