module.exports = function () {
    return function* (next) {
        // Get requesting origin hostname
        var origin = this.headers.origin;

        // Set the header to the requested origin 
        this.set('Access-Control-Allow-Origin', origin);
        this.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        
         // OPTIONS request?
        if (this.method == 'OPTIONS') {
            // Send 200 OK and empty body
            this.method = 200;
            this.body = null;
            
            // Done dealing with request, avoid executing other middlewares
            return;
        }
        
        // Execute other middlewares
        return yield next;
    };
};