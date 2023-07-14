# App para generar token

El proyecto cuenta con un archivo ".env.example" el cual debera ser utilizado para generar el archivo ".env".  
Se utiliza dockerizacion con NextJs tanto para front como para back ya que permite server-side y client-side, tambien se usa prisma como orm y Postgres como motor de base de datos.  
El ".env" contiene informacion para la conección con la base de datos.

El sistema permite crear usuarios unicos con sus username, para generar los token desde la ruta "/generartoken" permite ingresar el nombre del cliente y se muestra un cuadro donde un contador de 60 segundos inicia y se refresca al terminar ese tiempo. Para validar el token acceder a la ruta "/validartoken" ingresando el usuario y el token.

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
