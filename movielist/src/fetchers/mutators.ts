import { ILoginFormInputs } from "@/components/features/auth/LoginForm/LoginForm";
import { IRegisterFormInputs } from "@/components/features/auth/RegisterForm/RegisterForm";

export async function mutator(url: string, { arg }: { arg: IRegisterFormInputs | ILoginFormInputs }) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(arg)
    })
    if(!response.ok) {
        throw new Error(`Error mutating data on ${url}`);
    } else {
      sessionStorage.setItem('auth-headers',JSON.stringify({
        client: response.headers.get('client'),
        accessToken: response.headers.get('access-token'),
        uid: response.headers.get('uid')
      }))
    }

    return await response.json();
  }