import Link from "next/link";
import { useState, useEffect } from "react";
import ProductSearchModal from "@/components/header/elements/ProductSearchModal";
import MiniCart from "@/components/header/elements/MiniCart";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { logOut } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";

const HeaderActions = (props) => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const [searchToggle, setSearchToggle] = useState(false);
  const [accountDropdown, setaccountDropdown] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logOut());
    router.push("/sign-in");
  };

  const searchBoxToggleHandler = () => {
    setSearchToggle((toggler) => !toggler);
  };
  const accountDropdownToggler = () => {
    setaccountDropdown((toggler) => !toggler);
  };
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
            <span className="title">Tiện ích</span>
            {isAuthenticated ? (
              <ul>
                <li>
                  <Link href="/dashboard">Tài khoản của tôi</Link>
                </li>
                <li>
                  <Link href="/dashboard/cart">Giỏ hàng</Link>
                </li>
                <li>
                  <Link href="/dashboard/account-details">Cài đặt</Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="axil-btn btn-bg-primary"
                  >
                    Đăng xuất
                  </button>
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
          <button
            className="menu-btn mobile-nav-toggler"
            onClick={() => mobileMneuHandler(true)}
          >
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
