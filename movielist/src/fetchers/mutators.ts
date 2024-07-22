import { ILoginFormInputs } from "@/components/features/auth/LoginForm/LoginForm";
import { IRegisterFormInputs } from "@/components/features/auth/RegisterForm/RegisterForm";
import { IReviewInputs } from "@/components/features/shows/ReviewForm";

export async function mutator(url: string, { arg }: { arg: IRegisterFormInputs | ILoginFormInputs | IReviewInputs }) {
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

  export async function postReview(url: string, { arg }: { arg: IReviewInputs }) {
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
    }

    return await response.json();
  }

  export async function deleteReview(url: string, { arg }: { arg: {id: string} }) {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(arg)
    })
    if(!response.ok) {
        throw new Error(`Error mutating data on ${url}`);
    }

    return await response.json();
  }