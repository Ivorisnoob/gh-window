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
    <form onSubmit={handleSubmit} style={{ width: "100%" }}>
      <div className="search-wrap">
        <span className="search-at">@</span>
        <input
          className="search-input"
          name="username"
          placeholder="username"
          autoComplete="off"
          autoCapitalize="none"
          spellCheck={false}
          required
        />
        <button type="submit" className="search-btn">
          Preview →
        </button>
      </div>
    </form>
  );
}
