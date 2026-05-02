import  testReference  from "../models/testReference.js";

const createRef = async (req, res) => {
    try {
        const createdRef = await testReference.create(req.body);
        res.status(201).json({
            message:" test reference created successfully",
            data: createdRef
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const getAllRefs = async (req, res) => {
    try {
        const refs = await testReference.find();
        res.status(200).json({
            message: "test references retrieved successfully",
            data: refs
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const editRef = async (req, res) => {
    const { id } = req.params;
    try {
      const updatedRef = await testReference.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedRef) {
        return res.status(404).json({ message: "Test reference not found" });
      }
      res.status(200).json({
        message: "Test reference updated successfully",
        data: updatedRef
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
}

const deleteRef = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedRef = await testReference.findByIdAndDelete(id);
        if (!deletedRef) {
            return res.status(404).json({ message: "Test reference not found" });
        }
        res.status(200).json({
            message: "Test reference deleted successfully",
            data: deletedRef
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}