FROM python:3.10
ARG DB_USERNAME
ARG DB_PASSWORD
ARG DB_HOST
ARG DB_PORT
ARG DB_NAME
ARG RIOT_TOKEN
ARG AMQP_HOST
ARG AWS_ACCESS_KEY
ARG AWS_SECRET_ACCESS_KEY
WORKDIR /15gg_back
COPY ./requirements.txt /15gg_back/requirements.txt
RUN bash -c "pip install --no-cache-dir --upgrade -r /15gg_back/requirements.txt"
ENV DB_USERNAME=${DB_USERNAME}
ENV DB_PASSWORD=${DB_PASSWORD}
ENV DB_HOST=${DB_HOST}
ENV DB_PORT=${DB_PORT}
ENV DB_NAME=${DB_NAME}
ENV RIOT_TOKEN=${RIOT_TOKEN}
ENV AMQP_HOST=${AMQP_HOST}
ENV AWS_ACCESS_KEY=${AWS_ACCESS_KEY}
ENV AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}
COPY . /15gg_back
CMD python -m alembic upgrade head && gunicorn -w 4 -b 0.0.0.0:8000 -k uvicorn.workers.UvicornWorker app.main:app