<div align="center">
  <b><i>Streaming is now officially supported by OpenAI: https://github.com/openai/openai-node</i></b>
  <h3 align="center">Lambda-OpenAI-Stream</h3>
</div>

## About
__Lambda-OpenAI-Stream__ lets you stream OpenAI responses via an AWS Lambda Function URL. It is a simple implementation in vanilla JS. The only (optional) dependency is dotenv.

![Example gif](example_lambda.gif?raw=true)

## Deployment
### Prerequisites
* General AWS knowledge is helpful.
* You need to have [Docker](https://docs.docker.com/engine/install/) installed locally.
* You need to have [aws-sam](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html) installed locally and configured with your AWS account.

### Setup
1. Clone the repository
   ```sh
   git clone https://github.com/maxsagt/lambda-openai-stream.git
   ```
2. Create the .env in ./src with your OpenAI API key:
    ```
    OPENAI_API_KEY=abc123
    ```
3. Install dotenv
    ```sh
    npm init
    npm install dotenv
    ```   
4. Build and test the Lambda function locally
    ```sh
    sam build
    sam local invoke -e event.json
    ```
5. Deploy to AWS. Note that your AWS user or role needs (temporary) IAM permissions for AWS CloudFormation, S3, Lambda and IAM.
    ```sh
    sam build --cached --parallel
    # Use sam deploy --guided to control the AWS region.
    ```
6. Done. Your Lambda Function URL is displayed in the terminal, and you can find it in AWS. 
![Example](example_cloudformation.png?raw=true)

### ! Please note that this URL is publicly exposed and has no authorization configured at this point.

## Future Improvements
- Add configurations for Amazon CloudFront and AWS WAF to introduce authentication
- Add an index.html to show how the frontend could work.

## Feedback
Feedback and contributions are welcome!
