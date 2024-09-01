const express = require('express')
const router = express.Router();
const MenuItem = require('./../models/MenuItem')


//POST method to save the menuitem details
router.post('/', async (req, res) => {
  try {

    const menuData = req.body;
    const MenuItems = new MenuItem(menuData);

    const response = await MenuItems.save();
    console.log('Menu Data Saved Successfully');
    res.status(200).json(response);
    
  } catch (error) {
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'})
  }
})

//GET method to get the menuitem details
router.get('/', async (req, res) => {
 try {
  const menuData = await MenuItem.find();
  console.log('Menu Data fetched successfully');
  res.status(200).json(menuData)
  
 } catch (error) {
  console.log(error);
  res.status(500).json({error: 'Internal Server Error'})
 }
  
})

//PARAMETERIZED URL
router.get('/:itemTaste', async (req, res) => {
  try {
   
    const itemTaste = req.params.itemTaste;
    if(itemTaste == 'sweet' || itemTaste == 'sour' || itemTaste == 'spicy '){
      const response = await MenuItem.find({taste: itemTaste})
      res.status(200).json(response);
    }else{
      res.status(404).json({error: 'Invalid Taste'})
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({error: 'Internal Server Error'})
  }
})

module.exports = router