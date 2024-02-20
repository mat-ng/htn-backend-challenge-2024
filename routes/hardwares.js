const express = require('express');

const { getHardwareAll, getHardwareByUserId, checkoutHardware, returnHardware } = require('../controllers/hardwares');

const router = express.Router();

router.get('/', getHardwareAll);
router.get('/:id', getHardwareByUserId);
router.post('/:id', checkoutHardware);
router.delete('/', returnHardware);

module.exports = router;
