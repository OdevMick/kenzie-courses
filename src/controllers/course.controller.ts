import { Request, Response } from "express";
import { courseService } from "../services";

class CourseController {
  createCourse = async (req: Request, res: Response) => {
    const course = await courseService.createCourse(req);
    return res.status(201).json(course);
  };

  readAll = async (req: Request, res: Response) => {
    const courses = await courseService.readAllCourses(req);
    return res.status(200).json(courses);
  };

  updateCourse = async (req: Request, res: Response) => {
    const course = await courseService.updateCourse(req);
    return res.status(200).json(course);
  };
  acceptStudent = async (req: Request, res: Response) => {
    const course = await courseService.acceptStudent(req)
    const { status , message } = course
    return res.status(status).json({message})
  }
}

export default new CourseController();
