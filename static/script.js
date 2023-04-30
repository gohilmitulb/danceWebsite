const link = document.getElementById('NavContact');
const section = document.getElementById('contact');

link.addEventListener('click', (event) => {
  event.preventDefault();
  section.scrollIntoView({ behavior: 'smooth' });
});
