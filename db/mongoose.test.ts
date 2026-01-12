import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import mongoose from 'mongoose';
import { connectToDB } from './mongoose';

describe('Database Connection', () => {
  beforeEach(() => {
    // Clear the mongoose cache before each test
    if (global.mongooseCache) {
      global.mongooseCache.conn = null;
      global.mongooseCache.promise = null;
    }
  });

  afterAll(async () => {
    // Close all mongoose connections after tests
    await mongoose.connection.close();
  });

  it('should throw an error if MONGODB_URI is not defined', async () => {
    const originalUri = process.env.MONGODB_URI;
    delete process.env.MONGODB_URI;

    await expect(connectToDB()).rejects.toThrow('MONGODB_URI is not defined');

    // Restore the original URI
    if (originalUri) {
      process.env.MONGODB_URI = originalUri;
    }
  });

  it('should connect to MongoDB successfully', async () => {
    if (!process.env.MONGODB_URI) {
      // Skip test if MONGODB_URI is not set in environment
      console.warn('MONGODB_URI is not set, skipping connection test');
      return;
    }

    await connectToDB();

    expect(mongoose.connection.readyState).toBe(1); // 1 = connected
    expect(global.mongooseCache?.conn).toBeDefined();
  });

  it('should reuse existing connection on subsequent calls', async () => {
    if (!process.env.MONGODB_URI) {
      console.warn('MONGODB_URI is not set, skipping connection test');
      return;
    }

    // First connection
    const firstConnection = await connectToDB();
    
    // Second connection should return the same cached connection
    const secondConnection = await connectToDB();

    expect(firstConnection).toBe(secondConnection);
    expect(global.mongooseCache?.conn).toBe(firstConnection);
  });

  it('should handle connection errors gracefully', async () => {
    const originalUri = process.env.MONGODB_URI;
    process.env.MONGODB_URI = 'mongodb://invalid-uri-that-does-not-exist:27017/test';

    // Clear cache before attempting connection
    if (global.mongooseCache) {
      global.mongooseCache.conn = null;
      global.mongooseCache.promise = null;
    }

    await expect(connectToDB()).rejects.toThrow();

    // Restore the original URI
    if (originalUri) {
      process.env.MONGODB_URI = originalUri;
    }
  });
});
