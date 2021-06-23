const config = require('./utils/config')
const express = require('express')
require('express-async-errors') // To handle express async errors
const app = express()
const cors = require('cors')

app.use(express.static('build')) // For backend to draw client files from build

// Routers
const loginRouter = require('./controllers/loginController')
const usersRouter = require('./controllers/usersController')
const itemsRouter = require('./controllers/itemsController')

const announcementsRouter = require('./controllers/announcementsController')
const discipleshipRouter = require('./controllers/discipleshipController')
const eventsRouter = require('./controllers/eventsController')
const ministryJobOpeningsRouter = require('./controllers/ministryJobOpeningsController')
const missionsRouter = require('./controllers/missionsController')
const ourHistoryRouter = require('./controllers/ourHistoryController')
const ourTeamRouter = require('./controllers/ourTeamController')
const outreachRouter = require('./controllers/outreachController')
const servicesRouter = require('./controllers/servicesController')
const statementOfFaithRouter = require('./controllers/statementOfFaithController')
const upcomingSermonsRouter = require('./controllers/upcomingSermonsController')


const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

// Connect to mongoose
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

// Middleware
app.use(cors())
app.use(express.json())

app.use(middleware.tokenExtractor)

// Middleware routes
app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)
app.use('/api/items', itemsRouter)

app.use('/api/announcements', announcementsRouter)
app.use('/api/discipleship', discipleshipRouter)
app.use('/api/events', eventsRouter)
app.use('/api/ministry-job-openings', ministryJobOpeningsRouter)
app.use('/api/missions', missionsRouter)
app.use('/api/our-history', ourHistoryRouter)
app.use('/api/our-team', ourTeamRouter)
app.use('/api/outreach', outreachRouter)
app.use('/api/services', servicesRouter)
app.use('/api/statement-of-faith', statementOfFaithRouter)
app.use('/api/upcoming-sermons', upcomingSermonsRouter)

// if (process.env.NODE_ENV === 'test') {
//   const testingRouter = require('./controllers/testing')
//   app.use('/api/testing', testingRouter)
// }

app.use(middleware.requestLogger)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app