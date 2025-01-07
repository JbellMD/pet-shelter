import os
import boto3
import json
from datetime import datetime
import html


def lambda_handler(event, context):
    # # Generate HTML report
    html_report = create_html(event['report_data'])
    write_report(html_report)

    return {
        'message': 'Report published to S3'
    }

def write_report(html_str):
    s3 = boto3.client('s3')

    params = {
        'Bucket': 'REPORT_BUCKET_NAME_HERE', #REPLACE BUCKET_NAME WITH S3 BUCKET NAME
        'Key': 'report.html',
        'Body': html_str.encode(),
        'CacheControl': 'max-age=0',
        'ContentType': 'text/html'
    }

    s3.put_object(**params)

def create_html(report_data):
    html_str = """
    <!DOCTYPE html>
    <html>
    <head>
        <title>Pets Adoption Requests Interest Report</title>
        <style>
            table {
                border-collapse: collapse;
                width: 100%;
            }
            th, td {
                text-align: left;
                padding: 8px;
                border-bottom: 1px solid #ddd;
            }
            th {
                background-color: #f2f2f2;
            }
        </style>
    </head>
    <body>
        <h1>Pets Adoption Requests Interest Report</h1>
        <table>
            <tr>
                <th>Pet ID</th>
                <th>Pet Name</th>
                <th>Adoption Requests</th>
                <th>Age</th>
                <th>Species</th>
                <th>In Shelter Since</th>
            </tr>
    """

    for pet in report_data:
        pet_id = pet['id']
        name = pet['name']
        adoption_requests = pet['adoption_requests']
        age = pet['age']
        species = pet['species']
        date_entered = pet['date_entered']
        html_str += f"""
        <tr>
            <td>{pet_id}</td>
            <td>{name}</td>
            <td>{adoption_requests}</td>
            <td>{age}</td>
            <td>{species}</td>
            <td>{date_entered}</td>
        </tr>
        """
    html_str += """
        </table>
    </body>
    </html>
    """

    html_str = html_str.replace("\n", "")
    return html_str
