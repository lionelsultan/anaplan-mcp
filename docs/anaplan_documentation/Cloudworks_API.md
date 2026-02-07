Anaplan CloudWorks API

Introduction

The Anaplan CloudWorks™ API enables you create your own connections and
integrations with
Anaplan [CloudWorks](https://help.anaplan.com/96f951fe-52fc-45a3-b6cb-16b7fe38e1aa).

Before you begin

You must have access to the Anaplan CloudWorks API to use the endpoints
listed in this guide. The Anaplan CloudWorks API enables you create your
own connections and integrations with
Anaplan [CloudWorks](https://help.anaplan.com/96f951fe-52fc-45a3-b6cb-16b7fe38e1aa).
We recommend you use the revised Version 2.0, but the last version (1.0)
is still supported.

To test this API, use an appropriate tool you trust with your secured
credentials. If successful, the testing tool will connect to your
Anaplan production environment using your credentials.

There are three new features added for Integration flows:

Disable steps in an Integration flow.

Run subset of steps of Integration flow supporting Resume from selected
step behavior.

Error control at the step level. If there is an error or an exception in
a flow step, you have choices as to how to proceed.

A new parameter is available to help sort integrations. It is sortBy. If
sortBy=name, then the sort is in acending order. If sortBy=-name, then
the sort is in descending order.

**Note:** Get calls for integrations include notificationID in the
response bodies, when a notification configuration is available for the
integraion. The rest of the endpoints are same as Version 1.0.

URL, IP, and allowlist requirements

To set your allowlists for API calls, see: [URL, IP, and allowlist
requirements](https://support.anaplan.com/url-ip-and-allowlist-requirements-c8235c7d-8af2-413b-a9ff-d465978806b9)

API endpoints

-   [[Create a
    connection]{.underline}](https://cloudworks.docs.apiary.io/#create_connection)

-   [[Get
    connections]{.underline}](https://cloudworks.docs.apiary.io/#get_connections)

-   [[Edit a
    connection]{.underline}](https://cloudworks.docs.apiary.io/#edit_connection)

-   [[Patch a
    connection]{.underline}](https://cloudworks.docs.apiary.io/#patch_connection)

-   [[Delete a
    connection]{.underline}](https://cloudworks.docs.apiary.io/#delete_connection)

-   [[Create a new
    integration]{.underline}](https://cloudworks.docs.apiary.io/#create_integration)

-   [[Run an
    integration]{.underline}](https://cloudworks.docs.apiary.io/#run_integration)

-   [[Cancel running
    integration]{.underline}](https://cloudworks.docs.apiary.io/#cancel_run)

-   [[Get all
    integrations]{.underline}](https://cloudworks.docs.apiary.io/#get_integrations)

-   [[Get integrations by integration
    ID]{.underline}](https://cloudworks.docs.apiary.io/#get_integrations_by_integration)

-   [[Get integrations by Model
    ID]{.underline}](https://cloudworks.docs.apiary.io/#get_integration_by_model)

-   [[Edit an
    integration]{.underline}](https://cloudworks.docs.apiary.io/#edit_integration)

-   [[Delete an
    integration]{.underline}](https://cloudworks.docs.apiary.io/#delete_integration)

-   [[Create process
    integration]{.underline}](https://cloudworks.docs.apiary.io/#create_process_integration)

-   [[Edit a process
    integration]{.underline}](https://cloudworks.docs.apiary.io/#edit_process_integration)

-   [[Set the status of an integration
    schedule]{.underline}](https://cloudworks.docs.apiary.io/#set_status_schedule)

-   [[Create an integration
    schedule]{.underline}](https://cloudworks.docs.apiary.io/#create_integration_schedule)

-   [[Update the schedule of an
    integration]{.underline}](https://cloudworks.docs.apiary.io/#update_schedule)

-   [[Delete an integration
    schedule]{.underline}](https://cloudworks.docs.apiary.io/#delete_integration_schedule)

-   [[Get history of integration
    runs]{.underline}](https://cloudworks.docs.apiary.io/#get_history)

-   [[Get integration run
    errors]{.underline}](https://cloudworks.docs.apiary.io/#get_run_errors)

-   [[Get run
    status]{.underline}](https://cloudworks.docs.apiary.io/#get_run_status)

-   [[Get a notification
    configuration]{.underline}](https://cloudworks.docs.apiary.io/#get_notification)

-   [[Create notification
    configuration]{.underline}](https://cloudworks.docs.apiary.io/#create_notification)

-   [[Edit a notification
    configuration]{.underline}](https://cloudworks.docs.apiary.io/#edit_notification)

-   [[Delete a notification
    configuration]{.underline}](https://cloudworks.docs.apiary.io/#delete_notification)

-   [[Get an import error
    log]{.underline}](https://cloudworks.docs.apiary.io/#get_import_error_log)

-   [[Get a process error
    log]{.underline}](https://cloudworks.docs.apiary.io/#get_process_error_log)

Integration flow endpoints

-   [[Create a new integration
    flow]{.underline}](https://cloudworks.docs.apiary.io/#create_integration_flow)

-   [[Run an integration
    flow]{.underline}](https://cloudworks.docs.apiary.io/#run_integration_flow)

-   [[Get all integration
    flows]{.underline}](https://cloudworks.docs.apiary.io/#get_integration_flows)

-   [[Get integration flows by integration
    ID]{.underline}](https://cloudworks.docs.apiary.io/#get_integration_flows_by_integration)

-   [[Delete an integration
    flow]{.underline}](https://cloudworks.docs.apiary.io/#delete_integration_flow)

-   [[Edit an integration
    flow]{.underline}](https://cloudworks.docs.apiary.io/#edit_integration_flow)

Error codes and meaning

The following is a list of possible error codes and descriptions you may
encounter with CloudWorks.

  ---------------------- -------- -------------------------------------------
  **Error**              **HTTP   **Description**
                         code**   

  Integration flow error 400      Integration flow has to have at least two
                                  enabled steps.

  Invalid request body   400      There is a problem with the request body. 
                                  Double-check the format of your request
                                  body.

  {request parameter     400      There is a problem with a parameter in the
  name}                           request body. Double-check the format of
                                  your request body.

  {header name}          400      There is a problem with a request header.
                                  Double-check the format of your request
                                  header.

  User does not have     400      You do not have access to the workspace.
  access to workspace             

  User does not have     400      You do not have access to the model.
  access to model                 

  Role arn is invalid    400      The Role ARN provided for Amazon S3
                                  credentials is invalid

  Bucket name is invalid 400      Amazon S3 bucket name is invalid or does
                                  not exist.

  Credentials are        400      The credentials for the external platform
  invalid                         (for example, Amazon S3) are invalid.

  Bucket access denied   400      You do not have access to the Amazon S3
                                  bucket.

  Only a single schedule 400      Each CloudWorks integration supports a
  is supported per                single associated schedule.
  integration                     

  Invalid Schedule       400      The schedule details are invalid. Verify
                                  the details and amend, as needed.

  {field error}          400      A field in the request has resulted in an
                                  error.  Verify the field element is
                                  correct.

  Invalid connection     400      The connection type is not valid. Verify
  type                            the connection type is valid.

  Integration payload is 400      The request to create or modify an
  not compliant with the          integration has a payload in an invalid
  schema                          format.

  A Process that has     400      The selected Process has Optimizer as a
  Optimizer as steps              step which is not supported by CloudWorks.
  cannot be executed              Please remove the optimizer step from the
  through CloudWorks.             Process in order to use it within
                                  CloudWorks.

  Action(s) you          400      Check the actions in Anaplan model.
  included, {action_ids}          
  are not defined in              
  your Anaplan model.             

  This API version is    400      Check the URL version.
  not supported for this          
  request                         

  Not Authorized         403      You are not authorized.  Verify that the
                                  Anaplan authorization token has not yet
                                  expired. If the token is valid, contact
                                  Anaplan support.

  Resource not found     404      This indicates the source information is
                                  invalid.  Verify the source information
                                  (for example, the connectionId.)

  Invalid connection_id  404      The connectionId is invalid. Check if the
                                  connectionId is valid.

  Integration is already 409      The API call cannot run until the
  running                         integration completes.

  The resource is being  409      Check if the resource is being referenced.
  referenced                      

  Only a single job is   409      The integration has too many jobs. 
  supported by                    CloudWorks integrations only support one
  import/export                   job.
  integration                     

  Total number of        409      The integrations exceed the maximum of 500
  integrations exceeded           allowed per Tenant.
  the limit                       

  Model Not Found Error  500      The request cannot find the referenced
                                  Anaplan model.  Verify the model is present
                                  in Anaplan.

  A running integration  500      A delete request has run against an active
  cannot be deleted               integration. Run the delete again when the
                                  integration has completed.

  Unable to retrieve S3  500      The request to retrieve files from an
  files, count too high           Amazon S3 bucket has resulted in too many
                                  files for retrieval.

  Duplicate resource     500      There is a duplicate resource name. Each
  name not allowed                resource name must be unique.

  Internal server error  500      There is an issue that requires assistance
                                  from Anaplan. Contact Anaplan support.

  Anaplan Connection     500      There is an issue that requires assistance
  Error                           from Anaplan. Contact Anaplan support.

  Invalid workspace or   503      The workspace or model ID is invalid.
  model                           

  Integration trigger    503      There is an issue that requires assistance
  error                           from Anaplan. Contact Anaplan support.

  Invalid Dataset        400      Check if Google Big Query dataset is valid.

  Dataset access denied  400      Check if you have access to Google Big
                                  Query dataset.
  ---------------------- -------- -------------------------------------------

Reference

Connections

Create a connection

integrations/connections

Use this call to [[create a new
connection]{.underline}](https://help.anaplan.com/anapedia/Content/Data_Integrations/Integrations_framework/Create-a-new-connection.htm) for
CloudWorks.

Request

curl -X POST
[']{dir="rtl"}https://api.cloudworks.anaplan.com/2/0/integrations/connections[']{dir="rtl"}
\\

-H [']{dir="rtl"}Authorization: AnaplanAuthToken
{token_value}[']{dir="rtl"} \\

-H [']{dir="rtl"}Content-Type: application/json[']{dir="rtl"} \\

-d [']{dir="rtl"}{request body}[']{dir="rtl"}

Request headers

+----------------------------+-----------------------------------------+
| **Header**                 | **Details**                             |
+----------------------------+-----------------------------------------+
| Authorization:             | -   Required                            |
| AnaplanAuthToken           |                                         |
| {anaplan_auth_token}       | -   Description: the Anaplan            |
|                            |     authentication token                |
+----------------------------+-----------------------------------------+
| Content-Type               | -   Required                            |
|                            |                                         |
|                            | -   Description: This indicates the     |
|                            |     preferred response                  |
|                            |     is application/json format.         |
+----------------------------+-----------------------------------------+

Request parameters

None

Request body

(Amazon S3)

{

  \"type\": \"{type}\",

  \"body\": {

    \"name\": \"{name}\",

    \"accessKeyId\": \"{access key ID}\",

    \"secretAccessKey\": \"{secret access key}\",

    \"bucketName\": \"{bucket name}\",

    \"roleArn\": \"{role ARN}\"

  }

}

Amazon S3 example for restricted integration users

Note: If you are a restricted integration user, add the Workspace ID to
which you have access in the payload.

{

  \"type\": \"{type}\",

  \"body\": {

    \"name\": \"{name}\",

    \"accessKeyId\": \"{access key ID}\",

    \"secretAccessKey\": \"{secret access key}\",

    \"bucketName\": \"{bucket name}\",

    \"roleArn\": \"{role ARN}\",

    \"workspaceId\": \"{workspace id}\"

  }

}

+-------------+--------------------------------------------------------+
| **Key**     | **Details**                                            |
+-------------+--------------------------------------------------------+
| type        | -   Required                                           |
|             |                                                        |
|             | -   Type: String                                       |
|             |                                                        |
|             | -   Description: The authentication type.  The valid   |
|             |     value is: AmazonS3.                                |
|             |                                                        |
|             | -   Example: AmazonS3                                  |
+-------------+--------------------------------------------------------+
| name        | -   Required                                           |
|             |                                                        |
|             | -   Type: String                                       |
|             |                                                        |
|             | -   Description: The name of the connection.  This     |
|             |     should be a unique name.                           |
|             |                                                        |
|             | -   Example: test_credentials_1                        |
+-------------+--------------------------------------------------------+
| accessKeyId | -   Required                                           |
|             |                                                        |
|             | -   Type: String                                       |
|             |                                                        |
|             | -   Description: The Amazon S3 Access Key ID           |
|             |                                                        |
|             | -   Example: ALMNW18ERR9QQ89SS00H                      |
+-------------+--------------------------------------------------------+
| secr        | -   Required                                           |
| etAccessKey |                                                        |
|             | -   Type: String                                       |
|             |                                                        |
|             | -   Description: The Amazon S3 Secret Access Key       |
|             |                                                        |
|             | -   Example: BKmrBGlcuiuRpx32lmpglReWLwuflEcPbp7nf3LP  |
+-------------+--------------------------------------------------------+
| bucketName  | -   Required                                           |
|             |                                                        |
|             | -   Type: String                                       |
|             |                                                        |
|             | -   Description: The Amazon S3 Bucket name             |
|             |                                                        |
|             | -   Example: samplebucket                              |
+-------------+--------------------------------------------------------+
| roleArn     | -   Optional                                           |
|             |                                                        |
|             | -   Type: String                                       |
|             |                                                        |
|             | -   Description: The Amazon S3 Role ARN                |
|             |                                                        |
|             | -                                                      |
|             |    Example: arn:aws:iam::123475742:role/sampleReadOnly |
+-------------+--------------------------------------------------------+
| workspaceId | -   Required                                           |
|             |                                                        |
|             | -   Type: String                                       |
|             |                                                        |
|             | -   Description: The workspace ID                      |
|             |                                                        |
|             | -   Example: 2c9ba1a8719d5fbf01722b11d9385b1a          |
+-------------+--------------------------------------------------------+

Google Big Query

{

\"type\": \"{type}\",

\"body\" : {

\"name\" : \"{name}\",

\"serviceAccountKey\" : {

\"type\": \"service_account\",

\"projectId\": \"{projectId}\",

\"privateKeyId\": \"{privateKeyId}\",

\"privateKey\": \"{privateKey}\",

\"clientEmail\": \"{clientEmail}\",

\"clientId\": \"{clientId}\",

\"authUri\": \"{authUri}\",

\"tokenUri\": \"{tokenUri}\",

\"authProviderX509CertUrl\": \"{authProviderX509CertUrl}\",

\"clientX509CertUrl\": \"{clientX509CertUrl}\"

},

\"dataset\": \"{dataset}\"

}

}

Google Big Query example for restricted integration users

Note: If you are a restricted integration user, add the Workspace ID to
which you have access in the payload.

{

\"type\": \"{type}\",

\"body\" : {

\"name\" : \"{name}\",

\"serviceAccountKey\" : {

\"type\": \"service_account\",

\"projectId\": \"{projectId}\",

\"privateKeyId\": \"{privateKeyId}\",

\"privateKey\": \"{privateKey}\",

\"clientEmail\": \"{clientEmail}\",

\"clientId\": \"{clientId}\",

\"authUri\": \"{authUri}\",

\"tokenUri\": \"{tokenUri}\",

\"authProviderX509CertUrl\": \"{authProviderX509CertUrl}\",

\"clientX509CertUrl\": \"{clientX509CertUrl}\"

},

\"dataset\": \"{dataset}\",

\"workspaceId\": \"{workspace id}\"

}

}

+----------------+-----------------------------------------------------+
| **Key**        | **Details**                                         |
+----------------+-----------------------------------------------------+
| type           | -   Required                                        |
|                |                                                     |
|                | -   Type: String                                    |
|                |                                                     |
|                | -   Description: The authentication type.  The      |
|                |     valid value is: GoogleBigQuery.                 |
|                |                                                     |
|                | -   Example: GoogleBigQuery                         |
+----------------+-----------------------------------------------------+
| name           | -   Required                                        |
|                |                                                     |
|                | -   Type: String                                    |
|                |                                                     |
|                | -   Description: The name of the connection.  This  |
|                |     should be a unique name.                        |
|                |                                                     |
|                | -   Example: test BQ credentials                    |
+----------------+-----------------------------------------------------+
| projectId      | -   Required                                        |
|                |                                                     |
|                | -   Type: String                                    |
|                |                                                     |
|                | -   Description: The Google Big Query project ID    |
|                |                                                     |
|                | -   Example: ap-engg-np-project                     |
+----------------+-----------------------------------------------------+
| privateKeyId   | -   Required                                        |
|                |                                                     |
|                | -   Type: String                                    |
|                |                                                     |
|                | -   Description: The Google Big Query private key   |
|                |     ID                                              |
|                |                                                     |
|                | -                                                   |
|                |   Example: 1dg11189f71111b5f7juh8u9b5dh9k46y888999o |
+----------------+-----------------------------------------------------+
| privateKey     | -   Required                                        |
|                |                                                     |
|                | -   Type: String                                    |
|                |                                                     |
|                | -   Description: The Google Big Query private key   |
|                |                                                     |
|                | -   Example: \-\-\-\--BEGIN PRIVATE                 |
|                |     KEY\-\-\-\--xUbZLId3bn2\-\-\-\--END PRIVATE     |
|                |     KEY\-\-\-\--\\n\"                               |
+----------------+-----------------------------------------------------+
| clientEmail    | -   Required                                        |
|                |                                                     |
|                | -   Type: String                                    |
|                |                                                     |
|                | -   Description: The Google Big Query client email  |
|                |                                                     |
|                | -   Example: sample.iam.gserviceaccount.com         |
+----------------+-----------------------------------------------------+
| clientId       | -   Required                                        |
|                |                                                     |
|                | -   Type: String                                    |
|                |                                                     |
|                | -   Description: The Google Big Query client ID     |
|                |                                                     |
|                | -   Example: 1223111987765897895300                 |
+----------------+-----------------------------------------------------+
| authUri        | -   Required                                        |
|                |                                                     |
|                | -   Type: String                                    |
|                |                                                     |
|                | -   Description: The Google Big Query auth uri      |
|                |                                                     |
|                | -                                                   |
|                |  Example: https://accounts.google.com/o/oauth2/auth |
+----------------+-----------------------------------------------------+
| tokenUri       | -   Required                                        |
|                |                                                     |
|                | -   Type: String                                    |
|                |                                                     |
|                | -   Description: The Google Big Query token uri     |
|                |                                                     |
|                | -   Example: https://oauth2.googleapis.com/token    |
+----------------+-----------------------------------------------------+
| authProvi      | -   Required                                        |
| derX509CertUrl |                                                     |
|                | -   Type: String                                    |
|                |                                                     |
|                | -   Description: The Google Big Query auth provider |
|                |     cert url                                        |
|                |                                                     |
|                | -                                                   |
|                | Example: https://www.googleapis.com/oauth2/v1/certs |
+----------------+-----------------------------------------------------+
| cli            | -   Required                                        |
| entX509CertUrl |                                                     |
|                | -   Type: String                                    |
|                |                                                     |
|                | -   Description: The Google Big Query client cert   |
|                |     url                                             |
|                |                                                     |
|                | -   Example:                                        |
|                |  https://www.googleapis.com/iam.gserviceaccount.com |
+----------------+-----------------------------------------------------+
| dataset        | -   Required                                        |
|                |                                                     |
|                | -   Type: String                                    |
|                |                                                     |
|                | -   Description: The Google Big Query dataset       |
|                |                                                     |
|                | -   Example: dev_us_west                            |
+----------------+-----------------------------------------------------+
| workspaceId    | -   Required                                        |
|                |                                                     |
|                | -   Type: String                                    |
|                |                                                     |
|                | -   Description: The workspace ID                   |
|                |                                                     |
|                | -   Example: 2c9ba1a8719d5fbf01722b11d9385b1a       |
+----------------+-----------------------------------------------------+

Azure Blob

{

\"type\": \"{type}\",

}

\"body\": {

\"name\": \"name\",

\"storageAccountName\": \"{storate account name}\",

\"sasToken\": \"{SAS token}\",

\"containerName\": \"{container name}\"

}

}

Azure Blob example for restricted integration users

Note: If you are a restricted integration user, add the Workspace ID to
which you have access in the payload.

{

\"type\": \"{type}\",

}

\"body\": {

\"name\": \"name\",

\"storageAccountName\": \"{storate account name}\",

\"sasToken\": \"{SAS token}\",

\"containerName\": \"{container name}\",

\"workspaceId\": \"{workspace id}\"

}

}

+-------------+--------------------------------------------------------+
| **JSON**    | **Details**                                            |
+-------------+--------------------------------------------------------+
| type        | -   Required                                           |
|             |                                                        |
|             | -   Type: String                                       |
|             |                                                        |
|             | -   Description: The authentication type.  The valid   |
|             |     value is: AzureBlob.                               |
|             |                                                        |
|             | -   Example: AzureBlob                                 |
+-------------+--------------------------------------------------------+
| name        | -   Required                                           |
|             |                                                        |
|             | -   Type: String                                       |
|             |                                                        |
|             | -   Description: The name of the connection.  This     |
|             |     should be a unique name.                           |
|             |                                                        |
|             | -   Example: test_credentials_1                        |
+-------------+--------------------------------------------------------+
| storage     | -   Required                                           |
| AccountName |                                                        |
|             | -   Type: String                                       |
|             |                                                        |
|             | -   Description: Azure Storage account name            |
|             |                                                        |
|             | -   Example: my_storage_account                        |
+-------------+--------------------------------------------------------+
| sasToken    | -   Required                                           |
|             |                                                        |
|             | -   Type: String                                       |
|             |                                                        |
|             | -   Description: Shared access token for the Azure     |
|             |     Storage container                                  |
|             |                                                        |
|             | -   Example: sp=racwdl&st=2021-10-07T09:11:            |
|             | 01Z&se=2021-10-07T10:11:01Z&spr=https&sv=2020-08-04&sr |
|             | =c&sig=04YRw4xdasduTlRkWbW27Qr6qu2eQPXmltduiLwgyz0E%3D |
+-------------+--------------------------------------------------------+
| co          | -   Required                                           |
| ntainerName |                                                        |
|             | -   Type: String                                       |
|             |                                                        |
|             | -   Description: The Azure Storage container name      |
|             |                                                        |
|             | -   Example: my_container                              |
+-------------+--------------------------------------------------------+
| workspaceId | -   Required                                           |
|             |                                                        |
|             | -   Type: String                                       |
|             |                                                        |
|             | -   Description: The workspace ID                      |
|             |                                                        |
|             | -   Example: 2c9ba1a8719d5fbf01722b11d9385b1a          |
+-------------+--------------------------------------------------------+

Response headers

Content-Type: application/json

Response 200 Body

{

    \"status\": {

        \"code\": 200,

        \"message\": \"Success\"

    },

    \"connections\": {

        \"connectionId\": \"0c3d2f662c1b4c71a02fb4b6f09a40f7\"

    }

}

Get connections

/integrations/connections

Use this to get a list of your current connections to CloudWorks.

Request

curl -X GET
https://api.cloudworks.anaplan.com/2/0/integrations/connections \\

-H [']{dir="rtl"}Authorization: AnaplanAuthToken
{token_value}[']{dir="rtl"} \\

-H [']{dir="rtl"}Content-Type: application/json[']{dir="rtl"}

Request headers

+----------------------------+-----------------------------------------+
| **Header**                 | **Details**                             |
+----------------------------+-----------------------------------------+
| Authorization:             | -   Required                            |
| AnaplanAuthToken           |                                         |
| {anaplan_auth_token}       | -   Description: the Anaplan            |
|                            |     authentication token                |
+----------------------------+-----------------------------------------+
| Content-Type               | -   Required                            |
|                            |                                         |
|                            | -   Description: This indicates the     |
|                            |     preferred response                  |
|                            |     is application/json format.         |
+----------------------------+-----------------------------------------+

Request parameters

None

Response headers

Content-Type: application/json

Response 200 Body

{

    \"status\": {

        \"code\": 200,

        \"message\": \"Success\"

    },

    \"connections\": \[

        {

            \"connectionId\": \"0c3d2f662c1b4c71a02fb4b6f09a40f7\",

            \"connectionType\": \"AmazonS3\",

            \"body\": {

                \"name\": \"test_credentials_2\",

                \"bucketName\": \"samplebucket\"

            },

            \"isoCreationDate\": \"2020-09-08T19:18:11.000Z\",

            \"isoModificationDate\": \"2020-09-08T19:31:33.000Z\",

            \"createdBy\": \"John Smith\",

            \"modifiedBy\": \"John Smith\",

            \"status\": 1,

            \"integrationErrorCode\": null

        },

        {

\"connectionId\": \"d743a4e6c39d46c394f792f31d67dd95\",

\"connectionType\": \"GoogleBigQuery\",

\"body\": {

\"name\": \"test bq credentials\",

\"dataset\": \"dev_us_west\"

},

{

\"connectionId\": \"46d677fdb67a41529d0ddadc294515dd\",

\"connectionType\": \"AzureBlob\",

\"body\": {

\"name\": \"test azure credentials\",

\"storageAccountName\": \"my_storage_account\",

\"containerName\": \"my_container\"

},

\"creationDate\": \"2021-09-02T19:45:28.000Z\",

\"modificationDate\": \"2021-09-02T20:46:43.000Z\",

\"createdBy\": \"John Smith\",

\"modifiedBy\": \"John Smith\",

\"status\": 1,

\"integrationErrorCode\": null

}

        \],

    \"meta\": {

        \"paging\": {

            \"currentPageSize\": 3,

            \"totalSize\": 3,

            \"offset\": 0

        },

        \"schema\":
\"https://api.anaplan.com/cloudworks/2/0/integrations/objects/connections?connectionType=\<connectionType\>\"

    }

}

**Note**: The status indicates if the connection is valid.  A value
of 1 indicates a valid connection.  A 0 indicates an invalid
connection.  If the connection is invalid, these are some of the
possible values listed for integrationErrorCode:

  -----------------------------------------------------------------------
  **Error**

  Error code: 1 - AMAZONS3_INVALID_CREDENTIALS

  Error code: 4 - AMAZONS3_INVALID_BUCKET

  Error code: 10 - AWS_ASSUME_ROLE_FAILED
  -----------------------------------------------------------------------

Edit a connection

integrations/connections/{connectionId}

Use this call to edit a connection in Anaplan CloudWorks.

Request

curl -X PUT
[']{dir="rtl"}https://api.cloudworks.anaplan.com/2/0/integrations/connections/{connectionId}[']{dir="rtl"}
\\

-H [']{dir="rtl"}Authorization: AnaplanAuthToken
{token_value}[']{dir="rtl"} \\

-H [']{dir="rtl"}Content-Type: application/json[']{dir="rtl"} \\

-d [']{dir="rtl"}{request body}\'

Request headers

+----------------------------+-----------------------------------------+
| **Header**                 | **Details**                             |
+----------------------------+-----------------------------------------+
| Authorization:             | -   Required                            |
| AnaplanAuthToken           |                                         |
| {anaplan_auth_token}       | -   Description: the Anaplan            |
|                            |     authentication token                |
+----------------------------+-----------------------------------------+
| Content-Type               | -   Required                            |
|                            |                                         |
|                            | -   Description: This indicates the     |
|                            |     preferred response                  |
|                            |     is application/json format.         |
+----------------------------+-----------------------------------------+

Request parameters

+------------------+---------------------------------------------------+
| **Parameter**    | **Details**                                       |
+------------------+---------------------------------------------------+
| {connectionId}   | -   Required                                      |
|                  |                                                   |
|                  | -   Type: String                                  |
|                  |                                                   |
|                  | -   Description: The connection ID                |
|                  |                                                   |
|                  | -   Example: 0c3d2f662c1b4c71a02fb4b6f09a40f7     |
+------------------+---------------------------------------------------+

Request body

AmazonS3

{

    \"name\": \"{name}\",      

    \"accessKeyId\": \"{access key ID}\",

    \"secretAccessKey\": \"{secret access key}\",

    \"bucketName\": \"{bucket name}\",

    \"roleArn\": \"{role ARN}\"

}

+-------------+--------------------------------------------------------+
| **JSON**    | **Details**                                            |
+-------------+--------------------------------------------------------+
| name        | -   Required                                           |
|             |                                                        |
|             | -   Type: String                                       |
|             |                                                        |
|             | -   Description: The name of the connection.  This     |
|             |     should be a unique name.                           |
|             |                                                        |
|             | -   Example: test_credentials_1                        |
+-------------+--------------------------------------------------------+
| accessKeyId | -   Required                                           |
|             |                                                        |
|             | -   Type: String                                       |
|             |                                                        |
|             | -   Description: The Amazon S3 Access Key ID           |
|             |                                                        |
|             | -   Example: ALMNW18ERR9QQ89SS00H                      |
+-------------+--------------------------------------------------------+
| secr        | -   Required                                           |
| etAccessKey |                                                        |
|             | -   Type: String                                       |
|             |                                                        |
|             | -   Description: The Amazon S3 Secret Access Key       |
|             |                                                        |
|             | -   Example: BKmrBGlcuiuRpx32lmpglReWLwuflEcPbp7nf3LP  |
+-------------+--------------------------------------------------------+
| bucketName  | -   Required                                           |
|             |                                                        |
|             | -   Type: String                                       |
|             |                                                        |
|             | -   Description: The Amazon S3 Bucket name             |
|             |                                                        |
|             | -   Example: samplebucket                              |
+-------------+--------------------------------------------------------+
| roleArn     | -   Optional                                           |
|             |                                                        |
|             | -   Type: String                                       |
|             |                                                        |
|             | -   Description: The Amazon S3 Role ARN                |
|             |                                                        |
|             | -                                                      |
|             |    Example: arn:aws:iam::123475742:role/sampleReadOnly |
+-------------+--------------------------------------------------------+

Azure Blob

{

\"name\": \"name\",

\"StorageAccountName\": \"{storate account name}\",

\"sasToken:: \"{SAS token}\",

\"containerName\": \"{container name}\"

}

+-------------+--------------------------------------------------------+
| **JSON**    | **Details**                                            |
+-------------+--------------------------------------------------------+
| name        | -   Required                                           |
|             |                                                        |
|             | -   Type: String                                       |
|             |                                                        |
|             | -   Description: The name of the connection.  This     |
|             |     should be a unique name.                           |
|             |                                                        |
|             | -   Example: test_credentials_1                        |
+-------------+--------------------------------------------------------+
| storage     | -   Required                                           |
| AccountName |                                                        |
|             | -   Type: String                                       |
|             |                                                        |
|             | -   Description: Azure Storage account name            |
|             |                                                        |
|             | -   Example: MyStorageAccount                          |
+-------------+--------------------------------------------------------+
| sasToken    | -   Required                                           |
|             |                                                        |
|             | -   Type: String                                       |
|             |                                                        |
|             | -   Description: Shared access token for the Azure     |
|             |     Storage container                                  |
|             |                                                        |
|             | -   Example: sp=racwdl&st=2021-10-07T09:11:            |
|             | 01Z&se=2021-10-07T10:11:01Z&spr=https&sv=2020-08-04&sr |
|             | =c&sig=04YRw4xdasduTlRkWbW27Qr6qu2eQPXmltduiLwgyz0E%3D |
+-------------+--------------------------------------------------------+
| co          | -   Required                                           |
| ntainerName |                                                        |
|             | -   Type: String                                       |
|             |                                                        |
|             | -   Description: The Azure Storage container name      |
|             |                                                        |
|             | -   Example: samplebucket                              |
+-------------+--------------------------------------------------------+

Response headers

Content-Type: application/json

Response 200 Body

{

    \"status\": {

        \"code\": 200,

        \"message\": \"Success\"

    }

}

Patch a connection

integrations/connections/{connectionId}

Use this call to patch a connection in Anaplan CloudWorks.  A patch
enables you to update an element of the connection (for example, the
name) without having to provide the entire request body as listed in
Update connection.

Request

curl -X PATCH
[']{dir="rtl"}https://api.cloudworks.anaplan.com/2/0/integrations/connections/{connectionId}[']{dir="rtl"}
\\

-H [']{dir="rtl"}Authorization: AnaplanAuthToken
{token_value}[']{dir="rtl"} \\

-H [']{dir="rtl"}Content-Type: application/json[']{dir="rtl"} \\

-d [']{dir="rtl"}{ \"{body field}\": \"{JSON}\" }\'

Request headers

+----------------------------+-----------------------------------------+
| **Header**                 | **Details**                             |
+----------------------------+-----------------------------------------+
| Authorization:             | -   Required                            |
| AnaplanAuthToken           |                                         |
| {anaplan_auth_token}       | -   Description: the Anaplan            |
|                            |     authentication token                |
+----------------------------+-----------------------------------------+
| Content-Type               | -   Required                            |
|                            |                                         |
|                            | -   Description: This indicates the     |
|                            |     preferred response                  |
|                            |     is application/json format.         |
+----------------------------+-----------------------------------------+

Request parameters

+------------------+---------------------------------------------------+
| **Parameter**    | **Details**                                       |
+------------------+---------------------------------------------------+
| {connectionId}   | -   Required                                      |
|                  |                                                   |
|                  | -   Type: String                                  |
|                  |                                                   |
|                  | -   Description: The connection ID                |
|                  |                                                   |
|                  | -   Example: 0c3d2f662c1b4c71a02fb4b6f09a40f7     |
+------------------+---------------------------------------------------+

Request body

For the request body, include the individual JSON detail to update (for
example, name).  You can provide the entire body, similar to Update
connection, if necessary. JSON elements for the request body are listed
as optional, but this call must contain at least one of the JSON body
fields for the call to be valid.

{

    \"name\": \"{name}\"

}

+-------------+--------------------------------------------------------+
| **JSON**    | **Details**                                            |
+-------------+--------------------------------------------------------+
| name        | -   Optional                                           |
|             |                                                        |
|             | -   Type: String                                       |
|             |                                                        |
|             | -   Description: The name of the connection.  This     |
|             |     should be a unique name.                           |
|             |                                                        |
|             | -   Example: test_credentials_1                        |
+-------------+--------------------------------------------------------+
| accessKeyId | -   Optional                                           |
|             |                                                        |
|             | -   Type: String                                       |
|             |                                                        |
|             | -   Description: The Amazon S3 Access Key ID           |
|             |                                                        |
|             | -   Example: ALMNW18ERR9QQ89SS00H                      |
+-------------+--------------------------------------------------------+
| secr        | -   Optional                                           |
| etAccessKey |                                                        |
|             | -   Type: String                                       |
|             |                                                        |
|             | -   Description: The Amazon S3 Secret Access Key       |
|             |                                                        |
|             | -   Example: BKmrBGlcuiuRpx32lmpglReWLwuflEcPbp7nf3LP  |
+-------------+--------------------------------------------------------+
| bucketName  | -   Optional                                           |
|             |                                                        |
|             | -   Type: String                                       |
|             |                                                        |
|             | -   Description: The Amazon S3 Bucket name             |
|             |                                                        |
|             | -   Example: samplebucket                              |
+-------------+--------------------------------------------------------+
| roleArn     | -   Optional                                           |
|             |                                                        |
|             | -   Type: String                                       |
|             |                                                        |
|             | -   Description: The Amazon S3 Role ARN                |
|             |                                                        |
|             | -                                                      |
|             |    Example: arn:aws:iam::123475742:role/sampleReadOnly |
+-------------+--------------------------------------------------------+
| storage     | -   Required                                           |
| AccountName |                                                        |
|             | -   Type: String                                       |
|             |                                                        |
|             | -   Description: Azure Storage account name            |
|             |                                                        |
|             | -   Example: MyStorageAccount                          |
+-------------+--------------------------------------------------------+
| sasToken    | -   Required                                           |
|             |                                                        |
|             | -   Type: String                                       |
|             |                                                        |
|             | -   Description: Shared access token for the Azure     |
|             |     Storage container                                  |
|             |                                                        |
|             | -   Example: sp=racwdl&st=2021-10-07T09:11:            |
|             | 01Z&se=2021-10-07T10:11:01Z&spr=https&sv=2020-08-04&sr |
|             | =c&sig=04YRw4xdasduTlRkWbW27Qr6qu2eQPXmltduiLwgyz0E%3D |
+-------------+--------------------------------------------------------+
| co          | -   Required                                           |
| ntainerName |                                                        |
|             | -   Type: String                                       |
|             |                                                        |
|             | -   Description: The Azure Storage container name      |
|             |                                                        |
|             | -   Example: samplebucket                              |
+-------------+--------------------------------------------------------+

Response headers

Content-Type: application/json

Response 200 Body

{

    \"status\": {

        \"code\": 200,

        \"message\": \"Success\"

    }

}

Delete a connection

/connections/{connectionId}

Use this to [[delete a
connection]{.underline}](https://help.anaplan.com/anapedia/Content/Data_Integrations/Integrations_framework/Delete-a-connection.htm) to
CloudWorks.

Request

curl -X DELETE
https://api.cloudworks.anaplan.com/2/0/integrations/connections/{connectionId}
\\

-H [']{dir="rtl"}Authorization: AnaplanAuthToken
{token_value}[']{dir="rtl"} \\

-H [']{dir="rtl"}Content-Type: application/json[']{dir="rtl"}

Request headers

+----------------------------+-----------------------------------------+
| **Header**                 | **Details**                             |
+----------------------------+-----------------------------------------+
| Authorization:             | -   Required                            |
| AnaplanAuthToken           |                                         |
| {anaplan_auth_token}       | -   Description: the Anaplan            |
|                            |     authentication token                |
+----------------------------+-----------------------------------------+
| Content-Type               | -   Required                            |
|                            |                                         |
|                            | -   Description: This indicates the     |
|                            |     preferred response                  |
|                            |     is application/json format.         |
+----------------------------+-----------------------------------------+

Request parameters

+------------------+---------------------------------------------------+
| **Parameter**    | **Details**                                       |
+------------------+---------------------------------------------------+
| {connectionId}   | -   Required                                      |
|                  |                                                   |
|                  | -   Type: String                                  |
|                  |                                                   |
|                  | -   Description: The connection ID                |
|                  |                                                   |
|                  | -   Example: 0c3d2f662c1b4c71a02fb4b6f09a40f7     |
+------------------+---------------------------------------------------+

Response headers

Content-Type: application/json

Response 200 Body

{

    \"status\": {

        \"code\": 200,

        \"message\": \"Success\"

    }

}

Integrations

Create a new integration

/integrations

Use this call to create a new integration for Anaplan CloudWorks.

Request

curl -X POST
[']{dir="rtl"}https://api.cloudworks.anaplan.com/2/0/integrations[']{dir="rtl"}
\\

-H [']{dir="rtl"}Authorization: AnaplanAuthToken
{anaplan_auth_token}[']{dir="rtl"} \\

-H [']{dir="rtl"}Content-Type: application/json[']{dir="rtl"}

Request headers

+----------------------------+-----------------------------------------+
| **Header**                 | **Details**                             |
+----------------------------+-----------------------------------------+
| Authorization:             | -   Required                            |
| AnaplanAuthToken           |                                         |
| {anaplan_auth_token}       | -   Description: the Anaplan            |
|                            |     authentication token                |
+----------------------------+-----------------------------------------+
| Content-Type               | -   Required                            |
|                            |                                         |
|                            | -   Description: This indicates the     |
|                            |     preferred response                  |
|                            |     is application/json format.         |
+----------------------------+-----------------------------------------+

Request parameters

None

Request body (import)

Note: For restricted integration users, the workspace ID of the
integration needs match with the workspace ID of the associated
connection.

AmazonS3

{

  \"name\": \"sample import integration\",

  \"version\":\"2.0\",

  \"workspaceId\": \"8a80db657068fjef01718955f3b3390b\",

  \"modelId\": \"E559BFF3B1GD4RKE874P745BEL259711\",

  \"nuxVisible\": false,

  \"jobs\": \[

    {

      \"type\": \"AmazonS3ToAnaplan\",

      \"sources\": \[

        {

          \"type\": \"AmazonS3\",

          \"connectionId\": \"0c3d2f662c1b4c71a02fb4b6f09a40f7\",

          \"file\": \"sample_file.csv\"

        }

      \],

      \"targets\": \[

        {

          \"type\": \"Anaplan\",

          \"actionId\": \"112000000011\",

          \"fileId\": \"113000000011\"

        }

      \]

    }

  \]

}

GoogleBigQuery

{

\"name\": \"test-bq-public-import\",

\"version\": \"2.0\",

\"modelId\": \"ED1CF72660164FD5A83B16A17C8CAE94\",

\"workspaceId\": \"2c9ba1b67b59fdee017ba23f6b7d2701\",

\"nuxVisible\": false,

\"jobs\": \[

{

\"type\": \"GoogleBigQueryToAnaplan\",

\"sources\":\[

{

\"type\":\"GoogleBigQuery\",

\"connectionId\":\"1g5y2f662c1b4c71a02fb496f09a40f7\",

\"table\":\"SKU_import\"

}

\],

\"targets\":\[

{

\"type\":\"Anaplan\",

\"actionId\":\"112000000117\",

\"fileId\":\"113000000098\"

}

\]

}

\]

}

}

AzureBlob

{

  \"name\": \"sample import integration\",

  \"version\": \"2.0\",

  \"workspaceId\": \"8a80db657068fjef01718955f3b3390b\",

  \"modelId\": \"E559BFF3B1GD4RKE874P745BEL259711\",

  \"nuxVisible\": false,

  \"jobs\": \[

    {

      \"type\": \"AzureBlobToAnaplan\",

      \"sources\": \[

        {

         \"type\": \"AzureBlob\",

          \"connectionId\": \"0c3d2f662c1b4c71a02fb4b6f09a40f7\",

          \"file\": \"sample_file.csv\"

        }

      \],

      \"targets\": \[

        {

          \"type\": \"Anaplan\",

          \"actionId\": \"112000000011\",

          \"fileId\": \"113000000011\"

        }

      \]

    }

  \]

}

Request body (export)

AmazonS3

{

\"name\": \"sample export integration\",

\"version\": \"2.0\",

\"workspaceId\": \"8a80db657068fjef01718955f3b3390b\",

  \"modelId\": \"E559BFF3B1GD4RKE874P745BEL259711\",

  \"nuxVisible\": false,

  \"jobs\": \[

    {

      \"type\": \"AnaplanToAmazonS3\",

      \"sources\": \[

        {

          \"type\": \"Anaplan\",

          \"actionId\": \"116000000011\"

        }

      \],

      \"targets\": \[

        {

          \"type\": \"AmazonS3\",

          \"connectionId\": \"0c3d2f662c1b4c71a02fb4b6f09a40f7\",

          \"file\": \"exports/\",

          \"overwrite\": true

        }

      \]

    }

  \]

}

Google Big Query

{

\"name\": \"bq export\",

\"version\": \"2.0\",

\"modelId\": \"ED1CF72660164FD5A83B16A17C8CAE94\",

\"workspaceId\": \"2c9ba1b67b59fdee017ba23f6b7d2701\",

\"nuxVisible\": false,

\"jobs\": \[

{

\"type\": \"AnaplanToGoogleBigQuery\",

\"sources\": \[

{

\"type\": \"Anaplan\",

\"actionId\": \"116000000053\"

}

\],

\"targets\": \[

{

\"type\": \"GoogleBigQuery\",

\"table\": \"SKU_data\",

\"connectionId\": \"0c3d2f662c1b4c71a02fb4b6f09a40f7\",

\"overwrite\": true

}

\],

\"mapping\":\[

{\"sourceName\": \"Size\", \"targetName\": \"Size\"},

{\"sourceName\": \"SKU_Item\", \"targetName\": \"SKU Item\"}

\]

}

\]

}

AzureBlob

{

  \"name\": \"sample export integration\",

  \"version\": \"2.0\",

  \"workspaceId\": \"8a80db657068fjef01718955f3b3390b\",

  \"modelId\": \"E559BFF3B1GD4RKE874P745BEL259711\",

  \"nuxVisible\": false,

  \"jobs\": \[

    {

      \"type\": \"AnaplanToAzureBlob\",

      \"sources\": \[

        {

          \"type\": \"Anaplan\",

          \"actionId\": \"116000000011\"

        }

      \],

      \"targets\": \[

        {

          \"type\": ["]{dir="rtl"}AzureBlob\",

          \"connectionId\": \"0c3d2f662c1b4c71a02fb4b6f09a40f7\",

          \"file\": \"exports/\",

          \"overwrite\": true

        }

      \]

    }

  \]

}

Request with version 1.0(old version)

curl -X POST
[']{dir="rtl"}https://api.cloudworks.anaplan.com/1/0/integrations[']{dir="rtl"}
\\

-H [']{dir="rtl"}Authorization: AnaplanAuthToken
{anaplan_auth_token}[']{dir="rtl"} \\

-H [']{dir="rtl"}Content-Type: application/json[']{dir="rtl"}

Request headers

+----------------------------+-----------------------------------------+
| **Header**                 | **Details**                             |
+----------------------------+-----------------------------------------+
| Authorization:             | -   Required                            |
| AnaplanAuthToken           |                                         |
| {anaplan_auth_token}       | -   Description: the Anaplan            |
|                            |     authentication token                |
+----------------------------+-----------------------------------------+
| Content-Type               | -   Required                            |
|                            |                                         |
|                            | -   Description: This indicates the     |
|                            |     preferred response                  |
|                            |     is application/json format.         |
+----------------------------+-----------------------------------------+

Request parameters

None

Request body (import)

{

  \"name\": \"sample import integration\",

  \"nuxVisible\": false,

  \"jobs\": \[

    {

      \"type\": \"AmazonS3ToAnaplan\",

      \"sources\": \[

        {

          \"type\": \"AmazonS3\",

          \"connectionId\": \"0c3d2f662c1b4c71a02fb4b6f09a40f7\",

          \"file\": \"sample_file.csv\"

        }

      \],

      \"targets\": \[

        {

          \"type\": \"Anaplan\",

          \"actionId\": \"112000000011\",

          \"fileId\": \"113000000011\",

          \"workspaceId\": \"8a80db657068fjef01718955f3b3390b\",

          \"modelId\": \"E559BFF3B1GD4RKE874P745BEL259711\"

        }

      \]

    }

  \]

}

Request body (export)

{

  \"name\": ["]{dir="rtl"}sample export integration\",

  \"nuxVisible\": false,

  \"jobs\": \[

    {

      \"type\": ["]{dir="rtl"}AnaplanToAmazonS3\",

      \"sources\": \[

        {

          \"type\": ["]{dir="rtl"}Anaplan\",

          \"actionId\": ["]{dir="rtl"}116000000011\",

          \"workspaceId\":
["]{dir="rtl"}8a80db657068fjef01718955f3b3390b\",

          \"modelId\": ["]{dir="rtl"}E559BFF3B1GD4RKE874P745BEL259711\"

        }

      \],

      \"targets\": \[

        {

          \"type\": ["]{dir="rtl"}AmazonS3\",

          \"connectionId\":
["]{dir="rtl"}0c3d2f662c1b4c71a02fb4b6f09a40f7\",

          \"file\": \"exports/\",

          \"overwrite\": true

        }

      \]

    }

  \]

}

+------+---------------------------------------------------------------+
| **JS | **Details**                                                   |
| ON** |                                                               |
+------+---------------------------------------------------------------+
| jobs | -   Required                                                  |
|      |                                                               |
|      | -   Array                                                     |
|      |                                                               |
|      | -   Description: Consists of sources and targets. Currently,  |
|      |     this call only supports one job, that includes            |
|      |     one source and one target.                                |
+------+---------------------------------------------------------------+
| type | -   Required                                                  |
|      |                                                               |
|      | -   String as part of the jobs list                           |
|      |                                                               |
|      | -   Description: Type of integration                          |
|      |                                                               |
|      | -   Examples: Ama                                             |
|      | zonS3ToAnaplan, AnaplanToAmazonS3, AnaplanToGoogleBigQuery,Go |
|      | ogleBigQueryToAnaplan, AzureBlobToAnaplan, AnaplanToAzureBlob |
+------+---------------------------------------------------------------+
| sou  | -   Required                                                  |
| rces |                                                               |
|      | -   part of the jobs list                                     |
|      |                                                               |
|      | -   Description: The location from where you  transfer the    |
|      |     file.                                                     |
|      |                                                               |
|      | Example: \[ { ["]{dir="rtl"}type": ["]{dir="rtl"}Anaplan",    |
|      | ["]{dir="rtl"}actionId": ["]{dir="rtl"}116000000011",         |
|      | ["]{dir="rtl"}workspaceId":                                   |
|      | ["]{dir="rtl"}8a80db657068fjef01718955f3b3390b",              |
|      | ["]{dir="rtl"}modelId":                                       |
|      | ["]{dir="rtl"}E559BFF3B1GD4RKE874P745BEL259711" } \]          |
+------+---------------------------------------------------------------+
| tar  | -   Required                                                  |
| gets |                                                               |
|      | -   part of the jobs array                                    |
|      |                                                               |
|      | -   Description: The location to where the file is            |
|      |     transferred.                                              |
|      |                                                               |
|      | Example: { ["]{dir="rtl"}type": ["]{dir="rtl"}AmazonS3\",     |
|      | ["]{dir="rtl"}connectionId":                                  |
|      | ["]{dir="rtl"}0c3d2f662c1b4c71a02fb4b6f09a40f7\",             |
|      | ["]{dir="rtl"}file": ["]{dir="rtl"}exports/["]{dir="rtl"},    |
|      | ["]{dir="rtl"}overwrite": true }                              |
+------+---------------------------------------------------------------+
| conn | -   Required                                                  |
| ecti |                                                               |
| onId | -   String                                                    |
|      |                                                               |
|      | -   Description: The ID created while creating a connection.  |
|      |                                                               |
|      | -   Example: 0c3d2f662c1b4c71a02fb4b6f09a40f7                 |
+------+---------------------------------------------------------------+
| type | -   Required                                                  |
|      |                                                               |
|      | -   String as part of the sources or targets arrays           |
|      |                                                               |
|      | -   Description: The connection type                          |
|      |                                                               |
|      | -   Examples: AmazonS3, Anaplan, GoogleBigQuery, AzureBlob    |
+------+---------------------------------------------------------------+
| file | -   Required                                                  |
|      |                                                               |
|      | -   String                                                    |
|      |                                                               |
|      | -   Description: For imports, this is the file imported into  |
|      |     Anaplan. For exports, this is the folder file path to     |
|      |     export data from Anaplan.                                 |
|      |                                                               |
|      | -   Example: sample_file.csv                                  |
+------+---------------------------------------------------------------+
| acti | -   Required                                                  |
| onId |                                                               |
|      | -   String                                                    |
|      |                                                               |
|      | -   Description: The Import or Export action ID of Anaplan    |
|      |     model, depending on the type of integration. If the       |
|      |     action is an import, this value is the import ID. If the  |
|      |     action is an export, this value is the export ID.         |
|      |                                                               |
|      | -   Example: 112000000011                                     |
+------+---------------------------------------------------------------+
| fi   | -   Required if the integration is an import                  |
| leId |                                                               |
|      | -   String                                                    |
|      |                                                               |
|      | -   Description: The file ID of Anaplan model.                |
|      |                                                               |
|      | -   Example: 113000000011                                     |
+------+---------------------------------------------------------------+
| wor  | -   Required if the integration is an import                  |
| kspa |                                                               |
| ceId | -   String                                                    |
|      |                                                               |
|      | -   Description: The Anaplan workspace ID.                    |
|      |                                                               |
|      | -   Example: 8a80db657068fjef01718955f3b3390b                 |
+------+---------------------------------------------------------------+
| mod  | -   Required if the integration is an import                  |
| elId |                                                               |
|      | -   String                                                    |
|      |                                                               |
|      | -   Description: The Anaplan model ID.                        |
|      |                                                               |
|      | -   Example: E559BFF3B1GD4RKE874P745BEL259711                 |
+------+---------------------------------------------------------------+
| o    | -   Optional                                                  |
| verw |                                                               |
| rite | -   Boolean                                                   |
|      |                                                               |
|      | -   Description: This setting determines if the integration   |
|      |     should overwrite the destination file.  For example: If   |
|      |     set to false (the default value), or not set, the API     |
|      |     creates a new file in S3, if the connectionType is        |
|      |     AmazonS3.  If set to true, the API overrides the previous |
|      |     file.                                                     |
|      |                                                               |
|      | -   Example: false                                            |
+------+---------------------------------------------------------------+
| map  | -   Required in Google Big Query Export integration           |
| ping |                                                               |
|      | -   String                                                    |
|      |                                                               |
|      | -   Description: This mapping between the columns of Google   |
|      |     Big Query table and Anaplan modules/list.                 |
+------+---------------------------------------------------------------+
| nu   | -   Optional                                                  |
| xVis |                                                               |
| ible | -   Boolean                                                   |
|      |                                                               |
|      | -   Description: Optional field. When this field is set, this |
|      |     integration is visible in UX action cards. The default    |
|      |     value is false.                                           |
+------+---------------------------------------------------------------+
| name | -   Required                                                  |
|      |                                                               |
|      | -   Type: String                                              |
|      |                                                               |
|      | -   Description: The name of the integration. This should be  |
|      |     a unique name.                                            |
|      |                                                               |
|      | -   Example: test_integration_1                               |
+------+---------------------------------------------------------------+

Response headers

Content-Type: application/json

Response 200 Body

{

    \"status\": {

        \"code\": 200,

        \"message\": \"Success\"

    },

    \"integration\": {

        \"integrationId\": \"fe40dc5793084f7dbb685cffe6a5ad2a\"

    }

}

Run Integration

Run an integration

/integrations/{integrationId}/run

Use this call to run an integration.

Request

curl -X POST
[']{dir="rtl"}https://api.cloudworks.anaplan.com/2/0/integrations/{integrationId}/run[']{dir="rtl"}
\\

-H [']{dir="rtl"}Authorization: AnaplanAuthToken
{token_value}[']{dir="rtl"} \\

-H [']{dir="rtl"}Content-Type: application/json[']{dir="rtl"}

Request headers

+--------------------------------+-------------------------------------+
| **Header**                     | **Details**                         |
+--------------------------------+-------------------------------------+
| Authorization:                 | -   Required                        |
| AnaplanAuthToken               |                                     |
| {anaplan_auth_token}           | -   Description: the Anaplan        |
|                                |     authentication token            |
+--------------------------------+-------------------------------------+
| Content-Type                   | -   Required                        |
|                                |                                     |
|                                | -   Description: This call uses a   |
|                                |     content type of                 |
|                                |     application/json.               |
+--------------------------------+-------------------------------------+

Request parameters

+-------------------+---------------------------------------------------+
| **Parameter**     | **Details**                                       |
+-------------------+---------------------------------------------------+
| {integrationId}   | -   Required                                      |
|                   |                                                   |
|                   | -   Type: String                                  |
|                   |                                                   |
|                   | -   Description: the integration ID               |
|                   |                                                   |
|                   | -   Example: fe40dc5793084f7dbb685cffe6a5ad2a     |
+-------------------+---------------------------------------------------+

Request body

None

Response headers

Content-Type: application/json

Response 200 Body

{

\"status\": {

        \"code\": 200,

        \"message\": \"Success\"

    },

    \"run\": {

        \"id\": \"hy40d89893084f0dkb985cmme9i5io2a\"

    }

   

}

Cancel running integrations

Cancel running integration

/integrations/{integrationId}/cancel

Use this call to cancel an ongoing integration job.

Request

curl -X POST
[']{dir="rtl"}https://api.cloudworks.anaplan.com/2/0/integrations/{integrationId}/cancel[']{dir="rtl"}
\\

-H [']{dir="rtl"}Authorization: AnaplanAuthToken
{token_value}[']{dir="rtl"} \\

-H [']{dir="rtl"}Content-Type: application/json[']{dir="rtl"}

Request headers

+--------------------------------+-------------------------------------+
| **Header**                     | **Details**                         |
+--------------------------------+-------------------------------------+
| Authorization:                 | -   Required                        |
| AnaplanAuthToken               |                                     |
| {anaplan_auth_token}           | -   Description: the Anaplan        |
|                                |     authentication token            |
+--------------------------------+-------------------------------------+
| Content-Type                   | -   Required                        |
|                                |                                     |
|                                | -   Description: This call uses a   |
|                                |     content type of                 |
|                                |     application/json.               |
+--------------------------------+-------------------------------------+

Request parameters

+-------------------+---------------------------------------------------+
| **Parameter**     | **Details**                                       |
+-------------------+---------------------------------------------------+
| {integrationId}   | -   Required                                      |
|                   |                                                   |
|                   | -   Type: String                                  |
|                   |                                                   |
|                   | -   Description: the integration ID               |
|                   |                                                   |
|                   | -   Example: 56c122362f9d4a69bdca922252575065     |
+-------------------+---------------------------------------------------+

Request body

None

Response headers

Content-Type: application/json

Response 200 Body

{

\"success\": true,

\"message\": {

\"integration_id\": \"56c122362f9d4a69bdca922252575065\",

\"state\": \"cancelled\"

}

}

Get Integrations

Get all integrations

/integrations

Use this call to retrieve all your integrations.

Request

curl -X GET
[']{dir="rtl"}https://api.cloudworks.anaplan.com/2/0/integrations[']{dir="rtl"}
\\

-H [']{dir="rtl"}Authorization: AnaplanAuthToken
{anaplan_auth_token}[']{dir="rtl"} \\

-H [']{dir="rtl"}Content-Type: application/json[']{dir="rtl"}

Request headers

+----------------------------+-----------------------------------------+
| **Header**                 | **Details**                             |
+----------------------------+-----------------------------------------+
| Authorization:             | -   Required                            |
| AnaplanAuthToken           |                                         |
| {anaplan_auth_token}       | -   Description: the Anaplan            |
|                            |     authentication token                |
+----------------------------+-----------------------------------------+
| Content-Type               | -   Required                            |
|                            |                                         |
|                            | -   Description: This indicates the     |
|                            |     preferred response                  |
|                            |     is application/json format.         |
+----------------------------+-----------------------------------------+

Request parameters

+-------------+--------------------------------------------------------+
| **          | **Details**                                            |
| Parameter** |                                                        |
+-------------+--------------------------------------------------------+
| {offset}    | -   Optional                                           |
|             |                                                        |
|             | -   Type: Number                                       |
|             |                                                        |
|             | -   Description: The number of items to skip before    |
|             |     starting to collect the result set. The first      |
|             |     element starts at 0.                               |
|             |                                                        |
|             | -   Example: 0                                         |
+-------------+--------------------------------------------------------+
| {limit}     | -   Optional                                           |
|             |                                                        |
|             | -   Type: Number                                       |
|             |                                                        |
|             | -   Description: The number of elements to return.     |
|             |                                                        |
|             | -   Example: 10                                        |
+-------------+--------------------------------------------------------+
| {myIn       | -   Optional                                           |
| tegrations} |                                                        |
|             | -   Type: Number                                       |
|             |                                                        |
|             | -   Description: Returns the list of current users\'s  |
|             |     integrations if its value is 1.                    |
|             |                                                        |
|             | -   Example: 1                                         |
+-------------+--------------------------------------------------------+

**Note**: if this call does not provide {offset} or {limit}, it
retrieves 25 integrations.

Request body

None

Response headers

Content-Type: application/json

Response 200 Body

{

\"status\": {

\"code\": 200,

\"message\": \"Success\"

},

\"integrations\": \[

{

\"integrationId\": \"fe40dc5793084f7dbb685cffe6a5ad2aa\",

\"name\": \"sample import integration\",

\"createdBy\": \"John Smith\",

\"creationDate\": \"2020-09-29T01:31:16.000Z\",

\"modificationDate\": \"2020-09-29T01:31:26.000Z\",

\"modifiedBy\": \"John Smith\",

\"latestRun\": {

\"triggeredBy\": \"John Smith\",

\"startDate\": \"2020-09-28T23:09:31.000Z\",

\"endDate\": \"2020-09-28T23:13:07.000Z\",

\"success\": true,

\"message\": \"Success\",

\"executionErrorCode\": null

},

\"notificationId\": \"a72d86ac0a9c454aa8baf67c1db67486\",

\"nuxVisible\": false

},

{

\"integrationId\": \"4caad0c1b91545d983cb6a2bb62d755e\",

\"name\": \"sample process integration\",

\"processId\": \"118000000001\",

\"createdBy\": \"John Smith\",

\"creationDate\": \"2021-01-29T01:31:16.000Z\",

\"modificationDate\": \"2021-01-29T01:31:26.000Z\",

\"modifiedBy\": \"John Smith\",

\"latestRun\": {

\"triggeredBy\": \"John Smith\",

\"startDate\": \"2021-01-29T23:09:31.000Z\",

\"endDate\": \"2021-01-29T23:13:07.000Z\",

\"success\": true,

\"message\": \"Success\",

\"executionErrorCode\": null

},

\"notificationId\": \"37945d3f7543463a859949e690dc4b60\",

\"nuxVisible\": false

}

\],

\"meta\": {

\"paging\": {

\"currentPageSize\": 2,

\"totalSize\": 2,

\"offset\": 0

},

\"schema\":
\"https://api.anaplan.com/cloudworks/2/0/integrations/objects/integrations\"

}

Get integrations by integration ID

/integrations/{integrationId}

Use this call to get integration details for a specific integration.

Request

curl -X GET
[']{dir="rtl"}https://api.cloudworks.anaplan.com/2/0/integrations/{integrationId}[']{dir="rtl"}
\\

-H [']{dir="rtl"}Authorization: AnaplanAuthToken
{anaplan_auth_token}[']{dir="rtl"} \\

-H [']{dir="rtl"}Content-Type: application/json[']{dir="rtl"} \\

Request headers

+--------------------------------+-------------------------------------+
| **Header**                     | **Details**                         |
+--------------------------------+-------------------------------------+
| Authorization:                 | -   Required                        |
| AnaplanAuthToken               |                                     |
| {anaplan_auth_token}           | -   Description: the Anaplan        |
|                                |     authentication token            |
+--------------------------------+-------------------------------------+
| Content-Type                   | -   Required                        |
|                                |                                     |
|                                | -   Description: This call uses a   |
|                                |     content type of                 |
|                                |     application/json.               |
+--------------------------------+-------------------------------------+

Request parameters

+-------------------+---------------------------------------------------+
| **Parameter**     | **Details**                                       |
+-------------------+---------------------------------------------------+
| {integrationId}   | -   Required                                      |
|                   |                                                   |
|                   | -   Type: String                                  |
|                   |                                                   |
|                   | -   Description: the Integration ID.              |
|                   |                                                   |
|                   | -   Example: fe40dc5793084f7dbb685cffe6a5ad2a     |
+-------------------+---------------------------------------------------+

Request body

None

Response headers

Content-Type: application/json

Response 200 Body

{

\"status\": {

        \"code\": 200,

        \"message\": \"Success\"

    },

    \"integration\":

        {

            \"jobs\": \[

                {

                    \"sources\": \[

                        {

                            \"connectionId\":
\"0c3d2f662c1b4c71a02fb4b6f09a40f7\",

                            \"type\": \"AmazonS3\",

                            \"file\": \"sample_file.csv\"

                        }

                    \],

                    \"targets\": \[

                        {

                            \"type\": \"Anaplan\",

                            \"actionId\": \"112000000011\",

                            \"fileId\": \"113000000011\"

                        }

                    \],

                    \"type\": \"AmazonS3ToAnaplan\"                  

                }

            \],

            \"name\": \"sample import integration\",

            \"integrationId\":
\"fe40dc57-9308-4f7d-bb68-5cffe6a5ad2aa\",

            \"workspaceId\": \"8a80db657068fjef01718955f3b3390b\",

            \"modelId\": \"E559BFF3B1GD4RKE874P745BEL259711\",

            \"createdBy\": \"John Smith\",

            \"creationDate\": \"2020-09-28T23:08:24.000Z\",

            \"modificationDate\": \"2020-09-28T23:08:26.000Z\",

            \"modifiedBy\": \"None\",

            \"latestRun\": {

                \"triggeredBy\": \"John Smith\",

                \"startDate\": \"2020-09-28T23:09:31.000Z\",

                \"endDate\": \"2020-09-28T23:13:07.000Z\",

                \"success\": true,

                \"message\": \"Success\",

                \"executionErrorCode\": null

            },

            \"notificationId\": \"a72d86ac0a9c454aa8baf67c1db67486\",

            \"nuxVisible\": false

        },

    \"meta\": {

        \"schema\":
\"https://api.cloudworks.anaplan.com//0/integrations/objects/integration\"

    }

Get integrations by Model ID

/integrations/anaplanModels/{modelId}

Use this call to get all integrations from an Anaplan model.

Request

curl -X GET
[']{dir="rtl"}https://api.cloudworks.anaplan.com/2/0/integrations/anaplanModels/{modelId}[']{dir="rtl"}

-H [']{dir="rtl"}Authorization: AnaplanAuthToken
{anaplan_auth_token}[']{dir="rtl"} \\

-H [']{dir="rtl"}Content-Type: application/json[']{dir="rtl"}

Request headers

+------------------------------+---------------------------------------+
| **Header**                   | **Details**                           |
+------------------------------+---------------------------------------+
| Authorization:               | -   Required                          |
| AnaplanAuthToken             |                                       |
| {token_value}                | -   Description: the Anaplan          |
|                              |     authentication token              |
+------------------------------+---------------------------------------+
| Content-Type                 | -   Required                          |
|                              |                                       |
|                              | -   Description: This call uses a     |
|                              |     content type of application/json. |
+------------------------------+---------------------------------------+

Request parameters

+--------------+-------------------------------------------------------+
| *            | **Details**                                           |
| *Parameter** |                                                       |
+--------------+-------------------------------------------------------+
| {modelId}    | -   Required                                          |
|              |                                                       |
|              | -   Type: String                                      |
|              |                                                       |
|              | -   Description: Anaplan model ID.                    |
|              |                                                       |
|              | -   Example: E559BFF3B1GD4RKE874P745BEL259711         |
+--------------+-------------------------------------------------------+

Request body

None

Response headers

Content-Type: application/json

Response 200 Body

{

\"status\": {

    \"code\": 200,

    \"message\": \"Success\"

},

\"integrations\": \[

    {

        \"jobs\": \[

            {

                \"sources\": \[

                    {

                        \"connectionId\":
\"0c3d2f662c1b4c71a02fb4b6f09a40f7\",

                        \"type\": \"AmazonS3\",

                        \"file\": \"sample_file.csv\"

                    }

                \],

                \"targets\": \[

                    {

                        \"type\": \"Anaplan\",

                        \"actionId\": \"112000000011\",

                        \"fileId\": \"113000000011\"

                    }

                \],

                \"type\": \"AmazonS3ToAnaplan\"

            }

        \],

        \"name\": \"sample import integration\",

        \"integrationId\": \"fe40dc5793084f7dbb685cffe6a5ad2aa\",

        \"workspaceId\": \"8a80db657068fjef01718955f3b3390b\",

        \"modelId\": \"E559BFF3B1GD4RKE874P745BEL259711\",

        \"createdBy\": \"John Smith\",

        \"creationDate\": \"2020-09-26T04:21:51.000Z\",

        \"modificationDate\": \"2020-09-26T04:21:51.000Z\",

        \"modifiedBy\": \"None\",

        \"latestRun\": {

            \"triggeredBy\": \"John Smith\",

            \"startDate\": \"2020-09-02T06:39:08.000Z\",

            \"endDate\": \"2020-09-02T06:40:18.000Z\",

            \"success\": true,

            \"message\": \"Success\",

            \"executionErrorCode\": null},

        \"schedule\": {

            \"name\": \"test-schedule\",

            \"time\": \"22:00\",

            \"type\": \"monthly_specific_day\",

            \"endDate\": \"2020-12-01\",

            \"timezone\": \"Europe/Paris\",

            \"startDate\": \"2020-09-03\",

            \"dayOfMonth\": 11,

            \"status\": \"Active\"

        },

        \"notificationId\": \"a72d86ac0a9c454aa8baf67c1db67486\",

        \"nuxVisible\": false

    \],

\"meta\": {

    \"paging\": {

        \"currentPageSize\": 1,

        \"totalSize\": 1,

        \"offset\": 0

    },

    \"schema\":
\"https://api.cloudworks.anaplan.com/2/0/integrations/objects/model\"

  }

}

Edit an integration

/integrations/{integrationId}

Use this call to edit an integration, import, or export for CloudWorks.

Request

 curl -X PUT
[']{dir="rtl"}https://api.cloudworks.anaplan.com/2/0/integrations/{integrationId}[']{dir="rtl"}
\\

-H [']{dir="rtl"}Authorization: AnaplanAuthToken
{anaplan_auth_token}[']{dir="rtl"} \\

-H [']{dir="rtl"}Content-Type: application/json[']{dir="rtl"}

Request headers

+----------------------------+-----------------------------------------+
| **Header**                 | **Details**                             |
+----------------------------+-----------------------------------------+
| Authorization:             | -   Required                            |
| AnaplanAuthToken           |                                         |
| {anaplan_auth_token}       | -   Description: the Anaplan            |
|                            |     authentication token                |
+----------------------------+-----------------------------------------+
| Content-Type               | -   Required                            |
|                            |                                         |
|                            | -   Description: This indicates the     |
|                            |     preferred response                  |
|                            |     is application/json format.         |
+----------------------------+-----------------------------------------+

Request parameters

+-------------------+---------------------------------------------------+
| **Parameter**     | **Details**                                       |
+-------------------+---------------------------------------------------+
| {integrationId}   | -   Required                                      |
|                   |                                                   |
|                   | -   Type: String                                  |
|                   |                                                   |
|                   | -   Description: The integration ID               |
|                   |                                                   |
|                   | -   Example: fe40dc5793084f7dbb685cffe6a5ad2a     |
+-------------------+---------------------------------------------------+

Request body (import)

Note: For restricted integration users, the workspace ID of the
integration needs match with the workspace ID of the associated
connection.

{

\"name\": \"sample import integration updated\",

\"workspaceId\": \"8a80db657068fjef01718955f3b3390b\",

\"modelId\": \"E559BFF3B1GD4RKE874P745BEL259711\",

\"version\":\"2.0\",

\"nuxVisible\": false,

\"jobs\": \[

{

\"type\": \"AmazonS3ToAnaplan\",

\"sources\": \[

{

\"type\": \"AmazonS3\",

\"connectionId\": \"0c3d2f662c1b4c71a02fb4b6f09a40f7\",

\"file\": \"sample_file.csv\"

}

\],

\"targets\": \[

{

\"type\": \"Anaplan\",

\"actionId\": \"112000000011\",

\"fileId\": \"113000000011\"

}

\]

}

\]

}

+---------+------------------------------------------------------------+
| *       | **Details**                                                |
| *JSON** |                                                            |
+---------+------------------------------------------------------------+
| jobs    | -   Required                                               |
|         |                                                            |
|         | -   Array                                                  |
|         |                                                            |
|         | -   Description: Consists of sources and targets.          |
|         |     Currently, this call only supports one job, that       |
|         |     includes one source and one target.                    |
+---------+------------------------------------------------------------+
| type    | -   Required                                               |
|         |                                                            |
|         | -   String as part of the jobs list                        |
|         |                                                            |
|         | -   Description: Type of integration                       |
|         |                                                            |
|         | -   Examples: AmazonS3ToAnaplan,                           |
|         |  AnaplanToAmazonS3, AzureBlobToAnaplan, AnaplanToAzureBlob |
+---------+------------------------------------------------------------+
| sources | -   Required                                               |
|         |                                                            |
|         | -   part of the jobs list                                  |
|         |                                                            |
|         | -   Description: The location from where you  transfer the |
|         |     file.                                                  |
+---------+------------------------------------------------------------+
| targets | -   Required                                               |
|         |                                                            |
|         | -   part of the jobs array                                 |
|         |                                                            |
|         | -   Description: The location to where the file is         |
|         |     transferred.                                           |
+---------+------------------------------------------------------------+
| conne   | -   Required                                               |
| ctionId |                                                            |
|         | -   String                                                 |
|         |                                                            |
|         | -   Description: The ID created while creating a           |
|         |     connection.                                            |
|         |                                                            |
|         | -   Example: 0c3d2f66-2c1b-4c71-a02f-b4b6f09a40f7          |
+---------+------------------------------------------------------------+
| type    | -   Required                                               |
|         |                                                            |
|         | -   String as part of the sources or targets arrays        |
|         |                                                            |
|         | -   Description: The connection type                       |
|         |                                                            |
|         | -   Examples: AmazonS3, Anaplan, GoogleBigQuery, AzureBlob |
+---------+------------------------------------------------------------+
| file    | -   Required                                               |
|         |                                                            |
|         | -   String                                                 |
|         |                                                            |
|         | -   Description: For imports, this is the file imported    |
|         |     into Anaplan. For exports, this is the folder file     |
|         |     path to export data from Anaplan.                      |
|         |                                                            |
|         | -   Example: sample_file.csv                               |
+---------+------------------------------------------------------------+
| a       | -   Required                                               |
| ctionId |                                                            |
|         | -   String                                                 |
|         |                                                            |
|         | -   Description: The Import or Export action ID of Anaplan |
|         |     model, depending on the type of integration. If the    |
|         |     action is an import, this value is the import ID. If   |
|         |     the action is an export, this value is the export ID.  |
|         |                                                            |
|         | -   Example: 112000000011                                  |
+---------+------------------------------------------------------------+
| fileId  | -   Required if the integration is an import               |
|         |                                                            |
|         | -   String                                                 |
|         |                                                            |
|         | -   Description: The file ID of Anaplan model.             |
|         |                                                            |
|         | -   Example: 113000000011                                  |
+---------+------------------------------------------------------------+
| work    | -   Required if the integration is an import               |
| spaceId |                                                            |
|         | -   String                                                 |
|         |                                                            |
|         | -   Description: The Anaplan workspace ID.                 |
|         |                                                            |
|         | -   Example: 8a80db657068fjef01718955f3b3390b              |
+---------+------------------------------------------------------------+
| modelId | -   Required if the integration is an import               |
|         |                                                            |
|         | -   String                                                 |
|         |                                                            |
|         | -   Description: The Anaplan model ID.                     |
|         |                                                            |
|         | -   Example: E559BFF3B1GD4RKE874P745BEL259711              |
+---------+------------------------------------------------------------+
| ov      | -   Optional                                               |
| erwrite |                                                            |
|         | -   Boolean                                                |
|         |                                                            |
|         | -   Description: This setting determines if the            |
|         |     integration should overwrite the destination file.     |
|         |     For example: If set to false (the default value), or   |
|         |     not set, the API creates a new file in S3, if          |
|         |     the connectionType is AmazonS3.  If set to true, the   |
|         |     API overrides the previous file.                       |
|         |                                                            |
|         | -   Example: false                                         |
+---------+------------------------------------------------------------+
| nux     | -   Optional                                               |
| Visible |                                                            |
|         | -   Boolean                                                |
|         |                                                            |
|         | -   Description: Optional field. When this field is set,   |
|         |     this integration is visible in UX action cards. The    |
|         |     default value is The default value is false.           |
+---------+------------------------------------------------------------+
| name    | -   Required                                               |
|         |                                                            |
|         | -   Type: String                                           |
|         |                                                            |
|         | -   Description: The name of the integration. This should  |
|         |     be a unique name.                                      |
|         |                                                            |
|         | -   Example: test_integration_1                            |
+---------+------------------------------------------------------------+

Response headers

Content-Type: application/json

Response 200 Body

 {

     \"status\": {

         \"code\": 200,

         \"message\": \"Success\"

     }

 }

Delete an integration

/integrations/{integrationId}

Use this call to delete an integration, import or export in CloudWorks.

Request

curl -X DELETE
[']{dir="rtl"}https://api.cloudworks.anaplan.com/2/0/integrations/{integrationId}[']{dir="rtl"}
\\

-H [']{dir="rtl"}Authorization: AnaplanAuthToken
{anaplan_auth_token}[']{dir="rtl"} \\

-H [']{dir="rtl"}Content-Type: application/json[']{dir="rtl"}

Request headers

+----------------------------+-----------------------------------------+
| **Header**                 | **Details**                             |
+----------------------------+-----------------------------------------+
| Authorization:             | -   Required                            |
| AnaplanAuthToken           |                                         |
| {anaplan_auth_token}       | -   Description: the Anaplan            |
|                            |     authentication token                |
+----------------------------+-----------------------------------------+
| Content-Type               | -   Required                            |
|                            |                                         |
|                            | -   Description: This indicates the     |
|                            |     preferred response                  |
|                            |     is application/json format.         |
+----------------------------+-----------------------------------------+

Request parameters

+-------------------+---------------------------------------------------+
| **Parameter**     | **Details**                                       |
+-------------------+---------------------------------------------------+
| {integrationId}   | -   Required                                      |
|                   |                                                   |
|                   | -   Type: String                                  |
|                   |                                                   |
|                   | -   Description: The integration ID               |
|                   |                                                   |
|                   | -   Example: fe40dc5793084f7dbb685cffe6a5ad2a     |
+-------------------+---------------------------------------------------+

Request body

None

Response headers

Content-Type: application/json

Response 200 Body

{

   \"status\": {

       \"code\": 200,

       \"message\": \"Success\"

    }

}

Process

Create a process integration

/integrations/{integrationId}

Use this call to create a process integration in CloudWorks using
Version 2.0.

Request

curl -X POST
[']{dir="rtl"}https://api.cloudworks.anaplan.com/2/0/integrations[']{dir="rtl"}
\\

-H [']{dir="rtl"}Authorization: AnaplanAuthToken
{anaplan_auth_token}[']{dir="rtl"} \\

-H [']{dir="rtl"}Content-Type: application/json[']{dir="rtl"}

Request headers

+----------------------------+-----------------------------------------+
| **Header**                 | **Details**                             |
+----------------------------+-----------------------------------------+
| Authorization:             | -   Required                            |
| AnaplanAuthToken           |                                         |
| {anaplan_auth_token}       | -   Description: the Anaplan            |
|                            |     authentication token                |
+----------------------------+-----------------------------------------+
| Content-Type               | -   Required                            |
|                            |                                         |
|                            | -   Description: This indicates the     |
|                            |     preferred response                  |
|                            |     is application/json format.         |
+----------------------------+-----------------------------------------+

Request parameters

None

Note: A Process integration with Version 2.0 can contain none or more
than one job. Include only those import/export actions in the
["]{dir="rtl"}jobs" section of the request body which are associated
with the Amazon S3 file.

Request body (process)

{

\"name\": \"sample process integration\",

\"version\": \"2.0\",

\"processId\": \"118000000001\",

\"workspaceId\": \"8b90db657068fjef01718955f3b3390b\",

\"modelId\": \"E229BFF3B1GD4RKE874P745BEL259711\",

\"nuxVisible\": false,

\"jobs\": \[

{

\"type\": \"AmazonS3ToAnaplan\",

\"sources\": \[

{

\"type\": \"AmazonS3\",

\"connectionId\": \"0c3d2f662c1b4c71a02fb4b6f09a40f7\",

\"file\": \"sample_file_1.csv\"

}

\],

\"targets\": \[

{

\"type\": \"Anaplan\",

\"actionId\": \"112000000011\",

\"fileId\": \"113000000011\"

}

\]

},

{

\"type\": \"AnaplanToAmazonS3\",

\"sources\": \[

{

\"type\": \"Anaplan\",

\"actionId\": \"116000000000\"

}

\],

\"targets\": \[

{

\"type\": \"AmazonS3\",

\"connectionId\": \"0d3d2f662c1b4c71a02fb4b6f09a40f7\",

\"file\": \"Exports/\"

}

\]

}

\]

}

Users can also create an integration if the Anaplan Process does not
contain any actions associated with an AmazonS3 file. eg: A process
containing only Model-to-Model import actions and delete action.

Request body

A process containing Anaplan actions that are not associated with the
cloud service.

{

\"name\": \"sample process integration2\",

\"version\": \"2.0\",

\"processId\": \"118000000001\",

\"workspaceId\": \"8b90db657068fjef01718955f3b3390b\",

\"modelId\": \"E229BFF3B1GD4RKE874P745BEL259711\"

}

Request with version 1.0 (old version)

curl -X POST
[']{dir="rtl"}https://api.cloudworks.anaplan.com/1/0/integrations[']{dir="rtl"}
\\

-H [']{dir="rtl"}Authorization: AnaplanAuthToken
{anaplan_auth_token}[']{dir="rtl"} \\

-H [']{dir="rtl"}Content-Type: application/json[']{dir="rtl"}

Request headers

+----------------------------+-----------------------------------------+
| **Header**                 | **Details**                             |
+----------------------------+-----------------------------------------+
| Authorization:             | -   Required                            |
| AnaplanAuthToken           |                                         |
| {anaplan_auth_token}       | -   Description: the Anaplan            |
|                            |     authentication token                |
+----------------------------+-----------------------------------------+
| Content-Type               | -   Required                            |
|                            |                                         |
|                            | -   Description: This indicates the     |
|                            |     preferred response                  |
|                            |     is application/json format.         |
+----------------------------+-----------------------------------------+

Request body (process) with version 1.0

Note:  Process integration can contain one or more jobs. Include only
those actions in the request body which are associated with the Amazon
S3 file. For the following request, the first job runs an import action
to get data into Anaplan and the second job runs an export action to get
data out of Anaplan.

{

\"name\": \"sample process integration\",

\"processId\": \"118000000001\",

\"nuxVisible\": false,

\"jobs\": \[

{

\"type\": \"AmazonS3ToAnaplan\",

\"sources\": \[

{

\"type\": \"AmazonS3\",

\"connectionId\": \"0c3d2f662c1b4c71a02fb4b6f09a40f7\",

\"file\": \"sample_file_1.csv\"

}

\],

\"targets\": \[

{

\"type\": \"Anaplan\",

\"actionId\": \"112000000011\",

\"fileId\": \"113000000011\",

\"workspaceId\": \"8b90db657068fjef01718955f3b3390b\",

\"modelId\": \"E229BFF3B1GD4RKE874P745BEL259711\"

}

\]

},

{

\"type\": \"AnaplanToAmazonS3\",

\"sources\": \[

{

\"type\": \"Anaplan\",

\"actionId\": \"116000000000\",

\"workspaceId\": \"8b90db657068fjef01718955f3b3390b\",

\"modelId\": \"E229BFF3B1GD4RKE874P745BEL259711\"

}

\],

\"targets\": \[

{

\"type\": \"AmazonS3\",

\"connectionId\": \"0d3d2f662c1b4c71a02fb4b6f09a40f7\",

\"file\": \"Exports/\"

}

\]

}

\]

}

+----------+-----------------------------------------------------------+
| **JSON** | **Details**                                               |
+----------+-----------------------------------------------------------+
| jobs     | -   Required                                              |
|          |                                                           |
|          | -   List                                                  |
|          |                                                           |
|          | -   Description: Consists of sources and targets.         |
+----------+-----------------------------------------------------------+
| p        | -   Required                                              |
| rocessId |                                                           |
|          | -   String                                                |
|          |                                                           |
|          | -   Description: Anaplan process id.                      |
+----------+-----------------------------------------------------------+
| type     | -   Required                                              |
|          |                                                           |
|          | -   String as part of the jobs list                       |
|          |                                                           |
|          | -   Description: Type of integration                      |
|          |                                                           |
|          | -   Examples: AmazonS3ToAnaplan,                          |
|          |                                                           |
|          | AnaplanToAmazonS3, AzureBlobToAnaplan, AnaplanToAzureBlob |
+----------+-----------------------------------------------------------+
| sources  | -   Required                                              |
|          |                                                           |
|          | -   part of the jobs list                                 |
|          |                                                           |
|          | -   Description: The location from where you  transfer    |
|          |     the file. AmazonS3 in case of import action.          |
+----------+-----------------------------------------------------------+
| targets  | -   Required                                              |
|          |                                                           |
|          | -   part of the jobs list                                 |
|          |                                                           |
|          | -   Description: The location to where the file is        |
|          |     transferred.                                          |
|          |                                                           |
|          | Example: { \"type\": \"AmazonS3\", \"connectionId\":      |
|          | \"0c3d2f662c1b4c71a02fb4b6f09a40f7\", \"file\":           |
|          | \"exports/\", \"overwrite\": true }                       |
+----------+-----------------------------------------------------------+
| conn     | -   Required                                              |
| ectionId |                                                           |
|          | -   String                                                |
|          |                                                           |
|          | -   Description: The ID created while creating a          |
|          |     connection.                                           |
|          |                                                           |
|          | -   Example: 0c3d2f66-2c1b-4c71-a02f-b4b6f09a40f7         |
+----------+-----------------------------------------------------------+
| type     | -   Required                                              |
|          |                                                           |
|          | -   String as part of the sources or targets lists        |
|          |                                                           |
|          | -   Description: The connection type                      |
|          |                                                           |
|          | -   Examples: AmazonS3, Anaplan, AzureBlob                |
+----------+-----------------------------------------------------------+
| file     | -   Required                                              |
|          |                                                           |
|          | -   String                                                |
|          |                                                           |
|          | -   Description: For imports, this is the file imported   |
|          |     into Anaplan. For exports, this is the folder file    |
|          |     path to export data from Anaplan.                     |
|          |                                                           |
|          | -   Example: sample_file.csv                              |
+----------+-----------------------------------------------------------+
| actionId | -   Required                                              |
|          |                                                           |
|          | -   String                                                |
|          |                                                           |
|          | -   Description: The Import or Export action ID of        |
|          |     Anaplan model, depending on the type of integration.  |
|          |     If the action is an import, this value is the import  |
|          |     ID. If the action is an export, this value is the     |
|          |     export ID.                                            |
|          |                                                           |
|          | -   Example: 112000000011                                 |
+----------+-----------------------------------------------------------+
| fileId   | -   Required if the integration is an import              |
|          |                                                           |
|          | -   String                                                |
|          |                                                           |
|          | -   Description: The file ID of Anaplan model.            |
|          |                                                           |
|          | -   Example: 113000000011                                 |
+----------+-----------------------------------------------------------+
| wor      | -   Required                                              |
| kspaceId |                                                           |
|          | -   String                                                |
|          |                                                           |
|          | -   Description: The Anaplan workspace ID.                |
|          |                                                           |
|          | -   Example: 8b90db657068fjef01718955f3b3390b             |
+----------+-----------------------------------------------------------+
| modelId  | -   Required                                              |
|          |                                                           |
|          | -   String                                                |
|          |                                                           |
|          | -   Description: The Anaplan model ID.                    |
|          |                                                           |
|          | -   Example: E229BFF3B1GD4RKE874P745BEL259711             |
+----------+-----------------------------------------------------------+
| o        | -   Optional (Default value is false)                     |
| verwrite |                                                           |
|          | -   Boolean                                               |
|          |                                                           |
|          | -   Description: This setting determines if the           |
|          |     integration should overwrite the destination file.    |
|          |     For example: If set to false (the default value), or  |
|          |     not set, the API creates a new file in S3, if         |
|          |     the connectionType is AmazonS3.  If set to true, the  |
|          |     API overrides the previous file.                      |
|          |                                                           |
|          | -   Example: false                                        |
+----------+-----------------------------------------------------------+
| version  | -   Required                                              |
|          |                                                           |
|          | -   String                                                |
|          |                                                           |
|          | -   Description: Cloudworks API version.                  |
|          |                                                           |
|          | -   Example: 2.0                                          |
+----------+-----------------------------------------------------------+
| nu       | -   Optional                                              |
| xVisible |                                                           |
|          | -   Boolean                                               |
|          |                                                           |
|          | -   Description: Optional field. When this field is set,  |
|          |     this integration is visible in UX action cards. The   |
|          |     default value is The default value is false.          |
+----------+-----------------------------------------------------------+
| name     | -   Required                                              |
|          |                                                           |
|          | -   Type: String                                          |
|          |                                                           |
|          | -   Description: The name of the integration. This should |
|          |     be a unique name.                                     |
|          |                                                           |
|          | -   Example: test_integration_1                           |
+----------+-----------------------------------------------------------+

Response headers

Content-Type: application/json

Response 200 Body

{

    \"status\": {

        \"code\": 200,

        \"message\": \"Success\"

    },

    \"integration\": {

        \"integrationId\": \"4caad0c1b91545d983cb6a2bb62d755e\"

    }

}

Edit a process integration

/integrations/{integrationId}

Use this call to edit a process integration using Version 2.0.

Request

 curl -X PUT
[']{dir="rtl"}https://api.cloudworks.anaplan.com/2/0/integrations/{integrationId}[']{dir="rtl"}
\\

-H [']{dir="rtl"}Authorization: AnaplanAuthToken
{anaplan_auth_token}[']{dir="rtl"} \\

-H [']{dir="rtl"}Content-Type: application/json[']{dir="rtl"} \\

Request headers

+--------------------------------+--------------------------------------+
| **Header**                     | **Details**                          |
+--------------------------------+--------------------------------------+
| Authorization:                 | -   Required                         |
| AnaplanAuthToken               |                                      |
| {anaplan_auth_token}           | -   Description: the Anaplan         |
|                                |     authentication token             |
+--------------------------------+--------------------------------------+
| Content-Type                   | -   Required                         |
|                                |                                      |
|                                | -   Description: This call uses a    |
|                                |     content type                     |
|                                |     of application/json.             |
+--------------------------------+--------------------------------------+

Request parameters

+-------------------+---------------------------------------------------+
| **Parameter**     | **Details**                                       |
+-------------------+---------------------------------------------------+
| {integrationId}   | -   Required                                      |
|                   |                                                   |
|                   | -   Type: String                                  |
|                   |                                                   |
|                   | -   Description: The integration ID               |
|                   |                                                   |
|                   | -   Example: 4caad0c1b91545d983cb6a2bb62d755e     |
+-------------------+---------------------------------------------------+

Request body (process)

{

\"name\": \"sample process integration updated\",

\"processId\": \"118000000001\",

\"version\": \"2.0\",

\"workspaceId\": \"8b90db657068fjef01718955f3b3390b\",

\"modelId\": \"E229BFF3B1GD4RKE874P745BEL259711\",

\"nuxVisible\": false,

\"jobs\": \[

{

\"type\": \"AmazonS3ToAnaplan\",

\"sources\": \[

{

\"type\": \"AmazonS3\",

\"connectionId\": \"0c3d2f662c1b4c71a02fb4b6f09a40f7\",

\"file\": \"sample_file_updated.csv\"

}

\],

\"targets\": \[

{

\"type\": \"Anaplan\",

\"actionId\": \"112000000011\",

\"fileId\": \"113000000011\"

}

\]

},

{

\"type\": \"AnaplanToAmazonS3\",

\"sources\": \[

{

\"type\": \"Anaplan\",

\"actionId\": \"116000000000\"

}

\],

\"targets\": \[

{

\"type\": \"AmazonS3\",

\"connectionId\": \"0d3d2f662c1b4c71a02fb4b6f09a40f7\",

\"file\": \"Exports/\"

}

\]

}

\]

}

Request with version 1.0 (old version)

 curl -X PUT
[']{dir="rtl"}https://api.cloudworks.anaplan.com/1/0/integrations/{integrationId}[']{dir="rtl"}
\\

-H [']{dir="rtl"}Authorization: AnaplanAuthToken
{anaplan_auth_token}[']{dir="rtl"} \\

-H [']{dir="rtl"}Content-Type: application/json[']{dir="rtl"} \\

Request headers

+--------------------------------+--------------------------------------+
| **Header**                     | **Details**                          |
+--------------------------------+--------------------------------------+
| Authorization:                 | -   Required                         |
| AnaplanAuthToken               |                                      |
| {anaplan_auth_token}           | -   Description: the Anaplan         |
|                                |     authentication token             |
+--------------------------------+--------------------------------------+
| Content-Type                   | -   Required                         |
|                                |                                      |
|                                | -   Description: This call uses a    |
|                                |     content type                     |
|                                |     of application/json.             |
+--------------------------------+--------------------------------------+

Request parameters

+-------------------+---------------------------------------------------+
| **Parameter**     | **Details**                                       |
+-------------------+---------------------------------------------------+
| {integrationId}   | -   Required                                      |
|                   |                                                   |
|                   | -   Type: String                                  |
|                   |                                                   |
|                   | -   Description: The integration ID               |
|                   |                                                   |
|                   | -   Example: 4caad0c1b91545d983cb6a2bb62d755e     |
+-------------------+---------------------------------------------------+

{

\"name\": \"sample process integration updated\",

\"processId\": \"118000000001\",

\"nuxVisible\": false,

\"jobs\": \[

{

\"type\": \"AmazonS3ToAnaplan\",

\"sources\": \[

{

\"type\": \"AmazonS3\",

\"connectionId\": \"0c3d2f662c1b4c71a02fb4b6f09a40f7\",

\"file\": \"sample_file_updated.csv\"

}

\],

\"targets\": \[

{

\"type\": \"Anaplan\",

\"actionId\": \"112000000011\",

\"fileId\": \"113000000011\",

\"workspaceId\": \"8b90db657068fjef01718955f3b3390b\",

\"modelId\": \"E229BFF3B1GD4RKE874P745BEL259711\"

}

\]

},

{

\"type\": \"AnaplanToAmazonS3\",

\"sources\": \[

{

\"type\": \"Anaplan\",

\"actionId\": \"116000000000\",

\"workspaceId\": \"8b90db657068fjef01718955f3b3390b\",

\"modelId\": \"E229BFF3B1GD4RKE874P745BEL259711\"

}

\],

\"targets\": \[

{

\"type\": \"AmazonS3\",

\"connectionId\": \"0d3d2f662c1b4c71a02fb4b6f09a40f7\",

\"file\": \"Exports/\"

}

\]

}

\]

}

+----------+-----------------------------------------------------------+
| **JSON** | **Details**                                               |
+----------+-----------------------------------------------------------+
| jobs     | -   Required                                              |
|          |                                                           |
|          | -   List                                                  |
|          |                                                           |
|          | -   Description: Consists of sources and targets.         |
+----------+-----------------------------------------------------------+
| p        | -   Required                                              |
| rocessId |                                                           |
|          | -   String                                                |
|          |                                                           |
|          | -   Description: Anaplan process id                       |
+----------+-----------------------------------------------------------+
| type     | -   Required                                              |
|          |                                                           |
|          | -   String as part of the jobs list                       |
|          |                                                           |
|          | -   Description: Type of integration                      |
|          |                                                           |
|          | -   Examples: AmazonS3ToAnaplan, AnaplanToAmazonS3        |
+----------+-----------------------------------------------------------+
| sources  | -   Required                                              |
|          |                                                           |
|          | -   List as part of the jobs list                         |
|          |                                                           |
|          | -   Description: The location from where you transfer the |
|          |     file.                                                 |
+----------+-----------------------------------------------------------+
| targets  | -   Required                                              |
|          |                                                           |
|          | -   List as part of the jobs list                         |
|          |                                                           |
|          | -   Description: The location where the file is           |
|          |     transferred.                                          |
+----------+-----------------------------------------------------------+
| conn     | -   Required                                              |
| ectionId |                                                           |
|          | -   String                                                |
|          |                                                           |
|          | -   Description: The ID created while creating a          |
|          |     connection.                                           |
|          |                                                           |
|          | -   Example: 0c3d2f662c1b4c71a02fb4b6f09a40f7             |
+----------+-----------------------------------------------------------+
| type     | -   Required                                              |
|          |                                                           |
|          | -   String as part of the sources or targets lists        |
|          |                                                           |
|          | -   Description: The connection type                      |
|          |                                                           |
|          | -   Examples: AmazonS3, Anaplan                           |
+----------+-----------------------------------------------------------+
| file     | -   Required                                              |
|          |                                                           |
|          | -   String                                                |
|          |                                                           |
|          | -   Description: The folder path                          |
|          |                                                           |
|          | -   Example: sample_file.csv                              |
+----------+-----------------------------------------------------------+
| actionId | -   Required                                              |
|          |                                                           |
|          | -   String                                                |
|          |                                                           |
|          | -   Description: The Import or Export action ID of        |
|          |     Anaplan model, depending on the type of integration.  |
|          |     If the action is an import, this value is the import  |
|          |     ID. If the action is an export, this value is the     |
|          |     export ID.                                            |
|          |                                                           |
|          | -   Example: 112000000011                                 |
+----------+-----------------------------------------------------------+
| fileId   | -   Required if the integration is an import              |
|          |                                                           |
|          | -   String                                                |
|          |                                                           |
|          | -   Description: The file ID of Anaplan model.            |
|          |                                                           |
|          | -   Example: 113000000011                                 |
+----------+-----------------------------------------------------------+
| wor      | -   Required                                              |
| kspaceId |                                                           |
|          | -   String                                                |
|          |                                                           |
|          | -   Description: The Anaplan workspace ID.                |
|          |                                                           |
|          | -   Example: 8b90db657068fjef01718955f3b3390b             |
+----------+-----------------------------------------------------------+
| modelId  | -   Required                                              |
|          |                                                           |
|          | -   String                                                |
|          |                                                           |
|          | -   Description: The Anaplan model ID.                    |
|          |                                                           |
|          | -   Example: E229BFF3B1GD4RKE874P745BEL259711             |
+----------+-----------------------------------------------------------+
| o        | -   Optional (Default value is false)                     |
| verwrite |                                                           |
|          | -   Boolean                                               |
|          |                                                           |
|          | -   Description: This setting determines if the           |
|          |     integration should overwrite the destination file.    |
|          |     For example: when set to false (the default value),   |
|          |     or not set, the API creates a new file in S3, if      |
|          |     the connectionType is AmazonS3.  If set to true, the  |
|          |     API overrides the previous file.                      |
|          |                                                           |
|          | -   Example: false                                        |
+----------+-----------------------------------------------------------+
| version  | -   Required                                              |
|          |                                                           |
|          | -   String                                                |
|          |                                                           |
|          | -   Description: CloudWorks API version.                  |
|          |                                                           |
|          | -   Example: \'2.0\'                                      |
+----------+-----------------------------------------------------------+
| nu       | -   Optional                                              |
| xVisible |                                                           |
|          | -   Boolean                                               |
|          |                                                           |
|          | -   Description: Optional field. When this field is set,  |
|          |     this integration is visible in UX action cards. The   |
|          |     default value is The default value is false.          |
+----------+-----------------------------------------------------------+
| name     | -   Required                                              |
|          |                                                           |
|          | -   Type: String                                          |
|          |                                                           |
|          | -   Description: The name of the integration. This should |
|          |     be a unique name.                                     |
|          |                                                           |
|          | -   Example: test_integration_1                           |
+----------+-----------------------------------------------------------+

Response header

Content-Type: application/json

Response 200 Body

 {

     \"status\": {

         \"code\": 200,

         \"message\": \"Success\"

     }

 }

Set the status of an integration schedule

/integrations/{integrationId}/schedule/status/{status}

Use this call to set the status of a scheduled integration.

Request

curl -X POST
[']{dir="rtl"}https://api.cloudworks.anaplan.com/2/0/integrations/{integrationId}/schedule/status/{status}[']{dir="rtl"}
\\

-H [']{dir="rtl"}Authorization: AnaplanAuthToken
{token_value}[']{dir="rtl"} \\

-H [']{dir="rtl"}Content-Type: application/json[']{dir="rtl"}

Request headers

+--------------------------------+-------------------------------------+
| **Header**                     | **Details**                         |
+--------------------------------+-------------------------------------+
| Authorization:                 | -   Required                        |
| AnaplanAuthToken               |                                     |
| {anaplan_auth_token}           | -   Description: the Anaplan        |
|                                |     authentication token            |
+--------------------------------+-------------------------------------+
| Content-Type                   | -   Required                        |
|                                |                                     |
|                                | -   Description: This call uses a   |
|                                |     content type of                 |
|                                |     application/json.               |
+--------------------------------+-------------------------------------+

Request parameters

+-------------------+---------------------------------------------------+
| **Parameter**     | **Details**                                       |
+-------------------+---------------------------------------------------+
| {integrationId}   | -   Required                                      |
|                   |                                                   |
|                   | -   Type: String                                  |
|                   |                                                   |
|                   | -   Description: the integration ID               |
|                   |                                                   |
|                   | -   Example: fe40dc5793084f7dbb685cffe6a5ad2a     |
+-------------------+---------------------------------------------------+
| {status}          | -   Required                                      |
|                   |                                                   |
|                   | -   Type: String                                  |
|                   |                                                   |
|                   | -   Description: the integration ID               |
|                   |                                                   |
|                   | -   Example: enabled                              |
+-------------------+---------------------------------------------------+

Request body

None

Response headers

Content-Type: application/json

Response 200 Body

{

\"status\": {

        \"code\": 200,

        \"message\": \"Success\"

    } 

}

Schedule

Create an integration schedule

/integrations/{integrationId}/schedule

Use this call to create an integration schedule. This call supports a
maximum of one schedule per integration.

Request

curl -X POST
[']{dir="rtl"}https://api.cloudworks.anaplan.com/2/0/integrations/{integrationId}/schedule[']{dir="rtl"}
\\ 

-H [']{dir="rtl"}Authorization: AnaplanAuthToken
{token_value}[']{dir="rtl"} \\

-H [']{dir="rtl"}Content-Type: application/json[']{dir="rtl"}

Request headers

+------------------------------+---------------------------------------+
| **Header**                   | **Details**                           |
+------------------------------+---------------------------------------+
| Authorization:               | -   Required                          |
| AnaplanAuthToken             |                                       |
| {token_value}                | -   Description: the Anaplan          |
|                              |     authentication token              |
+------------------------------+---------------------------------------+
| Content-Type                 | -   Required                          |
|                              |                                       |
|                              | -   Description: This call uses a     |
|                              |     content type of application/json. |
+------------------------------+---------------------------------------+

Request parameters

+-------------------+---------------------------------------------------+
| **Parameter**     | **Details**                                       |
+-------------------+---------------------------------------------------+
| {integrationId}   | -   Required                                      |
|                   |                                                   |
|                   | -   Type: String                                  |
|                   |                                                   |
|                   | -   Description: the integration ID               |
|                   |                                                   |
|                   | -   Example: fe40dc5793084f7dbb685cffe6a5ad2a     |
+-------------------+---------------------------------------------------+

Request body based on schedule type

Schedule Type: weekly. It runs on specific days of the week.

{

      \"integrationId\":  fe40dc5793084f7dbb685cffe6a5ad2a,

      \"schedule\": {

            \"name\": \"test schedule\",

            \"type\": \"weekly\",

            \"time\": \"12:45\",

            \"daysOfWeek\": \[0, 6\]

            \"startDate\": \"2020-07-03\",

            \"endDate\": \"2020-12-01\",

            \"timezone\": \"Europe/Paris\"

          }

}

Schedule Type: monthly_specific_day . It runs on a specific day of the
month.

{

     \"integrationId\":  fe40dc5793084f7dbb685cffe6a5ad2a,

      \"schedule\": {

                \"name\": \"test schedule\",

                \"type\": \"monthly_specific_day\",

                \"dayOfMonth\": 12,

                \"time\": \"22:00\",

                \"startDate\": \"2020-09-03\",

                \"endDate\": \"2020-12-01\",

                \"timezone\": \"Europe/Paris\"

            }

}

Schedule Type: monthly_relative_weekday. It runs on a day of the week
relative to the start of the month.

{

     \"integrationId\":  fe40dc5793084f7dbb685cffe6a5ad2a,

      \"schedule\": {

                \"name\": \"test schedule\",

                \"type\": \"monthly_relative_weekday\",

                \"time\": \"12:45\",

                \"dayOfWeek\": 3,

                \"repeatEvery\": 2

                \"startDate\": \"2020-07-03\",

                \"endDate\": \"2020-12-01\",

                \"timezone\": \"Europe/Paris\"

            }

}

Schedule Type: hourly. It runs on specific days of the week, each hour,
between a start and end hour.

{

     \"integrationId\":  fe40dc5793084f7dbb685cffe6a5ad2a,

      \"schedule\": {

                \"name\": \"test schedule\",

                \"type\": \"hourly\",

                \"repeatEvery\": 2,

                \"fromTime\": \"20:00\",

                \"toTime\": \"23:20\",

                \"daysOfWeek\": \[0, 6\],

                \"startDate\": \"2020-07-03\",

                \"endDate\": \"2020-12-01\",

                \"timezone\": \"Europe/Paris\"

            }

}

Schedule Type: daily. It runs each day, at a specified time.

{

  \"integrationId\":  fe40dc5793084f7dbb685cffe6a5ad2a,

  \"schedule\": {

        \"name\": \"test schedule\",

        \"type\": \"daily\",

        \"time\": \"11:55\",

        \"startDate\": \"2020-07-03\",

        \"endDate\": \"2020-12-01\",

        \"timezone\": \"Europe/Paris\"

      }

}

+---------+------------------------------------------------------------+
| *       | **Details**                                                |
| *JSON** |                                                            |
+---------+------------------------------------------------------------+
| name    | -   Required                                               |
|         |                                                            |
|         | -   Type: String                                           |
|         |                                                            |
|         | -   Description: Name of schedule                          |
|         |                                                            |
|         | -   Example: \'test-schedule\'                             |
+---------+------------------------------------------------------------+
| type    | -   Required                                               |
|         |                                                            |
|         | -   Type: String                                           |
|         |                                                            |
|         | -   Description: Type of schedule. Valid entries are:      |
|         |                                                            |
|         |     -   monthly_specific_day                               |
|         |                                                            |
|         |     -   monthly_relative_weekday                           |
|         |                                                            |
|         |     -   hourly                                             |
|         |                                                            |
|         |     -   weekly                                             |
|         |                                                            |
|         |     -   daily                                              |
|         |                                                            |
|         | -   Example: monthly_specific_day                          |
+---------+------------------------------------------------------------+
| day     | -   Required in monthly_specific_day schedule              |
| OfMonth |                                                            |
|         | -   Type: Integer                                          |
|         |                                                            |
|         | -   Description: Day of the month.  Valid entries are 1 to |
|         |     31.                                                    |
|         |                                                            |
|         | -   Example: 12                                            |
+---------+------------------------------------------------------------+
| day     | -   Required in weekly, hourly,                            |
| sOfWeek |     and monthly_relative_weekday schedule                  |
|         |                                                            |
|         | -   Type: List                                             |
|         |                                                            |
|         | -   Description: Days of the week. Sunday is 0             |
|         |                                                            |
|         | -   Example: \[0,6\]                                       |
+---------+------------------------------------------------------------+
| repe    | -   Required                                               |
| atEvery |     in monthly_relative_weekday and hourly schedules       |
|         |                                                            |
|         | -   Type: Integer                                          |
|         |                                                            |
|         | -   Description: Repeat the schedule                       |
|         |                                                            |
|         | -   Example: 2. It means repeat every second Wednesday of  |
|         |     the month, if the schedule type is                     |
|         |     monthly_relative_weekday.                              |
+---------+------------------------------------------------------------+
| time    | -   Required                                               |
|         |                                                            |
|         | -   Type: String                                           |
|         |                                                            |
|         | -   Description: The schedule time                         |
|         |                                                            |
|         | -   Example: 22:00                                         |
+---------+------------------------------------------------------------+
| f       | -   Required in hourly schedule                            |
| romTime |                                                            |
|         | -   Type: String                                           |
|         |                                                            |
|         | -   Description: The schedule time                         |
|         |                                                            |
|         | -   Example: 20:00                                         |
+---------+------------------------------------------------------------+
| toTime  | -   Required in hourly schedule                            |
|         |                                                            |
|         | -   Type: String                                           |
|         |                                                            |
|         | -   Description: The schedule time                         |
|         |                                                            |
|         | -   Example: 23:20                                         |
+---------+------------------------------------------------------------+
| st      | -   Required                                               |
| artDate |                                                            |
|         | -   Type: String                                           |
|         |                                                            |
|         | -   Description: Start date of the schedule.  The format   |
|         |     for the date is: YYYY-MM-DD                            |
|         |                                                            |
|         | -   Example: 2020-09-03                                    |
+---------+------------------------------------------------------------+
| endDate | -   Optional                                               |
|         |                                                            |
|         | -   Type: String                                           |
|         |                                                            |
|         | -   Description: End date of the schedule.  The format for |
|         |     the date is: YYYY-MM-DD                                |
|         |                                                            |
|         | -   Example: 2020-12-01                                    |
+---------+------------------------------------------------------------+
| t       | -   Required                                               |
| imezone |                                                            |
|         | -   Type: String                                           |
|         |                                                            |
|         | -   Description: The time zone for the schedule.           |
|         |                                                            |
|         | -   Example: Europe/Paris                                  |
+---------+------------------------------------------------------------+

Response headers

Content-Type: application/json

Response 200 Body

{

\"status\": {

       \"code\": 200,

       \"message\": \"Success\"

   },

   \"scheduledIntegration\": {

       \"id\": \"0995f32adf2443a9b2420739cedc17f9\"

   }

    }

Update the schedule of an integration

/integrations/{integrationId}/schedule

Use this call to update the schedule of an integration for Anaplan
CloudWorks.

Request

curl -X PUT
[']{dir="rtl"}https://api.cloudworks.anaplan.com/2/0/integrations/{integrationId}/schedule\'
\\ 

-H [']{dir="rtl"}Authorization: AnaplanAuthToken
{token_value}[']{dir="rtl"} \\

-H [']{dir="rtl"}Content-Type: application/json[']{dir="rtl"}

Request headers

+--------------------------------+-------------------------------------+
| **Header**                     | **Details**                         |
+--------------------------------+-------------------------------------+
| Authorization:                 | -   Required                        |
| AnaplanAuthToken               |                                     |
| {anaplan_auth_token}           | -   Description: the Anaplan        |
|                                |     authentication token            |
+--------------------------------+-------------------------------------+
| Content-Type                   | -   Required                        |
|                                |                                     |
|                                | -   Description: This call uses a   |
|                                |     content type of                 |
|                                |     application/json.               |
+--------------------------------+-------------------------------------+

Request parameters

+-------------------+---------------------------------------------------+
| **Parameter**     | **Details**                                       |
+-------------------+---------------------------------------------------+
| {integrationId}   | -   Required                                      |
|                   |                                                   |
|                   | -   Type: String                                  |
|                   |                                                   |
|                   | -   Description: the integration ID               |
|                   |                                                   |
|                   | -   Example: fe40dc5793084f7dbb685cffe6a5ad2a     |
+-------------------+---------------------------------------------------+

Request body based on schedule type

Schedule Type: weekly. It runs on specific days of the week.

{

      \"integrationId\":  fe40dc5793084f7dbb685cffe6a5ad2a,

      \"schedule\": {

            \"name\": \"test schedule\",

            \"type\": \"weekly\",

            \"time\": \"12:45\",

            \"daysOfWeek\": \[0, 6\]

            \"startDate\": \"2020-07-03\",

            \"endDate\": \"2020-12-01\",

            \"timezone\": \"Europe/Paris\"

          }

}

Schedule Type: monthly_specific_day . It runs on a specific day of the
month.

{

     \"integrationId\":  fe40dc5793084f7dbb685cffe6a5ad2a,

      \"schedule\": {

                \"name\": \"test schedule\",

                \"type\": \"monthly_specific_day\",

                \"dayOfMonth\": 12,

                \"time\": \"22:00\",

                \"startDate\": \"2020-09-03\",

                \"endDate\": \"2020-12-01\",

                \"timezone\": \"Europe/Paris\"

            }

}

Schedule Type: monthly_relative_weekday. It runs on a day of the week
relative to the start of the month.

{

     \"integrationId\":  fe40dc5793084f7dbb685cffe6a5ad2a,

      \"schedule\": {

                \"name\": \"test schedule\",

                \"type\": \"monthly_relative_weekday\",

                \"time\": \"12:45\",

                \"dayOfWeek\": 3,

                \"repeatEvery\": 2

                \"startDate\": \"2020-07-03\",

                \"endDate\": \"2020-12-01\",

                \"timezone\": \"Europe/Paris\"

            }

}

Schedule Type: hourly. It runs on specific days of the week, each hour,
between a start and end hour.

{

     \"integrationId\":  fe40dc5793084f7dbb685cffe6a5ad2a,

      \"schedule\": {

                \"name\": \"test schedule\",

                \"type\": \"hourly\",

                \"repeatEvery\": 2,

                \"fromTime\": \"20:00\",

                \"toTime\": \"23:20\",

                \"daysOfWeek\": \[0, 6\],

                \"startDate\": \"2020-07-03\",

                \"endDate\": \"2020-12-01\",

                \"timezone\": \"Europe/Paris\"

            }

}

Schedule Type: daily. It runs each day, at a specified time.

{

  \"integrationId\":  fe40dc5793084f7dbb685cffe6a5ad2a,

  \"schedule\": {

        \"name\": \"test schedule\",

        \"type\": \"daily\",

        \"time\": \"11:55\",

        \"startDate\": \"2020-07-03\",

        \"endDate\": \"2020-12-01\",

        \"timezone\": \"Europe/Paris\"

      }

}

+---------+------------------------------------------------------------+
| *       | **Details**                                                |
| *JSON** |                                                            |
+---------+------------------------------------------------------------+
| name    | -   Required                                               |
|         |                                                            |
|         | -   Type: String                                           |
|         |                                                            |
|         | -   Description: Name of schedule                          |
|         |                                                            |
|         | -   Example: \'test-schedule\'                             |
+---------+------------------------------------------------------------+
| type    | -   Required                                               |
|         |                                                            |
|         | -   Type: String                                           |
|         |                                                            |
|         | -   Description: Type of schedule.  Valid entries are:     |
|         |                                                            |
|         |     -   monthly_specific_day                               |
|         |                                                            |
|         |     -   monthly_relative_weekday                           |
|         |                                                            |
|         |     -   hourly                                             |
|         |                                                            |
|         |     -   weekly                                             |
|         |                                                            |
|         |     -   daily                                              |
|         |                                                            |
|         | -   Example: monthly_specific_day                          |
+---------+------------------------------------------------------------+
| day     | -   Required in monthly_specific_day schedule              |
| OfMonth |                                                            |
|         | -   Type: Integer                                          |
|         |                                                            |
|         | -   Description: Day of the month.  Valid entries are 1 to |
|         |     31.                                                    |
|         |                                                            |
|         | -   Example: 12                                            |
+---------+------------------------------------------------------------+
| day     | -   Required in weekly, hourly,                            |
| sOfWeek |     and monthly_relative_weekday schedules                 |
|         |                                                            |
|         | -   Type: List                                             |
|         |                                                            |
|         | -   Description: Days of the week. Sunday is 0             |
|         |                                                            |
|         | -   Example: \[0,6\]                                       |
+---------+------------------------------------------------------------+
| repe    | -   Required                                               |
| atEvery |     in monthly_relative_weekday and hourly schedules       |
|         |                                                            |
|         | -   Type: Integer                                          |
|         |                                                            |
|         | -   Description: Repeat the schedule                       |
|         |                                                            |
|         | -   Example: 2. It means repeat every second Wednesday of  |
|         |     the month, if the schedule type is                     |
|         |     monthly_relative_weekday.                              |
+---------+------------------------------------------------------------+
| time    | -   Required                                               |
|         |                                                            |
|         | -   Type: String                                           |
|         |                                                            |
|         | -   Description: The schedule time                         |
|         |                                                            |
|         | -   Example: 22:00                                         |
+---------+------------------------------------------------------------+
| f       | -   Required in hourly schedule                            |
| romTime |                                                            |
|         | -   Type: String                                           |
|         |                                                            |
|         | -   Description: The schedule time                         |
|         |                                                            |
|         | -   Example: 20:00                                         |
+---------+------------------------------------------------------------+
| toTime  | -   Required in hourly schedule                            |
|         |                                                            |
|         | -   Type: String                                           |
|         |                                                            |
|         | -   Description: The schedule time                         |
|         |                                                            |
|         | -   Example: 23:20                                         |
+---------+------------------------------------------------------------+
| st      | -   Required                                               |
| artDate |                                                            |
|         | -   Type: String                                           |
|         |                                                            |
|         | -   Description: Start date of the schedule.  The format   |
|         |     for the date is: YYYY-MM-DD                            |
|         |                                                            |
|         | -   Example: 2020-09-03                                    |
+---------+------------------------------------------------------------+
| endDate | -   Optional                                               |
|         |                                                            |
|         | -   Type: String                                           |
|         |                                                            |
|         | -   Description: End date of the schedule.  The format for |
|         |     the date is: YYYY-MM-DD                                |
|         |                                                            |
|         | -   Example: 2020-12-01                                    |
+---------+------------------------------------------------------------+
| t       | -   Required                                               |
| imezone |                                                            |
|         | -   Type: String                                           |
|         |                                                            |
|         | -   Description: The time zone for the schedule.           |
|         |                                                            |
|         | -   Example: Europe/Paris                                  |
+---------+------------------------------------------------------------+

Response headers

Content-Type: application/json

Response 200 Body

{

\"status\": {

       \"code\": 200,

       \"message\": \"Success\"

   

   }

}

Delete an integration schedule

/integrations/{integrationId}/schedule

Use this call to delete an integration schedule.

Request

curl -X DELETE
[']{dir="rtl"}https://api.cloudworks.anaplan.com/2/0/integrations/{integrationId}/schedule[']{dir="rtl"}
\\

-H [']{dir="rtl"}Authorization: AnaplanAuthToken
{token_value}[']{dir="rtl"} \\

-H [']{dir="rtl"}Content-Type: application/json[']{dir="rtl"}

Request headers

+--------------------------------+-------------------------------------+
| **Header**                     | **Details**                         |
+--------------------------------+-------------------------------------+
| Authorization:                 | -   Required                        |
| AnaplanAuthToken               |                                     |
| {anaplan_auth_token}           | -   Description: the Anaplan        |
|                                |     authentication token            |
+--------------------------------+-------------------------------------+
| Content-Type                   | -   Required                        |
|                                |                                     |
|                                | -   Description: This call uses a   |
|                                |     content type of                 |
|                                |     application/json.               |
+--------------------------------+-------------------------------------+

Request parameters

+-------------------+---------------------------------------------------+
| **Parameter**     | **Details**                                       |
+-------------------+---------------------------------------------------+
| {integrationId}   | -   Required                                      |
|                   |                                                   |
|                   | -   Type: String                                  |
|                   |                                                   |
|                   | -   Description: the integration ID               |
|                   |                                                   |
|                   | -   Example: fe40dc5793084f7dbb685cffe6a5ad2a     |
+-------------------+---------------------------------------------------+

Request body

None

Response headers

Content-Type: application/json

Response 200 Body

{

\"status\": {

       \"code\": 200,

       \"message\": \"Success\"

   }

}

History

Get history of integration runs

/integrations/runs/{integrationId}

Use this call to see the integration history.

Request

curl -X GET
[']{dir="rtl"}https://api.cloudworks.anaplan.com/2/0/integrations/runs/{integrationId}[']{dir="rtl"}
\\

-H [']{dir="rtl"}Authorization: AnaplanAuthToken
{token_value}[']{dir="rtl"} \\

-H [']{dir="rtl"}Content-Type: application/json[']{dir="rtl"}

Request headers

+--------------------------------+-------------------------------------+
| **Header**                     | **Details**                         |
+--------------------------------+-------------------------------------+
| Authorization:                 | -   Required                        |
| AnaplanAuthToken               |                                     |
| {anaplan_auth_token}           | -   Description: the Anaplan        |
|                                |     authentication token            |
+--------------------------------+-------------------------------------+
| Content-Type                   | -   Required                        |
|                                |                                     |
|                                | -   Description: This call uses a   |
|                                |     content type of                 |
|                                |     application/json.               |
+--------------------------------+-------------------------------------+

Request parameters

+------------+---------------------------------------------------------+
| **P        | **Details**                                             |
| arameter** |                                                         |
+------------+---------------------------------------------------------+
| {offset}   | -   Required                                            |
|            |                                                         |
|            | -   Type: Number                                        |
|            |                                                         |
|            | -   Description: The number of items to skip before     |
|            |     starting to collect the result set. The first       |
|            |     element starts at 0.                                |
|            |                                                         |
|            | -   Example: 0                                          |
+------------+---------------------------------------------------------+
| {limit}    | -   Required                                            |
|            |                                                         |
|            | -   Type: Number                                        |
|            |                                                         |
|            | -   Description: The number of elements to be returned. |
|            |                                                         |
|            | -   Example: 2                                          |
+------------+---------------------------------------------------------+
| {inte      | -   Required                                            |
| grationId} |                                                         |
|            | -   Type: String                                        |
|            |                                                         |
|            | -   Description: the Integration ID.                    |
|            |                                                         |
|            | -   Example: fe40dc5793084f7dbb685cffe6a5ad2a           |
+------------+---------------------------------------------------------+

Request body

None

Response headers

Content-Type: application/json

Response 200 Body

{

    \"status\": {

        \"code\": 200,

        \"message\": \"Success\"

    },

    \"history_of_runs\":

        {

            \"integrationId\": \"fe40dc57-9308-4f7d-bb68-5cffe6a5ad2a\",

            \"name\": \"sample import integration\",

            \"schedule\": null,

\"workspaceId\": \"8a80db657068fjef01718955f3b3390b\", 

\"modelId\": \"E559BFF3B1GD4RKE874P745BEL259711\",

            \"creationDate\": \"2020-09-28T23:08:24.000Z\",

            \"modificationDate\": \"2020-09-28T23:08:26.000Z\",

            \"createdBy\": \"John Smith\",

            \"modifiedBy\": \"None\",

            \"status\": 1,

            \"notificationId\": \"a72d86ac0a9c454aa8baf67c1db67486\",

            \"runs\": \[

                {

                    \"id\": \"hy40d89893084f0dkb985cmme9i5io2a\",

                    \"triggeredBy\": \"John Smith\",

                    \"lastRun\": \"2020-09-28T23:09:31.000Z\",

                    \"startDate\": \"2020-09-28T23:09:31.000Z\",

                    \"endDate\": \"2020-09-28T23:13:07.000Z\",

                    \"success\": true,

                    \"message\": \"Success\",

                    \"executionErrorCode\": null

                }

            \],

            \"totalRuns\": 1

        },

    \"meta\": {

        \"schema\":
\"https://api.cloudworks.anaplan.com/2/0/integrations/objects/runs\"

    }

}

Get integration run errors

/integrations/runerror/{runId}

Use this call to review error messages from the integration run.

Request

curl -X GET
[']{dir="rtl"}https://api.cloudworks.anaplan.com/2/0/integrations/runerror/{runId}
\\

-H [']{dir="rtl"}Authorization: AnaplanAuthToken
{anaplan_auth_token}[']{dir="rtl"} \\

-H [']{dir="rtl"}Content-Type: application/json[']{dir="rtl"}

Request headers

+--------------------------------+-------------------------------------+
| **Header**                     | **Details**                         |
+--------------------------------+-------------------------------------+
| Authorization:                 | -   Required                        |
| AnaplanAuthToken               |                                     |
| {anaplan_auth_token}           | -   Description: the Anaplan        |
|                                |     authentication token            |
+--------------------------------+-------------------------------------+
| Content-Type                   | -   Required                        |
|                                |                                     |
|                                | -   Description: This call uses a   |
|                                |     content type of                 |
|                                |     application/json.               |
+--------------------------------+-------------------------------------+

Request parameters

+-----------+----------------------------------------------------------+
| **Pa      | **Details**                                              |
| rameter** |                                                          |
+-----------+----------------------------------------------------------+
| {runId}   | -   Required                                             |
|           |                                                          |
|           | -   Type: String                                         |
|           |                                                          |
|           | -   Description: the run ID.                             |
|           |                                                          |
|           | -   Example: hy40d89893084f0dkb98-5cmme9i5io2a           |
+-----------+----------------------------------------------------------+

Request body

None

Response headers

Content-Type: application/json

Response 200 Body

{

\"status\":{

     \"code\":200,

     \"message\":\"Success\"

  },

  \"runs\":\[

     {

        \"id\":\"hy40d89893084f0dkb985cmme9i5io2a\",

        \"errorMessages\":\[

           {

              \"errorMessage\":\[

                 {

                    \"localMessageText\":\"test e2e: 13 (0/13) rows
successful, 0 (0/0) rows has warnings, 2 failed, 0 ignored\",

                    \"occurrences\":0,

                    \"type\":\"hierarchyRowsProcessedWithFailures\",

                    \"values\":\[\]

                 }

              \],

 \"actionId\": \"112000000011\",

\"actionName\": \"sample import action\",

\"failureDumpGenerated\": true,

           }

        \],

        \"taskId\":\"F4AF7C7C03C145D6A2CDC6E194EFB392\",

        \"creationDate\":\"2020-09-29T04:05:12.000Z\",

        \"modificationDate\":\"2020-09-29T04:05:12.000Z\",

        \"createdBy\":\"John Smith\",

        \"modifiedBy\":\"None\"

     }

  \],

  \"meta\":{

    
\"schema\":\"https://api.cloudworks.anaplan.com/2/0/integrations/objects/runerror\"

  }

}

**Note**: The taskId is the identifier for a specific import or export
task.

Get run status

/integrations/run/{runId}

Use this call to get the status of a specific integration run.

Request

curl -X GET
[']{dir="rtl"}https://api.cloudworks.anaplan.com/2/0/integrations/run/{runId}[']{dir="rtl"}
\\

-H [']{dir="rtl"}Authorization: AnaplanAuthToken
{token_value}[']{dir="rtl"} \\

-H [']{dir="rtl"}Content-Type: application/json[']{dir="rtl"}

Request headers

+--------------------------------+-------------------------------------+
| **Header**                     | **Details**                         |
+--------------------------------+-------------------------------------+
| Authorization:                 | -   Required                        |
| AnaplanAuthToken               |                                     |
| {anaplan_auth_token}           | -   Description: the Anaplan        |
|                                |     authentication token            |
+--------------------------------+-------------------------------------+
| Content-Type                   | -   Required                        |
|                                |                                     |
|                                | -   Description: This call uses a   |
|                                |     content type of                 |
|                                |     application/json.               |
+--------------------------------+-------------------------------------+

Request parameters

+------------+---------------------------------------------------------+
| **P        | **Details**                                             |
| arameter** |                                                         |
+------------+---------------------------------------------------------+
| {runId}    | -   Required                                            |
|            |                                                         |
|            | -   Type: String                                        |
|            |                                                         |
|            | -   Description: the run ID.                            |
|            |                                                         |
|            | -   Example: hy40d89893084f0dkb985cmme9i5io2a           |
+------------+---------------------------------------------------------+

Request body

None

Response headers

Content-Type: application/json

Response 200 Body

{

   \"status\":{

      \"code\":200,

      \"message\":\"Success\"

   },

   \"run\":{

        \"id\": \"hy40d89893084f0dkb98-5cmme9i5io2a\",

        \"integrationId\": \"fe40dc5793084f7dbb68-5cffe6a5ad2a\",

        \"startDate\": \"2020-09-29T04:05:20.000Z\",

        \"endDate\": \"2020-09-29T04:05:25.000Z\",

        \"success\": true,

        \"message\": \"Success\",

        \"creationDate\": \"2020-09-29T04:05:12.000Z\",

        \"modificationDate\": \"2020-09-29T04:05:15.000Z\",

        \"createdBy\": \"John Smith\",

        \"modifiedBy\": \"John Smith\",

        \"executionErrorCode\": null

      },

   \"meta\":{

     
\"schema\":\"https://api.cloudworks.anaplan.com/2/0/integrations/objects/run\"

   }

}

**Note**: If the [']{dir="rtl"}success[']{dir="rtl"} parameter is false,
contact to Anaplan support with the value of executionErrorCode , to
diagnose the root cause of failure.

Notification configurations

Get a notification configuration

/integrations/notification/{notificationId}

Use this to get your notification configuration details.

Request

curl -X **GET**
\'https://api.cloudworks.anaplan.com/2/0/integrations/notification/{notificationId}\'
\\

-H [']{dir="rtl"}**Authorization**: AnaplanAuthToken
{token_value}[']{dir="rtl"} \\

-H [']{dir="rtl"}Content-**Type**: application/json[']{dir="rtl"}

Request headers

+----------------------------+-----------------------------------------+
| **Header**                 | **Details**                             |
+----------------------------+-----------------------------------------+
| Authorization:             | -   Required                            |
| AnaplanAuthToken           |                                         |
| {anaplan_auth_token}       | -   Description: the Anaplan            |
|                            |     authentication token                |
+----------------------------+-----------------------------------------+
| Content-Type               | -   Required                            |
|                            |                                         |
|                            | -   Description: This indicates the     |
|                            |     preferred response                  |
|                            |     is application/json format.         |
+----------------------------+-----------------------------------------+

Request parameters

None

Response headers

Content-Type: application/json

Response 200 Body

{

\"status\": {

\"code\": 200,

\"message\": \"Success\"

},

\"notifications\": {

\"notificationId\": \"067d1426ac964a7cac871c87790c4555\",

\"integrationIds\": \[

\"214a2ac51e5a479aafd49e9228334515\"

\],

\"channels\": \[

\"email\",

\"in_app\"

\],

\"notifications\": {

\"config\": \[

{

\"type\": \"success\",

\"users\": \[

{

\"userGuid\": \"2c9ba1b6729b7fd80172c3f635db40f7\",

\"firstName\": \"John\",

\"lastName\": \"Smith\"

}

\]

},

{

\"type\": \"partial_failure\",

\"users\": \[

{

\"userGuid\": \"2c9ba1b6729b7fd80172c3f635db40f7\",

\"firstName\": \"John\",

\"lastName\": \"Smith\"

}

\]

},

{

\"type\": \"full_failure\",

\"users\": \[

{

\"userGuid\": \"2c9ba1b6729b7fd80172c3f635db40f7\",

\"firstName\": \"John\",

\"lastName\": \"Smith\"

}

\]

}

\]

}

},

\"meta\": {

\"schema\":
\"https://api.cloudworks.anaplan.com/2/0/integrations/objects/notification\"

}

}

Create a notification configuration

/integrations/notification

Use this call to cofigure a new integration notification.

Request

curl -X POST
[']{dir="rtl"}https://api.cloudworks.anaplan.com/2/0/integrations/notification[']{dir="rtl"}
\\

-H [']{dir="rtl"}Authorization: AnaplanAuthToken
{anaplan_auth_token}[']{dir="rtl"} \\

-H [']{dir="rtl"}Content-Type: application/json[']{dir="rtl"}

Request headers

+----------------------------+-----------------------------------------+
| **Header**                 | **Details**                             |
+----------------------------+-----------------------------------------+
| Authorization:             | -   Required                            |
| AnaplanAuthToken           |                                         |
| {anaplan_auth_token}       | -   Description: the Anaplan            |
|                            |     authentication token                |
+----------------------------+-----------------------------------------+
| Content-Type               | -   Required                            |
|                            |                                         |
|                            | -   Description: This indicates the     |
|                            |     preferred response                  |
|                            |     is application/json format.         |
+----------------------------+-----------------------------------------+

Request parameters

None

Request body

{

\"integrationIds\": \[

\"214a2ac51e5a479aafd49e9228334515\"

\],

\"channels\": \[

\"email\",

\"in_app\"

\],

\"notifications\": {

\"config\": \[

{

\"type\": \"success\",

\"users\": \[

\"2c9ba1b6729b7fd80172c3f635db40f7\"

\]

},

{

\"type\": \"full_failure\",

\"users\": \[

\"2c9ba1b6729b7fd80172c3f635db40f7\"

\]

},

{

\"type\": \"partial_failure\",

\"users\": \[

\"2c9ba1b6729b7fd80172c3f635db40f7\"

\]

}

\]

}

}

+-----------+----------------------------------------------------------+
| **JSON**  | **Details**                                              |
+-----------+----------------------------------------------------------+
| integ     | -   Required                                             |
| rationIds |                                                          |
|           | -   Array                                                |
|           |                                                          |
|           | -   Description: integrationId for which the             |
|           |     notification configuration needs to be created.      |
|           |     Currently supports only a single integrationId.      |
|           |                                                          |
|           | -   Example: \[\"214a2ac51e5a479aafd49e9228334515\"\]    |
+-----------+----------------------------------------------------------+
| channels  | -   Required                                             |
|           |                                                          |
|           | -   Array                                                |
|           |                                                          |
|           | -   Description: The channel via which you want to       |
|           |     receive a notification.                              |
|           |                                                          |
|           | Example: \[\"email\",\"in_app\"\]                        |
+-----------+----------------------------------------------------------+
| config    | -   Required                                             |
|           |                                                          |
|           | -   Array                                                |
|           |                                                          |
|           | -   Description: Consists of type and users.             |
|           |                                                          |
|           | Example: \[{\"type\": \"success\",\"users\":             |
|           | \[\"2c9ba1b6729b7fd80172c3f635db40f7\"\]                 |
+-----------+----------------------------------------------------------+
| type      | -   Required                                             |
|           |                                                          |
|           | -   String as part of config                             |
|           |                                                          |
|           | -   Description: Integration completion status that      |
|           |     needs to be notified.                                |
|           |                                                          |
|           | -   Example: success, full_failure, partial_failure      |
+-----------+----------------------------------------------------------+
| users     | -   Required                                             |
|           |                                                          |
|           | -   Array as part of config                              |
|           |                                                          |
|           | -   Description: array of userGuids(limit 5 per type) of |
|           |     the user who receives the notification               |
|           |                                                          |
|           | -   Examples: 2c9ba1b6729b7fd80172c3f635db40f7           |
+-----------+----------------------------------------------------------+

Response headers

Content-Type: application/json

Response 200 Body

{

\"status\": {

\"code\": 200,

\"message\": \"Success\"

},

\"notification\": {

\"notificationId\": \"37945d3f7543463a859949e690dc4b60\"

}

}

Edit a notification configuration

integrations/notifications/{notificationId}

Use this call to edit the configuration of an integration notification.

Request

curl -X PUT
[']{dir="rtl"}https://api.cloudworks.anaplan.com/2/0/integrations/notification/{notificationId}[']{dir="rtl"}
\\

-H [']{dir="rtl"}Authorization: AnaplanAuthToken
{token_value}[']{dir="rtl"} \\

-H [']{dir="rtl"}Content-Type: application/json[']{dir="rtl"} \\

-d [']{dir="rtl"}{request body}\'

Request headers

+----------------------------+-----------------------------------------+
| **Header**                 | **Details**                             |
+----------------------------+-----------------------------------------+
| Authorization:             | -   Required                            |
| AnaplanAuthToken           |                                         |
| {anaplan_auth_token}       | -   Description: the Anaplan            |
|                            |     authentication token                |
+----------------------------+-----------------------------------------+
| Content-Type               | -   Required                            |
|                            |                                         |
|                            | -   Description: This indicates the     |
|                            |     preferred response                  |
|                            |     is application/json format.         |
+----------------------------+-----------------------------------------+

Request parameters

+-------------------+--------------------------------------------------+
| **Parameter**     | **Details**                                      |
+-------------------+--------------------------------------------------+
| {notificationId}  | -   Required                                     |
|                   |                                                  |
|                   | -   Type: String                                 |
|                   |                                                  |
|                   | -   Description: The notification ID             |
|                   |                                                  |
|                   | -   Example: 067d1426ac964a7cac871c87790c4555    |
+-------------------+--------------------------------------------------+

Request body

{

\"integrationIds\": \[

\"214a2ac51e5a479aafd49e9228334515\"

\],

\"channels\": \[

\"email\",

\"in_app\"

\],

\"notifications\": {

\"config\": \[

{

\"type\": \"success\",

\"users\": \[

\"2c9ba1b6729b7fd80172c3f635db40f7\"

\]

},

{

\"type\": \"full_failure\",

\"users\": \[

\"2c9ba1b6729b7fd80172c3f635db40f7\"

\]

},

{

\"type\": \"partial_failure\",

\"users\": \[

\"2c9ba1b6729b7fd80172c3f635db40f7\"

\]

}

\]

}

}

+-----------+----------------------------------------------------------+
| **JSON**  | **Details**                                              |
+-----------+----------------------------------------------------------+
| integ     | -   Required                                             |
| rationIds |                                                          |
|           | -   Array                                                |
|           |                                                          |
|           | -   Description: integrationId for which the             |
|           |     notification configuration needs to be created.      |
|           |                                                          |
|           | -                                                        |
|           |   Example: \[\"214a2ac51e5a479aafd49e9228334515\"\]\</li |
+-----------+----------------------------------------------------------+
| channels  | -   Required                                             |
|           |                                                          |
|           | -   Array                                                |
|           |                                                          |
|           | -   Description: The channel via which you want to       |
|           |     receive a notification.                              |
|           |                                                          |
|           | Example: \[\"email\",\"in_app\"\]                        |
+-----------+----------------------------------------------------------+
| config    | -   Required                                             |
|           |                                                          |
|           | -   Array                                                |
|           |                                                          |
|           | -   Description: Consists of type and users.             |
|           |                                                          |
|           | Example: \[{\"type\": \"success\",\"users\":             |
|           | \[\"2c9ba1b6729b7fd80172c3f635db40f7\"\]                 |
+-----------+----------------------------------------------------------+
| type      | -   Required                                             |
|           |                                                          |
|           | -   String as part of config                             |
|           |                                                          |
|           | -   Description: Integration completion status that      |
|           |     needs to be notified.                                |
|           |                                                          |
|           | -   Example: success, full_failure, partial_failure      |
+-----------+----------------------------------------------------------+
| users     | -   Required                                             |
|           |                                                          |
|           | -   Array as part of config                              |
|           |                                                          |
|           | -   Description: array of userGuids(limit 5 per type) of |
|           |     the user who receives the notification               |
|           |                                                          |
|           | -   Examples: 2c9ba1b6729b7fd80172c3f635db40f7           |
+-----------+----------------------------------------------------------+

Response headers

Content-Type: application/json

Response 200 Body

{

\"status\": {

\"code\": 200,

\"message\": \"Success\"

}

}

Delete a notification configuration

/integrations/notification/{notificationId}

Use this call to delete an integration notification.

Request

curl -X DELETE
https://api.cloudworks.anaplan.com/2/0/integrations/notification/{notificationId}
\\

-H [']{dir="rtl"}Authorization: AnaplanAuthToken
{token_value}[']{dir="rtl"} \\

-H [']{dir="rtl"}Content-Type: application/json[']{dir="rtl"}

Request headers

+----------------------------+-----------------------------------------+
| **Header**                 | **Details**                             |
+----------------------------+-----------------------------------------+
| Authorization:             | -   Required                            |
| AnaplanAuthToken           |                                         |
| {anaplan_auth_token}       | -   Description: the Anaplan            |
|                            |     authentication token                |
+----------------------------+-----------------------------------------+
| Content-Type               | -   Required                            |
|                            |                                         |
|                            | -   Description: This indicates the     |
|                            |     preferred response                  |
|                            |     is application/json format.         |
+----------------------------+-----------------------------------------+

Request parameters

+------------------+---------------------------------------------------+
| **Parameter**    | **Details**                                       |
+------------------+---------------------------------------------------+
| {runId}/dumps}   | -   Required                                      |
|                  |                                                   |
|                  | -   Type: String                                  |
|                  |                                                   |
|                  | -   Description: The notification ID              |
|                  |                                                   |
|                  | -   Example: 067d1426ac964a7cac871c87790c4555     |
+------------------+---------------------------------------------------+

Response headers

Content-Type: application/json

Response 200 Body

{

\"status\": {

\"code\": 200,

\"message\": \"Success\"

}

}

Error logs

Get an import error log

/integrations/run/{runId}/dumps

Use this call to get an import error log.

Request

curl -X GET
https://api.cloudworks.anaplan.com/2/0/integrations/run/{runId}/dumps \\

-H [']{dir="rtl"}Authorization: AnaplanAuthToken
{token_value}[']{dir="rtl"} \\

-H [']{dir="rtl"}Content-Type: application/json[']{dir="rtl"}

Response 200 Body

{

    \"status\": {

        \"code\": 200,

        \"message\": \"Success\"

    }

}

Example dumpfile (error log):

\"Demo List\",\"name\",\"email\",\"planet\",\"\_Line\_\",\"\_Error_1\_\"

\"a\",\"\",\"junk\",\"\",\"2\",\"Invalid number: junk\"

\"b\",\"\",\"twelve\",\"\",\"3\",\"Invalid number: twelve\"

\"c\",\"eight\",\"\",\"\",\"4\",\"Invalid number: eight\"

\"d\",\"night\",\"\",\"\",\"5\",\"Invalid number: night\"

Get a process error log

/integrations/run/{runId}/process/import/{actionId}/dumps

Use this call to get a process error log.

Request

curl -X GET
https://api.cloudworks.anaplan.com/2/0/integrations/run/{runId}/process/import/{actionId}/dumps
\\

-H [']{dir="rtl"}Authorization: AnaplanAuthToken
{token_value}[']{dir="rtl"} \\

-H [']{dir="rtl"}Content-Type: application/json[']{dir="rtl"}

Response 200 Body

{

    \"status\": {

        \"code\": 200,

        \"message\": \"Success\"

    }

}

Example dumpfile (error log):

\"Demo List\",\"name\",\"email\",\"planet\",\"\_Line\_\",\"\_Error_1\_\"

\"a\",\"\",\"junk\",\"\",\"2\",\"Invalid number: junk\"

\"b\",\"\",\"twelve\",\"\",\"3\",\"Invalid number: twelve\"

\"c\",\"eight\",\"\",\"\",\"4\",\"Invalid number: eight\"

\"d\",\"night\",\"\",\"\",\"5\",\"Invalid number: night\"

Integration Flows

Create a new integration flow

/integrationflows

Use this call to create a new integration flow for Anaplan CloudWorks.

Request

curl -X POST
[']{dir="rtl"}https://api.cloudworks.anaplan.com/2/0/integrationflows[']{dir="rtl"}
\\

-H [']{dir="rtl"}Authorization: AnaplanAuthToken
{anaplan_auth_token}[']{dir="rtl"} \\

-H [']{dir="rtl"}Content-Type: application/json[']{dir="rtl"}

Request headers

+----------------------------+-----------------------------------------+
| **Header**                 | **Details**                             |
+----------------------------+-----------------------------------------+
| Authorization:             | -   Required                            |
| AnaplanAuthToken           |                                         |
| {anaplan_auth_token}       | -   Description: the Anaplan            |
|                            |     authentication token                |
+----------------------------+-----------------------------------------+
| Content-Type               | -   Required                            |
|                            |                                         |
|                            | -   Description: This indicates the     |
|                            |     preferred response                  |
|                            |     is application/json format.         |
+----------------------------+-----------------------------------------+

Request parameters

None

Request body

{

\"name\": \"test-integration-flow-name\",

\"version\": \"2.0\",

\"type\": \"IntegrationFlow\",

\"steps\": \[

{

\"type\": \"Integration\",

\"referrer\": \"step_integration_id_1\",

\"isSkipped\": false,

\"exceptionBehavior\": \[

{

\"type\": \"failure\",

\"strategy\": \"stop\"

}

\]

},

{

\"type\": \"Integration\",

\"referrer\": \"step_integration_id_2\",

\"dependsOn\": \[

\"step_integration_id_1\"

\],

\"isSkipped\": false,

\"exceptionBehavior\": \[

{

\"type\": \"failure\",

\"strategy\": \"stop\"

}

\]

}

\]

}

+--------------+-------------------------------------------------------+
| **JSON**     | **Details**                                           |
+--------------+-------------------------------------------------------+
| name         | -   Required                                          |
|              |                                                       |
|              | -   String as part of the request body                |
|              |                                                       |
|              | -   Description: The name of Integration Flow         |
+--------------+-------------------------------------------------------+
| version      | -   Required                                          |
|              |                                                       |
|              | -   String as part of the the request body            |
|              |                                                       |
|              | -   Description: Resource schema version              |
|              |                                                       |
|              | -   Examples: 2.0                                     |
+--------------+-------------------------------------------------------+
| steps        | -   Required                                          |
|              |                                                       |
|              | -   Array                                             |
|              |                                                       |
|              | -   Description: Consists of step details. Min. items |
|              |     2.                                                |
+--------------+-------------------------------------------------------+
| type         | -   Required                                          |
|              |                                                       |
|              | -   Description: Type of Resource.                    |
|              |                                                       |
|              | -   Examples: IntegrationFlow                         |
+--------------+-------------------------------------------------------+
| referrer     | -   Required                                          |
|              |                                                       |
|              | -   String as part of the steps array                 |
|              |                                                       |
|              | -   Description: The step integration id              |
+--------------+-------------------------------------------------------+
| dependsOn    | -   Required                                          |
|              |                                                       |
|              | -   Array                                             |
|              |                                                       |
|              | -   Description: Step ID or previous step e.g. step 2 |
|              |     depends on step 1 so step2.dependsOn =            |
|              |     \[step_integration_1_id\]                         |
+--------------+-------------------------------------------------------+
| type         | -   Required                                          |
|              |                                                       |
|              | -   String as part of the steps array                 |
|              |                                                       |
|              | -   Description: The step resrouce type               |
|              |                                                       |
|              | -   Examples: Integration                             |
+--------------+-------------------------------------------------------+
| isSkipped    | -   Required                                          |
|              |                                                       |
|              | -   String as part of the steps array                 |
|              |                                                       |
|              | -   Description: Skip the step.                       |
|              |                                                       |
|              | -   Expected value: true \| false (default)           |
+--------------+-------------------------------------------------------+
| excep        | -   Required                                          |
| tionBehavior |                                                       |
|              | -   Array as part of the steps array                  |
|              |                                                       |
|              | -   Description: If flow step is not successful, this |
|              |     parameter defines the flow behavior               |
|              |                                                       |
|              | -   Expected: \[{ type: failure, strategy: stop       |
|              |     (default) \| continue }, { type: partial_succes,  |
|              |     strategy: continue (default) \| stop }\]          |
+--------------+-------------------------------------------------------+

Response headers

Content-Type: application/json

Response 200 Body

{

    \"status\": {

        \"code\": 200,

        \"message\": \"Success\"

    },

    \"integrationFlow\": {

        \"integrationFlowId\": \"fe40dc5793084f7dbb685cffe6a5ad2a\"

    }

}

Run an integration flow

/integrationflows[']{dir="rtl"}/{integrationFlowId}/run

Use this call to run an integration flow.

Request

curl -X POST
[']{dir="rtl"}https://api.cloudworks.anaplan.com/2/0/integrationflows/{integrationFlowId}/run[']{dir="rtl"}
\\

-H [']{dir="rtl"}Authorization: AnaplanAuthToken
{anaplan_auth_token}[']{dir="rtl"} \\

-H [']{dir="rtl"}Content-Type: application/json[']{dir="rtl"}

Request headers

+--------------------------------+-------------------------------------+
| **Header**                     | **Details**                         |
+--------------------------------+-------------------------------------+
| Authorization:                 | -   Required                        |
| AnaplanAuthToken               |                                     |
| {anaplan_auth_token}           | -   Description: the Anaplan        |
|                                |     authentication token            |
+--------------------------------+-------------------------------------+
| Content-Type                   | -   Required                        |
|                                |                                     |
|                                | -   Description: This call uses a   |
|                                |     content type of                 |
|                                |     application/json.               |
+--------------------------------+-------------------------------------+

Request parameters

+---------------------+------------------------------------------------+
| **Parameter**       | **Details**                                    |
+---------------------+------------------------------------------------+
| {integrationFlowId} | -   Required                                   |
|                     |                                                |
|                     | -   Type: String                               |
|                     |                                                |
|                     | -   Description: the integration flow ID       |
|                     |                                                |
|                     | -   Example: fe40dc5793084f7dbb685cffe6a5ad2a  |
+---------------------+------------------------------------------------+

Request body:

{

\"stepsToRun\": \[\"step_ids\...\"\]

}

+---------+------------------------------------------------------------+
| *       | **Details**                                                |
| *JSON** |                                                            |
+---------+------------------------------------------------------------+
| ste     | -   Optional                                               |
| psToRun |                                                            |
|         | -   Array of IDs of Steps to Run as part of Integration    |
|         |     Flow Run                                               |
|         |                                                            |
|         | -   Description: Array of IDs of Steps (Can be subset of   |
|         |     All steps) to Run as part of Integration Flow Run.     |
|         |                                                            |
|         | -   Example: \[fe40dc5793084f7dbb685cffe6a5ad2a\]          |
+---------+------------------------------------------------------------+

Response headers

Content-Type: application/json

Response 200 Body

{

\"status\": {

        \"code\": 200,

        \"message\": \"Success\"

    },

    \"run\": {

        \"id\": \"hy40d89893084f0dkb985cmme9i5io2a\"

    }

   

}

Get all integration flows

/integrationflows

Use this call to retrieve all your integration flows.

Request

curl -X GET
[']{dir="rtl"}https://api.cloudworks.anaplan.com/2/0/integrationflows \\

-H [']{dir="rtl"}Authorization: AnaplanAuthToken
{anaplan_auth_token}[']{dir="rtl"} \\

-H [']{dir="rtl"}Content-Type: application/json[']{dir="rtl"}

Request headers

+----------------------------+-----------------------------------------+
| **Header**                 | **Details**                             |
+----------------------------+-----------------------------------------+
| Authorization:             | -   Required                            |
| AnaplanAuthToken           |                                         |
| {anaplan_auth_token}       | -   Description: the Anaplan            |
|                            |     authentication token                |
+----------------------------+-----------------------------------------+
| Content-Type               | -   Required                            |
|                            |                                         |
|                            | -   Description: This indicates the     |
|                            |     preferred response                  |
|                            |     is application/json format.         |
+----------------------------+-----------------------------------------+

Request parameters

+-------------+--------------------------------------------------------+
| **          | **Details**                                            |
| Parameter** |                                                        |
+-------------+--------------------------------------------------------+
| {offset}    | -   Optional                                           |
|             |                                                        |
|             | -   Type: Number                                       |
|             |                                                        |
|             | -   Description: The number of items to skip before    |
|             |     starting to collect the result set. The first      |
|             |     element starts at 0.                               |
|             |                                                        |
|             | -   Example: 0                                         |
+-------------+--------------------------------------------------------+
| {limit}     | -   Optional                                           |
|             |                                                        |
|             | -   Type: Number                                       |
|             |                                                        |
|             | -   Description: The number of elements to return.     |
|             |                                                        |
|             | -   Example: 10                                        |
+-------------+--------------------------------------------------------+
| {myIn       | -   Optional                                           |
| tegrations} |                                                        |
|             | -   Type: Number                                       |
|             |                                                        |
|             | -   Description: Returns the list of current users\'s  |
|             |     integrations if its value is 1.                    |
|             |                                                        |
|             | -   Example: 1                                         |
+-------------+--------------------------------------------------------+

**Note**: if this call does not provide {offset} or {limit}, it
retrieves 25 integrations.

Request body

None

Response headers

Content-Type: application/json

Response 200 Body

{

\"status\": {

\"code\": 200,

\"message\": \"Success\"

},

\"integrationFlows\": \[

{

\"id\": \"fe40dc5793084f7dbb685cffe6a5ad2a\",

\"name\": \"Sample Integration flow\",

\"createdBy\": \"user\",

\"creationDate\": \"2023-02-09T07:42:11.091Z\",

\"modificationDate\": \"2023-02-09T07:42:11.091Z\",

\"modifiedBy\": \"user\",

\"notificationId\": \"3fa85f6457174562b3fc2c963f66afa6\",

\"stepsCount\": 10,

\"latestRun\": {

\"id\": \"hy40d89893084f0dkb985cmme9i5io2a\",

                \"triggeredBy\": \"John Smith\",

                \"lastRun\": \"2020-09-28T23:09:31.000Z\",

                \"startDate\": \"2020-09-28T23:09:31.000Z\",

                \"endDate\": \"2020-09-28T23:13:07.000Z\",

                \"success\": true,

                \"message\": \"Success\",

                \"executionErrorCode\": null

}

}

\],

\"meta\": {

\"paging\": {

\"currentPageSize\": 1,

\"totalSize\": 1,

\"offset\": 0

},

\"schema\":
\"https://api.anaplan.com/cloudworks/2/0/integrations/objects/integrationflows\"

}

Get integration flows by integration ID

/integrationflows/{integrationFlowId}

Use this call to get details for a specific integration flow.

Request

curl -X GET
[']{dir="rtl"}https://api.cloudworks.anaplan.com/2/0/integrationflows/{integrationFlowId}[']{dir="rtl"}
\\

-H [']{dir="rtl"}Authorization: AnaplanAuthToken
{anaplan_auth_token}[']{dir="rtl"} \\

-H [']{dir="rtl"}Content-Type: application/json[']{dir="rtl"} \\

Request headers

+--------------------------------+-------------------------------------+
| **Header**                     | **Details**                         |
+--------------------------------+-------------------------------------+
| Authorization:                 | -   Required                        |
| AnaplanAuthToken               |                                     |
| {anaplan_auth_token}           | -   Description: the Anaplan        |
|                                |     authentication token            |
+--------------------------------+-------------------------------------+
| Content-Type                   | -   Required                        |
|                                |                                     |
|                                | -   Description: This call uses a   |
|                                |     content type of                 |
|                                |     application/json.               |
+--------------------------------+-------------------------------------+

Request parameters

+-------------------+---------------------------------------------------+
| **Parameter**     | **Details**                                       |
+-------------------+---------------------------------------------------+
| {integrationId}   | -   Required                                      |
|                   |                                                   |
|                   | -   Type: String                                  |
|                   |                                                   |
|                   | -   Description: the Integration ID.              |
|                   |                                                   |
|                   | -   Example: fe40dc5793084f7dbb685cffe6a5ad2a     |
+-------------------+---------------------------------------------------+

Request body

None

Response headers

Content-Type: application/json

Response 200 Body

{

\"status\": {

\"code\": 200,

\"message\": \"Success\"

},

\"integrationFlow\": {

\"id\": \"fe40dc5793084f7dbb685cffe6a5ad2a\",

\"name\": \"Sample Integration Flow\",

\"createdBy\": \"user\",

\"creationDate\": \"2023-02-09T07:47:13.165Z\",

\"modificationDate\": \"2023-02-09T07:47:13.165Z\",

\"modifiedBy\": \"user\",

\"stepsCount\": 2,

\"notificationId\": \"3fa85f6457174562b3fc2c963f66afa6\",

\"steps\": \[

{

\"referrer\": \"step_integration_1_id\",

\"name\": \"sample Integration\",

\"createdBy\": \"user\",

\"createdDate\": \"2023-02-09T07:47:13.165Z\",

\"modifiedDate\": \"2023-02-09T07:47:13.165Z\",

\"modifiedBy\": \"user\",

\"dependsOn\": \[\"3fa85f64-5717-4562-b3fc-2c963f66afa6\"\],

\"type\": \"Process\",

\"exceptionBehavior\": \[

{

\"type\": \"failure\",

\"strategy\": \"stop\"

}

\],

\"isSkipped\": false,

\"workspaceId\": \"8a8196a36f9ff1cb017018c7b3f24756\",

\"modelId\": \"5BED7528B6884794AEEE705BC3E77EA3\",

\"accessible\": false,

\"latestRun\": {

\"triggeredBy\": \"user\",

\"success\": true,

\"message\": \"Success\",

\"lastRun\": \"2020-09-28T23:09:31.000Z\",

    \"startDate\": \"2020-09-28T23:09:31.000Z\",

            \"endDate\": \"2020-09-28T23:13:07.000Z\",

\"executionErrorCode\": null

}

},

{

\"referrer\": \"step_integration_2_id\",

\"name\": \"sample Integration\",

\"createdBy\": \"user\",

\"createdDate\": \"2023-02-09T07:47:13.165Z\",

\"modifiedDate\": \"2023-02-09T07:47:13.165Z\",

\"modifiedBy\": \"user\",

\"dependsOn\": \[\"step_integration_1_id\"\],

\"type\": \"Process\",

\"exceptionBehavior\": \[

{

\"type\": \"failure\",

\"strategy\": \"stop\"

}

\],

\"isSkipped\": false,

\"workspaceId\": \"8a8196a36f9ff1cb017018c7b3f24756\",

\"modelId\": \"5BED7528B6884794AEEE705BC3E77EA3\",

\"accessible\": false,

\"latestRun\": {

\"triggeredBy\": \"user\",

\"success\": true,

\"message\": \"Success\",

\"lastRun\": \"2020-09-28T23:09:31.000Z\",

    \"startDate\": \"2020-09-28T23:09:31.000Z\",

            \"endDate\": \"2020-09-28T23:13:07.000Z\",

\"executionErrorCode\": null

}

}

\],

\"latestRun\": {

\"triggeredBy\": \"user\",

\"success\": true,

\"message\": \"Success\",

\"lastRun\": \"2020-09-28T23:09:31.000Z\",

\"startDate\": \"2020-09-28T23:09:31.000Z\",

\"endDate\": \"2020-09-28T23:13:07.000Z\",

\"executionErrorCode\": null

}

},

\"meta\": {

\"schema\":
\"https://api.cloudworks.anaplan.com/2/0/integrations/objects/integrationflows\"

}

}

Edit an integration flow

/integrationflows/{integrationFlowId}

Use this call to edit an integration flow.

Request

 curl -X PUT
[']{dir="rtl"}https://api.cloudworks.anaplan.com/2/0/integrationflows/{integrationFlowId}[']{dir="rtl"}
\\

-H [']{dir="rtl"}Authorization: AnaplanAuthToken
{anaplan_auth_token}[']{dir="rtl"} \\

-H [']{dir="rtl"}Content-Type: application/json[']{dir="rtl"}

Request headers

+----------------------------+-----------------------------------------+
| **Header**                 | **Details**                             |
+----------------------------+-----------------------------------------+
| Authorization:             | -   Required                            |
| AnaplanAuthToken           |                                         |
| {anaplan_auth_token}       | -   Description: the Anaplan            |
|                            |     authentication token                |
+----------------------------+-----------------------------------------+
| Content-Type               | -   Required                            |
|                            |                                         |
|                            | -   Description: This indicates the     |
|                            |     preferred response                  |
|                            |     is application/json format.         |
+----------------------------+-----------------------------------------+

Request parameters

+---------------------+------------------------------------------------+
| **Parameter**       | **Details**                                    |
+---------------------+------------------------------------------------+
| {integrationFlowId} | -   Required                                   |
|                     |                                                |
|                     | -   Type: String                               |
|                     |                                                |
|                     | -   Description: The integration flow ID       |
|                     |                                                |
|                     | -   Example: fe40dc5793084f7dbb685cffe6a5ad2a  |
+---------------------+------------------------------------------------+

Request body (import)

Note: For restricted integration users, the workspace ID of the
integration needs match with the workspace ID of the associated
connection.

{

\"name\": \"Updated INF Name\",

\"version\": \"2.0\",

\"type\": \"IntegrationFlow\",

\"steps\": \[

{

\"type\": \"Integration\",

\"referrer\": \"updated_step_integration_id_1\",

\"isSkipped\": false,

\"exceptionBehavior\": \[

{

\"type\": \"failure\",

\"strategy\": \"stop\"

}

\]

},

{

\"type\": \"Integration\",

\"referrer\": \"step_integration_id_2\",

\"dependsOn\": \[

\"updated_step_integration_id_1\"

\],

\"isSkipped\": false,

\"exceptionBehavior\": \[

{

\"type\": \"failure\",

\"strategy\": \"stop\"

}

\]

}

\]

}

+--------------+-------------------------------------------------------+
| **JSON**     | **Details**                                           |
+--------------+-------------------------------------------------------+
| name         | -   Required                                          |
|              |                                                       |
|              | -   String as part of the request body                |
|              |                                                       |
|              | -   Description: The name of Integration Flow         |
+--------------+-------------------------------------------------------+
| version      | -   Required                                          |
|              |                                                       |
|              | -   String as part of the the request body            |
|              |                                                       |
|              | -   Description: Resource schema version              |
|              |                                                       |
|              | -   Examples: 2.0                                     |
+--------------+-------------------------------------------------------+
| steps        | -   Required                                          |
|              |                                                       |
|              | -   Array                                             |
|              |                                                       |
|              | -   Description: Consists of step details. Min. items |
|              |     2.                                                |
+--------------+-------------------------------------------------------+
| type         | -   Required                                          |
|              |                                                       |
|              | -   Description: Type of Resource.                    |
|              |                                                       |
|              | -   Examples: IntegrationFlow                         |
+--------------+-------------------------------------------------------+
| referrer     | -   Required                                          |
|              |                                                       |
|              | -   String as part of the steps array                 |
|              |                                                       |
|              | -   Description: The step integration id              |
+--------------+-------------------------------------------------------+
| dependsOn    | -   Required                                          |
|              |                                                       |
|              | -   Array                                             |
|              |                                                       |
|              | -   Description: Step ID or previous step e.g. step 2 |
|              |     depends on step 1 so step2.dependsOn =            |
|              |     \[step_integration_1_id\]                         |
+--------------+-------------------------------------------------------+
| type         | -   Required                                          |
|              |                                                       |
|              | -   String as part of the steps array                 |
|              |                                                       |
|              | -   Description: The step resrouce type               |
|              |                                                       |
|              | -   Examples: Integration                             |
+--------------+-------------------------------------------------------+
| isSkipped    | -   Required                                          |
|              |                                                       |
|              | -   String as part of the steps array                 |
|              |                                                       |
|              | -   Description: Skip the step.                       |
|              |                                                       |
|              | -   Expected value: true \| false (default)           |
+--------------+-------------------------------------------------------+
| excep        | -   Required                                          |
| tionBehavior |                                                       |
|              | -   Array as part of the steps array                  |
|              |                                                       |
|              | -   Description: If flow step is not successful, this |
|              |     parameter defines the flow behavior               |
|              |                                                       |
|              | -   Expected: \[{ type: failure, strategy: stop       |
|              |     (default) \| continue }, { type: partial_succes,  |
|              |     strategy: continue (default) \| stop }\]          |
+--------------+-------------------------------------------------------+

Response headers

Content-Type: application/json

Response 200 Body

 {

     \"status\": {

         \"code\": 200,

         \"message\": \"Success\"

     }

 }

Delete an integration flow

/integrationflows/{integrationFlowId}

Use this call to delete an integration flow.

Request

curl -X DELETE
[']{dir="rtl"}https://api.cloudworks.anaplan.com/2/0/integrationflows/{integrationFlowId}[']{dir="rtl"}
\\

-H [']{dir="rtl"}Authorization: AnaplanAuthToken
{anaplan_auth_token}[']{dir="rtl"} \\

-H [']{dir="rtl"}Content-Type: application/json[']{dir="rtl"}

Request headers

+----------------------------+-----------------------------------------+
| **Header**                 | **Details**                             |
+----------------------------+-----------------------------------------+
| Authorization:             | -   Required                            |
| AnaplanAuthToken           |                                         |
| {anaplan_auth_token}       | -   Description: the Anaplan            |
|                            |     authentication token                |
+----------------------------+-----------------------------------------+
| Content-Type               | -   Required                            |
|                            |                                         |
|                            | -   Description: This indicates the     |
|                            |     preferred response                  |
|                            |     is application/json format.         |
+----------------------------+-----------------------------------------+

Request parameters

+---------------------+------------------------------------------------+
| **Parameter**       | **Details**                                    |
+---------------------+------------------------------------------------+
| {integrationFlowId} | -   Required                                   |
|                     |                                                |
|                     | -   Type: String                               |
|                     |                                                |
|                     | -   Description: The integration flow ID       |
|                     |                                                |
|                     | -   Example: fe40dc5793084f7dbb685cffe6a5ad2a  |
+---------------------+------------------------------------------------+

Request body

None

Response headers

Content-Type: application/json

Response 200 Body

{

   \"status\": {

       \"code\": 200,

       \"message\": \"Success\"

    }

}
