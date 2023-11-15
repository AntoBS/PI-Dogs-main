const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const routerDogs = require('./dogRoutes')
const routerTemperaments = require('./tempRoutes')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/dogs', routerDogs)
router.use('/temperament',routerTemperaments)


module.exports = router;