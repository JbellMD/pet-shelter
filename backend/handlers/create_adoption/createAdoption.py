import json 
import boto3 
import os 
import uuid 

# Connect to DynamoDB
dynamodb = boto3.resource('dynamodb')

# Use the environment variable named "ADOPTIONS_TABLE" as the table name to connect to the table
table = dynamodb.Table(os.environ['ADOPTIONS_TABLE'])
# Lambda function with code that returns a response to a client with headers which allow all origins to access this resource and also returns the post data in the body
def lambda_handler(event, context):
    try:
        # Get the body of the event
        body = json.loads(event['body'])

        # Generate a unique id and add it to the body
        body['id'] = str(uuid.uuid4())

        # Insert the body of the event into the table
        table.put_item(Item=body)

        # Generate a success response object with a statusCode of 201
        response = {
            "statusCode": 201,
            "headers": {
                "Access-Control-Allow-Origin" : "*"
            },
            "body": json.dumps(body)
        }
    except Exception as e:
        # Handle any exceptions and return an error response
        response = {
            "statusCode": 500,
            "headers": {
                "Access-Control-Allow-Origin" : "*"
            },
            "body": json.dumps({
                "error": "There was an error processing your request.",
                "message": str(e)
            })
        }

    # Return the response
    return response