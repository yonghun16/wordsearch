document.querySelectorAll('.badge').forEach(badge => {
  badge.addEventListener('click', () => {
    document.querySelector('body').classList.toggle('body--dark-mode');
    badge.classList.toggle('badge--bg-white');
    document.querySelectorAll('.img-sun')[0].classList.toggle('hidden');
    document.querySelector('.img-moon-light').classList.toggle('hidden');
    document.querySelectorAll('.img-sun')[1].classList.toggle('hidden');
    document.querySelector('.img-moon').classList.toggle('hidden');
  });
});
