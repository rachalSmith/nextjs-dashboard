import { z } from 'zod';

export const InvoiceSchema = z.object({
  id: z.string(),
  customerId: z.string({ invalid_type_error: 'Please select a customer.' }),
  amount: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than 0' }),
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Please select an invoice status',
  }),
  date: z.string(),
});

export const UserSchema = z.object({
  id: z.string(),
  name: z.string().min(1).max(32),
  email: z.string().email(),
  password: z.string(),
  role: z.enum(["'superAdmin' | 'admin' | 'user'"]),
});
