const express = require("express");
const router = express.Router();
const Carrito = require("../classes/Carrito");

// GET /api/carrito/:id/productos
router.get("/:id/productos", async (req, res) => {
  const { id } = req.params;
  const data = await Carrito.getProductsByCartId(id);
  if (data === false) {
    res.status(404).send({ error: "No se encontraron carritos." });
  } else {
    if (data === null) {
      res
        .status(404)
        .send({ error: "No se encontraron productos en el carrito." });
    } else {
      res.status(200).json({ cartProducts: data.productos });
    }
  }
});

// POST /api/carrito
router.post("/", async (req, res) => {
  const newCart = req.body;
  if (
    Object.entries(newCart).length === 0 ||
    Object.entries(newCart).length < 3
  ) {
    const data = await Carrito.createNewCart(newCart);
    res.status(201).json({ newCart: data });
  } else {
    res.status(422).json({
      error: "No se pudo obtener los atributos del carrito correctamente.",
    });
  }
});

// POST /api/carrito/:id/productos
router.post("/:id/productos", async (req, res) => {
  const { id } = req.params;
  const newProduct = req.body;
  if (
    Object.entries(newProduct).length === 0 ||
    Object.entries(newProduct).length < 7
  ) {
    const data = await Carrito.createNewProduct(id, newProduct);
    if (data === undefined) {
      res.status(404).send({ error: "No se encontraron carritos." });
    } else {
      if (data === false) {
        res.status(404).send({ error: "No se encontró el carrito." });
      } else {
        res.status(201).json({ newProduct: data });
      }
    }
  } else {
    res.status(422).json({
      error: "No se pudo obtener los atributos del producto correctamente.",
    });
  }
});

// DELETE /api/carrito/:id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const data = await Carrito.deleteCartById(id);
  if (data === false) {
    res.status(404).send({ error: "No se encontró el carrito." });
  } else {
    if (data === null) {
      res.status(404).send({ error: "No se encontraron carritos." });
    } else {
      res.status(200).send({ success: "Se eliminó el carrito correctamente." });
    }
  }
});

// DELETE /api/carrito/:id/productos/:id_prod
router.delete("/:id/productos/:id_prod", async (req, res) => {
  const { id, id_prod } = req.params;
  const data = await Carrito.deleteProductOfCartById(id, id_prod);
  if (data === false) {
    res
      .status(404)
      .send({ error: "No se encontraron los productos del carrito." });
  } else {
    if (data === null) {
      res.status(404).send({ error: "No se encontraron carritos." });
    } else {
      if (data === undefined) {
        res.status(404).send({ error: "No se encontró el producto." });
      } else {
        res
          .status(200)
          .send({ success: "Se eliminó el carrito correctamente." });
      }
    }
  }
});

module.exports = router;