const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Configuración de Firebase Admin
// IMPORTANTE: Coloca tu archivo de credenciales en backend/firebase-service-account-key.json

// Inicializar Firebase Admin
try {
  const serviceAccount = require('./firebase-service-account-key.json');
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL || "https://tu-proyecto.firebaseio.com"
  });
  console.log('✅ Firebase Admin inicializado correctamente');
} catch (error) {
  console.log('⚠️  Firebase Admin no inicializado - usando datos de ejemplo');
  console.log('   Para conectar con Firebase, coloca el archivo firebase-service-account-key.json en el directorio backend/');
}

// Rutas de la API
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'API funcionando correctamente' });
});

// Ruta para obtener cotizaciones
app.get('/api/cotizaciones', async (req, res) => {
  try {
    // Verificar si Firebase está disponible
    if (admin.apps.length > 0) {
      // Obtener datos de Firebase
      const db = admin.firestore();
      const cotizacionesRef = db.collection('cotizaciones');
      const snapshot = await cotizacionesRef.get();
      
      const cotizaciones = [];
      snapshot.forEach(doc => {
        cotizaciones.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      res.json(cotizaciones);
    } else {
      // Datos de ejemplo si Firebase no está configurado
      const cotizaciones = [
        {
          id: '1',
          cliente: 'Juan Pérez',
          vehiculo: 'BMW M4',
          precio: 85000,
          fecha: '2024-01-15',
          estado: 'Pendiente'
        },
        {
          id: '2',
          cliente: 'María García',
          vehiculo: 'Audi R8',
          precio: 120000,
          fecha: '2024-01-16',
          estado: 'Aprobada'
        }
      ];
      
      res.json(cotizaciones);
    }
  } catch (error) {
    console.error('Error al obtener cotizaciones:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Ruta para obtener una cotización específica por ID
app.get('/api/cotizaciones/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Verificar si Firebase está disponible
    if (admin.apps.length > 0) {
      // Obtener cotización específica de Firebase
      const db = admin.firestore();
      const cotizacionDoc = await db.collection('cotizaciones').doc(id).get();
      
      if (cotizacionDoc.exists) {
        const cotizacion = {
          id: cotizacionDoc.id,
          ...cotizacionDoc.data()
        };
        res.json(cotizacion);
      } else {
        res.status(404).json({ error: 'Cotización no encontrada' });
      }
    } else {
      // Datos de ejemplo si Firebase no está configurado
      const cotizacion = {
        id: id,
        cliente: 'Juan Pérez',
        vehiculo: 'BMW M4',
        precio: 85000,
        fecha: '2024-01-15',
        estado: 'Pendiente',
        detalles: {
          color: 'Negro',
          anio: 2024,
          kilometraje: 0,
          transmision: 'Automática'
        }
      };
      
      res.json(cotizacion);
    }
  } catch (error) {
    console.error('Error al obtener cotización:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
  console.log(`📡 API disponible en: http://localhost:${PORT}/api`);
  console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
}); 