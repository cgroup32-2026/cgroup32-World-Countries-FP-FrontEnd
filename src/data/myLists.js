import { countries } from "./countries";

export const myLists = {
  visited: [
    countries.find((c) => c.id === "japan"),
    countries.find((c) => c.id === "italy"),
    countries.find((c) => c.id === "canada"),
  ],

  wishlist: [
    countries.find((c) => c.id === "brazil"),
    countries.find((c) => c.id === "egypt"),
    countries.find((c) => c.id === "new-zealand"),
  ],
};