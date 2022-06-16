import jwt from 'jsonwebtoken';
import AppDataSource from "../data-source";
import { existsSync } from "fs";
import path from "path";
import { unlink } from "fs/promises";
import { DataSource } from "typeorm";
import { Course, User } from '../entities';
import supertest from 'supertest';
import app from '../app';
import { response, Response } from 'express';


class Connection {
  dbPath: string;
  dbConnection: Promise<DataSource>;

  constructor() {
    this.dbPath = path.join(__dirname, "../../dbTest.sqlite");
  }

  create = async () => {
    if (existsSync(this.dbPath)) {
      await unlink(this.dbPath);
    }

    this.dbConnection = AppDataSource.initialize();
  };

  close = async () => {
    const connection = await this.dbConnection;
    await connection.destroy();

    if (existsSync(this.dbPath)) {
      await unlink(this.dbPath);
    }
  };

  clear = async () => {
    const connection = await this.dbConnection;
    const entities = connection.entityMetadatas;

    entities.forEach(async (entity) => {
      const repository = connection.getRepository(entity.name);
      await repository.query(`DELETE FROM ${entity.tableName}`);
    });
  };
}
const createAuthorization = (id: string):string => {
  return jwt.sign({ id }, process.env.SECRET_KEY as string, {
    expiresIn: process.env.EXPIRES_IN,
  });
}


export { 
  Connection, 
  createAuthorization, 
};