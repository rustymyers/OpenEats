FROM node:argon

# Create app directory
RUN mkdir /code
WORKDIR /code

# Install app dependencies
ADD . /code/

# Install Yarn
# See: https://yarnpkg.com/en/docs/install#alternatives-tab
RUN curl -o- -L https://yarnpkg.com/install.sh | bash
RUN $HOME/.yarn/bin/yarn install --pure-lockfile