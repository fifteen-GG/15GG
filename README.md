# 15GG


![image](https://user-images.githubusercontent.com/39877377/236750034-4a2fcc87-967c-4d02-bc67-fe9ce76908df.png)

### 1. 서비스

```
PostgreSQL v14.5
Python v3.10
Nginx v1.22.0
RabbitMQ v3.11.2
FastAPI v0.87.0
React v18.2.0
```

### 2. 필요 조건

```
Docker v20.10+
Docker Compose v2.10.2+
```

### 3. 환경 변수 설정하기

프로젝트 루트 디렉토리에 `.env` 파일 생성하기

```
DB_HOST={DBMS 호스트 주소}
DB_PORT={DBMS 포트}
DB_USERNAME={DBMS 로그인 username}
DB_PASSWORD={DBMS 로그인 비밀번호}
DB_NAME={DB 이름}
AMQP_HOST={RabbitMQ 서버 호스트 주소}
RIOT_TOKEN={Riot API 엑세스 토큰}

REACT_APP_GG_API_ROOT={프론트 앱을 위한 API 루트 주소}
REACT_APP_GG_WS_ROOT={프론트 앱을 위한 웹소켓 API 루트 주소}
REACT_APP_DDRAGON_API_ROOT={DataDragon API 루트 주소. 정적 이미지 서빙 시 사용.}
REACT_APP_OPGG_API_ROOT={OPGG API 루트 주소. 정적 이미지 서빙 시 사용.}
```

#### .env 예시

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

### 4. 컨테이너 실행하기

```
> docker compose up -d
```

### 5. 개발 환경 설정하기

#### 5-1. 도커 설치하기
```
> brew install --cask docker
```

#### 5-2. Frontend

1. 프론트 디렉토리에 `.env` 파일 생성하기
2. 환경 변수 설정하기
    1. 백엔드 앱을 로컬에서 실행하고 싶을 때
        - 백엔드 컨테이너 실행하기
        - `> docker compose up -d`
        - `> docker compose stop gg_frontend`
        - `REACT_APP_GG_API_ROOT` 를 `http://localhost:8000/api/v1` 로 설정하기
        - `REACT_APP_GG_WS_ROOT` 를 `ws://localhost:8000/api/v1/socket` 로 설정하기
    2. 프론트 디렉토리에 있는 `.env` 파일 예시
    ```
    REACT_APP_GG_API_ROOT="http://localhost:8000/api/v1"
    REACT_APP_GG_WS_ROOT="ws://localhost:8000/api/v1/socket"
    REACT_APP_DDRAGON_API_ROOT="http://ddragon.leagueoflegends.com/cdn/12.22.1/img"
    REACT_APP_OPGG_API_ROOT="https://opgg-static.akamaized.net/images"
    ```
3. 개발용 프론트 서버 실행하기
    ```
    > cd 15GG_front
    > yarn
    > yarn start
    ```

#### 5-3. Backend

1. 백엔드 디렉토리에 `.env` 파일 생성하기
2. 환경 변수 설정하기
    1. `AMQP_HOST` 를 `amqp://guest:guest@localhost` 로 설정하기
    2. RabbitMQ 컨테이너 실행하기
        - `> docker compose up -d rabbitmq`
    3. 로컬 DBMS 사용하고 싶을 떄 (내 호스트 머신에 설치된 DBMS)
        - `DB_HOST` 를 `127.0.0.1` 로 설정하기
    4. 혹은 기본 DBMS 사용하고 싶을 떄 (컨테이너에서 실행되는 DBMS)
        - `DB_HOST` 를 `db` 로 설정하기
        - DB 컨테이너 실행하기
        - `> docker compose up -d db`
    5. 백엔드 디렉토리에 있는 `.env` 파일 예시
    ```
    DB_HOST="127.0.0.1"
    DB_PORT="5432"
    DB_USERNAME="admin_15gg"
    DB_PASSWORD="admin_15gg"
    DB_NAME="db_15gg"
    RIOT_TOKEN="RGAPI-e8b2eb5d-0764-4a8a-bec3-45cefff5c75e"
    AMQP_HOST="amqp://guest:guest@localhost"
    ```
3. 개발용 백엔드 서버 실행하기
    ```
    > cd 15GG_back
    > pipenv install
    > pipenv shell
    > uvicorn app.main:app --reload
    ```

#### 5-4. 프로젝트 디렉토리 예시

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