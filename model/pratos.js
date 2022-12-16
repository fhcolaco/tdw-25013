const mongoose = require("mongoose");

const pratoSchema = new mongoose.Schema(
  {
    cod: {
      required: true,
      type: Number,
      unique: true,
    },
    nome_do_prato: {
      required: true,
      type: String,
    },
    preco: {
      required: true,
      type: Number,
    },
    tipo: {
      required: true,
      type: String,
    },
    categoria: {
      required: true,
      type: String,
    },
    ingredientes: {
      required: true,
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("menu_do_dia", pratoSchema, "menu_do_dia");
