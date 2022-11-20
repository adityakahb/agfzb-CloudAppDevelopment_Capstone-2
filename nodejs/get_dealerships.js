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

function main(params) {
  const authenticator = new IamAuthenticator({ apikey: params.IAM_API_KEY });
  const cloudant = CloudantV1.newInstance({
    authenticator: authenticator
  });
  cloudant.setServiceUrl(params.COUCH_URL);

  let dbList = getDbs(cloudant);
  return { dbs: dbList };
}

function getDbs(cloudant) {
  let allDbs = [];
  cloudant
    .getAllDbs()
    .then((body) => {
      ((body || {}).result || []).forEach((dbName) => {
        let dbObj = {};
        cloudant.getDatabaseInformation({ db: dbName }).then((dbInfo) => {
          console.log('====================================');
          console.log('============', dbName);
          console.log('============', dbInfo);
          console.log('====================================');
        });
        allDbs.push(dbObj);
      });
      return allDbs;
    })
    .catch((err) => {
      console.log(err);
    });
}

main(secret);
