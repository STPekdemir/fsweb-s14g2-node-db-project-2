const express = require("express");
const router = express.Router();
const carModel = require("./cars-model");
const carMiddleware = require("./cars-middleware");
router.get("/", async (req, res, next) => {
  try {
    const cars = await carModel.getAll();
    res.status(200).json(cars);
  } catch (error) {
    next(error);
  }
});
router.get("/:id", carMiddleware.checkCarId, async (req, res, next) => {
  try {
    const car = req.car;

    res.status(200).json(car);
  } catch (error) {
    next(error);
  }
});
router.post(
  "/",
  carMiddleware.checkCarPayload,
  carMiddleware.checkVinNumberValid,
  carMiddleware.checkVinNumberUnique,
  async (req, res, next) => {
    try {
      const newCar = await carModel.create(req.body);
      res.status(201).json(newCar);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
