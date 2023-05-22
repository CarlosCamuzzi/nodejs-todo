const baseURL = require("../routes/baseURL");

// route.slice(0, route.length - 1) = Slice end caracter: 's'

const linksHateoas = (route, id) => {
  const links = [
    {
      rel: "self",
      method: "GET",
      title: `Get ${route.slice(0, route.length - 1)} by ID`,
      href: `${baseURL}/${route}/${id}`,
    },
    {
      rel: "create",
      method: "POST",
      title: `Create ${route.slice(0, route.length - 1)}`,
      href: `${baseURL}/${route}`,
    },
    {
      rel: "update",
      method: "PUT",
      title: `Update ${route.slice(0, route.length - 1)}`,
      href: `${baseURL}/${route}/${id}`,
    },
    {
      rel: "update",
      method: "PATCH",
      title: `Update ${route.slice(0, route.length - 1)}`,
      href: `${baseURL}/${route}/${id}`,
    },
    {
      rel: "delete",
      method: "DELETE",
      title: `Delete ${route.slice(0, route.length - 1)}`,
      href: `${baseURL}/${route}/${id}`,
    },
  ];

  return links;
};

module.exports = linksHateoas;
