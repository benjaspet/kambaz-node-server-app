import { v4 as uuidv4 } from "uuid";
export default function UsersDao(db) {
  const createUser = (user) => {
    const newUser = { ...user, _id: uuidv4() };
    db.users = [...db.users, newUser];
    return newUser;
  };
  const findAllUsers = () => db.users;
  const findUsersForCourse = (courseId) => {
    const enrolledUserIds = db.enrollments
      .filter((enrollment) => enrollment.course === courseId)
      .map((enrollment) => enrollment.user);
    return db.users.filter((user) => enrolledUserIds.includes(user._id));
  };
  const findUserById = (userId) => db.users.find((user) => user._id === userId);
  const findUserByUsername = (username) =>
    db.users.find((user) => user.username === username);
  const findUserByCredentials = (username, password) =>
    db.users.find(
      (user) => user.username === username && user.password === password,
    );
  const updateUser = (userId, userUpdates) => {
    const user = db.users.find((u) => u._id === userId);
    if (!user) {
      return null;
    }
    Object.assign(user, userUpdates);
    return user;
  };
  const deleteUser = (userId) => {
    db.users = db.users.filter((u) => u._id !== userId);
    db.enrollments = db.enrollments.filter((e) => e.user !== userId);
  };
  return {
    createUser,
    findAllUsers,
    findUsersForCourse,
    findUserById,
    findUserByUsername,
    findUserByCredentials,
    updateUser,
    deleteUser,
  };
}
