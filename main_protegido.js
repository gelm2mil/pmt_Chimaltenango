// =============================
//  CARGA DE MÓDULOS PMT GELM
// =============================

const panel = document.getElementById("panel");

// Lista de rutas de cada módulo
const rutas = {
    inicio: "inicio.html",
    valores: "valores.html",
    transportes: "transportes.html",
    operativos: "operativos.html",
    publica: "publica.html",
    educacion: "educacion.html",
    contacto: "contacto.html",
    redes: "redes.html"
};

// Función que carga cada módulo dentro del panel central
async function cargarModulo(nombre) {
    if (!rutas[nombre]) {
        panel.innerHTML = "<p style='color:red;'>Módulo no encontrado.</p>";
        return;
    }

    try {
        const respuesta = await fetch(rutas[nombre]);
        const html = await respuesta.text();
        panel.innerHTML = html;
        window.scrollTo(0, 0); // sube siempre al inicio
    } catch (error) {
        panel.innerHTML = "<p style='color:red;'>Error al cargar contenido.</p>";
        console.error("Error cargando módulo:", error);
    }
}

// Activación de botones del menú
document.querySelectorAll(".menu-btn").forEach(boton => {
    boton.addEventListener("click", () => {

        // remover selección previa
        document.querySelectorAll(".menu-btn")
            .forEach(x => x.classList.remove("active"));

        // activar el botón clickeado
        boton.classList.add("active");

        // cargar el módulo asociado
        const modulo = boton.dataset.module;
        cargarModulo(modulo);
    });
});

// Cargar INICIO cuando la página abre
cargarModulo("inicio");
