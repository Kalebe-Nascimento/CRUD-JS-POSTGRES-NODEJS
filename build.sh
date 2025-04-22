ECR_REGISTRY="581592018732.dkr.ecr.us-east-1.amazonaws.com"
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin $ECR_REGISTRY
docker build -t aws_todo .
docker tag aws_todo:latest $ECR_REGISTRY/aws_todo:latest
docker push $ECR_REGISTRY/aws_todo:latest