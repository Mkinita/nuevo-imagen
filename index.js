// const express = require('express');
// const multer = require('multer');
// const path = require('path');

// const app = express();
// const port = 3000;

// // Configuración de Multer para almacenar los archivos en la carpeta 'uploads'
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads');
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//     const fileExtension = path.extname(file.originalname);
//     cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
//   }
// });

// const upload = multer({ storage: storage });

// // Configuración de Express para servir archivos estáticos y analizar formularios
// app.use(express.static('public'));
// app.use(express.urlencoded({ extended: true }));

// app.use('/uploads', express.static('uploads'));

// // Ruta principal
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// // Ruta para manejar la carga de archivos
// app.post('/upload', upload.single('image'), (req, res) => {
//   if (!req.file) {
//     return res.status(400).send('No se ha proporcionado una imagen.');
//   }

//   res.send('¡Imagen subida correctamente!');
// });

// // Iniciar el servidor
// const PORT = process.env.PORT || 3000 ;



// app.listen(PORT)
// console.log('funcionando on port',PORT)


const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Configuración de Multer para almacenar los archivos en la carpeta 'uploads'
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
  }
});

const upload = multer({ storage: storage });

// Configuración de Express para servir archivos estáticos y analizar formularios
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static('uploads'));

// Ruta principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta principal
app.get('/imagenes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'imagenes.html'));
});

// Ruta para manejar la carga de archivos
app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No se ha proporcionado una imagen.');
  }

  res.redirect('https://app-prevencion-agr-production.up.railway.app/notificacion');
});

// Ruta para mostrar el listado de imágenes
app.get('/images', (req, res) => {
  const directoryPath = path.join(__dirname, 'uploads');

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return res.status(500).send('Error al leer el directorio de imágenes.');
    }

    const images = files.filter(file => file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png'));

    res.send(images);
  });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000 ;

app.listen(PORT, () => {
  console.log('Servidor funcionando en el puerto', PORT);
});



