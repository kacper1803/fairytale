const moon = document.querySelector(".moon");

document.addEventListener("mousemove", (event) => {

    const x =
        (event.clientX / window.innerWidth - 0.5) * 20;

    const y =
        (event.clientY / window.innerHeight - 0.5) * 20;

    moon.style.transform =
        `translate(${x}px, ${y - 80}px)`;

});