const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');
const Todo = require('../models/Todo');
router.get('/todos', async (req, res) => {
	const todos = await Todo.find();
	console.log(JSON.stringify({todos}, null, 2))
	res.json(todos);
});

router.post('/todo/new', async(req, res) => {
	try {
		const todo = new Todo({
			text: req.body.text
		})
		const savedData = await todo.save();
		console.log(JSON.stringify({savedData}, null, 2))
		res.json(todo);
	} catch (error) {
		console.error("Error while creating new todo : ", error);
		res.json({error:"Internal Server Error"}).status(500)
	}
});

router.delete('/todo/delete/:id', async (req, res) => {
	const result = await Todo.findByIdAndDelete(req.params.id);
	res.json({result});
});

router.get('/todo/complete/:id', async (req, res) => {
	const todo = await Todo.findById(req.params.id);
	todo.complete = !todo.complete
	todo.save();
	res.json(todo);
})

router.put('/todo/update/:id', async (req, res) => {
	const todo = await Todo.findById(req.params.id);
	todo.text = req.body.text;
	todo.save();
	res.json(todo);
});
module.exports = router