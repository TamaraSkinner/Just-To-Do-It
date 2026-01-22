document.addEventListener("click", e => {
    const tab = e.target.closest(".tab");
    if (!tab) return;
    
    document.querySelectorAll(".tab").forEach(t => {
        t.classList.remove("is-active");
        t.setAttribute("aria-selected", "false");
    });

    tab.classList.add("is-active");
    tab.setAttribute("aria-selected", "true");

    const tabColor = getComputedStyle(tab).backgroundColor;
    document.documentElement.style.setProperty('--tab-bg-active', tabColor);
});


