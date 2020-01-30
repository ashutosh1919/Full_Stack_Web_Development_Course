import React, { Component } from "react";
import { View, FlatList } from "react-native";
import { ListItem } from "react-native-elements";

function Menu(props) {
  const renderMenuItem = ({ item, index }) => {
    return (
      <ListItem
        key={index}
        title={item.name}
        subtitle={item.description}
        hideChevron={true}
        onPress={() => props.onPress(item.id)}
        leftAvatar={{ source: require("./images/uthappizza.png") }}
      />
    );
  };

  return (
    <FlatList
      data={props.dishes}
      renderItem={renderMenuItem}
      keyExtractor={item => item.id.toString()}
    />
  );
}

export default Menu;
