ECR_REGISTRY="581592018732.dkr.ecr.us-east-1.amazonaws.com"
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin $ECR_REGISTRY
docker build -t aws_todolist .
docker tag aws_todolist:latest $ECR_REGISTRY/aws_todolist:latest
docker push $ECR_REGISTRY/aws_todolist:latest