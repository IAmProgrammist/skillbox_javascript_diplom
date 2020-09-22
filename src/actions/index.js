export const actionFunctions = () =>{
  return {
    type: "TEST",
    value: "testing bruh"
  }
};

export const photoClicked = (id) => {
  return{
    type: "PHOTO_CLICKED",
    id: id
  }
}

export const photoClosed = () => {
    return{
        type: "PHOTO_CLOSED"
    }
}

export const likeClicked = (id) => {
    return{
        type: "LIKE_CLICKED",
        id: id
    }
}

export const scrolled = (ev) => {
    const target = ev.target;
    return{
        type: "SCROLLED",
        scrollValue: target.scrollHeight - target.scrollTop - 200 < target.clientHeight
    }
}