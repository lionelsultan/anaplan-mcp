Audit API

Introduction

This section contains an introduction to using the Audit API. If you
have access to the Anaplan Audit API, you can track audit events from
your Anaplan tenant into technology such as a SIEM (Security Information
and Event Management) product for alerting and tracking purposes.

URL, IP, and allowlist requirements

To set your allowlists for API calls, see: [URL, IP, and allowlist
requirements](https://support.anaplan.com/url-ip-and-allowlist-requirements-c8235c7d-8af2-413b-a9ff-d465978806b9)

API use requirements

As a best practice for using our APIs, you should be familiar with
RESTful APIs and any specific requirements for the action you are
performing. For more information, see [Anaplan API
Requirements](https://help.anaplan.com/anapedia/Content/Data_Integrations/Anaplan_API_Guide.html#APIrequirements).

Depending on the country you work in, see the Support page: [Uniform
resource
locators](https://support.anaplan.com/uniform-resource-locators-urls-aca45016-7537-475c-a8e0-35f695d4ee46) for
information on the URLs to add to your allowlist.

To test this API, use an appropriate tool you trust with your secured
credentials. If successful, the testing tool will connect to your
Anaplan production environment using your credentials.

These BYOK events are tracked:

  -------------- --------------------------------------------------------
  **Event**      **Description**

  Add guardpoint The workspace specified in the Object ID attribute was
                 encrypted.

  Add user to    A user was added to a domain while assigning them the
  domain         Encryption Admin role.

  Create         An Encryption Administrator created an encryption key in
  symmetric key  BYOK.

  Delete pending A workspace is about to be decrypted.
  guardpoint     

  Marked         A workspace was decrypted.
  guardpoint     
  pending delete 

  Switch domain  An action occurred, which required a change of domain.
                 This occurs when users log in and when the Encryption
                 Admin role is assigned to a user.

  Update key     An Encryption Admin updated the expiry date of an
                 encryption key in BYOK.

  User logged in A user logged in. The User ID attribute indicates the
                 user that logged in.
  -------------- --------------------------------------------------------

These user activity events are tracked:

User log in success

User log in failure

User log out success

User log out failure

User created

User updated

User access model success

User access model failure

User enabled

User disabled

User assigned to tenant success

User assigned to tenant failure

User removed from tenant success

User removed from tenant failure

You can use the Anaplan Audit API to pull audit event information. The
Anaplan Audit API is intended as a delivery mechanism for audit logs and
is designed for audit information to be pulled frequently so that you
can leverage your own technology for filtering, analysis, and storage.

**Note: **The Anaplan Audit is not designed to be a permanent repository
of audit events.

The content of each log varies, however the Audit API provides:

Audit logs via an API and the Anaplan Administration app;

Up to 30 days of logs;

Filtering of logs by time period and application;

Information about who carried out an operation, when it was done, and
what was done.

You can view the audit events in the Anaplan Administration app or you
can export them as a file in [Common Event Format
(CEF)](https://auditservice.docs.apiary.io/#Get-Audit-Events-CEF). For
information about CEF, see the [ArcSight Common Event Format (CEF)
Guide](https://community.softwaregrp.com/t5/ArcSight-Connectors/ArcSight-Common-Event-Format-CEF-Guide/ta-p/1589306).

**Notes: **To use the Audit API, you must be assigned the Tenant Auditor
role and the Anaplan Audit must be enabled on your tenant. Your Tenant
Administrator can assign users the Tenant Auditor role. As a Tenant
Auditor, you can also [view audit information in the Anaplan
Administration
app](https://help.anaplan.com/anapedia/default.htm#cshid=1773).

What can I do with the API?

You can use the Anaplan RESTful API to get the [audit
events](https://auditservice.docs.apiary.io/#AuditEvents) in the
database for the tenant to which your user is associated.

Getting Started

This section contains general information to help you start using the
Anaplan Audit API.

Authentication

To use this API, you must send requests using an Anaplan authentication
token. This is in the form of a JSON Web Token. This must be in the
Authorization header of the API request. For
example: Authorization:AnaplanAuthToken
{anaplan_auth_token} Where {anaplan_auth_token} is replaced with your
authentication token. For more information, see [Authentication Service
API](https://anaplanauthentication.docs.apiary.io/).

HTTPs Verbs

To carry out actions using the Anaplan API, you can use these HTTPs
verbs.

  -------------- --------------------------------------------------------
  **Verb**       **Description**

  GET            Retrieves a list of resources.

  POST           Creates or updates a resource.
  -------------- --------------------------------------------------------

cURL Examples

This API Reference includes cURL examples and responses. You can use any
application or coding language to call this API. cURL is used only as an
example and not as the definitive client for accessing this API.

If you want to ensure that the response to a curl request includes the
HTTP request headers, include the optional verbose
flag -v or \--verbose.

To view an example cURL request and server response:

Click an item in the Reference section of the navigation pane on the
left.

Click a colored the textbox in the middle pane.

In the example that appears, select cURL from the drop-down nearest the
Try button.

**Note:** Anaplan has not set up a live server for use through this
Apiary website. If you have credentials, you can use the examples in
this help system as a guide when sending requests to the server that
Anaplan has provided.

Server Responses

These are typical server responses that you might see when making an API
call.

200 OK - The response was successful.

204 No Content - The request was successful but there is no
representation to return. This means that the response is empty. This is
the expected response to a POST for tasks.

Formats

In this API documentation, all requests use the application/json format.

Paging

If your API calls return a lot of data, you can specify that results are
returned in pages. You can specify:

A limit for the number of results to return per page.

An offset to get a specific page of results starting from a particular
result.

**Notes:**

Paging specifies the number of results returned by an API request in
pages.

The limit value cannot exceed 10000, or a 204 - Requested limit is more
than the Specified limit error is returned.

See [[Display pages of
results]{.underline}](https://auditservice.docs.apiary.io/#Display-pages-results).

Reference

Audit Events

The Audit API enables you to retrieve audit events for the tenant to
which your user is associated.

Retrieve Audit Events for Tenant

/events?type=all\
Retrieves the audit events in the database for the tenant to which your
user is associated. You can retrieve results in JSON or CEF.

You can specify:

the type of events to return

the dateFrom start of a range of events to return.

the dateTo end of a range of events to return.

the intervalInHours of events to return. This specifies the number of
previous hours of events from now to return. Example: specifying 2 in
this parameter returns the previous two hours of events.

The type accepts these values:

  ------------------------ ----------------------------------------------
  **Type**                 **Description**

  all                      Returns all events.

  byok                     Returns only BYOK events.

  user_activity            Returns only user activity events.
  ------------------------ ----------------------------------------------

Retrieve Audit Events in JSON Format

Request

curl -H authorization:\'AnaplanAuthToken {anaplan_auth_token}\'

-H \"Content-Type:application/json\"
https://audit.anaplan.com/audit/api/1/events

Headers

+-------------------+--------------------------------------------------+
| **Header**        | **Details**                                      |
+-------------------+--------------------------------------------------+
| Authorization:    | -   Required                                     |
| AnaplanAuthToken  |                                                  |
| {an               | -   Description: the Anaplan authentication      |
| aplan_auth_token} |     token                                        |
+-------------------+--------------------------------------------------+
| Accept:           | -   Optional                                     |
| application/json  |                                                  |
|                   | -   Description: This indicates the preferred    |
|                   |     response is application/json format. Note    |
|                   |     that this call only outputs                  |
|                   |     in application/json format.                  |
+-------------------+--------------------------------------------------+

Response 200 (application/json)

{

\"response\": \[

{

\"id\": 899765065653542900,

\"eventTypeId\": \"DSM-DAO0267I\",

\"userId\": \"8a8196a158539d600158b276856b0e5a\",

\"tenantId\": \"8a81969a515845e30151584d03830003\",

\"objectTenantId\": \"8a81969a515845e30151584d03830003\",

\"message\": \"user logged in\",

\"hostName\": \"test.anaplan.net\",

\"serviceVersion\": \"5.3.0.1674\",

\"eventDate\": 1489608511000,

\"eventTimeZone\": \"UTC\",

\"createdDate\": 1503355684000,

\"createdTimeZone\": \"UTC\",

\"checksum\":
\"866a706f2ce13b78b3f9689c3300b34b238b518a46a5feb382a94bf2ef1a48f2\"

},

{

\"id\": 900471246336417800,

\"eventTypeId\": \"DSM-DAO0267I\",

\"userId\": \"8a8196a158539d600158b276856b0e5a\",

\"tenantId\": \"8a81969a515845e30151584d03830003\",

\"objectTenantId\": \"8a81969a515845e30151584d03830003\",

\"message\": \"user logged in\",

\"hostName\": \"test.anaplan.net\",

\"serviceVersion\": \"5.3.0.1674\",

\"eventDate\": 1489608511000,

\"eventTimeZone\": \"UTC\",

\"createdDate\": 1503524050000,

\"createdTimeZone\": \"UTC\",

\"checksum\":
\"ea5dc4b0e0f5e928821955598dc4205d7dc42b6978c81af83ec642000e9b5cfa\"

}

\]

}

Retrieve Audit Events in CEF Format

Request

curl -H authorization:\'AnaplanAuthToken {anaplan_auth_token}\' -H
\"Accept:text/plain\" https://audit.anaplan.com/audit/api/1/events

Headers

+-----------------------------+----------------------------------------+
| **Header**                  | **Details**                            |
+-----------------------------+----------------------------------------+
| Authorization:              | -   Required                           |
| AnaplanAuthToken            |                                        |
| {anaplan_auth_token}        | -   Description: the Anaplan           |
|                             |     authentication token               |
+-----------------------------+----------------------------------------+
| Accept: text/plain          | -   Optional                           |
|                             |                                        |
|                             | -   Description: This indicates the    |
|                             |     preferred response                 |
|                             |     is text/plain format.              |
+-----------------------------+----------------------------------------+

Response 200 (text/plain)

2018-03-12T19:12:50.000Z CEF:0\|Anaplan, Inc.\|\|\|USR-1\|User
created\|id=973275641490563072 userId=8a80d86a5565443f01557f053e6719ba
tenantId=8a80d8034e9a6fa0014e9aa747ae0002 eventTimeZone=UTC
createdDate=1520881970000 createdTimeZone=UTC success=true
objectId=8a80d8456191cb1801621ba12bd20232 ipAddress=10.1.101.127
userAgent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3)
AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.146
Safari/537.36
checksum=a80bffa2ecfd3e87f81237345735567e135de70884c37b5aa6b58d01bb4a9430

2018-03-12T19:13:15.000Z CEF:0\|Anaplan, Inc.\|\|\|USR-5\|User
updated\|id=973275745148592128 userId=8a80d86a5565443f01557f053e6719ba
tenantId=8a80d8034e9a6fa0014e9aa747ae0002 eventTimeZone=UTC
createdDate=1520881995000 createdTimeZone=UTC success=true
objectId=8a80d8456191cb1801621ba12bd20232 ipAddress=10.1.101.127
userAgent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3)
AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.146
Safari/537.36
checksum=abe3e5e41a05689a80d1f2850ea52120c77d64b4e17b6284fd56bb2ff612db35

2018-03-12T19:14:00.000Z CEF:0\|Anaplan, Inc.\|\|\|USR-17\|User removed
**from** tenant success\|id=973275935897149440
userId=8a80d86a5565443f01557f053e6719ba
tenantId=8a80d8034e9a6fa0014e9aa747ae0002 eventTimeZone=UTC
createdDate=1520882040000 createdTimeZone=UTC success=true
objectId=8a80d8456191cb1801621ba12bd20232
objectTenantId=8a80d8355ba6fe65015bb2e1d0e30032 ipAddress=10.1.101.127
userAgent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3)
AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.146
Safari/537.36
checksum=9c20edf4f71dcf58dfe9475b428a9983222bc33473987dbb40ce26c363df3a43

2018-03-12T19:19:20.000Z test.anaplan.net CEF:0\|Anaplan,
Inc.\|test.anaplan.net\|6.0.0.3050\|DSM-DAO0426I\|**switch**
domain\|id=973277276224741376 userId=8a80d86a58233b8d015825b37f310013
tenantId=8a80d8034e9a6fa0014e9aa747ae0002 eventTimeZone=UTC
createdDate=1520882360000 createdTimeZone=UTC
objectTenantId=8a80d8034e9a6fa0014e9aa747ae0002
checksum=3098d027e70a4076525c25e5c6debabe2c14980bf0384370b72541b80785f571

2018-03-12T19:19:20.000Z test.anaplan.net CEF:0\|Anaplan,
Inc.\|test.anaplan.net\|6.0.0.3050\|DSM-DAO0267I\|user logged
**in**\|id=973277274299555840 userId=8a80d86a58233b8d015825b37f310013
tenantId=8a80d8034e9a6fa0014e9aa747ae0002 eventTimeZone=UTC
createdDate=1520882359000 createdTimeZone=UTC
objectTenantId=8a80d8034e9a6fa0014e9aa747ae0002
checksum=215c8abd18ae1b785e09715ecf5df71fe80b539de7b9eb8fe6277868d5e65a2b

2018-03-12T19:19:20.000Z test.anaplan.net CEF:0\|Anaplan,
Inc.\|test.anaplan.net\|6.0.0.3050\|DSM-DAO0426I\|**switch**
domain\|id=973277276228935680 userId=8a80d86a58233b8d015825b37f310013
tenantId=8a80d8034e9a6fa0014e9aa747ae0002 eventTimeZone=UTC
createdDate=1520882360000 createdTimeZone=UTC
objectTenantId=8a80d8034e9a6fa0014e9aa747ae0002
checksum=bf5c7e63118a36a2e91438f5d24762e5eb186f0187fd6c2288e793de937e7b50

Search for Audit Events using POST

/events/search?type=all

Retrieves the audit events in the database for the tenant to which your
user is associated based on whether you specify these in the
body: from, to, and interval.

The from and to dates refer to when the event happened and not the date
on which the event was stored in the database. To search for events by
the date on which they occurred, you do not need to specify
both from and to dates, however:

If to is missing, events that occurred from the from date that you
specify up to the date on which you send the request are returned.

If from is missing, events from the first event to the to date that you
specify are returned.

You can also specify an interval in hours. This returns the events for
the last number of hours.

You can specify the type of events to return:

  ------------------------ ----------------------------------------------
  **Type**                 **Description**

  all                      Returns all events.

  byok                     Returns only BYOK events.

  user_activity            Returns only user activity events.
  ------------------------ ----------------------------------------------

You can obtain results in JSON or CEF.

Search the Audit Events in JSON

Request

curl POST -H authorization:\'AnaplanAuthToken {anaplan_auth_token}\' -H
\"Content-Type:application/json\" -d \'{\"from\": 1489608511000,\"to\" :
1505776337000, \"interval\" : 24}\'
https://audit.anaplan.com/audit/api/1/events

Headers

+----------------------------+-----------------------------------------+
| **Header**                 | **Details**                             |
+----------------------------+-----------------------------------------+
| authorization:             | -   Required                            |
| AnaplanAuthToken           |                                         |
| {anaplan_auth_token}       | -   Description: the Anaplan            |
|                            |     authentication token                |
+----------------------------+-----------------------------------------+
| Content-type:              | -   Optional                            |
| application/json           |                                         |
|                            | -   Description: This indicates the     |
|                            |     body is formatted                   |
|                            |     in application/json format.         |
+----------------------------+-----------------------------------------+

Body

{\"from\": \"milli, UTC\",

\"to\" : \"milli, UTC\",

\"interval\" : \"hours\"}

Response 200 (application/json)

{

\"response\": \[

{

\"id\": 899765065653542900,

\"eventTypeId\": \"DSM-DAO0267I\",

\"userId\": \"8a8196a158539d600158b276856b0e5a\",

\"tenantId\": \"8a81969a515845e30151584d03830003\",

\"objectTenantId\": \"8a81969a515845e30151584d03830003\",

\"message\": \"user logged in\",

\"hostName\": \"test.anaplan.net\",

\"serviceVersion\": \"5.3.0.1674\",

\"eventDate\": 1489608511000,

\"eventTimeZone\": \"UTC\",

\"createdDate\": 1503355684000,

\"createdTimeZone\": \"UTC\",

\"checksum\":
\"866a706f2ce13b78b3f9689c3300b34b238b518a46a5feb382a94bf2ef1a48f2\"

},

{

\"id\": 900471246336417800,

\"eventTypeId\": \"DSM-DAO0267I\",

\"userId\": \"8a8196a158539d600158b276856b0e5a\",

\"tenantId\": \"8a81969a515845e30151584d03830003\",

\"objectTenantId\": \"8a81969a515845e30151584d03830003\",

\"message\": \"user logged in\",

\"hostName\": \"test.anaplan.net\",

\"serviceVersion\": \"5.3.0.1674\",

\"eventDate\": 1489608511000,

\"eventTimeZone\": \"UTC\",

\"createdDate\": 1503524050000,

\"createdTimeZone\": \"UTC\",

\"checksum\":
\"ea5dc4b0e0f5e928821955598dc4205d7dc42b6978c81af83ec642000e9b5cfa\"

}

\]

}

Search the Audit Events in CEF

Request

curl POST -H authorization:\'AnaplanAuthToken {anaplan_auth_token}\' -H
\"Content-Type:application/json\" -H \"Accept:text/plain\" -d
\'{\"from\": 1489608511000,\"to\" : 1505776337000, \"interval\" : 24}\'
https://audit.anaplan.com/audit/api/1/events/search

Headers

+----------------------------+-----------------------------------------+
| **Header**                 | **Details**                             |
+----------------------------+-----------------------------------------+
| authorization:             | -   Required                            |
| AnaplanAuthToken           |                                         |
| {anaplan_auth_token}       | -   Description: the Anaplan            |
|                            |     authentication token                |
+----------------------------+-----------------------------------------+
| Content-type:              | -   Optional                            |
| application/json           |                                         |
|                            | -   Description: This indicates the     |
|                            |     body is formatted                   |
|                            |     in application/json format.         |
+----------------------------+-----------------------------------------+
| Accept: text/plain         | -   Optional                            |
|                            |                                         |
|                            | -   Description: This indicates the     |
|                            |     preferred response                  |
|                            |     is text/plain format.               |
+----------------------------+-----------------------------------------+

**Note**: The body of this request is sent in JSON format, but the
response is received in text format.

Body

{\"from\": \"milli, UTC\",

\"to\" : \"milli, UTC\",

\"interval\" : \"hours\"}

Response 200 (application/json)

2018-03-15T19:30:39.000Z test.anaplan.net CEF:0\|Anaplan,
Inc.\|test.anaplan.net\|6.0.0.3050\|DSM-DAO0267I\|user logged
**in**\|**id**=974367285749080064
**userId**=8a80d86a58233b8d015825b37f310013
**tenantId**=8a80d8034e9a6fa0014e9aa747ae0002 **eventTimeZone**=UTC
**createdDate**=1521142238000 **createdTimeZone**=UTC
**objectTenantId**=8a80d8034e9a6fa0014e9aa747ae0002
**checksum**=9d85737850b219554d1fc7b366e7456bc61dbe0b42055eacfcc8efe8b8ec811d

2018-03-15T20:05:45.000Z test.anaplan.net CEF:0\|Anaplan,
Inc.\|test.anaplan.net\|6.0.0.3050\|DSM-DAO0267I\|user logged
**in**\|**id**=974376120849129472
**userId**=8a80d86a58233b8d015825b37f310013
**tenantId**=8a80d8034e9a6fa0014e9aa747ae0002 **eventTimeZone**=UTC
**createdDate**=1521144345000 **createdTimeZone**=UTC
**objectTenantId**=8a80d8034e9a6fa0014e9aa747ae0002
**checksum**=5644269101abe8e78e979121f17d33a75ffef6661cbf1d2511af0041020009fe

2018-03-15T20:17:22.000Z test.anaplan.net CEF:0\|Anaplan,
Inc.\|test.anaplan.net\|6.0.0.3050\|DSM-DAO0267I\|user logged
**in**\|**id**=974379047131144192
**userId**=8a80d86a58233b8d015825b37f310013
**tenantId**=8a80d8034e9a6fa0014e9aa747ae0002 **eventTimeZone**=UTC
**createdDate**=1521145043000 **createdTimeZone**=UTC
**objectTenantId**=8a80d8034e9a6fa0014e9aa747ae0002
**checksum**=47f5fd1a674bebd9fae5908891c3a01c28f6650ebb677c5b074bd7efe99bd26e

2018-03-15T21:29:14.000Z test.anaplan.net CEF:0\|Anaplan,
Inc.\|test.anaplan.net\|6.0.0.3050\|DSM-DAO0426I\|switch
domain\|**id**=974397130507935744
**userId**=8a80d8eb58233c16015825b6c8210019
**tenantId**=8a80d8034e9a6fa0014e9aa747ae0002 **eventTimeZone**=UTC
**createdDate**=1521149354000 **createdTimeZone**=UTC
**objectTenantId**=8a80d8034e9a6fa0014e9aa747ae0002
**checksum**=324894f46599abc59bb2f95daa69f3b6a9ed1c772da057b5bdb909b8c21fa7e1

2018-03-15T21:29:14.000Z test.anaplan.net CEF:0\|Anaplan,
Inc.\|test.anaplan.net\|6.0.0.3050\|DSM-DAO0426I\|switch
domain\|**id**=974397130495352832
**userId**=8a80d8eb58233c16015825b6c8210019
**tenantId**=8a80d8034e9a6fa0014e9aa747ae0002 **eventTimeZone**=UTC
**createdDate**=1521149354000 **createdTimeZone**=UTC
**objectTenantId**=8a80d8034e9a6fa0014e9aa747ae0002
**checksum**=8764fae200b70e254571323569665387e1eeab4a8ff028890fe39e4bbf63e59d

Examples

This section contains examples of calls to the Anaplan Audit API with
various attributes.

Audit Events using GET

/events

Get Audit Events for the Last 24 Hours

This example returns the audit events for the last 24 hours.

Request

curl GET -H authorization:\'AnaplanAuthToken {anaplan_auth_token}\' -H
\"Content-Type:application/json\"
https://audit.anaplan.com/audit/api/1/events?intervalInHours=24

Headers

+-----------------------------+----------------------------------------+
| **Header**                  | **Details**                            |
+-----------------------------+----------------------------------------+
| Authorization:              | -   Required                           |
| AnaplanAuthToken            |                                        |
| {anaplan_auth_token}        | -   Description: the Anaplan           |
|                             |     authentication token               |
+-----------------------------+----------------------------------------+
| Content-Type:               | -   Optional                           |
| application/json            |                                        |
|                             | -   Description: This indicates the    |
|                             |     request is sent                    |
|                             |     in application/json format.        |
+-----------------------------+----------------------------------------+

Response 200 (application/json)

{

\"meta\": {

\"paging\": {

\"currentPageSize\": 20,

\"totalSize\": 263,

\"offSet\": 0,

\"nextOffset\": 20,

\"nextUrl\":
\"https://audit.anaplan.com/audit/api/1/events/search?limit=20&offset=20\"

}

},

\"response\": \[

{

\"id\": 971529164212789248,

\"eventTypeId\": \"USR-04\",

\"userId\": \"8a80d86a5565443f01557f053e6719ba\",

\"tenantId\": \"8a80d8034e9a6fa0014e9aa747ae0002\",

\"objectId\": \"8a80d8034e9a6fa0014e9aa747ae0002\",

\"objectTypeId\": \"\",

\"objectTenantId\": \"8a80d8034e9a6fa0014e9aa747ae0002\",

\"message\": \"user logged in\",

\"success\": true,

\"errorNumber\": \"\",

\"ipAddress\": \"10.1.101.85\",

\"userAgent\": \"TestUserAgent\",

\"sessionId\": \"\",

\"hostName\": \"some-service-id\",

\"serviceVersion\": \"5.3.0.1674\",

\"eventDate\": 1520433163000,

\"eventTimeZone\": \"UTC\",

\"createdDate\": 1520465578000,

\"createdTimeZone\": \"UTC\",

\"checksum\":
\"f63715026fd7d9511f73ec29c3e5fb55cdc143d9c7723a86e66a0c7198008f75\"

},

{

\"id\": 971533790051950592,

\"eventTypeId\": \"DSM-DAO0267I\",

\"userId\": \"8a80d8eb58233c16015825b6c8210019\",

\"tenantId\": \"8a80d8034e9a6fa0014e9aa747ae0002\",

\"objectTenantId\": \"8a80d8034e9a6fa0014e9aa747ae0002\",

\"message\": \"user logged in\",

\"hostName\": \"test.anaplan.net\",

\"serviceVersion\": \"5.3.0.1674\",

\"eventDate\": 1520437111000,

\"eventTimeZone\": \"UTC\",

\"createdDate\": 1520466680000,

\"createdTimeZone\": \"UTC\",

\"checksum\":
\"e7ff5f0d538a605505576c6e3228a0bd744cb638d5e6be47d424f83da309d322\"

},

{

\"id\": 971485264743882752,

\"eventTypeId\": \"DSM-DAO0267I\",

\"userId\": \"8a80d8eb58233c16015825b6c8210019\",

\"tenantId\": \"8a80d8034e9a6fa0014e9aa747ae0002\",

\"objectTenantId\": \"8a80d8034e9a6fa0014e9aa747ae0002\",

\"message\": \"user logged in\",

\"hostName\": \"test.anaplan.net\",

\"serviceVersion\": \"6.0.0.3050\",

\"eventDate\": 1520455110000,

\"eventTimeZone\": \"UTC\",

\"createdDate\": 1520455111000,

\"createdTimeZone\": \"UTC\",

\"checksum\":
\"386831aa56ef795935ad9cfa211311d2233b9c604454289cafc687963041eaa3\"

},

{

\"id\": 971485264752271360,

\"eventTypeId\": \"DSM-DAO0267I\",

\"userId\": \"8a80d8eb58233c16015825b6c8210019\",

\"tenantId\": \"8a80d8034e9a6fa0014e9aa747ae0002\",

\"objectTenantId\": \"8a80d8034e9a6fa0014e9aa747ae0002\",

\"message\": \"user logged in\",

\"hostName\": \"test.anaplan.net\",

\"serviceVersion\": \"6.0.0.3050\",

\"eventDate\": 1520455110000,

\"eventTimeZone\": \"UTC\",

\"createdDate\": 1520455111000,

\"createdTimeZone\": \"UTC\",

\"checksum\":
\"d34ce1d6333ca7619222059845598253ade2dad13e89030d5f6852ed5d1dd7e1\"

},

{

\"id\": 971485264848740352,

\"eventTypeId\": \"DSM-DAO0426I\",

\"userId\": \"8a80d8eb58233c16015825b6c8210019\",

\"tenantId\": \"8a80d8034e9a6fa0014e9aa747ae0002\",

\"objectTenantId\": \"8a80d8034e9a6fa0014e9aa747ae0002\",

\"message\": \"switch domain\",

\"hostName\": \"test.anaplan.net\",

\"serviceVersion\": \"6.0.0.3050\",

\"eventDate\": 1520455110000,

\"eventTimeZone\": \"UTC\",

\"createdDate\": 1520455111000,

\"createdTimeZone\": \"UTC\",

\"checksum\":
\"8231b1fa23d421f16a4401f7b410c652969191ed4930e10d9d7168a5379f7214\"

}

\]

}

Get Audit Events for the Last 7 days

This example returns the audit events for the last 7 days.

Request

curl GET -H authorization:\'AnaplanAuthToken {anaplan_auth_token}\' -H
\"Content-Type:application/json\"
https://audit.anaplan.com/audit/api/1/events?intervalInHours=168

Headers

+-----------------------------+----------------------------------------+
| **Header**                  | **Details**                            |
+-----------------------------+----------------------------------------+
| Authorization:              | -   Required                           |
| AnaplanAuthToken            |                                        |
| {anaplan_auth_token}        | -   Description: the Anaplan           |
|                             |     authentication token               |
+-----------------------------+----------------------------------------+
| Content-Type:               | -   Optional                           |
| application/json            |                                        |
|                             | -   Description: This indicates the    |
|                             |     request is sent                    |
|                             |     in application/json format.        |
+-----------------------------+----------------------------------------+

Response 200 (application/json)

{

\"meta\": {

\"paging\": {

\"currentPageSize\": 20,

\"totalSize\": 3026,

\"offSet\": 0,

\"nextOffset\": 20,

\"nextUrl\":
\"https://audit.anaplan.com/audit/api/1/events/search?limit=20&offset=20\"

}

},

\"response\": \[

{

\"id\": 969698093573726208,

\"eventTypeId\": \"USR-4\",

\"userId\": \"8a80d86a5565443f01557f053e6719ba\",

\"tenantId\": \"8a80d8034e9a6fa0014e9aa747ae0002\",

\"objectId\": \"8a80d8b36191c9df0161e35d90b100d1\",

\"objectTypeId\": \"\",

\"objectTenantId\": \"\",

\"message\": \"User updated\",

\"success\": true,

\"errorNumber\": \"\",

\"ipAddress\": \"10.1.101.85\",

\"userAgent\": \"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3)
AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186
Safari/537.36\",

\"sessionId\": \"\",

\"hostName\": \"\",

\"serviceVersion\": \"\",

\"eventDate\": 1520029015000,

\"eventTimeZone\": \"UTC\",

\"createdDate\": 1520029016000,

\"createdTimeZone\": \"UTC\",

\"checksum\":
\"057747eed9e29bfd375005f00166f479b5ec0276b12d88e7eb011e759c9271b3\"

},

{

\"id\": 969698172254674944,

\"eventTypeId\": \"USR-4\",

\"userId\": \"8a80d86a5565443f01557f053e6719ba\",

\"tenantId\": \"8a80d8034e9a6fa0014e9aa747ae0002\",

\"objectId\": \"8a80d8b36191c9df0161e35e4c3e00d2\",

\"objectTypeId\": \"\",

\"objectTenantId\": \"\",

\"message\": \"User updated\",

\"success\": true,

\"errorNumber\": \"\",

\"ipAddress\": \"10.1.101.85\",

\"userAgent\": \"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3)
AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186
Safari/537.36\",

\"sessionId\": \"\",

\"hostName\": \"\",

\"serviceVersion\": \"\",

\"eventDate\": 1520029034000,

\"eventTimeZone\": \"UTC\",

\"createdDate\": 1520029035000,

\"createdTimeZone\": \"UTC\",

\"checksum\":
\"00e2ff653d7b67cac3c8e1b0545f53b517720385f4b3006b525e046f23922c36\"

},

{

\"id\": 969698226860318720,

\"eventTypeId\": \"USR-4\",

\"userId\": \"8a80d86a5565443f01557f053e6719ba\",

\"tenantId\": \"8a80d8034e9a6fa0014e9aa747ae0002\",

\"objectId\": \"8a80d86a6191c7d80161e77fdfce012f\",

\"objectTypeId\": \"\",

\"objectTenantId\": \"\",

\"message\": \"User updated\",

\"success\": true,

\"errorNumber\": \"\",

\"ipAddress\": \"10.1.101.85\",

\"userAgent\": \"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3)
AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186
Safari/537.36\",

\"sessionId\": \"\",

\"hostName\": \"\",

\"serviceVersion\": \"\",

\"eventDate\": 1520029048000,

\"eventTimeZone\": \"UTC\",

\"createdDate\": 1520029048000,

\"createdTimeZone\": \"UTC\",

\"checksum\":
\"77fb1c713a34dd0b7bcd18a5c2145830db7b94c232dfa661daa1096d89c80201\"

},

{

\"id\": 969698573997694976,

\"eventTypeId\": \"DSM-DAO0267I\",

\"userId\": \"8a80d8eb58233c16015825b6c8210019\",

\"tenantId\": \"8a80d8034e9a6fa0014e9aa747ae0002\",

\"objectTenantId\": \"8a80d8034e9a6fa0014e9aa747ae0002\",

\"message\": \"user logged in\",

\"hostName\": \"test.anaplan.net\",

\"serviceVersion\": \"6.0.0.3050\",

\"eventDate\": 1520029130000,

\"eventTimeZone\": \"UTC\",

\"createdDate\": 1520029131000,

\"createdTimeZone\": \"UTC\",

\"checksum\":
\"ad7859db4ea13ba7f0bdae6e9ccfa5d895fa99dd5bf47aabc7278c1521971f24\"

}

\]

}

Get Audit Events for a specific time period

This example returns the audit events between two specific dates.

Request

curl GET -H authorization:\'AnaplanAuthToken {anaplan_auth_token}\' -H
\"Content-Type:application/json\"
https://audit.anaplan.com/audit/api/1/events?dateFrom=1520029147000&dateTo=
1520029148000

Headers

+-----------------------------+----------------------------------------+
| **Header**                  | **Details**                            |
+-----------------------------+----------------------------------------+
| Authorization:              | -   Required                           |
| AnaplanAuthToken            |                                        |
| {anaplan_auth_token}        | -   Description: the Anaplan           |
|                             |     authentication token               |
+-----------------------------+----------------------------------------+
| Content-Type:               | -   Optional                           |
| application/json            |                                        |
|                             | -   Description: This indicates the    |
|                             |     request is sent                    |
|                             |     in application/json format.        |
+-----------------------------+----------------------------------------+

Response 200 (application/json)

{

\"meta\": {

\"paging\": {

\"currentPageSize\": 10,

\"totalSize\": 10,

\"offSet\": 0,

\"nextOffset\": 10

}

},

\"response\": \[

{

\"id\": 969698641161084928,

\"eventTypeId\": \"DSM-DAO0267I\",

\"userId\": \"8a80d8eb58233c16015825b6c8210019\",

\"tenantId\": \"8a80d8034e9a6fa0014e9aa747ae0002\",

\"objectTenantId\": \"8a80d8034e9a6fa0014e9aa747ae0002\",

\"message\": \"user logged in\",

\"hostName\": \"test.anaplan.net\",

\"serviceVersion\": \"6.0.0.3050\",

\"eventDate\": 1520029147000,

\"eventTimeZone\": \"UTC\",

\"createdDate\": 1520029147000,

\"createdTimeZone\": \"UTC\",

\"checksum\":
\"56af69488662e22f340c2cae29eb86a1c1644c0b9e5c8ad5a8e5d244236adb00\"

},

{

\"id\": 969698641165279232,

\"eventTypeId\": \"DSM-DAO0267I\",

\"userId\": \"8a80d8eb58233c16015825b6c8210019\",

\"tenantId\": \"8a80d8034e9a6fa0014e9aa747ae0002\",

\"objectTenantId\": \"8a80d8034e9a6fa0014e9aa747ae0002\",

\"message\": \"user logged in\",

\"hostName\": \"test.anaplan.net\",

\"serviceVersion\": \"6.0.0.3050\",

\"eventDate\": 1520029147000,

\"eventTimeZone\": \"UTC\",

\"createdDate\": 1520029147000,

\"createdTimeZone\": \"UTC\",

\"checksum\":
\"f6f35261057ffa5cca411f649f9166b31b4c5935fb026eba58297305e0c2753e\"

},

{

\"id\": 969698641169473536,

\"eventTypeId\": \"DSM-DAO0267I\",

\"userId\": \"8a80d8eb58233c16015825b6c8210019\",

\"tenantId\": \"8a80d8034e9a6fa0014e9aa747ae0002\",

\"objectTenantId\": \"8a80d8034e9a6fa0014e9aa747ae0002\",

\"message\": \"user logged in\",

\"hostName\": \"test.anaplan.net\",

\"serviceVersion\": \"6.0.0.3050\",

\"eventDate\": 1520029147000,

\"eventTimeZone\": \"UTC\",

\"createdDate\": 1520029147000,

\"createdTimeZone\": \"UTC\",

\"checksum\":
\"8139fa9d9279832bbe613489871a0f2701fc96535afa4eba1c4e0fcd5088c36f\"

}

\]

}

Audit Events using POST

/events/search

Get Audit Events for the Last 24 Hours

This example returns the audit events for the last 24 hours.

Request

curl POST -H authorization:\'AnaplanAuthToken {anaplan_auth_token}\' -H
\"Content-Type:application/json\" -d \'{\"interval\" : 24}\'
https://audit.anaplan.com/audit/api/1/events/search

Headers

+-----------------------------+----------------------------------------+
| **Header**                  | **Details**                            |
+-----------------------------+----------------------------------------+
| Authorization:              | -   Required                           |
| AnaplanAuthToken            |                                        |
| {anaplan_auth_token}        | -   Description: the Anaplan           |
|                             |     authentication token               |
+-----------------------------+----------------------------------------+
| Content-Type:               | -   Optional                           |
| application/json            |                                        |
|                             | -   Description: This indicates the    |
|                             |     request is sent                    |
|                             |     in application/json format.        |
+-----------------------------+----------------------------------------+

Header parameters

Response 200 (application/json)

{

\"meta\": {

\"paging\": {

\"currentPageSize\": 20,

\"totalSize\": 263,

\"offSet\": 0,

\"nextOffset\": 20,

\"nextUrl\":
\"https://audit.anaplan.com/audit/api/1/events/search?limit=20&offset=20\"

}

},

\"response\": \[

{

\"id\": 971529164212789248,

\"eventTypeId\": \"USR-04\",

\"userId\": \"8a80d86a5565443f01557f053e6719ba\",

\"tenantId\": \"8a80d8034e9a6fa0014e9aa747ae0002\",

\"objectId\": \"8a80d8034e9a6fa0014e9aa747ae0002\",

\"objectTypeId\": \"\",

\"objectTenantId\": \"8a80d8034e9a6fa0014e9aa747ae0002\",

\"message\": \"user logged in\",

\"success\": true,

\"errorNumber\": \"\",

\"ipAddress\": \"10.1.101.85\",

\"userAgent\": \"TestUserAgent\",

\"sessionId\": \"\",

\"hostName\": \"some-service-id\",

\"serviceVersion\": \"5.3.0.1674\",

\"eventDate\": 1520433163000,

\"eventTimeZone\": \"UTC\",

\"createdDate\": 1520465578000,

\"createdTimeZone\": \"UTC\",

\"checksum\":
\"f63715026fd7d9511f73ec29c3e5fb55cdc143d9c7723a86e66a0c7198008f75\"

},

{

\"id\": 971533790051950592,

\"eventTypeId\": \"DSM-DAO0267I\",

\"userId\": \"8a80d8eb58233c16015825b6c8210019\",

\"tenantId\": \"8a80d8034e9a6fa0014e9aa747ae0002\",

\"objectTenantId\": \"8a80d8034e9a6fa0014e9aa747ae0002\",

\"message\": \"user logged in\",

\"hostName\": \"test.anaplan.net\",

\"serviceVersion\": \"5.3.0.1674\",

\"eventDate\": 1520437111000,

\"eventTimeZone\": \"UTC\",

\"createdDate\": 1520466680000,

\"createdTimeZone\": \"UTC\",

\"checksum\":
\"e7ff5f0d538a605505576c6e3228a0bd744cb638d5e6be47d424f83da309d322\"

},

{

\"id\": 971485264743882752,

\"eventTypeId\": \"DSM-DAO0267I\",

\"userId\": \"8a80d8eb58233c16015825b6c8210019\",

\"tenantId\": \"8a80d8034e9a6fa0014e9aa747ae0002\",

\"objectTenantId\": \"8a80d8034e9a6fa0014e9aa747ae0002\",

\"message\": \"user logged in\",

\"hostName\": \"test.anaplan.net\",

\"serviceVersion\": \"6.0.0.3050\",

\"eventDate\": 1520455110000,

\"eventTimeZone\": \"UTC\",

\"createdDate\": 1520455111000,

\"createdTimeZone\": \"UTC\",

\"checksum\":
\"386831aa56ef795935ad9cfa211311d2233b9c604454289cafc687963041eaa3\"

},

\]

}

Get Audit Events for the Last 7 days

This example returns the audit events for the last 7 days.

Request

curl POST -H authorization:\'AnaplanAuthToken {anaplan_auth_token}\' -H
\"Content-Type:application/json\" -d \'{\"interval\" : 168}\'
https://audit.anaplan.com/audit/api/1/events/search

Headers

+-----------------------------+----------------------------------------+
| **Header**                  | **Details**                            |
+-----------------------------+----------------------------------------+
| Authorization:              | -   Required                           |
| AnaplanAuthToken            |                                        |
| {anaplan_auth_token}        | -   Description: the Anaplan           |
|                             |     authentication token               |
+-----------------------------+----------------------------------------+
| Content-Type:               | -   Optional                           |
| application/json            |                                        |
|                             | -   Description: This indicates the    |
|                             |     request is sent                    |
|                             |     in application/json format.        |
+-----------------------------+----------------------------------------+

Body

{\"interval\" : 168}

Response 200 (application/json)

{

\"meta\": {

\"paging\": {

\"currentPageSize\": 20,

\"totalSize\": 3026,

\"offSet\": 0,

\"nextOffset\": 20,

\"nextUrl\":
\"https://audit.anaplan.com/audit/api/1/events/search?limit=20&offset=20\"

}

},

\"response\": \[

{

\"id\": 969698093573726208,

\"eventTypeId\": \"USR-4\",

\"userId\": \"8a80d86a5565443f01557f053e6719ba\",

\"tenantId\": \"8a80d8034e9a6fa0014e9aa747ae0002\",

\"objectId\": \"8a80d8b36191c9df0161e35d90b100d1\",

\"objectTypeId\": \"\",

\"objectTenantId\": \"\",

\"message\": \"User updated\",

\"success\": true,

\"errorNumber\": \"\",

\"ipAddress\": \"10.1.101.85\",

\"userAgent\": \"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3)
AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186
Safari/537.36\",

\"sessionId\": \"\",

\"hostName\": \"\",

\"serviceVersion\": \"\",

\"eventDate\": 1520029015000,

\"eventTimeZone\": \"UTC\",

\"createdDate\": 1520029016000,

\"createdTimeZone\": \"UTC\",

\"checksum\":
\"057747eed9e29bfd375005f00166f479b5ec0276b12d88e7eb011e759c9271b3\"

},

{

\"id\": 969698172254674944,

\"eventTypeId\": \"USR-4\",

\"userId\": \"8a80d86a5565443f01557f053e6719ba\",

\"tenantId\": \"8a80d8034e9a6fa0014e9aa747ae0002\",

\"objectId\": \"8a80d8b36191c9df0161e35e4c3e00d2\",

\"objectTypeId\": \"\",

\"objectTenantId\": \"\",

\"message\": \"User updated\",

\"success\": true,

\"errorNumber\": \"\",

\"ipAddress\": \"10.1.101.85\",

\"userAgent\": \"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3)
AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186
Safari/537.36\",

\"sessionId\": \"\",

\"hostName\": \"\",

\"serviceVersion\": \"\",

\"eventDate\": 1520029034000,

\"eventTimeZone\": \"UTC\",

\"createdDate\": 1520029035000,

\"createdTimeZone\": \"UTC\",

\"checksum\":
\"00e2ff653d7b67cac3c8e1b0545f53b517720385f4b3006b525e046f23922c36\"

},

{

\"id\": 969698226860318720,

\"eventTypeId\": \"USR-4\",

\"userId\": \"8a80d86a5565443f01557f053e6719ba\",

\"tenantId\": \"8a80d8034e9a6fa0014e9aa747ae0002\",

\"objectId\": \"8a80d86a6191c7d80161e77fdfce012f\",

\"objectTypeId\": \"\",

\"objectTenantId\": \"\",

\"message\": \"User updated\",

\"success\": true,

\"errorNumber\": \"\",

\"ipAddress\": \"10.1.101.85\",

\"userAgent\": \"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3)
AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186
Safari/537.36\",

\"sessionId\": \"\",

\"hostName\": \"\",

\"serviceVersion\": \"\",

\"eventDate\": 1520029048000,

\"eventTimeZone\": \"UTC\",

\"createdDate\": 1520029048000,

\"createdTimeZone\": \"UTC\",

\"checksum\":
\"77fb1c713a34dd0b7bcd18a5c2145830db7b94c232dfa661daa1096d89c80201\"

},

{

\"id\": 969698573997694976,

\"eventTypeId\": \"DSM-DAO0267I\",

\"userId\": \"8a80d8eb58233c16015825b6c8210019\",

\"tenantId\": \"8a80d8034e9a6fa0014e9aa747ae0002\",

\"objectTenantId\": \"8a80d8034e9a6fa0014e9aa747ae0002\",

\"message\": \"user logged in\",

\"hostName\": \"test.anaplan.net\",

\"serviceVersion\": \"6.0.0.3050\",

\"eventDate\": 1520029130000,

\"eventTimeZone\": \"UTC\",

\"createdDate\": 1520029131000,

\"createdTimeZone\": \"UTC\",

\"checksum\":
\"ad7859db4ea13ba7f0bdae6e9ccfa5d895fa99dd5bf47aabc7278c1521971f24\"

}

\]

}

Get Audit Events for a specific time period

This example returns the audit events between two specific dates.

Request

curl POST -H authorization:\'AnaplanAuthToken {anaplan_auth_token}\' -H
\"Content-Type: application/json\" -d \'{\"from\": 1520029147000,\"to\"
: 1520029148000}\' https://audit.anaplan.com/audit/api/1/events/search

Headers

+-----------------------------+----------------------------------------+
| **Header**                  | **Details**                            |
+-----------------------------+----------------------------------------+
| Authorization:              | -   Required                           |
| AnaplanAuthToken            |                                        |
| {anaplan_auth_token}        | -   Description: the Anaplan           |
|                             |     authentication token               |
+-----------------------------+----------------------------------------+
| Content-Type:               | -   Optional                           |
| application/json            |                                        |
|                             | -   Description: This indicates the    |
|                             |     request is sent                    |
|                             |     in application/json format.        |
+-----------------------------+----------------------------------------+

Body

{\"from\": 1520029147000,

\"to\" : 1520029148000}

Response 200 (application/json)

{

\"meta\": {

\"paging\": {

\"currentPageSize\": 10,

\"totalSize\": 10,

\"offSet\": 0,

\"nextOffset\": 10

}

},

\"response\": \[

{

\"id\": 969698641161084928,

\"eventTypeId\": \"DSM-DAO0267I\",

\"userId\": \"8a80d8eb58233c16015825b6c8210019\",

\"tenantId\": \"8a80d8034e9a6fa0014e9aa747ae0002\",

\"objectTenantId\": \"8a80d8034e9a6fa0014e9aa747ae0002\",

\"message\": \"user logged in\",

\"hostName\": \"test.anaplan.net\",

\"serviceVersion\": \"6.0.0.3050\",

\"eventDate\": 1520029147000,

\"eventTimeZone\": \"UTC\",

\"createdDate\": 1520029147000,

\"createdTimeZone\": \"UTC\",

\"checksum\":
\"56af69488662e22f340c2cae29eb86a1c1644c0b9e5c8ad5a8e5d244236adb00\"

},

{

\"id\": 969698641165279232,

\"eventTypeId\": \"DSM-DAO0267I\",

\"userId\": \"8a80d8eb58233c16015825b6c8210019\",

\"tenantId\": \"8a80d8034e9a6fa0014e9aa747ae0002\",

\"objectTenantId\": \"8a80d8034e9a6fa0014e9aa747ae0002\",

\"message\": \"user logged in\",

\"hostName\": \"test.anaplan.net\",

\"serviceVersion\": \"6.0.0.3050\",

\"eventDate\": 1520029147000,

\"eventTimeZone\": \"UTC\",

\"createdDate\": 1520029147000,

\"createdTimeZone\": \"UTC\",

\"checksum\":
\"f6f35261057ffa5cca411f649f9166b31b4c5935fb026eba58297305e0c2753e\"

},

{

\"id\": 969698641169473536,

\"eventTypeId\": \"DSM-DAO0267I\",

\"userId\": \"8a80d8eb58233c16015825b6c8210019\",

\"tenantId\": \"8a80d8034e9a6fa0014e9aa747ae0002\",

\"objectTenantId\": \"8a80d8034e9a6fa0014e9aa747ae0002\",

\"message\": \"user logged in\",

\"hostName\": \"test.anaplan.net\",

\"serviceVersion\": \"6.0.0.3050\",

\"eventDate\": 1520029147000,

\"eventTimeZone\": \"UTC\",

\"createdDate\": 1520029147000,

\"createdTimeZone\": \"UTC\",

\"checksum\":
\"8139fa9d9279832bbe613489871a0f2701fc96535afa4eba1c4e0fcd5088c36f\"

},

{

\"id\": 969698641186250752,

\"eventTypeId\": \"DSM-DAO0426I\",

\"userId\": \"8a80d8eb58233c16015825b6c8210019\",

\"tenantId\": \"8a80d8034e9a6fa0014e9aa747ae0002\",

\"objectTenantId\": \"8a80d8034e9a6fa0014e9aa747ae0002\",

\"message\": \"switch domain\",

\"hostName\": \"test.anaplan.net\",

\"serviceVersion\": \"6.0.0.3050\",

\"eventDate\": 1520029147000,

\"eventTimeZone\": \"UTC\",

\"createdDate\": 1520029147000,

\"createdTimeZone\": \"UTC\",

\"checksum\":
\"9ba8725f2eaf86d0d03006e79ae9dd4ed89ca06f0596f208527800ac23b423d5\"

}

\]

}

Pages of Results

/events?limit=2&offset=2

Displaying Pages of Results

This example returns a list of events for the tenant to which your user
is associated:

a limit of two results per page.

a result offset of two.

  ----------------- ------------------------------------------------------
  **Metadata**      **Description**

  currentPageSize   Number of results displayed as specified in the limit.

  nextUrl           URL to the next page of results.

  nextOffset        Number to add to the first result to reach the next
                    page of results.

  offset            Number to add to the first result to reach the results
                    that you want.

  previous          URL to the previous page of results.

  totalSize         Number of results available.
  ----------------- ------------------------------------------------------

Request

curl GET -H authorization:\'AnaplanAuthToken {anaplan_auth_token}\' -H
\"Content-Type:application/json\"
https://audit.anaplan.com/audit/api/1/events?limit=2&offset=2

Headers

+-----------------------------+----------------------------------------+
| **Header**                  | **Details**                            |
+-----------------------------+----------------------------------------+
| Authorization:              | -   Required                           |
| AnaplanAuthToken            |                                        |
| {anaplan_auth_token}        | -   Description: the Anaplan           |
|                             |     authentication token               |
+-----------------------------+----------------------------------------+
| Content-Type:               | -   Optional                           |
| application/json            |                                        |
|                             | -   Description: This indicates the    |
|                             |     request is sent                    |
|                             |     in application/json format.        |
+-----------------------------+----------------------------------------+

Response 200 (application/json)

{

\"meta\": {

\"paging\": {

\"currentPageSize\": 2,

\"totalSize\": 19,

\"offSet\": 0,

\"nextOffset\": 2,

\"nextUrl\":
\"https://audit.anaplan.com/audit/api/1/events?limit=2&offset=2\"

}

},

\"response\": \[

{

\"id\": 899765065653542900,

\"eventTypeId\": \"DSM-DAO0267I\",

\"userId\": \"8a8196a158539d600158b276856b0e5a\",

\"tenantId\": \"8a81969a515845e30151584d03830003\",

\"objectTenantId\": \"8a81969a515845e30151584d03830003\",

\"message\": \"user logged in\",

\"hostName\": \"test.anaplan-internal.net\",

\"serviceVersion\": \"5.3.0.1674\",

\"eventDate\": 1489608511000,

\"eventTimeZone\": \"UTC\",

\"createdDate\": 1503355684000,

\"createdTimeZone\": \"UTC\",

\"checksum\":
\"866a706f2ce13b78b3f9689c3300b34b238b518a46a5feb382a94bf2ef1a48f2\"

},

{

\"id\": 900471246336417800,

\"eventTypeId\": \"DSM-DAO0267I\",

\"userId\": \"8a8196a158539d600158b276856b0e5a\",

\"tenantId\": \"8a81969a515845e30151584d03830003\",

\"objectTenantId\": \"8a81969a515845e30151584d03830003\",

\"message\": \"user logged in\",

\"hostName\": \"test.anaplan-internal.net\",

\"serviceVersion\": \"5.3.0.1674\",

\"eventDate\": 1489608511000,

\"eventTimeZone\": \"UTC\",

\"createdDate\": 1503524050000,

\"createdTimeZone\": \"UTC\",

\"checksum\":
\"ea5dc4b0e0f5e928821955598dc4205d7dc42b6978c81af83ec642000e9b5cfa\"

}

\]

}
