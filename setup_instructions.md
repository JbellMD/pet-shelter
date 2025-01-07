## Week 7 Setup Instructions
Follow these setup instructions before working on this week's activities.


1. In the left navigation pane, choose the settings gear icon, and then choose **Show hidden files**. 

    <i aria-hidden="true" class="fas fa-sticky-note" style="color:#563377"></i> **Note:** You must be able to view the **.env** file located in the **pet-shelter-client/** directory for future steps.
    
1. In a terminal window, enter the following commands to run the React frontend client application.

    ```bash
    cd ~/environment/pet-shelter-client
    npm install
    npm run dev

    ```
1. In the **pet-shelter-client** directory, open the **.env** file. Keep this file open because you will need it for the next steps.

1. At the top of the AWS Cloud9 integrated development environment (IDE), choose **Preview**, and then choose **Preview running application**. 

1. Expand the preview in the browser to view the React frontend application. Copy the preview URL of the running application. You will need it for future steps.

1. In the **.env** file, update the **VITE_REDIRECT_URI** variable using the preview URL copied in the previous step.
    
    <i aria-hidden="true" class="fas fa-sticky-note" style="color:#563377"></i> **Note:** Make sure that there are no trailing forward slashes (/) after the *.com*.

1. Navigate to the **backend/** directory, and then open the **template.yaml** file.

1. Locate the **CognitoUserPoolClient** resource and update the following properties with the preview URL of the running React application.

    <i aria-hidden="true" class="fas fa-sticky-note" style="color:#563377"></i> **Note:** Make sure that there are no trailing forward slashes (/) after the *.com*.

    - **CallbackURLs**
    - **LogoutURLs**

1. Locate the **CognitoUserPoolDomain** resource and update the domain by appending your initials or other unique characters to ensure that the domain is globally unique. 

   For example, *pets-app-user-pool-${AWS::AccountId}-sd* includes *-sd* at the end, making the domain distinct.

1. In the AWS SAM template, locate the **SNSSubscription** resource and update the email address with a valid email address that you can access, then save the file.

1. Open a new terminal for the backend setup commands.

1. Run the setup script file, which automates the following tasks so that your application is in the same state as the solution from the end of the previous week:

    - Build and deploy the previously created backend
    - Populate the Amazon DynamoDB tables with seed data
    
    ```bash
    cd ~/environment
    chmod +x setup_app.sh
    ./setup_app.sh 
    ```

1. After the script completes, copy the Amazon Simple Storage Service (Amazon S3) Pet Images bucket URL.

1. In the **.env** file, paste the URL to update the **VITE_PET_IMAGES_BUCKET_URL** value, and save the file. 

1. In the terminal, locate the S3 Report bucket name underneath the S3 Pet Images Bucket URL, and use the Report bucket name to update the files for **backend/handlers/generate_html/generateHtml.py** and **backend/handlers/generate_presigned_url/generatePresignedUrl.py**, where the code shows **"REPORT_BUCKET_NAME_HERE"**.

1. Check the email account you used in the SAM template and confirm the subscription to the SNS Topic 

1. Redeploy the AWS SAM template by running the following commands.

    ```bash
    cd ~/environment/backend
    sam build
    sam deploy

    ```

1. In the terminal, scroll up to see the outputs from the AWS SAM deployment, which display in green text. Use the following outputs to update the variables in the **.env** file:

    - Update **VITE_API_GATEWAY_URL** with the PetsAPI prod stage URL from the AWS SAM deployment outputs
    - Update the **VITE_CLIENT_ID** with the output value for **CognitoUserPoolClientId** from the AWS SAM deployment

1. Save the **.env** file.

1. At the top of the AWS Management Console, search for and select `Cognito`.

1. On the Cognito page, choose **pets-app** user pool.

1. Choose the **app integration** tab, and then choose **pets-app-client**.

1. Choose **View Hosted UI**, and then copy the URL from the beginning through *.com*. Do not copy any additional characters. The copied URL should be similar to the following:

   **https://pets-app-user-pool-304211049153.auth.us-west-2.amazoncognito.com**

1. In the **.env** file, update the **VITE_COGNITO_AUTH_URL** variable with the hosted UI URL copied in the preceding step. 

    <i aria-hidden="true" class="fas fa-sticky-note" style="color:#563377"></i> **Note:** Ensure that there is no trailing forward slash (/) after the *.com*.

1. In the console, create a user in the Cognito user pool, and then log in with that user in the React app to verify that you can successfully log in.

    <i aria-hidden="true" class="fas fa-sticky-note" style="color:#563377"></i> **Note:** Make sure to select **Mark Email Address as Verified** when creating a user in the user pool.
    
1. Open a new terminal tab. This is where you will enter commands for this week's activities.

<i aria-hidden="true" class="far fa-thumbs-up" style="color:#008296"></i> **Task complete:** You are now ready to follow along with this week's activities.


[React MIT License](https://github.com/facebook/react?tab=MIT-1-ov-file#readme)

Python is property of the Python Software Foundation (PSF), and React is property of Meta Platforms, Inc. Reference in this lab to any specific commercial product, process, or service, or the use of any trade, firm, or corporation name is provided for informational purposes, and does not constitute endorsement, recommendation, or favoring by Amazon Web Services.
