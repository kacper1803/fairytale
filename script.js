
const moon = document.querySelector(".moon");


/* =========================
   MOUSE PARALLAX
========================= */

document.addEventListener("mousemove", (event) => {

    const x =
        (event.clientX / window.innerWidth - 0.5) * 20;

    const y =
        (event.clientY / window.innerHeight - 0.5) * 20;

    moon.style.transform =
        `translate(${x}px, ${y - 80}px)`;
});


/* =========================
   SCROLL REVEAL
========================= */

const revealElements = document.querySelectorAll(
    ".about-content, .journey-header, .journey-card, .projects-header, .project-card, .contact-content"
);

const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                observer.unobserve(entry.target);
            }

        });

    },
    {
        threshold: 0.15
    }
);

revealElements.forEach((element) => {

    element.classList.add("reveal");

    observer.observe(element);

});


/* =========================
   CURSOR LIGHT
========================= */

const cursorLight =
    document.createElement("div");

cursorLight.className =
    "cursor-light";

document.body.appendChild(cursorLight);


let mouseX = 0;
let mouseY = 0;

let lightX = 0;
let lightY = 0;


document.addEventListener("mousemove", (event) => {

    mouseX = event.clientX;
    mouseY = event.clientY;

});


function animateCursorLight() {

    lightX +=
        (mouseX - lightX) * 0.12;

    lightY +=
        (mouseY - lightY) * 0.12;

    cursorLight.style.left =
        `${lightX}px`;

    cursorLight.style.top =
        `${lightY}px`;

    requestAnimationFrame(
        animateCursorLight
    );
}


animateCursorLight();


/* =========================
   PROJECT CARD LIGHT
========================= */

const projectCards = document.querySelectorAll(".project-card");

projectCards.forEach((card) => {

    card.addEventListener("mousemove", (event) => {

        const rect = card.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);

    });

});


/* =========================
   ACTIVE NAVIGATION
========================= */

const sections = document.querySelectorAll("main section");
const navLinks = document.querySelectorAll(".navbar nav a");

const activeSectionObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                navLinks.forEach((link) => {
                    link.classList.remove("active");
                });

                const activeLink = document.querySelector(
                    `.navbar nav a[href="#${entry.target.id}"]`
                );

                if (activeLink) {
                    activeLink.classList.add("active");
                }

            }

        });

    },
    {
        threshold: 0.45
    }
);

sections.forEach((section) => {
    activeSectionObserver.observe(section);
});


