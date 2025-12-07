// --- Sistema de carga dinámica de módulos PMT GELM ---

const panel = document.getElementById("panel");

const rutas = {
    inicio: "inicio.html",
    mision: "valores.html",
    transportes: "transportes.html",
    operativos: "operativos.html",
    publica: "publica.html",
    educacion: "educacion.html",
    contacto: "contacto.html",
    redes: "redes.html"
};

// Cargar módulo por nombre
async function cargarModulo(nombre) {
    if (!rutas[nombre]) return;

    try {
        const respuesta = await fetch(rutas[nombre]);
        const html = await respuesta.text();
        panel.innerHTML = html;
        window.scrollTo(0, 0);
    } catch (error) {
        panel.innerHTML = "<p style='color:red;'>Error cargando el módulo.</p>";
        console.error(error);
    }
}

// Activar botones del menú
document.querySelectorAll(".menu-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        document
            .querySelectorAll(".menu-btn")
            .forEach(b => b.classList.remove("active"));

        btn.classList.add("active");

        const modulo = btn.dataset.module;
        cargarModulo(modulo);
    });
});

// Cargar INICIO por defecto
cargarModulo("inicio");
