# **CluelessStyleMatcher**

### AI-Powered Wardrobe & Outfit Recommender: DEMO

![CluelessStyleMatcher Docs](./docs/overview.md)

---

## 🚩 1. Problem

Consumers frequently struggle to coordinate outfits or plan looks for specific occasions. Small fashion-tech apps often lack the resources to provide personalised, AI-driven styling advice, requiring either dedicated infrastructure or manual coordination.  

Without automation, wardrobe management and outfit recommendation are time-consuming, inconsistent, and cannot adapt dynamically to user context such as weather, event type, or personal style.

---

## ✅ 2. Solution

**CluelessStyleMatcher** delivers a fully **serverless, event-driven AI recommendation platform** for personalised outfit suggestions. Users upload wardrobe images, which are analysed using **AWS Rekognition** to extract attributes such as colour, style, and material. Metadata is stored in **DynamoDB**, forming the basis of the recommendation engine.  

When a user requests an outfit scenario (e.g., “birthday dinner”, “rainy day”), the **Recommender Lambda** retrieves wardrobe metadata, constructs a prompt, and invokes **Amazon Bedrock** to generate a tailored outfit recommendation. Results are returned via **API Gateway** and displayed on a **static React front-end** hosted on **S3 + CloudFront**.

Key capabilities include:

- **Serverless Image Processing Pipeline**: S3 → Lambda → Rekognition → DynamoDB  
- **Personalised Recommendation Engine**: API Gateway → Lambda → Bedrock → DynamoDB → Front-End  
- **Static Front-End Hosting**: React app served via S3 + CloudFront for fast, secure access  
- **Event-Driven Architecture**: Automatic processing of new wardrobe items and real-time recommendation generation

---

## 🏗️ 3. Architecture

**Core Components:**

- **Amazon S3 Upload Bucket** – Receives wardrobe image uploads from users  
- **Lambda: Image Processor** – Invokes Rekognition and writes metadata to DynamoDB  
- **Amazon Rekognition** – Analyses clothing images to extract attributes  
- **DynamoDB Table** – Stores wardrobe item metadata  
- **Front-End React App** – Hosted on S3 + CloudFront for secure, performant user access  
- **API Gateway** – REST API for scenario-based outfit requests  
- **Lambda: Recommender** – Combines wardrobe metadata and user scenario, invokes Bedrock  
- **Amazon Bedrock** – LLM generates AI-powered outfit recommendations

The architecture is split into **two main clusters**:  
1. **Upload Flow**: S3 → Lambda → Rekognition → DynamoDB  
2. **Recommendation Flow**: Front-End → API Gateway → Recommender Lambda → Bedrock → Front-End  

This design ensures **scalability, security, and low operational overhead**, suitable for a single engineer or SME fashion-tech application.

---

## 📈 4. Impact

CluelessStyleMatcher demonstrates measurable benefits:

- Provides **real-time, AI-driven outfit recommendations** without dedicated infrastructure  
- Reduces **manual wardrobe management effort** for users  
- Fully **serverless architecture** minimizes cost and operational complexity  
- Enables **personalised experiences** that adapt to scenario, weather, and style preferences  
- Simple **static front-end hosting** ensures accessibility and fast load times  

This project showcases **practical application of AWS serverless services and AI integration** for consumer-facing fashion-tech solutions.

---

## 🖼️ 5. Architecture High-Level Diagram Layout

The diagram below illustrates the architecture of **CluelessStyleMatcher**. It shows how the **Upload Flow** and **Recommendation Flow** interact through shared DynamoDB storage and AWS services to deliver AI-powered outfit recommendations.

<img width="2660" height="1236" alt="diagram-export-11-12-2025-16_03_07" src="https://github.com/user-attachments/assets/8623f4bf-fb45-4dbe-be0d-2c75244688f2" />

---
