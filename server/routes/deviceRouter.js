const Router = require('express')

const router = new Router()
const deviceController  = require('../controllers/deviceController')
const roleMiddleware = require('../middleware/roleMiddleware')

router.post('/',roleMiddleware('ADMIN'),deviceController.create)
router.get('/',deviceController.getAll)
router.get('/:id',deviceController.getById)

module.exports = router