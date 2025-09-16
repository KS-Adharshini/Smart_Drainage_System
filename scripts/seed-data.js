// MongoDB seed data script
// Run this script to populate your database with sample data

const sampleUsers = [
  {
    name: "John Doe",
    email: "john@example.com",
    password: "$2a$12$hashedpassword", // bcrypt hashed password
    createdAt: new Date()
  },
  {
    name: "Jane Smith", 
    email: "jane@example.com",
    password: "$2a$12$hashedpassword",
    createdAt: new Date()
  }
]

const sampleZones = [
  {
    zoneId: "Zone-A1",
    name: "Downtown District",
    location: { latitude: 40.7128, longitude: -74.0060 },
    thresholds: { low: 30, medium: 60, high: 80, critical: 90 },
    createdAt: new Date()
  },
  {
    zoneId: "Zone-B2", 
    name: "Industrial Area",
    location: { latitude: 40.7589, longitude: -73.9851 },
    thresholds: { low: 25, medium: 55, high: 75, critical: 85 },
    createdAt: new Date()
  },
  {
    zoneId: "Zone-C3",
    name: "Residential North",
    location: { latitude: 40.7831, longitude: -73.9712 },
    thresholds: { low: 35, medium: 65, high: 85, critical: 95 },
    createdAt: new Date()
  }
]

const sampleSensorData = [
  {
    zoneId: "Zone-A1",
    waterLevel: 25,
    sensorStatus: "active",
    timestamp: new Date()
  },
  {
    zoneId: "Zone-B2",
    waterLevel: 65, 
    sensorStatus: "active",
    timestamp: new Date()
  },
  {
    zoneId: "Zone-C3",
    waterLevel: 85,
    sensorStatus: "active",
    timestamp: new Date()
  }
]

const sampleAlerts = [
  {
    message: "Water level critical in drainage zone A1",
    severity: "critical",
    zoneId: "Zone-A1",
    timestamp: new Date(),
    resolved: false
  },
  {
    message: "Sensor connectivity issue detected",
    severity: "high", 
    zoneId: "Zone-B2",
    timestamp: new Date(),
    resolved: false
  }
]

// Export for use in MongoDB seeding script
module.exports = {
  sampleUsers,
  sampleZones,
  sampleSensorData,
  sampleAlerts
}
