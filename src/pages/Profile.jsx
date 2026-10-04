import { User } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useApp } from "../context/AppContext.jsx";
import Spinner from "../components/Spinner.jsx";
const avatarColors = [
  "#6366f1",
  "#ec4899",
  "#14b8a6",
  "#f97316",
  "#8b5cf6",
  "#06b6d4",
];
const getAvatarColor = (name = "") => {
  const index = name.charCodeAt(0) % avatarColors.length;
  return avatarColors[index];
};
export default function Profile() {
  const { me, saveUser } = useApp();
  const [form, setForm] = useState(null);

  useEffect(() => {
    if (me?.user && !form) {
      setForm(me.user);
    }
  }, [me, form]);

  if (!form) {
    return (
      <main>
        <Spinner />
      </main>
    );
  }

  const handleChange = (field) => (event) => {
    setForm((current) => ({
      ...current,
      [field]: event.target.value,
    }));
  };

  const handleSave = () => {
    saveUser({
      name: form.name,
      bio: form.bio,
    });
  };

  return (
    <main style={{ maxWidth: 520 }}>
      <h1>Profile</h1>

      <div
        className="panel"
        style={{
          display: "grid",
          gap: 12,
          marginTop: 16,
        }}
      >
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            background: getAvatarColor(form.name),
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 28,
            fontWeight: 600,
            textTransform: "uppercase",
          }}
        >
          {form.name?.charAt(0) || "U"}
        </div>

        <label>
          Name
          <input
            type="text"
            value={form.name || ""}
            onChange={handleChange("name")}
            style={{ width: "100%" }}
          />
        </label>

        <label>
          Email
          <input
            type="email"
            value={form.email || ""}
            disabled
            style={{ width: "100%" }}
          />
        </label>

        <label>
          Bio
          <textarea
            rows={3}
            value={form.bio || ""}
            onChange={handleChange("bio")}
            style={{ width: "100%" }}
          />
        </label>

        <button className="btn" onClick={handleSave}>
          Save Changes
        </button>
      </div>
    </main>
  );
}
