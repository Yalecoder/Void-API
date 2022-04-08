const knex = require("../Database/index");
const handleResponse = require("../utils/handleResponse");
const { upload } = require("../utils/upload");
const path = require("path");
const { response } = require("express");

const uploadFile = async (ficheiro, req) => {
  try {
    const { name, filename, mimetype } = upload(ficheiro, "anexo");
    return await knex("anexo").insert({
      nome_original: name,
      nome_ficheiro: filename,
      mime_type: mimetype,
      extensao: path.extname(ficheiro.name),
    });
  } catch (error) {
    console.log(error);
    return 1;
  }
};

exports.all = async (req, res) => {
  try {
    const all = await knex("user").select();
    let response = [];

    for (let i = 0; i < all.length; i++) {
      const capa = await knex("anexo").where("id", all[i].ficheiro).first();

      let attach = all.ficheiro;
      attach = `${process.env.API_ADDRESS}/static/anexo/${
        (capa && capa.nome_ficheiro) || ""
      }`;

      response.push({
        id: all[i].id,
        nome: all[i].nome,
        contacto: all[i].contacto,
        ficheiro: attach,
      });
    }

    return handleResponse(req, res, 200, response);
  } catch (error) {
    return handleResponse(req, res, error);
  }
};

exports.byId = async (req, res) => {
  try {
    const id = req.params.id;

    const all = await knex("user").where("id", id).first();

    const capa = await knex("anexo").where("id", all.ficheiro).first();

    let attach = all.ficheiro;
    attach = `${process.env.API_ADDRESS}/static/anexo/${
      (capa && capa.nome_ficheiro) || ""
    }`;

    return handleResponse(req, res, 200, {
      id: all.id,
      nome: all.nome,
      contacto: all.contacto,
      ficheiro: attach,
    });
  } catch (error) {
    return handleResponse(req, res, error);
  }
};

exports.add = async (req, res) => {
  let ficheiro = 1;

  if (req.files && req.files.ficheiro) {
    ficheiro = await uploadFile(req.files.ficheiro, req);

    console.log(ficheiro);
  }

  try {
    knex("user")
      .insert({
        nome: req.body.nome,
        contacto: req.body.contacto,
        ficheiro: ficheiro,
      })
      .then((result) => {
        return handleResponse(req, res, 200, result);
      });
  } catch (error) {
    return handleResponse(req, res, error);
  }
};

exports.put = async (req, res) => {
  const id = req.params.id;

  try {
    const contacto = await knex("user").where({ id }).first();

    let ficheiro = contacto.ficheiro;

    if (req.files && req.files.ficheiro) {
      ficheiro = await uploadFile(req.files.ficheiro, req);
    }

    const update = await knex("user")
      .update({
        nome: req.body.nome,
        contacto: req.body.contacto,
        ficheiro: ficheiro,
      })
      .where("id", id);

    return handleResponse(req, res, 200, update);
  } catch (error) {
    return handleResponse(req, res, error);
  }
};

exports.search = async (req, res) => {
  try {
    const search = req.body.search;

    let response = [];

    const all = await knex("user").where("nome", search).first();

    const capa = await knex("anexo").where("id", all.ficheiro).first();

    let attach = all.ficheiro;
    attach = `${process.env.API_ADDRESS}/static/anexo/${
      (capa && capa.nome_ficheiro) || ""
    }`;

    response.push({
      id: all.id,
      nome: all.nome,
      contacto: all.contacto,
      ficheiro: attach,
    });

    return handleResponse(req, res, 200, response);
  } catch (error) {
    return handleResponse(req, res, error);
  }
};

exports.delete = async (req, res) => {
  try {
    const id = req.params.id;

    const del = await knex("user").delete().where("id", id);

    return handleResponse(req, res, 200, del);
  } catch (error) {
    return handleResponse(req, res, error);
  }
};
