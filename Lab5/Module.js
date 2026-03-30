import { moduleState } from "./WorkingWithObjects.js";

export default function Module(app) {
    app.get("/lab5/module", (req, res) => {
        res.json(moduleState);
    })
    app.get("/lab5/module/name", (req, res) => {
        res.json(moduleState.name);
    })
    app.get("/lab5/module/description", (req, res) => {
        res.json(moduleState.description);
    })
}