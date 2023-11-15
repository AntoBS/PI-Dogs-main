const { API_KEY} = process.env;
const { Temperament } = require('../db');
const axios = require('axios');

const getTemperaments = async () => {
    
    const  getDogsApi = (await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)).data;
    const dogs = getDogsApi.map(e => e.temperament);

    dogs.forEach(element => { 
        if(element){
            let temperamentArray = element.split(", ")
            temperamentArray.forEach(temp =>{
                Temperament.findOrCreate({
                    where:{
                        name: temp.trim()
                    }
                })
            })
        }   
    });
    
    const allTemps = await Temperament.findAll()
    console.log("Temperamentos guardados");
    return allTemps
    
}

module.exports ={
    getTemperaments
}