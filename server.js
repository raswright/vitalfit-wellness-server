const express = require('express');
const cors = require('cors');
const Joi = require('joi');
const mongoose = require('mongoose');
const multer = require('multer');
const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB Connection
mongoose
  .connect('mongodb+srv://gKSMF0kDA8xi85QL:gKSMF0kDA8xi85QL@raswright.03gl0.mongodb.net/<database-name>?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log('Failed to connect to MongoDB', error));

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Multer Configuration for Image Uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/images/'); // Directory to store images
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique filenames
  },
});
const upload = multer({ storage: storage });

// Schemas and Models
const ClassSchema = new mongoose.Schema({
  class_name: { type: String, required: true },
  confirmation_number: { type: String, required: true },
  instructor_level: { type: String, required: true },
  availability: { type: String, required: true },
  location: { type: String, required: true },
  status: { type: String, required: true },
  img_name: { type: String, required: true },
  extra_info: { type: [String], required: true },
});

const SuggestionSchema = new mongoose.Schema({
  classType: { type: String, required: true },
  customClassType: { type: String, default: '' },
  preferredDayTime: { type: String, required: true },
  groupType: { type: String, required: true },
  instructorPreference: { type: String, required: true },
  comments: { type: String, default: '' },
  img_name: { type: String, default: 'placeholder.png' }, // Default image
});

const Class = mongoose.model('Class', ClassSchema);
const ClassSuggestion = mongoose.model('ClassSuggestion', SuggestionSchema);

// Joi Validation Schema
const suggestionSchema = Joi.object({
  classType: Joi.string().required().messages({ 'string.empty': 'Class Type is required.' }),
  customClassType: Joi.string()
    .allow('')
    .when('classType', {
      is: 'Other',
      then: Joi.string().required().messages({ 'string.empty': 'Please specify the class type.' }),
      otherwise: Joi.forbidden(),
    }),
  preferredDayTime: Joi.string().required().messages({ 'string.empty': 'Preferred Day/Time is required.' }),
  groupType: Joi.string().required().valid('One-on-One', 'Group').messages({
    'any.only': 'Group Type must be "One-on-One" or "Group".',
  }),
  instructorPreference: Joi.string().required().valid('Any', 'Female', 'Male').messages({
    'any.only': 'Instructor Preference must be "Any", "Female", or "Male".',
  }),
  comments: Joi.string().allow(''),
});

// Seed Data
const classesSeed = [
  {
    "class_name": "Yoga",
    "confirmation_number": "Y123456",
    "instructor_level": "Intermediate",
    "availability": "19/20 slots available",
    "location": "Room A",
    "status": "Open",
    "img_name": "yoga1.jpg",
    "extra_info": ["Wear comfortable clothes", "Bring your own mat", "Bring a water bottle"]
},
{
    "class_name": "Yoga",
    "confirmation_number": "Y234561",
    "instructor_level": "Advanced",
    "availability": "10/15 slots available",
    "location": "Room A",
    "status": "Open",
    "img_name": "yoga2.jpg",
    "extra_info": ["Wear comfortable clothes", "Bring your own mat", "Bring a water bottle"]
},
{
    "class_name": "Yoga",
    "confirmation_number": "Y345612",
    "instructor_level": "Beginner",
    "availability": "22/25 slots available",
    "location": "Room A",
    "status": "Open",
    "img_name": "yoga3.jpg",
    "extra_info": ["Wear comfortable clothes", "Bring your own mat", "Bring a water bottle"]
},
{
    "class_name": "Yoga",
    "confirmation_number": "Y456123",
    "instructor_level": "Beginner",
    "availability": "18/25 slots available",
    "location": "Room A",
    "status": "Open",
    "img_name": "yoga4.jpg",
    "extra_info": ["Wear comfortable clothes", "Bring your own mat", "Bring a water bottle"]
},
{
    "class_name": "Yoga",
    "confirmation_number": "Y561234",
    "instructor_level": "Intermediate",
    "availability": "11/20 slots available",
    "location": "Room A",
    "status": "Open",
    "img_name": "yoga5.jpg",
    "extra_info": ["Wear comfortable clothes", "Bring your own mat", "Bring a water bottle"]
},
{
    "class_name": "Pilates",
    "confirmation_number": "P654321",
    "instructor_level": "Beginner",
    "availability": "18/25 slots available",
    "location": "Room B",
    "status": "Open",
    "img_name": "pilates1.jpg",
    "extra_info": ["Focus on core strength", "No equipment needed", "Bring a hand towel"]
},
{
    "class_name": "Pilates",
    "confirmation_number": "P543216",
    "instructor_level": "Intermediate",
    "availability": "14/20 slots available",
    "location": "Room B",
    "status": "Open",
    "img_name": "pilates2.jpg",
    "extra_info": ["Focus on core strength", "No equipment needed", "Bring a hand towel"]
},
{
    "class_name": "Pilates",
    "confirmation_number": "P432165",
    "instructor_level": "Advanced",
    "availability": "12/15 slots available",
    "location": "Room B",
    "status": "Open",
    "img_name": "pilates3.jpg",
    "extra_info": ["Focus on core strength", "No equipment needed", "Bring a hand towel"]
},
{
    "class_name": "Pilates",
    "confirmation_number": "P321654",
    "instructor_level": "Advanced",
    "availability": "14/15 slots available",
    "location": "Room B",
    "status": "Open",
    "img_name": "pilates4.jpg",
    "extra_info": ["Focus on core strength", "No equipment needed", "Bring a hand towel"]
},
{
    "class_name": "Pilates",
    "confirmation_number": "216543",
    "instructor_level": "Beginner",
    "availability": "23/25 slots available",
    "location": "Room B",
    "status": "Open",
    "img_name": "pilates5.jpg",
    "extra_info": ["Focus on core strength", "No equipment needed", "Bring a hand towel"]
},
{
    "class_name": "Running",
    "confirmation_number": "R234561",
    "instructor_level": "Intermediate",
    "availability": "15/20 slots available",
    "location": "Room C",
    "status": "Open",
    "img_name": "running1.jpg",
    "extra_info": ["Outdoor activity", "Running shoes required", "Feel free to bring headphones/airpods"]
},
{
    "class_name": "Running",
    "confirmation_number": "R345612",
    "instructor_level": "Beginner",
    "availability": "22/25 slots available",
    "location": "Room C",
    "status": "Open",
    "img_name": "running2.jpg",
    "extra_info": ["Outdoor activity", "Running shoes required", "Feel free to bring headphones/airpods"]
},
{
    "class_name": "Running",
    "confirmation_number": "R456123",
    "instructor_level": "Advanced",
    "availability": "13/15 slots available",
    "location": "Room C",
    "status": "Open",
    "img_name": "running3.jpg",
    "extra_info": ["Outdoor activity", "Running shoes required", "Feel free to bring headphones/airpods"]
},
{
    "class_name": "Running",
    "confirmation_number": "R561234",
    "instructor_level": "Intermediate",
    "availability": "12/25 slots available",
    "location": "Room C",
    "status": "Open",
    "img_name": "running4.jpg",
    "extra_info": ["Outdoor activity", "Running shoes required", "Feel free to bring headphones/airpods"]
},
{
    "class_name": "Running",
    "confirmation_number": "R612345",
    "instructor_level": "Beginner",
    "availability": "17/25 slots available",
    "location": "Room C",
    "status": "Open",
    "img_name": "running5.jpg",
    "extra_info": ["Outdoor activity", "Running shoes required", "Feel free to bring headphones/airpods"]
},
{
    "class_name": "Cycling",
    "confirmation_number": "C654321",
    "instructor_level": "Intermediate",
    "availability": "14/20 slots available",
    "location": "Room D",
    "status": "Open",
    "img_name": "cycling1.jpg",
    "extra_info": ["Indoor cycling", "Water bottle recommended", "Bring gloves"]
},
{
    "class_name": "Cycling",
    "confirmation_number": "C543216",
    "instructor_level": "Beginner",
    "availability": "14/25 slots available",
    "location": "Room D",
    "status": "Open",
    "img_name": "cycling2.jpg",
    "extra_info": ["Indoor cycling", "Water bottle recommended", "Bring gloves"]
},
{
    "class_name": "Cycling",
    "confirmation_number": "C432165",
    "instructor_level": "Advanced",
    "availability": "11/15 slots available",
    "location": "Room D",
    "status": "Open",
    "img_name": "cycling3.jpg",
    "extra_info": ["Indoor cycling", "Water bottle recommended", "Bring gloves"]
},
{
    "class_name": "Cycling",
    "confirmation_number": "C321654",
    "instructor_level": "Intermediate",
    "availability": "18/20 slots available",
    "location": "Room D",
    "status": "Open",
    "img_name": "cycling4.jpg",
    "extra_info": ["Indoor cycling", "Water bottle recommended", "Bring gloves"]
},
{
    "class_name": "Cycling",
    "confirmation_number": "C216543",
    "instructor_level": "Beginner",
    "availability": "17/25 slots available",
    "location": "Room D",
    "status": "Open",
    "img_name": "cycling5.jpg",
    "extra_info": ["Indoor cycling", "Water bottle recommended", "Bring gloves"]
},
{
    "class_name": "Cycling",
    "confirmation_number": "C165432",
    "instructor_level": "Advanced",
    "availability": "12/15 slots available",
    "location": "Room D",
    "status": "Open",
    "img_name": "cycling6.jpg",
    "extra_info": ["Indoor cycling", "Water bottle recommended", "Bring gloves"]
},
{
    "class_name": "Zumba",
    "confirmation_number": "Z123456",
    "instructor_level": "Intermediate",
    "availability": "14/15 slots available",
    "location": "Room E",
    "status": "Open",
    "img_name": "zumba1.jpg",
    "extra_info": ["Dance-based workout", "Fun atmosphere", "Bring a hand towel"]
},
{
    "class_name": "Zumba",
    "confirmation_number": "Z234561",
    "instructor_level": "Intermediate",
    "availability": "13/15 slots available",
    "location": "Room E",
    "status": "Open",
    "img_name": "zumba2.jpg",
    "extra_info": ["Dance-based workout", "Fun atmosphere", "Bring a hand towel"]
},
{
    "class_name": "Zumba",
    "confirmation_number": "Z561234",
    "instructor_level": "Advanced",
    "availability": "6/15 slots available",
    "location": "Room E",
    "status": "Open",
    "img_name": "zumba3.jpg",
    "extra_info": ["Dance-based workout", "Fun atmosphere", "Bring a hand towel"]
},
{
    "class_name": "Zumba",
    "confirmation_number": "Z612345",
    "instructor_level": "Advanced",
    "availability": "10/15 slots available",
    "location": "Room E",
    "status": "Open",
    "img_name": "zumba4.jpg",
    "extra_info": ["Dance-based workout", "Fun atmosphere", "Bring a hand towel"]
},
{
    "class_name": "Body Pump",
    "confirmation_number": "BP654321",
    "instructor_level": "Advanced",
    "availability": "11/15 slots available",
    "location": "Room F",
    "status": "Open",
    "img_name": "bodypump1.jpg",
    "extra_info": ["Weights included", "Strength-based", "Bring a water bottle"]
},
{
    "class_name": "Body Pump",
    "confirmation_number": "BP543216",
    "instructor_level": "Intermediate",
    "availability": "18/20 slots available",
    "location": "Room F",
    "status": "Open",
    "img_name": "bodypump2.jpg",
    "extra_info": ["Weights included", "Strength-based", "Bring a water bottle"]
},
{
    "class_name": "Body Pump",
    "confirmation_number": "BP432165",
    "instructor_level": "Beginner",
    "availability": "20/25 slots available",
    "location": "Room F",
    "status": "Open",
    "img_name": "bodypump3.jpg",
    "extra_info": ["Weights included", "Strength-based", "Bring a water bottle"]
},
{
    "class_name": "Body Pump",
    "confirmation_number": "BP321654",
    "instructor_level": "Advanced",
    "availability": "14/15 slots available",
    "location": "Room F",
    "status": "Open",
    "img_name": "bodypump4.jpg",
    "extra_info": ["Weights included", "Strength-based", "Bring a water bottle"]
},
{
    "class_name": "Body Pump",
    "confirmation_number": "BP216543",
    "instructor_level": "Intermediate",
    "availability": "15/20 slots available",
    "location": "Room F",
    "status": "Open",
    "img_name": "bodypump5.jpg",
    "extra_info": ["Weights included", "Strength-based", "Bring a water bottle"]
},
{
    "class_name": "Body Pump",
    "confirmation_number": "BP165432",
    "instructor_level": "Beginner",
    "availability": "7/15 slots available",
    "location": "Room F",
    "status": "Open",
    "img_name": "bodypump6.jpg",
    "extra_info": ["Weights included", "Strength-based", "Bring a water bottle"]
}
];

const suggestionsSeed = [
  {
    classType: 'Yoga',
    customClassType: '',
    preferredDayTime: 'Monday 5 PM',
    groupType: 'One-on-One',
    instructorPreference: 'Female',
    comments: 'Excited to join!',
  },
  {
    classType: 'Other',
    customClassType: 'Dance',
    preferredDayTime: 'Wednesday 7 PM',
    groupType: 'Group',
    instructorPreference: 'Male',
    comments: 'Love dancing!',
  },
];

// Seed Database
const seedDatabase = async () => {
  try {
    await Class.deleteMany();
    await ClassSuggestion.deleteMany();
    await Class.insertMany(classesSeed);
    await ClassSuggestion.insertMany(suggestionsSeed);
    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

// Seed data when the server starts
seedDatabase();

// Routes
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// GET: Retrieve All Classes
app.get('/api/classes', async (req, res) => {
  try {
    const classes = await Class.find();
    res.json(classes);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch classes', error });
  }
});

// GET: Retrieve All Suggestions
app.get('/api/class-suggestions', async (req, res) => {
  try {
    const suggestions = await ClassSuggestion.find();
    res.json(suggestions);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch suggestions', error });
  }
});

// POST: Add a New Suggestion with Image
app.post('/api/class-suggestions', upload.single('img_name'), async (req, res) => {
  const { error } = suggestionSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const newSuggestion = new ClassSuggestion({
      ...req.body,
      img_name: req.file ? req.file.filename : 'placeholder.png',
    });
    await newSuggestion.save();
    res.status(201).json({ message: 'Suggestion added successfully!', suggestion: newSuggestion });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add suggestion', error });
  }
});

// PUT: Update an Existing Suggestion with Image
app.put('/api/class-suggestions/:id', upload.single('img_name'), async (req, res) => {
  const { error } = suggestionSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const updatedSuggestion = await ClassSuggestion.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        img_name: req.file ? req.file.filename : req.body.img_name,
      },
      { new: true }
    );
    if (!updatedSuggestion) return res.status(404).json({ message: 'Suggestion not found' });
    res.status(200).json({ message: 'Suggestion updated successfully!', suggestion: updatedSuggestion });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update suggestion', error });
  }
});

// DELETE: Remove a Suggestion
app.delete('/api/class-suggestions/:id', async (req, res) => {
  try {
    const deletedSuggestion = await ClassSuggestion.findByIdAndDelete(req.params.id);
    if (!deletedSuggestion) return res.status(404).json({ message: 'Suggestion not found' });
    res.status(200).json({ message: 'Suggestion deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete suggestion', error });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});