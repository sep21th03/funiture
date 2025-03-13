import Link from "next/link";
import { useState, useEffect  } from "react";
import ProductSearchModal from "@/components/header/elements/ProductSearchModal";
import MiniCart from "@/components/header/elements/MiniCart";
import { miniCartHandler } from "@/store/slices/productSlice";
import { mobileMenu } from "@/store/slices/menuSlice";
import { useAppSelector } from "@/store/hooks";

const HeaderActions = (props) => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const [searchToggle, setSearchToggle] = useState(false);
  const [accountDropdown, setaccountDropdown] = useState(false);
  const [isClient, setIsClient] = useState(false);

  
  const searchBoxToggleHandler = () => {
    setSearchToggle((toggler) => !toggler);
  };
  const accountDropdownToggler = () => {
    setaccountDropdown((toggler) => !toggler);
  };
  // const cartHandler = (data) => {
  //   dispatch(miniCartHandler(data));
  // }

// const mobileMneuHandler = (data) => {
//   dispatch(mobileMenu(data))
// }

useEffect(() => {
  setIsClient(true);
}, []);

if (!isClient) return null;

  return (
    <div className="header-action">
      <ul className="action-list">
        {props.searchBox && (
          <li className="axil-search" onClick={searchBoxToggleHandler}>
            <input
              type="search"
              className="placeholder product-search-input"
              name="search2"
              placeholder="What are you looking for?"
              autoComplete="off"
            />
            <button type="submit" className="icon wooc-btn-search">
              <i className="far fa-search" />
            </button>
          </li>
        )}
        {props.searchIcon && (
          <li className="axil-search axil-search-icon">
            <button
              className="header-search-icon"
              onClick={searchBoxToggleHandler}
            >
              <i className="far fa-search" />
            </button>
          </li>
        )}

       
        <li className="my-account">
          <button onClick={accountDropdownToggler}>
            <i className="far fa-user" />
          </button>
          <div
            className={`my-account-dropdown ${accountDropdown ? "open" : ""}`}
          >
            <span className="title">QUICKLINKS</span>
            {isAuthenticated ? (
        <ul>
          <li>
            <Link href="/dashboard">My Account</Link>
          </li>
          <li>
            <Link href="/dashboard/orders">Orders</Link>
          </li>
          <li>
            <Link href="/dashboard/account-details">Settings</Link>
          </li>
        </ul>
      ) : (
        <>
          <div className="login-btn">
            <Link href="/sign-in" className="axil-btn btn-bg-primary">
              Login
            </Link>
          </div>
          <div className="reg-footer text-center">
            No account yet?
            <Link href="/sign-up" className="btn-link">
              REGISTER HERE.
            </Link>
          </div>
        </>
      )}
          </div>
        </li>
        <li className="axil-mobile-toggle">
          <button className="menu-btn mobile-nav-toggler" onClick={() => mobileMneuHandler(true)}>
            <i className="fal fa-bars"></i>
          </button>
        </li>
      </ul>
      <MiniCart />
      {(props.searchIcon || props.searchBox) && (
        <ProductSearchModal
          toggleHandler={searchBoxToggleHandler}
          toggler={searchToggle}
        />
      )}
    </div>
  );
};

export default HeaderActions;
