import Breadcrumb from "@/components/breadcrumb/Breadcrumb";
import FooterTwo from "@/components/footer/FooterTwo";
import HeaderFive from "@/components/header/HeaderFive";
import NewsLetter from "@/components/newsletter/NewsLetter";
import ServiceTwo from "@/components/services/ServiceTwo";
import ShopNoSidebar from "./ShopNoSidebar";
import ShopWithSidebar from "./ShopWithSidebar";
import Preloader from "@/components/preloader/Preloader";

const Shop = ({searchParams}) => {
    return ( 
        <>
        <Preloader />
        <HeaderFive headerCampaign />
        <Breadcrumb activeItem="Shop" title="Khám phá sản phẩm" />
        <main className="main-wrapper">
            {searchParams.layout === "no-sidebar" ? <ShopNoSidebar />:<ShopWithSidebar />}
            <NewsLetter />
            <ServiceTwo />
        </main>
        <FooterTwo />
        </>
    );
}
 
export default Shop;