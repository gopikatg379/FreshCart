# Use official Python image
FROM python:3.11-slim

# Set environment variables to prevent interactive prompts
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    default-libmysqlclient-dev \
    libjpeg-dev \
    zlib1g-dev \
    && rm -rf /var/lib/apt/lists/*

# Set work directory
WORKDIR /app

# Copy and install dependencies
COPY requirements.txt .
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend project files
COPY . .

# Run migrations, collect static files, and start server
CMD ["sh", "-c", "python manage.py migrate && python manage.py collectstatic --noinput && gunicorn FreshCart.wsgi:application --bind 0.0.0.0:8000"]
