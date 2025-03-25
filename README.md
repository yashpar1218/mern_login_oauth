


# Login Authentication System  

This project implements a **session-based authentication system** using **Node.js, Express, Passport.js, and MongoDB**.  
It supports **local login**, **Google login**, and **GitHub login** .

---

## How to Run This Project  

### Step 1: Install MongoDB  
- Download and install **MongoDB** from [MongoDB Official Site](https://www.mongodb.com/try/download/community).  
- Also, install **MongoDB Shell (`mongosh`)** to interact with the database using the command line.  

### Step 2: Clone the Repository  
```bash
git clone <repository_url>
cd <project_folder>


### Step 3: Create `.env` File  
- In the **root directory**, create a `.env` file and add the following details:  
  ```
  MONGO_URI=your_mongodb_connection_string
  SESSION_SECRET=your_secret_key
  GOOGLE_CLIENT_ID=your_google_client_id
  GOOGLE_CLIENT_SECRET=your_google_client_secret
  GITHUB_CLIENT_ID=your_github_client_id
  GITHUB_CLIENT_SECRET=your_github_client_secret
  ```
- **⚠️ Important:** Do **not** push this file to GitHub. Add `.env` to `.gitignore`.  

### Step 4: Install Dependencies  
```bash
npm install
```

### Step 5: Start MongoDB Server  
Open **three** terminal windows and run the following commands:  

1️⃣ **First Terminal: Start MongoDB server**  
```bash
mongod
```  

2️⃣ **Second Terminal: Open Mongo Shell**  
```bash
mongosh
```
- If you prefer, you can use a **MongoDB GUI Client** like **MongoDB Compass** instead.  

3️⃣ **Third Terminal: Start the Node.js Server**  
- Install **nodemon** globally if not already installed:  
  ```bash
  npm install -g nodemon
  ```
- Start the server:  
  ```bash
  nodemon app.js
  ```

---

## How to Use  

### **1️⃣ Open the App**  
- Go to **`http://localhost:5000/index.html`** in your browser.  

### **2️⃣ Local Login**  
- Since **there is no registration page**, you must manually add users by making a **POST request** using **Postman**.  

#### **POST Request to Register a User**  
- **URL:** `http://localhost:5000/auth/register`  
- **Body (JSON Format):**  
```json
{
    "name": "Yash",
    "email": "yash@example.com",
    "password": "password123"
}

```
- This will store the user in MongoDB, allowing them to log in.  

---

## Features  
✅ **Local Login with Sessions**  
✅ **Google Authentication**  
✅ **GitHub Authentication (coming soon)**  
✅ **MongoDB for Storing Users**  
✅ **Secure with Passport.js**  
✅ **Session-based Authentication**  

---

## Future Improvements  
🔹 Add a user registration page.  
🔹 Implement LinkedIn.  
🔹 Enhance security with OAuth scopes.  

---

### 🔥 **Note**  
- **Never push your `.env` file** to GitHub.  
- If using a public repository, remove sensitive credentials before committing.  



