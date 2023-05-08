# 15GG

![image](https://user-images.githubusercontent.com/39877377/236750034-4a2fcc87-967c-4d02-bc67-fe9ce76908df.png)


### 1. Services

```
PostgreSQL v14.5
Python v3.10
Nginx v1.22.0
RabbitMQ v3.11.2
FastAPI v0.87.0
React v18.2.0
```

### 2. Prerequisites

```
Docker v20.10+
Docker Compose v2.10.2+
```

### 3. Set environment variables

create a `.env` file at the root directory

```
DB_HOST={Hostname of DBMS. Defaults to 127.0.0.1}
DB_PORT={Post of DBMS. Defaults to 5432}
DB_USERNAME={Login username for DBMS}
DB_PASSWORD={Login password for DBMS}
DB_NAME={Name of database}
AMQP_HOST={Host of RabbitMQ server}
RIOT_TOKEN={Access token for Riot API}

REACT_APP_GG_API_ROOT={API root for frontend application}
REACT_APP_GG_WS_ROOT={Websocket root for frontend application}
REACT_APP_DDRAGON_API_ROOT={API root of DataDragon API. Used for serving static images}
REACT_APP_OPGG_API_ROOT={API root of OPGG API. Used for serving static images}
```
#### Example .env

```
DB_HOST="db"
DB_PORT="5432"
DB_USERNAME="admin_15gg"
DB_PASSWORD="admin_15gg"
DB_NAME="db_15gg"
AMQP_HOST="amqp://guest:guest@rabbitmq"
RIOT_TOKEN="RGAPI-e8b2eb5d-0764-4a8a-bec3-45cefff5c75e"

REACT_APP_GG_API_ROOT="http://localhost:8000/api/v1"
REACT_APP_GG_WS_ROOT="ws://localhost:8000/api/v1/socket"
REACT_APP_DDRAGON_API_ROOT="http://ddragon.leagueoflegends.com/cdn/12.22.1/img"
REACT_APP_OPGG_API_ROOT="https://opgg-static.akamaized.net/images"
```

### 4. Launch containers

```
> docker compose up -d
```

### 5. Setting up development environment

#### 5-1. Install docker
```
> brew install --cask docker
```

#### 5-2. Frontend

1. create a `.env` file at the frontend directory
2. set environment variables
    1. if you want to run backend app locally
        - run backend container
        - `> docker compose up -d`
        - `> docker compose stop gg_frontend`
        - set `REACT_APP_GG_API_ROOT` to `http://localhost:8000/api/v1`
        - set `REACT_APP_GG_WS_ROOT` to `ws://localhost:8000/api/v1/socket`
    2. the .env file in the frontend directory should look like
    ```
    REACT_APP_GG_API_ROOT="http://localhost:8000/api/v1"
    REACT_APP_GG_WS_ROOT="ws://localhost:8000/api/v1/socket"
    REACT_APP_DDRAGON_API_ROOT="http://ddragon.leagueoflegends.com/cdn/12.22.1/img"
    REACT_APP_OPGG_API_ROOT="https://opgg-static.akamaized.net/images"
    ```
3. run frontend as a development server
    ```
    > cd 15GG_front
    > yarn
    > yarn start
    ```

#### 5-3. Backend

1. create a `.env` file at the backend directory
2. set environment variables
    1. set `AMQP_HOST` to `amqp://guest:guest@localhost`
    2. run RabbitMQ container
        - `> docker compose up -d rabbitmq`
    3. if you want to use local DBMS (on your host machine)
        - set `DB_HOST` to `127.0.0.1`
    4. *OR* if you want to use the default DBMS (on container)
        - set `DB_HOST` to `db`
        - run DB container
        - `> docker compose up -d db`
    5. the .env file in the backend directory should look like
    ```
    DB_HOST="127.0.0.1"
    DB_PORT="5432"
    DB_USERNAME="admin_15gg"
    DB_PASSWORD="admin_15gg"
    DB_NAME="db_15gg"
    RIOT_TOKEN="RGAPI-e8b2eb5d-0764-4a8a-bec3-45cefff5c75e"
    AMQP_HOST="amqp://guest:guest@localhost"
    ```
3. run backend as a development server
    ```
    > cd 15GG_back
    > pipenv install
    > pipenv shell
    > uvicorn app.main:app --reload
    ```

#### 5-4. Example project directory

```
.
├── 15GG_back
│   ├── Dockerfile
│   ├── .env
│   ├── Pipfile
│   ├── Pipfile.lock
│   ├── README.md
│   ├── alembic.ini
│   ├── app
│   ├── migrations
│   ├── requirements.txt
│   ├── settings.yaml
│   └── test
├── 15GG_front
│   ├── @types
│   ├── Dockerfile
│   ├── .env
│   ├── README.md
│   ├── build
│   ├── nginx.conf
│   ├── node_modules
│   ├── package.json
│   ├── public
│   ├── src
│   ├── tsconfig.json
│   └── yarn.lock
├── LICENSE
├── README.md
├── .env
└── docker-compose.yml
```
