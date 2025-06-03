### Projeto Next Auth Better

#### 1. Passo

``` .doc
https://www.better-auth.com/docs/installation
```

``` 1 installar auth
npm install better-auth
```

``` 2 .env
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_URL="http://localhost:3000"
BETTER_AUTH_SECRET=e87QsWIOK0RfX7jHM85NuLQD8OIkz5Wc
DATABASE_URL="postgresql://betterDB_owner:npg_sUxMfynCe38d@ep-jolly-art-ac0e7y56-pooler.sa-east-1.aws.neon.tech/betterDB?sslmode=require"
```

``` 3 gerar conexao
npx prisma generate
```

> * lib/prisma.ts
``` 4 gera Client
import { PrismaClient } from '../generated/prisma/client'

export const prisma = new PrismaClient()
```

> * lib/auth.ts
``` 5 gera auth
import { betterAuth } from "better-auth";
 
import { prismaAdapter } from "better-auth/adapters/prisma";
// If your Prisma file is located elsewhere, you can change the path
import { PrismaClient } from "@/generated/prisma";
 
const prisma = new PrismaClient();
export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
});
```

> * Prisma migrate
``` 6 gera as tabelas
npx @better-auth/cli generate
npx prisma migrate dev --name first-tables
npx prisma studio
```

> * src/app/api/auth/[...all]/route.ts
``` 7 gera as rotas
import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js"

export const { POST, GET } = toNextJsHandler(auth)
```

> * src/lib/auth-client.ts
``` 8 gera URL
import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({

    // baseURL: "http://localhost:3000",
    baseURL: process.env.NEXT_PUBLIC_URL || "http://localhost:3000",
});
```

> * src/app/signup/_components/signnup-form.tsx
```onSubmit
 async function onSubmit(formData: SignupFormValues) {
    console.log(formData)
    const { data, error } = await authClient.signUp.email({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      callbackURL: "/dashboard",
    }, {
      onRequest: (ctx) => {
      },
      onSuccess: (ctx) => {
        console.log("CADASTRADO COM SUCESSO", ctx)
        router.replace("/dashboard")
        console.log(ctx)
      },
      onError: (ctx) => {
        alert("Erro ao criar conta")
        console.log("ERRO AO CADASTRAR")
        console.log(ctx)
      }
    })
  }
```

#### Opcional
npm i --save-dev prisma@latest 
npm i @prisma/client@latest   
#### 2. Passo
#### 3. Passo
