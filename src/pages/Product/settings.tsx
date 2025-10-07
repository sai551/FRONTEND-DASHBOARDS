import { useState } from "react";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    theme: "light",
    notifications: true,
    password: "",
  });

  const handleSave = async () => {
    // 🔹 Uncomment when backend is ready
    /*
    await axios.put("/api/product-manager/settings", settings)
      .then(() => alert("Settings saved"))
      .catch((err) => console.error(err));
    */
    alert("Dummy Save → Settings would be sent to backend here!");
  };

  return (
    <div className="p-6">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Theme Preference */}
          <div>
            <label className="block mb-1">Theme</label>
            <select
              className="border p-2 rounded w-full"
              value={settings.theme}
              onChange={(e) => setSettings({ ...settings, theme: e.target.value })}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>

          {/* Notifications */}
          <div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={settings.notifications}
                onChange={(e) =>
                  setSettings({ ...settings, notifications: e.target.checked })
                }
              />
              Enable Notifications
            </label>
          </div>

          {/* Change Password */}
          <div>
            <label className="block mb-1">New Password</label>
            <Input
              type="password"
              value={settings.password}
              onChange={(e) => setSettings({ ...settings, password: e.target.value })}
            />
          </div>

          <Button onClick={handleSave}>Save Settings</Button>
        </CardContent>
      </Card>
    </div>
  );
}
