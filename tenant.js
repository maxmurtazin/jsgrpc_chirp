// Required imports
const grpc = require('@grpc/grpc-js');
const applicationGrpc = require('@chirpstack/chirpstack-api/api/tenant_grpc_pb');
const applicationPb = require('@chirpstack/chirpstack-api/api/tenant_pb');

// This must point to the ChirpStack gRPC API which is provided by default on port 8080
const server = 'localhost:8080';

// The API token obtained from the "Create an API key from ChirpStack Console" section above
const apiToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjaGlycHN0YWNrIiwiaXNzIjoiY2hpcnBzdGFjayIsInN1YiI6ImU0NGQ1Yjg3LWUzZTktNGI5Zi05ZjI0LTllNjQzNGI0YzY4ZiIsInR5cCI6ImtleSJ9.RR0yruLvENL9tc8xfAT85FQB3NIfSMAnDtPuQ7F7Yqc';


// Create the client for the TenantServiceClient.
const CreateTenant = new tenant.TenantServiceClient(
    server, 
    grpc.credentials.createInsecure()
  );

CreateTenant.setName('vega_smart');






  tenantService.create(CreateTenantRequest, metadata, (err, resp) => {
    if (err !== null) {
      console.log(err);
      return;
    }
  
    console.log(resp.toObject());
  });




