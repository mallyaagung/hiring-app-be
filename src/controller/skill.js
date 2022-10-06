const skillModel = require("../models/skill");
const skillController = {
  getAllSkill: (req, res) => {
    skillModel
      .selectAll()
      .then((result) => res.json(result.rows))
      .catch((err) => res.send(err));
  },
  getSkill: (req, res) => {
    const id = Number(req.params.id);
    skillModel
      .select(id)
      .then((result) => res.json(result.rows))
      .catch((err) => res.send(err));
  },
  insert: (req, res) => {
    const { id, name } = req.body;
    skillModel
      .insert(id, name)
      .then(res.json("Skill created"))
      .catch((err) => res.send(err));
  },
  update: (req, res) => {
    const id = Number(req.params.id);
    const name = req.body.categoryname;
    skillModel
      .update(id, name)
      .then(res.json("Skill updated"))
      .catch((err) => res.send(err));
  },
  delete: (req, res) => {
    const id = Number(req.params.id);
    skillModel
      .deleteSkill(id)
      .then(res.json("Skill deleted"))
      .catch((err) => res.send(err));
  },
};

module.exports = skillController;
