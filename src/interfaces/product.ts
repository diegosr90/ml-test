export interface Product {
  id: string;
  site_id: string;
  title: string;
  seller: Seller;
  price: number;
  currency_id: string;
  available_quantity: number;
  sold_quantity: number;
  buying_mode: string;
  listing_type_id: string;
  stop_time: string;
  condition: string;
  permalink: string;
  thumbnail: string;
  accepts_mercadopago: boolean;
  installments: Installments;
  address: Address;
  shipping: Shipping;
  seller_address: Selleraddress;
  attributes: Attribute[];
  original_price: number;
  category_id: string;
  category?: any;
  official_store_id: number;
  catalog_product_id?: any;
  tags: string[];
  pictures?: Picture[];
  description?: ProductDescription;
  error?: string;
}

export interface Picture {
  id: string;
  url: string;
  secure_url: string;
  size: string;
  max_size: string;
  quality: string;
}

export interface Attribute {
  values: AttributeValue[];
  attribute_group_name: string;
  id: string;
  name: string;
  value_struct?: any;
  attribute_group_id: string;
  source: number;
  value_id?: string;
  value_name: string;
}

export interface AttributeValue {
  id?: string;
  name: string;
  struct?: any;
  source: number;
}

export interface Selleraddress {
  id: string;
  comment: string;
  address_line: string;
  zip_code: string;
  country: Country;
  state: Country;
  city: City;
  latitude: string;
  longitude: string;
}

export interface City {
  id?: any;
  name: string;
}

export interface Country {
  id: string;
  name: string;
}

export interface Shipping {
  free_shipping: boolean;
  mode: string;
  tags: string[];
  logistic_type: string;
  store_pick_up: boolean;
}

export interface Address {
  state_id: string;
  state_name: string;
  city_id?: any;
  city_name: string;
}

export interface Installments {
  quantity: number;
  amount: number;
  rate: number;
  currency_id: string;
}

export interface Seller {
  id: number;
  permalink?: any;
  power_seller_status: string;
  car_dealer: boolean;
  real_estate_agency: boolean;
  tags: any[];
}

export interface ProductDescription {
  text: string;
  plain_text: string;
  last_updated: string;
  date_created: string;
  snapshot: Snapshot;
}

export interface Snapshot {
  url: string;
  width: number;
  height: number;
  status: string;
}

export interface Filter {
  id: string;
  name: string;
  type: string;
  values: FilterValue[];
}

export interface FilterValue {
  id: string;
  name: string;
  path_from_root: Pathfromroot[];
}

export interface Pathfromroot {
  id: string;
  name: string;
}