# CluelessStyleMatcher Flows

## Upload Flow

1. User uploads wardrobe image → S3 Upload Bucket.
2. S3 triggers Lambda (Image Processor).
3. Lambda calls Rekognition → extracts attributes.
4. Lambda writes metadata to DynamoDB.

## Recommendation Flow

5. User requests outfit scenario via front-end.
6. Front-end calls API Gateway.
7. Recommender Lambda queries wardrobe DynamoDB.
8. Lambda builds prompt combining scenario + wardrobe metadata.
9. Lambda invokes Amazon Bedrock LLM.
10. Lambda returns recommendation JSON → front-end renders outfit images.
