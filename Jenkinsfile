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
        stage('Deploy to Kubernetes') {
            steps {
                echo '========== Continuous Deployment begins here =========='
                    sh """
                    kubectl create namespace demo-ascend-marketplace-frontend --dry-run=client -o yaml
                    kubectl apply --namespace demo-ascend-marketplace-frontend -f '*.yaml' --validate=false
                    sleep 30
                    kubectl get all --namespace demo-ascend-marketplace-frontend
                    """
                echo '========== Continuous Deployment ends here =========='
            }
        }
    }
        post {
            always {
                echo 'Cleaning workspace'
                cleanWs()
            }
        }
}