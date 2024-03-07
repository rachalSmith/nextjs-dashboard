'use client';

import { Button } from '../components/button';
import { useFormState, useFormStatus } from 'react-dom';
import { UserSchema } from '../lib/schema';
import { updateDisplayName } from '../lib/actions';
import { ChangeEvent, FormEvent, useEffect } from 'react';

const initialState = { message: null, errors: {} };

export default function DisplayName({ displayName }: { displayName?: string }) {
  const [state, dispatch] = useFormState(updateDisplayName, initialState);

  const DisplayNameSchema = UserSchema.pick({ name: true });

  const hasError = (value: string) => {
    const validatedFields = DisplayNameSchema.safeParse({
      name: value,
    });
    if (validatedFields.success) {
      console.log('sucess');
    }
    return true;
  };

  return (
    <section className="flex flex-col rounded-md border border-gray-200  text-gray-900">
      <h2 className="px-6 pt-6 text-lg font-semibold">Display Name</h2>

      <form action={dispatch}>
        <label
          className="mb-3 mt-5 block px-6 text-sm  text-gray-900"
          htmlFor="display-name"
        >
          Please enter your full name, or a display name you are comfortable
          with
        </label>
        <input
          className="peer mx-6 mb-6 block w-96  rounded-md border border-gray-200 py-[9px] pl-2 text-sm outline-2 placeholder:text-gray-500"
          id="display-name"
          name="display-name"
          placeholder="Enter a display name"
          defaultValue={displayName}
          onChange={(e) => {
            hasError(e.target.value);
          }}
        />

        <div className="flex items-center justify-between rounded-b-lg border-t border-gray-200 bg-gray-50 px-6 py-4 text-sm">
          <p className="text-gray-600">Please use a maximum of 32 characters</p>
          <Button className="h-8" disabled={Boolean(hasError)}>
            Save
          </Button>
        </div>
      </form>
    </section>
  );
}
