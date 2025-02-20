import { Router } from "express";
import { check } from "express-validator";
import { verifyAuthToken } from "../middlewares/verifyAuthToken";
import { notEmptyBody } from "../middlewares/notEmptyBody";
import { createService, deleteService, getServiceById, getServices, updateService } from "../controllers/serviceControllers";
import { validateFields } from "../middlewares/validateFields";

export const serviceRouter = Router();

serviceRouter.get("/", getServices);

serviceRouter.get("/:id", getServiceById);

serviceRouter.post(
  "/",
  [
    verifyAuthToken,
    check("title").notEmpty().withMessage("El título es obligatorio"),
    check("description")
      .notEmpty()
      .withMessage("La descripción es obligatoria"),
    check("category").notEmpty().withMessage("La categoría es obligatoria"),
    check("hourlyRate")
      .notEmpty()
      .withMessage("La tarifa por hora es obligatoria")
      .isFloat({ min: 0 })
      .withMessage("La tarifa por hora debe ser un número positivo"),
    notEmptyBody,
    validateFields,
  ],
  createService
);

serviceRouter.put("/:id", [verifyAuthToken, notEmptyBody], updateService);

serviceRouter.delete("/:id", [verifyAuthToken], deleteService);
