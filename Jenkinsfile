pipeline {
    agent {label 'built-in'}
    stages {
        stage('Build') {
            steps {
                //Using DockerHub as Container Image repo. Log in, build image, and then push it to DockerHub using credentials.
                withCredentials([usernamePassword(credentialsId: 'yuteng-dockerhub-cred', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                    sh """
                    docker login --username $USERNAME --password $PASSWORD
                    docker build -t $USERNAME/marketplace-frontend:${env.BUILD_NUMBER} .
                    docker push $USERNAME/marketplace-frontend:${env.BUILD_NUMBER}
                    docker image prune -f
                    """
                }
                echo '========== Continuous Integration ends here =========='
            }
        }
    }
        post {
            always {
                echo 'Cleaning ws'
                cleanWs()
            }
        }
}