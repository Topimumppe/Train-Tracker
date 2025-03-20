# Train Tracker

This project is part of the RDI Student Assistant Preliminary Task, where I was assigned to create a website that tracks Finland's trains in real time. The website uses the **DigiTraffic API**, which can be found at [https://www.digitraffic.fi/en/railway-traffic/](https://www.digitraffic.fi/en/railway-traffic/).

---

## Documentation

### **Frontend**
The frontend is responsible for displaying the map, train locations, and statistics to the user.

#### **Programming Languages and Libraries**
- **React.js**: The website is built using React. I chose React because I am currently taking a course that covers creating web applications using React.
- **React-Leaflet** and **OpenStreetMap**: The map component is created using React-Leaflet, a React wrapper for Leaflet.js.
- **CSS**: A separate CSS file is used for styling the website (e.g., layout, colors, fonts).
- **DeepSeek**: AI tool that i used.

### **Backend**
There is no traditional backend. Instead, the `API.jsx` file fetches data directly from the DigiTraffic API.

---

### **Main Features**
- Fetches train data directly from the API using **Axios** every 10 seconds.
- Renders the map using the `MapContainer`, `TileLayer`, and `Marker` components from React-Leaflet to display train locations.
- Uses different colored markers for moving and stopped trains:
  - **Green marker**: Moving trains.
  - **Red marker**: Stopped trains.
- Displays real-time statistics, including:
  - Total number of trains.
  - Number of moving trains.
  - Number of stopped trains.
- Clicking on a train marker opens a popup that shows additional information about the train.

---

## How to Run This Website

Follow these steps to run the website locally on your machine:

### **Steps**
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/train-tracker.git
   ```
   Replace `your-username` with your GitHub username and `train-tracker` with the repository name.

2. **Navigate to the Project Directory**:
   ```bash
   cd train-tracker
   ```

3. **Install Dependencies**:
   Run the following command to install all the required dependencies:
   ```bash
   npm install
   ```

4. **Start the Development Server**:
   Run the following command to start the development server:
   ```bash
   npm start
   ```

5. **Open the Website**:
   Once the server is running, open your browser and navigate to:
   ```
   http://localhost:(port where it is running)
   ```

---
It should look like this
---
![kuva](https://github.com/user-attachments/assets/b4f9e16c-6e4b-4eec-ab5d-b1b573c748b5)



## License
This project is open-source and available under the [MIT License](LICENSE).
