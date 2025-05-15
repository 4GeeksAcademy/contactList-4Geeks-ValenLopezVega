import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";

export function Contact({ contact }) {
    const { store, dispatch } = useGlobalReducer();

    async function deleteContact() {
        try {
            const response = await fetch(`${store.baseUrl}/agendas/Valentina/contacts/${contact.id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                dispatch({ type: "DELETE_CONTACT", payload: contact.id })
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="container col-10 card mb-3 h-auto" >
            <div className="row px-3">
                <div className="col-2 p-2">
                    <img src="https://www.alleycat.org/wp-content/uploads/2024/04/alley-our-bnr.jpg" className="img-fluid rounded-circle image-thumbnail p-3" alt="..." />
                </div>
                <div className="col-10">
                    <div className="card-body">
                        <div className="d-flex justify-content-between">
                            <h5 className="card-title">{contact.name}</h5>
                            <div className="ms-auto">
                                <Link to={`/edit-contact/${contact.id}`} className="text-decoration-none text-reset"><i className="fa-solid fa-pencil"></i></Link>
                                <span onClick={() => deleteContact(contact.id)}>
                                    <i className="fa-solid fa-trash"></i>
                                </span>
                            </div>
                        </div>
                        <p className="card-text text-secondary my-1"><i className="fa-solid fa-phone"></i> {contact.phone}</p>
                        <p className="card-text text-secondary my-1"><i className="fa-solid fa-envelope"></i> {contact.email}</p>
                        <p className="card-text text-secondary my-1"><i className="fa-solid fa-location-dot"></i> {contact.address}</p>
                    </div>
                </div>
            </div>
        </div>
    )

};