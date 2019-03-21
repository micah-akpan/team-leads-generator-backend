const { Router } = require('express');
const Users = require('../models/users');

const  router = Router();

router.get('/users', (req, res) => {
    return res.status(200).json({
        status: 200,
        data: Users
    })
})

module.exports = router;
