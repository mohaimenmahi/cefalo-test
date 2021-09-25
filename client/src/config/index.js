module.exports = {
  BASE_URL:
    process.env.NODE_ENV === "production" && typeof window === "object"
      ? "https://cec-fwd-server.herokuapp.com/"
      : "http://localhost:5001/",
};
