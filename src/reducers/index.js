const toJson = require("unsplash-js").toJson;

const reducer = (state, action) => {
    let result = {};
    switch (action.type) {
        case "TEST":
            console.log("yea, imma too bruh");
            result = state;
            break;
        case "PHOTO_CLICKED":
            const updatedState = { ...state };
            updatedState.active = action.id;
            updatedState.bigPhotoClass = "big-image image-active";
            result = updatedState;
            break;
        case "PHOTO_CLOSED":
            const updateState = { ...state };
            updateState.active = "none";
            updateState.bigPhotoClass = "big-image";
            result = updateState;
            break;
        case "LIKE_CLICKED":
            const upState = { ...state };
            let unsplash = state.photoDownloader;
            upState.photos.filter((it, i) => {
                if (it.id === action.id) {
                    if(it.liked_by_user){
                        it.likes = it.likes - 1;
                        unsplash.photos.unlikePhoto(action.id);
                    }else{
                        it.likes = it.likes + 1
                        unsplash.photos.likePhoto(action.id);
                    }
                    it.liked_by_user = !it.liked_by_user;
                    return it;
                } else {
                    return it;
                }
            });
            result = upState;
            break;
        case "SCROLLED":
            const stateCopy = { ...state };
            if (action.scrollValue) {
                if (!stateCopy.loading) {
                    stateCopy.loading = true;
                    let loader = stateCopy.photoDownloader; 
                    const request = async () => {
                        let a = await loader.photos
                            .getRandomPhoto({ count: 10 })
                            .then(toJson)
                            .then(json => {
                                let resultArray = [];
                                json.map((it, i) => {
                                    stateCopy.photos.push(it);
                                });
                                stateCopy.photos.concat(resultArray);
                                stateCopy.loading = false;
                            });
                    };
                    request();
                    return stateCopy;
                } else {
                    result = stateCopy;
                }
            } else {
                stateCopy.loading = false;
                result = stateCopy;
            }
            break;
        default:
            result = state;
            break;
    }
    return result;
};

export default reducer;
