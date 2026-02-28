import prisma from "../prisma";

export async function createAppointment(req, res) {
  const { doctorId, startTime, endTime } = req.body;

  const appointment = await prisma.appointment.create({
    data: {
      hospitalId: req.user.hospitalId,
      doctorId,
      patientId: req.user.userId,
      startTime,
      endTime,
      status: "SCHEDULED"
    }
  });

  res.json(appointment);
}

export async function getAppointments(req, res) {
  const appointments = await prisma.appointment.findMany({
    where: {
      hospitalId: req.user.hospitalId
    }
  });

  res.json(appointments);
}
