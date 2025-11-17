// add delayed functionality here

const signinBlock = document.querySelectorAll('.signin');
if (signinBlock.length === 1) {
  const signupBtn = signinBlock[0].querySelector('button');
  if (signupBtn) {
    signupBtn.addEventListener('click', () => {
      const signupBlock = document.querySelector('.signup-block');
      if (signupBlock.classList.contains('hide')) {
        signupBlock.classList.remove('hide');
        signupBlock.classList.add('show');
      } else {
        signupBlock.classList.remove('show');
        signupBlock.classList.add('hide');
      }
    });
  }
}

// to find menu active header section
const currentPage = window.location.pathname.split('/');
const menuLinks = document.querySelectorAll('.header a');

if (currentPage.length > 1 && currentPage[1] !== '') {
  menuLinks.forEach((link) => {
    const linkPage = link.getAttribute('href');
    if (linkPage.includes(currentPage[1])) {
      link.closest('li').classList.add('active');
    }
  });
} else {
  menuLinks.forEach((link) => {
    const listItem = link.closest('li');
    listItem.classList.remove('active');
  });
}

// footer section
const menuFooterLinks = document.querySelectorAll('.footer a');

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
