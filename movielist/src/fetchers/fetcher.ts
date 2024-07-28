import { useRouter } from "next/navigation";

export async function fetcher<T>(input: string | URL | globalThis.Request, init?: RequestInit): Promise<T> {
	try {
		const authHeadersString = sessionStorage.getItem('auth-headers')
		const authHeaders = JSON.parse(authHeadersString ?? JSON.stringify({
			client: '',
			accessToken: '',
			uid: ''
		}));
		const response = await fetch(input,{
			headers: {
				'client': authHeaders.client,
				'access-token': authHeaders.accessToken,
				'uid': authHeaders.uid
			},
			...init
		});
		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}

		return await response.json();
	} catch (error) {
		throw new Error(`Response status: ${error}`);
	}
}