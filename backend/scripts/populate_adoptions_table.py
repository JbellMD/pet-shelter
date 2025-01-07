import boto3
import json


def populate_table(table_name, region_name, file_name):
    # create a dynamodb resource
    dynamodb = boto3.resource('dynamodb', region_name=region_name)
    
    # connect with a table named "AdoptionsTable"
    table = dynamodb.Table(table_name)
    
    # Open the json file named "adoptions.json"
    with open(file_name) as json_file:
        adoptions_list = json.load(json_file)
    
    # Populate the table with all items from the json file
    for adoption in adoptions_list:
        
        table.put_item(Item=adoption)
    
    print("Complete")


# call the function populate table with the arguments table_name="AdoptionsTable", region_name="us-east-1", file_name="adoptions.json" if the script is being run directly
if __name__ == '__main__':
    # Create a session object
    session = boto3.session.Session()
    # Dynamically get the region
    aws_region = session.region_name
    populate_table("AdoptionsTable", aws_region, "adoptions.json")
    