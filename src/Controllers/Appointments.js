import mongoose from "mongoose";

import Appointment from "../models/Appointment.js";

export const createAppointment = async (req, res, next) => {
  try {
    console.log(req.user);
    let { appointmentDate, time, appointmentType, address, notes } = req.body;
    const patientAccountId = req.user._id;

    const existingAppointment = await Appointment.findOne({
      appointmentDate,
      time,
      status: { $ne: "Cancelled" },
    });

    if (existingAppointment) {
      return res.status(400).json({
        message: "This appointment already exists",
      });
    }

    const patientHasAppointment = await Appointment.findOne({
      patient: patientAccountId,
      appointmentDate,
      status: { $ne: "Cancelled" },
    });

    if (patientHasAppointment) {
      return res.status(400).json({
        message: "You already have an appointment on this day",
      });
    }
  

    const saveAppointment = await Appointment.create({
      patient: patientAccountId,
      appointmentDate,
      time,
      appointmentType,
      address,
      notes
    });

    res.status(201).json({
      message: "Appointment created successfully",
      data: saveAppointment,
    });

  } catch (error) {
    next(error);
  }
};
export const getLabDailyAppointments = async (req, res, next) => {
  try {
    let { date } = req.body;

    const LabDailyAppointments = await Appointment.find({
      appointmentDate: date,
    })
      .populate("patient", "name phone")
      .sort({ time: 1 });

    res.status(200).json({
      status: "Success",
      results: LabDailyAppointments.length,
      appointmentDate: date,
      data: LabDailyAppointments,
    });
  } catch (error) {
    next(error);
  }
};

export const cancelAppointment = async (req, res, next) => {
  try {
    const { appointmentDate, time } = req.body;
    const patientAccountId = req.user._id;

    const cancelledAppointment = await Appointment.findOneAndUpdate(
      {
        patient: patientAccountId,
        appointmentDate: appointmentDate,
        time: time,
        status: { $ne: "Cancelled" },
      },
      { status: "Cancelled" },
      { new: true },
    );

    if (!cancelledAppointment) {
      return res.status(404).json({
        message: "No active appointment found on this date for you",
      });
    }

    res.status(200).json({
      message: "Appointment cancelled successfully",
      data: cancelledAppointment,
    });
  } catch (error) {
    next(error);
  }
};

export const getappointmentsPatient = async (req, res, next) => {
  try {
    const patientAccountId = req.user._id;

    const appointments = await Appointment.find({
      patient: patientAccountId,
    })
      .populate("patient", "name phone email")
      .sort({ appointmentDate: 1, time: 1 });

    res.status(200).json({
      status: "Success",
      results: appointments.length,
      data: appointments,
    });
  } catch (error) {
    next(error);
  }
};
