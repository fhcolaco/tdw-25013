const express = require("express");
const router = express.Router();
const Prato = require("../model/pratos");

//GET ALL method
router.get("/", (req, res) => {
  Prato.find().then((result) => {
    if (result === null) res.status(400).send("O prato não foi encontrado");
    else res.status(200).send(result);
  });
});

//GET ONE method
router.get("/:id", async (req, res) => {
  const ID = parseInt(req.params.id);
  Prato.findOne({ cod: ID }).then((result) => {
    if (result === null) res.status(400).send("O prato não foi encontrado");
    else res.status(200).send(result);
  });
});

//POST method
router.post("/", async (req, res) => {
  let bool = true;
  let newID = 1;
  while (bool) {
    await Prato.findOne({ cod: newID }).then((result) => {
      if (result === null) {
        bool = false;
      } else {
        newID = newID + 1;
      }
    });
  }
  Prato.create({
    cod: newID,
    nome_do_prato: req.body.nome_do_prato,
    preco: req.body.preco,
    tipo: req.body.tipo,
    categoria: req.body.categoria,
    ingredientes: req.body.ingredientes,
  })
    .then((prato) => {
      res
        .status(200)
        .send(prato.nome_do_prato + " foi adicionado à base de dados");
    })
    .catch((error) => {
      res.status(400).json({ message: error.message });
    });
});

//PATCH UPDATE BY ID method
router.patch("/:id", (req, res) => {
  const ID = parseInt(req.params.id);
  Prato.updateOne({ cod: ID }, req.body)
    .then((prato) => {
      Prato.findOne({ cod: ID }).then((prato) => {
        res
          .status(200)
          .send(prato.nome_do_prato + " foi atualizado na base de dados");
      });
    })
    .catch((error) => {
      res.status(400).json({ message: error.message });
    });
});

//DELETE BY ID method
router.delete("/:id", async (req, res) => {
  const ID = parseInt(req.params.id);
  const temp = await Prato.findOne({ cod: ID });
  await Prato.deleteOne({ cod: ID })
    .then(() => {
      res.status(200).send(temp.nome_do_prato + " foi eliminado");
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
});
module.exports = router;
