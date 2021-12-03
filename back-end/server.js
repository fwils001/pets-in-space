
const express = require('express');
require('dotenv').config()

const routes = require('./routes');


const cors = require('cors')

const session = require('express-session')


const PORT = process.env.PORT || 3003;


const app = express();

const MongoDBStore = require('connect-mongodb-session')(session)


require('./config/db.connection');


const whitelist = ['http://localhost:3000', 'heroku frontend url here']
const corsOptions = {
  origin: (origin, callback) => {
    if(whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  
  credentials:true
}

app.use(cors(corsOptions))

app.set('trust proxy', 1)

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  store: new MongoDBStore({
    uri: process.env.MONGODB_URI,
    collection: 'mySessions'
  }),
}))
app.use((req, res, next) => {
	console.log("Here is the session in the custom app-level middleware.")
	console.log(req.session)
	next()
})

const isAuthenticated = (req, res, next) => {
    if (req.session.currentUser) {
        return next()
    } else {
        res.status(403).json({msg:"login required"})
    }
}


app.use(express.json());


app.get('/', function (req, res) {
  res.send('hello')
})

app.use('/pets', isAuthenticated, routes.pets)
app.use('/users', routes.users)



app.listen(PORT, () => {
  console.log(`🎉🎊 celebrations happening on http://localhost:${PORT} 🎉🎊`);
});