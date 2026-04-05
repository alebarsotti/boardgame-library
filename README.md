# Ale's Board Game Library

Sitio estático para explorar una colección de BoardGameGeek con:

- filtros por jugadores, duración, peso, idioma y edad
- vista galería o compacta
- pestañas para colección actual y archivo
- selector aleatorio sobre el conjunto filtrado
- interfaz ES/EN

## Archivos principales

- `index.html`: estructura principal
- `styles.css`: look editorial y responsive
- `app.js`: carga de datos, filtros, persistencia y modales
- `scripts/build-data.ps1`: genera `data/games.json` y `data/games-data.js` a partir del CSV

## Regenerar datos

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\build-data.ps1 -CsvPath "C:\ruta\tu-collection.csv"
```

También puedes indicar rutas de salida:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\build-data.ps1 -CsvPath "C:\ruta\tu-collection.csv" -OutputPath ".\data\games.json"
```

## Enriquecer con BGG

Si tienes un token de aplicación de BGG, puedes enriquecer el dataset con portada, descripción, categorías y mecánicas.

Solo enriquecer URLs remotas:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\build-data.ps1 -CsvPath "C:\ruta\tu-collection.csv" -BggToken "TU_TOKEN"
```

Enriquecer y descargar las imágenes localmente:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\build-data.ps1 -CsvPath "C:\ruta\tu-collection.csv" -BggToken "TU_TOKEN" -DownloadImages
```

Eso genera:

- `data/games.json`
- `data/games-data.js`
- `data/images/` si activas `-DownloadImages`

## Overrides de nombre

Los nombres mostrados usan únicamente los nombres base de BGG más cualquier override manual.

Si quieres ajustar un título, puedes hacerlo desde la ficha del juego con el botón para editar nombre. Ese cambio se guarda localmente en el navegador.

También puedes guardar los overrides a un archivo JSON y volver a cargarlos después. Si quieres incorporarlos al proyecto, guarda ese archivo como `data/name-overrides.json` y luego ejecuta:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\build-data.ps1 -CsvPath "C:\ruta\tu-collection.csv"
```

## Publicación

Se puede subir tal cual a cualquier hosting estático. La app no depende de BGG en tiempo real; consume el JSON local generado por el script.

## Uso local

También puede abrirse directamente con doble click sobre `index.html`. Para eso el build genera:

- `data/games.json` para hosting estático normal
- `data/games-data.js` para funcionamiento directo bajo `file://`
