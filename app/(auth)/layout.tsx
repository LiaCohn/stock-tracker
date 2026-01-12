import Link from "next/link";
import Image from "next/image";

const Layout = ({children}: {children: React.ReactNode}) => {
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
