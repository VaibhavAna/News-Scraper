import {
  useEffect,
  useState,
  useContext,
} from "react";

import {
  Link,
} from "react-router-dom";

import API from "../api/axios";

import {
  AuthContext,
} from "../context/AuthContextValue";

function BookmarksPage() {

  const [bookmarks, setBookmarks] = useState([]);

  const { user, logout } = useContext(AuthContext);

  useEffect(() => {

    const fetchBookmarks = async () => {

      try {

        const res = await API.get(
          "/stories/bookmarks/all",
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        setBookmarks(res.data);

      } catch (error) {

        console.log(error);
      }
    };

    if (user) {
      fetchBookmarks();
    }

  }, [user]);

  return (

    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #0f172a, #1e3a8a)",
        fontFamily: "Arial",
        padding: "25px 15px",
      }}
    >

      {/* NAVBAR */}
      <div
        style={{
          maxWidth: "950px",
          margin: "0 auto",
          padding: "14px 18px",
          borderRadius: "16px",
          background:
            "rgba(255,255,255,0.85)",
          backdropFilter: "blur(10px)",
          boxShadow:
            "0 10px 25px rgba(0,0,0,0.2)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >

        <h2
          style={{
            margin: 0,
            color: "#1e3a8a",
            fontSize: "18px",
          }}
        >
          🔖 Bookmarks
        </h2>

        <div style={{ display: "flex", gap: "14px" }}>

          <Link style={navLink} to="/">Home</Link>
          <Link style={navLink} to="/bookmarks">Bookmarks</Link>

          {!user ? (
            <>
              <Link style={navLink} to="/login">Login</Link>
              <Link style={navLink} to="/register">Register</Link>
            </>
          ) : (
            <button
              onClick={logout}
              style={logoutBtn}
            >
              Logout
            </button>
          )}

        </div>

      </div>

      {/* HEADER TEXT */}
      <div
        style={{
          maxWidth: "950px",
          margin: "18px auto",
          color: "#fff",
          fontSize: "14px",
        }}
      >
        <p>Your saved stories ✨</p>
      </div>

      {/* BOOKMARK LIST */}
      <div
        style={{
          maxWidth: "950px",
          margin: "0 auto",
          display: "grid",
          gap: "14px",
        }}
      >

        {bookmarks.length === 0 ? (
          <div
            style={{
              background: "rgba(255,255,255,0.9)",
              padding: "20px",
              borderRadius: "16px",
              textAlign: "center",
              color: "#334155",
            }}
          >
            No bookmarks yet 🔍
          </div>
        ) : (

          bookmarks.map((story) => (

            <div
              key={story._id}
              style={cardStyle}
              onMouseEnter={(e) =>
                e.currentTarget.style.transform =
                  "translateY(-3px)"
              }
              onMouseLeave={(e) =>
                e.currentTarget.style.transform =
                  "translateY(0px)"
              }
            >

              <h3
                style={{
                  margin: "0 0 8px 0",
                  color: "#0f172a",
                  fontSize: "17px",
                }}
              >
                {story.title}
              </h3>

              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  fontSize: "13px",
                  color: "#475569",
                  marginBottom: "8px",
                }}
              >
                <span>⭐ {story.points}</span>
                <span>👤 {story.author}</span>
                <span>🕒 {story.postedAt}</span>
              </div>

              <a
                href={story.url}
                target="_blank"
                rel="noreferrer"
                style={{
                  color: "#2563eb",
                  fontWeight: "bold",
                  fontSize: "13px",
                }}
              >
                Read full story →
              </a>

            </div>

          ))

        )}

      </div>

    </div>
  );
}

export default BookmarksPage;

/* ---------- STYLES ---------- */

const navLink = {
  textDecoration: "none",
  color: "#1e3a8a",
  fontWeight: "600",
  fontSize: "14px",
};

const logoutBtn = {
  background: "#1e3a8a",
  color: "#fff",
  border: "none",
  padding: "6px 10px",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "13px",
};

const cardStyle = {
  background: "rgba(255,255,255,0.95)",
  padding: "18px",
  borderRadius: "16px",
  boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
  transition: "0.25s ease",
};
