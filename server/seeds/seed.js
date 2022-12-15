const db = require("../config/connection");
const { User, Art, Category } = require("../models");

db.once("open", async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: "Oil Painting" },
    { name: "Sketch" },
    { name: "Water Colors" },
    { name: "Sculpture" },
    { name: "Abstract" },
    { name: "Portrait" },
  ]);

  console.log("categories seeded");

  await Art.deleteMany();

  const arts = await Art.insertMany([
    {
      name: "Brillian Start",
      description:
        "Oil on canvas",
      image:
        "/images/brillian-start.jpeg",
      category: categories[0]._id,
      price: 599.99,
      quantity: 5,
    },
    {
      name: "Boundless",
      description:
        "Oil on canvas",
      image:
        "/images/boundless.jpeg",
      category: categories[0]._id,
      price: 299.99,
      quantity: 5,
    },
    {
      name: "King's Park",
      category: categories[1]._id,
      description:
        "Oil on canvas",
      image:
      "/images/kings-park.jpeg",
      price: 199.99,
      quantity: 5,
    },
    {
      name: "London Court",
      category: categories[1]._id,
      description:
        "Oil on canvas",
      image:
        "/images/london-court.jpeg",
      price: 399.99,
      quantity: 5,
    },
    {
      name: "Looking forward...",
      category: categories[1]._id,
      description:
        "Oil on canvas",
      image:
        "/images/look-forward.jpeg",
      price: 299.99,
      quantity: 5,
    },
    {
      name: "Majestic",
      category: categories[2]._id,
      description:
        "Oil on canvas",
      image:
        "/images/majestic.jpeg",
      price: 399.99,
      quantity: 5,
    },
    {
      name: "Nutrient",
      category: categories[2]._id,
      description:
        "Oil on canvas",
      image:
        "/images/nutrient.jpeg",
      price: 199.99,
      quantity: 5,
    },
    {
      name: "On the way",
      category: categories[3]._id,
      description:
        "Oil on canvas",
      image:
        "/images/on-the-way.jpeg",
      price: 199.99,
      quantity: 7,
    },
    {
      name: "Playground",
      category: categories[4]._id,
      description:
        "Oil on canvas",
      image:
        "/images/playground.jpeg",
      price: 299.99,
      quantity: 8,
    },
    {
      name: "Sail",
      category: categories[4]._id,
      description:
        "Oil on canvas",
      image:
        "/images/sail.jpeg",
      price: 299.99,
      quantity: 5,
    },
    {
      name: "The Great Wall",
      category: categories[4]._id,
      description:
        "Oil on canvas",
      image:
        "/images/the-great-wall.jpeg",
      price: 399.99,
      quantity: 5,
    },
    {
      name: "Winter",
      category: categories[4]._id,
      description:
        "Oil on canvas",
      image:
        "/images/winter.jpeg",
      price: 199.99,
      quantity: 5,
    },
  ]);

  console.log("arts seeded");

  await User.deleteMany();

  await User.create({
    firstName: "Pamela",
    lastName: "Washington",
    email: "pamela@testmail.com",
    password: "password12345",
  });

  await User.create({
    firstName: "Elijah",
    lastName: "Holt",
    email: "eholt@testmail.com",
    password: "password12345",
  });

  console.log("users seeded");

  process.exit();
});
