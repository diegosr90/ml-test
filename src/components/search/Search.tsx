import { Product } from "@/interfaces/product";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import Navbar from "react-bootstrap/Navbar";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { clientService } from "../../client.service";
import "../../sass/Search.scss";

interface SearchState {
  search: string;
  lastSearched: string;
  results: Product[];
  currentPath: string;
}

class Search extends React.Component<RouteComponentProps<{}>, SearchState> {
  componentWillMount() {
    this.setState({
      search: "",
      lastSearched: "",
      results: [],
      currentPath: this.props.match.path
    });
  }

  componentWillReceiveProps(newProps: RouteComponentProps) {
    if (newProps.location.pathname !== this.state.currentPath) {
      this.setState({ currentPath: newProps.location.pathname });
    }
  }

  public search() {
    if (
      (this.state.search && this.state.search !== this.state.lastSearched) ||
      this.state.currentPath === "/"
    ) {
      clientService.searchProducts(this.state.search).then(data => {
        this.setState({
          results: data.items,
          lastSearched: this.state.search
        });
        this.props.history.push({
          pathname: "/items",
          search: `?search=${this.state.search}`,
          state: {
            items: this.state.results,
            categories: data.categories
          }
        });
      });
    }
  }

  public formSubmit(event: React.FormEvent) {
    event.preventDefault();
    this.search();
  }

  public searchChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ search: e.currentTarget.value });
  }
  render() {
    return (
      <header role="banner">
        <Navbar
          bg="light"
          className="d-flex align-items-baseline justify-content-center"
        >
          <Navbar.Brand>
            <Link to="/">
              <img alt="mercado-libre" src="/assets/logo.png" />
            </Link>
          </Navbar.Brand>
          <Form className="search-form" onSubmit={this.formSubmit.bind(this)}>
            <InputGroup className="mb-3">
              <FormControl
                value={this.state.search}
                onChange={this.searchChange.bind(this)}
                placeholder="Nunca dejes de buscar"
              />
              <InputGroup.Append>
                <Button
                  variant="outline-secondary"
                  onClick={this.search.bind(this)}
                >
                  <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Form>
        </Navbar>
      </header>
    );
  }
}

export default withRouter(Search);
