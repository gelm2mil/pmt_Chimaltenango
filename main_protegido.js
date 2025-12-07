/* ============================================================
   main_protegido.js — Sistema de carga dinámica PMT Chimaltenango
   Desarrollado para GELM • Edición NEÓN 2026
   ============================================================ */

// --- Protección básica (Evita abrir el JS directamente) ---
if (location.pathname.endsWith("main_protegido.js")) {
    document.body.innerHTML = "<h2 style='color:red;text-align:center;margin-top:40px;'>Acceso no permitido.</h2>";
    throw new Error("Bloqueado acceso directo.");
}

// --- Mapeo de módulos a sus archivos HTML ---
const rutas = {
    inicio: "inicio.html",
    mision: "mision.html",
    transportes: "transportes.html",
    operativos: "operativos.html",
    publica: "publica.html",
    educacion: "educacion.html",
    contacto: "contacto.html",
    redes: "redes.html",
    valores: "valores.html"   // ← módulo solicitado
};

// --- Selección del panel central donde cargará el contenido ---
const panel = document.getElementById("panel");

// --- Cargar módulo por defecto (Inicio) al abrir la página ---
window.addEventListener("DOMContentLoaded", () => {
    cargarModulo("inicio");

    // marca inicio como activo
    const btnInicio = document.querySelector('[data-module="inicio"]');
    if (btnInicio) btnInicio.classList.add("active");
});

// --- Función principal: carga HTML dentro del panel ---
function cargarModulo(mod) {
    const ruta = rutas[mod];

    if (!ruta) {
        panel.innerHTML = `<p style="color:red;">Error: módulo '${mod}' no existe.</p>`;
        return;
    }

    fetch(ruta)
        .then(resp => resp.text())
        .then(html => {
            panel.innerHTML = html;
            panel.classList.add("fade-in");

            setTimeout(() => panel.classList.remove("fade-in"), 400);
        })
        .catch(err => {
            panel.innerHTML = `<p style="color:red;">No se pudo cargar ${ruta}</p>`;
        });
}

// --- Activar módulos al hacer clic en el menú ---
document.querySelectorAll(".menu-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const modulo = btn.dataset.module;

        // quitar clases activas
        document.querySelectorAll(".menu-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        cargarModulo(modulo);
    });
});
