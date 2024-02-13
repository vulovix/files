import "./FavoriteFolder.scss";
import { IconContext } from "react-icons";

function FavoriteFolder({ name, navigateToFavorite, currentFolderName }) {
  const isActive = currentFolderName === name;
  return (
    <div className={`favorites-folder ${isActive ? "active" : ""}`}>
      <IconContext.Provider value={{ className: "favorites-folder-icon" }}>
        <img width={16} src="/images/folder-sm.png" alt="" />
      </IconContext.Provider>
      <button
        className="favorites-folder-name"
        onClick={() => navigateToFavorite(name)}
      >
        {name}
      </button>
    </div>
  );
}

export default FavoriteFolder;
