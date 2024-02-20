const HardwareService = require('../services/hardwareService');

const getHardwareAll = async (req, res, next) => {
  try {
    const hardwareService = new HardwareService();
    const hardware = await hardwareService.getHardwareAll();
    res.status(200).json(hardware);
  }
  catch (error) {
    if (!error.status) {
      error.status = 500;
      error.message = 'Error: could not get all hardware.';
    }
    next(error);
  }
}

const getHardwareByUserId = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Validate that inputted id is a valid UUID
    const regex = /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
    if (!id.match(regex)) {
      const error = new Error('Bad Request: invalid id');
      error.status = 400;
      throw error;
    }

    const hardwareService = new HardwareService();
    const hardware = await hardwareService.getHardwareByUserId(id);
    res.status(200).json(hardware);
  }
  catch (error) {
    if (!error.status) {
      error.status = 500;
      error.message = 'Error: could not get hardware.';
    }
    next(error);
  }
}

const checkoutHardware = async (req, res, next) => {
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
    const payloadInvalidFields = Object.keys(payload).filter(field => field !== 'serial');

    if (payloadInvalidFields.length > 0) {
      const error = new Error(`Bad Request: invalid fields: ${payloadInvalidFields.join(' ')}. Please only include the following a serial field`);
      error.status = 400;
      throw error;
    }

    const hardwareService = new HardwareService();
    const hardware = await hardwareService.checkoutHardware(id, payload.serial);
    res.status(200).json(hardware);
  }
  catch (error) {
    if (!error.status) {
      error.status = 500;
      error.message = 'Error: could not checkout hardware.';
    }
    next(error);
  }
}

const returnHardware = async (req, res, next) => {
  try {
    const payload = req.body;

    // Validate that the payload is not empty
    if (Object.keys(payload).length === 0) {
      const error = new Error('Bad Request: missing body');
      error.status = 400;
      throw error;
    }

    // Validate that the payload is valid (does not contain irrelevant fields)
    const payloadInvalidFields = Object.keys(payload).filter(field => field !== 'serial');

    if (payloadInvalidFields.length > 0) {
      const error = new Error(`Bad Request: invalid fields: ${payloadInvalidFields.join(' ')}. Please only include the following a serial field`);
      error.status = 400;
      throw error;
    }

    const hardwareService = new HardwareService();
    const hardware = await hardwareService.returnHardware(payload.serial);
    res.status(200).send(`The hardware ${payload.serial} has been returned successfully!`);
  }
  catch (error) {
    if (!error.status) {
      error.status = 500;
      error.message = 'Error: could not return hardware.';
    }
    next(error);
  }
}


module.exports = { getHardwareAll, getHardwareByUserId, checkoutHardware, returnHardware };
