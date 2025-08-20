"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // ✅ router import
import { auth } from "@/firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
} from "firebase/auth";

export default function LoginPage() {
  const [view, setView] = useState("login"); // "login" | "register" | "forgot"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState(""); // for register
  const [loading, setLoading] = useState(false);

  const router = useRouter(); // ✅ instance banaya

  // ---------- LOGIN ----------
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("✅ Logged in successfully!");
      router.push("/"); // ✅ home page par bhej de
    } catch (error) {
      alert("❌ " + error.message);
    }
    setLoading(false);
  };

  // ---------- REGISTER ----------
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCred.user, { displayName: username });
      alert("✅ Account created successfully!");
      router.push("/"); // ✅ register ke baad bhi home pe bhej de
    } catch (error) {
      alert("❌ " + error.message);
    }
    setLoading(false);
  };

  // ---------- FORGOT PASSWORD ----------
  const handleForgot = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      alert("📧 Password reset email sent!");
      setView("login");
    } catch (error) {
      alert("❌ " + error.message);
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md">
        {view === "login" && (
          <>
            <h2 className="text-xl font-bold mb-4 text-center">Login</h2>
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 border rounded-lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 border rounded-lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
            <p className="text-sm text-center mt-3">
              Don’t have an account?{" "}
              <button
                className="text-blue-600 underline"
                onClick={() => setView("register")}
              >
                Register
              </button>
            </p>
            <p className="text-sm text-center mt-1">
              <button
                className="text-gray-600 underline"
                onClick={() => setView("forgot")}
              >
                Forgot Password?
              </button>
            </p>
          </>
        )}

        {view === "register" && (
          <>
            <h2 className="text-xl font-bold mb-4 text-center">Register</h2>
            <form onSubmit={handleRegister} className="space-y-4">
              <input
                type="text"
                placeholder="Username"
                className="w-full px-4 py-2 border rounded-lg"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 border rounded-lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 border rounded-lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
              >
                {loading ? "Creating..." : "Register"}
              </button>
            </form>
            <p className="text-sm text-center mt-3">
              Already have an account?{" "}
              <button
                className="text-blue-600 underline"
                onClick={() => setView("login")}
              >
                Login
              </button>
            </p>
          </>
        )}

        {view === "forgot" && (
          <>
            <h2 className="text-xl font-bold mb-4 text-center">Forgot Password</h2>
            <form onSubmit={handleForgot} className="space-y-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700"
              >
                {loading ? "Sending..." : "Send Reset Email"}
              </button>
            </form>
            <p className="text-sm text-center mt-3">
              <button
                className="text-blue-600 underline"
                onClick={() => setView("login")}
              >
                Back to Login
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
