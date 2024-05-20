const express = require('express');
const { createComplex, getComplexes, getComplex, updateComplex, deleteComplex } = require('../controllers/complexController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', createComplex);
router.get('/', getComplexes);
router.get('/:id',  getComplex);
router.put('/:id',  updateComplex);
router.delete('/:id',  deleteComplex);

module.exports = router;
