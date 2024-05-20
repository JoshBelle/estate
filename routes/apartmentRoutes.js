const express = require('express');
const { createApartment, getApartments, getApartment, updateApartment, deleteApartment } = require('../controllers/apartmentController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware(['admin', 'seller']), createApartment);
router.get('/', authMiddleware(['admin', 'user', 'seller']), getApartments);
router.get('/:id', authMiddleware(['admin', 'user', 'seller']), getApartment);
router.put('/:id', authMiddleware(['admin', 'seller']), updateApartment);
router.delete('/:id', authMiddleware(['admin']), deleteApartment);

module.exports = router;
