# OpenEats Project

OpenEats is a recipe management site that allows users to create, share, and store recipes. This fork uses Django Rest Framework as a backend and React (with flux) as a front end. 

The main goals of this project are two fold. One, I wanted a place to store my personal collection of recipes and share them with close friends and family. Two, I wanted to learn react :). I went digging around for a starting point and gathering ideas when i came across open eats. It had some cool ideas and was well documented for the most part. 

I have a lot of ideas as far as features go. But since I moved the whole UI to react and the backend to a pure API, I'm currently working on getting the core of the project stable.  The Core, in my mind, consists of a few things.

- Creating, viewing, and editing recipes.
- Browsing and searching for recipes.
- A simple homepage and about page.
 
# Running the App

## Docker

```bash
docker-compose build
docker-compose up -d
```

You can then use `docker-compose run --rm api bash` to run the DB migrations shown below (eg: `python ./manage.py migrate`).


## Manually

* `git clone https://github.com/RyanNoelk/OpenEats.git`
* `cd openeats`
* `git checkout dev`
* Create a python virtual environment (I use [virtualenvwrapper](https://virtualenvwrapper.readthedocs.io/en/latest/)).
* `pip install -r base/requirements.txt`

Next we need to create a `base/local_settings.py` file for configuring your particulate instance. Things like your secret key and database settings should go here.

Now that we have the dependencies. We need to setup the DB. The default is sqlite, which is fine for dev purposes. But if you want something a bit more robust or if you want to run this in a production environment you should use something like postgres or mysql. The current configuration should work with any database you choose to use. See the [django database docs](https://docs.djangoproject.com/en/1.10/ref/settings/#std:setting-DATABASES) for setting up your database. As a side note, please make sure that you install any additional drivers that python needs to work with the database that you choose.

The migrations should all be present in the repo. Once the database is installed, migrate all the apps.
* `./manage.py migrate`

Now lets create a super user as an admin for the site. Run `./manage.py createsuperuser` and follow the prompts.

Once you have created a user, we can add some base data to the project. This will load some basic course and cuisine data into the project.
* `./manage.py loaddata course_data.json`
* `./manage.py loaddata cuisine_data.json`

If you want to add some test data we can load a few recipes and some news data. This data isn't really needed unless you just wanna see how the app looks and if its working.
* `./manage.py loaddata news_data.json`
* `./manage.py loaddata recipe_data.json`
* `./manage.py loaddata ing_data.json`
* `./manage.py loaddata direction_data.json`

Now we need to gather all the static fields for the django rest framework and django admin panel. Also, we need to build the default image for when recipes don't have an image. 

* `./manage collectstatic`
* `./manage imgur`

That should be it! you can run the dev server now to load up the api `./manage runserver`.

Load up `http://localhost:8000/admin/` in a browser and see the results.

The next thing we need to do is setup react. The bundle and index are located in `frontend/public/` The bundle there is already a production copy.  That should be used if your looking to just serve the project with, for example, nginx. However if you want node to serve the code. See below

From your base dir:
* `cd frontend` 
* `npm install` (this will take a few minutes as its loading a ton of small static files)
* `NODE_ENV=production npm start`
* Load `http://localhost:8080` in a browse and see the results.

If you just want to test or play around with the code, you can run the dev server. First, make sure the  django server is running. Then:
* `cd frontend` 
* `npm install` (this will take a few minutes as its loading a ton of small static files)
* `npm start`
* Load `http://localhost:8080` in a browse and see the results.

# TODO

If you're looking for something to do, I'd love some help on the following:

* React i18n. I plan on having support for german at some point, but have no idea now i18n works in react.
* Tests (both for django and react)
* Working grocery list
* Editing Recipes (WYSIWYG)

# Dev Tips

All of the data (excluding recipes) can be added to the DB using the Django REST GUI. The following is the CURL post I use to add recipes to the DB quickly for testing. You'll will need to either add your auth token as a header or disable the auth check in `api/v1/recipe/seralizers.py`.

```bash
curl -X POST -H "Content-Type: application/json" http://localhost:8000/api/v1/recipe/recipes/ --data '{"info":"hi", "cook_time":"12", "title":"hi", "directions":[{"title":"do this first", "step":"1"}], "servings":"12", "cuisine":"1", "ingredients":[{"title":"first", "quantity":"2", "measurement":"tsp"}], "prep_time":"123", "course":"1", "tags":[{"author":"1", "title":"chicken"}]}'
```

Apps can access there API roots via there app names:
* Recipes - http://localhost:8000/api/v1/recipe
* Ingredients - http://localhost:8000/api/v1/ingredient/
* Recipe groups - http://localhost:8000/api/v1/recipe_groups/
* News - http://localhost:8000/api/v1/news/
* Lists - http://localhost:8000/api/v1/list/
