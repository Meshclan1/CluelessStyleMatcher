import boto3
import json
from utils import fetch_wardrobe_items, generate_bedrock_prompt, call_bedrock

dynamodb = boto3.resource('dynamodb')
TABLE_NAME = 'WardrobeItems'
bedrock = boto3.client('bedrock')

def lambda_handler(event, context):
    user_id = event['queryStringParameters']['userId']
    scenario = event['queryStringParameters']['scenario']

    items = fetch_wardrobe_items(TABLE_NAME, user_id)
    prompt = generate_bedrock_prompt(items, scenario)
    recommendation = call_bedrock(bedrock, prompt)

    return {
        'statusCode': 200,
        'body': json.dumps({'recommendation': recommendation})
    }
