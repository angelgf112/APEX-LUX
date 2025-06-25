# Sistema de Generación de Códigos QR - Apex Lux Automotive

## Descripción General

Este sistema permite generar códigos QR con datos de cotizaciones obtenidos desde Firebase a través de una API propia en Node.js. El flujo completo es:

1. **Angular** → Llama a la API de Node.js
2. **Node.js** → Obtiene datos de Firebase
3. **Node.js** → Devuelve datos a Angular
4. **Angular** → Genera el código QR con los datos

## Arquitectura del Sistema

```
┌─────────────┐    HTTP    ┌─────────────┐    Firebase    ┌─────────────┐
│   Angular   │ ────────── │   Node.js   │ ────────────── │   Firebase  │
│  Frontend   │            │    API      │                │   Database  │
└─────────────┘            └─────────────┘                └─────────────┘
       │                           │
       │                           │
       ▼                           ▼
┌─────────────┐            ┌─────────────┐
│   QR Code   │            │   JSON      │
│ Generation  │            │   Response  │
└─────────────┘            └─────────────┘
```

## Componentes Implementados

### 1. Backend (Node.js)
- **Ubicación:** `backend/`
- **Archivos principales:**
  - `server.js` - Servidor Express con endpoints de API
  - `package.json` - Dependencias del proyecto
  - `env.example` - Variables de entorno de ejemplo

### 2. Frontend (Angular)
- **Servicio QR:** `src/app/services/qr.service.ts`
- **Componente Generador:** `src/app/qr-generator/`
- **Componente Visor:** `src/app/qr-viewer/`

## Instalación y Configuración

### Paso 1: Configurar el Backend

```bash
# Navegar al directorio backend
cd backend

# Instalar dependencias
npm install

# Crear archivo de variables de entorno
cp env.example .env

# Editar .env con tus configuraciones
```

### Paso 2: Configurar Firebase

1. Obtener credenciales de Firebase Admin SDK
2. Colocar el archivo JSON en `backend/`
3. Actualizar `server.js` con la configuración

### Paso 3: Ejecutar el Backend

```bash
# Desarrollo
npm run dev

# Producción
npm start
```

### Paso 4: Ejecutar Angular

```bash
# En el directorio raíz
ng serve
```

## Uso del Sistema

### 1. Generar Código QR

1. Navegar a `http://localhost:4200/qr-generator`
2. Seleccionar una cotización de la lista o ingresar un ID
3. Hacer clic en "Generar QR"
4. El código QR se mostrará en pantalla
5. Opcional: Descargar la imagen del QR

### 2. Ver Datos del QR

1. Escanear el código QR generado
2. El QR contiene una URL como: `http://localhost:4200/qr-viewer/1`
3. Al acceder a esa URL se muestran los datos de la cotización

## Estructura de Datos

### Cotización (Interfaz TypeScript)
```typescript
interface Cotizacion {
  id: string;
  cliente: string;
  vehiculo: string;
  precio: number;
  fecha: string;
  estado: string;
  detalles?: {
    color: string;
    año: number;
    kilometraje: number;
    transmision: string;
  };
}
```

### Datos del QR
El código QR contiene un JSON con todos los datos de la cotización:
```json
{
  "id": "1",
  "cliente": "Juan Pérez",
  "vehiculo": "BMW M4",
  "precio": 85000,
  "fecha": "2024-01-15",
  "estado": "Pendiente",
  "detalles": {
    "color": "Negro",
    "año": 2024,
    "kilometraje": 0,
    "transmision": "Automática"
  }
}
```

## Endpoints de la API

### GET /api/health
- **Descripción:** Verifica el estado de la API
- **Respuesta:** `{ "status": "OK", "message": "API funcionando correctamente" }`

### GET /api/cotizaciones
- **Descripción:** Obtiene todas las cotizaciones
- **Respuesta:** Array de objetos `Cotizacion`

### GET /api/cotizaciones/:id
- **Descripción:** Obtiene una cotización específica por ID
- **Parámetros:** `id` - ID de la cotización
- **Respuesta:** Objeto `Cotizacion`

## Características Técnicas

### Librerías Utilizadas
- **Backend:** Express, Firebase Admin, CORS
- **Frontend:** Angular Material, QRCode.js, RxJS

### Configuración del QR
```typescript
const qrOptions = {
  errorCorrectionLevel: 'M',
  type: 'image/png',
  margin: 2,
  color: {
    dark: '#000000',
    light: '#FFFFFF'
  },
  width: 256
};
```

### Seguridad
- Las credenciales de Firebase están en el backend
- Angular NO hace llamadas directas a Firebase
- CORS configurado para permitir solo el frontend

## Rutas de la Aplicación

- `/qr-generator` - Generador de códigos QR
- `/qr-viewer/:id` - Visor de datos de cotización

## Funcionalidades Implementadas

### ✅ Completadas
- [x] API REST en Node.js
- [x] Conexión con Firebase (estructura preparada)
- [x] Servicio QR en Angular
- [x] Componente generador de QR
- [x] Componente visor de datos
- [x] Interfaz de usuario moderna
- [x] Manejo de errores
- [x] Responsive design
- [x] Descarga de códigos QR
- [x] Formateo de precios y fechas

### 🔄 Pendientes (Configuración)
- [ ] Configurar credenciales reales de Firebase
- [ ] Conectar con base de datos real
- [ ] Implementar autenticación si es necesario

## Solución de Problemas

### Error: "Cannot find module './qr-generator/qr-generator.component'"
- **Causa:** El componente no existe
- **Solución:** Verificar que todos los archivos del componente estén creados

### Error: "Type 'void & Promise<string>' is not assignable to type 'string'"
- **Causa:** Problema con la librería QRCode
- **Solución:** Usar `from()` de RxJS para convertir la Promise

### Error de CORS
- **Causa:** El backend no está configurado correctamente
- **Solución:** Verificar que CORS esté habilitado en el servidor

## Contribución

1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la licencia MIT. 