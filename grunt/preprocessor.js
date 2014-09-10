module.exports.tasks = {
    preprocessor: {
        izi: {
            options: {
                context: {
                    DEBUG: false
                }
            },
            files: {
                "dist/izi-js-jquery.js": "dist/izi-js-jquery-debug.js"
            }
        }
    }
};