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
      name: "Tin of Cookies",
      description:
        "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
      image:
        "https://indianartideas.in/images/blog/Bonjour,%20Monsieur%20Courbet,%201854.%20A%20Realist%20painting%20by%20Gustave%20Courbet.png",
      category: categories[0]._id,
      price: 2.99,
      quantity: 1,
    },
    {
      name: "Canned Coffee",
      description:
        "Praesent sed lacinia mauris. Nulla congue nibh magna, at feugiat nunc scelerisque quis. Donec iaculis rutrum vulputate. Suspendisse lectus sem, vulputate ac lectus sed, placerat consequat dui.",
      image:
        "https://indianartideas.in/images/blog/Sunrise,%20impressionist%20painting%20%20by%20Claude%20Monet,%201872,%20oil%20on%20canvas.png",
      category: categories[0]._id,
      price: 1.99,
      quantity: 2,
    },
    {
      name: "Toilet Paper",
      category: categories[1]._id,
      description:
        "Donec volutpat erat erat, sit amet gravida justo sodales in. Phasellus tempus euismod urna. Proin ultrices nisi ut ipsum congue, vitae porttitor libero suscipit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam lacinia a nisi non congue.",
      image:
        "https://indianartideas.in/images/blog/Vase%20of%20Sunflowers,%201898%E2%80%9399,%20a%20painterly%20creation%20by%20Henri%20Matisse.png",
      price: 7.99,
      quantity: 3,
    },
    {
      name: "Handmade Soap",
      category: categories[1]._id,
      description:
        "Praesent placerat, odio vel euismod venenatis, lectus arcu laoreet felis, et fringilla sapien turpis vestibulum nisl.",
      image:
        "https://indianartideas.in/images/blog/The%20Scream,%201893,%20oil,%20tempera%20and%20pastel%20on%20cardboard%20by%20Edvard%20Munch.png",
      price: 3.99,
      quantity: 4,
    },
    {
      name: "Set of Wooden Spoons",
      category: categories[1]._id,
      description:
        "Vivamus ut turpis in purus pretium mollis. Donec turpis odio, semper vel interdum ut, vulputate at ex. Duis dignissim nisi vel tortor imperdiet finibus. Aenean aliquam sagittis rutrum.",
      image:
        "https://indianartideas.in/images/blog/The%20Persistence%20of%20Memory%20by%20Salvador%20Dali.png",
      price: 14.99,
      quantity: 5,
    },
    {
      name: "Camera",
      category: categories[2]._id,
      description:
        "Vestibulum risus metus, luctus non tortor quis, tincidunt consectetur ex. Nullam vitae lobortis ligula, ut sagittis massa. Curabitur consectetur, tellus at pulvinar venenatis, erat augue cursus erat, eu ullamcorper eros lectus ultrices ipsum. Integer rutrum, augue vitae auctor venenatis, turpis turpis elementum orci, at sagittis risus mi a leo.",
      image:
        "https://indianartideas.in/images/blog/White,%20Red%20on%20Yellow,%20Abstract%20painting%20by%20Mark%20Rothko.png",
      price: 399.99,
      quantity: 6,
    },
    {
      name: "Tablet",
      category: categories[2]._id,
      description:
        "In sodales, ipsum quis ultricies porttitor, tellus urna aliquam arcu, eget venenatis purus ligula ut nisi. Fusce ut felis dolor. Mauris justo ante, aliquet non tempus in, tempus ac lorem. Aliquam lacinia dolor eu sem eleifend ultrices. Etiam mattis metus metus. Sed ligula dui, placerat non turpis vitae, suscipit volutpat elit. Phasellus sagittis, diam elementum suscipit fringilla, libero mauris scelerisque ex, ac interdum diam erat non sapien.",
      image:
        "https://indianartideas.in/images/blog/Photorealist%20portrait%20by%20Chuck%20Close.png",
      price: 199.99,
      quantity: 30,
    },
    {
      name: "Tales at Bedtime",
      category: categories[3]._id,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ornare diam quis eleifend rutrum. Aliquam nulla est, volutpat non enim nec, pharetra gravida augue. Donec vitae dictum neque. Pellentesque arcu lorem, fringilla non ligula ac, tristique bibendum erat. Ut a semper nibh. Quisque a mi et mi tempor ultricies. Maecenas eu ipsum eu enim hendrerit accumsan at euismod urna.",
      image:
        "https://indianartideas.in/images/blog/Photorealist%20portrait%20by%20Chuck%20Close.png",
      price: 9.99,
      quantity: 7,
    },
    {
      name: "Spinning Top",
      category: categories[4]._id,
      description:
        "Ut vulputate hendrerit nibh, a placerat elit cursus interdum.",
      image:
        "https://indianartideas.in/images/blog/Photorealist%20portrait%20by%20Chuck%20Close.png",
      price: 1.99,
      quantity: 8,
    },
    {
      name: "Set of Plastic Horses",
      category: categories[4]._id,
      description:
        "Sed a mauris condimentum, elementum enim in, rhoncus dui. Phasellus lobortis leo odio, sit amet pharetra turpis porta quis.",
      image:
        "https://indianartideas.in/images/blog/Photorealist%20portrait%20by%20Chuck%20Close.png",
      price: 2.99,
      quantity: 1000,
    },
    {
      name: "Teddy Bear",
      category: categories[4]._id,
      description:
        "Vestibulum et erat finibus erat suscipit vulputate sed vitae dui. Ut laoreet tellus sit amet justo bibendum ultrices. Donec vitae felis vestibulum, congue augue eu, finibus turpis.",
      image:
        "https://indianartideas.in/images/blog/Photorealist%20portrait%20by%20Chuck%20Close.png",
      price: 7.99,
      quantity: 100,
    },
    {
      name: "Alphabet Blocks",
      category: categories[4]._id,
      description:
        "Morbi consectetur viverra urna, eu fringilla turpis faucibus sit amet. Suspendisse potenti. Donec at dui ac sapien eleifend hendrerit vel sit amet lectus.",
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
