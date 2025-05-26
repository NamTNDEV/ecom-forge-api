const mongoose = require('mongoose');
const envBaseConfig = require('../configs/env.config');
const { countConnectedClients } = require('../helpers/connectChecker.helper');

class Database {
  constructor() {
    this.db = this.connect();
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  async connect() {
    try {
      await mongoose.connect(envBaseConfig.db.uri, {
        maxPoolSize: 50,
      });
      console.log('🟢 Database connected successfully!!');
      // Optionally, you can log the number of connected clients
      countConnectedClients();
    } catch (error) {
      console.error('🔴 Database connection error::', error);
      throw error;
    }
  }
}

const dbInstance = Database.getInstance();
module.exports = dbInstance;
