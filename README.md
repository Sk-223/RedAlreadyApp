# Reddit Clone Project

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A simplified frontend clone of Reddit built using React, Redux Toolkit, and React Router.

## Features

*   **Subreddit Navigation:** Browse popular subreddits (r/popular, r/all, r/news, etc.) through the sidebar.
*   **Post Display:** View posts with titles, content (text or images), author, subreddit, and vote count.
*   **Voting (Upvoting/Downvoting):** Interact with posts by upvoting or downvoting them. The vote count updates dynamically.
*   **Comments (Basic):** View comments on individual posts.
*   **Responsive Design:** The layout adapts to different screen sizes for a better user experience.

## Technologies Used

*   **React:** The core library for building the user interface.
*   **Redux Toolkit:** For efficient and scalable state management.
*   **React Router:** For handling navigation between different subreddits and post views.
*   **Reddit API:**  Fetches post data from the official Reddit API.
*   **CSS Modules:**  For modular and maintainable styling.
*   **Font Awesome:** For icons.

## Getting Started

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/Sk-223/RedAlreadyApp.git
    ```

2.  **Install Dependencies:**
    ```bash
    cd red-already-app
    npm install react react-dom react-router-dom @reduxjs/toolkit

    ```

3.  **Start the Development Server:**
    ```bash
    npm start
    ```

## Future Enhancements

*   **User Authentication:** Allow users to log in, create accounts, and personalize their experience.
*   **Search Functionality:** Implement a search bar to find posts and subreddits.
*   **Filtering and Sorting:** Add options to filter and sort posts by various criteria.
*   **Full Comment Functionality:** Allow users to create, reply to, and upvote/downvote comments.
*   **Real-Time Updates:** Explore using WebSockets or similar technologies for real-time updates on new posts and comments.

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
