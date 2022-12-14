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
      name: "Art 1",
      description:
        "Art 1 description",
      image:
        "https://indianartideas.in/images/blog/Bonjour,%20Monsieur%20Courbet,%201854.%20A%20Realist%20painting%20by%20Gustave%20Courbet.png",
      category: categories[0]._id,
      price: 2.99,
      quantity: 1,
    },
    {
      name: "Art 2",
      description:
        "Art 2 description",
      image:
        "https://indianartideas.in/images/blog/Sunrise,%20impressionist%20painting%20%20by%20Claude%20Monet,%201872,%20oil%20on%20canvas.png",
      category: categories[0]._id,
      price: 1.99,
      quantity: 2,
    },
    {
      name: "Art 3",
      category: categories[1]._id,
      description:
        "Art 3 description.",
      image:
        "https://indianartideas.in/images/blog/Vase%20of%20Sunflowers,%201898%E2%80%9399,%20a%20painterly%20creation%20by%20Henri%20Matisse.png",
      price: 7.99,
      quantity: 3,
    },
    {
      name: "Art 4",
      category: categories[1]._id,
      description:
        "Art 4 description.",
      image:
        "https://indianartideas.in/images/blog/The%20Scream,%201893,%20oil,%20tempera%20and%20pastel%20on%20cardboard%20by%20Edvard%20Munch.png",
      price: 3.99,
      quantity: 4,
    },
    {
      name: "Art 5",
      category: categories[1]._id,
      description:
        "Art 5 description.",
      image:
        "https://indianartideas.in/images/blog/The%20Persistence%20of%20Memory%20by%20Salvador%20Dali.png",
      price: 14.99,
      quantity: 5,
    },
    {
      name: "Art 6",
      category: categories[2]._id,
      description:
        "Art 6 description.",
      image:
        "https://indianartideas.in/images/blog/White,%20Red%20on%20Yellow,%20Abstract%20painting%20by%20Mark%20Rothko.png",
      price: 399.99,
      quantity: 6,
    },
    {
      name: "Art 7",
      category: categories[2]._id,
      description:
        "Art 7 description.",
      image:
        "https://indianartideas.in/images/blog/Photorealist%20portrait%20by%20Chuck%20Close.png",
      price: 199.99,
      quantity: 30,
    },
    {
      name: "Art 8",
      category: categories[3]._id,
      description:
        "Art 8 description.",
      image:
        "https://indianartideas.in/images/blog/Photorealist%20portrait%20by%20Chuck%20Close.png",
      price: 9.99,
      quantity: 7,
    },
    {
      name: "Art 9",
      category: categories[4]._id,
      description:
        "Art 9 descriptionm.",
      image:
        "https://indianartideas.in/images/blog/Photorealist%20portrait%20by%20Chuck%20Close.png",
      price: 1.99,
      quantity: 8,
    },
    {
      name: "Art 10",
      category: categories[4]._id,
      description:
        "Art 10 descriptions.",
      image:
        "https://indianartideas.in/images/blog/Photorealist%20portrait%20by%20Chuck%20Close.png",
      price: 2.99,
      quantity: 1000,
    },
    {
      name: "Art 11",
      category: categories[4]._id,
      description:
        "Art 11 description.",
      image:
        "https://indianartideas.in/images/blog/Photorealist%20portrait%20by%20Chuck%20Close.png",
      price: 7.99,
      quantity: 100,
    },
    {
      name: "Art 12",
      category: categories[4]._id,
      description:
        "Art 12 descriptions.",
      image:
        "https://indianartideas.in/images/blog/Photorealist%20portrait%20by%20Chuck%20Close.png",
      price: 9.99,
      quantity: 600,
    },
  ]);

  console.log("arts seeded");

  await User.deleteMany();

  await User.create({
    firstName: "Pamela",
    lastName: "Washington",
    email: "pamela@testmail.com",
    password: "password12345",
    // orders: [
    //   {
    //     arts: [arts[0]._id, arts[0]._id, arts[1]._id]
    //   }
    // ]
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
