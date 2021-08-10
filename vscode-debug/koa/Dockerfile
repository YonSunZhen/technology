FROM xx.xxx.xxx.xx:8888/node:10

MAINTAINER "xxx xxxxxx" "xxxxxxxxx@xxxxxxxxx.com"

ADD . /test/

WORKDIR /test

RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime

RUN npm config set registry http://xx.xxx.xxx.xx:8081/repository/

RUN npm install

EXPOSE 8080

CMD ["npm","run","prod"]

