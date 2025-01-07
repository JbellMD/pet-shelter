import boto3
import os
import json

def lambda_handler(event, context):
    # Retrieve the table name and region from environment variables
    table_name = os.environ['PETS_TABLE']
    region_name = os.environ['AWS_REGION']

    # Initialize a DynamoDB client
    dynamodb = boto3.resource('dynamodb', region_name=region_name)
    table = dynamodb.Table(table_name)

    try:
        response = table.scan()
        pets = response['Items']

        # Prepare a successful response containing the pets
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
                'Access-Control-Allow-Origin': '*',  # Allow requests from any origin
                'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS'
            },
            'body': json.dumps({
                'pets': pets
            })
        }
    except Exception as e:
        print(e)
        # Return a server error if the scan fails
        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
                'Access-Control-Allow-Origin': '*',  # Allow requests from any origin
                'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS'
            },
            'body': json.dumps({
                'error': str(e)
            })
        }