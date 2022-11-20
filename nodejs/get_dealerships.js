/**
 * Get all databases
 */

const { CloudantV1 } = require('@ibm-cloud/cloudant');
const { IamAuthenticator } = require('ibm-cloud-sdk-core');

function main(params) {
  const secret = {
    COUCH_URL:
      'https://apikey-v2-2cyywmxlsaahl54fgbjm13d9xih7m61lg3ce16n5m9zd:2ebb1cd25e6d93cb8547ffe3f45fd6d4@21e59688-0d81-4ced-aee6-ffaddc42b6e7-bluemix.cloudantnosqldb.appdomain.cloud',
    COUCH_USERNAME: 'apikey-v2-2cyywmxlsaahl54fgbjm13d9xih7m61lg3ce16n5m9zd',
    IAM_API_KEY: '422oU7w-BuGlBjsnxjwFyGYVIuXebrPhdjWIWVfyAwBw'
  };

  return new Promise(function (resolve, reject) {
    const authenticator = new IamAuthenticator({ apikey: secret.IAM_API_KEY });
    const cloudant = CloudantV1.newInstance({
      authenticator: authenticator
    });
    cloudant.setServiceUrl(secret.COUCH_URL);
    cloudant
      .postAllDocs({
        db: 'dealerships',
        includeDocs: true
      })
      .then((response) => {
        resolve({
          statusCode: 200,
          headers: { 'Content-Type': 'application/json' },
          body: (response || {}).result
        });
      });
  });
}

main();
