from ibm_cloud_sdk_core.authenticators import IAMAuthenticator
from ibmcloudant.cloudant_v1 import CloudantV1


def main(dict):
    secret = {
        "COUCH_URL":
        "https://apikey-v2-2cyywmxlsaahl54fgbjm13d9xih7m61lg3ce16n5m9zd:2ebb1cd25e6d93cb8547ffe3f45fd6d4@21e59688-0d81-4ced-aee6-ffaddc42b6e7-bluemix.cloudantnosqldb.appdomain.cloud",
        "COUCH_USERNAME": "apikey-v2-2cyywmxlsaahl54fgbjm13d9xih7m61lg3ce16n5m9zd",
        "IAM_API_KEY": "422oU7w-BuGlBjsnxjwFyGYVIuXebrPhdjWIWVfyAwBw"
    }
    authenticator = IAMAuthenticator(
        secret["IAM_API_KEY"])
    service = CloudantV1(authenticator=authenticator)
    service.set_service_url(secret["COUCH_URL"])

    try:
        selector = {"dealership": {"$eq": int(dict["dealerId"])}}
        response = service.post_find(
            db='reviews',
            selector=selector
        ).get_result()
        result = {
            'headers': {'Content-Type': 'application/json'},
            'body': {'data': response}
        }
        return result
    except:
        return {
            'statusCode': 500,
            'message': "Something went wrong"
        }


main({"dealerId": 15})
