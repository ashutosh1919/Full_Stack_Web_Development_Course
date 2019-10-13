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
              <p>
                -- {com.author},
                {new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit"
                }).format(new Date(Date.parse(com.date)))}
              </p>
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
    if (this.props.selectedDish != null) {
      var dish = this.props.selectedDish;
      return (
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-5 mt-5">
              <div key={dish.id}>
                <Card>
                  <CardImg
                    width="100%"
                    object
                    src={dish.image}
                    alt={dish.name}
                  />
                  <CardBody>
                    <CardTitle heading>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                  </CardBody>
                </Card>
              </div>
            </div>
            <div className="col-12 col-md-5 mt-5">
              {this.renderComments(this.props.selectedDish)}
            </div>
          </div>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}

export default DishdetailComponent;
