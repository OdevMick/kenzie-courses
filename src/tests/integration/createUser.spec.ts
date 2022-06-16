import supertest from "supertest";
import app from "../../app";
import { User } from "../../entities";
import { Connection } from "../index";

describe("Create user route",() => {
  const dbConnection = new Connection();
  beforeAll(async()=> await dbConnection.create())
  afterAll(async()=> await dbConnection.close())
  beforeEach(async() => await dbConnection.clear())

  it("Return User as response when status code is 201", async () => {
    const user: Partial<User> = {
      email: "teste2@teste2.com",
      password: "1234",
      firstName: "asdasd",
      lastName: "asdasdasd",
      isAdm: true
    }
    const response = await supertest(app).post('/users').send({ ...user })
    expect(response.status).toBe(201)
    expect(response.body.email).toBe(user.email)
  })

  it("Return body error when missing email", async()=>{
    const user: Partial<User> = {
      password: "1234",
      firstName: "asdasd",
      lastName: "asdasdasd",
      isAdm: true
    }
    const response = await supertest(app).post('/users').send({ ...user })
    expect(response.status).toBe(400)
    expect(response.body.message[0]).toStrictEqual("email is a required field")
  })
})