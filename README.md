# Diciembre mágico

Calendario navideño interactivo y privado (MVP) construido con **React + Vite + TypeScript**, autenticación con **Firebase Authentication** y despliegue preparado para **Cloudflare Pages** (incluyendo Pages Functions para proteger los enlaces especiales).

## Funcionalidades incluidas

- **Acceso privado**: pantalla de inicio de sesión como primera vista, sin registro ni creación de cuentas desde la aplicación.
- **Autenticación con Firebase**: inicio/cierre de sesión con correo y contraseña, persistencia de sesión y detección con `onAuthStateChanged`.
- **Rutas protegidas**: el calendario solo es accesible con sesión iniciada; si no hay sesión se redirige al login.
- **Calendario de diciembre (31 días)** con tarjetas interactivas, distribución adaptable (móvil/tableta/escritorio) y estética navideña.
- **6 días especiales configurables** (14, 21, 24, 25, 30 y 31): consultan una URL privada en el servidor y redirigen solo tras validar la sesión.
- **25 experiencias navideñas** para el resto de días (tarjetas, regalos, sobres y sorpresas) con animaciones y mensajes en modal.
- **Configuración centralizada** de año, textos, días, tipos de experiencia y mensajes en `src/config/december.ts`.
- **Pages Function protegida** (`GET /api/redirect/:day`) que verifica el token de Firebase, el usuario autorizado, el día permitido y que la URL use HTTPS.
- Preparado para **Cloudflare Pages** (`npm run build`, salida `dist`, funciones en `functions/`, SPA fallback en `public/_redirects`).

## Tecnologías

- React 19, Vite 7, TypeScript
- React Router
- Mantine UI
- Zod
- Firebase Authentication (Web SDK)
- Lucide React
- CSS Modules / CSS
- Cloudflare Pages + Pages Functions
- `jose` (verificación de ID tokens de Firebase en la función)

## Requisitos previos

- Node.js **20.19+** o **22.12+** (recomendado el mismo entorno que use Cloudflare Pages; este proyecto se desarrolló con Node 26).
- npm
- Cuenta de Firebase
- Cuenta de Cloudflare (para desplegar)
- Repositorio en GitHub (origen del despliegue)

## Instalación y uso local

```bash
npm install
npm run dev
```

- `npm run dev`: entorno de desarrollo de Vite (frontend). **Las rutas `/api/*` no se ejecutan en este modo**; los días especiales mostrarán un error de enlace hasta que pruebes con Cloudflare Pages o con el entorno de Functions local.
- `npm run build`: compilación de producción (`tsc --noEmit && vite build`).
- `npm run preview`: previsualiza la build de Vite.
- `npm run check`: comprobaciones de tipos (app + funciones) y build.
- `npm run dev:cf`: compila y sirve con `wrangler pages dev dist` (útil para probar Pages Functions en local; requiere variables en `.dev.vars` o en el entorno, ver más abajo).

> Nota: `npm install` puede mostrar avisos de `install-scripts` no aprobados en algunos entornos; las dependencias quedan instaladas y el proyecto compila.

## Estructura principal

```text
src/
  assets/
  components/
    auth/        (LoginForm, ProtectedRoute)
    calendar/    (CalendarGrid, DayCard, SpecialDayCard)
    christmas/   (ChristmasCard, GiftBox, Envelope, Surprise, ChristmasModal)
    layout/      (AppLayout, Header)
  config/        (december.ts: año, días, mensajes y días especiales)
  contexts/      (AuthContext)
  hooks/         (useAuth)
  lib/           (firebase, authErrors, specialLinks)
  pages/         (LoginPage, CalendarPage, NotFoundPage)
  schemas/       (auth.schema, redirect.schema)
  styles/        (global.css)
  types/         (index.ts)
functions/
  api/redirect/[day].ts   (Pages Function protegida)
public/
  _redirects              (SPA fallback para React Router)
  _routes.json            (limita Functions a /api/*)
```

## Configuración de Firebase (paso a paso)

1. **Crear un proyecto** en [Firebase Console](https://console.firebase.google.com/).
2. **Activar Authentication**: en el menú lateral, entra en *Build > Authentication* y pulsa *Get started*.
3. **Habilitar el proveedor**: en *Sign-in method*, habilita **Email/Password** (no es necesario habilitar el enlace sin contraseña).
4. **Crear manualmente el único usuario autorizado**: en *Authentication > Users*, usa *Add user* e introduce el correo y la contraseña de la persona que podrá acceder. **No se implementa registro en la aplicación.**
5. **Obtener la configuración web**: ve a *Project settings* (⚙️) > *Your apps*. Si no existe, crea una app Web (`</>`), registra un apodo y copia los valores de configuración (`apiKey`, `authDomain`, `projectId`, `storageBucket`, `messagingSenderId`, `appId`).
6. **Colocar los valores en `.env.local`** (en la raíz del proyecto, archivo no versionado). Puedes partir de `.env.example`:

```env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

7. **Obtener el UID del usuario autorizado**: en *Authentication > Users*, copia el **User UID** del usuario creado. Lo necesitarás como `ALLOWED_UID` en Cloudflare.
8. **Autorizar dominios**: en *Authentication > Settings > Authorized domains*, asegúrate de que estén `localhost` (desarrollo) y tu dominio de Cloudflare Pages (por ejemplo `tu-proyecto.pages.dev` y/o dominio personalizado).

## Variables que debes completar

### Frontend (públicas, van en `.env.local` y/o en Cloudflare como variables de build `VITE_*`)

| Variable | Dónde obtenerla | Descripción |
| --- | --- | --- |
| `VITE_FIREBASE_API_KEY` | Firebase Console > Project settings > Your apps | API key pública de la app web |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase Console | Dominio de auth (p. ej. `tu-proyecto.firebaseapp.com`) |
| `VITE_FIREBASE_PROJECT_ID` | Firebase Console | ID del proyecto |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase Console | Bucket de almacenamiento (opcional para auth, recomendado) |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase Console | ID del remitente (opcional, recomendado) |
| `VITE_FIREBASE_APP_ID` | Firebase Console | ID de la app web |

> Estas variables se incluyen en el bundle del navegador (es el comportamiento normal del SDK web de Firebase). **Nunca** coloques contraseñas ni los enlaces privados como `VITE_*`.

### Servidor / Cloudflare Pages (privadas, **NO** `VITE_*`)

Configúralas en **Cloudflare Dashboard > Pages > tu proyecto > Settings > Environment variables** (para Production y, si aplica, Preview):

| Variable | Descripción |
| --- | --- |
| `FIREBASE_PROJECT_ID` | ID del proyecto de Firebase (se usa para verificar el emisor/audiencia del token) |
| `ALLOWED_UID` | UID del único usuario autorizado (Firebase Authentication > Users) |
| `DAY_14_URL` | URL externa (HTTPS) para el día 14 |
| `DAY_21_URL` | URL externa (HTTPS) para el día 21 |
| `DAY_24_URL` | URL externa (HTTPS) para el día 24 |
| `DAY_25_URL` | URL externa (HTTPS) para el día 25 |
| `DAY_30_URL` | URL externa (HTTPS) para el día 30 |
| `DAY_31_URL` | URL externa (HTTPS) para el día 31 |

- Las 6 URLs deben ser **HTTPS**. Si falta alguna o no es válida, la función no devolverá el enlace y el frontend mostrará un error.
- Para probar Functions en local con Wrangler puedes crear un archivo `.dev.vars` (no versionado) con estas mismas claves.

## Protección de enlaces externos

- El frontend llama a `GET /api/redirect/:day` enviando el ID token de Firebase en `Authorization: Bearer <token>`.
- La función (`functions/api/redirect/[day].ts`) verifica criptográficamente el token con las claves públicas de Firebase (JWKS) usando `jose`, comprueba que el `uid` coincide con `ALLOWED_UID`, que el día es uno de los permitidos y que la URL configurada es HTTPS.
- Las direcciones externas se leen **solo** de variables de entorno del servidor y **nunca** se incluyen en el bundle de React.
- Respuestas: `401` si no hay autenticación válida, `404` si el día no es especial o el enlace no está configurado, `500` si la URL configurada no es HTTPS.

## Despliegue en Cloudflare Pages (desde GitHub)

1. Sube el proyecto a un repositorio de GitHub.
2. En Cloudflare Dashboard, ve a **Workers & Pages > Create > Pages > Connect to Git** y selecciona el repositorio.
3. Configura el build:
   - **Framework preset**: React (Vite) / None (ambos funcionan con estos valores)
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: *(vacío, raíz del repo)*
4. Añade las **variables de entorno**:
   - Las `VITE_FIREBASE_*` como variables de entorno del build/entorno según corresponda.
   - Las variables privadas del servidor (`FIREBASE_PROJECT_ID`, `ALLOWED_UID`, `DAY_*_URL`) en *Settings > Environment variables* (Production/Preview).
5. Despliega. Cloudflare detectará el directorio `functions/` y publicará las Pages Functions automáticamente.
6. En Firebase, añade el dominio de Pages (`*.pages.dev` o tu dominio personalizado) a *Authentication > Settings > Authorized domains*.
7. (Recomendado) Tras el primer despliegue, verifica que `/api/redirect/14` sin autenticación responde `401` y que el calendario redirige correctamente con sesión válida y enlaces configurados.

## Comprobaciones realizadas

- `npm install` completado.
- `npm run check` / `tsc --noEmit` / `tsc -p tsconfig.functions.json --noEmit` / `npm run build` ejecutados correctamente (ver resumen de entrega).

## Seguridad y notas importantes

- **No hay registro** ni creación de cuentas en la aplicación; el usuario se crea manualmente en Firebase Console.
- No se guardan contraseñas en `localStorage`; Firebase gestiona la sesión con su persistencia.
- La protección visual de rutas usa React Router, pero la verificación real de acceso a los enlaces privados ocurre en la **Pages Function** (lado servidor).
- **Limitación de privacidad en sitios estáticos**: los archivos públicos (HTML/CSS/JS del bundle) pueden descargarse aunque no se muestre el calendario sin sesión. Esto no expone los enlaces privados (se obtienen solo desde el servidor tras validar el token), pero la interfaz/recursos siguen siendo descargables. Si necesitas impedir incluso la descarga pública de los recursos, añade una capa de **[Cloudflare Access](https://developers.cloudflare.com/cloudflare-one/policies/access/)** (Zero Trust) delante del sitio para exigir autenticación antes de servir cualquier archivo, y documenta/coordina esa política con tu despliegue.
- Las redirecciones están limitadas a las 6 fechas permitidas y solo a URLs `https://` configuradas en el servidor.

## Personalización rápida

- **Año, textos y contenido de los días**: `src/config/december.ts`.
- **Días especiales**: lista y etiquetas en `src/config/december.ts`; URLs en variables `DAY_*_URL` de Cloudflare.
- **Estilos/tema**: `src/styles/global.css`, módulos CSS de componentes y tema de Mantine en `src/main.tsx`.

## Tareas manuales pendientes (requieren tus credenciales)

- Crear el proyecto en Firebase, habilitar Email/Password y crear el usuario autorizado.
- Rellenar `.env.local` con las variables `VITE_FIREBASE_*`.
- Configurar en Cloudflare las variables privadas (`FIREBASE_PROJECT_ID`, `ALLOWED_UID`, `DAY_14_URL`…`DAY_31_URL`).
- Conectar el repositorio en Cloudflare Pages y desplegar.
- Añadir el dominio de despliegue a los dominios autorizados de Firebase.

Sin estas credenciales/variables no es posible verificar de extremo a extremo el inicio de sesión real ni la resolución de los 6 enlaces especiales; la compilación, la estructura y la lógica de validación/protección sí están implementadas y comprobadas.
# Diciembe
# Diciembe
