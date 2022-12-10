const { AuthenticationError } = require("apollo-server-express");
const { User, Art, Cart, Category } = require("../models"); // TODO: create category model
const { signToken } = require("../utils/auth");
const stripe = require("stripe")("TODO: STRIPE API KEY");

const resolvers = {
  Query: {
    // query all categories
    categories: async () => {
        return await Category.find();
    },
    // query all arts
    arts: async (parent, { category, name}) => {
        const params = {};

        if (category) {
            params.category = category;
        }
        if (name) {
            params.name = {
                $regex: name
            };
        };
        return await Art.find(params).populate('category');
    },
    // query a single ary by ID
    art: async (parent, { _id }) => {
        return await Art.findById(_id).populate('category');
    },
    // query a single user by ID
    user: async (parent, args, context) => {
        if (context.user) {
            const user = await User.findById(context.user._id).populate({ 
                path: 'orders.arts',
                populate: 'category'
            });
            user.orders.sort((a, b) => {
                b.purchaseDate - a.purchaseDate
            });
            return user;
        }
        throw new AuthenticationError('Please log in!');
    },
    // query an order by order ID
    order: async (parent, { _id }, context) => {
        if (context.user) {
            const user = await User.findById(context.user._id).populate({
                path: 'orders.arts',
                populate: 'category'
            });
            return user.orders.id(_id);
        }
        throw new AuthenticationError('Please log in!');
    },
    // query checkout 
    checkout: async (parent, args, context) => {
        const url = new URL(context.headers.referer).origin;
        const order = new Order({ arts: args.arts });
        const line_items = [];
        const { arts } = await order.populate('arts');

        for (let i = 0; i < arts.length; i++) {
            const art = await stripe.arts.create({
                name: arts[i].name,
                description: arts[i].description,
                // TODO: save image accordingly as this url 
                images: [`${ url }/images/${ arts[i].image}`]
            });

            const price = await stripe.prices.create({
                art: art.id,
                unit_amount: arts[i].price * 100,
                currency: 'usd',
            })

            line_items.push({
                price: price.id,
                quantity: 1
            });
        }
        const session = await stripe.checkout.session.create({
            payment_method_types: ['card'],
            line_items,
            mode: 'payment',
            success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${url}`
        });

        return { session: session.id };
    }
  },
};
