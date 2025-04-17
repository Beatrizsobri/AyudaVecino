FROM python:3.13-slim

# Evita archivos .pyc y mejora los logs
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /app

# Instala pipenv y dependencias
RUN pip install --no-cache-dir pipenv
COPY Pipfile Pipfile.lock ./
RUN pipenv install --system --deploy

# Copia todo el código del backend
COPY . .

# Crea el directorio para archivos estáticos y ejecuta collectstatic
RUN mkdir -p staticfiles && \
    cd apivecino && \
    python manage.py collectstatic --settings=apivecino.settings.prod --noinput

# Expone el puerto del contenedor
EXPOSE 8000

# Configura el módulo de settings para producción
ENV DJANGO_SETTINGS_MODULE=apivecino.settings.prod

# Lanza la aplicación con Gunicorn
WORKDIR /app/apivecino
CMD ["gunicorn", "apivecino.wsgi:application", "--bind", "0.0.0.0:8000"]