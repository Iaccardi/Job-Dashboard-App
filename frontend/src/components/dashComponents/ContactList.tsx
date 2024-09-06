import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, TextField, Button } from '@mui/material';
import { useAuth } from '../../AuthContext.js';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  userId: number;
  username: string;
  email: string;
  name: string;
  iat: number;
  exp: number;
  // Add other properties if necessary
}

// Define the type for a contact
interface Contact {
  id: number;
  name: string;
  company_name: string;
  position: string;
  phone: string;
  email: string;
  notes: string;
}

const ContactList = () => {
  const authToken = useAuth();
  const decodedToken = jwtDecode(authToken) as DecodedToken;

  const [contacts, setContacts] = useState<Contact[]>([]);
  const [newContact, setNewContact] = useState<Contact>({
    id: 0,
    name: '',
    company_name: '',
    position: '',
    phone: '',
    email: '',
    notes: '',
  });

  const [showForm, setShowForm] = useState(false);
  const handleAddContact = () => {
    setShowForm(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewContact({ ...newContact, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

  

    try {
      const response = await fetch('http://localhost:3001/api/contacts/create-contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(newContact),
      });

      if (response.ok) {
        const data = await response.json();
        setContacts([...contacts, data.contact]);
        setNewContact({
          id: 0,
          name: '',
          company_name: '',
          position: '',
          phone: '',
          email: '',
          notes: '',
        });
        setShowForm(false);
      } else {
        console.error('Error creating contact:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error creating contact:', error);
    }
  };

  useEffect(() => {
    async function fetchContacts() {
      try {
        const response = await fetch(`http://localhost:3001/api/contacts/get-contacts/${decodedToken.userId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setContacts(data.contacts);
        } else {
          console.error('Error fetching contacts:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    }

    fetchContacts();
  }, [authToken]);

  const handleDelete = async (contactId: number) => {
    
    try {
      const response = await fetch(`http://localhost:3001/api/contacts/delete-contact/${contactId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.ok) {
        setContacts(contacts.filter(contact => contact.id !== contactId));
      } else {
        console.error('Error deleting contact:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  return (
    <div className='contactList-container'>
      <Typography variant='h5' style={{ color: '#1876D2', fontWeight: 'bold' }}>Contact List</Typography>
      {showForm ? (
        <form className='contact-form' onSubmit={handleSubmit} style={{ padding: '10px', border: '1px solid #ccc' }}>
          <TextField
            type="text"
            name="name"
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            size="small"
            value={newContact.name}
            onChange={handleChange}
          />
          <TextField
            type="text"
            name="company_name"
            label="Company Name"
            variant="outlined"
            fullWidth
            margin="normal"
            size="small"
            value={newContact.company_name}
            onChange={handleChange}
          />
          <TextField
            type="text"
            name="position"
            label="Position"
            variant="outlined"
            fullWidth
            margin="normal"
            size="small"
            value={newContact.position}
            onChange={handleChange}
          />
          <TextField
            type="text"
            name="phone"
            label="Phone Number"
            variant="outlined"
            fullWidth
            margin="normal"
            size="small"
            value={newContact.phone}
            onChange={handleChange}
          />
          <TextField
            type="text"
            name="email"
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            size="small"
            value={newContact.email}
            onChange={handleChange}
          />
          <TextField
            name="notes"
            label="Notes"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            size="small"
            value={newContact.notes}
            onChange={handleChange}
          />
          <Button type="submit" variant="contained" color="primary" size="small">Add Contact</Button>
          <Button variant="outlined" color="secondary" size="small" onClick={() => setShowForm(false)}>Cancel</Button>
        </form>
      ) : (
        <Button
          
          variant="contained"
          color="primary"
          size="small"
          onClick={handleAddContact}
          style={{ color: '#ffc655', fontWeight: 'bold', marginTop: '10px', marginBottom: '10px' }}
        >
          Add Contact
        </Button>
      )}
      <div className="contact-cards">
        {contacts.map((contact, index) => (
          <Card key={contact.id} variant="outlined" style={{ margin: '10px', padding: '10px'}}>
            <CardContent>
              <Typography variant="h6" style={{ color: '#ffc655', fontWeight: 'bold' }}>{contact.name}</Typography>
              <Typography><strong>Company:</strong> {contact.company_name}</Typography>
              <Typography><strong>Position:</strong> {contact.position}</Typography>
              <Typography><strong>Phone:</strong> {contact.phone}</Typography>
              <Typography><strong>Email:</strong> {contact.email}</Typography>
              <Typography><strong>Notes:</strong> {contact.notes}</Typography>
            </CardContent>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
              <Button variant="outlined" color="primary" size="small" onClick={() => handleDelete(contact.id)} style={{fontWeight:'bold'}}>Delete</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ContactList;
