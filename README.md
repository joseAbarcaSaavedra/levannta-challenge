# Levannta Project

Este repositorio contiene una aplicación completa dividida en dos partes que resuelve el desafío para postular como [FullStack Developer Senior en Levannta](https://longing-power-1cb.notion.site/Prueba-T-cnica-Desarrollador-Full-Stack-Senior-56896f3adede4ff691e0da006d2ff480):

1. **Backend (`levannta-server`)**: Construido con [NestJS](https://nestjs.com/), gestiona la lógica del servidor y las APIs.
2. **Frontend (`levannta-client`)**: Construido con [React](https://reactjs.org/), proporciona la interfaz de usuario.

## Requisitos

Asegúrate de tener instalados los siguientes elementos antes de comenzar:

- **Node.js**: Versión 16 o superior.
- **npm** o **yarn**: Para la gestión de dependencias.
- **Postman o herramienta similar**: (Opcional) para probar APIs.
- **Git**: Para clonar el repositorio.

---

## Estructura del Proyecto

```plaintext
levannta/
├── levannta-server/   # Backend (NestJS)
├── levannta-client/   # Frontend (React)
└── README.md          # Este archivo
```

## Comentarios

La elección de las tecnologías utilizadas en este proyecto se basó principalmente en mi experiencia previa con JavaScript/TypeScript y en la necesidad de optimizar los tiempos de desarrollo. Para el backend, seleccioné NestJS, una plataforma que ofrece una infraestructura robusta y modular, permitiendo un desarrollo rápido y escalable. Su integración nativa con TypeScript facilita un tipado fuerte, lo que mejora la mantenibilidad y la detección de errores en tiempo de desarrollo (aunque, debido a los plazos del desafío, quedaron algunos usos de any que podrían ser refinados en iteraciones futuras).

En el diseño del backend, utilicé el patrón de diseño Facade, que simplifica las interacciones con servicios complejos y mejora la modularidad al exponer una interfaz coherente. Como base de datos opté por SQLite, una solución ligera y fácil de configurar, adecuada para cumplir con los requisitos del desafío en un entorno de desarrollo rápido.

En el frontend, empleé React, una biblioteca ampliamente adoptada y versátil para la creación de interfaces dinámicas. Para el diseño de la UI, seleccioné Material-UI (MUI), que proporciona componentes preconstruidos y personalizables que aceleran el desarrollo y aseguran una experiencia de usuario coherente. Para la gestión de solicitudes HTTP, utilicé Axios, aprovechando su flexibilidad para implementar interceptores y manejar errores de manera centralizada. En cuanto a los patrones de diseño, implementé el patrón Factory para encapsular la creación de instancias y el patrón Views para separar las responsabilidades de componentes reutilizables y vistas específicas, mejorando la legibilidad, la organización y la flexibilidad del código.

En conjunto, estas decisiones tecnológicas y de diseño permitieron abordar el desafío de manera eficiente, maximizando la productividad y asegurando una base sólida para futuras extensiones o adaptaciones.
