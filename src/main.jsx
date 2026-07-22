import React from "react";
import ReactDOM from "react-dom/client";

import App from "./app/App";

import ThemeProvider from "./theme/ThemeProvider";
import DensityProvider from "./theme/DensityProvider";
import NotificationProvider from "./theme/NotificationProvider";
import MessageProvider from "./theme/MessageProvider";
import ModalProvider from "./theme/ModalProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <DensityProvider>
        <NotificationProvider>
          <MessageProvider>
            <ModalProvider>
              <App />
            </ModalProvider>
          </MessageProvider>
        </NotificationProvider>
      </DensityProvider>
    </ThemeProvider>
  </React.StrictMode>
);