import { LoginForm } from "@/components/features/auth/LoginForm/LoginForm";
import { AuthRedirect } from "@/components/shared/AuthRedirect/AuthRedirect";
import { Container } from "@chakra-ui/react";

export default function Register() {
    return (
        <>
        <AuthRedirect to="/" condition="loggedIn" />
        <Container marginTop={"100px"} bg={["#1B004C","#371687"]}>
            <LoginForm />
        </Container>
        </>
    )
}