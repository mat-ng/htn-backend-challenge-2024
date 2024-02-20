const UserService = require('../services/userService');

const getUsersAll = async (req, res, next) => {
  try {
    const userService = new UserService();
    const users = await userService.getUsersAll();
    res.status(200).json(users);
  }
  catch (error) {
    if (!error.status) {
      error.status = 500;
      error.message = 'Error: could not get all users';
    }
    next(error);
  }
}

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Validate that inputted id is a valid UUID
    const regex = /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
    if (!id.match(regex)) {
      const error = new Error('Bad Request: invalid id');
      error.status = 400;
      throw error;
    }

    const userService = new UserService();
    const user = await userService.getUserById(id);
    res.status(200).json(user);
  }
  catch (error) {
    if (!error.status) {
      error.status = 500;
      error.message = `Error: could not get user with that id.`;
    }
    next(error);
  }
}

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const payload = req.body;

    // Validate that inputted id is a valid UUID
    const regex = /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
    if (!id.match(regex)) {
      const error = new Error('Bad Request: invalid id');
      error.status = 400;
      throw error;
    }

    // Validate that the payload is not empty
    if (Object.keys(payload).length === 0) {
      const error = new Error('Bad Request: missing body');
      error.status = 400;
      throw error;
    }

    // Validate that the payload is valid (does not contain irrelevant fields)
    const validFields = ['name', 'company', 'email', 'phone', 'skills'];
    const payloadInvalidFields = Object.keys(payload).filter(field => !validFields.includes(field));

    if (payloadInvalidFields.length > 0) {
      const error = new Error(`Bad Request: invalid fields: ${payloadInvalidFields.join(' ')}. Please only include the following fields: ${validFields.join(' ')}`);
      error.status = 400;
      throw error;
    }

    const userService = new UserService();
    const userUpdated = await userService.updateUser(id, payload);
    res.status(200).json(userUpdated);
  }
  catch (error) {
    if (!error.status) {
      error.status = 500;
      error.message = `Error: could not update user.`;
    }
    next(error);
  }
}

module.exports = { getUsersAll, getUserById, updateUser };
