const { Schema, model } = require('mongoose');
const moment = require('moment');
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema(
    { 
        thoughtText: { type: String, required: true, minlength: 1, maxlength: 280 }, //min 1 max 280 characters
        createdAt: { type: Date, default: new Date(), get: timestamp => moment(timestamp).format('MM Do, YYYY [at] hh:mm a') },
        username: { type: String, required: true }, // required username
        reactions: [reactionSchema], //array of nested arrays with reactionSchema
    },
    {
        toJSON: { virtual: true, getters: true },
        id: false // no id 
    }
);

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
})

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;

