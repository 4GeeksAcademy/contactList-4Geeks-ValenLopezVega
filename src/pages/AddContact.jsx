import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { ContactForm } from "../components/ContactForm.jsx";
import { useNavigate } from "react-router-dom";

export function AddContact() {

    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate()

    async function createContact(contactData) {
        try {
            const response = await fetch(`${store.baseUrl}/agendas/Valentina/contacts`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(contactData)
            })

            if (response.ok) {
                const newContact = response.json();
                dispatch({ type: 'CREATE_CONTACT', payload: newContact });
                navigate('/');
            }

        } catch (error) {
            console.log(error)
        }
    };

    return (
        <ContactForm title='Add new contact' onSave={createContact} />
    )
}