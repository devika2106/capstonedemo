export default function decorate(block) {
  block.classList.add('author-wrapper-div');
  const classes = ['authorphoto', 'authordetails', 'authorsociallinks'];
  classes.forEach((c, i) => {
    block.children[i].classList.add(c);
  });
}
