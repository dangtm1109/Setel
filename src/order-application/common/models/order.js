"use strict";
const axios = require("axios");
const schedule = require('node-schedule');
module.exports = function (Order) {
  const _checkStateById = (orderId) => {
    return axios.get(`http://order-api:3000/api/orders/${orderId}`);
  };
  const _changeState = (order) => {
    return axios.put(`http://order-api:3000/api/orders/`, {
      ...order
    });
  };
  Order.observe("before save", (ctx, next) => {
    // skip when order update
    if (ctx.instance.skip) {
      next();
    } else {
      axios
        .post("http://payment-api:3000/api/payment", {
          pin: 'PIN"',
          token: "TOKEN GENERATE",
          ...ctx.instance
        })
        .then(result => {
          let data = result.data;
          if (data.message === 1) {
            ctx.instance.status = 1;
            const job = schedule.scheduleJob('*/59 * * * * *', function (task) {
              job.cancel();
              // check state before change state
              _checkStateById(task.id).then(result => {
                data = result.data;
                // if state haven't cancelled state, we will change state to delivered
                if (data.status !== 3) {
                  data.status = 2;
                  data.skip = true;
                  return _changeState(data);
                }
              }).then(result => {
                if (result) {
                }
              });
            }.bind(null, ctx.instance));
          } else {
            ctx.instance.status = 3;
          }
          next();
        });
    }
  });
};
