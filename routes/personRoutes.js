const express = require('express')
const router = express.Router();
const Person = require('./../models/Person')

//POST route to add a person
router.post('/', async (req, res) => {
  try{
    const data = req.body //Assuming the request body contains the person data

  //Create a new Person document using the Mongoose model
  const newPerson = new Person(data);

  //Save the new Person to the database
  const response = await newPerson.save();
  console.log('Data saved successfully');
  res.status(200).json(response);
  }catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'})
  }
})

// GET method to get the person information
router.get('/', async (req, res) => {
  try {
    const data = await Person.find() 
    console.log('Data fetched successfully');
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'})
  }
})

//PARAMETERIZED URL

router.get('/:workType', async (req, res) => {
  try {
    const workType = req.params.workType; // Extract the work type from the URL parameter
    if(workType == 'chef' || workType == 'manager' || workType == 'waiter'){

      const response = await Person.find({work: workType})
      console.log('Response Fetched')
      res.status(200).json(response)
    }else{
      res.status(404).json({error: 'Invalid work type'})
    }

  } catch (error) {
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'})
  }
})

//PUT method to update the person information
router.put('/:id', async (req, res) => {
  try {
    
    const personId = req.params.id;
    const updatedPersonData = req.body;

    const response = await Person.findByIdAndUpdate(personId, updatedPersonData,{
      new: true, //Return the updated document
      runValidators: true //Run Mongoose validation
    })

    if(!response){
      return res.status(404).json({error: 'Person not found'})
    }

    console.log('Data updated')
    res.status(200).json(response)
  } catch (error) {
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'})
  }
})

//DELETE method to delete the person information
router.delete('/:id', async (req, res) => {
  try {
    const personId = req.params.id;
    const response = await Person.findByIdAndDelete(personId);

    if(!response){
      return res.status(404).json({error: 'Person not found'})
    }
    console.log('Data deleted');
    
    res.status(200).json({message: 'Person Deleted Successfully'})
  } catch (error) {
    console.log(error);
    res.status(500).json({error: 'Internal Server Error'})
  }
})
module.exports = router