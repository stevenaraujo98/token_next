# App para generar token

El proyecto cuenta con un archivo ".env.example" el cual debera ser utilizado para generar el archivo ".env".  
Se utiliza dockerizacion con NextJs tanto para front como para back ya que permite server-side y client-side, tambien se usa prisma como orm y Postgres como motor de base de datos.  
El ".env" contiene informacion para la conección con la base de datos.

### Docker

```bash
docker compose up -d

docker compose build
```

### Prisma

```bash
npx prisma migrate
```

### Paths

- /: permite crear nuevos clientes
- /clientes: permite ver los clientes registrados
- /generartoken: permite generar token de acuerdo al cliente
- /validartoken: permite validar el token generado

##### Referencias

- https://www.prisma.io/docs/reference/api-reference/error-reference#error-codes
- https://nextjs.org/docs/app/building-your-application/data-fetching/fetching
