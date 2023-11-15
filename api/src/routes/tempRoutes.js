const { Router } = require("express");
const { getTemperamentsHandler } = require("../handlers/tempHandlers");
const routerTemperaments = Router();

routerTemperaments.get('/',getTemperamentsHandler)


module.exports = routerTemperaments;