const mongoose  = require("mongoose");
const Review    = require("./review");
const Schema    = mongoose.Schema;

const ImageSchema = new Schema({
    url: String,
    filename: String
})

ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200');
})

const opts = { toJSON: { virtuals: true } };

const CampgroundSchema = new Schema({
    title: String,
    images: [ImageSchema],
    geometry: {                             //"geometry" : {"type":"Point","coordinates":[73.970443,17.123676]}
        type: {
          type: String, 
          enum: ['Point'], 
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        }
    },
    price: Number,
    description: String,
    location: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
}, opts);

CampgroundSchema.virtual('properties.popUpMarkup').get(function () {
    return `<a href="/campgrounds/${this._id}" >${this.title}</a>`
})

// mongoose query middleware
CampgroundSchema.post('findOneAndDelete', async(campground) => {
    if (campground.reviews) {
        await Review.deleteMany({
            _id: {
                $in: campground.reviews
            }
        })
    }
    if (campground.images) {
        const seeds = [
            'YelpCamp/lkmdoxrkhzz6yujdysto',
            'YelpCamp/aworaaecyr8cy8njnbxv'
        ]
        for (let img of images){
            if(!(img.filename in seeds)){
                await cloudinary.uploader.destroy(img.filename);
            }
        }
    }
})



module.exports = mongoose.model('Campground', CampgroundSchema);