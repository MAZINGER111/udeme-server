const { Subscriber } = require("../models/subscriber");

const createSubscriber = async ({ email, states }) => {
  if (!email || !states) return;

  if (await Subscriber.exists({ email: email }))
    return "User already subscribed";

  const subscriber = new Subscriber();

  subscriber.email = email;
  subscriber.states = states;

  const subscriberInstance = await subscriber.save();

  if (!subscriberInstance) return "Error creating report";

  return subscriberInstance;
};

const getSubscribersByStates = async ({ states }) => {
  const subscribers = await Subscriber.find({ states: { $in: states } });
  return subscribers;
};

module.exports = {
  createSubscriber,
  getSubscribersByStates,
};
