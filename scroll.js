/* =========================
   BARRA DE PROGRESO
   ========================= */

const barraProgreso = document.getElementById("progress");
const btnVolverArriba = document.getElementById("volverArriba");

function actualizarScroll() {

    const max = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

    const porcentaje = max > 0 ? (scrollTop / max) * 100 : 0;

    barraProgreso.style.width = porcentaje + "%";

    btnVolverArriba.classList.toggle("visible", scrollTop > 450);
}

window.addEventListener("scroll", actualizarScroll, { passive: true });
window.addEventListener("resize", actualizarScroll);
actualizarScroll();

btnVolverArriba.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

/* =========================
   TEMA CLARO / OSCURO
   ========================= */

const botonTema = document.getElementById("tema");

function pintarBotonTema() {
    const claro = document.documentElement.classList.contains("modo-claro");
    botonTema.textContent = claro ? "☀️" : "🌙";
    botonTema.title = claro ? "Modo oscuro" : "Modo claro";
}

botonTema.addEventListener("click", () => {

    document.documentElement.classList.toggle("modo-claro");

    try {
        const claro = document.documentElement.classList.contains("modo-claro");
        localStorage.setItem("tema", claro ? "claro" : "oscuro");
    } catch (e) { }

    pintarBotonTema();
});

pintarBotonTema();

/* =========================
   LINK ACTIVO AL SCROLLEAR
   ========================= */

const links = [...document.querySelectorAll(".nav-menu a")];

const secciones = links
    .map(a => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

if ("IntersectionObserver" in window && secciones.length) {

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            links.forEach(a => {
                a.classList.toggle(
                    "activo",
                    a.getAttribute("href") === "#" + entry.target.id
                );
            });
        });

    }, { rootMargin: "-45% 0px -50% 0px" });

    secciones.forEach(sec => observer.observe(sec));
}

/* =========================
   MASCOTA QUE SIGUE EL MOUSE
   ========================= */

const sinMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function moverChimuelo(clientX, clientY) {

    if (sinMovimiento || typeof gsap === "undefined") return;

    const x = (clientX / window.innerWidth - 0.5) * 30;
    const y = (clientY / window.innerHeight - 0.5) * -30;

    gsap.to("#chimuelos", {
        rotationY: x,
        rotationX: y,
        duration: 0.5,
        transformPerspective: 1000,
        ease: "power2.out"
    });
}

document.addEventListener("mousemove", e => moverChimuelo(e.clientX, e.clientY));

document.addEventListener("touchmove", e => {
    const touch = e.touches[0];
    moverChimuelo(touch.clientX, touch.clientY);
}, { passive: true });
