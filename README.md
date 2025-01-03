# PruebaTecnica_Node.js

Este proyecto es una API RESTful para la gestión de tareas. Permite crear, leer, actualizar y eliminar tareas, así como administrar su estado y asignación a usuarios.

---

## Índice

1. [Requisitos](#requisitos)
2. [Configuración local](#configuración-local)
3. [Ejecución del proyecto](#ejecución-del-proyecto)
4. [Documentación de la API](#documentación-de-la-api)
5. [Arquitectura y decisiones de diseño](#arquitectura-y-decisiones-de-diseño)
6. [Pruebas](#pruebas)

---

## Requisitos

- **Node.js** (LTS recomendado) - [Descargar Node.js](https://nodejs.org/)
- **MongoDB** (base de datos NoSQL)
- **NestJS CLI** (opcional, pero recomendado para una experiencia de desarrollo más fluida): `npm install -g @nestjs/cli`

---

## Deploy con Vercel
link = prueba-tecnica-damr0dmfn-francisco-imeronis-projects.vercel.app

## Configuración local

### Paso 1: Clonar el repositorio

``bash
git clone https://github.com/FranciscoImeroni/PruebaTecnica_Node.js.git
cd prueba-tecnica


## Paso 2: Instalar dependencias
bash
npm install

## Paso 3: Configurar las variables de entorno
Crea un archivo .env en la raíz del proyecto y agrega las siguientes variables de entorno:

env
MONGODB_URI=mongodb://localhost:27017/proyecto-tareas
PORT=3000

## Paso 4: Ejecutar el proyecto
bash
npm run start:dev
Este comando iniciará el servidor en modo de desarrollo (development), lo que permite realizar cambios en el código sin tener que reiniciar manualmente.

Ejecución del proyecto
Una vez que el proyecto esté en ejecución, puedes acceder a la API en la siguiente URL:

http
http://localhost:3000

## Endpoints disponibles
###  GET /tasks

Descripción: Obtiene todas las tareas.

Respuesta esperada:

json
[
  {
    "_id": "5f8f8c5b6c8e6a1f74f0a4b8",
    "name": "Tarea 1",
    "description": "Descripción de la tarea",
    "assignedUser": "60d21b4667d0d8992e610c86",
    "project": "60d21b4667d0d8992e610c85",
    "status": "PENDING",
    "dueDate": "2024-12-30T00:00:00.000Z",
    "createdAt": "2024-12-29T00:00:00.000Z",
    "updatedAt": "2024-12-29T00:00:00.000Z"
  }
]

###  POST /auth/register
Descripción: Registra un usuario.

Parámetros:
json
{
  "email": "usuario@example.com",
  "password": "123456"
}
Respuesta esperada:
json
{
  "message": "Usuario registrado con éxito",
  "user": {
    "id": "1234567890",
    "email": "usuario@example.com"
  }
}

###  POST /auth/login
Descripción: Inicia sesión y devuelve un token.

Parámetros:
json
{
  "email": "usuario@example.com",
  "password": "123456"
}
Respuesta esperada:
json
{
  "token": "jwt-token-generado"
}

###  POST /auth/logout
Descripción: Cierra sesión invalidando el token.

Parámetros:
json
{
  "token": "jwt-token-generado"
}
Respuesta esperada:
json
{
  "message": "Sesión cerrada correctamente"
}
ProjectsController

###  GET /projects
Descripción: Obtiene todos los proyectos existentes.

Respuesta esperada:
json
[
  {
    "id": "1",
    "name": "Proyecto A",
    "description": "Descripción del proyecto A",
    "users": ["user1", "user2"]
  }
]

###  POST /projects
Descripción: Crea un nuevo proyecto.

Parámetros:
json
{
  "name": "Nuevo Proyecto",
  "description": "Descripción del proyecto",
  "users": ["user1", "user2"]
}
Respuesta esperada:
json
{
  "id": "12345",
  "name": "Nuevo Proyecto",
  "description": "Descripción del proyecto",
  "users": ["user1", "user2"]
}

###  GET /projects/:id
Descripción: Obtiene un proyecto por su ID.

Respuesta esperada:
json
{
  "id": "1",
  "name": "Proyecto A",
  "description": "Descripción del proyecto A",
  "users": ["user1", "user2"]
}

###  PUT /projects/:id
Descripción: Actualiza los datos de un proyecto.

Parámetros:
json
{
  "name": "Proyecto Actualizado",
  "description": "Descripción actualizada",
  "users": ["user3"]
}
Respuesta esperada:
json
{
  "id": "1",
  "name": "Proyecto Actualizado",
  "description": "Descripción actualizada",
  "users": ["user3"]
}

###  DELETE /projects/:id
Descripción: Elimina un proyecto específico.

Respuesta esperada:
json
{
  "message": "Proyecto eliminado correctamente"
}

###  POST /tasks

Descripción: Crea una nueva tarea.

Parámetros:

json
{
  "name": "Tarea nueva",
  "description": "Descripción",
  "assignedUser": "60d21b4667d0d8992e610c86",
  "project": "60d21b4667d0d8992e610c85",
  "status": "PENDING",
  "dueDate": "2024-12-31T00:00:00.000Z"
}
Respuesta esperada:

json
{
  "_id": "5f8f8c5b6c8e6a1f74f0a4b9",
  "name": "Tarea nueva",
  "description": "Descripción",
  "assignedUser": "60d21b4667d0d8992e610c86",
  "project": "60d21b4667d0d8992e610c85",
  "status": "PENDING",
  "dueDate": "2024-12-31T00:00:00.000Z",
  "createdAt": "2024-12-29T00:00:00.000Z",
  "updatedAt": "2024-12-29T00:00:00.000Z"
}

### PUT /tasks/:id

Descripción: Actualiza una tarea específica.

Parámetros:

id: ID de la tarea a actualizar.

Cuerpo de la solicitud:

json
{
  "status": "IN_PROGRESS"
}
Respuesta esperada:

json
{
  "_id": "5f8f8c5b6c8e6a1f74f0a4b8",
  "name": "Tarea 1",
  "description": "Descripción",
  "assignedUser": "60d21b4667d0d8992e610c86",
  "project": "60d21b4667d0d8992e610c85",
  "status": "IN_PROGRESS",
  "dueDate": "2024-12-30T00:00:00.000Z",
  "createdAt": "2024-12-29T00:00:00.000Z",
  "updatedAt": "2024-12-29T00:00:00.000Z"
}

 ###  DELETE /tasks/:id

Descripción: Elimina una tarea específica.

Parámetros:

id: ID de la tarea a eliminar.
Respuesta esperada:

json
{
  "_id": "5f8f8c5b6c8e6a1f74f0a4b8",
  "name": "Tarea 1",
  "description": "Descripción",
  "assignedUser": "60d21b4667d0d8992e610c86",
  "project": "60d21b4667d0d8992e610c85",
  "status": "PENDING",
  "dueDate": "2024-12-30T00:00:00.000Z",
  "createdAt": "2024-12-29T00:00:00.000Z",
  "updatedAt": "2024-12-29T00:00:00.000Z"
}

### POST /tasks
Descripción: Crea una nueva tarea.

Parámetros:
json
{
  "name": "Nueva tarea",
  "description": "Descripción de la tarea",
  "project": "proyectoID",
  "assignedUser": "usuarioID",
  "status": "PENDING",
  "dueDate": "2024-12-30T00:00:00.000Z"
}
Respuesta esperada:
json
{
  "id": "12345",
  "name": "Nueva tarea",
  "description": "Descripción de la tarea",
  "status": "PENDING"
}

###  GET /tasks
Descripción: Obtiene todas las tareas.

###  GET /tasks/:id
Descripción: Obtiene una tarea específica por su ID.

Respuesta esperada:
json
{
  "id": "1",
  "name": "Tarea 1",
  "description": "Descripción de la tarea"
}


## Arquitectura
NestJS es utilizado como el framework principal para la construcción de la API, aprovechando sus características como la inyección de dependencias, la modularización y la estructura de controladores, servicios y módulos.
MongoDB se usa como base de datos NoSQL para almacenar las tareas, utilizando Mongoose para mapear los documentos a objetos JavaScript.
La API sigue el patrón RESTful, permitiendo una comunicación clara y sencilla.

## Decisiones de diseño
Modelo de datos: Cada tarea contiene propiedades como name, description, assignedUser, status, dueDate, y las fechas de creación y actualización.
Uso de ObjectId: Para los campos que se refieren a otras colecciones, como assignedUser y project, se utilizan ObjectId de Mongoose para garantizar una referencia consistente.
Estado de las tareas: Se define un sistema de estado para las tareas (PENDING, IN_PROGRESS, COMPLETED), lo que permite gestionar el flujo de trabajo de manera sencilla.

# Pruebas
Instrucciones para ejecutar las pruebas
Para ejecutar las pruebas, se utiliza Jest. Asegúrate de tener las dependencias instaladas, luego ejecuta el siguiente comando:

bash
npm run test
Este comando ejecutará todas las pruebas unitarias definidas en los archivos de prueba. Si deseas ejecutar las pruebas de integración, puedes utilizar:

bash
npm run test:e2e
