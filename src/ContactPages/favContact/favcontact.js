import { useSelector } from "react-redux"; // Import useSelector to access Redux state
import { selectContactFav } from "../../redux/reducer/contacReducer"; // Import the selector to get favorite contacts
import styles from './favcontact.module.css'; // Import CSS module for component-specific styling
import { useDispatch } from "react-redux"; // Import useDispatch to dispatch actions
import { deletetoFav } from "../../redux/reducer/contacReducer"; // Import the action to remove contact from favorites
import { toast } from "react-toastify"; // Import toast for notification
import { FaRegStar } from "react-icons/fa"; // Import an icon for favorite list

function FavContact() {
  const dispatch = useDispatch(); // Create a dispatch function to dispatch actions
  const favcontact = useSelector(selectContactFav); // Get the favorite contacts from Redux state

  // If there are no favorite contacts, display a message indicating that no contacts are available
  if (!favcontact || favcontact.length === 0) {
    return (
      <div className="container mt-4">
        <h2 className="text-center">Contact List</h2>
        <p className="text-center">No contacts available.</p>
      </div>
    );
  }

  return (
    <>
      <div className={styles.container}>
        <div className="container mt-5 d-inline-block w-20vh">
          <h2 className="text-center">
            Favorite List <FaRegStar size={50} />
          </h2>
          <ol className="list-group">
            {/* Map over the favorite contacts and render each one */}
            {favcontact.map((contact) => (
              <li
                key={contact.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <i className="fas fa-user me-1"></i>
                  <strong>{contact.name}</strong>
                  <div className="text-muted">
                    <i className="fas fa-phone-alt me-1"></i>
                    {contact.phone}
                  </div>
                </div>
                <div>
                  <img
                    className={styles.dial}
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpI1rzX9kLBKXJ9woH4ZJMzcajbVwAEG8wbw&s"
                    alt="Dial Icon"
                  />
                  {/* Button to remove contact from favorites */}
                  <button
                    onClick={() => {
                      dispatch(deletetoFav(contact.id)); // Dispatch action to remove contact from favorites
                      toast.success("Removed from favorites successfully"); // Show success notification
                    }}
                    className="btn btn-warning btn-sm me-1"
                  >
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </>
  );
}

export default FavContact;
