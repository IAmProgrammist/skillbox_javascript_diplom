import React from "react";
import { connect } from "react-redux";

import PhotoList from "../components/photo-list";
import BigPhoto from "../components/big-photo"

import {
  actionFunctions, photoClicked, photoClosed, likeClicked, scrolled
} from "../actions"

let InstApp = props => {
  const {data, photoClicked, photoClosed, likeClicked, scrolled} = props;
  return (
  <div className="main-app" onScroll={(ev) => {scrolled(ev)}}>
    <PhotoList photos={data.photos} photoClicked={photoClicked} likeClicked = {likeClicked}/>
    <BigPhoto active={data.active} bigPhotoClass={data.bigPhotoClass} photos={data.photos} photoClosed={photoClosed} likeClicked={likeClicked}/>
  </div>
  );
}

const mapStateToProps = state => {
  return {
    data: state
  };
}

const mapDispatchToProps = dispatch => {
  return{
    actionFunctions: () => dispatch(actionFunctions()),
    photoClicked: (id) => dispatch(photoClicked(id)),
    photoClosed: () => dispatch(photoClosed()),
    likeClicked: (id) => dispatch(likeClicked(id)),
    scrolled: (ev) => dispatch(scrolled(ev))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InstApp);