import { Product } from "@/interfaces/product";
import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import Breadcrumb from "../../breadcrumb/Breadcrumb";
import { clientService } from "../../../client.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGrinBeamSweat } from "@fortawesome/free-solid-svg-icons";

interface ProductProps {
  staticContext: { data: Product };
  match: {
    params: {
      id: string;
    };
  };
}

interface ProductState {
  item: Product;
}

export default class ProductComponent extends React.Component<
  ProductProps,
  ProductState
> {
  constructor(props: ProductProps) {
    super(props);

    let data;
    // @ts-ignore
    if (__isBrowser__) {
      // @ts-ignore
      data = window.__INITIAL_DATA__;
      // @ts-ignore
      delete window.__INITIAL_DATA__;
    } else {
      data = props.staticContext.data;
    }
    this.state = data;
  }
  componentDidMount() {
    if (!this.state || !this.state.item) {
      const prodId = this.props.match.params.id;
      clientService.getProductById(prodId).then((data: any) => {
        this.setState({ item: data.item });
      });
    }
  }
  componentWillUnmount() {
    this.setState(null);
  }

  render() {
    if (this.state && !this.state.item.error) {
      return (
        <section>
          <Breadcrumb filters={[this.state.item.category]}></Breadcrumb>
          <Card>
            <Row className="mx-0 p-3">
              <Col xs="8">
                <Image src={this.state.item.pictures![0].url} rounded></Image>
                <article className="mt-5">
                  <h3>Descripción del producto</h3>
                  <p className="lead">
                    {this.state.item.description!.plain_text}
                  </p>
                </article>
              </Col>
              <Col>
                <article>
                  <div>
                    {this.state.item.condition === "new" ? "Nuevo" : "Usado"}
                    {this.state.item.sold_quantity
                      ? ` - ${this.state.item.sold_quantity} vendidos`
                      : ""}
                  </div>
                  <h3>{this.state.item.title}</h3>
                  <h1 className="display-4">$ {this.state.item.price}</h1>
                  <div>
                    {this.state.item.available_quantity
                      ? "Stock disponible"
                      : "Sin Stock"}
                  </div>
                </article>
                <Button color="primary" block className="mt-5">
                  Comprar
                </Button>
              </Col>
            </Row>
          </Card>
        </section>
      );
    } else if (this.state && this.state.item.error) {
      return (
        <section className="text-center mt-5">
          <FontAwesomeIcon
            icon={faGrinBeamSweat}
            size="9x"
            color="#f8f9fa"
          ></FontAwesomeIcon>
          <p className="lead mt-4">404</p>
        </section>
      );
    } else {
      return (
        <div className="text-center">
          <Spinner animation="grow" variant="dark" />
        </div>
      );
    }
  }
}
