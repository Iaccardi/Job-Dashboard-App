const express = require('express');
const router = express.Router();
const { Contact, User } = require('../models/User.js');
const secretKey = process.env.JWT_SECRET;
const passport = require('passport');
const passportJwt = require('passport-jwt');
const cors = require('cors');


router.use(cors({ origin: 'http://localhost:3000', credentials: true }));

const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
  secretOrKey: secretKey,
};

passport.use(
  new JwtStrategy(jwtOptions, (jwtPayload, done) => {
    done(null, { userId: jwtPayload.userId });
  })
);

function verifyToken(req, res, next) {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err || !user) {
      console.error('Token verification error:', err);
      res.status(401).json({ message: 'Unauthorized token' });
    } else {
      console.log('User ID:', user.userId);
      req.userId = user.userId;
      next();
    }
  })(req, res, next);
}

router.post('/create-contact', verifyToken, async (req, res) => {
  try {
    const { name, company_name, position, phone, email, notes } = req.body;
    const userId = req.userId;

    const newContact = await Contact.create({
      name,
      company_name,
      position,
      phone,
      email,
      notes,
      user_id: userId,
    });

    res.json({ message: 'Contact created successfully', contact: newContact });
  } catch (error) {
    console.error('Error creating contact:', error);
    res.status(500).json({ error: 'Unable to create contact' });
  }
});

router.put('/update-contact/:contactId', async (req, res) => {
  try {
    const contactId = req.params.contactId;
    const { name, company_name, position, phone, email, notes } = req.body;

    const updateQuery = `UPDATE contacts SET name=?, company_name=?, position=?, phone=?, email=?, notes=? WHERE id=?`;
    const values = [name, company_name, position, phone, email, notes, contactId];
    await pool.query(updateQuery, values);

    res.json({ message: 'Contact updated successfully' });
  } catch (error) {
    console.error('Error updating contact:', error);
    res.status(500).json({ error: 'Unable to update contact' });
  }
});

router.delete('/delete-contact/:contactId', async (req, res) => {
    try {
      const contactId = req.params.contactId;
  
      // Find the contact by ID and delete it
      const deletedContact = await Contact.destroy({ where: { id: contactId } });
  
      if (deletedContact === 0) {
        // If no contact was deleted (contact not found)
        res.status(404).json({ message: 'Contact not found' });
      } else {
        res.json({ message: 'Contact deleted successfully' });
      }
    } catch (error) {
      console.error('Error deleting contact:', error);
      res.status(500).json({ error: 'Unable to delete contact' });
    }
  });
  

router.get('/get-contacts/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    const contacts = await Contact.findAll({
      where: { user_id: userId },
      attributes: ['id', 'name', 'company_name', 'position', 'phone', 'email', 'notes'],
    });

    if (contacts.length === 0) {
      res.status(404).json({ message: 'No contacts found for the user.' });
    } else {
      res.json({ contacts });
    }
  } catch (error) {
    console.error('Error retrieving contacts', error);
    res.status(500).json({ error: 'Unable to retrieve contacts' });
  }
});

module.exports = router;
