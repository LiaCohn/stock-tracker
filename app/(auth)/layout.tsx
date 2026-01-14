import Link from "next/link";
import Image from "next/image";
import { auth } from "@/lib/better-auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const Layout = async ({children}: {children: React.ReactNode}) => {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    if(session?.user){
        redirect("/")
    }
    return (
        <main className="auth-layout">
            <section className="auth-left-section scrollbar-hide-default mt-6">
                <Link href="/">
                    <Image src="/assets/icons/logo.svg" alt={"logo"} width={140} height={32} className="h-8 w-auto" />
                </Link>
                <div className={"pb-6 lg:pb-8 flex-1"}>{children}</div>
            </section>
            <section className="auth-right-section scrollbar-hide-default">

            </section>
        </main>
    )
}

export default Layout;
