export default function SubscriptionList({ subscriptions }) {
  return (
    <ul>
      {subscriptions.map(sub => (
        <li key={sub.id}>{`${sub.user.name}, ${sub.user.email}`}</li>
      ))}
    </ul>
  );
}
