"""
Aplicación web Flask para estimar pedidos semanales de kits de robótica.
Ejecutar desde esta carpeta: python app.py
"""
import json
from pathlib import Path
from flask import Flask, render_template, request

app = Flask(__name__)
BASE_DIR = Path(__file__).resolve().parent

with open(BASE_DIR / "modelo.json", encoding="utf-8") as archivo:
    MODELO = json.load(archivo)

def estimar(consultas, inversion, campana):
    """Calcula la predicción usando el intercepto y coeficientes guardados."""
    coef = MODELO["coefficients"]
    return (
        MODELO["intercept"]
        + coef["consultas_web"] * consultas
        + coef["inversion_publicidad_soles"] * inversion
        + coef["campana_escolar"] * campana
    )

@app.route("/", methods=["GET", "POST"])
def index():
    resultado = None
    error = None
    valores = {"consultas_web": "", "inversion_publicidad_soles": "", "campana_escolar": "0"}

    if request.method == "POST":
        valores = {
            "consultas_web": request.form.get("consultas_web", "").strip(),
            "inversion_publicidad_soles": request.form.get("inversion_publicidad_soles", "").strip(),
            "campana_escolar": request.form.get("campana_escolar", "").strip(),
        }
        try:
            consultas = int(valores["consultas_web"])
            inversion = float(valores["inversion_publicidad_soles"])
            campana = int(valores["campana_escolar"])

            if not 5 <= consultas <= 70:
                raise ValueError("Las consultas web deben estar entre 5 y 70.")
            if not 0 <= inversion <= 1100:
                raise ValueError("La inversión publicitaria debe estar entre S/ 0 y S/ 1100.")
            if campana not in (0, 1):
                raise ValueError("Campaña escolar debe ser 0 (No) o 1 (Sí).")

            estimacion = estimar(consultas, inversion, campana)
            resultado = max(0, estimacion)
        except (ValueError, TypeError):
            error = "Revisa los datos ingresados. Usa números válidos y respeta los rangos indicados."

    return render_template(
        "index.html",
        resultado=resultado,
        error=error,
        valores=valores,
        mae=MODELO["metrics"]["mae_test"],
        r2=MODELO["metrics"]["r2_test"]
    )

if __name__ == "__main__":
    app.run(debug=True)
