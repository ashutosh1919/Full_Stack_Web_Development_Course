import React from "react";
import {
  Card,
  CardImg,
  CardImgOverlay,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem
} from "reactstrap";
import { Link } from "react-router-dom";
import { Loading } from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";

function RenderMenuItem({ dish, onClick }) {
  return (
    <Card>
      <Link to={`/menu/${dish.id}`}>
        <CardImg
          width="100%"
          object
          src={baseUrl + dish.image}
          alt={dish.name}
        />
        <CardImgOverlay>
          <CardTitle heading>{dish.name}</CardTitle>
        </CardImgOverlay>
      </Link>
    </Card>
  );
}

const Menu = props => {
  const menu = props.dishes.dishes.map(dish => {
    return (
      <div key={dish.id} className="col-12 col-md-5 mt-5">
        <RenderMenuItem dish={dish} />
      </div>
    );
  });

  if (props.dishes.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  } else if (props.dishes.errMess) {
    return (
      <div className="container">
        <div className="row">
          <h4>{props.dishes.errMess}</h4>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/home">Home</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>Menu</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>Menu</h3>
            <hr />
          </div>
        </div>
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
  }
};

export default Menu;
