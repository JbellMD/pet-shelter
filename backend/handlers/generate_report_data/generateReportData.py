import boto3  # Import the Boto3 SDK to interact with AWS services
import os  # Import the os module to access environment variables

# Set up DynamoDB resource object to interact with DynamoDB tables
dynamodb = boto3.resource('dynamodb')

# Retrieve the DynamoDB table names from environment variables and create table objects for them
pets_table = dynamodb.Table(os.environ['PETS_TABLE'])  # Interact with the Pets table
pets_interest_table = dynamodb.Table(os.environ['PETS_INTEREST_TABLE'])  # Interact with the Pets Interest table

def lambda_handler(event, context):
    # Main handler function that AWS Lambda calls when the function is triggered

    # Retrieve all data from the Pets table by calling the get_pets_data function
    pets_data = get_pets_data()

    # Retrieve all data from the Pets Interest table by calling the get_pets_interest_data function
    pets_adoption_interest_data = get_pets_interest_data()

    # Combine the data from both tables (Pets and Pets Interest) into a single dataset for the report
    report_data = combine_pets_interest_data(pets_data, pets_adoption_interest_data)

    # Return the combined data as a response in a dictionary
    return {'report_data': report_data}

def get_pets_data():
    # Function to retrieve all pet records from the Pets table
    try:
        # Use the scan method to retrieve all items from the Pets table
        response = pets_table.scan()
        # Return the list of items (pet records) from the response
        return response['Items']
    except Exception as e:
        # If an error occurs during the scan, print an error message and raise the exception
        print(f"Error retrieving pets data: {e}")
        raise e

def get_pets_interest_data():
    # Function to retrieve all adoption interest records from the Pets Interest table
    try:
        # Use the scan method to retrieve all items from the Pets Interest table
        response = pets_interest_table.scan()
        # Return the list of items (adoption interest records) from the response
        return response['Items']
    except Exception as e:
        # If an error occurs during the scan, print an error message and raise the exception
        print(f"Error retrieving pets interest data: {e}")
        raise e

def combine_pets_interest_data(pets_data, pets_interest_data):
    # Function to combine the data from Pets and Pets Interest tables

    # Initialize an empty list to hold the combined data
    report_data = []

    # Loop through each pet record in the pets_data list
    for pet in pets_data:
        # Loop through each adoption interest record in the pets_interest_data list
        for interest in pets_interest_data:
            # Check if the 'pet_id' in the adoption interest matches the 'id' in the current pet record
            if interest['pet_id'] == pet['id']:
                # If they match, add the 'adoption_requests' data from the interest record to the current pet record
                pet['adoption_requests'] = interest['adoption_requests']
        
        # Append the updated pet record (with adoption requests added) to the report_data list
        report_data.append(pet)

    # After combining all records, return the final report_data list
    return report_data
