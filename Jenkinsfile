pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building ...'
                dir('web/online-bank') {
                    echo 'Listing directory after build'
                    sh 'ls'
                    nodejs('nodejs-bank-angular') {
                        sh 'npm install'
                        sh 'ng build --prod'
                    }
                    echo 'Listing directory after build'
                    sh 'ls'
                }
            }
        }
        stage('Test') {
            steps {
                echo 'Testing ...'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying ...'
            }
        }
    }
}