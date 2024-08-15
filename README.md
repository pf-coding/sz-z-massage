This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.10.

# RelaxZ Massage Service Website

## 1. Project Overview

This Angular-based website showcases the massage services provided by Zoltán Szabó, branded as RelaxZ. The goal is to create a clean and user-friendly interface that allows visitors to learn about the services, view prices, and easily book appointments. The site supports multiple languages and is designed to be mobile-friendly.

## 2. Technologies

The project uses the following technologies and tools:

- **Angular**: Frontend framework for web development.
- **Bootstrap**: CSS framework for responsive design.
- **SCSS**: Stylesheet language for modular and maintainable CSS.
- **Firebase**: For user authentication and database management.
- **Mailchimp API**: For managing newsletter subscriptions.
- **Google Maps API**: To display the location of the service on a map.
- **FontAwesome**: For icons used in navigation and contact information.

## 3. Installation

To run the application, follow these steps:

1. **Clone the Project:** Clone the project from the GitHub repository and navigate to the project directory.

   ```bash
   git clone https://github.com/pf-coding/sz-z-massage.git
   cd relaxz
   ```

2. **Install Dependencies:** Install the necessary dependencies.

   ```bash
   npm install
   ```

3. **Start the Development Server:** Start the development server and open the browser at `http://localhost:4200`.
   ```bash
   npm start
   ```

## 4. Features and Structure

### 4.1. Dependencies

- **@angular/animations**: ^15.2.9
- **@angular/common**: ^15.2.9
- **@angular/compiler**: ^15.2.9
- **@angular/core**: ^15.2.10
- **@angular/fire**: ^7.6.1
- **@angular/forms**: ^15.2.9
- **@angular/platform-browser**: ^15.2.9
- **@angular/platform-browser-dynamic**: ^15.2.9
- **@angular/router**: ^15.2.9
- **@fortawesome/angular-fontawesome**: ^0.12.0
- **@fortawesome/fontawesome-svg-core**: ^6.6.0
- **@fortawesome/free-brands-svg-icons**: ^6.6.0
- **@fortawesome/free-solid-svg-icons**: ^6.6.0
- **bootstrap**: ^5.1.3
- **cors**: ^2.8.5
- **dotenv**: ^16.4.5
- **express**: ^4.19.2
- **file-saver**: ^2.0.5
- **firebase**: ^9.23.0
- **firebase-admin**: ^12.2.0
- **gsap**: ^3.12.5
- **ngx-toastr**: ^16.0.0
- **rxfire**: ^6.0.3
- **rxjs**: ~7.8.1
- **tslib**: ^2.3.0
- **xlsx**: ^0.18.5
- **zone.js**: ~0.11.4

### 4.2. Development Dependencies

- **@angular-devkit/build-angular**: ^15.2.9
- **@angular/cli**: ^15.2.9
- **@angular/compiler-cli**: ^15.2.9
- **@types/file-saver**: ^2.0.7
- **@types/jasmine**: ~3.8.0
- **@types/node**: ^15.14.9
- **jasmine-core**: ~3.8.0
- **karma**: ~6.4.2
- **karma-chrome-launcher**: ~3.1.0
- **karma-coverage**: ~2.0.3
- **karma-jasmine**: ~4.0.0
- **karma-jasmine-html-reporter**: ~1.7.0
- **typescript**: ^4.9.5

### 4.3. Home Page and Navigation Bar

On the home page, visitors can choose from the following menu items via the navigation bar:

- **About Me**: A brief introduction to Zoltán Szabó.
- **Massage Types**: Available massage types and their detailed descriptions.
- **Location**: The precise location of the service with Google Maps integration.
- **Contact**: Contact information (email, Facebook, Instagram, phone).
- **Language**: Change the language of the site (Hungarian, English, German).

### Features

- **Home Page**: Navigation bar with the following menu items: About Me, Massage Types, Location, Contact, Language.
- **About Me**: Brief introduction to Zoltán Szabó.
- **Massage Types**: Cards displaying different massage services, with a new component showing prices and duration.
- **Booking**: Ability to book appointments on the external Setmore site.
- **Contact**: Contact information including email, Facebook, Instagram, and phone, along with a Google Maps iframe.
- **Cookie Settings**: Modal for modifying cookie settings, integrated with Google Analytics.
- **Admin Panel**: Login option, managing administrators, handling newsletter subscriptions, and exporting data in Excel format.
- **Newsletter**: Automatic registration to Mailchimp and sending a coupon code for new subscribers.
- **Language Selection**: Language selection in the navbar, dynamically loading the JSON file for the selected language.
- **Carousel**: Automatic image rotation in the carousel.
- **WhatsApp Button**: Fixed position button that allows direct messaging Zoltán via WhatsApp.

### 4.4. About Me Section

This section introduces Zoltán Szabó and the RelaxZ brand. It details why it's worth using the services and what issues can be addressed.

### 4.5. Massage Types

The site showcases available massage services in card format, which can be paginated. Each card includes a brief description and an "Prices and Booking" button that navigates to the booking section with a new component.

### 4.6. Prices and Booking Component

Clicking the "Prices and Booking" button directs the user to a new component where they can select the massage duration. Prices are displayed in HUF for Hungarian, and EUR for English and German. Clicking the booking button takes the user to the Setmore booking page, showing available slots for the selected service and duration.

### 4.7. Contact and Location

The contact section includes contact information and a Google Maps iframe showing the service location. The contact details include an email address, Facebook, Instagram profiles, and a phone number, each with a dedicated button.

### 4.8. Administration Panel

At the bottom of the page is an admin login button, which opens an authentication modal. Logged-in admins can manage newsletter subscribers (delete, update data), register new admins, and view the current list of admins. This is tightly integrated with the associated Firebase collection.

### 4.9. Cookie Management

The footer includes cookie settings in a modal window, providing detailed information about different cookies. Users can reject non-essential cookies as well.

### 4.10. Newsletter Subscription

The newsletter subscription occurs in a timed modal window, which appears 8 seconds after entering the site. If dismissed, it reappears after 1 minute, then again after 15 minutes. The form remains disabled until the name, email, and privacy policy acceptance are correctly filled out.

### 4.11. Other Features

- **Carousel**: The carousel at the top of the home page changes images every 3 seconds unless the mouse is over the carousel.
- **Language Selector**: The language selector in the navigation bar allows changing the site language, loading the appropriate JSON file for the selected language.
- **WhatsApp Button**: A fixed WhatsApp button in the bottom right corner allows direct messaging with Zoltán via WhatsApp.

## 5. Styling and Design

The project’s styling consists of the following elements:

- **Font**: The [`Quicksand`](https://fonts.google.com/specimen/Quicksand) font is used globally.

- **Color Palette**:
  ```bash
  - primary color: #3e4f3c
  - secondary color: #ecaa93
  - tertiary color: wheat
  ```
- **Global Style**: The `style.scss` file contains global styles, which are imported into each component’s scss file.

## 6. Development and Expansion

The project can be developed further by adding additional features and sections. Here are a few suggestions:

- **Additional Language Support**: Adding more languages to the site.
- **Blog Section**: A new blog section where Zoltán can share the benefits of massage and tips.

## 7. Known Issues and Limitations

Here are some current known issues or limitations:

- **Browser Compatibility**: Some site features may not be fully supported in older browsers.

## 8. Contact

If you would like to contribute to the project or have any questions, please contact us at: [zoltan.massages@gmail.com](mailto:zoltan.massages@gmail.com).

## 9. License

This project is open-source and licensed under the [MIT License](LICENSE).

## 10. Project Status

The project is currently under active maintenance. We have future development plans and welcome suggestions!

## 11. Screenshots

![Képernyőkép 2024-08-15 114308](https://github.com/user-attachments/assets/9ca8d5fc-ca1d-478c-b646-2d33040eaf36)
![Képernyőkép 2024-08-15 114301](https://github.com/user-attachments/assets/a2396ad3-6865-408d-80b2-90cef3821b95)
![Képernyőkép 2024-08-15 114247](https://github.com/user-attachments/assets/a74a2b44-b092-4311-b0ad-c2b1726b81d3)
![Képernyőkép 2024-08-15 114222](https://github.com/user-attachments/assets/ee920481-e070-4e3a-83b8-bede8755df06)
![Képernyőkép 2024-08-15 114200](https://github.com/user-attachments/assets/bf6dd2ef-5840-4b79-a7bf-daacdf34b275)
![Képernyőkép 2024-08-15 114147](https://github.com/user-attachments/assets/96655d46-a7ea-4a33-838a-e02d0c2d8995)
![Képernyőkép 2024-08-15 114128](https://github.com/user-attachments/assets/dd4f4837-332b-4229-83d9-a6ceabd6bc80)
![Képernyőkép 2024-08-15 114116](https://github.com/user-attachments/assets/595729d1-af01-426c-b8a8-27a207aa1221)
![Képernyőkép 2024-08-15 114058](https://github.com/user-attachments/assets/2e33d7e0-b4ae-40d6-bebd-2628b0d2c944)
![Képernyőkép 2024-08-15 114041](https://github.com/user-attachments/assets/a14c8265-c0d9-4d64-8311-46d46b1127d1)
![Képernyőkép 2024-08-15 114027](https://github.com/user-attachments/assets/5e31bc35-0f26-4f4d-890d-063d81f74594)
![Képernyőkép 2024-08-15 114011](https://github.com/user-attachments/assets/f0634977-4945-4f70-a24a-50761adb3536)
![Képernyőkép 2024-08-15 114001](https://github.com/user-attachments/assets/1535411d-b73a-419c-a9e7-2b70f8d3dffd)
![Képernyőkép 2024-08-15 113942](https://github.com/user-attachments/assets/dfa37e36-1688-4ffa-93ad-b368d3ee1a5c)
