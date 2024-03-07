'use server';

import { auth, signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { InvoiceSchema, UserSchema } from './schema';

const UpdateDisplayName = UserSchema.pick({ name: true });

const CreateInvoice = InvoiceSchema.omit({ id: true, date: true });

export type InvoiceState = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

export type DisplayNameState = {
  errors?: {
    name?: string[];
  };
  message?: string | null;
};

export async function updateDisplayName(
  prevState: DisplayNameState,
  formData: FormData,
) {
  const validatedFields = UpdateDisplayName.safeParse({
    name: formData.get('display-name'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Enter a username between 1 and 32 characters',
    };
  }

  const session = await auth();
  const userEmail = session?.user?.email;

  const { name } = validatedFields.data;

  try {
    await sql`UPDATE users 
    SET name = ${name} 
    WHERE email = ${userEmail}`;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Update Display Name.',
    };
  }
}

export async function createInvoice(
  prevState: InvoiceState,
  formData: FormData,
) {
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'missing Fields. Failed to Create Invoice',
    };
  }

  const { customerId, amount, status } = validatedFields.data;

  const amountInPence = amount * 100;
  const date = new Date().toISOString().split('T')[0];

  try {
    await sql`
  INSERT INTO invoices (customer_id, amount, status, date)
  VALUES (${customerId}, ${amountInPence}, ${status}, ${date})
`;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

const UpdateInvoice = InvoiceSchema.omit({ id: true, date: true });

export async function updateInvoice(
  id: string,
  prevState: InvoiceState,
  formData: FormData,
) {
  const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'missing Fields. Failed to Create Invoice',
    };
  }

  const { customerId, amount, status } = validatedFields.data;

  const amountInPence = amount * 100;
  try {
    await sql`
  UPDATE invoices
  SET customer_id = ${customerId}, amount = ${amountInPence}, status = ${status}
  WHERE id = ${id}
`;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Update Invoice.',
    };
  }
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

// Todo - change to soft delete
export async function deleteInvoice(id: string) {
  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath('/dashboard/invoices');
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Invoice.' };
  }
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid Credentials';
        default:
          return 'Something went wrong';
      }
    }
    throw error;
  }
}
