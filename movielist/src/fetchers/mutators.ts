import { ILoginFormInputs } from "@/components/features/auth/LoginForm/LoginForm";
import { IRegisterFormInputs } from "@/components/features/auth/RegisterForm/RegisterForm";

export async function mutator(url: string, { arg }: { arg: IRegisterFormInputs | ILoginFormInputs }) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'client': 'Uie2kIm98H_Lj_JE7baV0Q',
        'access-token': 'DR72jqwKusk0gKbWw8W3zw',
        'uid': 'john23@example.com'
      },
      body: JSON.stringify(arg)
    })
    if(!response.ok) {
        throw new Error(`Error mutating data on ${url}`);
    } else {
      console.log(response);
    }

    return await response.json();
  }