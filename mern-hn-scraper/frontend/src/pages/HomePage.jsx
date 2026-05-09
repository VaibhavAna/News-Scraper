import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";

import API from "../api/axios";
import { AuthContext } from "../context/AuthContextValue";

function HomePage() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user, logout } = useContext(AuthContext);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        console.log("Fetching stories...");

        const res = await API.get("/stories");

        console.log("Stories fetched:", res.data);

        setStories(res.data || []);
      } catch (error) {
        console.error(
          "Fetch stories error:",
          error?.response?.data || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  const handleBookmark = async (storyId) => {
    if (!user) {
      alert("Please login first");
      return;
    }

    try {
      const res = await API.post(
        `/stories/${storyId}/bookmark`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );

      alert(res.data.message || "Bookmarked successfully");
    } catch (error) {
      console.error(
        "Bookmark error:",
        error?.response?.data || error.message
      );

      alert(error?.response?.data?.message || "Bookmark failed");
    }
  };

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#0f172a",
          color: "white",
          fontSize: "22px",
          fontWeight: "600",
        }}
      >
        Loading stories...
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f172a, #1e3a8a)",
        fontFamily: "Arial, sans-serif",
        padding: "25px 15px",
      }}
    >
      {/* NAVBAR */}
      <div
        style={{
          maxWidth: "950px",
          margin: "0 auto",
          padding: "16px 22px",
          borderRadius: "18px",
          background: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <h2
          style={{
            margin: 0,
            color: "#1e3a8a",
            fontSize: "22px",
            fontWeight: "700",
          }}
        >
          ⚡ Hacker News
        </h2>

        <div
          style={{
            display: "flex",
            gap: "14px",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Link style={navLink} to="/">
            Home
          </Link>

          <Link style={navLink} to="/bookmarks">
            Bookmarks
          </Link>

          {!user ? (
            <>
              <Link style={navLink} to="/login">
                Login
              </Link>

              <Link style={navLink} to="/register">
                Register
              </Link>
            </>
          ) : (
            <button onClick={logout} style={logoutBtn}>
              Logout
            </button>
          )}
        </div>
      </div>

      {/* USER STATUS */}
      <div
        style={{
          maxWidth: "950px",
          margin: "20px auto",
          color: "#fff",
          fontSize: "15px",
        }}
      >
        {user ? (
          <p>
            👋 Welcome, <b>{user?.name}</b>
          </p>
        ) : (
          <p>🔒 Login to bookmark stories</p>
        )}
      </div>

      {/* STORIES */}
      <div
        style={{
          maxWidth: "950px",
          margin: "0 auto",
          display: "grid",
          gap: "18px",
        }}
      >
        {stories.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              color: "#fff",
              marginTop: "50px",
              fontSize: "18px",
            }}
          >
            No stories found
          </div>
        ) : (
          stories.map((story) => (
            <div
              key={story._id}
              style={cardStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0px)";
              }}
            >
              <h3
                style={{
                  margin: "0 0 10px 0",
                  color: "#0f172a",
                  fontSize: "18px",
                }}
              >
                {story.title}
              </h3>

              <div
                style={{
                  display: "flex",
                  gap: "14px",
                  fontSize: "13px",
                  color: "#475569",
                  marginBottom: "12px",
                  flexWrap: "wrap",
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
                  fontSize: "14px",
                  textDecoration: "none",
                }}
              >
                Read full story →
              </a>

              {user && (
                <div style={{ marginTop: "15px" }}>
                  <button
                    onClick={() => handleBookmark(story._id)}
                    style={bookmarkBtn}
                  >
                    🔖 Bookmark
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* FOOTER */}
      <div
        style={{
          maxWidth: "950px",
          margin: "45px auto 0 auto",
          padding: "20px",
          borderRadius: "18px",
          background: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
          textAlign: "center",
          color: "#1e3a8a",
          fontSize: "14px",
        }}
      >
        <p
          style={{
            margin: "0 0 8px 0",
            fontWeight: "700",
          }}
        >
          ⚡ Hacker News Scraper
        </p>

        <p
          style={{
            margin: "0 0 12px 0",
            color: "#475569",
          }}
        >
          Built with React • Node.js • MongoDB • Express
        </p>

        <p
          style={{
            marginTop: "12px",
            color: "#94a3b8",
            fontSize: "12px",
          }}
        >
          © {new Date().getFullYear()} All rights reserved
        </p>
      </div>
    </div>
  );
}

export default HomePage;

/* ---------------- STYLES ---------------- */

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
  padding: "8px 12px",
  borderRadius: "10px",
  cursor: "pointer",
  fontSize: "13px",
  fontWeight: "600",
};

const cardStyle = {
  background: "rgba(255,255,255,0.96)",
  padding: "20px",
  borderRadius: "18px",
  boxShadow: "0 10px 22px rgba(0,0,0,0.15)",
  transition: "0.25s ease",
};

const bookmarkBtn = {
  background: "#2563eb",
  color: "#fff",
  border: "none",
  padding: "10px 14px",
  borderRadius: "10px",
  cursor: "pointer",
  fontSize: "13px",
  fontWeight: "600",
};
