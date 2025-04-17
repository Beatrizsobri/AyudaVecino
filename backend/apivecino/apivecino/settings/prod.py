# Estos settings son para produccion y docker. 

from .base import *

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'apivecino',
        'USER': 'apivecino_user',
        'PASSWORD': 'apivecino_pass',
        'HOST': 'db',  # nombre del servicio en docker-compose
        'PORT': '5432',
    }
}
