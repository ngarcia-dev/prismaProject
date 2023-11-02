import { Router } from "express";
import { prisma } from "../db.js";

const router = Router();

router.get("/categories", async (req, res) => {
  const categories = await prisma.category.findMany({
    //include devuelve con que modelo se esta relacionando para mostrar sus datos
    include: {
      //indica que el campo products se completa con los datos de esa relacion
      products: true,
    },
  });
  res.json(categories);
});

export default router;
