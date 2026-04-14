import { v4 as uuidv4 } from "uuid";
import model from "../courses/model.js";
import modulesModel from "./model.js";

export default function ModulesDao(db) {
  async function findModulesForCourse(courseId) {
    const course = await model.findById(courseId);
    return course.modules;
  }
  async function createModule(courseId, module) {
    const newModule = { ...module, _id: uuidv4() };
    if (newModule.title && !newModule.name) {
      newModule.name = newModule.title;
      delete newModule.title;
    }
    const status = await model.updateOne(
      { _id: courseId },
      { $push: { modules: newModule } },
    );
    if (!status.matchedCount) {
      return null;
    }
    await modulesModel.create({ ...newModule, course: courseId });
    return newModule;
  }
  async function deleteModule(courseId, moduleId) {
    const status = await model.updateOne(
      { _id: courseId },
      { $pull: { modules: { _id: moduleId } } },
    );
    return status;
  }
  async function updateModule(courseId, moduleId, moduleUpdates) {
    const course = await model.findById(courseId);
    const module = course.modules.id(moduleId);
    Object.assign(module, moduleUpdates);
    await course.save();
    return module;
  }

  return {
    findModulesForCourse,
    createModule,
    deleteModule,
    updateModule,
  };
}
