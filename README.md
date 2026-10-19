# Estimador de pedidos de kits de robótica

Aplicación educativa de regresión lineal múltiple con datos simulados.

## Publicar en GitHub Pages (HTML principal)
El archivo principal del sitio es `index.html`. La página carga `modelo.json` y calcula la estimación en el navegador. GitHub Pages publica HTML/CSS/JavaScript estáticos, no ejecuta Python ni Flask.

1. Crea un repositorio en GitHub, por ejemplo `estimador-kits-robotica`.
2. Sube todos los archivos de esta carpeta a la raíz del repositorio.
3. Ve a **Settings → Pages**.
4. En **Build and deployment**, elige **Deploy from a branch**, selecciona `main` y `/ (root)`, y guarda.
5. Espera la publicación y abre la URL que GitHub muestre en Settings → Pages.

Importante: deben estar en la raíz `index.html` y `modelo.json`, además de la carpeta `static/`.

## Probar antes de publicar
Desde esta carpeta, ejecuta `py -m http.server 8000` en Windows (o `python -m http.server 8000`) y abre `http://localhost:8000`. No abras el archivo con doble clic, porque el navegador puede bloquear la lectura de `modelo.json`.

## Ejecutar la versión Flask opcional
`app.py` y `templates/index.html` permiten ejecutar una versión Flask. Instala dependencias con `pip install -r requirements.txt` y ejecuta `python app.py`; luego abre `http://127.0.0.1:5000`.

## Actualizar el modelo
Ejecuta `python entrenar_modelo.py` con las dependencias instaladas para volver a generar `modelo.json` a partir de `datos.csv`.
