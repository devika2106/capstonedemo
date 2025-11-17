export default function decorate(block) {
  block.classList.add('authorWrapperDiv');
  const classes = ['authorphoto', 'authordetails', 'authorsociallinks'];
  classes.forEach((c, i) => {
    block.children[i].classList.add(c);
  });
}
