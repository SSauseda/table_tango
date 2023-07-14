import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router";
import { useModal } from "../../../context/Modal";
import { deleteReviews } from "../../../store/review";
import './deleteReview.css';

export default function DeleteReviewForm({ review }) {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.session.user);
    const history = useHistory();
    const { closeModal } = useModal();
    const { id } = useParams();
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        await dispatch(deleteReviews(review.restaurantId, review.id))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            })
        
        closeModal();
        history.go(0);
    }

    const keepReview = () => {
        closeModal();
        history.go(0);
    }

    return (
        <div className="delete-form-div">
            <h1 className="title">Are you sure you want to delete this review?</h1>
            <ul className="errors">
                {errors.map((error, idx) => (
                    <li key={idx}>{error}</li>
                ))}
            </ul>
            <form className="form">
                <button type="submit" className="delete-submit-button" onClick={handleSubmit}>Yes, Delete This Review!</button>
                <button type="submit" className="keep-submit-button" onClick={keepReview}>No, Keep My Review!</button>
            </form>
        </div>
    )
}