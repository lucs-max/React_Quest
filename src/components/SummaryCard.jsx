import './SummaryCard.css';
function SummaryCard({ title, value, description }) {
  return (
    <article className="summary-card">
      <p className="summary-card__title">{title}</p>

      <strong className="summary-card__value">
        {value}
      </strong>

      <p className="summary-card__description">
        {description}
      </p>
    </article>
  );
}

export default SummaryCard;
