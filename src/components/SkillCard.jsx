import "./SkillCard.css";

function SkillCard({ technology, xp }) {
	const progress = Math.max(0, Math.min((xp / 200) * 100, 100));

	return (
		<article className="skill-card">
			<div className="skill-card__header">
				<h3>{technology}</h3>
				<strong>{xp} XP</strong>
			</div>

			<div
				className="skill-card__progress"
				role="progressbar"
				aria-label={`Progresso em ${technology}`}
				aria-valuenow={progress}
				aria-valuemin="0"
				aria-valuemax="100"
			>
				<div
					className="skill-card__progress-fill"
					style={{ width: `${progress}%` }}
				/>
			</div>
		</article>
	);
}

export default SkillCard;
