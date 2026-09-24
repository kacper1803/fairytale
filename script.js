document.addEventListener("DOMContentLoaded", () => {

    const navbar = document.querySelector(".navbar");
    const cursorLight = document.querySelector(".cursor-light");
    const mobileMenuButton = document.querySelector(".mobile-menu-btn");
    const desktopNav = document.querySelector(".desktop-nav");
    const navLinks = document.querySelectorAll(".desktop-nav a");
    const sections = document.querySelectorAll("main section");
    const progressBar = document.querySelector(".scroll-progress");

    const revealElements = document.querySelectorAll(
        ".section-heading, .about-grid, .service-card, .gallery-item, .barber-card, .review, .booking-content, .contact-grid"
    );

    const footerYear = document.querySelector("[data-year]");


    /* =========================
       NAVBAR
    ========================= */

    function updateNavbar() {

        if (!navbar) return;

        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    }

    updateNavbar();

    window.addEventListener(
        "scroll",
        updateNavbar,
        { passive: true }
    );


    /* =========================
       SCROLL PROGRESS
    ========================= */

    function updateScrollProgress() {

        if (!progressBar) return;

        const scrollTop = window.scrollY;

        const documentHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;

        if (documentHeight <= 0) {
            progressBar.style.width = "0%";
            return;
        }

        const progress =
            (scrollTop / documentHeight) * 100;

        progressBar.style.width =
            `${Math.min(progress, 100)}%`;
    }

    updateScrollProgress();

    window.addEventListener(
        "scroll",
        updateScrollProgress,
        { passive: true }
    );


    /* =========================
       CURSOR LIGHT
    ========================= */

    if (
        cursorLight &&
        window.matchMedia("(hover: hover)").matches
    ) {

        let mouseX = 0;
        let mouseY = 0;

        let lightX = 0;
        let lightY = 0;

        document.addEventListener("mousemove", (event) => {

            mouseX = event.clientX;
            mouseY = event.clientY;

            cursorLight.style.opacity = "1";
        });

        document.addEventListener("mouseleave", () => {

            cursorLight.style.opacity = "0";
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
    }


    /* =========================
       SCROLL REVEAL
    ========================= */

    if (revealElements.length) {

        const revealObserver =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach((entry) => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "visible"
                            );

                            revealObserver.unobserve(
                                entry.target
                            );
                        }
                    });

                },
                {
                    threshold: 0.12,
                    rootMargin: "0px 0px -40px 0px"
                }
            );

        revealElements.forEach((element) => {

            element.classList.add("reveal");

            revealObserver.observe(element);
        });
    }


    /* =========================
       ACTIVE NAVIGATION
    ========================= */

    if (
        sections.length &&
        navLinks.length
    ) {

        const sectionObserver =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach((entry) => {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        const sectionId =
                            entry.target.getAttribute("id");

                        navLinks.forEach((link) => {

                            link.classList.remove(
                                "active"
                            );

                            if (
                                link.getAttribute("href") ===
                                `#${sectionId}`
                            ) {

                                link.classList.add(
                                    "active"
                                );
                            }
                        });
                    });

                },
                {
                    threshold: 0.35,
                    rootMargin: "-90px 0px -35% 0px"
                }
            );

        sections.forEach((section) => {

            if (section.id) {
                sectionObserver.observe(section);
            }
        });
    }


    /* =========================
       MOBILE MENU
    ========================= */

    if (
        mobileMenuButton &&
        desktopNav
    ) {

        mobileMenuButton.addEventListener(
            "click",
            () => {

                const isOpen =
                    desktopNav.classList.toggle("open");

                mobileMenuButton.setAttribute(
                    "aria-expanded",
                    String(isOpen)
                );

                mobileMenuButton.setAttribute(
                    "aria-label",
                    isOpen
                        ? "Zamknij menu"
                        : "Otwórz menu"
                );
            }
        );


        navLinks.forEach((link) => {

            link.addEventListener(
                "click",
                () => {

                    desktopNav.classList.remove(
                        "open"
                    );

                    mobileMenuButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    mobileMenuButton.setAttribute(
                        "aria-label",
                        "Otwórz menu"
                    );
                }
            );
        });


        document.addEventListener(
            "click",
            (event) => {

                if (
                    !desktopNav.contains(event.target) &&
                    !mobileMenuButton.contains(event.target)
                ) {

                    desktopNav.classList.remove(
                        "open"
                    );

                    mobileMenuButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    mobileMenuButton.setAttribute(
                        "aria-label",
                        "Otwórz menu"
                    );
                }
            }
        );
    }


    /* =========================
       SMOOTH SCROLL
    ========================= */

    navLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const href =
                link.getAttribute("href");

            if (
                !href ||
                !href.startsWith("#")
            ) {
                return;
            }

            const target =
                document.querySelector(href);

            if (!target) {
                return;
            }

            event.preventDefault();

            const navbarHeight =
                navbar
                    ? navbar.offsetHeight
                    : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });
        });
    });


    /* =========================
       FOOTER YEAR
    ========================= */

    if (footerYear) {

        footerYear.textContent =
            new Date().getFullYear();
    }


    /* =========================
       ESCAPE
    ========================= */

    document.addEventListener(
        "keydown",
        (event) => {

            if (event.key !== "Escape") {
                return;
            }

            if (!desktopNav) {
                return;
            }

            desktopNav.classList.remove(
                "open"
            );

            if (mobileMenuButton) {

                mobileMenuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

                mobileMenuButton.setAttribute(
                    "aria-label",
                    "Otwórz menu"
                );
            }
        }
    );

});