# Estimador de pedidos de kits de robótica

Página estática que estima los pedidos semanales de kits de robótica con una regresión lineal múltiple. Los datos y métricas son educativos/simulados; la estimación no garantiza pedidos reales.

## Archivos

- `index.html`: estructura de la página.
- `estilos.css`: estilos.
- `app.js`: cálculo de la estimación en el navegador.
- `modelo.json`: coeficientes, rangos de validación y métricas del modelo.

## Publicar en GitHub Pages

1. Sube el contenido de esta carpeta a la raíz del repositorio (deben verse `index.html`, `estilos.css`, `app.js` y `modelo.json`).
2. En **Settings → Pages**, elige **Deploy from a branch**, rama `main`, carpeta `/(root)`, y guarda.
3. Abre la URL que aparece en esa sección.

## Probar en tu computadora

```bash
py -m http.server 8000
```

Visita `http://localhost:8000`. No abras `index.html` con doble clic: el navegador puede bloquear la carga de `modelo.json`.
