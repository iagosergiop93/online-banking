pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building ...'
                echo 'Building Angular App'
                dir('web/online-bank') {
                    nodejs('nodejs-bank-angular') {
                        sh 'npm install'
                        sh 'ng build --prod'
                    }
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
                dir('web/online-bank') {
                    echo 'Deploying Angular app to S3 bucket'
                    s3Upload consoleLogLevel: 'INFO', dontSetBuildResultOnFailure: false, dontWaitForConcurrentBuildCompletion: false, entries: [[bucket: 'iagodev.com', excludedFile: '', flatten: false, gzipFiles: false, keepForever: false, managedArtifacts: false, noUploadOnFailure: true, selectedRegion: 'us-east-1', showDirectlyInBrowser: false, sourceFile: 'dist/online-bank/*', storageClass: 'STANDARD', uploadFromSlave: false, useServerSideEncryption: true]], pluginFailureResultConstraint: 'FAILURE', profileName: 'iago_bank', userMetadata: []
                }
            }
        }
    }
}