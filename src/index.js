import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';

import 'semantic-ui-css/semantic.min.css'
import Spinner from './Spinner';

class App extends Component {

  state = {
    latitude: '',
    longitude: '',
    errorMessage: '',
    waitPermission: true,
  }

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      ({coords: {latitude, longitude}}) => {
        this.setState({
          latitude,
          longitude,
          waitPermission: false
        })
      },
      (err) => {
        this.setState({
          errorMessage: err.message
        })
      }
    )
  }

  renderContent() {
    if (this.state.errorMessage) {
      return (
        <div className="location-error">
          <i className="location arrow icon" />
          <span className="location-error__text">
            {this.state.errorMessage}
          </span>
        </div>
      )
    }
    if (this.state.waitPermission) {
      return <Spinner />
    }
    return (
      <SeasonDisplay lat={this.state.latitude}
                     long={this.state.longitude} />
    )
  }

  render() {
    return (
      <div>
        {this.renderContent()}
      </div>
    )

  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

