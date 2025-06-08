const mongoose = require('mongoose');
const envBaseConfig = require('../configs/env.config');
const { countConnectedClients } = require('../helpers/connectChecker.helper');

class Database {
  constructor() {
    this._connect();
  }

  async _connect() {
    try {
      await mongoose.connect(envBaseConfig.db.uri, {
        maxPoolSize: 50,
      });
      console.log('🟢 Database connected successfully!!');
      countConnectedClients();
    } catch (error) {
      console.error('🔴 Database connection error::', error);
      process.exit(1);
    }
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}

const dbInstance = Database.getInstance();
module.exports = dbInstance;
