import differenceWith from "lodash/differenceWith";
import isEqual from "lodash/isEqual";
import React from "react";
import { Filter, FilterValue, Pathfromroot } from "../../interfaces/product";
import "../../sass/Breadcrumb.scss";
interface BreadcrumbProps {
  filters: Filter[];
}

interface BreadcrumbState {
  filters: Pathfromroot[];
}

const parseFilters = (props: BreadcrumbProps) => {
  const category = props.filters.find(f => f.id === "category") || {
    values: []
  };
  let filters: FilterValue[] | Pathfromroot[] = category.values;
  if (filters[0] && (filters[0] as FilterValue).path_from_root.length) {
    filters = (filters[0] as FilterValue).path_from_root;
  }

  return filters;
};
export default class BreadCrumbComponent extends React.Component<
  BreadcrumbProps,
  BreadcrumbState
> {
  constructor(props: BreadcrumbProps) {
    super(props);
    const filters = (props && parseFilters(props)) || [];
    this.state = { filters };
  }
  componentWillMount() {
    if (this.props.filters) {
      this.setState({ filters: parseFilters(this.props) });
    }
  }

  componentWillReceiveProps(newProps: BreadcrumbProps) {
    const category = (newProps &&
      newProps.filters.find(f => f.id === "category")) || {
      values: []
    };
    if (!category.values.length) {
      this.setState({ filters: [] });
      return;
    }

    const newFilters = parseFilters(newProps);

    const difference = differenceWith(newFilters, this.state.filters, isEqual);
    if (difference.length) {
      this.setState({ filters: newFilters });
    }
  }

  render() {
    return (
      <nav aria-label="breadcrumb" className="breadcrumb">
        {this.state.filters.map((b, i) => (
          <div className="breadcrumb-item" key={i}>
            {b.name}
          </div>
        ))}
      </nav>
    );
  }
}
