# AyudaVecino

## Guía de Instalación y Ejecución

### Backend (Modo Desarrollo)

1. Configurar el entorno virtual:
```bash
# Instalar pipenv si no está instalado
pip install pipenv

# Crear y activar el entorno virtual
pipenv shell
```

2. Instalar dependencias:
```bash
pipenv install
```

3. Ejecutar el servidor de desarrollo:
```bash
python manage.py runserver  --settings=apivecino.settings.dev
```

**Nota**: Para cualquier comando que involucre manage.py, asegúrate de añadir siempre el flag `--settings=apivecino.settings.dev`.



El backend estará disponible en `http://localhost:8000`

### Frontend (Modo Desarrollo)

1. Instalar dependencias:
```bash
cd frontend/my-app
npm install
```

2. Ejecutar el servidor de desarrollo:
```bash
npm start
```

El frontend estará disponible en `http://localhost:3000`

## Ejecución con Docker Compose

La forma más sencilla de ejecutar toda la aplicación es utilizando Docker Compose:

1. Asegúrate de tener instalado Docker y Docker Compose en tu sistema.

2. Ejecuta el siguiente comando en la raíz del proyecto:
```bash
docker-compose up
```

Este comando:
- Construirá las imágenes necesarias
- Iniciará todos los servicios
- El backend estará disponible en `http://localhost:8000`
- El frontend estará disponible en `http://localhost:3000`

Para detener los servicios:
```bash
docker-compose down
```

Para reconstruir las imágenes (después de cambios):
```bash
docker-compose up --build
```

## Notas Importantes
- Asegúrate de tener Python 3.x y Node.js instalados en tu sistema
- El backend debe estar ejecutándose para que el frontend funcione correctamente
- Mantén activo el entorno virtual de pipenv mientras trabajas en el backend

