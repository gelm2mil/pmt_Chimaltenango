// ===============================
// DENUNCIAS PMT - JS PRINCIPAL
// Desarrollado por GELM
// ===============================

const STORAGE_KEY = "denuncias_pmt_ciudadanas";

const contenedor = document.getElementById("contenedorDenuncias");
const yearSpan = document.getElementById("year");

// Año automático
yearSpan.textContent = new Date().getFullYear();

// Cargar denuncias guardadas
let denuncias = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

// ===============================
// FUNCIONES
// ===============================

// Generar fecha y hora actual
function obtenerFechaHora() {
  const ahora = new Date();

  const fecha = ahora.toLocaleDateString("es-GT", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });

  const hora = ahora.toLocaleTimeString("es-GT", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });

  return `${fecha} ${hora}`;
}

// Agregar denuncia
function agregarDenuncia() {
  const tipo = document.getElementById("tipo").value;
  const lugar = document.getElementById("lugar").value.trim();
  const descripcion = document.getElementById("descripcion").value.trim();
  const imagenInput = document.getElementById("imagen");

  if (!tipo || !descripcion) {
    alert("Por favor complete al menos el tipo de denuncia y la descripción.");
    return;
  }

  const denuncia = {
    tipo,
    lugar,
    descripcion,
    fechaHora: obtenerFechaHora(),
    imagen: null
  };

  // Si hay imagen
  if (imagenInput.files.length > 0) {
    const reader = new FileReader();
    reader.onload = function () {
      denuncia.imagen = reader.result;
      guardarDenuncia(denuncia);
    };
    reader.readAsDataURL(imagenInput.files[0]);
  } else {
    guardarDenuncia(denuncia);
  }
}

// Guardar denuncia
function guardarDenuncia(denuncia) {
  denuncias.unshift(denuncia); // nueva arriba
  localStorage.setItem(STORAGE_KEY, JSON.stringify(denuncias));
  renderDenuncias();
  limpiarFormulario();
}

// Mostrar denuncias
function renderDenuncias() {
  contenedor.innerHTML = "";

  if (denuncias.length === 0) {
    contenedor.innerHTML = "<p>No hay denuncias registradas.</p>";
    return;
  }

  denuncias.forEach(d => {
    const div = document.createElement("div");
    div.className = "denuncia";

    div.innerHTML = `
      <strong>Tipo:</strong> ${d.tipo}<br>
      ${d.lugar ? `<strong>Lugar:</strong> ${d.lugar}<br>` : ""}
      <strong>Descripción:</strong> ${d.descripcion}<br>
      <span class="fecha">🕒 ${d.fechaHora}</span>
    `;

    if (d.imagen) {
      const img = document.createElement("img");
      img.src = d.imagen;
      div.appendChild(img);
    }

    contenedor.appendChild(div);
  });
}

// Limpiar formulario
function limpiarFormulario() {
  document.getElementById("tipo").value = "";
  document.getElementById("lugar").value = "";
  document.getElementById("descripcion").value = "";
  document.getElementById("imagen").value = "";
}

// Inicializar
renderDenuncias();
