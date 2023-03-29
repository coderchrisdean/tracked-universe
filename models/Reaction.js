const { Schema } = require('mongoose'); //import Schema from mongoose
const moment = require('moment');  // package to format dates and time

const reactionSchema = new Schema(
    { 
        reactionId: { type: Schema.Types.ObjectId, default: () => new Types.ObjectId() },
        reactionBody: { type: String, required: true, maxlength: 280 },
        username: { type: String, required: true },
        createdAt: { type: Date, default: Date.now, get: timestamp => moment(timestamp).format('MM Do, YYYY [at] hh:mm a') }, // formats to recognizable date and time
    },
    { 
        toJSON: { getters: true }, 
        id: true,
    }
);


module.exports = reactionSchema; //export to be used elsewhere
