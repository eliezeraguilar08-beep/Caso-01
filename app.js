"use strict";

/* ---------- Elementos de la página ---------- */
const formulario     = document.getElementById("estimador-form");
const cajaError      = document.getElementById("error");
const cajaResultado  = document.getElementById("resultado");
const valorResultado = document.getElementById("resultado-valor");
const estadoModelo   = document.getElementById("estado-modelo");
const metricaMae     = document.getElementById("metrica-mae");
const metricaR2      = document.getElementById("metrica-r2");

let modelo = null;

/* ---------- Carga del modelo (modelo.json está en la raíz) ---------- */
fetch("modelo.json", { cache: "no-store" })
  .then((respuesta) => {
    if (!respuesta.ok) throw new Error("No se pudo cargar modelo.json");
    return respuesta.json();
  })
  .then((datos) => {
    modelo = datos;
    metricaMae.textContent = Number(datos.metrics.mae_test).toFixed(2);
    metricaR2.textContent = Number(datos.metrics.r2_test).toFixed(3);
    estadoModelo.textContent = "Modelo cargado correctamente.";
  })
  .catch(() => {
    estadoModelo.textContent =
      "No se pudo cargar modelo.json. Comprueba que esté en la raíz del repositorio y abre la web mediante un servidor.";
    formulario.querySelector("button").disabled = true;
  });

/* ---------- Utilidades ---------- */
function mostrarError(mensaje) {
  cajaError.textContent = mensaje;
  cajaError.hidden = false;
}

function estimar(consultas, inversion, campana) {
  const c = modelo.coefficients;
  return modelo.intercept
    + c.consultas_web * consultas
    + c.inversion_publicidad_soles * inversion
    + c.campana_escolar * campana;
}

/* ---------- Envío del formulario ---------- */
formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();
  cajaError.hidden = true;
  cajaResultado.hidden = true;

  const consultasTexto = document.getElementById("consultas_web").value.trim();
  const inversionTexto = document.getElementById("inversion_publicidad_soles").value.trim();
  const campana = Number(document.getElementById("campana_escolar").value);

  const consultas = Number(consultasTexto);
  const inversion = Number(inversionTexto);

  const datosValidos =
    consultasTexto !== "" && Number.isInteger(consultas) && consultas >= 5 && consultas <= 70 &&
    inversionTexto !== "" && Number.isFinite(inversion) && inversion >= 0 && inversion <= 1100 &&
    [0, 1].includes(campana);

  if (!datosValidos) {
    mostrarError("Revisa los datos ingresados. Consultas: entero entre 5 y 70; inversión: entre S/ 0 y S/ 1100; campaña escolar: No o Sí.");
    return;
  }

  if (!modelo) {
    mostrarError("El modelo aún no está disponible. Recarga la página e inténtalo de nuevo.");
    return;
  }

  valorResultado.textContent = Math.max(0, estimar(consultas, inversion, campana)).toFixed(2);
  cajaResultado.hidden = false;
});
