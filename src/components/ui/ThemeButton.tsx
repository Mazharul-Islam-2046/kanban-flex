'use client'
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "./Button";

const ThemeButton = () => {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  // Render nothing on the server and until the effect above has run
  if (!mounted) {
    return (
      <Button>
        Theme
      </Button>
    );
  }

  return (
    <Button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      {theme === "dark" ? "light" : "dark"}
    </Button>
  );
};

export default ThemeButton;
