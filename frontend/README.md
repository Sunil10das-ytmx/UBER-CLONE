# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Features & API Integration

### Location Search Auto-complete (`LocationSearchPanel.jsx` & `Home.jsx`)

- **Live Suggestions**: When typing into either the **Pickup** or **Destination** input fields in `Home.jsx` (minimum 3 characters), `axios` sends a request to the backend `/maps/get-suggestions` endpoint:
  ```javascript
  GET /maps/get-suggestions?input=<search_term>
  Headers: { Authorization: "Bearer <token>" }
  ```
- **Dynamic Selection**: Selecting any suggested location from `LocationSearchPanel`:
  - Automatically updates `pickup` or `destination` state based on the focused field (`activeField`).
  - Sets `selectedAddress` state for ride confirmation.
  - Automatically opens `VehiclePanel` once destination is selected or both locations are chosen.
