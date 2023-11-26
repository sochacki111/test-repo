import { Popup } from 'leaflet';
import { createRoot } from "react-dom/client";
import { flushSync } from "react-dom";

const UserPopup = () => {
  return (
    <div>
      <p>UserPopup</p>
    </div>
  );
}

const AdminPopup = () => {
  return (
      <div>
        <p>AdminPopup</p>
      </div>
  );
}

export function CreateAdminPopup() {
    const div = document.createElement("div");
    const root = createRoot(div);
    flushSync(() => {
       root.render(<AdminPopup/>);
    });
    return div.innerHTML; 
};

export function CreateUserPopup() {
    const div = document.createElement("div");
    const root = createRoot(div);
    flushSync(() => {
       root.render(<UserPopup/>);
    });
    return div.innerHTML; 
};