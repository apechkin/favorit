# Поиск автозапчастей

Одностраничное React-приложение для поиска автозапчастей по артикулу через API [Favorit Parts](https://api.favorit-parts.ru/): поиск производителей по номеру детали, выбор бренда, таблица предложений с ценами и остатками, опциональный поиск аналогов.

Стек: **React 19** (с включённым React Compiler), **Vite 8**, **Redux Toolkit / RTK Query**, **Tailwind CSS v4**. Разработка и работа — в Docker за **Caddy** с доступом по `https://mycaddy.local`.

## Требования

- Node.js 22+ (для локальной разработки без Docker)
- Docker Desktop
- Права администратора (для правки hosts-файла и установки сертификата)

## Быстрый старт

### 1. Прописать домен в hosts

Добавьте строку в `C:\Windows\System32\drivers\etc\hosts` (от администратора):

```
127.0.0.1 mycaddy.local
```

### 2. Указать API-ключ

Ключ API не хранится в коде — он добавляется к запросам на стороне dev-сервера Vite (прокси `/api` → `api.favorit-parts.ru`). Создайте файл `.env` в корне проекта:

```
FAVORIT_API_KEY=00000000-0000-0000-0000-000000000001
```

### 3. Запустить

```bash
docker compose up -d --build
```

Поднимутся два контейнера:

- `app` — Vite dev-сервер (внутри сети, наружу не публикуется);
- `caddy` — reverse proxy на портах 80/443, отдаёт `https://mycaddy.local` → `app:5173`.

Откройте **https://mycaddy.local**.

### 4. Доверить сертификат (убрать предупреждение браузера)

Caddy выпускает HTTPS-сертификат через свой внутренний локальный CA. Корневой сертификат автоматически синхронизируется в `certs/root.crt` (фоновый цикл в контейнере caddy). Установите его в доверенные (от администратора):

```powershell
certutil -addstore -f Root certs\root.crt
```

После этого браузер откроет сайт без предупреждений. Без установки можно просто нажать «Дополнительно → Перейти на сайт».

## Разработка

HMR работает «на лету»: правите код на хосте — изменения сразу видны на `https://mycaddy.local`. Исходники (`src/`, `public/`, `index.html`, `vite.config.js`) примонтированы в контейнер, а `vite.config.js` включает `usePolling` — без него отслеживание файлов не работает через проброс с Windows в контейнер. Не удаляйте `usePolling` и `allowedHosts: ["mycaddy.local"]`.

### Команды

Всё выполняется из корня проекта:

| Команда | Что делает |
| --- | --- |
| `docker compose up -d --build` | Поднять полный стек (app + caddy) |
| `docker compose down` | Остановить стек |
| `npm run dev` | Dev-сервер без Docker (localhost:5173) |
| `npm run build` | Production-сборка в `dist/` |
| `npm run lint` | ESLint |
| `npm run preview` | Превью production-сборки |

Typecheck и тестов в проекте нет (plain JSX) — проверка изменений: `npm run lint` + `npm run build`.
