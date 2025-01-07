import logging
import boto3
from botocore.exceptions import ClientError

s3_client = boto3.client('s3')

def generate_presigned_url(bucket_name, object_name, expiration_in_seconds):
    try:
        presigned_url = s3_client.generate_presigned_url(
            'get_object',
            Params={'Bucket': bucket_name, 'Key': object_name},
            ExpiresIn=expiration_in_seconds,
            HttpMethod='GET'
        )
        return {'presigned_url_str': presigned_url}
    except ClientError as e:
        logging.error(e)
        return None

def lambda_handler(event, context):
    bucket_name = "REPORT_BUCKET_NAME_HERE" #REPLACE BUCKET_NAME WITH THE NAME OF THE REPORT BUCKET HERE
    object_name = "report.html"
    expiration_in_seconds = 240

    response = generate_presigned_url(bucket_name, object_name, expiration_in_seconds)
    return response
