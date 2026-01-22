Altairis Backoffice MVP 🚀

Este es el MVP operativo centralizado para Viajes Altairis, diseñado para gestionar catálogos de hoteles, tipos de habitación y reservas de manera eficiente en un entorno B2B.

🛠 Funcionalidades

Gestión de Hoteles: Crear, consultar, actualizar y eliminar hoteles y tipos de habitación.

Sistema de Reservas: Lógica validada de reservas con integración PostgreSQL.

Dashboard Operativo: Métricas clave y gráfico de actividad de reservas de los últimos 7 días.

Stack Moderno: Desarrollado con .NET 9, Next.js y PostgreSQL.

📦 Despliegue (Docker)

Toda la solución está contenida en Docker. Para levantar la base de datos, el backend y el frontend con un solo comando:

docker-compose up --build


💡 Nota: Para probar el flujo completo, crea algunos hoteles desde el frontend. Verás cómo se reflejan inmediatamente en el Dashboard Operativo.

🏃‍♂️ Cómo probar

Abre el frontend (http://localhost:3000) y registra uno o varios hoteles.

Crea reservas asociadas a los tipos de habitación.

Dirígete al Dashboard Operativo para ver métricas y gráficos actualizados.

⚡ Mejoras futuras (opcionales)

Filtros avanzados en hoteles y reservas.

Indicadores de ingresos y estado de ocupación.

Mejoras visuales como tooltips y notificaciones.


