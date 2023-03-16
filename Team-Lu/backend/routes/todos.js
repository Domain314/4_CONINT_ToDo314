const { body, validationResult } = require('express-validator');

const db = require('../db/db');

// REFACTORING: It is recommended to use const and let for better scoping and to avoid potential issues.
const express = require('express')
const router = express.Router();

/* Read all todos */
router.get('/', async (req, res, next) => {
    const todos = await db.models.todo.findAll();

    res.status(200).json(todos);
});

/* Create todos */
router.post('/',
    body('name').not().isEmpty(),
    body('name').isLength({ max: 255 }),
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const todo = await db.models.todo.create({
            name: req.body.name
        });

        res.status(201).json(todo);
    });

// REFACTORING: Created a separate function to handle updating the done status of a todo item, reducing code duplication in PUT /:id/done and DELETE /:id/done .
async function updateTodoDoneStatus(req, res, doneStatus) {
    const pk = req.params.id;
    let todo = await db.models.todo.findByPk(pk);

    if (null == todo) {
        res.status(404);
        return;
    }

    todo = await todo.update({ done: doneStatus });

    res.status(200).json(todo);
}

/* Update todos with done */
router.put('/:id/done', async (req, res, next) => {
    await updateTodoDoneStatus(req, res, true);
});

/* Update todos with undone */
router.delete('/:id/done', async (req, res, next) => {
    await updateTodoDoneStatus(req, res, false);
});

module.exports = router;
