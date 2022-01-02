const express    = require('express');
const { engine } = require('express-handlebars');
const path       = require('path');
const db         = require('./db/connection');
const bodyParser = require('body-parser');
const Job        = require('./models/Job');

const app        = express();
const PORT       = 3000;

app.listen(PORT, function() {
    console.log(`Server running. PORT: ${PORT}`);
});

// body parser
app.use(bodyParser.urlencoded({ extended: false }));

// handle bars

app.engine('handlebars', engine({defaultLayout: "main"}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// static folder
app.use(express.static(path.join(__dirname, 'public')));

//db connection
db
    .authenticate()
    .then(() => {
        console.log("DB connection OK!");
    })
    .catch(err => {
        console.log("DB connection failed! ERROR: ", err);
    });

//routes
app.get('/', (req, res) => {

    Job.findAll({order: [
        ['createdAt', 'DESC']
    ]})
    .then(jobs => {
        res.render('index', {jobs});
    });

});

// jobs routes
app.use('/jobs', require('./routes/jobs'));