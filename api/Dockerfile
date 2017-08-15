FROM python:2.7.13-alpine3.4
ENV PYTHONUNBUFFERED 1
RUN mkdir /code
WORKDIR /code
ADD base/requirements.txt /code/requirements.txt
# TODO: We need to find a way to only include the db bindings the API needs to run.
# Right now the entire mariadb package will be included.
RUN apk add --update g++ git mariadb-dev
RUN pip install -r requirements.txt
ADD . /code/