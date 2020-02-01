import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  FlatList,
  StyleSheet,
  Modal,
  Button,
  Alert,
  PanResponder
} from "react-native";
import { Card, Icon, Rating, Input } from "react-native-elements";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import { postFavorite, postComment } from "../redux/ActionCreators";
import * as Animatable from "react-native-animatable";

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    favorites: state.favorites
  };
};

const mapDispatchToProps = dispatch => ({
  postFavorite: dishId => dispatch(postFavorite(dishId)),
  postComment: (dishId, rating, author, comment) =>
    dispatch(postComment(dishId, rating, author, comment))
});

function RenderDish(props) {
  const dish = props.dish;

  handleViewRef = ref => (this.view = ref);

  const recognizeDrag = ({ moveX, moveY, dx, dy }) => {
    if (dx < -200) return true;
    else return false;
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (e, gestureState) => {
      return true;
    },
    onPanResponderGrant: () => {
      this.view
        .rubberBand(1000)
        .then(endState =>
          console.log(endState.finished ? "finished" : "cancelled")
        );
    },
    onPanResponderEnd: (e, gestureState) => {
      if (recognizeDrag(gestureState))
        Alert.alert(
          "Add to Favorites ?",
          "Are you sure you wish tto add " + dish.name + " to your favorites?",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cencel"
            },
            {
              text: "OK",
              onPress: () =>
                props.favorite
                  ? console.log("Already Favorite")
                  : props.onPress()
            }
          ],
          { cancelable: false }
        );

      return true;
    }
  });

  if (dish != null) {
    return (
      <Animatable.View
        animatable="fadeInDown"
        duration={2000}
        delay={1000}
        ref={this.handleViewRef}
        {...panResponder.panHandlers}
      >
        <Card featuredTitle={dish.name} image={{ uri: baseUrl + dish.image }}>
          <Text style={{ margin: 10 }}>{dish.description}</Text>
          <View style={styles.iconsStyle}>
            <Icon
              raised
              reverse
              name={props.favorite ? "heart" : "heart-o"}
              type="font-awesome"
              color="#f50"
              onPress={() =>
                props.favorite
                  ? console.log("Already Favorite")
                  : props.onPress()
              }
            />
            <Icon
              raised
              reverse
              name={"pencil"}
              type="font-awesome"
              color="#512DA8"
              onPress={props.onPressAddComment}
            />
          </View>
        </Card>
      </Animatable.View>
    );
  } else {
    return <View></View>;
  }
}

function RenderComments(props) {
  const comments = props.comments;
  const renderCommentItem = ({ item, index }) => {
    return (
      <View key={index} style={{ margin: 10 }}>
        <Text style={{ fontSize: 14 }}>{item.comment}</Text>
        {/* <Text style={{ fontSize: 12 }}>{item.rating}</Text> */}
        <Rating
          style={styles.commentsRatings}
          imageSize={15}
          readOnly
          ratingColor="yellow"
          startingValue={item.rating}
        />
        <Text style={{ fontSize: 12 }}>
          {"-- " + item.author + ", " + item.date}
        </Text>
      </View>
    );
  };
  return (
    <Animatable.View animatable="fadeInUp" duration={2000} delay={1000}>
      <Card title="Comments">
        <FlatList
          data={comments}
          renderItem={renderCommentItem}
          keyExtractor={item => item.id.toString()}
        />
      </Card>
    </Animatable.View>
  );
}

class Dishdetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      author: "",
      comment: "",
      rating: null
    };
  }

  ratingCompleted = rating => {
    this.setState({ rating: rating });
  };

  handleAuthorInput = author => {
    this.setState({ author: author });
  };

  handleCommentInput = comment => {
    this.setState({ comment: comment });
  };

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
    console.log(JSON.stringify(this.state));
  };

  markFavorite(dishId) {
    this.props.postFavorite(dishId);
  }

  resetForm() {
    this.setState({
      showModal: false,
      author: "",
      comment: "",
      rating: null
    });
  }

  handleComment() {
    const { rating, author, comment } = this.state;
    const dishId = this.props.navigation.getParam("dishId", "");

    this.toggleModal();
    this.props.postComment(dishId, rating, author, comment);
  }

  static navigationOptions = {
    title: "Dish Details"
  };

  render() {
    const dishId = this.props.navigation.getParam("dishId", "");
    return (
      <ScrollView>
        <RenderDish
          dish={this.props.dishes.dishes[+dishId]}
          favorite={this.props.favorites.some(el => el === dishId)}
          onPress={() => this.markFavorite(dishId)}
          onPressAddComment={this.toggleModal}
        />
        <RenderComments
          comments={this.props.comments.comments.filter(
            comment => comment.dishId === dishId
          )}
        />
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.showModal}
          // onDismiss={() => this.toggleModal()}
          // onRequestClose={() => this.toggleModal()}
        >
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Post Comment</Text>
            <Rating
              style={styles.commentsRatings}
              showRating
              imageSize={30}
              onFinishRating={this.ratingCompleted}
              ratingColor="yellow"
              startingValue={0}
            />
            <Input
              style={styles.modalInput}
              placeholder="Author"
              onChangeText={this.handleAuthorInput}
              leftIcon={
                <Icon
                  name={"user-o"}
                  type="font-awesome"
                  size={24}
                  color="black"
                />
              }
              leftIconContainerStyle={{
                margin: 8
              }}
            />

            <Input
              style={styles.modalInput}
              placeholder="Comment"
              onChangeText={this.handleCommentInput}
              leftIcon={
                <Icon
                  name={"comment-o"}
                  type="font-awesome"
                  size={24}
                  color="black"
                />
              }
              leftIconContainerStyle={{
                margin: 8
              }}
            />
            <View style={styles.modalSubmitButton}>
              <Button
                fontSize={24}
                fontWeight={"bold"}
                onPress={() => {
                  this.handleComment();
                  this.resetForm();
                }}
                color="#fff"
                title="Submit"
              />
            </View>
            <View style={styles.modalCancelButton}>
              <Button
                fontSize={24}
                onPress={() => {
                  this.toggleModal();
                  this.resetForm();
                }}
                fontWeight={"bold"}
                color="#fff"
                title="Cancel"
              />
            </View>
          </View>
        </Modal>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  iconsStyle: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
    margin: 20
  },
  commentsRatings: {
    alignItems: "flex-start",
    marginBottom: 10,
    marginTop: 10
  },
  formRow: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
    margin: 20
  },
  formLabel: {
    fontSize: 18,
    flex: 2
  },
  formItem: {
    flex: 1
  },
  modal: {
    justifyContent: "center",
    alignItems: "center"
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    backgroundColor: "#512DA8",
    textAlign: "center",
    color: "white",
    marginBottom: 20,
    marginTop: 20,
    padding: 20,
    alignSelf: "stretch"
  },
  modalText: {
    fontSize: 18,
    margin: 10
  },
  modalRating: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    flex: 1,
    margin: 20
  },
  modalInput: {
    alignItems: "center",
    margin: 20
  },
  modalSubmitButton: {
    marginTop: 30,
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
    margin: 20,
    backgroundColor: "#512DA8"
  },
  modalCancelButton: {
    marginTop: 10,
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
    margin: 20,
    backgroundColor: "grey"
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);
