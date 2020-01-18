import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardImgOverlay,
  CardText,
  CardBody,
  CardTitle
} from "reactstrap";

import DishdetailComponent from "./DishdetailComponent";

class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedDish: null
    };
  }

  onDishSelect(dish) {
    this.setState({ selectedDish: dish });
  }

  renderDish(dish) {
    if (dish != null) {
      return (
        <Card>
          <CardImg width="100%" object src={dish.image} alt={dish.name} />
          <CardBody>
            <CardTitle heading>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      );
    } else {
      return <div></div>;
    }
  }

  renderComments(dish) {
    var comments;
    if (dish != null) {
      comments = dish.comments;
    } else {
      comments = null;
    }
    if (comments != null) {
      const coms = comments.map(com => {
        return (
          <div key={com.id}>
            <div className="row">
              <p>{com.comment}</p>
            </div>
            <div className="row">
              <p>-- {com.author}</p>
            </div>
          </div>
        );
      });
      return (
        <div className="container">
          <h4>Comments</h4>
          <div>{coms}</div>
        </div>
      );
    } else {
      return <div></div>;
    }
  }

  render() {
    const menu = this.props.dishes.map(dish => {
      return (
        <div key={dish.id} className="col-12 col-md-5 mt-5">
          <Card onClick={() => this.onDishSelect(dish)}>
            <CardImg width="100%" object src={dish.image} alt={dish.name} />
            <CardImgOverlay>
              <CardTitle heading>{dish.name}</CardTitle>
            </CardImgOverlay>
          </Card>
        </div>
      );
    });
    return (
      <div className="container">
        <div className="row">{menu}</div>
        <div className="row">
          <div className="col-12 col-md-5 mt-5">
            <DishdetailComponent
              selectedDish={this.state.selectedDish}
            ></DishdetailComponent>
          </div>
          <div className="col-12 col-md-5 mt-5">
            {this.renderComments(this.state.selectedDish)}
          </div>
        </div>
      </div>
    );
  }
}

export default Menu;
