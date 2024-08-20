import './settings.css';


const Settings = () => {
    return (
        <div id="settings">
        <div className="sidebar-content">
          <h2>Settings</h2>
          <ul>
            <li> <a href="/form/informationForm">Favorite Recipes</a></li>
            <li>Update Information / Goals</li>
            <li>Sign Out</li>
            <li>Delete Account</li>
          </ul>
        </div>
      </div>
    )
}
export default Settings;