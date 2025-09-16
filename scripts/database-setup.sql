-- MongoDB equivalent schema (for reference)
-- Users Collection
{
  "_id": ObjectId,
  "name": String,
  "email": String (unique),
  "password": String (hashed),
  "createdAt": Date,
  "updatedAt": Date
}

-- SensorData Collection
{
  "_id": ObjectId,
  "zoneId": String,
  "waterLevel": Number,
  "sensorStatus": String, // 'active' | 'inactive'
  "timestamp": Date,
  "userId": ObjectId (reference to Users)
}

-- Alerts Collection
{
  "_id": ObjectId,
  "message": String,
  "severity": String, // 'low' | 'medium' | 'high' | 'critical'
  "zoneId": String,
  "timestamp": Date,
  "userId": ObjectId (reference to Users),
  "resolved": Boolean,
  "resolvedAt": Date
}

-- Zones Collection
{
  "_id": ObjectId,
  "zoneId": String (unique),
  "name": String,
  "location": {
    "latitude": Number,
    "longitude": Number
  },
  "thresholds": {
    "low": Number,
    "medium": Number,
    "high": Number,
    "critical": Number
  },
  "userId": ObjectId (reference to Users),
  "createdAt": Date
}
