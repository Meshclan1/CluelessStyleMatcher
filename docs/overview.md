## CluelessStyleMatcher – AI-Powered Outfit Recommendation System

_CluelessStyleMatcher is a serverless, AI-driven platform that analyses wardrobe images, stores structured metadata, and provides personalised outfit recommendations. It is inspired by the movie Clueless! It is designed for low cost, automatic scaling, and minimal operational overhead, it is ideal for SMEs, fashion-tech prototypes, or personal projects._

---

### Problem Statement

Most users struggle to:

- Organise outfits and wardrobe items effectively.
- Determine what items match for events, seasons, or weather conditions.
- Use existing fashion apps, which often rely on manual tagging, inconsistent styling rules, or generic recommendations.

**CluelessStyleMatcher solves this by delivering automated, AI-powered outfit recommendations that integrate directly with a user’s wardrobe.**

---

### Solution Architecture

CluelessStyleMatcher leverages **AWS serverless services** and AI to provide a fully automated wardrobe management and recommendation system:

#### **1. Upload Flow – Automated Wardrobe Processing**

- Users upload wardrobe images to **Amazon S3**.
- **S3 event triggers** an **AWS Lambda** function.
- Lambda invokes **Amazon Rekognition** to extract metadata:
  - Colour
  - Style
  - Material
  - Garment type
- Structured metadata is stored in **DynamoDB** (single-table design) for **scalable and fast retrieval**.

#### **2. Recommendation Flow – AI-Powered Outfit Suggestions**

- Users request outfit recommendations via the front-end (**S3 + CloudFront**) or mobile app.
- **API Gateway** triggers a Lambda function that:
  - Retrieves wardrobe metadata from DynamoDB.
  - Constructs a prompt and calls **Amazon Bedrock** for AI-powered recommendations.
  - Returns a response including:
    - Natural-language explanation of outfit choice.
    - List of selected wardrobe items.
    - Optional styling notes or colour-matching guidance.
- Recommendations are displayed to the user via the static front-end.

#### **Security & Compliance**

- Lambda functions use **least-privilege IAM roles**.
- S3 buckets enforce **server-side encryption (SSE)** and **access control policies**.
- API Gateway endpoints use **HTTPS** and optional authentication (Cognito or API keys).

#### **Monitoring & Observability**

- **CloudWatch Logs** capture Lambda invocations, errors, and Rekognition/Bedrock API latencies.
- **CloudWatch Metrics** and alarms notify administrators of failed image processing or failed AI recommendations.
- Optional SNS notifications can alert the developer of system anomalies.

#### **Scalability & Reliability**

- Serverless architecture allows **automatic scaling** for spikes in uploads or recommendation requests.
- DynamoDB and S3 are **highly available across multiple AZs**.
- Event-driven workflow ensures reliable ingestion and AI processing without manual intervention.

![CluelessStyleMatcher Architecture](../architecture/cluelessstylematcher-architecture.png)

---

### Cost Analysis

CluelessStyleMatcher is **designed for minimal cost** while providing AI-driven functionality:

1. **Amazon S3 Storage** – inexpensive storage for wardrobe images; scales linearly with usage.
2. **AWS Lambda** – pay-per-use billing ensures low compute cost for typical usage.
3. **Amazon Rekognition** – billed per image; predictable for limited wardrobe sizes.
4. **Amazon Bedrock Inference** – main cost driver; on-demand usage enables tight cost control.
5. **DynamoDB Storage & Reads** – small, structured metadata keeps storage and read/write costs minimal.

Because infrastructure is **fully serverless**, scales automatically, and avoids traditional servers, CluelessStyleMatcher delivers **high-quality AI recommendations at a fraction of the cost** of traditional hosted applications.

---

### Key Architectural Decisions

1. **Serverless Event-Driven Design** – simplifies maintenance and scales with workload.
2. **Metadata Storage in DynamoDB** – enables fast, structured queries for AI prompts.
3. **AI Integration via Bedrock** – provides natural-language outfit recommendations and flexibility for multiple scenarios.
4. **Security Best Practices** – IAM least privilege, encrypted storage, and HTTPS endpoints.
5. **Monitoring & Alerts** – CloudWatch and optional SNS ensure operational visibility.
6. **Cost Optimization** – pay-per-use compute and AI services, minimal storage, and on-demand scaling.

_CluelessStyleMatcher provides a **production-ready, scalable, and secure fashion-tech solution**, suitable for SMEs or personal use with minimal operational overhead._
