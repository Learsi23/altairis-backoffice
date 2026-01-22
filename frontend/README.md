# Backoffice Altairis – MVP

MVP full-stack para gestión operativa de hoteles, desarrollado para demo comercial con FDSA.

## Características
- Gestión de hoteles (alta y listado con paginación)
- Validación de reservas (fechas, datos obligatorios)
- Arquitectura limpia con DTOs y separación de capas
- Ejecución completa con Docker

## Tecnologías
- Backend: .NET 9, Entity Framework Core, PostgreSQL
- Frontend: Next.js 16, Tailwind CSS
- Infraestructura: Docker, docker-compose

## Cómo ejecutar
1. Clonar el repositorio
2. Ejecutar: `docker-compose up --build`
3. Acceder a:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5182/swagger

## Notas
- El MVP cumple con los requisitos esenciales para la demo comercial.
- Diseñado para claridad operativa y facilidad de evolución.