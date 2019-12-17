import fetch from "isomorphic-fetch";
const signature = { name: "Diego", lastname: "Saldaño" };
export const search = (value: string) => {
  const url = `https://api.mercadolibre.com/sites/MLA/search?q=${value}&limit=4`;
  return fetch(url, {
    headers: new Headers({
      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
    })
  })
    .then(res => res.json())
    .then(data => ({
      author: signature,
      categories: data.filters,
      items: data.results
    }));
};

export const getProduct = (prodId: string) => {
  const urlItem = "https://api.mercadolibre.com/items/" + prodId;
  const urlDesc = `${urlItem}/description`;
  const headers = new Headers({
    "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
  });

  return Promise.all([
    fetch(urlItem, { headers })
      .then(resp => resp.json())
      .then(data => {
        if (data.category_id) {
          return fetch(
            "https://api.mercadolibre.com/categories/" + data.category_id
          )
            .then(resp => resp.json())
            .then(category => ({
              ...data,
              category: { id: "category", values: [category] }
            }));
        } else {
          return data;
        }
      }),
    fetch(urlDesc, { headers }).then(resp => resp.json())
  ]).then(data => ({
    author: signature,
    item: { ...data[0], description: data[1] }
  }));
};
