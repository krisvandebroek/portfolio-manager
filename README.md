# Portfolio Manager

A desktop application to manage your investment portfolio.

## Functionalities

-   **Basic Application Shell**: A simple Electron application window.
-   **Encrypted Data Storage**: Portfolio data is stored in an encrypted SQLite database (`portfolio.db`) using `better-sqlite3-multiple-ciphers`. The database is protected with a password.

## Architectural Choices

-   **Framework**: [Electron](https://www.electronjs.org/) is used to build this cross-platform desktop application with web technologies.
-   **Backend**: [Node.js](https://nodejs.org/) runs the main process and handles backend logic.
-   **Frontend**: The UI is built with plain HTML for now.
-   **Database**: An encrypted SQLite database is used for local data storage. The `better-sqlite3-multiple-ciphers` package provides a synchronous API for database operations with SQLCipher encryption.

## Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    ```
2.  Navigate to the project directory:
    ```bash
    cd electron-portfolio-manager
    ```
3.  Install the dependencies:
    ```bash
    npm install
    ```

## Running the Application

To run the application in development mode, use the following command:

```bash
npm start
```

This will start the Electron application.

## Distribution

This section will contain instructions on how to build and distribute the application for different platforms (e.g., Windows, macOS, Linux).

*(This functionality is not yet implemented.)*
