import EnrollmentsDao from "./dao.js";

export default function EnrollmentsRoutes(app, db) {
  const dao = EnrollmentsDao(db);

  const enrollCurrentUserInCourse = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    const { courseId } = req.params;
    const enrollment = dao.enrollUserInCourse(currentUser._id, courseId);
    res.json(enrollment);
  };

  const unenrollCurrentUserFromCourse = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    const { courseId } = req.params;
    const deleted = dao.unenrollUserFromCourse(currentUser._id, courseId);
    if (!deleted) {
      res.sendStatus(404);
      return;
    }
    res.sendStatus(200);
  };

  app.post("/api/users/current/courses/:courseId", enrollCurrentUserInCourse);
  app.delete("/api/users/current/courses/:courseId", unenrollCurrentUserFromCourse);
}