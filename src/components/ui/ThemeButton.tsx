'use client'
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "./Button";
import { Moon, Sun } from "lucide-react";

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
        <Sun/>
      </Button>
    );
  }

  return (
    <div className="cursor-pointer" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      {theme === "dark" ? <Sun/> : <Moon/>}
    </div>
  );
};

export default ThemeButton;
