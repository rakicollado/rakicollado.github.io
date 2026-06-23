const page = document.body.dataset.page;
const links = document.querySelectorAll('.nav-link');

links.forEach((link) => {
  if (link.dataset.page === page) {
    link.classList.add('active');
  }
});

const year = document.querySelector('[data-year]');
if (year) {
  year.textContent = new Date().getFullYear();
}

const profileImage = document.querySelector('.avatar-frame img');
const initials = document.querySelector('.initials');

if (profileImage) {
  profileImage.addEventListener('error', () => {
    profileImage.style.display = 'none';
    if (initials) initials.style.display = 'block';
  });

  profileImage.addEventListener('load', () => {
    if (initials) initials.style.display = 'none';
  });
}
