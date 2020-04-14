import React, { useState, useEffect } from 'react';
import UserDataService from '../services/userService.js';

const User = (props) => {
	const initialUserState = {
		first_name: '',
		last_name: '',
		email: '',
		phone: '',
		is_user_verified: false,
		is_email_verified: false,
		is_phone_verified: false
	};
	const [ currentUser, setCurrentUser ] = useState(initialUserState);
	const [ message, setMessage ] = useState('');

	const getUser = (id) => {
		UserDataService.getUserById(id)
			.then((response) => {
				setCurrentUser(response.data);
				console.log(response.data);
			})
			.catch((e) => {
				console.log(e);
			});
	};

	useEffect(
		() => {
			getUser(props.match.params.id);
		},
		[ props.match.params.id ]
	);

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setCurrentUser({ ...currentUser, [name]: value });
	};

	const updateVerify = (status) => {
		var data = {
			id: currentUser.id,
			first_name: currentUser.first_name,
			last_name: currentUser.last_name,
			email: currentUser.email,
			phone: currentUser.phone
		};

		UserDataService.updateUser(currentUser.id, data)
			.then((response) => {
				setCurrentUser({ ...currentUser, published: status });
				console.log(response.data);
			})
			.catch((e) => {
				console.log(e);
			});
		alert('Oops this functioanlity is not available');
	};

	const updateUser = () => {
		console.log(currentUser._id);
		UserDataService.updateUser(currentUser._id, currentUser)
			.then((response) => {
				console.log(response.data);
				setMessage('The user was updated successfully!');
			})
			.catch((e) => {
				console.log(e);
			});
	};

	const deleteUser = () => {
		UserDataService.deleteUser(currentUser._id)
			.then((response) => {
				console.log(response.data);
				props.history.push('/users');
			})
			.catch((e) => {
				console.log(e);
			});
	};

	return (
		<div>
			{currentUser ? (
				<div className="edit-form">
					<h4>User</h4>
					<form>
						<div className="form-group">
							<label htmlFor="title">First Name</label>
							<input
								type="text"
								className="form-control"
								id="fn"
								required
								value={currentUser.first_name}
								onChange={handleInputChange}
								name="first_name"
							/>
						</div>
						<div className="form-group">
							<label htmlFor="title">Last Name</label>
							<input
								type="text"
								className="form-control"
								id="ln"
								required
								value={currentUser.last_name}
								onChange={handleInputChange}
								name="last_name"
							/>
						</div>
						<div className="form-group">
							<label htmlFor="title">Email</label>
							<input
								type="text"
								className="form-control"
								id="email"
								required
								value={currentUser.email}
								onChange={handleInputChange}
								name="email"
							/>
						</div>
						<div className="form-group">
							<label htmlFor="title">Phone Number</label>
							<input
								type="text"
								className="form-control"
								id="phn"
								required
								value={currentUser.phone}
								onChange={handleInputChange}
								name="phone"
							/>
						</div>
						<div className="form-group">
							<label>
								<strong>Status:</strong>
							</label>
							{currentUser.is_email_verified ? 'Verified' : 'Unverified'}
						</div>
					</form>

					{currentUser.is_email_verified ? (
						<button className="badge badge-primary mr-2" onClick={() => updateVerify(false)}>
							Unverify Now
						</button>
					) : (
						<button className="badge badge-primary mr-2" onClick={() => updateVerify(true)}>
							Verify Now
						</button>
					)}

					<button className="badge badge-danger mr-2" onClick={deleteUser}>
						Delete
					</button>

					<button type="submit" className="badge badge-success" onClick={updateUser}>
						Update
					</button>
					<p>{message}</p>
				</div>
			) : (
				<div>
					<br />
					<p>Please click on a User...</p>
				</div>
			)}
		</div>
	);
};

export default User;
