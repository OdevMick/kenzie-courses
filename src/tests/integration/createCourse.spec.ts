import { Request, Response } from 'express';
import jwt from "jsonwebtoken";
import supertest from "supertest";
import app from "../../app";
import { Course, User } from "../../entities";
import { Connection, createAuthorization } from "../index";

describe("Create course route",() => {
  const dbConnection = new Connection();
  beforeAll(async()=> await dbConnection.create())
  afterAll(async()=> await dbConnection.close())
  beforeEach(async() => await dbConnection.clear())


  it("Return Course id as part of the response when status code is 201", async () => {

    const user: Partial<User> = {
      email: "teste@teste.com",
      password: "1234",
      firstName: "asdasd",
      lastName: "asdasdasd",
      isAdm: true
    }
    const responseUser = await supertest(app).post('/users').send({ ...user })
    const token = createAuthorization(responseUser.body.id)


    const course: Partial<Course> = {
      courseName: "Teste",
      duration: "200h"
    }
    const responseCourse = await supertest(app).post('/courses').send({ ...course }).set("Authorization",  `Token ${token}`)
    expect(responseCourse.status).toBe(201)
    expect(responseCourse.body).toHaveProperty("id")
  })
})