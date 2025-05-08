LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
        },
    },
    'loggers': {
        'user': {
            'handlers': ['console'],
            'level': 'DEBUG',
        },
    },
} 