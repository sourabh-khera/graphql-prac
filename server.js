const express = require("express");
const debug = require("debug");
const bodyParser = require("body-parser");
const { URLSearchParams } = require("url");
global.URLSearchParams = URLSearchParams;

const log = debug("http:server");
const graphqlHttp = require("express-graphql").graphqlHTTP;
const { buildSchema } = require("graphql");
require("./data-source");
const Event = require("./models/event_model");

const app = express();
app.use(bodyParser.json());
app.use(
  "/graphql",
  graphqlHttp({
    schema: buildSchema(`
    
    type Event {
      _id: ID!
      title: String!
      description: String!
      price: Float!
      date: String!
    }
    type RootQuery {
      events: [Event!]!
    }
    input EventInput {
      title: String!
      description: String!
      price: Float!
      date: String!
    }
    type RootMutation {
      createEvent(eventInput: EventInput!): Event! 
    }
    schema {    
       query: RootQuery,
       mutation: RootMutation,    
    }
 
 `),
    rootValue: {
      events: () =>
        Event.find()
          .then((events) => {
            console.log(events);
            return events.map((event) => {
              return { ...event._doc };
            });
          })
          .catch((err) => console.log(err)),
      createEvent: (args) => {
        const event = new Event({
          title: args.eventInput.title,
          description: args.eventInput.description,
          price: args.eventInput.price,
          date: new Date(args.eventInput.date),
        });
        return event
          .save()
          .then((data) => {
            console.log(data);
            return { ...data._doc };
          })
          .catch((err) => console.log(err));
      },
    },
    graphiql: true,
  })
);

app.listen(3000, () => log("server listening on port 3000"));
