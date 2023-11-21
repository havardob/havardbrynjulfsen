document.addEventListener("DOMContentLoaded", function () {
    
    const html = document.documentElement;
    const themeToggle = document.getElementById('themeToggle');
    const menuThemeToggle = document.getElementById('menuThemeToggle');

    themeToggle.addEventListener('click', function () {
        toggleDarkTheme();
    })

    menuThemeToggle.addEventListener('click', function () {
        toggleDarkTheme();
    })
    
    function toggleDarkTheme() {
        html.classList.toggle('dark-theme');
        if (localStorage.getItem('theme') == "dark-theme") {
            localStorage.removeItem('theme')
        } else {
            localStorage.setItem('theme', 'dark-theme')
        }
    }
    
    const menuToggle = document.getElementById('menuToggle');
    const menuContainer = document.getElementById('menuContainer');
    
    menuToggle.addEventListener('click', function () {
        menuToggle.classList.toggle('is-open');
        menuContainer.classList.toggle('is-open');
        html.classList.toggle('menu-is-open');
    })

    function setStoredTheme() {
        let storedTheme = localStorage.getItem("theme");
        html.classList.add(storedTheme);
    }

    document.onload = setStoredTheme();
})