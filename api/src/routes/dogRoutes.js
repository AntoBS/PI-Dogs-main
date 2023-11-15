const { Router } = require("express");
const { getDogsHandler,
        getDogsIdHandler,
        createDogsHandler } = require("../handlers/dogHandlers");
const routerDogs = Router();

routerDogs.get("/", getDogsHandler)
routerDogs.get('/:id',getDogsIdHandler);
routerDogs.post('/',createDogsHandler)

module.exports = routerDogs;
