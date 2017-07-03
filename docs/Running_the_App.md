# Running the App

The recommended way to run this app is with docker. You can install docker [here](https://www.docker.com/products/overview). If you are not familiar with docker you can read more about it on [there website](https://www.docker.com/what-docker).

If you are looking to run the app without docker, see the instructions [here](Running_without_Docker.md)

### Running the app with docker for production

If you are looking to run this in production, there is no need to clone the repo.

First, create two files:
- docker-prod.yml - This file can be found in the in the repo.
- env_prod.list - The settings file `env_stg.list` can be used as an example.

The `docker-prod.yml` contains the list of images and commands to run the app. It come with an nginx reverse proxy that by default will run on port 80. You will most likely want to change the port that nginx runs on as well as use a fix tag for the image. By default all are set to latest.

Most of the settings in your `env_prod.list` can stay the same as `env_stg.list` that is in this repo. It is highly recommended to change the django secret key when running this app. Once the files have been created run:

```bash
docker-compose -f docker-prod.yml up -d
```

### Running the app with docker for development
```bash
git clone https://github.com/RyanNoelk/OpenEats.git
cd openeats
git checkout dev
docker-compose build
docker-compose up -d
```

### First Time Setup

Regardless of if your running the app in production or development, you need to seed the database.

Run `docker-compose run --rm api bash` to open a bash shell to the API.
```bash
./manage.py migrate
./manage.py collectstatic
./manage.py createsuperuser
./manage.py loaddata course_data.json
./manage.py loaddata cuisine_data.json
```

If you want to add some test data we can load a few recipes and some news data. This data isn't really needed unless you just wanna see how the app looks and if its working.
* `./manage.py loaddata news_data.json`
* `./manage.py loaddata recipe_data.json`
* `./manage.py loaddata ing_data.json`
* `./manage.py loaddata direction_data.json`
