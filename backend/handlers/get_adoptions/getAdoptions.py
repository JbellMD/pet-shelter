import boto3
import os
import json

def lambda_handler(event, context):
    try:
        # Create a dynamo db resource
        dynamodb = boto3.resource('dynamodb')
        # Connect to a table with the environment variable named ADOPTIONS_TABLE
        table = dynamodb.Table(os.environ['ADOPTIONS_TABLE'])
        
        # Scan the table to get all items from the table and put it in a variable
        items = table.scan()['Items']
        
        # Prepare the response with the appropriate HTTP status code of 200, headers, and body. Headers should allow requests from any origin. Should have GET, HEAD, and OPTIONS methods for access control allow methods
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS'
            },
            'body': json.dumps(items)
        }
        
    except Exception as e:
        # Return a server error if the scan fails
        return {
            'statusCode': 500,
            'body': json.dumps('Error scanning table: ' + str(e))
            }
            