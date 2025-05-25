const mongoose = require('mongoose');
const { countConnectedClients } = require('../helpers/connectChecker');

const _CONNECTION_STRING =
  process.env.MONGODB_URI ||
  'mongodb+srv://nhatnam312002:xlJkNxzJfQi4fxvH@cluster0.y4vzsta.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

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
      await mongoose.connect(_CONNECTION_STRING, {
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
