'use strict';
import React, { Component } from "react";
import PropTypes from 'prop-types';
import {StyleSheet, Animated} from "react-native";

export default class FloatingLabel extends Component {
  constructor(props: Object) {
    super(props);
    if(props.dense) {
      this.posTop = 0;
      this.posBottom = 32;
      this.fontLarge = 13;
      this.fontSmall = 13;
    } else {
      this.posTop = 4;
      this.posBottom = 37;
      this.fontLarge = 16;
      this.fontSmall = 12;
    }
    let posTop = (props.hasValue) ? this.posTop : this.posBottom;
    let fontSize = (props.hasValue) ? this.fontSmall : this.fontLarge;
    this.state = {
      top: new Animated.Value(posTop),
      fontSize: new Animated.Value(fontSize)
    };
  }
  shouldComponentUpdate(nextProps: Object, nextState: Object) : bool {
    return (this.props.hasValue !== nextProps.hasValue) ? false : true;
  }
  floatLabel() {
    Animated.parallel([
      Animated.timing(this.state.top, {
        toValue: this.posTop,
        duration: this.props.duration,
        useNativeDriver: false
      }),
      Animated.timing(this.state.fontSize, {
        toValue: this.fontSmall,
        duration: this.props.duration,
        useNativeDriver: false
      })
    ]).start();
  }
  sinkLabel() {
    Animated.parallel([
      Animated.timing(this.state.top, {
        toValue: this.posBottom,
        duration: this.props.duration,
        useNativeDriver: false
      }),
      Animated.timing(this.state.fontSize, {
        toValue: this.fontLarge,
        duration: this.props.duration,
        useNativeDriver: false
      })
    ]).start();
  }
  render() : Object {
    let {
      label,
      labelColor,
      highlightColor,
      style
    } = this.props;
    return (
      <Animated.Text
        ellipsizeMode="tail"
        numberOfLines={1}
        style={[{
          fontSize: this.state.fontSize,
          top: this.state.top,
          color: labelColor
        }, styles.labelText, this.props.isFocused && {
          color: highlightColor
        }, style]}
        onPress={()=> {
          this.props.focusHandler();
        }}
      >
        {label}
      </Animated.Text>
    );
  }
}

FloatingLabel.propTypes = {
  duration: PropTypes.number,
  label: PropTypes.string,
  labelColor: PropTypes.string,
  highlightColor: PropTypes.string,
  dense: PropTypes.bool,
  style: PropTypes.object
};

const styles = StyleSheet.create({
  labelText: {
    position: 'absolute',
    left: 0,
    backgroundColor: 'rgba(0,0,0,0)'
  }
});
