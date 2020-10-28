#! /bin/sh -
BASEDIR=$(dirname $0)

source ${BASEDIR}/../config


STAGE=${1:-dev}
STACK_NAME=${PROJECT_NAME}-${STAGE}

API_ID=$(aws cloudformation describe-stacks --region ${REGION} --stack-name ${STACK_NAME} --query Stacks[0].Outputs[?OutputKey==\'ApiId\'].OutputValue --output text)
API_ENDPOINT="https://${API_ID}.execute-api.${REGION}.amazonaws.com/v1"

echo $API_ENDPOINT