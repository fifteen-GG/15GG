FROM node:12-alpine AS builder

COPY . /15gg_front
WORKDIR /15gg_front
RUN npm install

ARG REACT_APP_GG_API_ROOT
ARG REACT_APP_GG_WS_ROOT
ARG REACT_APP_DDRAGON_API_ROOT
ARG REACT_APP_OPGG_API_ROOT
ARG REACT_APP_AWS_ACCESS_KEY
ARG REACT_APP_AWS_SECRET_ACCESS_KEY

ENV REACT_APP_GG_API_ROOT=${REACT_APP_GG_API_ROOT}
ENV REACT_APP_GG_WS_ROOT=${REACT_APP_GG_WS_ROOT}
ENV REACT_APP_DDRAGON_API_ROOT=${REACT_APP_DDRAGON_API_ROOT}
ENV REACT_APP_OPGG_API_ROOT=${REACT_APP_OPGG_API_ROOT}
ENV REACT_APP_AWS_ACCESS_KEY=${REACT_APP_AWS_ACCESS_KEY}
ENV REACT_APP_AWS_SECRET_ACCESS_KEY=${REACT_APP_AWS_SECRET_ACCESS_KEY}

RUN npm run build

FROM nginx

COPY --from=builder /15gg_front /15gg_front
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx.conf   /etc/nginx/conf.d

# EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
