const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
  // Your Sequelize configuration here
  dialect: 'mysql',
  host: 'localhost',
  username: 'root',
  password: 'Nino10490',
  database: 'career_db',
});

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  careerField: {
    type: DataTypes.STRING, // Add more appropriate data types if needed
  },
  degree: {
    type: DataTypes.STRING,
  },
  expectedSalary: {
    type: DataTypes.STRING,
  },
  skills: {
    type: DataTypes.STRING,
  },
  experienceLevel: {
    type: DataTypes.STRING,
  },
});

User.updateProfile = async (username, updatedData) => {
  try {
    await User.update(updatedData, { where: { username: username } });
    return true;
  } catch (error) {
    console.error('Error updating profile:', error);
    return false;
  }
};

const Contact = sequelize.define('Contact', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  company_name: {
    type: DataTypes.STRING,
  },
  position: {
    type: DataTypes.STRING,
  },
  phone: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  notes: {
    type: DataTypes.TEXT,
  },
}, {
  timestamps: false,
});

User.hasMany(Contact, { foreignKey: 'user_id' });
Contact.belongsTo(User, { foreignKey: 'user_id' });

module.exports = {
  db: sequelize,
  User: User,
  Contact: Contact, // Add the Contact model to the exports
};



