from ibm_cloud_sdk_core import ApiException
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator
from ibmcloudant.cloudant_v1 import CloudantV1, Document
import requests


def main():
    secret = {
        "COUCH_URL":
        "https://apikey-v2-2cyywmxlsaahl54fgbjm13d9xih7m61lg3ce16n5m9zd:2ebb1cd25e6d93cb8547ffe3f45fd6d4@21e59688-0d81-4ced-aee6-ffaddc42b6e7-bluemix.cloudantnosqldb.appdomain.cloud",
        "COUCH_USERNAME": "apikey-v2-2cyywmxlsaahl54fgbjm13d9xih7m61lg3ce16n5m9zd",
        "IAM_API_KEY": "422oU7w-BuGlBjsnxjwFyGYVIuXebrPhdjWIWVfyAwBw"
    }

    # client = CloudantV1.iam(
    #     account_name=secret["ACCOUNT_NAME"],
    #     api_key=secret["IAM_API_KEY"],
    #     url=secret["URL"],
    #     connect=True,
    # )
    authenticator = IAMAuthenticator(
        secret["IAM_API_KEY"])
    service = CloudantV1(authenticator=authenticator)
    service.set_service_url(secret["COUCH_URL"])

    response = service.post_all_docs(
        db='reviews',
        include_docs=True
    ).get_result()
    print(response)


main()
