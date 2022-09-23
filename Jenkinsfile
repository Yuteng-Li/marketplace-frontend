pipeline {
    agent { dockerfile true }
    stages {
        stage('Clean up') {
            steps {
                echo 'Built and packed into docker image!'
                // echo 'Cleaning workspace...'
                // cleanWs()
            }
        }
    }
}
