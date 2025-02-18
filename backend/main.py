import os
import boto3
from botocore.exceptions import ClientError
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
load_dotenv(dotenv_path=".env")

load_dotenv()

AWS_ACCESS_KEY = os.getenv("AWS_ACCESS_KEY")
AWS_SECRET_KEY = os.getenv("AWS_SECRET_KEY")
AWS_REGION = os.getenv("AWS_REGION")

if not AWS_ACCESS_KEY or not AWS_SECRET_KEY or not AWS_REGION:
    raise ValueError("AWS credentials are missing in .env file!")

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"], 
)
class BucketRequest(BaseModel):
    bucket_name: str

def create_bucket(bucket_name: str):
    """Function to create an S3 bucket with error handling"""
    try:
        s3_client = boto3.client(
            "s3",
            aws_access_key_id=AWS_ACCESS_KEY,
            aws_secret_access_key=AWS_SECRET_KEY,
            region_name=AWS_REGION if AWS_REGION != "us-east-1" else None
        )

        if AWS_REGION == "us-east-1":
            s3_client.create_bucket(Bucket=bucket_name)
        else:
            s3_client.create_bucket(
                Bucket=bucket_name,
                CreateBucketConfiguration={"LocationConstraint": AWS_REGION}
            )

        return {"message": f"Bucket '{bucket_name}' created successfully in '{AWS_REGION}'!"}

    except ClientError as e:
        raise HTTPException(status_code=400, detail=f"Error: {e.response['Error']['Message']}")

@app.post("/create-bucket")
async def create_s3_bucket(request: BucketRequest):
    """API endpoint to create an S3 bucket"""
    if not request.bucket_name.strip():
        raise HTTPException(status_code=400, detail="Bucket name cannot be empty.")
    
    return create_bucket(request.bucket_name)

@app.get("/test-aws")
def test_aws():
    return {
        "AWS_ACCESS_KEY": AWS_ACCESS_KEY if AWS_ACCESS_KEY else "Not Set",
        "AWS_SECRET_KEY": "****" if AWS_SECRET_KEY else "Not Set",
        "AWS_REGION": AWS_REGION if AWS_REGION else "Not Set"
    }