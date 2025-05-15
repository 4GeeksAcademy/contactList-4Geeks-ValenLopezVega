import { useEffect } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Contact } from "../components/Contact.jsx";

export function Contacts() {
	const { store, dispatch } = useGlobalReducer();

	async function createAgenda(name) {
		try {
			const response = await fetch(`${store.baseUrl}/agendas/${name}`, {
				method: 'POST'
			})

			return response.ok;

		} catch (error) {
			console.log(error);
			return false;
		}
	};

	useEffect(() => {
		async function fetchContacts() {
			try {
				const response = await fetch(`${store.baseUrl}/agendas/Valentina/contacts`);

				if (response.status === 404) {
					const created = await createAgenda('Valentina')
					if (created) {
						fetchContacts();
					}
				}

				if (response.ok) {
					const data = await response.json();
					dispatch({ type: 'SET_CONTACTS', payload: data.contacts });
				}

			} catch (error) {
				console.log(error);
			}
		};

		fetchContacts();
	}, [dispatch]);

	return (
		<div className="container">
			<div className="row">
				<div className="d-flex justify-content-end mt-4">
					<Link className="btn btn-primary" to={'/add-contact'}>Add new contact</Link>
				</div>
			</div>

			<div className="row mt-4">
				{store.contacts.length > 0 ? (
					store.contacts.map(contact => (
						<Contact key={contact.id} contact={contact} />
					))
				) : (
					<p>No contacts found.</p>
				)}
			</div>
		</div>
	);
};
