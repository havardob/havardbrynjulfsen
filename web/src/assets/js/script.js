const html = document.documentElement;
const themeToggle = document.getElementById('themeToggle');

themeToggle.addEventListener('click', function(){
    html.classList.toggle('dark-theme');
})