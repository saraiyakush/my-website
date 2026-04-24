// Initialize theme from localStorage, default to light
const theme = (() => {
  if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
    return localStorage.getItem('theme');
  }
  return 'light';
})();

if (theme === 'dark') {
  document.documentElement.setAttribute('data-theme', 'dark');
}

// Toggle theme on button click
document.getElementById('theme-toggle')?.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  if (newTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }

  localStorage.setItem('theme', newTheme);
});
