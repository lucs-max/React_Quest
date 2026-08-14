import './ProfileCard.css';
function ProfileCard({ name, codename, favoriteArea, level }) {
  return (
    <section className="profile-card">
      <div className="profile-card__avatar">
        {name.charAt(0)}
      </div>

      <div className="profile-card__content">
        <p className="profile-card__label">
          Perfil do desenvolvedor
        </p>

        <h2>{name}</h2>

        <p className="profile-card__codename">
          Codinome: {codename}
        </p>

        <p>Área favorita: {favoriteArea}</p>
        <p>Nível atual: {level}</p>
      </div>
    </section>
  );
}

export default ProfileCard;
