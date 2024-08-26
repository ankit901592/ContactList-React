// Import necessary hooks and functions from React and Redux
import { useSelector, useDispatch } from "react-redux";
import { selectContact } from "../../redux/reducer/contacReducer";
import { useEffect } from "react";
import { getContactListAsync } from "../../redux/reducer/contacReducer";
import styles from "./list.module.css";
import { FaRegStar } from "react-icons/fa"; // Importing star icon
import { IoCallSharp } from "react-icons/io5"; // Importing call icon
import { toast } from "react-toastify"; // Importing toast notification

// Importing Redux actions for managing contacts
import {
  deleteContact, // Action to delete a contact
  addEditdata, // Action to populate the form with contact data for editing
  addToFavList, // Action to add a contact to the favorite list
} from "../../redux/reducer/contacReducer";

// Functional component to display the list of contacts
function ShowContacts() {
  const dispatch = useDispatch(); // Initialize dispatch to dispatch actions

  const contacts = useSelector(selectContact); // Access the contacts from the Redux store

  // Fetch the contact list when the component mounts
  useEffect(() => {
    dispatch(getContactListAsync());
  }, [dispatch]);

  // If there are no contacts, display a loading message
  if (!contacts || contacts.length === 0) {
    return (
      <div className="container mt-4 top-2%">
        <h2 className="text-center">Contact List</h2>
        <p className="text-center">No contacts available.</p>
        <p>LOADING...</p>
      </div>
    );
  }

  // If contacts are available, display them in a list
  return (
    <>
      <div className={styles.container}>
        <div className="container mt-4 d-inline-block w-40vh">
          <h2 className="text-center">Contact List</h2>
          <ul className="list-group">
            {contacts.map((contact, index) => (
              <li
                key={contact.id} // Unique key for each contact
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <i className="fas fa-user me-2"></i> {/* User icon */}
                  <strong>{contact.name}</strong> {/* Contact name */}
                  <div className="text-muted">
                    <IoCallSharp size={20} /> {/* Phone icon */}
                    {contact.phone} {/* Contact phone number */}
                  </div>
                </div>
                <div>
                  <img
                    className={styles.dial} // Placeholder for potential contact image
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpI1rzX9kLBKXJ9woH4ZJMzcajbVwAEG8wbw&s"
                    />

                  {/* Button to edit contact, triggers addEditdata action */}
                  <button
                    onClick={() => dispatch(addEditdata(contact))}
                    className="btn btn-warning btn-sm me-2"
                  >
                    <i className="fas fa-edit"></i> {/* Edit icon */}
                  </button>

                  {/* Button to delete contact, triggers deleteContact action and shows toast notification */}
                  <button
                    onClick={() => {
                      dispatch(deleteContact(contact.id));
                      toast.success("Contact Deleted successfully");
                    }}
                    className="btn btn-danger btn-sm"
                  >
                    <i className="fas fa-trash-alt"></i> {/* Trash icon */}
                  </button>

                  {/* Button to add contact to favorites, triggers addToFavList action and shows toast notification */}
                  <button
                    onClick={() => {
                      dispatch(addToFavList(contact));
                      toast.success("Added to fav successfully");
                    }}
                    className="btn btn-info btn-sm"
                  >
                    <FaRegStar size={20} /> {/* Star icon */}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default ShowContacts; // Exporting the ShowContacts component as default
