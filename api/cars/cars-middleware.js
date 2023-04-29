const carModel = require("./cars-model");
const vinValidator = require("vin-validator");
const checkCarId = async (req, res, next) => {
  try {
    const carId = req.params.id;
    const car = await carModel.getById(carId);
    if (car) {
      req.car = car;
      next();
    } else {
      res
        .status(404)
        .json({ mesaj: `${carId} kimliğine sahip araba bulunamadı` });
    }
  } catch (error) {
    next(error);
  }
};

const checkCarPayload = (req, res, next) => {
  try {
    const { vin, make, model, mileage } = req.body;
    if (vin) {
      if (make) {
        if (model) {
          if (mileage) {
            next();
          } else {
            res.status(400).json({ message: `mileage is missing` });
          }
        } else {
          res.status(400).json({ message: `model is missing` });
        }
      } else {
        res.status(400).json({ message: `make is missing` });
      }
    } else {
      res.status(400).json({ message: `vin is missing` });
    }
  } catch (error) {
    next(error);
  }
};

const checkVinNumberValid = (req, res, next) => {
  try {
    const vin = req.body.vin;
    if (vinValidator.validate(vin)) {
      next();
    } else {
      res.status(400).json({ message: `vin ${vin} is invalid` });
    }
  } catch (error) {
    next(error);
  }
};

const checkVinNumberUnique = async (req, res, next) => {
  try {
    const vin = req.body.vin;
    const allCars = await carModel.getAll();
    const car = allCars.find((car) => car.vin === vin);
    if (car) {
      res.status(400).json({ message: `vin ${vin} already exists` });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};
module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
};
