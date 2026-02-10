<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo
### 1. Clonar repositorio
### 2. Ejecutar
```
pnpm install
```
### 3. Tenes Nest CLI instalado
```
pnpm i -g @nestjs/cli
```
### 4. Levantar la base de datos
```
docker-compose up -d
```

### 5. Clonar env.template y renombrar a .env

### 6. Llenar las variables de entorno definidas en .env

### 7. Ejecutar
```
pnpm run start:dev
```

### 8. Ejecutar la seed de la base de datos
```
http://localhost:3000/api/v2/seed
```

# Stack
### * MongoDB
### * NestJS
