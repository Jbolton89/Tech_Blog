
const express = require("express"); 
const session = require("express-session");
const exphbs = require("express-handlebars");
const path = require("path");

const routes = require('./controllers'); 
const helpers = require('./utils/helpers');

const sequelize = require('./config/connection');
const sequelizeStore = require('connect-session-sequelize')(session.Store); 

// Sets up the Express App 
const app = express();
const PORT = process.env.PORT || 3001; 

// Set up Handlebars.js engine with custom helpers 
const hbs = exphbs.create({ helpers });

const sess = { 
    secret: 'Big important secret', 
    cookie: {}, 
    resave: false, 
    saveUninitialized: true, 
    store: new sequelizeStore({
        db: sequelize
    })
}; 

app.use(session(sess));

// Set Handlebars as the default template engine. 
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => { 
    app.listen(PORT, () => console.log('Now Listening on :http://localhost: + PORT')
)});
