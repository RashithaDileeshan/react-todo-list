const router = require('express').Router()

const { default: mongoose } = require('mongoose')
// import todo model
const todoItemModel = require('../model/todoItem')

router.post('/api/item', async (req, res) => {
    try {
        const newItem = new todoItemModel({
            item: req.body.item
        })
        //save this item in database
        const saveItem = await newItem.save()
        res.status(200).json(saveItem);
    } catch (err) {
        res.json(err);
    }
})

//create second route -- get data from database
router.get('/api/items', async (req, res) => {
    try {
        const allTodoItems = await todoItemModel.find({});
        res.status(200).json(allTodoItems)
    } catch (err) {
        res.json(err);
    }
})


//update item
router.put('/api/item/:id', async (req, res) => {
    try {
        //find the item by its id and update it
        const updateItem = await todoItemModel.findByIdAndUpdate(req.params.id, { $set: req.body });
        res.status(200).json(updateItem);
    } catch (err) {
        res.json(err);
    }
})


//Delete item from database
router.delete('/api/item/:id', async (req, res) => {
    try {
        //find the item by its id and delete it
        const deleteItem = await todoItemModel.findByIdAndDelete(req.params.id);
        res.status(200).json('Item Deleted');
    } catch (err) {
        res.json(err);
    }
})


//export router
module.exports = router;