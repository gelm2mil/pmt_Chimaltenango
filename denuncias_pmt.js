// ⚠️ USA EL MISMO SCRIPT QUE TU PANEL
const SCRIPT_URL = "PEGA_AQUI_EL_SCRIPT_URL_DEL_PANEL";

// ============================
// ENVIAR DENUNCIA
// ============================
async function enviarDenuncia() {

  const nombre = document.getElementById("nombre").value || "Anónimo";
  const tipo = document.getElementById("tipo").value;
  const descripcion = document.getElementById("descripcion").value;
  const imagenInput = document.getElementById("imagen");

  if (!descripcion) {
    alert("Debes ingresar una descripción");
    return;
  }

  const fecha = new Date().toLocaleString();

  let imagenBase64 = "";

  if (imagenInput.files.length > 0) {
    const file = imagenInput.files[0];
    imagenBase64 = await convertirBase64(file);
  }

  const data = {
    accion: "crear",
    nombre,
    tipo,
    descripcion,
    imagen: imagenBase64,
    fecha
  };

  await fetch(SCRIPT_URL, {
    method: "POST",
    body: JSON.stringify(data)
  });

  alert("Denuncia enviada correctamente");

  document.querySelector(".form-box").reset?.();
  cargarDenuncias();
}

// ============================
// CONVERTIR IMAGEN
// ============================
function convertirBase64(file) {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(file);
  });
}

// ============================
// CARGAR DENUNCIAS
// ============================
async function cargarDenuncias() {

  const res = await fetch(SCRIPT_URL);
  const denuncias = await res.json();

  const contenedor = document.getElementById("listaDenuncias");
  contenedor.innerHTML = "";

  denuncias.reverse().forEach(d => {
    const div = document.createElement("div");
    div.className = "denuncia";

    div.innerHTML = `
      <strong>${d.tipo}</strong><br>
      <small>${d.fecha} – ${d.nombre}</small>
      <p>${d.descripcion}</p>
      ${d.imagen ? `<img src="${d.imagen}">` : ""}
    `;

    contenedor.appendChild(div);
  });
}

// AUTO CARGA
cargarDenuncias();
