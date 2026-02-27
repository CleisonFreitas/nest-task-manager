#!/bin/bash

set -e

echo "🚀 Iniciando setup da aplicação..."

# -----------------------------
# 1️⃣ Verificar Docker
# -----------------------------

if ! command -v docker &> /dev/null
then
    echo "❌ Docker não está instalado."
    exit 1
fi

if ! docker info > /dev/null 2>&1
then
    echo "❌ Docker não está rodando."
    exit 1
fi

echo "✅ Docker detectado."

# -----------------------------
# 2️⃣ Verificar docker compose
# -----------------------------

if ! docker compose version &> /dev/null
then
    echo "❌ Docker Compose não encontrado."
    exit 1
fi

echo "✅ Docker Compose detectado."

# -----------------------------
# 3️⃣ Criar .env se não existir
# -----------------------------

if [ -f ".env" ]; then
    echo "⚠️  Arquivo .env já existe."
else
    echo "📄 Criando .env..."

    cp .env.example .env

    generate_secret() {
        openssl rand -hex 32
    }

    MYSQL_ROOT_PASSWORD=$(generate_secret)
    MYSQL_PASSWORD=$(generate_secret)
    JWT_SECRET=$(openssl rand -hex 64)

    sed -i.bak "s|MYSQL_ROOT_PASSWORD=|MYSQL_ROOT_PASSWORD=${MYSQL_ROOT_PASSWORD}|" .env
    sed -i.bak "s|MYSQL_PASSWORD=|MYSQL_PASSWORD=${MYSQL_PASSWORD}|" .env
    sed -i.bak "s|DATABASE_PASSWORD=|DATABASE_PASSWORD=${MYSQL_PASSWORD}|" .env
    sed -i.bak "s|JWT_SECRET=|JWT_SECRET=${JWT_SECRET}|" .env

    rm .env.bak

    echo "🔐 Secrets gerados com sucesso."
fi

# -----------------------------
# 4️⃣ Build e subida dos containers
# -----------------------------

echo "🐳 Buildando imagens..."
docker compose build

echo "🐳 Subindo containers..."
docker compose up -d

echo ""
echo "✅ Ambiente configurado com sucesso!"
echo ""
echo "🌍 API: http://localhost:3000"
echo "📘 Swagger: http://localhost:3000/docs"
echo ""
echo "📦 Para visualizar logs:"
echo "docker compose logs -f"