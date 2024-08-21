import './settings.css';


const Settings = ({handleSignOut, deleteAccount, userID}) => {
    return (
        <div id="settings">
        <div className="sidebar-content">
          <h2>Settings</h2>
          <ul>
            <li><a href="/favorites">Favorite Recipes</a></li>
            <li><a href="/form/informationForm">Update Information / Goals</a></li>
            <li onClick={handleSignOut}>Sign Out</li>
            <li onClick={() => deleteAccount(userID)}>Delete Account</li>
          </ul>
        </div>
      </div>
    )
}
export default Settings;