const express = require('express');
const router = express.Router();
const news = require('../controllers/news.controller');

router.get('/', news.getNews);
//router.get('/archived', news.getArchived);
router.post('/', news.createNews);
//router.post('/archived', news.createArchived);
router.put('/:id', news.editNew);
//router.put('/archived/:id', news.updateArchivedId);
router.delete('/:id', news.deleteNew);
//router.delete('/archived/:id', news.deleteArchivedId);

module.exports = router;