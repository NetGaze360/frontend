#!/bin/sh
set -e

# Asegurarse de que el directorio de trabajo existe y cambiar a él
mkdir -p /usr/src/app
cd /usr/src/app

# Instalar dependencias
npm install

# Ejecutar el comando proporcionado en la línea de comandos de Docker
exec "$@"