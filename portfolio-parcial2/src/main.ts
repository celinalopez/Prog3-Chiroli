import "./style.css";

// UTIL: SCROLL A SECCIÓN

const scrollToSection = (targetId: string) => {
    if (!targetId) return;

    const section = document.getElementById(targetId);
    if (!section) return;

    const offset = window.innerWidth <= 1080 ? 72 : 24;

    const offsetTop = section.offsetTop - offset;

    window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
    });
};

// NAV LATERAL (DESKTOP)

const iconButtons = document.querySelectorAll<HTMLButtonElement>(".icon-link");

// Secciones principales
const sections = document.querySelectorAll<HTMLElement>(
    "#inicio, #about, #skills, #projects, #experience, #contact"
);
const sectionsArray = Array.from(sections);

// Scroll suave al hacer click en un icono del sidebar
iconButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        const targetId = btn.dataset.target;
        if (!targetId) return;
        scrollToSection(targetId);
    });
});

// ANIMACIÓN DE SECCIONES

const sectionObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            const section = entry.target as HTMLElement;
            section.classList.add("is-visible");

            const children = section.querySelectorAll(".reveal-child");
            children.forEach((child, index) => {
                const el = child as HTMLElement;

                // Stats del inicio: cascada
                if (el.classList.contains("stat")) {
                    el.style.setProperty("--i", index.toString());
                }

                if (!el.classList.contains("about-card")) {
                    el.classList.add("visible");
                }
            });
        });
    },
    {
        root: null,
        threshold: 0.25,
    }
);

sectionsArray.forEach((section) => {
    const children = section.querySelectorAll(
        "p, h3, .project-card, .stat, .skill-icon, .timeline-item, .contact-item, .contact-form, .timeline-item"
    );
    children.forEach((child) => child.classList.add("reveal-child"));

    sectionObserver.observe(section);
});

// SCROLL REVEAL PARA ABOUT-CARDS

const aboutCardObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const card = entry.target as HTMLElement;
            card.classList.add("visible");
        });
    },
    {
        root: null,
        threshold: 0.2,
    }
);

const aboutCards = document.querySelectorAll<HTMLElement>(".about-card");

aboutCards.forEach((card, index) => {
    card.classList.add("reveal-child");
    card.style.setProperty("--i", index.toString());
    aboutCardObserver.observe(card);
});

// NAV ACTIVO SEGÚN SCROLL

const updateActiveNav = () => {
    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;
    const targetLine = scrollY + viewportHeight * 0.3;

    let currentId: string | null = null;

    sectionsArray.forEach((section) => {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;

        if (targetLine >= top && targetLine < bottom) {
            currentId = section.id;
        }
    });

    if (!currentId) return;

    iconButtons.forEach((btn) => {
        if (btn.dataset.target === currentId) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });
};

window.addEventListener("scroll", updateActiveNav);
window.addEventListener("load", () => {
    updateActiveNav();
    sectionsArray[0]?.classList.add("is-visible");
});
updateActiveNav();

// FORMULARIO DE CONTACTO

const contactForm = document.querySelector<HTMLFormElement>("#contact-form");
if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("¡Gracias por tu mensaje! Me pondré en contacto pronto");
        contactForm.reset();
    });
}

// MENÚ MOBILE

const mobileMenuToggle =
    document.querySelector<HTMLButtonElement>("#mobile-menu-toggle");
const mobileMenuOverlay =
    document.querySelector<HTMLDivElement>("#mobile-menu");
const mobileMenuClose =
    document.querySelector<HTMLButtonElement>("#mobile-menu-close");
const mobileMenuBackdrop =
    document.querySelector<HTMLDivElement>(".mobile-menu-backdrop");
const mobileMenuItems =
    document.querySelectorAll<HTMLButtonElement>(".mobile-menu-item");

const openMobileMenu = () => {
    if (!mobileMenuOverlay || !mobileMenuToggle) return;

    mobileMenuOverlay.classList.add("open");
    mobileMenuToggle.classList.add("is-open");
    document.body.classList.add("menu-open");
};

const closeMobileMenu = () => {
    if (!mobileMenuOverlay || !mobileMenuToggle) return;

    mobileMenuOverlay.classList.remove("open");
    mobileMenuToggle.classList.remove("is-open");
    document.body.classList.remove("menu-open");
};

mobileMenuToggle?.addEventListener("click", () => {
    if (!mobileMenuOverlay) return;

    const isOpen = mobileMenuOverlay.classList.contains("open");
    if (isOpen) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
});

mobileMenuClose?.addEventListener("click", () => {
    closeMobileMenu();
});

mobileMenuBackdrop?.addEventListener("click", () => {
    closeMobileMenu();
});

// Cerrar con ESC
window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeMobileMenu();
    }
});

// Click en cada opción del menú mobile: scroll + cerrar menú
mobileMenuItems.forEach((item) => {
    item.addEventListener("click", () => {
        const targetId = item.dataset.target;
        if (targetId) {
            scrollToSection(targetId);
        }
        closeMobileMenu();
    });
});
