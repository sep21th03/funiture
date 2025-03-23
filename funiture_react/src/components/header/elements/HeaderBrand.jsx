import Image from "next/image";
import Link from "next/link";
const HeaderBrand = (props) => {
    return (
        <div className="header-brand">
            <Link href="/" className="logo">
                <Image
                    src="/images/logo/logo.png"
                    alt="Site Logo"
                    height={40}
                    width={150}
                />
            </Link>
        </div>
    );
}

export default HeaderBrand;