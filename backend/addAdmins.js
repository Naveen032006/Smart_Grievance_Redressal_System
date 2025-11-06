import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import 'dotenv/config'; // So we can use process.env.MONGODB_URI
import adminModel from './models/adminModel.js';

// --- CONFIGURE YOUR ADMINS HERE ---
const adminsToCreate = [
  {
    userid: 'admin1',
    password: 'password123', // Plain text password
    wardNumber: 100,
    name: 'Nitin',
    email: 'nitin11@gmail.com',
    phone: '9876450123',
    city: 'Chennai',
    address: '12 Anna Nagar'
  },
  {
    userid: 'admin2',
    password: 'password234',
    wardNumber: 101,
    name: 'Praveen',
    email: 'praveen23@gmail.com',
    phone: '8790654132',
    city: 'Salem',
    address: '123 MRN Nagar'
  },
  {
    userid: 'admin3',
    password: 'password345',
    wardNumber: 102,
    name: 'Hari',
    email: 'hari12@gmail.com',
    phone: '7638371732',
    city: 'Trichy',
    address: '4th avenue Nehru Street'
  }
];
// ---------------------------------

const seedAdmins = async () => {
  try {
    const DB_URI = `${process.env.MONGODB_URI}/grievance`; 
    await mongoose.connect(DB_URI);

    console.log('Database connected...');

    // Clear existing admins
    await adminModel.deleteMany({});
    console.log('Old admins removed.');

    for (const adminData of adminsToCreate) {
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(adminData.password, salt);

      // Create new admin
      await new adminModel({
        userid: adminData.userid,
        password: hashedPassword,
    wardNumber: adminData.wardNumber,
        name: adminData.name,       
        email: adminData.email,   
        phone: adminData.phone,  
        city: adminData.city,
        address: adminData.address,   
        role: 'admin'
      }).save();

      console.log(`Created admin: ${adminData.userid}`);
    }

    console.log('Admin seeding complete!');
  } catch (error) {
    console.error('Error seeding admins:', error.message);
  } finally {
    mongoose.connection.close();
  }
};

seedAdmins();