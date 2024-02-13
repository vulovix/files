import "./NavigationBox.scss";

function NavigationBox() {
  return (
    <>
      <div className="navigation-bar">
        <div className="ui-icon search-icon ">
          <img width="12" src="images/search.png" alt="" />
        </div>
        <input disabled type="text" placeholder="Enter path" />
      </div>
    </>
  );
}

export default NavigationBox;
