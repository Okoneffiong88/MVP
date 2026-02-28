import { Router } from "express";
import * as Auth from "./controllers/auth.controller";
import * as Appointment from "./controllers/appointment.controller";
import * as File from "./controllers/file.controller";
import { authenticate } from "./middleware/auth";

const router = Router();

router.post("/auth/register", Auth.register);
router.post("/auth/login", Auth.login);

router.post("/appointments",
  authenticate,
  Appointment.createAppointment
);

router.get("/appointments",
  authenticate,
  Appointment.getAppointments
);

router.post("/files/signed-url",
  authenticate,
  File.generateSignedUrl
);

export default router;
