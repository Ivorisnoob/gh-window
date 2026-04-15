"use client";

export default function SearchForm() {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const input = (
      e.currentTarget.elements.namedItem("username") as HTMLInputElement
    ).value.trim();
    if (input) window.location.href = `/${input}`;
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", gap: 8, width: "100%", maxWidth: 400 }}
    >
      <input
        name="username"
        placeholder="GitHub username"
        required
        style={{
          flex: 1,
          padding: "10px 16px",
          borderRadius: 8,
          border: "1px solid #30363d",
          backgroundColor: "#161b22",
          color: "#e6edf3",
          fontSize: 14,
          outline: "none",
        }}
      />
      <button
        type="submit"
        style={{
          padding: "10px 20px",
          borderRadius: 8,
          border: "none",
          backgroundColor: "#4affbd",
          color: "#0d1117",
          fontWeight: 700,
          fontSize: 14,
          cursor: "pointer",
        }}
      >
        Preview →
      </button>
    </form>
  );
}
