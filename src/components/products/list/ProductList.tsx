import { Filter, Product } from "@/interfaces/product";
import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import { Redirect } from "react-router";
import "../../../sass/ProductList.scss";
import Breadcrumb from "../../breadcrumb/Breadcrumb";
interface ProductListProps {
  staticContext: { data: { products: Product[] } };
  location: {
    state: {
      items: Product[];
      categories: Filter[];
    };
  };
}

interface ProductListState {
  items: Product[];
  categories: Filter[];
  selected: string;
}
export default class ProductList extends React.Component<
  ProductListProps,
  ProductListState
> {
  constructor(props: ProductListProps) {
    super(props);

    let data;
    // @ts-ignore
    if (__isBrowser__) {
      // @ts-ignore
      data = window.__INITIAL_DATA__;
      // @ts-ignore
      delete window.__INITIAL_DATA__;
    } else {
      data = props.staticContext;
    }
    this.state = data || { ...props.location.state, selected: "" } || null;
  }

  componentDidMount() {
    this.setState({
      items: this.props.location.state.items || [],
      categories: this.props.location.state.categories || [],
      selected: ""
    });
  }
  componentWillReceiveProps(newProps: ProductListProps) {
    const newProds = newProps.location.state.items;
    const newFilters = newProps.location.state.categories;
    if (
      (newProds[0] &&
        this.state.items[0] &&
        newProds[0].title !== this.state.items[0].title) ||
      !this.state.items.length
    ) {
      this.setState({ items: newProds, categories: newFilters });
    }
  }

  public goToProduct(productId: string) {
    this.setState({ selected: productId });
  }

  render() {
    if (this.state.selected) {
      return <Redirect push to={`/items/${this.state.selected}`}></Redirect>;
    }
    return (
      <section className="product-list">
        <Breadcrumb filters={this.state.categories}></Breadcrumb>
        <Card className="mb-3">
          <ListGroup>
            {this.state.items &&
              this.state.items.map((prod, index) => (
                <ListGroup.Item action key={index}>
                  <Row
                    className="product mx-3"
                    onClick={this.goToProduct.bind(this, prod.id)}
                  >
                    <Col xs="auto">
                      <Image
                        src={prod.thumbnail}
                        rounded
                        className="product__thumb"
                      />
                    </Col>
                    <Col className="pt-4">
                      <div className="product__price h4 font-weight-normal">
                        $ {prod.price}
                      </div>
                      <div className="product_title h5 font-weight-normal">
                        {prod.title}
                      </div>
                    </Col>
                    <Col className="pt-5 text-center" xs="3">
                      <div>
                        {`${prod.address.city_name}, ${prod.address.state_name}`}
                      </div>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
          </ListGroup>
        </Card>
      </section>
    );
  }
}
