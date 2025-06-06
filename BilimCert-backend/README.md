# BilimCert Backend - Django REST API

## 🏗️ **АРХИТЕКТУРА BACKEND**

BilimCert Backend построен на Django + Django Ninja REST API с полной поддержкой:

- **Django + Django Ninja REST API**
- **SQLite** (основная база данных)
- **Cassandra** (вторичная база данных)
- **Email система** (Dovecot IMAP + Postfix SMTP + RainLoop)
- **reCAPTCHA** интеграция
- **Загрузка файлов**

## 📁 **СТРУКТУРА ПРОЕКТА**

```
backend/
├── BilimCert/                    # Django проект
│   ├── BilimCert/               # Настройки Django
│   │   ├── settings.py          # Основные настройки
│   │   ├── urls.py              # URL маршруты
│   │   └── wsgi.py              # WSGI конфигурация
│   ├── api/                     # API приложение
│   │   ├── auth/                # Аутентификация
│   │   ├── email_api/           # Email API
│   │   ├── forms/               # Формы
│   │   ├── news/                # Новости
│   │   ├── models.py            # Модели базы данных
│   │   └── urls.py              # API маршруты
│   ├── cassandra_connector.py   # Cassandra интеграция
│   └── manage.py                # Django управление
├── requirements.txt             # Python зависимости
└── .env.example                 # Пример переменных окружения
```

## 🔌 **API ENDPOINTS**

### **Аутентификация:**
- `POST /api/auth` - Логин
- `POST /api/registration` - Регистрация
- `POST /api/logout` - Выход

### **Email API (Универсальный):**
- `POST /api/email/send` - Отправка email для всех форм

### **Формы:**
- `POST /api/forms/questions` - Вопросы пользователей
- `GET /api/forms/questions/public` - Публичные вопросы

### **Новости:**
- `GET /api/news` - Список новостей
- `GET /api/news/{id}` - Детали новости

### **Админ:**
- `GET /api/admin/stats` - Статистика
- `GET /api/admin/submissions` - Заявки

## 🔧 **УСТАНОВКА И ЗАПУСК**

### **1. Клонирование:**
```bash
git clone https://github.com/Ekventor/BilimCert.git -b backend1
cd BilimCert
```

### **2. Создание виртуального окружения:**
```bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
# или
venv\Scripts\activate     # Windows
```

### **3. Установка зависимостей:**
```bash
pip install -r requirements.txt
```

### **4. Настройка переменных окружения:**
```bash
cp .env.example .env
# Отредактируйте .env с вашими настройками
```

### **5. Миграции базы данных:**
```bash
cd BilimCert
python manage.py makemigrations
python manage.py migrate
```

### **6. Создание суперпользователя:**
```bash
python manage.py createsuperuser
```

### **7. Запуск сервера:**
```bash
python manage.py runserver 8000
```

## 📊 **API СХЕМЫ**

### **Регистрация:**
```python
class RegisterSchema(BaseModel):
    username: str
    email: EmailStr
    password: str
    auth: Optional[bool] = False
    recaptcha_token: str
```

### **Логин:**
```python
class LoginSchema(BaseModel):
    username: str
    password: str
    recaptcha_token: str
```

### **Email отправка:**
```python
subject: str = Form(...)
message: str = Form(...)
to: str = Form(...)
isFiles: bool = Form(False)
file: UploadedFile = File(None)
recaptcha_token: str = Form(...)
```

## 🔐 **БЕЗОПАСНОСТЬ**

- **reCAPTCHA** для всех форм
- **CSRF** защита
- **CORS** настройки
- **Rate limiting**
- **SQL injection** защита

## 🚀 **РАЗВЕРТЫВАНИЕ**

### **Production настройки:**
```bash
# Установите переменные окружения
export DEBUG=False
export SECRET_KEY=your_secret_key
export DATABASE_URL=postgresql://user:pass@host:port/db
export ALLOWED_HOSTS=your-domain.com
```

### **Gunicorn запуск:**
```bash
gunicorn BilimCert.wsgi:application --bind 0.0.0.0:8000
```

## 📝 **РАЗРАБОТКА**

### **Добавление новых API endpoints:**
1. Создайте схемы в `api/schemas.py`
2. Добавьте views в `api/views.py`
3. Зарегистрируйте URL в `api/urls.py`

### **Тестирование:**
```bash
python manage.py test
```

### **Линтинг:**
```bash
flake8 .
black .
```

## 🔗 **ИНТЕГРАЦИЯ С FRONTEND**

Frontend должен обращаться к API endpoints:
- **Base URL:** `http://localhost:8000/api`
- **Authentication:** Session-based
- **CORS:** Настроен для frontend домена

## 📞 **ПОДДЕРЖКА**

Для вопросов по backend разработке обращайтесь к документации Django и Django Ninja.
