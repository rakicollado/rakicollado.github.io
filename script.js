const page = document.body.dataset.page;

document.querySelectorAll('.navbar a').forEach((link) => {
  const target = link.dataset.page;
  if (target === page) link.classList.add('active');
});

const resumeButton = document.querySelector('[data-download-resume]');

if (resumeButton) {
  resumeButton.addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = 'assets/resume.pdf';
    link.download = 'Rho-Anne-Collado-Resume.pdf';
    document.body.appendChild(link);
    link.click();
    link.remove();
  });
}
