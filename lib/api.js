var koa = require('koa');
var route = require('koa-route');
var config = require('../config');
var compress = require('koa-compress');
var bodyParser = require('koa-bodyparser');

// Koa middleware   
var cors = require('./middleware/cors');
var error = require('./middleware/error');
var redirect = require('./middleware/redirect');

exports.initialize = function () {
    // Initialize koa app
    var app = koa();

    // Catch-all error handler
    app.use(error());

    // Compress requests
    app.use(compress());

    // Parse input provided via request body
    app.use(bodyParser());

    // Configure cross-origin requests
    app.use(cors());
    
    // Setup API routes
    setupApiRoutes(app);
    
    // Either use the runtime port or fallback to config
    var port = process.env.PORT || config.api.port;

    // Start listening to API requests from clients
    app.listen(port);

    // Log the port number
    console.log('[Koa]', 'Listening on port ' + port);
};

function setupApiRoutes(app) {
    // Default endpoint
    app.use(route.get('/', require('./routes/index')));

    // User registration endpoint
    app.use(route.post('/register', require('./routes/register')));
}