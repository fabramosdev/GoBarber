import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import ListAppointmentsService from '@modules/appointments/services/ListAppointmentsService';

class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { provider_id, date } = request.body;
    const user_id = request.user.id;

    const createAppointmentService = container.resolve(
      CreateAppointmentService,
    );

    const appointment = await createAppointmentService.execute({
      provider_id,
      user_id,
      date,
    });

    return response.json(appointment);
  }

  public async index(_: Request, response: Response): Promise<Response> {
    const appointmentsService = container.resolve(ListAppointmentsService);

    const appointments = await appointmentsService.execute();

    return response.json(appointments);
  }
}

export default new AppointmentsController();
