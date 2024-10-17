// Required imports
const grpc = require('@grpc/grpc-js');
const deviceGrpc = require('@chirpstack/chirpstack-api/api/device_grpc_pb');
const devicePb = require('@chirpstack/chirpstack-api/api/device_pb');

// This must point to the ChirpStack gRPC API which is provided by default on port 8080
const server = '192.168.1.77:8080';

// The API token obtained from the "Create an API key from ChirpStack Console" section above
const apiToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjaGlycHN0YWNrIiwiaXNzIjoiY2hpcnBzdGFjayIsInN1YiI6IjFjNjU3MWM3LTJhZTMtNDJhYi04NTVjLTI5Y2JiYzk3MGY2NSIsInR5cCI6ImtleSJ9.B9quhk77K-CaHqnLUm7xT9pgMcbb9laIh98BxiEXs3M';

// Create the client for the DeviceServiceClient.
const deviceService = new deviceGrpc.DeviceServiceClient(
  server, 
  grpc.credentials.createInsecure()
);

// Create the Metadata object.
const metadata = new grpc.Metadata();
metadata.set('authorization', 'Bearer ' + apiToken);

// Instantiate a Device message and provide requisite information
const device = new devicePb.Device();
device.setApplicationId('0a1055bd-769b-47ad-b178-fc0138439a13');
device.setDeviceProfileId('af3ddd3b-849a-4467-8b91-b8ae0a54830f');
device.setName('vega_smart');
device.setDevEui('353435317a376d11');
device.setJoinEui('736d687330313031');

// Instantiate a CreateDeviceRequest message and provide the Device
const createDeviceRequest = new devicePb.CreateDeviceRequest();
createDeviceRequest.setDevice(device);

// Use the createDeviceRequest client to invoke the create method, providing
// the CreateDeviceProfileRequest and Metadata as arguments
deviceService.create(createDeviceRequest, metadata, (err, resp) => {
  if (err !== null) {
    console.log(err);
    return;
  }

  console.log(resp.toObject());
});