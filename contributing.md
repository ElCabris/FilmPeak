
# Guía para Contribuir

¡Gracias por tu interés en contribuir a este proyecto full-stack! Está compuesto por dos partes:

- **Frontend:** React (en `/frontend`)
- **Backend:** FastAPI (en `/backend`)

Queremos mantener una base de código clara, mantenible y colaborativa. Esta guía te ayudará a contribuir correctamente.

---

## Índice

- [Código de Conducta](#código-de-conducta)
- [Cómo puedo contribuir](#cómo-puedo-contribuir)
  - [Reportar errores](#reportar-errores)
  - [Sugerir mejoras o funcionalidades](#sugerir-mejoras-o-funcionalidades)
  - [Contribuir con código](#contribuir-con-código)
  - [Mejorar documentación](#mejorar-documentación)
- [Configuración del entorno](#configuración-del-entorno)
- [Estilo de Código](#estilo-de-código)
  - [Estilo en Backend (Python)](#estilo-en-backend-python)
  - [Estilo en Frontend (React)](#estilo-en-frontend-react)
- [Proceso de Pull Request](#proceso-de-pull-request)
- [Licencia](#licencia)

---

## Código de Conducta

Este proyecto adopta un [Código de Conducta](CODE_OF_CONDUCT.md). Por favor, sé respetuoso y profesional en tus interacciones.

---

## Cómo puedo contribuir

### Reportar errores

1. Verifica que el error no haya sido reportado antes.
2. Abre un [Issue](https://github.com/ElCabris/FilmPeak/issues) con:
   - Descripción clara del error
   - Pasos para reproducirlo
   - Logs o capturas de pantalla si es posible
   - Información del entorno (sistema operativo, navegador, versión de Python o Node)

### Sugerir mejoras o funcionalidades

1. Busca si ya hay una propuesta similar.
2. Crea un nuevo issue con:
   - Descripción de la funcionalidad
   - Justificación (¿por qué es útil?)
   - Ideas para la implementación (opcional)

### Contribuir con código

1. Haz un fork del repositorio y clónalo localmente.
2. Crea una rama descriptiva:  
   ```bash
   git checkout -b feat/nueva-funcionalidad
   ```

3. Realiza los cambios necesarios (siguiendo el [Estilo de Código](#estilo-de-código)).
4. Asegúrate de que todas las pruebas pasen:

   * `npm test` en frontend
   * `pytest` en backend
5. Haz commit de tus cambios:

   ```bash
   git commit -m "feat: descripción clara del cambio"
   ```
6. Sube tu rama y abre un Pull Request hacia la rama `dev` o `main` (según lo acordado).

---

## Configuración del entorno

### Backend (FastAPI)

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend (React)

```bash
cd frontend
npm install
npm start
```

---

## Estilo de Código

### Estilo en Backend (Python)

* Sigue **PEP8** (usa `flake8` o `pylint`).
* Usa `black` para formato automático:

  ```bash
  black .
  ```
* Agrega anotaciones de tipo (`typing`) siempre que sea posible.
* Organiza tus imports con `isort`.
* Pruebas automatizadas con `pytest` deben vivir en `backend/tests/`.

Recomendamos instalar pre-commits:

```bash
pip install pre-commit
pre-commit install
```

### Estilo en Frontend (React)

* Usa **ESLint** y **Prettier** para mantener formato y consistencia:

  ```bash
  npm run lint
  npm run format
  ```
* Estructura componentes por responsabilidad.
* Usa funciones puras y evita lógica innecesaria en los componentes.
* Usa hooks correctamente (evita condiciones dentro de `useEffect`, `useState`, etc.).
* Tipado estricto si usas TypeScript (`.tsx`).

---

## Proceso de Pull Request

1. El Pull Request debe apuntar a `dev` (a menos que se indique lo contrario).
2. La descripción del PR debe incluir:

   * Qué se cambió
   * Por qué
   * Referencia a issues (ej. `Closes #42`)
3. Revisa que el CI (tests automáticos) pase correctamente.
4. Un revisor del equipo evaluará:

   * Estilo y claridad del código
   * Impacto en otras funcionalidades
   * Pruebas añadidas/modificadas
5. Si se solicita, realiza cambios y actualiza el PR.

---

## Licencia

Este proyecto se encuentra bajo la licencia [MIT](LICENSE). Al contribuir, aceptas que tu código se publique bajo esta misma licencia.

---

¡Gracias por ayudar a mejorar este proyecto!
