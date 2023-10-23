const desplazamiento = document.getElementById("desplazamiento");
const texto = document.getElementById("texto");
const resultado = document.getElementById("resultado");
const cifrarBtn = document.getElementById("cifrar");
const descifrarBtn = document.getElementById("descifrar");

// Función para cifrar o descifrar
function cifradoDescifrado() {
    const textoIngresado = texto.value;
    const valorDesplazamiento = parseInt(desplazamiento.value);

    // Determinar la operación seleccionada
    let operacion;
    if (cifrarBtn.classList.contains('active')) {
        operacion = "cifrar";
    } else if (descifrarBtn.classList.contains('active')) {
        operacion = "descifrar";
    }

    resultado.value = textoIngresado.split('').map(c => {
        if (/[A-Za-z0-9]/.test(c)) {
            let valorEntero = c.charCodeAt(0);

            if (/[A-Z]/.test(c)) { // Letras mayúsculas
                if (operacion === "cifrar") {
                    valorEntero = ((valorEntero - 65 + valorDesplazamiento) % 26 + 26) % 26 + 65;
                } else { // Descifrar
                    valorEntero = ((valorEntero - 65 - valorDesplazamiento) % 26 + 26) % 26 + 65;
                }
            } else if (/[a-z]/.test(c)) { // Letras minúsculas
                if (operacion === "cifrar") {
                    valorEntero = ((valorEntero - 97 + valorDesplazamiento) % 26 + 26) % 26 + 97;
                } else { // Descifrar
                    valorEntero = ((valorEntero - 97 - valorDesplazamiento) % 26 + 26) % 26 + 97;
                }
            } else if (/[0-9]/.test(c)) { // Números
                if (operacion === "cifrar") {
                    valorEntero = ((valorEntero - 48 + valorDesplazamiento) % 10 + 10) % 10 + 48;
                } else { // Descifrar
                    valorEntero = ((valorEntero - 48 - valorDesplazamiento) % 10 + 10) % 10 + 48;
                }
            }

            return String.fromCharCode(valorEntero);
        } else {
            return c; // Mantener otros caracteres sin cambios
        }
    }).join('');
}

cifrarBtn.addEventListener("click", function() {
    cifrarBtn.classList.add('active');
    descifrarBtn.classList.remove('active');
    cifradoDescifrado();
});

descifrarBtn.addEventListener("click", function() {
    descifrarBtn.classList.add('active');
    cifrarBtn.classList.remove('active');
    cifradoDescifrado();
});

texto.addEventListener("input", cifradoDescifrado);
desplazamiento.addEventListener("input", cifradoDescifrado);
