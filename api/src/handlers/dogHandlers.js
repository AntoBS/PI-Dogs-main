const { createDogs, getDogsId, getDogs, getDogsByName } = require('../controllers/dogControllers')

const getDogsHandler = async (req, res) => {
    const {name} =  req.query;
    const results = name ? await getDogsByName(name) : await getDogs();
    try {
      res.status(200).json(results);
    } catch (error) {
      res.status(400).json({error: error.message})
    }
    
       
  };
  
  const getDogsIdHandler = async (req, res) =>{

    const {id} = req.params;
    const source = isNaN(id) ? 'bbd' : 'api';

    try {
    const dogs = await getDogsId(id, source)
    res.status(200).json(dogs)
    } catch (error) {
    res.status(400).json({error: error.message})
    }
}
  
  const createDogsHandler = async (req,res) =>{
    console.log(req.body);
    try {
      const dogs =  await createDogs(req.body)
      res.status(201).json(dogs)
    } catch (error) {
      res.status(500).json({message: error.message});
    }

  }

  module.exports = {
    getDogsHandler,
    getDogsIdHandler,
    createDogsHandler,
  }