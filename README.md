# TicketScaner

Мобільний додаток для сканування квитків кінотеатру, розроблений з використанням Expo та React Native.

## Функціональність

- Авторизація користувачів через електронну пошту або Google
- Сканування QR-кодів квитків
- Перегляд інформації про відскановані квитки

## Встановлення

1. Клонуйте репозиторій:

```
git clone <repo-url>
cd TicketScaner
```

2. Встановіть залежності:

```
npm install
```

3. Запустіть додаток:

```
npm start
```

## Використання

### Авторизація

На головному екрані введіть логін та пароль для входу або використовуйте авторизацію через Google.

### Сканування квитків

На головному екрані натисніть іконку QR-коду внизу, щоб перейти до сканера.
Після успішного сканування QR-коду з'явиться інформація про квиток.

## Вимоги

- Node.js 16+
- Expo CLI
- iOS 14.0+ або Android 7.0+

## Дозволи

Для коректної роботи додатку потрібен доступ до камери для сканування QR-кодів.

test