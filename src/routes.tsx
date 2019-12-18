import { RouteComponentProps } from "react-router";
import { clientService } from "./client.service";
import Home from "./components/home/Home";
import ProductList from "./components/products/list/ProductList";
import Product from "./components/products/product/Product";

type CallbackPromise<T> = (...arg: any[]) => Promise<T>;
export interface CustomRoute {
  path: string;
  exact?: boolean;
  component?:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>;
  initData?: CallbackPromise<any>;
}

const routes: CustomRoute[] = [
  {
    path: "/items",
    exact: true,
    component: ProductList,
    initData: (path, query) => {
      if (query.search) {
        return clientService.searchProducts(query.search);
      } else {
        return Promise.resolve();
      }
    }
  },
  {
    path: "/items/:id",
    component: Product,
    exact: true,
    initData: (path = "") => clientService.getProductById(path.split("/").pop())
  },
  {
    exact: true,
    path: "/",
    component: Home
  }
];

export default routes;
