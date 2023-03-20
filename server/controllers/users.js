/* This is the leaderboards router. It handles the updating and retrieving of leaderboards. */
const User = require('../models/user')

/* This is a GET request to the users endpoint. It is retrieving the users from the
database. */
usersRouter.get('/', async (request, response) => {
    const users = await User
        .find({})
    if (users) {
        response.json(users)
    } else {
        response.status(404).end()
    }
});

/* This is a POST request to the users endpoint. It is creating a new user in the database. */
usersRouter.post('/', async (request, response, next) => {
    const { body } = request

    const user = new User({
        name: body.name,
        score: body.score,
    })

    try {
        const savedUser = await user.save()
        response.status(201).json(savedUser)
    } catch (exception) {
        next(exception)
    }
});

/* This is a PATCH request to the users endpoint. It is updating a user in the database. */
usersRouter.patch('/:id', async (request, response, next) => {
    const { body } = request;

    try {
        const updatedUser = await User.findByIdAndUpdate(request.params.id, body, { new: true });
        response.status(204).json(updatedUser);       
    } catch (exception) {
        next(exception);
    }
});

module.exports = usersRouter