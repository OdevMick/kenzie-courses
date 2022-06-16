import supertest from "supertest";
import app from "../../app";
import { User } from "../../entities";
import { Connection } from "../index";

describe("Create user route",() => {
  const dbConnection = new Connection();
  beforeAll(async()=> await dbConnection.create())
  afterAll(async()=> await dbConnection.close())
  beforeEach(async() => await dbConnection.clear())


  it("Return token as response when status code is 200", async () => {
    const user: Partial<User> = {
      email: "teste2@teste2.com",
      password: "1234",
      firstName: "asdasd",
      lastName: "asdasdasd",
      isAdm: true
    }
    const response = await supertest(app).post('/users').send({ ...user })
    const responseLogin = await supertest(app).post('/login').send({ email: "teste2@teste2.com", password: "1234" })
    expect(responseLogin.status).toBe(200)
    expect(response.body).toHaveProperty("token")
  })

})