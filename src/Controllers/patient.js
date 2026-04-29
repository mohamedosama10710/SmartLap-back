import Patient from "../models/Patient.js";

//create patient
export const createPatient = async (req, res, next) => {
  try {
    const newPatient = await Patient.create(req.body);
    res.status(201).json({
      status: "success",
      data: { patient: newPatient },
    });
  } catch (error) {
    next(error);
  }
};

//get all patient
export const getAllPatients = async (req, res, next) => {
  try {
    const patients = await Patient.find();
    res.status(200).json({
      status: "success",
      results: patients.length,
      data: { patients },
    });
  } catch (error) {
    next(error);
  }
};

//get patient profile
export const getPatientProfile = async (req, res, next) => {
  try {
    const patient = await Patient.findOne({ accountId: req.user._id }).populate(
      "accountId",
      "name phone email",
    );

    if (!patient) {
      const error = new Error("Patient profile not found");
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({
      status: "success",
      data: { patient },
    });
  } catch (error) {
    next(error);
  }
};

//update age weight height
export const updatePatientProfile = async (req, res, next) => {
  try {
    const { age, weight, height } = req.body;

    const updatedPatient = await Patient.findOneAndUpdate(
      { accountId: req.user._id },
      { age, weight, height },
      { new: true, runValidators: true },
    );

    if (!updatedPatient) {
      const error = new Error("Patient profile not found");
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({
      status: "success",
      data: { patient: updatedPatient },
    });
  } catch (error) {
    next(error);
  }
};

// get patient by id
export const getPatientById = async (req, res, next) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      const error = new Error("No patient found with that ID");
      error.statusCode = 404;
      return next(error);
    }
    res.status(200).json({
      status: "success",
      data: { patient },
    });
  } catch (error) {
    next(error);
  }
};

//Edit patient By id
export const updatePatient = async (req, res, next) => {
  try {
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!patient) {
      const error = new Error("No patient found with that ID");
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({
      status: "success",
      data: { patient },
    });
  } catch (error) {
    next(error);
  }
};

//delete paient by id
export const deletePatient = async (req, res, next) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);
    if (!patient) {
      const error = new Error("No patient found with that ID");
      error.statusCode = 404;
      return next(error);
    }
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};