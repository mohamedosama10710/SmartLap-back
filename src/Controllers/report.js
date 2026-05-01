// import { testReference } from "../models/testReference";
import testReference  from "../models/testReference.js";
import Report  from "../models/Report.js";

//create report
export const createReport = async (req, res, next) => {
  try {
    const { patient, referredBy, tests } = req.body;

    const staffId = req.user._id;

    if (!tests || tests.length === 0) {
      const error = new Error("Please provide at least one test.");
      error.statusCode = 400;
      return next(error);
    }

    const processedTests = [];
    let allTestsCompleted = true;

    for (const item of tests) {
      const reference = await testReference.findById(item.testId);

      if (!reference) {
        const error = new Error(
          `Test reference not found for ID: ${item.testId}`,
        );
        error.statusCode = 404;
        return next(error);
      }

      let currentStatus = "Pending";
      let isCritical = false;
      let adviceMessage = "";

      if (item.result !== undefined && item.result !== null) {
        currentStatus = "N";
        adviceMessage = reference.adviceTemplates?.normal || "";

        if (item.result < reference.min) {
          currentStatus = "L";
          adviceMessage = reference.adviceTemplates?.low || "";
        } else if (item.result > reference.max) {
          currentStatus = "H";
          adviceMessage = reference.adviceTemplates?.high || "";
        }

        if (reference.criticalRange) {
          if (
            (reference.criticalRange.low &&
              item.result <= reference.criticalRange.low) ||
            (reference.criticalRange.high &&
              item.result >= reference.criticalRange.high)
          ) {
            isCritical = true;
            adviceMessage =
              reference.adviceTemplates?.critical || adviceMessage;
          }
        }
      } else {
        allTestsCompleted = false;
      }

      processedTests.push({
        test: reference._id,
        result: item.result,
        status: currentStatus,
        critical: isCritical,
        patientAdvice: adviceMessage,
        testName: reference.testName,
        category: reference.category,
        unit: reference.unit,
        referenceRange: {
          low: reference.min,
          high: reference.max,
        },
        referenceText: reference.referenceText,
      });
    }

    const reportStatus = allTestsCompleted ? "Completed" : "Pending";

    const newReport = await Report.create({
      patient,
      referredBy,
      tests: processedTests,
      reportStatus,
      createdBy: staffId,
    });

    res.status(201).json({
      status: "success",
      data: newReport,
    });
  } catch (error) {
    next(error);
  }
};

// get all reports
export const getAllReports = async (req, res, next) => {
  try {
    const reports = await Report.find()
      .populate({
        path: "patient",
        select: "name phone age gender",
      })
      .populate({
        path: "createdBy",
        select: "name role",
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      status: "success",
      count: reports.length,
      data: reports,
    });
  } catch (error) {
    next(error);
  }
};