require('dotenv').config()
const express = require('express')
const sequelize = require('./db.js')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const router = require('./routes/index')
const errorHandler = require('./middleware/errorHandlingMiddleware')
const path = require("path");

const PORT = process.env.PORT || 7070
const app = express()

app.use(cors())
app.use(express.json())
app.use(fileUpload({}))
app.use(express.static(path.resolve(__dirname,'static')))
app.use('/api', router)
app.use(errorHandler)

app.get('/', (req, res) => {
	res.json({message: "Go"})
})

const start = async () => {
	try {
		await sequelize.authenticate();
		await sequelize.sync({alter:true});

		app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))
	} catch (e) {
		console.log(e.message)
	}
}

start()