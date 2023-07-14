# App para generar token

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

```bash
docker compose up -d

docker compose build

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
