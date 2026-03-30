import axios from "axios";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER || "http://localhost:4000";
const ASSIGNMENTS_API = `${REMOTE_SERVER}/api`;

const axiosWithCredentials = axios.create({ withCredentials: true });

export const findAssignmentsForCourse = async (courseId) => {
  const response = await axiosWithCredentials.get(
    `${ASSIGNMENTS_API}/courses/${courseId}/assignments`,
  );
  return response.data;
};

export const findAssignmentById = async (assignmentId) => {
  const response = await axiosWithCredentials.get(
    `${ASSIGNMENTS_API}/assignments/${assignmentId}`,
  );
  return response.data;
};

export const createAssignmentForCourse = async (courseId, assignment) => {
  const response = await axiosWithCredentials.post(
    `${ASSIGNMENTS_API}/courses/${courseId}/assignments`,
    assignment,
  );
  return response.data;
};

export const updateAssignment = async (assignmentId, assignment) => {
  const response = await axiosWithCredentials.put(
    `${ASSIGNMENTS_API}/assignments/${assignmentId}`,
    assignment,
  );
  return response.data;
};

export const deleteAssignment = async (assignmentId) => {
  const response = await axiosWithCredentials.delete(
    `${ASSIGNMENTS_API}/assignments/${assignmentId}`,
  );
  return response.data;
};
