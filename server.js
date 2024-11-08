const express = require('express'); 
const app = express();
const PORT = process.env.PORT || 4000;

// Sample data for classes
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
            "img_name": "pilates4-class.jpg",
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
            "img_name": "pilates6-class.jpg",
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
            "img_name": "running-class2.jpg",
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
            "img_name": "running-class3.jpg",
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
            "img_name": "running-class4.jpg",
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
            "img_name": "running-class5.jpg",
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
            "img_name": "running-class6.jpg",
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
            "img_name": "cycling-class1.jpg",
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
            "img_name": "cycling-class2.jpg",
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
            "img_name": "cycling-class3.jpg",
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
            "img_name": "cycling-class4.jpg",
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
            "img_name": "cycling-class5.jpg",
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
            "img_name": "cycling-class6.jpg",
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
            "img_name": "zumba-class1.jpg",
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
            "img_name": "zumba-class2.jpg",
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
            "img_name": "zumba-class5.jpg",
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
            "img_name": "zumba-class6.jpg",
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
            "img_name": "bodypump-class1.jpg",
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
            "img_name": "bodypump-class2.jpg",
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
            "img_name": "bodypump-class3.jpg",
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
            "img_name": "bodypump-class4.jpg",
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
            "img_name": "bodypump-class5.jpg",
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
            "img_name": "bodypump-class6.jpg",
            "extra_info": ["Weights included", "Strength-based", "Bring a water bottle"]
        }
];

// Root route to test server
app.get("/", (req, res) => {
    res.send("Server is running!");
});

// Route to get classes data
app.get("/api/classes", (req, res) => {
    res.send(classes);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});