import { Router } from "express";
import { prisma } from "../db.js";

const router = Router();

router.get("/products", async (req, res) => {
  const products = await prisma.product.findMany();
  res.json(products);
});

router.get("/products/:id", async (req, res) => {
  try {
    const productsFound = await prisma.product.findFirst({
      where: {
        id: parseInt(req.params.id),
      },
      include: {
        category: true,
      },
    });
    return res.json(productsFound);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/products", async (req, res) => {
  const newProducts = await prisma.product.create({
    data: req.body,
  });
  res.json(newProducts);
});

router.delete("/products/:id", async (req, res) => {
  const productDeleted = await prisma.product.delete({
    where: {
      id: parseInt(req.params.id),
    },
  });
  if (!productDeleted)
    return res.status(404).json({ error: "Product not found" });
  return res.json(productDeleted);
});

router.put("/products/:id", async (req, res) => {
  const productUpdate = await prisma.product.update({
    where: {
      id: parseInt(req.params.id),
    },
    data: req.body,
  });
  return res.json(productUpdate);
});

export default router;
