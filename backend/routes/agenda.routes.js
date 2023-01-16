const { Router } = require('express');
const { createAgenda,
        getAgenda,
        getAgendas,
        updateAgenda,
        deleteAgenda
      } = require('../controllers/agenda.controller');

const router = Router();

router.route('/')
      .post(createAgenda)
      .get(getAgendas);

router.route('/:id')
      .put(updateAgenda)
      .delete(deleteAgenda);

router.route('/:nombre')
      .get(getAgenda)

module.exports = router;