import { NextFunction, Request, Response } from "express";
import { Course } from "../entities";
import { ErrorHandler } from "../errors/errors";
import { courseRepository } from "../repositories";

const verifyCourseExist = async (req: Request, res: Response, next: NextFunction) => {
 
  const foundedCourses: Course[] = await courseRepository.listAll();
  const foundCourse = foundedCourses.find(course=>course.id === req.params.id);
  if (!foundCourse) {
     throw new ErrorHandler(404, "Course doesn't exists")        
    }
  
  return next();
};

export default verifyCourseExist