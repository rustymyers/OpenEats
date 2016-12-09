# Django settings for openeats project.
import os

DEBUG = True
SERVE_MEDIA = True

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
PROJECT_PATH = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Make this unique, and don't share it with anybody.
SECRET_KEY = 'tk1ig_pa_p9^muz4vw4%#q@0no$=ce1*b$#s343jouyq9lj)k33j('

SITE_ID = 1

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql', # Add 'postgresql_psycopg2', 'postgresql', 'mysql', 'sqlite3' or 'oracle'.
        'NAME': 'openeats',                   # Or path to database file if using sqlite3.
        'USER': 'root',                       # Not used with sqlite3.
        'PASSWORD': 'root',                   # Not used with sqlite3.
        'HOST': 'db',                         # Set to empty string for localhost. Not used with sqlite3.
        'PORT': '3306',                       # Set to empty string for default. Not used with sqlite3.
    }
}
# Hosts/domain names that are valid for this site; required if DEBUG is False
# See https://docs.djangoproject.com/en/1.5/ref/settings/#allowed-hosts
ALLOWED_HOSTS = ['localhost', '127.0.0.1']

# List of callables that know how to import templates from various sources.
TEMPLATES = [
    {
        'NAME': 'Core Templates',
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(PROJECT_PATH, 'templates'), ],
        'APP_DIRS': False,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
    {
        'NAME': '3rd Party Templates',
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

MIDDLEWARE_CLASSES = (
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.middleware.locale.LocaleMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
)

INSTALLED_APPS = (
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.sites',
    'django.contrib.admin',
    'django.contrib.staticfiles',

    'rest_framework',
    'rest_framework.authtoken',
    'coreapi',

    'base',
    'api.v1.recipe',
    'api.v1.recipe_groups',
    'api.v1.ingredient',
    'api.v1.news',
    'api.v1.list',

    'imagekit',
    'django_extensions',
    'corsheaders'
)

# Password validation
# https://docs.djangoproject.com/en/1.9/ref/settings/#auth-password-validators
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

ROOT_URLCONF = 'base.urls'

WSGI_APPLICATION = 'base.wsgi.application'

# Local time zone for this installation. Choices can be found here:
# http://en.wikipedia.org/wiki/List_of_tz_zones_by_name
TIME_ZONE = 'America/Chicago'

# Language code for this installation. All choices can be found here:
# http://www.i18nguy.com/unicode/language-identifiers.html
LANGUAGE_CODE = 'en-us'

REST_FRAMEWORK = {
    'DATETIME_FORMAT': "%B %-d, %Y",
    'DEFAULT_FILTER_BACKENDS': ('rest_framework.filters.DjangoFilterBackend',),
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.TokenAuthentication',
        'rest_framework.authentication.SessionAuthentication'
    ),
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.LimitOffsetPagination',
    'PAGE_SIZE': 100
}

CORS_ORIGIN_WHITELIST = (
    'localhost:8080'
)

# Static and i18n settings
STATICFILES_FINDERS = (
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
    'django.contrib.staticfiles.finders.FileSystemFinder',
)

LOCALE_PATHS = (
  os.path.join(PROJECT_PATH, '../locale', ),
)

FIXTURE_DIRS = [
    os.path.join(PROJECT_PATH, 'api', 'v1', 'fixtures'),
]

# If you set this to False, Django will make some optimizations so as not
# to load the internationalization machinery.
USE_I18N = True

# If you set this to False, Django will not format dates, numbers and
# calendars according to the current locale
USE_L10N = True

# Absolute path to the directory that holds media.
# Example: "/home/media/media.lawrence.com/"
MEDIA_ROOT = os.path.join(PROJECT_PATH, 'site-media')
STATIC_ROOT = os.path.join(PROJECT_PATH, 'static-files')
STATICFILES_DIRS = [
    os.path.join(PROJECT_PATH, "static"),
]

# URL that handles the media served from MEDIA_ROOT. Make sure to use a
# trailing slash if there is a path component (optional in other cases).
# Examples: "http://media.lawrence.com", "http://example.com/media/"
MEDIA_URL = '/site-media/'
STATIC_URL = '/static-files/'

ugettext = lambda s: s
LANGUAGES = (
     ('en', ugettext('English')),
     ('de', ugettext('German')),
   )

#Email Server Settings
DEFAULT_FROM_EMAIL = ''
EMAIL_HOST = ''
EMAIL_HOST_USER = ''
EMAIL_HOST_PASSWORD = ''
EMAIL_PORT =''
#EMAIL_USE_TLS = True

try:
    from local_settings import *
except ImportError:
    pass
