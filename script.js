// Función para cargar dinámicamente los archivos de cada tema
function cargarTema(archivo) {
    fetch(archivo)
        .then(response => {
            if (!response.ok) throw new Error("Error al cargar el tema");
            return response.text();
        })
        .then(html => {
            document.getElementById('contenido').innerHTML = html;
            // Inicializar herramientas interactivas si existen en el tema cargado
            inicializarInteractivos();
        })
        .catch(error => {
            document.getElementById('contenido').innerHTML = `<p style="color:red;">Error: No se pudo cargar el archivo ${archivo}</p>`;
        });
}

function inicializarInteractivos() {
    // Escucha cambios en el deslizador de corriente del Tema 2
    const sliderCorriente = document.getElementById('sliderCorriente');
    if (sliderCorriente) {
        sliderCorriente.addEventListener('input', calcularPotenciaRealTime);
    }
}

// Lógica de simulación para el Tema 2 (Potencia)
function calcularPotenciaRealTime() {
    const corriente = parseFloat(document.getElementById('sliderCorriente').value);
    const voltajeDiodo = 0.7; // Voltaje VF fijo del silicio
    const potencia = (voltajeDiodo * corriente).toFixed(2);
    
    document.getElementById('valCorriente').innerText = corriente + " A";
    document.getElementById('valPotencia').innerText = potencia + " W";
    
    // Anima la barra roja de calor basándose en la potencia disipada
    const barra = document.getElementById('progresoCalor');
    if (barra) {
        let porcentaje = (potencia / 7) * 100; // 7W es el máximo en nuestro slider (0.7V * 10A)
        barra.style.width = porcentaje + "%";
    }
}
