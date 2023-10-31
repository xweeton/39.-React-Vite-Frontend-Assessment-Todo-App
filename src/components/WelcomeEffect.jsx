import { useState, useEffect } from "react";

const WelcomeEffect = () => {
  const [showWelcome, setShowWelcome] = useState(true);

  // disappear after 5 sec
  useEffect(() => {
    setTimeout(() => {
      setShowWelcome(false);
    }, 5000);
  }, []);

  return showWelcome ? (
    <div className="welcome-effect">
      <p className="fw-light fs-2">Welcome, this is where Dreams take flight</p>
    </div>
  ) : null;
};

export default WelcomeEffect;
