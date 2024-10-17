// Required imports
const grpc = require('@grpc/grpc-js');
const applicationGrpc = require('@chirpstack/chirpstack-api/api/application_grpc_pb');
const applicationPb = require('@chirpstack/chirpstack-api/api/application_pb');

// This must point to the ChirpStack gRPC API which is provided by default on port 8080
const server = '192.168.1.77:8080';

// The API token obtained from the "Create an API key from ChirpStack Console" section above
const apiToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjaGlycHN0YWNrIiwiaXNzIjoiY2hpcnBzdGFjayIsInN1YiI6IjFjNjU3MWM3LTJhZTMtNDJhYi04NTVjLTI5Y2JiYzk3MGY2NSIsInR5cCI6ImtleSJ9.B9quhk77K-CaHqnLUm7xT9pgMcbb9laIh98BxiEXs3M';

// Create the client for the ApplicationServiceClient
const applicationService = new applicationGrpc.ApplicationServiceClient(
  server,
  grpc.credentials.createInsecure(),
);

// Create the Metadata object
const metadata = new grpc.Metadata();
metadata.set('authorization', 'Bearer ' + apiToken);

// Instantiate an Application message and provide requisite information
const application = new applicationPb.Application();
application.setTenantId('52f14cd4-c6f1-4fbd-8f87-4025e1d49242');
application.setName('office');

// Instantiate a CreateApplicationRequest message and provide the Application
const createApplicationRequest = new applicationPb.CreateApplicationRequest();
createApplicationRequest.setApplication(application);

// Use the applicationService client to invoke the create method, providing
// the CreateApplicationRequest and Metadata as arguments
applicationService.create(createApplicationRequest, metadata, (err, resp) => {
  if (err !== null) {
    console.log(err);
    return;
  }

  console.log(resp.toObject());
});