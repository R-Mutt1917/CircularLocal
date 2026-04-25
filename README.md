# 🌱 Circular Local

Plataforma web que impulsa la economía circular conectando cooperativas, recicladores y emprendedores sustentables.

---

## 📌 Descripción

**Circular Local** es una solución tecnológica orientada a fortalecer los circuitos productivos locales mediante la reutilización de materiales y la conexión entre actores de la economía circular.

El sistema permite publicar, buscar e intercambiar productos, servicios y materiales reutilizables, generando impacto social y ambiental positivo.

Este proyecto fue desarrollado en el marco de **XAcademy**, impulsado por Technology with Purpose Foundation y Santex

---

## 🎯 Objetivo

Fomentar la economía circular a nivel local facilitando la conexión entre distintos actores y promoviendo la reutilización de recursos.

---

## 🚀 Funcionalidades

* Registro de usuarios (actores de la economía circular)
* Publicación de:
  * Productos
  * Servicios
  * Materiales reciclables
* Sistema de contacto entre usuarios
* Clasificación por tipo de material o servicio
* Panel de administración y moderación
* Métricas de impacto:
  * Intercambios realizados
  * Materiales reutilizados

---

## 🛠️ Tecnologías utilizadas

**Frontend:**

* Angular
* TypeScript
* RxJS + HttpClient

**Backend:**

* Node.js
* Express
* Sequelize
* JWT + bcrypt

**Base de datos:**

* MySQL

**Otras herramientas:**

* Git & GitHub
* Postman
* Docker

---

## 🧱 Arquitectura

El sistema sigue una arquitectura **cliente-servidor**, donde:

* El frontend consume una API REST
* El backend gestiona la lógica de negocio
* La base de datos almacena usuarios, publicaciones y métricas

---

## 📂 Estructura del Proyecto

**Frontend:**

```
core/
    guards/
    interceptors/
    services/
features/
    admin/
    public/
    user/
layout/
shared/
```

**Backend:**

```
config/
controllers/
dto/
middlewares/
models/
routes/
seeds/
services/
utils/
```

---

# 🚀 Cómo levantar el proyecto

El proyecto se encuentra completamente dockerizado, por lo que no requiere configuraciones manuales adicionales para su ejecución básica.

## 🔧 Requisitos previos

* Docker
* Docker Compose

## ▶️ Ejecución

Desde la raíz del proyecto, ejecutar:

```
docker compose up --build
```

Esto levantará los siguientes servicios:

* Backend
* Frontend
* MySQL

---

## ▶️ Uso

1. Registrarse en la plataforma
2. Crear una publicación (producto, servicio o material)
3. Explorar publicaciones de otros usuarios
4. Contactar para realizar intercambios
5. Visualizar impacto generado

---

## 🧪 Endpoints

| Método | Endpoint                                | Descripción                      |
| ------ | --------------------------------------- | -------------------------------- |
| POST   | `/api/auth/register`                    | Registra un nuevo usuario        |
| POST   | `/api/auth/login`                       | Inicia sesión y devuelve un JWT  |
| POST   | `/api/publicaciones`                    | Crear una publicacion            |
| GET    | `/api/publicaciones`                    | Listar publicaciones con filtros |
| GET    | `/api/publicaciones/:id`                | Buscar publicacion por ID        |
| PUT    | `/api/publicaciones/:id`                | Actualizar una publicacion       |
| DELETE | `/api/publicaciones/:id`                | Eliminar una publicacion         |
| POST   | `/api/solicitudes`                      | Crear una solicitud              |
| PATCH  | `/api/solicitudes/:id/aceptar`          | Aceptar una solicitud            |
| PATCH  | `/api/solicitudes/:id/rechazar`         | Rechazar una solicitud           |
| PATCH  | `/api/intercambios/:id/confirmar`       | Confirmar un intercambio         |
| PATCH  | `/api/intercambios/:id/cancelar`        | Cancelar un intercambio          |
| GET    | `/api/admin/metricas`                   | Consultar metricas de impacto    |
| PATCH  | `/api/admin/publicaciones/:id/cancelar` | Eliminar una publicacion         |
| PATCH  | `/api/admin/usuarios/:id/ban`           | Banear un usuario                |

---

# 👥 Equipo

* Fatu, Javier Alejandro
* Medina, Juan Pablo
* Vanega, Ayrton
* Zelarayán, Matías
