
# Guía de Instalación y Uso - Proyecto Pokedex Vue

Esta guía describe paso a paso cómo preparar el ambiente para instalar y ejecutar la aplicación Pokedex.

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado lo siguiente en tu sistema:

*   **Node.js**: Se recomienda la versión LTS (v18 o superior). Puedes verificar si lo tienes instalado ejecutando `node -v` en tu terminal.
*   **npm**: Generalmente se instala automáticamente con Node.js. Verifica con `npm -v`.

## Pasos de Instalación

1.  **Clonar o Descargar el Proyecto**
    Asegúrate de tener los archivos del proyecto en una carpeta local.

2.  **Abrir la Terminal**
    Abre tu terminal o línea de comandos y navega hasta la carpeta raíz del proyecto:
    ```bash
    cd ruta/a/tu/proyecto
    ```

3.  **Instalar Dependencias**
    Ejecuta el siguiente comando para descargar instalar todas las librerías necesarias (Vue, Pinia, Vue Router, etc.):
    ```bash
    npm install
    ```

## Ejecución en Desarrollo

Para iniciar la aplicación en modo de desarrollo (con recarga en caliente):

1.  Ejecuta el comando:
    ```bash
    npm run dev
    ```

2.  Verás una salida similar a esta:
    ```
      VITE vX.X.X  ready in X ms

      ➜  Local:   http://localhost:5173/
      ➜  Network: use --host to expose
    ```

3.  Abre tu navegador web y visita la URL indicada (usualmente `http://localhost:5173/`).

## Características de la Aplicación

*   **Inicio (Pokedex)**: Muestra una lista de Pokemon aleatorios. Puedes usar el buscador para filtrar por nombre.
*   **Detalle**: Haz clic en cualquier tarjeta para ver más detalles (stats, tipos, sprites).
*   **Combate**: Navega a la pestaña "Combate". Selecciona dos cartas para jugar.
*   **Temas**: Usa el selector (Sol/Luna/Ordenador) en la barra superior para cambiar entre modo claro, oscuro o sistema.

## Construcción para Producción

Si deseas generar los archivos finales para subir a un servidor web:

1.  Ejecuta:
    ```bash
    npm run build
    ```

2.  Los archivos generados se encontrarán en la carpeta `dist/`.

## Estructura del Proyecto

*   `src/`: Código fuente.
    *   `components/`: Componentes reutilizables (Tarjetas, Buscador, etc.).
    *   `views/`: Páginas principales (Inicio, Detalle, Combate).
    *   `services/`: Lógica de conexión con la API (PokeAPI).
    *   `stores/`: Gestión de estado global (Tema).
    *   `router/`: Configuración de rutas.
*   `index.html`: Punto de entrada de la aplicación.
*   `vite.config.js`: Configuración del empaquetador Vite.

¡A disfrutar de mi Pokedex!
