import React from "react";
import {
  Card,
  CardImg,
  CardImgOverlay,
  CardText,
  CardBody,
  CardTitle
} from "reactstrap";

import DishdetailComponent from "./DishdetailComponent";

function RenderMenuItem({ dish, onClick }) {
  return (
    <Card onClick={() => onClick(dish.id)}>
      <CardImg width="100%" object src={dish.image} alt={dish.name} />
      <CardImgOverlay>
        <CardTitle heading>{dish.name}</CardTitle>
      </CardImgOverlay>
    </Card>
  );
}

const Menu = props => {
  const menu = props.dishes.map(dish => {
    return (
      <div key={dish.id} className="col-12 col-md-5 mt-5">
        <RenderMenuItem dish={dish} onClick={props.onClick} />
      </div>
    );
  });
  return (
    <div className="container">
      <div className="row">{menu}</div>
      {/* <div className="row">
        <div className="col-12 col-md-5 mt-5">
          <DishdetailComponent
            selectedDish={this.state.selectedDish}
          ></DishdetailComponent>
        </div>
        <div className="col-12 col-md-5 mt-5">
          {this.renderComments(this.state.selectedDish)}
        </div>
      </div> */}
    </div>
  );
};

export default Menu;
