import React from "react";
import style from "../assets/big-photo.css";
import { LazyLoadImage } from "react-lazy-load-image-component";

const BigPhoto = props => {
    let { active, bigPhotoClass, photos, photoClosed, likeClicked } = props;
    return (
        <div className={bigPhotoClass}>
            {active === "none" ? (
                <div className="big-image-container"></div>
            ) : (
                <div className="big-image-container">
                    {photos.map((it, i) => {
                        if (it.id === active) {
                            return (
                                <div className="big-image-item">
                                    <button
                                        className="close-button"
                                        onClick={() => photoClosed()}
                                    ></button>
                                    <div className="author-title">
                                        <a
                                            href={it.user.links.html}
                                            className="author-name"
                                        >
                                            {it.user.name}
                                        </a>
                                        <div className="author-date">
                                            {it.created_at}
                                        </div>
                                    </div>

                                    <LazyLoadImage
                                        height={it.height}
                                        width={it.width}
                                        placeholderSrc={it.urls.thumb}
                                        className="big-photo-img"
                                        src={it.urls.regular}
                                    />
                                    <div className="likes">
                                        <button
                                            className={
                                                it.liked_by_user
                                                    ? "like-button liked"
                                                    : "like-button"
                                            }
                                            onClick={() => likeClicked(it.id)}
                                        ></button>
                                        <div className="likes-duration">
                                            {it.likes}
                                        </div>
                                    </div>
                                </div>
                            );
                        }
                    })}
                </div>
            )}
        </div>
    );
};

export default BigPhoto;
