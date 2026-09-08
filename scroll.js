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


