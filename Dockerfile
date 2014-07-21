FROM debian:jessie

RUN apt-get update && \
    apt-get install -y npm nginx git

ADD . /usr/share/nginx/html

WORKDIR /usr/share/nginx/html

RUN ln -s /usr/bin/nodejs /usr/bin/node
RUN npm install
RUN ./node_modules/bower/bin/bower install --allow-root --silent --config.interactive=false

ADD start.sh /start.sh
CMD "/start.sh"
