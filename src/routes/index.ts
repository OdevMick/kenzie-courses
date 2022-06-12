import { Express } from "express";
import courseRouter from "./course.route";
import userRouter from "./user.route";
import swaggerUiExpress from "swagger-ui-express";
import swaggerDocument from "./../../swagger.json"

const registerRouters = (app: Express): void => {

    app.use(userRouter);
    app.use(courseRouter);
    app.use(
      "/api-documentation",
      swaggerUiExpress.serve,
      swaggerUiExpress.setup(swaggerDocument)
    );
  };
  
export default registerRouters;


