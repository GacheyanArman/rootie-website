# ROOTIE — каталог с загрузкой фотографий

Каталог полностью работает через **Supabase**: фотографии находятся в Storage, а карточки товаров — в базе данных.

На странице `/admin/catalog` можно выбрать фотографию с телефона или компьютера, заполнить карточку товара, добавить её в каталог и удалить позже.

## Возможности

- загрузка JPG, PNG и WebP обычным выбором файла;
- автоматическое уменьшение фотографии перед отправкой;
- хранение изображений в Supabase Storage;
- хранение товаров в таблице Supabase;
- просмотр добавленных товаров в админ-панели;
- удаление товара вместе с фотографией;
- пароль для добавления и удаления товаров.

## 1. Создайте проект Supabase

1. Создайте новый проект Supabase.
2. Откройте **SQL Editor**.
3. Создайте новый запрос.
4. Вставьте содержимое файла `supabase/catalog.sql`.
5. Нажмите **Run**.

Будут созданы:

- таблица `catalog_items`;
- публичное хранилище `catalog`;
- ограничения и настройки чтения каталога.

## 2. Скопируйте настройки Supabase

В Supabase откройте:

```text
Project Settings → Data API
```

Скопируйте:

- **Project URL**;
- **Secret key**.

Secret key хранится только в серверных переменных окружения и не передаётся в браузер.

## 3. Добавьте переменные в Vercel

Откройте:

```text
Vercel → Settings → Environment Variables
```

Добавьте:

```env
CATALOG_ADMIN_PASSWORD=ваш_надёжный_пароль
SUPABASE_URL=https://ВАШ_ПРОЕКТ.supabase.co
SUPABASE_SECRET_KEY=ВАШ_SECRET_KEY
SUPABASE_CATALOG_BUCKET=catalog
```

Для старого проекта Supabase вместо `SUPABASE_SECRET_KEY` можно использовать `SUPABASE_SERVICE_ROLE_KEY`.

После сохранения переменных выполните **Redeploy**.

## 4. Добавляйте товары

Откройте:

```text
https://ваш-сайт.vercel.app/admin/catalog
```

1. Выберите или перетащите фотографию.
2. Заполните название, цену и остальные поля.
3. Введите пароль администратора.
4. Нажмите **Добавить в каталог**.

## Локальный запуск

Создайте `.env.local` на основе `.env.example`, затем выполните:

```bash
npm install
npm run dev
```

Админ-панель:

```text
http://localhost:3000/admin/catalog
```

## Проверка

```bash
npm run lint
npm run build
```

## Основные файлы

- `app/admin/catalog/page.tsx` — страница управления;
- `components/catalog-admin-form.tsx` — форма загрузки и список товаров;
- `app/api/catalog/items/route.ts` — серверный API;
- `lib/supabase-admin.ts` — серверное подключение к Supabase;
- `lib/catalog.ts` — загрузка каталога только из Supabase;
- `supabase/catalog.sql` — настройка базы и хранилища.

## Security configuration

Set these production environment variables with different, randomly generated values:

- `CATALOG_ADMIN_PASSWORD` — at least 12 characters.
- `ADMIN_SESSION_SECRET` — at least 32 random characters; never expose it with a `NEXT_PUBLIC_` prefix.

After changing either value, redeploy the application. Existing admin sessions expire automatically after 8 hours.
