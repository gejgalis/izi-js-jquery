var grunt = require("grunt");

module.exports.tasks = {
    uglify: {
        options: {
            sourceMap: true,
            banner: grunt.file.read('LICENSE')
        },

        izi: {
            files: {
                "dist/izi-js-jquery.min.js": "dist/izi-js-jquery.js"
            }
        }
    }
};