const express = require('express');
const cors = require('cors');
const Joi = require('joi'); 
const { v4: uuidv4 } = require('uuid');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json()); 
app.use(express.static('public'));

// schedule data (classes)
const classes = [
    {
        "_id": 1,
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
        "_id": 2,
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
        "_id": 3,
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
        "_id": 4,
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
        "_id": 5,
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
        "_id": 6,
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
        "_id": 7,
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
        "_id": 8,
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
        "_id": 9,
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
        "_id": 10,
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
        "_id": 11,
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
        "_id": 12,
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
        "_id": 13,
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
        "_id": 14,
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
        "_id": 15,
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
        "_id": 16,
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
        "_id": 17,
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
        "_id": 18,
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
        "_id": 19,
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
        "_id": 20,
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
        "_id": 21,
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
        "_id": 22,
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
        "_id": 23,
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
        "_id": 24,
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
        "_id": 25,
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
        "_id": 26,
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
        "_id": 27,
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
        "_id": 28,
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
        "_id": 29,
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
        "_id": 30,
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
        "_id": 31,
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

// Array storing class suggestions
const classSuggestions = [
    {
      id: "a1b2c3d4",
      classType: "Yoga",
      customClassType: "",
      preferredDayTime: "Monday 5 PM",
      groupType: "One-on-One",
      instructorPreference: "Female",
      comments: "Excited to join!",
    },
    {
      id: "e5f6g7h8",
      classType: "Other",
      customClassType: "Dance",
      preferredDayTime: "Wednesday 7 PM",
      groupType: "Group",
      instructorPreference: "Male",
      comments: "Love dancing!",
    },
  ];

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

// test Server
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// GET: Schedule Data 
app.get('/api/classes', (req, res) => {
  res.json(classes);
});

// GET: All Suggestions
app.get('/api/class-suggestions', (req, res) => {
  res.json(classSuggestions);
});

// POST: Add New Suggestion
app.post('/api/class-suggestions', (req, res) => {
  const { error } = suggestionSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const newSuggestion = { id: uuidv4(), ...req.body };
  classSuggestions.push(newSuggestion);

  res.status(201).json({
    message: 'Class suggestion submitted successfully!',
    suggestion: newSuggestion,
  });
});

// PUT: Update Suggestion
app.put('/api/class-suggestions/:id', (req, res) => {
  const { id } = req.params;
  const { error } = suggestionSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const index = classSuggestions.findIndex((item) => item.id === id);
  if (index === -1) return res.status(404).json({ message: 'Item not found.' });

  classSuggestions[index] = { ...classSuggestions[index], ...req.body }; 
  res.status(200).json({ message: 'Class suggestion updated successfully!', suggestion: classSuggestions[index] });
});

// DELETE: Remove Suggestion
app.delete('/api/class-suggestions/:id', (req, res) => {
  const { id } = req.params;
  const index = classSuggestions.findIndex((item) => item.id === id);
  if (index === -1) return res.status(404).json({ message: 'Item not found.' });

  classSuggestions.splice(index, 1);
  res.status(200).json({ message: 'Class suggestion deleted successfully!' });
});

// start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});