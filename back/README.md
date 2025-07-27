# FilmPeak: Guía de Configuraciòn y Ejecución del Backend (FastAPI)
Este `README.md` te giará a través de los pasos necesarios para configurar y ejecutar el backend de tu aplicación utilizando FastAPI.

## Creación de un Entorno Virtual (`.venv`)
Es una buena práctica crear un entorno virtual para aislar las dependencias de tu proyecto. Esto evita conflictos con otras instalaciones de Python en tu sistema.
Para crear un entorno virtual llamado .venv, abre tu terminal o línea de comandos y navega hasta el directorio raíz de tu proyecto. Luego, ejecuta el siguiente comando:
```
python -m venv .venv
```
## Activación del Entorno virtual
Una vez creado el entorno virtual, debes activarlo. Los comandos varían según tu sistema operativo:
```
source ./.venv/bin/activate
```
Verás que el nombre de tu entorno virtual (.venv) aparecerá al principio de tu línea de comandos, indicando que está activo.
## Instalación de los Requerimientos
Con el entorno virtual activado, puedes instalar todas las dependencias del proyecto. Asegúrate de tener un archivo `requirements.txt` en la raíz de tu proyecto que liste todas las bibliotecas necesarias.

Ejecuta el siguiente comando para instalar las dependencias:
```
pip install -r requirements.txt
```
## Ejecución del Servidor FastAPI con Uvicorn
FastAPI se ejecuta con un servidor ASGI como Uvicorn. Para iniciar el servidor, asegúrate de que tu archivo principal de FastAPI se llame `main.py` y que tu aplicación FastAPI esté instanciada como `app`.

Desde la raíz de tu proyecto (con el entorno virtual activado), ejecuta:
```
uvicorn main:app --reload
```
El servidor se iniciará y generalmente estará disponible en http://127.0.0.1:8000 o http://localhost:8000

## Documentación de la API
FastAPI genera automáticamente documentación interactiva para tu API. Una vez que el servidor esté corriendo, puedes acceder a la documentación en tu navegador:
- Documentación interactiva (Swagger UI): Abre tu navegador y ve a http://127.0.0.1:8000/docs
- Documentación alternativa (ReDoc): Abre tu navegador y ve a http://127.0.0.1:8000/redoc
Estas interfaces te permiten explorar los endpoints de tu API, ver sus parámetros, modelos de respuesta y probar las solicitudes directamente desde el navegador.

