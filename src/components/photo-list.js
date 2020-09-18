import React from "react";
import style from "../assets/photo-list.css";
import { LazyLoadImage } from "react-lazy-load-image-component";

const PhotoList = props => {
    const { photos, photoClicked, likeClicked } = props;
    return (
        <ul className="photo-list">
            {photos.map((it, i) => {
                return (
                    <li className="photo-item">
                        <div className="author-title">
                            <a
                                href={it.user.links.html}
                                className="author-name"
                            >
                                {it.user.name}
                            </a>
                            <div className="author-date">{it.created_at}</div>
                        </div>
                        <div className="image-wrapper">
                            <LazyLoadImage
                                alt={it.links.download}
                                height={it.height}
                                width={it.width}
                                src={it.links.download}
                                onClick={() => {
                                    photoClicked(it.id);
                                }}
                            />
                        </div>
                        <div className="likes">
                            <button
                                className={
                                    it.liked_by_user
                                        ? "like-button liked"
                                        : "like-button"
                                }
                                onClick={() => likeClicked(it.id)}
                            ></button>
                            <div className="likes-duration">{it.likes}</div>
                        </div>
                    </li>
                );
            })}
        </ul>
    );
};

export default PhotoList;
