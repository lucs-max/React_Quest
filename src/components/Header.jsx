import './Header.css';
function Header() {
  return (
    <header className="header">
      <div>
        <p className="header__logo">React Quest</p>
        <span className="header__subtitle">
          Central de Evolução Dev
        </span>
      </div>

      <button className="header__button">Meu perfil</button>
    </header>
  );
}

export default Header;
