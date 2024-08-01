import { SideBarNavigation } from "@/components/shared/SideBarNavigation";
import { Flex, Heading } from "@chakra-ui/react";
import styles from '../page.module.css'
import { MyProfile } from "@/components/features/profile/MyProfile/MyProfile";

export default function myProfile() {
    return (
        <main className={styles.main} style={{width: "100%"}}>
            <Flex width={"100%"} direction={["column","row"]}>
                <SideBarNavigation></SideBarNavigation>
                <MyProfile />
            </Flex>
    </main>
    )
}