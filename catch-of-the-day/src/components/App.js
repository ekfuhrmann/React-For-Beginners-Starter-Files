import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';
import base from '../base';

class App extends React.Component {
  state = {
    fishes: {},
    order: {}
  };

  static propTypes = {
    match: PropTypes.object
  };

  componentDidMount() {
    const { params } = this.props.match;
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: 'fishes'
    });
  }

  componentWillUnmount() {
    // unmount base to clear our memory issues upon unmounting app
    base.removeBinding(this.ref);
  }

  addFish = fish => {
    // take a copy of existing state
    const fishes = { ...this.state.fishes };

    // add new fish to fishes variable
    fishes[`fish${Date.now()}`] = fish;

    // set new fishes object to state
    this.setState({ fishes });
  };

  updateFish = (key, updatedFish) => {
    // copy current state
    const fishes = { ...this.state.fishes };

    // update state
    fishes[key] = updatedFish;

    // set to state
    this.setState({ fishes });
  };

  deleteFish = key => {
    // copy current state
    const fishes = { ...this.state.fishes };

    // update state
    fishes[key] = null;

    this.setState({ fishes });
  };

  loadSampleFishes = () => {
    this.setState({
      fishes: sampleFishes
    });
  };

  addToOrder = key => {
    // take a copy of state
    const order = { ...this.state.order };

    // either add to order or update quantity in order
    order[key] = order[key] + 1 || 1;

    // call setState to update state object
    this.setState({ order });
  };

  removeFromOrder = key => {
    // take a copy of state
    const order = { ...this.state.order };

    // remove item in order
    delete order[key];

    // call setState to update state object
    this.setState({ order });
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => (
              <Fish
                key={key}
                index={key}
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder}
              />
            ))}
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
          storeId={this.props.match.params.storeId}
        />
      </div>
    );
  }
}

export default App;
