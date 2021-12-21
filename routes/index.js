const route = require('express').Router();

// import all of the API routes from /api/index.js
const apiRoutes = require('../api');
const router = require('../api/user-routes');

// add prefix of /api to all of the api routes imported from the  api directory
router.use('/api',apiRoutes),

router.use((req,res) =>{
    res.status(404).send('<h1> 404 error!</h1>');

});

module.exports = router;
