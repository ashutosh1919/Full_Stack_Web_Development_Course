import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardImgOverlay,
  CardText,
  CardBody,
  CardTitle
} from "reactstrap";

class DishdetailComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.selectedDish != null) {
      var dish = this.props.selectedDish;
      return (
        <div key={dish.id}>
          <Card>
            <CardImg width="100%" object src={dish.image} alt={dish.name} />
            <CardBody>
              <CardTitle heading>{dish.name}</CardTitle>
              <CardText>{dish.description}</CardText>
            </CardBody>
          </Card>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}

export default DishdetailComponent;
