# 🧠 Club La Nación Challenge – Backend API

📌 **Overview**

Este es el backend desarrollado en **Node.js + TypeScript + Express** para el challenge técnico de Club La Nación. Expone endpoints que permiten consultar cuentas promocionales a partir de un archivo `JSON` mockeado, con filtros avanzados, ordenamiento y paginación. El código está estructurado siguiendo principios de **Clean Architecture** y buenas prácticas de escalabilidad y mantenibilidad.

---

🚀 **Tech Stack**

- **Node.js + Express** → Backend eficiente con API REST.
- **TypeScript** → Tipado estático y desarrollo más robusto.
- **Clean Architecture Inspired** → Separación clara entre controladores, servicios, repositorios y lógica de negocio.
- **Mock de datos (JSON)** → Fuente de datos simulada (`utils/accounts.json`).

---

📁 **Estructura del Proyecto**

```
/src
 ├── controllers
 ├── enums
 ├── factories
 ├── interfaces
 ├── middlewares
 ├── repositories
 ├── routes
 ├── services
 ├── utils
 │   └── accounts.json
 ├── index.ts
 └── server.ts
```

---

## 🛠 **Endpoints Disponibles**

### 1️⃣ `GET /api/accounts/getByTag`

Filtra cuentas por tag, ordena por cercanía de sucursal y permite paginación.

#### 🔸 Parámetros:

| Nombre     | Tipo   | Requerido | Descripción                                                                              |
| ---------- | ------ | --------- | ---------------------------------------------------------------------------------------- |
| `tag`      | string | ✅        | Tag que debe tener la cuenta (ej: `Turismo en Buenos Aires`)                             |
| `offset`   | string | ❌        | Índice inicial (para paginación)                                                         |
| `limit`    | string | ❌        | Cantidad de elementos a devolver                                                         |
| `orderAsc` | string | ❌        | `"true"` o `"false"` → Ordena por distancia ascendente o descendente (default: `"true"`) |

#### 🔹 Ejemplo de llamada:

```bash
GET /api/accounts/getByTag?tag=Turismo en Buenos Aires&limit=1
```

#### 🔹 Ejemplo de respuesta:

```json
[
  {
    "url": "https://club.lanacion.com.ar/A03718667",
    "name": "EL NOBLE",
    "location": 23,
    "type_benefit": [
      {
        "program_name": "Club La Nación Black",
        "value": 20
      },
      {
        "program_name": "Club La Nación Premium",
        "value": 20
      }
    ],
    "image": {
      "id": "A765369",
      "type": "busqueda",
      "url": "http://bucket1.glanacion.com/Club.LN/anexos/fotos/69/A765369.jpg",
      "highlighted": false,
      "thumb": true
    }
  }
]
```

---

### 2️⃣ `GET /api/accounts/getByFlag`

Filtra cuentas por flag `haveVoucher`, ordena alfabéticamente y permite paginación.

#### 🔸 Parámetros:

| Nombre        | Tipo   | Requerido | Descripción                                                               |
| ------------- | ------ | --------- | ------------------------------------------------------------------------- |
| `haveVoucher` | string | ✅        | `"true"` o `"false"` → Filtra por flag de voucher activo                  |
| `offset`      | string | ❌        | Índice inicial (para paginación)                                          |
| `limit`       | string | ❌        | Cantidad de elementos a devolver                                          |
| `orderDesc`   | string | ❌        | `"true"` o `"false"` → Ordena por nombre descendente (default: `"false"`) |

#### 🔹 Ejemplo de llamada:

```bash
GET /api/accounts/getByFlag?haveVoucher=true&limit=2&orderDesc=true
```

#### 🔹 Ejemplo de respuesta:

```json
[
  {
    "name": "BRIDGESTONE",
    "url": "https://club.lanacion.com.ar/A16677",
    "image": "http://bucket1.glanacion.com/Club.LN/anexos/fotos/43/A765943.png"
  },
  {
    "name": "EL NOBLE",
    "url": "https://club.lanacion.com.ar/A03718667",
    "image": "http://bucket1.glanacion.com/Club.LN/anexos/fotos/69/A765369.jpg"
  }
]
```

---

## 📄 Variables de entorno

Crear un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```
LN_BASE_URL=https://club.lanacion.com.ar
PORT=3000
```

---

## 🧪 **Cómo ejecutar el proyecto**

### 🔧 Local

1️⃣ Cloná el repositorio:

```bash
git clone https://github.com/tu-usuario/club-ln-backend.git
```

2️⃣ Instalá dependencias:

```bash
npm install
# o
yarn install
# o
pnpm
```

3️⃣ Iniciá el servidor:

```bash
npm run dev
# o
pnpm run dev
# o
yarn dev
```

4️⃣ Probá los endpoints:

```
GET http://localhost:3000/api/accounts/getByTag?tag=Turismo%20en%20Buenos%20Aires
GET http://localhost:3000/api/accounts/getByFlag?haveVoucher=true
```

---

### 🐳 Con Docker

Asegurate de tener Docker instalado y luego ejecutá:

```bash
docker build -t club-ln-backend .
docker run -p 3000:3000 --env-file .env club-ln-backend
```

---

📦 Dockerfile utilizado:

```Dockerfile
# Imagen base con Node.js + Alpine
FROM node:21-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run","start"]
```

---

🎯 **Objetivos Técnicos Alcanzados**

✅ Endpoints RESTful con filtros, ordenamiento y paginación  
✅ Separación por capas (controladores, servicios, repositorios)  
✅ Estructura escalable y mantenible  
✅ Uso de TypeScript y tipado en todas las capas  
✅ Variables de entorno centralizadas  
✅ Docker-ready para despliegue rápido

Perfecto, humano del bien. Incorporé esa parte con un lenguaje más claro y profesional en una sección adicional sobre **manejo de errores y mejoras futuras**. Así queda la sección completa:

---

## 📝 Notas de Implementación

### 🔹 Stack y decisiones técnicas

- Se utilizó **TypeScript** para aprovechar el tipado estático y reducir errores en tiempo de desarrollo y compilación.
- La arquitectura sigue principios de **Programación Orientada a Objetos (POO)**, lo cual facilita el testing, la reutilización de código y la mantenibilidad.
- Se implementó **inyección de dependencias** utilizando los patrones **Factory** y **Repository**, lo que permite una arquitectura desacoplada y escalable.
- Aprovechamos el tipado de TypeScript para definir métodos privados como `getClosestBranch` y `getHighestBenefit`, sin necesidad de validaciones adicionales (`null` o `undefined`) gracias a los contratos definidos con interfaces.

### 🔹 Consideraciones sobre el dataset (`accounts.json`)

- El archivo de datos simulado se encuentra en `src/utils/accounts.json` y es copiado al build mediante el paquete de desarrollo `cpx`.

### ⚙️ Sobre la asincronía

- Dado que no se utiliza una base de datos ni operaciones asíncronas, se optó por implementar los métodos de los controladores como funciones síncronas.
- Sin embargo, se podrían transformar fácilmente en funciones `async` si en un futuro se conectan a un sistema externo o base de datos.

### 🧯 Manejo de errores y mejoras futuras

- Se implementó un **sistema de manejo global de errores**, que incluye middlewares centralizados para capturar excepciones conocidas.
- También se configuraron **event listeners del sistema** para manejar errores no controlados y excepciones no detectadas a tiempo de ejecución, evitando caídas inesperadas de la aplicación.
- Como mejora futura, se podría implementar:
  - Un sistema de **logs persistentes** para registrar los errores y eventos críticos.
  - Un mecanismo de **notificaciones o alertas** en caso de errores en producción.
  - **Test unitarios** para los distintos módulos del backend, que por razones de tiempo no se pudieron incluir en esta entrega.

---

¿Querés que te lo agregue ya mismo al `README.md` o preferís revisar el del frontend primero, humano del bien?
