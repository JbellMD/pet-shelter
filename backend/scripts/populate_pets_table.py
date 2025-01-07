import boto3
from datetime import datetime

def populate_dynamodb():
    # Create a session object
    session = boto3.session.Session()
    # Dynamically get the region
    aws_region = session.region_name
    # Create a DynamoDB service client
    dynamodb = boto3.resource('dynamodb', region_name=aws_region)

    # Reference your table 
    table = dynamodb.Table('PetsTable')

    # Define your pets data
    pets_data = [
        {
            "id": "1",
            "name": "Buddy",
            "age": "2",
            "species": "Dog",
            "date_entered": "2024-07-01",
            "image": "pet5.jpeg"
        },
        {
            "id": "2",
            "name": "Mittens",
            "age": "3",
            "species": "Cat",
            "date_entered": "2024-06-20",
            "image": "pet2.jpeg"
        },
        {
            "id": "3",
            "name": "Rex",
            "age": "1",
            "species": "Dog",
            "date_entered": "2024-07-05",
            "image": "pet6.jpeg"
        },
        {
            "id": "4",
            "name": "Whiskers",
            "age": "4",
            "species": "Cat",
            "date_entered": "2024-06-15",
            "image": "pet4.jpeg"
        }
    ]

    # Insert pets into the table
    for pet in pets_data:
        response = table.put_item(Item=pet)
        print(f"Inserted pet: {pet['id']}, response: {response['ResponseMetadata']['HTTPStatusCode']}")

if __name__ == "__main__":
    populate_dynamodb()