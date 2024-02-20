const models = require('../models');

class HardwareService {
  constructor() {
    this.userModel = models.User;
    this.hardwareModel = models.Hardware;
    this.sequelize = models.sequelize;
  }

  getHardwareAll = async () => {
    try {
      const hardwareRawData = await this.hardwareModel.findAll({
        attributes: ['serial'],
        include: [{ model: this.userModel, attributes: ['name'], foreignKey: 'userId' }]
      });

      // Handle Sequelize-style objects
      const hardwareData = hardwareRawData.map(hardware => ({
        serial: hardware.serial,
        owner: hardware.User.name
      }));

      return hardwareData;
    }
    catch (error) {
      throw error;
    }
  }

  getHardwareByUserId = async (id) => {
    try {
      const hardwareRawData = await this.hardwareModel.findAll({
        attributes: ['serial'],
        where: { userId: id },
        include: [{ model: this.userModel, attributes: ['name'], foreignKey: 'userId' }]
      });

      // Handle Sequelize-style objects
      const hardwareData = hardwareRawData.map(hardware => ({
        serial: hardware.serial,
        owner: hardware.User.name
      }));

      return hardwareData;
    }
    catch (error) {
      throw error;
    }
  }

  checkoutHardware = async (id, serial) => {
    try {
      const hardwareCreated = await this.hardwareModel.create({
        serial: serial,
        userId: id
      });

      return hardwareCreated;
    }
    catch (error) {
      throw error;
    }
  }

  returnHardware = async (serial) => {
    try {
      const hardwareRawData = await this.hardwareModel.findOne({
        attributes: ['serial'],
        where: { serial: serial },
      });

      if (!hardwareRawData) {
        throw error;
      }

      await this.hardwareModel.destroy({ where: { serial: serial } });
      return;
    }
    catch (error) {
      throw error;
    }
  }
}

module.exports = HardwareService;
