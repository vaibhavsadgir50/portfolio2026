const root = document.body.style;

const scroll = () => {
  const position = window.pageYOffset / (document.body.offsetHeight - window.innerHeight);
  root.setProperty('--scroll', position);
};

document.addEventListener('DOMContentLoaded', () => {
  scroll();
  window.addEventListener('scroll', scroll, false);
});