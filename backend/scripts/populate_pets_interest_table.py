import boto3
import json

# Create a DynamoDB resource
dynamodb = boto3.resource('dynamodb')

# Connect to the DynamoDB table named 'PetsInterestTable'
table = dynamodb.Table('PetsInterestTable')

## Add all of the items from a json file named 'pets_interest_data.json' to the 'PetsInterestTable' table
with open("pets_interest_data.json") as json_file:
    pets_interest_data_array = json.load(json_file)
    for row in pets_interest_data_array:
        table.put_item(
            Item=row
        )
print("Complete: Successfuly seeded the PetsInterestTable")
