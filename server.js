const express = require('express');
const cors = require('cors');
const Joi = require('joi');
const mongoose = require('mongoose');
const multer = require('multer');
const app = express();
const PORT = process.env.PORT || 4000;

// MongoDB Connection
mongoose
  .connect('mongodb+srv://gKSMF0kDA8xi85QL:gKSMF0kDA8xi85QL@raswright.03gl0.mongodb.net/?retryWrites=true&w=majority&appName=raswright', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Failed to connect to MongoDB', error));

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Multer configuration for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, './public/images/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

// Schemas and Models
const ClassSchema = new mongoose.Schema({
  class_name: { type: String, required: true },
  confirmation_number: { type: String, required: true },
  instructor_level: { type: String, required: true },
  availability: { type: String, required: true },
  location: { type: String, required: true },
  status: { type: String, required: true },
  img_name: { type: String, default: 'placeholder.jpg' },
  extra_info: { type: [String], required: true },
});

const SuggestionSchema = new mongoose.Schema({
  classType: { type: String, required: true },
  customClassType: { type: String, default: '' },
  preferredDayTime: { type: String, required: true },
  groupType: { type: String, required: true },
  instructorPreference: { type: String, required: true },
  comments: { type: String, default: '' },
  img_name: { type: String, default: 'placeholder.jpg' },
});

const Class = mongoose.model('Class', ClassSchema);
const ClassSuggestion = mongoose.model('ClassSuggestion', SuggestionSchema);

// Joi Validation Schema
const suggestionSchema = Joi.object({
  classType: Joi.string().required(),
  customClassType: Joi.string().allow('').when('classType', {
    is: 'Other',
    then: Joi.string().required(),
    otherwise: Joi.forbidden(),
  }),
  preferredDayTime: Joi.string().required(),
  groupType: Joi.string().valid('One-on-One', 'Group').required(),
  instructorPreference: Joi.string().valid('Any', 'Female', 'Male').required(),
  comments: Joi.string().allow(''),
});

// Routes
app.get('/', (req, res) => res.send('Server is running!'));

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
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const newSuggestion = new ClassSuggestion({
      ...req.body,
      img_name: req.file ? req.file.filename : 'placeholder.jpg',
    });
    await newSuggestion.save();
    res.status(201).json({ message: 'Suggestion added successfully!', suggestion: newSuggestion });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add suggestion', error });
  }
});

// PUT: Update an Existing Suggestion
app.put('/api/class-suggestions/:id', upload.single('img_name'), async (req, res) => {
  const { id } = req.params;
  const { error } = suggestionSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const updatedSuggestion = await ClassSuggestion.findByIdAndUpdate(
      id,
      { ...req.body, img_name: req.file ? req.file.filename : req.body.img_name },
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
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));