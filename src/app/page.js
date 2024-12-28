import Carousel from "@/components/Carousel";
import Categories from "@/components/Categories";
import Products from "./product/page";

export default function Home() {
  return (
    <div>
      <Carousel />
      <Categories />
      <Products />
    </div>
  );
}
