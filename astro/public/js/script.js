document.addEventListener("DOMContentLoaded", function () {

    const html = document.documentElement;

    const menuToggle = document.getElementById('menuToggle');
    const menuContainer = document.getElementById('menuContainer');

    menuToggle.addEventListener('click', function () {
        menuToggle.classList.toggle('is-open');
        menuContainer.classList.toggle('is-open');
        html.classList.toggle('menu-is-open');
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
    
    // Open image dialog
    const imageDialogTriggers = document.querySelectorAll("[data-dialog-trigger]");
    
    imageDialogTriggers?.forEach((trigger) => {
        if (trigger instanceof HTMLElement) {
            trigger.style.cursor = "pointer";
            const dialog = trigger.nextElementSibling;
            const closeButton = dialog?.querySelector("button");
            trigger.addEventListener("click", () => {
                html.style.overflowY = "hidden";
                if (dialog instanceof HTMLDialogElement) {
                    dialog.showModal();
                    closeDialogListener(dialog);
                }
            });
            
            closeButton?.addEventListener("click", () => {
                html.style.overflowY = "initial";
                if (dialog instanceof HTMLDialogElement) {
                    dialog.close();
                }
            })
        }
    });
    
    const closeDialogListener = (dialogElement) => document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            html.style.overflowY = "initial";
            dialogElement.close();
        }
    })
})