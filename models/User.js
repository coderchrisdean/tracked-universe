const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: { type: String, unique: true, required: true, trim: true },
        email: { type: String, unique: true, required: true, match: [/.+\@.+\..+/, 'Please enter a valid email address'] },
        thoughts: [ { type: Schema.Types.ObjectId, ref: 'Thought' } ], // array of _id values referencing Thought model
        friends: [ { type: Schema.Types.ObjectId, ref: 'User'} ] // array of _id values referencing the User model (self reference)
    },
    { 
        toJSON: { virtuals: true, getters: true }, 
        id: false,
    }
);
//retrieves the length of the user's friends array field on query
userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

const User = model('User', userSchema);