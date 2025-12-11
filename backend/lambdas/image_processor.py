import boto3
import json
from utils import write_metadata_to_dynamodb

rekognition = boto3.client('rekognition')
dynamodb = boto3.resource('dynamodb')
TABLE_NAME = 'WardrobeItems'

def lambda_handler(event, context):
    for record in event['Records']:
        bucket = record['s3']['bucket']['name']
        key = record['s3']['object']['key']

        # Call Rekognition
        response = rekognition.detect_labels(
            Image={'S3Object': {'Bucket': bucket, 'Name': key}},
            MaxLabels=10
        )

        attributes = [label['Name'] for label in response['Labels']]

        # Store in DynamoDB
        write_metadata_to_dynamodb(TABLE_NAME, key, attributes)

    return {'status': 'success'}
