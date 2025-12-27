// ================================
// SCRIPT CONECTADO AL PANEL PMT
// ================================
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwoBuC3yyjqRSQEC5DgLTvlbt2LZizWEsyLnnnXJSx6m3-g6dKlGe9QPuc_L4ml8K1-8A/exec";

// ================================
// ENVIAR DENUNCIA DESDE PÁGINA PÚBLICA
// ================================
async function enviarDenuncia() {

  const nombre = document.getElementById("nombre").value || "Anónimo";
  const tipo = document.getElementById("tipo").value;
  const descripcion = document.getElementById("descripcion").value;
  const imagenInput = document.getElementById("imagen");

  if (!descripcion.trim()) {
    alert("Debe describir la denuncia.");
    return;
  }

  const fecha = new Date();
  const fechaTexto = fecha.toLocaleDateString("es-GT");
  const horaTexto = fecha.toLocaleTimeString("es-GT");

  let imagenBase64 = "";

  if (imagenInput.files.length > 0) {
    imagenBase64 = await convertirBase64(imagenInput.files[0]);
  }

  // USAMOS LOS MISMOS CAMPOS DEL PANEL
  const fd = new FormData();
  fd.append("placa", "NO APLICA");
  fd.append("tipo", tipo);
  fd.append("problema", descripcion);
  fd.append("ubicacion", "Reporte ciudadano");
  fd.append("contacto", nombre);
  fd.append("fecha", fechaTexto);
  fd.append("hora", horaTexto);
  fd.append("imagen", imagenBase64);

  fetch(SCRIPT_URL, {
    method: "POST",
    body: fd
  })
  .then(r => r.text())
  .then(() => {
    alert("✅ Denuncia enviada correctamente");
    limpiarFormulario();
    cargarDenuncias();
  })
  .catch(err => {
    console.error(err);
    alert("❌ Error al enviar la denuncia");
  });
}

// ================================
// LIMPIAR FORMULARIO
// ================================
function limpiarFormulario() {
  document.getElementById("nombre").value = "";
  document.getElementById("descripcion").value = "";
  document.getElementById("imagen").value = "";
}

// ================================
// LEER DENUNCIAS (MISMO PANEL)
// ================================
function cargarDenuncias() {
  fetch(SCRIPT_URL + "?accion=leer")
    .then(r => r.json())
    .then(datos => {
      const contenedor = document.getElementById("listaDenuncias");
      contenedor.innerHTML = "";

      if (!datos.length) {
        contenedor.innerHTML = "<p>No hay denuncias registradas.</p>";
        return;
      }

      datos.reverse().forEach(d => {
        const div = document.createElement("div");
        div.className = "denuncia";

        div.innerHTML = `
          <strong>${d.tipo || "Denuncia"}</strong><br>
          <small>${d.fecha || ""} ${d.hora || ""}</small>
          <p>${d.problema || ""}</p>
          ${d.imagen ? `<img src="${d.imagen}" style="max-width:100%;margin-top:8px;">` : ""}
        `;

        contenedor.appendChild(div);
      });
    })
    .catch(err => {
      console.error(err);
    });
}

// ================================
// CONVERTIR IMAGEN A BASE64
// ================================
function convertirBase64(file) {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(file);
  });
}

// AUTO CARGA
document.addEventListener("DOMContentLoaded", cargarDenuncias);
