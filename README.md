# **Hello Insights Test**

This project is an Angular-based application designed to consume a survey API and track its associated events. It provides a user-friendly interface to visualize, manage, and analyze survey data efficiently.

---

## **Prerequisites**

> [!IMPORTANT]
> Before starting, make sure you have the following installed on your system:

1. **Node.js and npm**  
   Download and install the latest stable version from [Node.js](https://nodejs.org/).

2. **Angular CLI**  
   Install the Angular CLI tool if it's not already installed:
   ```bash
   npm install -g @angular/cli
   ```

3. **Git** (optional, if you need to clone the repository).  
   Download it from [Git](https://github.com/coltonsini/hello-insights-test).

---

## **Steps to Run the Project**

### 1. **Clone the Repository (Optional)**

If you don’t already have the project code on your machine, clone the repository using Git:
```bash
git clone https://github.com/coltonsini/hello-insights-test.git
```

---

### 2. **Navigate to the Project Directory**

Go to the main project folder, specifically the **test** directory:
```bash
cd test
```

---

### 3. **Install Dependencies**

Run the following command to install all required dependencies:
```bash
npm install
```
This will download and set up all the necessary packages defined in the `package.json` file.

---

### 4. **Start the Development Server**

To run the project in development mode, use the following command:
```bash
ng serve
```

This command starts a development server that allows you to preview the application and test it in real-time.

---

## **Accessing the Application**

1. Once the server is running, open your browser and go to:
   ```
   http://localhost:4200
   ```

2. If you want to change the default port (`4200`), you can specify a different port when starting the server:
   ```bash
   ng serve --port 4300
   ```

> [!NOTE]
> The content generated in this repository is just a technical test for the company, no further actions will be done on this repository.

---

## **Using Docker**

> 💡 **Feature Note: Important Information**
>
> In case you want to run the project using docker, I leave below the necessary steps to carry out this process.

## Running the Docker Container

To build and run the Docker container for this project, follow these steps:

1. **Build the Docker image**:

    Navigate to the root directory of the project and run the following command:

    ```sh
    docker build -t hello-insights-test .
    ```

2. **Run the Docker container**:

    Once the image is built, run the container using the following command:

    ```sh
    docker run -p 4200:4200 hello-insights-test
    ```

    This will expose the application on `http://localhost:4200`.

> [!TIP]
> The Dockerfile It is already created in the root folder of the project, in case you need to modify it.

