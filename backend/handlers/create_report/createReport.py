import json
import boto3
import os

state_machine_arn = os.environ['STATE_MACHINE_ARN']
#Create the Step Functions client
client = boto3.client('stepfunctions')

def lambda_handler(event, context):
    # Start the state machine execution
    response = client.start_execution(
        stateMachineArn=state_machine_arn
    )

    return {
        'headers': {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        'statusCode': 200,
        'body': json.dumps({'executionArn': response['executionArn']})
    }