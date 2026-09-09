window.onscroll = function() {
  let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  let scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  let scrolled = (scrollTop / scrollHeight) * 100;
  document.getElementById("progress").style.height = scrolled + "%";
};

document.addEventListener("input", function(e){

    if(e.target.id === "buscarJugador"){

        const texto = e.target.value.toLowerCase();
        const filas = document.querySelectorAll("tbody tr");

        filas.forEach(fila => {

            const nombre = fila.cells[0].textContent.toLowerCase();

            if(nombre.includes(texto)){
                fila.style.display = "";
                fila.classList.add("encontrado");
            }
            else{
                fila.style.display = "none";
                fila.classList.remove("encontrado");
            }

            if(texto === ""){
                fila.style.display = "";
                fila.classList.remove("encontrado");
            }
        });
    }
});



const botonTema = document.getElementById("tema");

botonTema.addEventListener("click", () => {

    document.body.classList.toggle("modo-claro");

    if(document.body.classList.contains("modo-claro")){
        botonTema.textContent = "☀️";
    }
    else{
        botonTema.textContent = "🌙";
    }

});


function moverChimuelo(clientX, clientY){

    const x =
        (clientX / window.innerWidth - 0.5) * 30;

    const y =
        (clientY / window.innerHeight - 0.5) * -30;

    gsap.to("#chimuelos", {
        rotationY: x,
        rotationX: y,
        duration: 0.5,
        transformPerspective: 1000,
        ease: "power2.out"
    });

}

// PC
document.addEventListener("mousemove", (e) => {

    moverChimuelo(
        e.clientX,
        e.clientY
    );

});

// Celular
document.addEventListener("touchmove", (e) => {

    const touch = e.touches[0];

    moverChimuelo(
        touch.clientX,
        touch.clientY
    );

});