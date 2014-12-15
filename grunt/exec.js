module.exports.tasks = {
    exec: {
        "maven-install": {
            cwd: 'webjar',
            command: 'mvn clean install'
        },

        // mvn deploy
        "maven-deploy": {
            cwd: 'webjar',
            command: 'mvn clean deploy'
        }
    }
};