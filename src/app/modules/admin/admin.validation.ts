import { z } from 'zod';

const updateAdminValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    phoneNumber: z.string().optional(),
    profileImage: z.string().optional(),
  }),
});

export const AdminValidations = {
  updateAdminValidationSchema,
};
