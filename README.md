# 🐾 PawCare

A comprehensive **React Native** mobile application for pet care management, built with [Expo](https://expo.dev). PawCare connects pet owners with veterinary services, grooming, boarding, and pet shops — all in one place.

---

## ✨ Features

- 🔐 **Authentication** — Secure login and registration with role-based access (Pet Owner, Vet, Groomer, Shop Staff, Admin)
- 🐕 **Pet Management** — Add, edit, and manage pet profiles with detailed information
- 📅 **Booking System** — Book appointments for grooming, veterinary consultations, and boarding services
- 🛒 **Pet Shop** — Browse products, manage cart, and track orders
- 🤖 **AI Symptom Checker** — Check pet symptoms using integrated AI assistance
- 💬 **Chat & Messaging** — In-app messaging between users and service providers
- 📝 **Medical Records** — Vets can manage and update pet medical records
- ⭐ **Feedback System** — Submit and view ratings and feedback for services
- 🔔 **Role-based Dashboards** — Tailored dashboards for users, vets, groomers, shop owners, and admins

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Expo](https://expo.dev) + [React Native](https://reactnative.dev) |
| Navigation | React Navigation (Native Stack + Bottom Tabs) |
| State Management | React Context API |
| Networking | Axios |
| Storage | AsyncStorage + Expo SecureStore |
| UI | React Native + Expo Vector Icons |
| Animations | React Native Reanimated |
| Image Handling | Expo Image + Image Picker |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- Android Studio / Xcode (for emulator/simulator) or the Expo Go app on your physical device

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/PetCare_Frontend.git
   cd PetCare_Frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npx expo start
   ```

4. **Run the app**
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan the QR code with **Expo Go** app on your physical device

---

## 📁 Project Structure

```
PetCare_Frontend/
├── app/                    # Expo Router entry (file-based routing)
├── assets/                 # Images, fonts, and static assets
├── components/             # Reusable UI components
├── constants/              # Theme and app constants
├── hooks/                  # Custom React hooks
├── scripts/                # Utility scripts
├── src/
│   ├── api/               # API service functions (Axios)
│   ├── components/        # Shared components
│   ├── context/           # React Context providers (Auth, etc.)
│   ├── navigation/        # Navigation setup & navigators
│   │   ├── AppNavigator.js
│   │   ├── UserNavigator.js
│   │   ├── VetNavigator.js
│   │   └── ShopOwnerNavigator.js
│   ├── screens/           # App screens organized by feature
│   │   ├── auth/          # Login, Register, Welcome
│   │   ├── pet/           # Pet profiles & management
│   │   ├── booking/       # Grooming, Vet, Boarding bookings
│   │   ├── shop/          # Product list, Cart
│   │   ├── user/          # Orders, Bookings, Profile
│   │   ├── vet/           # Vet dashboard & medical records
│   │   ├── staff/         # Groomer, Shop, Sitter dashboards
│   │   ├── ai/            # AI Symptom Checker
│   │   ├── feedback/      # Feedback & ratings
│   │   └── admin/         # Admin dashboard
│   └── utils/             # Helper functions & validators
├── App.js                  # App entry point
├── app.json               # Expo configuration
├── eas.json               # EAS Build configuration
└── package.json
```

---

## 🧪 Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start the Expo development server |
| `npm run android` | Start for Android |
| `npm run ios` | Start for iOS |
| `npm run web` | Start for web |
| `npm run lint` | Run ESLint |
| `npm run reset-project` | Reset to a fresh Expo project |

---

## 🔗 Backend

This frontend connects to a backend API. Make sure the backend server is running and update the API base URL in `src/api/` files accordingly.

---

## 📱 Screenshots

> *Add your app screenshots here*

---

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 👤 Author

Developed with ❤️ for pets everywhere.
