const router =  require('express').Router();

// set requiments(from thoughts-controller)
const{
    getAllThoughts,
    getThoughtsById,
    createThoughts,
    updateThoughts,
    deleteThoughts,
    addReaction,
    deleteReaction
} = require('../controllers/thoughts-controller');

// directs to /api/thoughts <get>
router
    .route('/')
    .get(getAllThoughts);

// directs to :/api/thoughts/:id <get,put,delete,>
router
     .route('/:id')
     .get(getThoughtsById)
     .put(updateThoughts)
     .delete(deleteThoughts);

// direct to  api/thoughts/userId<post>
router
    .route('/:userId')
    .post(createThoughts);

  // directs to /api/thoughtId/reactions <post>
  router
     .route('/:thoughtId/reactions/:reactionId')
     .delete(deleteReaction);
     
     module.exports = router;

