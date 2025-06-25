# Backend API - Apex Lux Automotive

Este es el backend en Node.js que proporciona una API REST para obtener datos de cotizaciones desde Firebase y generar códigos QR.

## Instalación

1. Navega al directorio del backend:
```bash
cd backend
```

2. Instala las dependencias:
```bash
npm install
```

3. Crea un archivo `.env` basado en `env.example`:
```bash
cp env.example .env
```

4. Configura las variables de entorno en el archivo `.env`:
```env
PORT=3000
CORS_ORIGIN=http://localhost:4200
```

## Configuración de Firebase

Para conectar con Firebase, necesitas:

1. **Obtener las credenciales de Firebase Admin SDK:**
   - Ve a la consola de Firebase
   - Configuración del proyecto > Cuentas de servicio
   - Genera una nueva clave privada
   - Descarga el archivo JSON

2. **Configurar las credenciales:**
   - Coloca el archivo JSON en el directorio `backend/`
   - Actualiza el archivo `server.js` con la ruta correcta
   - Descomenta las líneas de inicialización de Firebase

3. **Ejemplo de configuración en server.js:**
```javascript
const serviceAccount = require('./firebase-service-account-key.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://tu-proyecto.firebaseio.com"
});
```

## Ejecutar el servidor

### Desarrollo (con nodemon):
```bash
npm run dev
```

### Producción:
```bash
npm start
```

El servidor estará disponible en: `http://localhost:3000`

## Endpoints de la API

### GET /api/health
Verifica el estado de la API
```json
{
  "status": "OK",
  "message": "API funcionando correctamente"
}
```

### GET /api/cotizaciones
Obtiene todas las cotizaciones
```json
[
  {
    "id": "1",
    "cliente": "Juan Pérez",
    "vehiculo": "BMW M4",
    "precio": 85000,
    "fecha": "2024-01-15",
    "estado": "Pendiente"
  }
]
```

### GET /api/cotizaciones/:id
Obtiene una cotización específica por ID
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

## Estructura del proyecto

```
backend/
├── server.js              # Servidor principal
├── package.json           # Dependencias
├── env.example           # Variables de entorno de ejemplo
├── README.md             # Esta documentación
└── firebase-service-account-key.json  # Credenciales de Firebase (agregar)
```

## Notas importantes

- **Seguridad:** Nunca subas las credenciales de Firebase al repositorio
- **CORS:** La API está configurada para aceptar peticiones desde `http://localhost:4200`
- **Puerto:** Por defecto usa el puerto 3000, pero puedes cambiarlo en las variables de entorno 