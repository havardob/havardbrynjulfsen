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
        html.classList.toggle('theme-inverted');
        if (localStorage.getItem('theme') === "theme-inverted") {
            localStorage.removeItem('theme')
        } else {
            localStorage.setItem('theme', 'theme-inverted')
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
        if (storedTheme) {
            html.classList.add(storedTheme);
        }
    }

    document.onload = setStoredTheme();


    // Open image dialog
    const imageDialogTriggers = document.querySelectorAll("[data-dialog-trigger]");

    if (imageDialogTriggers.length > 0) {
        imageDialogTriggers.forEach(trigger => {
            trigger.style.cursor = "pointer";
            const dialog = trigger.nextElementSibling;
            const closeButton = dialog.querySelector("button");
            trigger.addEventListener("click", () => {
                html.style.overflowY = "hidden";
                dialog.showModal();
                closeDialogListener(dialog);
            });

            closeButton.addEventListener("click", () => {
                html.style.overflowY = "initial";
                dialog.close();
            })
        });
    }

    const closeDialogListener = (dialogElement) => document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            html.style.overflowY = "initial";
            dialogElement.close();
        }
    })

    const dropdownMenuToggles = document.querySelectorAll("[data-dropdown-toggle]");

    if (dropdownMenuToggles.length > 0) {
        dropdownMenuToggles.forEach(toggle => {
            const button = toggle.querySelector("button");
            const dropdown = toggle.querySelector("ul");

            button.addEventListener('click', (event) => {
                event.stopPropagation();
                dropdown.classList.add('is-open');
                button.classList.add('is-open');
            })

            document.addEventListener("click", (event) => {
                if (event.target !== dropdown) {
                    dropdown.classList.remove("is-open");
                    button.classList.remove("is-open");
                }
            });

            document.addEventListener("focusin", (event) => {
                if (!dropdown.contains(event.target)) {
                    dropdown.classList.remove("open");
                }
            });
        })
    }
})