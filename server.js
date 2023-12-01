const express = require("express");
const app = express();

app.use(express.json()); // for parsing application/json

app.post("/", (req, res) => {
  console.log("Data received:", req.body);
  // You can add logic to process or store the data here
  const AWS = require("aws-sdk");
  const apiGateway = new AWS.ApiGatewayManagementApi({
    endpoint: "https://your-api-id.execute-api.region.amazonaws.com/your-stage",
  });

  apiGateway.postToConnection(
    {
      ConnectionId: connectionId, // ID of the client connection
      Data: JSON.stringify(messageData), // Message data
    },
    (err, data) => {
      if (err) console.log("Error:", err);
      else console.log("Message sent:", data);
    }
  );

  res.status(200).send("Data received");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
