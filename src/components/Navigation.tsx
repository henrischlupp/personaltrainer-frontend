import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <nav style={{ padding: "1rem", display: "flex", gap: "1rem" }}>
      <Link to="/customers">Customers</Link>
      <Link to="/trainings">Trainings</Link>
    </nav>
  );
}