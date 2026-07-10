export default function ActivityWidget({ title, value, description }) {
  return (
    <div>
      <h3>{title}</h3>

      <p>{value}</p>

      <p>{description}</p>
    </div>
  );
}
