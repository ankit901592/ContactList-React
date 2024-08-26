import { Provider } from "react-redux"; // Corrected import from react-redux
import { store } from "./redux/store";
import "./App.css";
import ShowContacts from "./ContactPages/contact list/list"; // Use PascalCase for component names
import AddnewContact from "./ContactPages/contactaddForm/contactform";
import FavContact from "./ContactPages/favContact/favcontact";
import { ToastContainer, toast } from 'react-toastify';
function App() {
  return (
    <Provider store={store}>
      <AddnewContact/>
      <ShowContacts /> {/* Use the component with uppercase naming */}
      <FavContact/>
      <ToastContainer/>
    </Provider>
  );
}

export default App;
