# Fingla API 

## Структура

```bash
.
├── src
│   ├── auth                          - Модуль авторизации
│   │   ├── decorators
│   │   │   └── roles.decorator.ts    - Декоратор управления ролями
│   │   ├── dtos
│   │   │   └── login.dto.ts          - Интерфейс логина
│   │   │   └── create-user.dto.ts    - Интерфейс регистрации
│   │   ├── guards
│   │   │   ├── jwt-auth.guard.ts     - Гвард аутентификации JWT-токена
│   │   │   └── roles.guard.ts        - Гвард авторизации по ролям
│   │   ├── interfaces                - Описания интерфейсов авторизации
│   │   │   ├── jwt-payload.interface.ts
│   │   │   └── signin.interface.ts
│   │   ├── validation                - Валидация
│   │   │   ├── password.regex.ts
│   │   │   └── phone.regex.ts
│   │   ├── auth.controller.ts
│   │   ├── auth.module.ts
│   │   ├── auth.service.ts
│   │   └── jwt.strategy.ts           - Стратегия passport.js для JWT-токенов
│   ├── core                          - Глобальные классы программы
│   │   ├── http.exceptions.ts
│   │   ├── db.exceptions.ts
│   ├── db
│   │   ├── migrations                  - Миграции баз данных
│   │   │   └── 1562660623110-Init.ts
│   ├── service                          - Утилиты
│   │   ├── config                   
│   │   │   ├── config.module.ts
│   │   │   ├── config.schema.ts      - Схема конфигурации convict
│   │   │   └── config.service.ts
│   │   ├── mailer                   
│   │   │   ├── providers 
│   │   │   │   ├── basemail.provider.ts 
│   │   │   │   ├── mailgun.provider.ts 
│   │   │   │   └── stdout.provider.ts 
│   │   │   ├── mailer.module.ts
│   │   │   └── mailer.template.ts
│   ├── user                         - Пользователи
│   │   ├── decorators
│   │   │   └── user.decorators.ts
│   │   ├── dtos
│   │   │   ├── link.dto.ts
│   │   │   └── params.dto.ts
│   │   ├── role.enum.ts
│   │   ├── user.controller.ts      - Контроллер
│   │   ├── user.entity.ts          - Модель ORM
│   │   ├── user.module.ts
│   │   └── user.service.ts
│   ├── app.module.ts         - Корневой модуль. 
│   ├── main.ts               - Точка входа
├── tsconfig.build.json
├── tsconfig.json
├── tslint.json
├── config.example.toml      - Пример конфигурации                                
├── nest-cli.json
├── nodemon-debug.json
├── nodemon.json
├── package.json
├── package-lock.json
├── README.md                - Этот файл
```

# Требования

- node `= 16.5.0`
- npm `= 7.19.1`
- PostgreSQL `= 14 (14.1-1.pgdg110+1)`

# Установка

```bash
$ npm ci
```

# Операции

## Первичная установка

1. Создание конфигурации
    - Создать `config.toml`
    - Используйте `config.schema.ts`, чтобы найти необходимые параметры.
    - Установите необходимые параметры в `config.toml`, предоставьте все секреты окружения, если это возможно. Имена переменных доступны в схеме конфигурации.

2. Запустите начальную миграцию
    - `$ npm run migrations: run`

### Продакшн

- Выполнение миграций
```bash
$ npm run migrate:prod
```

### Файл конфигурации

Общая конфигурация и/или конфигурация разработки должны быть описаны в файле `config.toml`. Пример файла `config.example.toml`

## Swagger

Swagger UI доступен по заданому в конфигурации пути по умолчанию используется `/doc`

`GET /doc`
