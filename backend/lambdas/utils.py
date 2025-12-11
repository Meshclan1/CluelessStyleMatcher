import boto3

def write_metadata_to_dynamodb(table_name, s3_key, attributes):
    table = boto3.resource('dynamodb').Table(table_name)
    table.put_item(Item={'itemId': s3_key, 'attributes': attributes})

def fetch_wardrobe_items(table_name, user_id):
    table = boto3.resource('dynamodb').Table(table_name)
    response = table.query(
        KeyConditionExpression='userId = :uid',
        ExpressionAttributeValues={':uid': user_id}
    )
    return response['Items']

def generate_bedrock_prompt(items, scenario):
    item_str = ', '.join([f"{i['attributes']}" for i in items])
    return f"Given the scenario '{scenario}', suggest an outfit using these items: {item_str}"

def call_bedrock(client, prompt):
    response = client.invoke_model(
        ModelId='clothing-recommender',
        Body=prompt.encode('utf-8')
    )
    return response['Body'].read().decode('utf-8')
