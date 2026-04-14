import model from "./model.js";
import usersModel from "../users/model.js";
import coursesModel from "../courses/model.js";

export default function EnrollmentsDao(db) {
  async function findCoursesForUser(userId) {
    const enrollments = await model.find({ user: userId }).lean();
    const courseIds = enrollments.map((enrollment) => enrollment.course);
    return coursesModel.find({ _id: { $in: courseIds } });
  }

  async function findUsersForCourse(courseId) {
    const enrollments = await model.find({ course: courseId }).lean();
    const userIds = enrollments.map((enrollment) => enrollment.user);
    return usersModel.find({ _id: { $in: userIds } });
  }

  function enrollUserInCourse(userId, courseId) {
    return model.create({
      user: userId,
      course: courseId,
      _id: `${userId}-${courseId}`,
    });
  }

  function unenrollUserFromCourse(user, course) {
    return model.deleteOne({ user, course });
  }

  function unenrollAllUsersFromCourse(courseId) {
    return model.deleteMany({ course: courseId });
  }

  return {
    findCoursesForUser,
    findUsersForCourse,
    enrollUserInCourse,
    unenrollUserFromCourse,
    unenrollAllUsersFromCourse,
  };
}
