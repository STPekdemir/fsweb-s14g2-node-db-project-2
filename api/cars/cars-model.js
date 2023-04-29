const db = require("../../data/db-config");

const getAll = () => {
  return db("cars");
};

const getById = (id) => {
  return db("cars").where("id", id).first();
};

const create = (data) => {
  return db("cars")
    .insert(data)
    .then((id) => {
      return getById(id[0]);
    });
};
module.exports = {
  getAll,
  getById,
  create,
};
