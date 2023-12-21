import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import { Card } from "antd";

const ParentComponent = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="unauth_wrapper">
      <Card className="form-card">
        {isLogin ? (
          <Login onToggle={toggleForm} />
        ) : (
          <Signup onToggle={toggleForm} />
        )}
      </Card>
    </div>
  );
};

export default ParentComponent;
