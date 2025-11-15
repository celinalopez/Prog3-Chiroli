import "./style.css";


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

        const section = document.getElementById(targetId);
        if (section) {
            const offsetTop = section.offsetTop - 24;

            window.scrollTo({
                top: offsetTop,
                behavior: "smooth",
            });
        }
    });
});



//  ANIMACION DE SCROLL REVEAL POR SECCIONES

const sectionObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            const section = entry.target as HTMLElement;

            // La seccion entra en vista entonces se hace visible
            section.classList.add("is-visible");

            // Revelar hijos genericos
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

// Conectar observer a todas las secciones y marcar hijos revelables
sectionsArray.forEach((section) => {
    const children = section.querySelectorAll(
        "p, h3, .project-card, .stat, .skill-icon, .timeline-item, .contact-item, .contact-form, .timeline-item"
    );
    children.forEach((child) => child.classList.add("reveal-child"));

    sectionObserver.observe(section);
});

//  SCROLL REVEAL PARA ABOUT-CARDS

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

// efecto cascada
aboutCards.forEach((card, index) => {
    card.classList.add("reveal-child");
    card.style.setProperty("--i", index.toString());
    aboutCardObserver.observe(card);
});

//  NAV ACTIVO SEGUN SCROLL

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
        if (btn.dataset.target  == currentId) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });
};

// Actualizar al cargar y al scrollear
window.addEventListener("scroll", updateActiveNav);
window.addEventListener("load", () => {
    updateActiveNav();
    sectionsArray[0]?.classList.add("is-visible");
});
updateActiveNav();


//  FORMULARIO DE CONTACTO

const contactForm = document.querySelector<HTMLFormElement>("#contact-form");
if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("¡Gracias por tu mensaje! Me pondré en contacto pronto");
        contactForm.reset();
    });
}
