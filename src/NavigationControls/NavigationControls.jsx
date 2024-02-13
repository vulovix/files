import "./NavigationControls.scss";

function NavigationControls(props) {
  const {
    navigateBackward,
    navigateForward,
    disableBackButton,
    disableForwardButton,
  } = props;

  return (
    <div className="navigation-controls">
      <button
        disabled={disableBackButton}
        onClick={() => navigateBackward()}
        className="active back-button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="svg-inline--fa fa-arrow-left"
          data-flip="false"
          data-icon="arrow-left"
          data-invert="false"
          data-prefix="fas"
          data-rounded="false"
          style={{
            width: 14,
            height: 14,
          }}
          viewBox="0 0 448 512"
          {...props}
        >
          <path
            fill="currentColor"
            d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H109.3l105.3-105.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"
          />
        </svg>
      </button>
      <button
        disabled={disableForwardButton}
        onClick={() => navigateForward()}
        className="forward-button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="svg-inline--fa fa-arrow-right"
          data-flip="false"
          data-icon="arrow-right"
          data-invert="false"
          data-prefix="fas"
          data-rounded="false"
          style={{
            width: 14,
            height: 14,
          }}
          viewBox="0 0 448 512"
          {...props}
        >
          <path
            fill="currentColor"
            d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224H32c-17.7 0-32 14.3-32 32s14.3 32 32 32h306.7L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"
          />
        </svg>
      </button>
      <button
        disabled={disableBackButton}
        onClick={() => navigateBackward()}
        className="active back-button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="svg-inline--fa fa-arrow-up"
          data-flip="false"
          data-icon="arrow-up"
          data-invert="false"
          data-prefix="fas"
          data-rounded="false"
          style={{
            width: 14,
            height: 14,
          }}
          viewBox="0 0 384 512"
          {...props}
        >
          <path
            fill="currentColor"
            d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2l105.4 105.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"
          />
        </svg>
      </button>
    </div>
  );
}

export default NavigationControls;
