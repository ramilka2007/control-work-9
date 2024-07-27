import { Link, NavLink } from 'react-router-dom';

const Toolbar = () => {
  return (
    <>
      <nav className="navbar navbar-dark bg-body mb-4 ">
        <div className="container-fluid border-bottom d-flex justify-content-between">
          <NavLink className="navbar-brand text-black fw-bold" to="/">
            Finance tracker
          </NavLink>
          <div className="links d-flex flex-row align-items-center justify-content-evenly">
            <NavLink className="nav-link text-black fw-bold" to="/categories">
              Categories
            </NavLink>
            <hr
              style={{
                width: '3px',
                height: '30px',
                background: 'black',
                border: '1px solid black',
                margin: '0 15px',
              }}
            />
            <Link
              to="/transactions/add-transaction"
              className="nav-link text-black fw-bold"
            >
              Add
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Toolbar;
