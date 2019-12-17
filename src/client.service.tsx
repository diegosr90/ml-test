import fetch from "isomorphic-fetch";

class ClientService {
  protected base = process.env.APP_BASE;
  public searchProducts(query: string = ""): Promise<any> {
    return fetch(this.base + "/api/items?q=" + query)
      .then(res => res.json())
      .then(data => data);
  }

  public getProductById(prodId: string = "") {
    return fetch(this.base + "/api/items/" + prodId)
      .then(res => res.json())
      .then(data => data);
  }
}

export const clientService = new ClientService();
