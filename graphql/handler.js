'use strict';

import { graphql } from 'graphql';
import graphQLHTTP from 'express-graphql';
import { Schema } from './data/schema';


const createResponse = function(statusCode, body) {
  return {
    statusCode: statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*', // Required for CORS
    },
    body: JSON.stringify(body),
  }
};

export const handler = function(event) {
  const body = JSON.parse(event.body);
  return graphql(Schema, body.query, null, {}, body.variables)
    .then(data => createResponse(200, data))
    .catch(err => createResponse(500, err));
};

export const serverlessHandler = function(event, context, callback) {
  handler(event)
    .then( response => callback(null, response) );
};
