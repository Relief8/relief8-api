module.exports = {
    api: {
        // Koa REST API port
        port: 3001
    },
    db: {
        // Monkster package config
        monksterOptions: {
            // If a query fails more than X times, give up on it (default: 5) 
            maxTries: 60,
            // Number of milliseconds to wait before retrying a failed query (default: 100) 
            retryInterval: 1000
        }
    },
    cache: {
        // Radius of survivors to return for client-side DB caching
        radiusMiles: 10
    }
};