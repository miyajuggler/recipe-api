import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Handler, Context } from 'aws-lambda';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import * as serverless from 'serverless-http';

let handler: Handler;

async function bootstrap(): Promise<Handler> {
  const expressApp = express();
  const adapter = new ExpressAdapter(expressApp);
  const app = await NestFactory.create(AppModule, adapter);
  
  await app.init();
  return serverless(expressApp);
}

export const lambdaHandler: Handler = async (event: any, context: Context, callback: any) => {
  handler = handler ?? (await bootstrap());
  return handler(event, context, callback);
};
