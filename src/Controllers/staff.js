import  Staff  from "../models/Staff.js";
let createStaff = async (req, res, next) => {
  try {
    let staffData = req.body;
    staffData.accountId = req.id;
    let newStaff = await Staff.create(staffData);
    res.status(201).json({ message: "successAdd", data: newStaff });
  } catch (error) {
    next(error);
  }
};
let getAllstaff = async (req, res, next) => {
  try {
    let allSatff = await Staff.find().select("-password -__v");
    res.status(200).json({ message: "success", data: allSatff });
  } catch (error) {
    next(error);
  }
};
let editStaff = async (req, res, next) => {
  try {
    let { id } = req.params;
    let updatedStaff = await Staff.findByIdAndUpdate(id, req.body, {
      returnDocument: "after",
      runValidators: true,
    });
    if (!updatedStaff) {
      return res.status(404).json({ message: "not found" });
    }
    res
      .status(200)
      .json({ message: "Staff updated successfully", data: updatedStaff });
  } catch (error) {
    next(error);
  }
};
let deletedStaff = async (req, res, next) => {
  try {
    let { id } = req.params;
    let removeStaff = await Staff.findByIdAndDelete(id);
    if (!removeStaff) {
      return res.status(404).json({ message: "not found" });
    }
    res.status(200).json({ message: "Staff deleted successfully " });
  } catch (error) {
    next(error);
  }
};
export { createStaff, getAllstaff, editStaff, deletedStaff };
