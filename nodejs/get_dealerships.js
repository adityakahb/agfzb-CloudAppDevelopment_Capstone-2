/**
 * Get all databases
 */

const { CloudantV1 } = require('@ibm-cloud/cloudant');
const { IamAuthenticator } = require('ibm-cloud-sdk-core');
const secret = {
  COUCH_URL:
    'https://apikey-v2-2cyywmxlsaahl54fgbjm13d9xih7m61lg3ce16n5m9zd:2ebb1cd25e6d93cb8547ffe3f45fd6d4@21e59688-0d81-4ced-aee6-ffaddc42b6e7-bluemix.cloudantnosqldb.appdomain.cloud',
  COUCH_USERNAME: 'apikey-v2-2cyywmxlsaahl54fgbjm13d9xih7m61lg3ce16n5m9zd',
  IAM_API_KEY: '422oU7w-BuGlBjsnxjwFyGYVIuXebrPhdjWIWVfyAwBw'
};
const database = 'dealerships';
function resolveHandler(resolve, statusCode, body) {
  resolve({
    statusCode: statusCode,
    headers: { 'Content-Type': 'application/json' },
    body: body
  });
}

function main(params) {
  return new Promise(function (resolve, reject) {
    const authenticator = new IamAuthenticator({ apikey: secret.IAM_API_KEY });
    const cloudant = CloudantV1.newInstance({
      authenticator: authenticator
    });
    cloudant.setServiceUrl(secret.COUCH_URL);
    if ((params || {}).dealerId) {
      cloudant
        .postFind({
          db: database,
          selector: {
            dealer_id: {
              $eq: parseInt(params.dealerId)
            }
          }
        })
        .then((response) => {
          const docs = ((response || {}).result || {}).docs || [];
          if (docs.length === 0) {
            resolveHandler(resolve, 404, { rows: [] });
          } else {
            resolveHandler(resolve, 200, { rows: docs });
          }
        })
        .catch((error) => {
          resolveHandler(resolve, 500, error);
        });
    } else if ((params || {}).state) {
      cloudant
        .postFind({
          db: database,
          selector: {
            state: {
              $eq: params.state
            }
          }
        })
        .then((response) => {
          const docs = ((response || {}).result || {}).docs || [];
          if (docs.length === 0) {
            resolveHandler(resolve, 404, { rows: [] });
          } else {
            resolveHandler(resolve, 200, { rows: docs });
          }
        })
        .catch((error) => {
          resolveHandler(resolve, 500, error);
        });
    } else {
      cloudant
        .postAllDocs({
          db: database,
          includeDocs: true
        })
        .then((response) => {
          const docs = ((response || {}).result || {}).rows || [];
          if (docs.length === 0) {
            resolveHandler(resolve, 404, { rows: [] });
          } else {
            resolveHandler(resolve, 200, { rows: docs });
          }
        })
        .catch((error) => {
          resolveHandler(resolve, 500, error);
        });
    }
  });
}

main({});
