const fs = require('fs');
const path = require('path');

class SensorDataGenerator {
  constructor() {
    this.dataFile = path.join(__dirname, '../data/sensor-dataset.json');
    this.currentId = 1;
    this.maxRecords = 100;
    this.updateInterval = 30000; // 30 seconds
    this.zone = 'Zone-A1'; // Single zone only
    
    // Initialize data structure
    this.initializeData();
    
    // Start auto-update
    this.startAutoUpdate();
  }

  initializeData() {
    const initialData = {
      metadata: {
        totalRecords: this.maxRecords,
        generatedAt: new Date().toISOString(),
        description: "Dynamic sensor data for Zone-A1 smart drainage monitoring",
        zones: [this.zone],
        updateInterval: this.updateInterval,
        version: "1.0"
      },
      currentData: null,
      historicalData: [],
      dataGenerationRules: {
        "Zone-A1": {
          waterLevel: {min: 15, max: 85, trend: "fluctuating"},
          flowRate: {min: 8, max: 35, trend: "variable"},
          gasLevel: {min: 0.01, max: 0.08, trend: "stable"},
          temperature: {min: 20, max: 30, trend: "seasonal"},
          humidity: {min: 45, max: 85, trend: "variable"},
          pumpStatus: ["running", "stopped"],
          exhaustFanStatus: ["running", "stopped"]
        }
      }
    };

    // Generate initial dataset
    this.generateInitialDataset(initialData);
  }

  generateInitialDataset(data) {
    // Generate current data for Zone-A1
    const currentReading = this.generateSensorReading(this.zone);
    data.currentData = currentReading;

    // Generate 99 historical records for Zone-A1 (total 100 with current)
    for (let i = 1; i < this.maxRecords; i++) {
      const timestamp = new Date(Date.now() - i * 60000); // 1 minute intervals going back
      const sensorData = this.generateSensorReading(this.zone, timestamp);
      data.historicalData.push(sensorData);
    }

    this.saveData(data);
  }

  generateSensorReading(zoneId, timestamp = new Date()) {
    const rules = this.getZoneRules(zoneId);
    const reading = {
      id: this.currentId++,
      zoneId: zoneId,
      waterLevel: Math.round(this.generateValue(rules.waterLevel)),
      status: 'active', // Zone-A1 is always active
      flowRate: parseFloat(this.generateValue(rules.flowRate).toFixed(1)),
      gasLevel: parseFloat(this.generateValue(rules.gasLevel).toFixed(3)),
      temperature: parseFloat(this.generateValue(rules.temperature).toFixed(1)),
      humidity: Math.round(this.generateValue(rules.humidity)),
      pumpStatus: this.getRandomStatus(rules.pumpStatus),
      exhaustFanStatus: this.getRandomStatus(rules.exhaustFanStatus),
      timestamp: timestamp.toISOString(),
      lastUpdate: this.getRelativeTime(timestamp)
    };

    return reading;
  }

  generateValue(rule) {
    const range = rule.max - rule.min;
    let value = rule.min + Math.random() * range;
    
    // Apply trend modifications
    switch (rule.trend) {
      case 'increasing':
        value += Math.random() * 0.1 * range;
        break;
      case 'decreasing':
        value -= Math.random() * 0.1 * range;
        break;
      case 'fluctuating':
        value += (Math.random() - 0.5) * 0.2 * range;
        break;
    }
    
    // Ensure value stays within bounds
    return Math.max(rule.min, Math.min(rule.max, value));
  }

  getRandomStatus(statusArray) {
    return statusArray[Math.floor(Math.random() * statusArray.length)];
  }

  getZoneRules(zoneId) {
    const defaultRules = {
      waterLevel: {min: 15, max: 85, trend: "fluctuating"},
      flowRate: {min: 8, max: 35, trend: "variable"},
      gasLevel: {min: 0.01, max: 0.08, trend: "stable"},
      temperature: {min: 20, max: 30, trend: "seasonal"},
      humidity: {min: 45, max: 85, trend: "variable"},
      pumpStatus: ["running", "stopped"],
      exhaustFanStatus: ["running", "stopped"]
    };

    try {
      const data = JSON.parse(fs.readFileSync(this.dataFile, 'utf8'));
      return data.dataGenerationRules[zoneId] || defaultRules;
    } catch (error) {
      return defaultRules;
    }
  }

  getRelativeTime(timestamp) {
    const now = new Date();
    const diff = Math.floor((now - timestamp) / 60000); // minutes
    
    if (diff < 1) return "Just now";
    if (diff === 1) return "1 min ago";
    if (diff < 60) return `${diff} min ago`;
    
    const hours = Math.floor(diff / 60);
    if (hours === 1) return "1 hour ago";
    if (hours < 24) return `${hours} hours ago`;
    
    const days = Math.floor(hours / 24);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  }

  updateData() {
    try {
      const data = JSON.parse(fs.readFileSync(this.dataFile, 'utf8'));
      
      // Move current data to historical (if it exists)
      if (data.currentData) {
        data.historicalData.unshift(data.currentData);
      }
      
      // Keep only last 99 historical records (total 100 with current)
      if (data.historicalData.length > 99) {
        data.historicalData = data.historicalData.slice(0, 99);
      }
      
      // Generate new current data for Zone-A1
      data.currentData = this.generateSensorReading(this.zone);
      
      // Update metadata
      data.metadata.generatedAt = new Date().toISOString();
      data.metadata.totalRecords = 1 + data.historicalData.length;
      
      this.saveData(data);
      console.log(`[${new Date().toLocaleTimeString()}] Zone-A1 sensor data updated - ${data.metadata.totalRecords} total records`);
      
    } catch (error) {
      console.error('Error updating data:', error);
    }
  }

  saveData(data) {
    try {
      // Ensure data directory exists
      const dataDir = path.dirname(this.dataFile);
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      
      fs.writeFileSync(this.dataFile, JSON.stringify(data, null, 2));
    } catch (error) {
      console.error('Error saving data:', error);
    }
  }

  startAutoUpdate() {
    console.log(`Starting automatic data generation every ${this.updateInterval/1000} seconds...`);
    console.log(`Data file: ${this.dataFile}`);
    
    // Update immediately
    this.updateData();
    
    // Set up interval for continuous updates
    setInterval(() => {
      this.updateData();
    }, this.updateInterval);
  }

  stop() {
    console.log('Stopping data generator...');
    process.exit(0);
  }
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\nReceived SIGINT, shutting down gracefully...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\nReceived SIGTERM, shutting down gracefully...');
  process.exit(0);
});

// Start the generator
const generator = new SensorDataGenerator();

console.log('Sensor Data Generator Started!');
console.log('Press Ctrl+C to stop');
