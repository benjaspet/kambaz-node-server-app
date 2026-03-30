const assignment = {
  id: 1,
  title: "NodeJS Assignment",
  description: "Create a NodeJS server with ExpressJS",
  due: "2021-10-10",
  completed: false,
  score: 0,
};

export const moduleState = {
  id: 123,
  name: "My Module",
  description: "My Module Description",
  course: "CS4550",
};

export default function WorkingWithObjects(app) {
  const getAssignment = (req, res) => {
    res.json(assignment);
  };
  const getAssignmentTitle = (req, res) => {
    res.json(assignment.title);
  };
  const setAssignmentTitle = (req, res) => {
    const { newTitle } = req.params;
    assignment.title = newTitle;
    res.json(assignment);
  };

  const setAssignmentScore = (req, res) => {
    const { newScore } = req.params;
    const parsedScore = Number(newScore);
    if (Number.isNaN(parsedScore)) {
      res.status(400).json({ error: "newScore must be a number" });
      return;
    }
    assignment.score = parsedScore;
    res.json(assignment);
  };

  const setAssignmentCompleted = (req, res) => {
    const { newCompleted } = req.params;
    const normalized = String(newCompleted).toLowerCase();
    assignment.completed = normalized === "true" || normalized === "1" || normalized === "yes";
    res.json(assignment);
  };

  const setModuleName = (req, res) => {
    const { newName } = req.params;
    moduleState.name = newName;
    res.json(moduleState);
  };

  const setModuleDescription = (req, res) => {
    const { newDescription } = req.params;
    moduleState.description = newDescription;
    res.json(moduleState);
  };

  app.get("/lab5/assignment/title/:newTitle", setAssignmentTitle);
  app.get("/lab5/assignment/score/:newScore", setAssignmentScore);
  app.get("/lab5/assignment/completed/:newCompleted", setAssignmentCompleted);
  app.get("/lab5/module/name/:newName", setModuleName);
  app.get("/lab5/module/description/:newDescription", setModuleDescription);
  app.get("/lab5/assignment/title", getAssignmentTitle);
  app.get("/lab5/assignment", getAssignment);
}
