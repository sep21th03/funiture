"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Breadcrumb from "@/components/breadcrumb/Breadcrumb";
import FooterTwo from "@/components/footer/FooterTwo";
import HeaderFive from "@/components/header/HeaderFive";
import NewsLetter from "@/components/newsletter/NewsLetter";
import ServiceTwo from "@/components/services/ServiceTwo";
import { DashboardAsideMenu } from "@/data/Menu";
import { useAppSelector } from "@/store/hooks";

const DahsboardLayout = ({ children }) => {
  const pathname = usePathname();
  const split = pathname.split("/");
  const pageSlug = split[split.length - 1];
  const user = useAppSelector((state) => state.auth.user);
  return (
    <>
      <HeaderFive headerSlider />
      <main className="main-wrapper">
        <Breadcrumb activeItem="My Account" title="Thông tin chung" />
        <div className="axil-dashboard-area axil-section-gap">
          <div className="container">
            <div className="axil-dashboard-warp">
              <div className="axil-dashboard-author">
                <div className="media">
                  <div className="thumbnail">
                    <Image
                      src={user?.avatar || "https://i.pinimg.com/originals/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg"}
                      height={70}
                      width={70}
                      alt="avatar"
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-xl-3 col-md-3">
                  <aside className="axil-dashboard-aside __custom">
                    <nav className="axil-dashboard-nav">
                      <div className="nav nav-tabs">
                        {DashboardAsideMenu.map((data, index) => (
                          <Link
                            href={
                              data.slug ? `${data.slug}` : "dashboard"
                            }
                            className={`nav-item nav-link ${
                              data.slug === pageSlug ? "active" : ""
                            }`}
                            key={index}
                          >
                            <i className={data.icon} />
                            {data.name}
                          </Link>
                        ))}
                        <Link href="/sign-in" className="nav-item nav-link">
                          <i className="fal fa-sign-out" />
                          Đăng xuất
                        </Link>
                      </div>
                    </nav>
                  </aside>
                  
                </div>
                <div className="col-xl-9 col-md-9">
                  <div>{children}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <NewsLetter />
        <ServiceTwo />
      </main>
      <FooterTwo />
    </>
  );
};

export default DahsboardLayout;
