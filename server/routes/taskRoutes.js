const Task = require("../models/Task");
const createCrudRouter = require("./crudRouter");

module.exports = createCrudRouter(Task);