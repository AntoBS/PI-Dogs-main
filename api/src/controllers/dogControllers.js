const { Dog, Temperament } = require("../db");
const axios = require("axios");
const { Op } = require('sequelize');
const { API_KEY} = process.env;

const cleanArray = (arr) =>{
    const clean = arr.map(e =>{
        return{
            id: e.id,
            image: e.image.url,
            name: e.name,
            height: e.height.metric,
            weight: e.weight.metric,
            life_span: e.life_span,
            origin: e.origin,
            temperament: e.temperament,
            created: false,
        }
    })

    return clean
}

const getDogs = async() => {
    const getDogsBd = await Dog.findAll({include: [{model:Temperament}]})
    const dogApiRaw = (await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)).data;
    const dogApi = cleanArray(dogApiRaw);

    const results = [...getDogsBd, ...dogApi];

    return results;
}

const getDogsByName = async (name) => {
    const getDogsBd = await Dog.findAll({where:{name:{[Op.iLike]: `%${name}%`,}}})
    const dogApiRaw = (await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)).data;
    const dogApi = cleanArray(dogApiRaw);

    const fillterApi = dogApi.filter((dog) => dog.name.toLowerCase().includes(name.toLowerCase()))

    return [...fillterApi, getDogsBd];
    
}

const createDogs = async (
    {
        name,
        height,
        weight,
        life_span,
        image,
        temperament,
      }
) => {
    const newDog = await Dog.create({
        name,
        height,
        weight,
        life_span,
        image,
        temperament,
      });
    
    const temperamentNames = temperament.split(", "); 
    const tempDb = await Temperament.findAll({
    where: {
      name: temperamentNames,
    },
  });

    await newDog.setTemperaments(tempDb);
    console.log(newDog)

    return newDog;
}

const getDogsId = async (id, source) => {
    console.log(source); 
    const dog = source === 'api'  
    ? (await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)).data
    : await Dog.findByPK(id, {include: [{model:Temperament,  }]})

    return dog;
}


module.exports = { 
    createDogs,
    getDogsId,
    getDogs,
    getDogsByName,
}