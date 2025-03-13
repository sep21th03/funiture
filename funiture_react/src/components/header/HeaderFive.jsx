"use client";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Nav from "@/components/header/elements/Nav";
import LangDropdown from "@/components/header/elements/LangDropdown";
import CuurencyDropdown from "@/components/header/elements/CurrencyDropdown";
import HeaderQuickLink from "@/components/header/elements/HeaderQuickLink";
import HeaderBrand from "@/components/header/elements/HeaderBrand";
import HeaderActions from "@/components/header/elements/HeaderActions";
import CampaignSlider from "./elements/CampaignSlider";
import { useAppSelector } from "@/store/hooks";

const HeaderFive = (props) => {
  const user = useAppSelector((state) => state.auth.user);
  const [isClient, setIsClient] = useState(false);
  const menuOption = useSelector((state) => state.menu);
  const axilHeader = useRef();
  const axilPlaceholder = useRef();
  const axilMainmenu = useRef();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const headerHeight = axilHeader.current.clientHeight;
    const mainMenu = axilMainmenu.current;
    const mainMenuHeight = axilMainmenu.current.clientHeight;
    const mainmenuPlaceholder = axilPlaceholder.current;

    window.addEventListener("scroll", (event) => {
      if (window.scrollY > headerHeight) {
        mainmenuPlaceholder.style.height = mainMenuHeight + "px";
        mainMenu.classList.add("axil-sticky");
      } else {
        mainmenuPlaceholder.style.height = "0";
        mainMenu.classList.remove("axil-sticky");
      }
    });
  }, []);
  return (
    <header className="header axil-header header-style-5" ref={axilHeader}>
      <div className="axil-header-top">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-sm-6">
              <div className="header-top-dropdown">
                <LangDropdown />
                <CuurencyDropdown />
              </div>
            </div>
            <div className="col-sm-6">
              {isClient && user ? (
                <div className="header-top-link">
                  <div>Welcome, {user.name}</div>
                </div>
              ) : (
                <HeaderQuickLink />
              )}
            </div>
          </div>
        </div>
      </div>
      <div id="axil-sticky-placeholder" ref={axilPlaceholder} />
      <div className="axil-mainmenu" ref={axilMainmenu}>
        <div className="container">
          <div className="header-navbar">
            <HeaderBrand />
            <div
              className={`header-main-nav ${
                menuOption.isMobileMenuOpen ? "open" : ""
              }`}
            >
              <Nav />
            </div>
            <HeaderActions searchBox searchIcon />
          </div>
        </div>
      </div>
      {props.headerSlider && <CampaignSlider />}
    </header>
  );
};

export default HeaderFive;
